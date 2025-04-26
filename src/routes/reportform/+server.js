import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const data = await request.json(); // Parse the entire JSON dictionary
    console.log(data); // Logs the whole dict

    // This is for accessing each individual thingy 
    const { expenses, fixedCosts, variableCosts, revenues, rawMaterials, totalExpenses, totalFixedCosts, totalVariableCosts, totalRevenues, totalCosts, profit } = data;

    return json({ registered: true, message: 'Success' });
}

