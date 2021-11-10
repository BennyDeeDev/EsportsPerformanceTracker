import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { get } from 'lodash';

const RankDayListItem = ({ day }) => {
   const [rankDay, setRankDay] = useState('');
   useEffect(() => {
      const fetchRankDay = async () => {
         setRankDay('');
         const response = await axios.get(
            `http://localhost:3123/api/valorant/rank/${day}`,
         );

         setRankDay(response.data);
      };

      if (day) fetchRankDay();
      return () => fetchRankDay;
   }, [day]);

   const calculateRankDifference = () => {
      if (rankDay.previousRankDay && rankDay.currentRankDay)
         return (
            rankDay.currentRankDay.value[1] - rankDay.previousRankDay.value[1]
         );
      return '';
   };

   return (
      <div className="flex flex-row m-4 justify-center">
         <h3>{get(rankDay, 'currentRankDay.displayValue')}</h3>
         <h4
            className={`${
               calculateRankDifference() > 1 ? 'text-green-400' : 'text-red-500'
            } ml-4`}>
            {calculateRankDifference() > 1
               ? `+ ${calculateRankDifference()}`
               : `${calculateRankDifference()}`}
         </h4>
      </div>
   );
};

export default RankDayListItem;
