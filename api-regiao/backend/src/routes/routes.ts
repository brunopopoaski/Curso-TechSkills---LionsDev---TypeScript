import { type Request, type Response, Router } from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const COUNTRY_API_KEY = process.env.KEY_API_COUNTRIES;

const router = Router();

router.get('/countries', async (req: Request, res: Response) => {
    
    const response = await fetch(
        'https://api.restcountries.com/countries/v5?response_fields=names.common,region,capital,population,flag&limit=100',
        { headers: { 'Authorization': `Bearer ${COUNTRY_API_KEY}` } }
    );
    const data = await response.json();
    res.json(data);
    
})

export default router;