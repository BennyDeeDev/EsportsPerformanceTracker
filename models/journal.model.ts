import mongoose from 'mongoose';

export const JournalSchema = new mongoose.Schema({
   journal: {
      type: Object,
      required: true,
      day: {
         type: String,
         required: true,
      },
      text: {
         type: String,
      },
   },
});

export const Journal = mongoose.model('Journal', JournalSchema);
