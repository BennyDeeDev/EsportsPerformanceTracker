import React, { useEffect, useState } from 'react';
import notes from '../images/writing.svg';
import axios from 'axios';
import save from '../images/floppy-disk.svg';
import Loader from 'react-loader-spinner';
import TextareaAutosize from 'react-textarea-autosize';

const JournalListItem = ({ day }) => {
   console.log(day);
   const [journal, setJournal] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   useEffect(() => {
      const fetchJournal = async () => {
         const response = await axios.get(
            `http://localhost:3123/api/journal/${day}`,
         );
         console.log(response);
         setJournal(response.data.text);
      };

      if (day) fetchJournal();
      return () => fetchJournal;
   }, [day]);

   const saveJournal = async () => {
      setIsLoading(true);
      try {
         return await axios.post(`http://localhost:3123/api/journal/${day}`, {
            text: journal,
         });
      } catch (error) {
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="p-4 bg-gray-300">
         <h2>Journal</h2>
         <div className="flex">
            <img className="" src={notes} style={{ width: 80 }} alt="" />
            <TextareaAutosize
               value={journal || ''}
               onChange={(event) => setJournal(event.target.value)}
               className="p-2 w-full mx-6"
               minRows={4}
            />

            <button
               onClick={saveJournal}
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
