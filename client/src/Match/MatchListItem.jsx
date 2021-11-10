import React from 'react';
import moment from 'moment';
import { get } from 'lodash';

const MatchListItem = ({ match }) => {
   const MatchTextItem = ({ title, content }) => (
      <div className="flex flex-col self-center ml-10">
         <small className="text-gray-100 self-end">{title}</small>
         <h3 className="text-white">{content}</h3>
      </div>
   );

   const determinePlacementEnding = () => {
      const placement = get(match, 'segments[0].stats.placement.displayValue');

      if (placement === '1') {
         return 'st';
      } else if (placement === '2') {
         return 'nd';
      } else if (placement === '3') {
         return 'rd';
      }

      return 'th';
   };

   return (
      <div
         style={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: '20% ',
            backgroundPosition: '100% 50%',
            backgroundImage: `url(${get(match, 'metadata.mapImageUrl')})`,
         }}
         className={`flex border-l-4 shadow-lg opacity-90 ${
            get(match, 'metadata.result') === 'victory'
               ? 'bg-green-500'
               : 'bg-red-500'
         } 
         ${
            get(match, 'metadata.result') === 'victory'
               ? 'border-green-600'
               : 'border-red-600'
         }`}>
         <img
            className="ml-px"
            src={get(match, 'segments[0].metadata.agentImageUrl')}
            style={{ width: 75 }}
            alt=""
         />
         <div className="flex my-2">
            <div className="ml-6 w-12">
               <h3 className="text-white">{get(match, 'metadata.mapName')}</h3>
               <small className="rounded-xl bg-white px-1 py-px ">
                  {moment(get(match, 'metadata.timestamp')).format('HH:mm')}
               </small>
            </div>
            <img
               className="ml-20 self-center"
               src={get(match, 'segments[0].stats.rank.metadata.iconUrl')}
               style={{ height: 50 }}
               alt=""
            />
            <div className="flex flex-col ml-6">
               <h2 className="flex flex-row ">
                  <p
                     className={`${
                        get(match, 'metadata.result') === 'victory'
                           ? 'text-green-900 ml-px'
                           : 'text-red-900 ml-px'
                     } font-semibold`}>
                     {get(match, 'segments[0].stats.roundsWon.displayValue')}
                  </p>
                  <p className="text-white font-semibold">:</p>
                  <p
                     className={`${
                        get(match, 'metadata.result') === 'victory'
                           ? 'text-red-700 ml-px'
                           : 'text-green-700 ml-px'
                     } font-semibold`}>
                     {get(match, 'segments[0].stats.roundsLost.displayValue')}
                  </p>
               </h2>
               <small className="bg-white rounded-xl px-4 mt-px self-center">
                  {get(match, 'segments[0].stats.placement.displayValue') +
                     determinePlacementEnding()}
               </small>
            </div>
            <div className="flex flex-row ml-20">
               <MatchTextItem
                  title="K / D / A"
                  content={`${get(
                     match,
                     'segments[0].stats.kills.displayValue',
                  )} / ${get(
                     match,
                     'segments[0].stats.deaths.displayValue',
                  )} / ${get(match, 'segments[0].stats.assists.displayValue')}`}
               />
               <MatchTextItem
                  title="K/D"
                  content={`${get(
                     match,
                     'segments[0].stats.kdRatio.displayValue',
                  )}`}
               />
               <MatchTextItem
                  title="HS%"
                  content={`${get(
                     match,
                     'segments[0].stats.headshotsPercentage.displayValue',
                  )}%`}
               />
               <MatchTextItem
                  title="Avg. Score"
                  content={`${Math.round(
                     get(match, 'segments[0].stats.scorePerRound.displayValue'),
                  )}`}
               />
            </div>
         </div>
      </div>
   );
};

export default MatchListItem;
