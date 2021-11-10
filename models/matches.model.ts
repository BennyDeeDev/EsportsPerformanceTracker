import mongoose from 'mongoose';

export const MatchSchema = new mongoose.Schema({
   match: {
      type: Object,
      required: true,
   },
});

export const Match = mongoose.model('Match', MatchSchema);
