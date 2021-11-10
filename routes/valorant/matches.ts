import express from 'express';
const router = express.Router();
import axios from 'axios';
import { Match } from '../../models/matches.model';
import moment from 'moment';

//TODO: Implement CRON JOB that runs in the end of the week, include Match Url
router.get('/:day', async (req, res) => {
   try {
      const response = await axios.get(
         'https://api.tracker.gg/api/v2/valorant/standard/matches/riot/Relentl3zz%231804?type=competitive',
      );

      const paramDay = req.params.day;

      const matches = response.data.data.matches.map((m: any) => {
         const query = {
               'match.attributes.id': m.attributes.id,
            },
            update = { match: m },
            options = { upsert: true };

         Match.findOneAndUpdate(query, update, options, (error, result) => {
            if (error) {
               res.status(500).json('Internal Server Error');
               throw error;
            }
         });
         return m;
      });

      const matchDay = matches.filter(
         (m: any) =>
            moment(m.metadata.timestamp).format('DD-MM-YYYY') === paramDay,
      );

      res.status(200).json(matchDay);
   } catch (error) {
      res.status(500).json('Internal Server Error');
   }
});

export default router;
