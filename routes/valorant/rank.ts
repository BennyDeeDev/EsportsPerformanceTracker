import express from 'express';
const router = express.Router();
import { Rank } from '../../models/rank.model';
import axios from 'axios';
import moment from 'moment';
import valorantClient from '../../utils/valorantClient';

router.get('/:day', async (req, res) => {
   try {
      const response = await axios.get(
         'https://api.tracker.gg/api/v2/valorant/standard/profile/riot/Relentl3zz%231804/stats/overview/competitiveTier',
      );

      const paramDay = req.params.day;

      const rankDays = response.data.data.history.data.map(
         (r: any, index: number, array: any[]) => {
            const rankDay = {
               timestamp: r[0],
               ...r[1],
            };

            const query = {
                  'rankDay.timestamp': rankDay.timestamp,
               },
               update = { rankDay },
               options = { upsert: true };

            Rank.findOneAndUpdate(query, update, options, (error, result) => {
               if (error) {
                  res.status(500).json('Internal Server Error');
                  throw error;
               }
            });
            return rankDay;
         },
      );

      if (paramDay === 'today') {
         const rankByDay = rankDays.find(
            (r: any) =>
               moment(r.timestamp).format('DD-MM-YYYY') ===
               moment().format('DD-MM-YYYY'),
         );

         const previousRankByDay = rankDays.find(
            (r: any) =>
               moment(r.timestamp).format('DD-MM-YYYY') ===
               moment().subtract(1, 'days').format('DD-MM-YYYY'),
         );

         const rankedDiff = rankByDay.value[1] - previousRankByDay.value[1];

         const calulateDiffToRadiant = async () => {
            try {
               const contentResponse = await valorantClient.get(
                  '/content/v1/contents',
               );
               const actId = contentResponse.data.acts.find(
                  ({ isActive }: any) => isActive === true,
               ).id;

               const leaderboardResponse = await valorantClient.get(
                  `/ranked/v1/leaderboards/by-act/${actId}?size=1&startIndex=499`,
               );

               const myRankRating = rankByDay.value[1];
               const lastRadiantRankRating =
                  leaderboardResponse.data.players[0].rankedRating;

               return lastRadiantRankRating - myRankRating;
            } catch (error) {
               console.log(error);
            }
         };

         console.log(rankByDay);

         res.status(200).send(
            `<p>Elo Today: ${rankedDiff}</p> 
            <p>Points to Radiant: ${await calulateDiffToRadiant()}</p>
            <p>Current Rank: ${rankByDay.displayValue}</p>`,
         );
         return;
      }

      const rankByDay = rankDays.find(
         (r: any) => moment(r.timestamp).format('DD-MM-YYYY') === paramDay,
      );

      const previousRankByDay = rankDays.find(
         (r: any) =>
            moment(r.timestamp).format('DD-MM-YYYY') ===
            moment(paramDay, 'DD-MM-YYYY')
               .subtract(1, 'days')
               .format('DD-MM-YYYY'),
      );

      const futureRankByDay = rankDays.find(
         (r: any) =>
            moment(r.timestamp).format('DD-MM-YYYY') ===
            moment(paramDay, 'DD-MM-YYYY').add(1, 'days').format('DD-MM-YYYY'),
      );

      res.status(200).json({
         previousRankDay: previousRankByDay || null,
         currentRankDay: rankByDay || null,
         futureRankDay: futureRankByDay || null,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json('Internal Server Error');
   }
});

export default router;
