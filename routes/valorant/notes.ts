import express from 'express';
const router = express.Router();
import { Note } from '../../models/notes.model';

router.get('/:id', (req, res) => {
   const id = req.params.id;

   const query = {
      'note.id': id,
   };

   Note.findOne(query, (error: any, result: any) => {
      if (error) {
         res.status(500).json('Internal Server Error');
         throw error;
      }

      if (!result) {
         res.status(200).json([]);
         return;
      }

      res.status(200).json(result.note);
   });
});

router.post('/:id', (req, res) => {
   const id = req.params.id;

   const notes = req.body.notes;
   const query = {
      'note.id': id,
   };

   const update = { 'note.text': notes };
   const options = { upsert: true };

   Note.findOneAndUpdate(query, update, options, (error: any, result: any) => {
      if (error) {
         res.status(500).json('Internal Server Error');
         throw error;
      }
      res.status(200).json({ notes });
   });
});

export default router;
