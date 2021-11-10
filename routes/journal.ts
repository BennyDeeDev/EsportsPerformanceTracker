import express from 'express';
const router = express.Router();
import { Journal } from '../models/journal.model';

router.get('/:day', (req, res) => {
   const day = req.params.day;

   const query = {
      'journal.day': day,
   };

   Journal.findOne(query, (error: any, result: any) => {
      if (error) {
         res.status(500).json('Internal Server Error');
         throw error;
      }

      if (!result) {
         res.status(200).json([]);
         return;
      }

      res.status(200).json(result.journal);
   });
});

router.post('/:day', (req, res) => {
   const day = req.params.day;

   const text = req.body.text;
   const query = {
      'journal.day': day,
   };

   const update = { 'journal.text': text };
   const options = { upsert: true };

   Journal.findOneAndUpdate(
      query,
      update,
      options,
      (error: any, result: any) => {
         if (error) {
            res.status(500).json('Internal Server Error');
            throw error;
         }
         res.status(200).json({ text });
      },
   );
});

export default router;
