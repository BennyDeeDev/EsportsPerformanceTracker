import mongoose from 'mongoose';

export const NoteSchema = new mongoose.Schema({
   note: {
      type: Object,
      required: true,
      id: {
         type: String,
         required: true,
      },
      text: {
         type: String,
         required: true,
      },
   },
});

export const Note = mongoose.model('Note', NoteSchema);
