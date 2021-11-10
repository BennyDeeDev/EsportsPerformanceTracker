import mongoose from 'mongoose';

export const RankSchema = new mongoose.Schema({
   rankDay: {
      type: Object,
      required: true,
      timestamp: {
         type: String,
         required: true,
      },
   },
});

export const Rank = mongoose.model('Rank', RankSchema);
