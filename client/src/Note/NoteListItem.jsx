import React, { useEffect, useState } from 'react';
import notes from '../images/writing.svg';
import axios from 'axios';
import save from '../images/floppy-disk.svg';
import Loader from 'react-loader-spinner';
import TextareaAutosize from 'react-textarea-autosize';

const JournalListItem = ({ matchId }) => {
   const [note, setNote] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   useEffect(() => {
      const fetchNote = async () => {
         const response = await axios.get(
            `http://localhost:3123/api/valorant/notes/${matchId}`,
         );

         setNote(response.data.text);
      };

      if (matchId) fetchNote();
      return () => fetchNote;
   }, [matchId]);

   const saveNote = async () => {
      setIsLoading(true);
      try {
         return await axios.post(
            `http://localhost:3123/api/valorant/notes/${matchId}`,
            {
               notes: note,
            },
         );
      } catch (error) {
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="py-4 ">
         <div className="flex">
            <img className="" src={notes} style={{ width: 80 }} alt="" />
            <TextareaAutosize
               value={note || ''}
               onChange={(event) => setNote(event.target.value)}
               className="p-2 w-full mx-6"
               minRows={4}
            />

            <button
               onClick={saveNote}
               className="flex bg-green-500 py-6 px-4 my-auto rounded-lg ">
               {!isLoading ? (
                  <img className="w-12" src={save} alt="" />
               ) : (
                  <Loader
                     type="TailSpin"
                     color="rgba(16, 185, 129)"
                     height={48}
                     width={48}
                     timeout={10000}
                  />
               )}
            </button>
         </div>
      </div>
   );
};

export default JournalListItem;
