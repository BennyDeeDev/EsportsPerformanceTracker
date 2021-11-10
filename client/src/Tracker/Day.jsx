import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteListItem from '../Note/NoteListItem';
import MatchListItem from '../Match/MatchListItem';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import JournalListItem from '../Journal/JournalListItem';

const Day = ({ day }) => {
   const [matches, setMatches] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   useEffect(() => {
      const fetchDay = async () => {
         setIsLoading(true);
         try {
            const response = await axios.get(
               `http://localhost:3123/api/valorant/matches/${day}`,
            );
            setMatches(response.data);
         } catch (error) {
         } finally {
            setIsLoading(false);
         }
      };
      if (day) fetchDay();
      return () => fetchDay;
   }, [day]);

   const determineContent = () => {
      if (!isLoading && matches.length === 0) {
         return <div className="flex justify-center">no Items found</div>;
      } else if (!isLoading) {
         return (
            <>
               <JournalListItem day={day} />
               {matches.map((match) => (
                  <div
                     key={match.attributes.id}
                     className="mt-8 bg-gray-300 shadow-md p-4">
                     <MatchListItem match={match} />
                     <NoteListItem
                        matchId={match.attributes.id}
                        value={match.notes}
                        match={match}
                     />
                  </div>
               ))}
            </>
         );
      } else {
         return (
            <div className="flex justify-center">
               <Loader
                  type="TailSpin"
                  color="#dc3d4b"
                  height={150}
                  width={150}
                  timeout={10000}
               />
            </div>
         );
      }
   };

   return <>{determineContent()}</>;
};

export default Day;
