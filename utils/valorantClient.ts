import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export default axios.create({
   baseURL: 'https://eu.api.riotgames.com/val',
   timeout: 1000,
   headers: { 'X-Riot-Token': process.env.RIOT_API_KEY },
});
