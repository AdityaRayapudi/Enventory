import { json } from '@sveltejs/kit';
import * as gem from '$lib/server/gemeni.js';

export async function POST({ request }) {
    const data = await request.json(); // Parse the entire JSON dictionary
    // console.log(data); // Logs the whole dict

    // This is for accessing each individual thingy 
    const { fixedCosts, variableCosts, revenues, rawMaterials, totalExpenses, totalFixedCosts, totalVariableCosts, totalRevenues, totalCosts, profit } = data;

    console.log(await gem.generalAnalysis(JSON.stringify(data)));
    // console.log(await gem.environmentAnalysis(JSON.stringify(rawMaterials)));
    

    return json({ registered: true, message: 'Success' });
}

