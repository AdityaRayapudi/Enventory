import { json } from '@sveltejs/kit';
import * as gem from '$lib/server/gemeni.js';

gem.connect()

/**
 * @type {JSON| string | undefined}
 */
let environmentAnalysis;
/**
 * @type {string | JSON | undefined}
 */
let genAnalysis;
let totalScore = 0
let profitIncrease = 0

export async function POST({ request }) {
    // console.log("Hi");
    

    const data = await request.json(); // Parse the entire JSON dictionary
    // console.log(data); // Logs the whole dict

    // This is for accessing each individual thingy 
    const { fixedCosts, variableCosts, revenues, rawMaterials, totalExpenses, totalFixedCosts, totalVariableCosts, totalRevenues, totalCosts, profit } = data;

    genAnalysis = await gem.generalAnalysis(JSON.stringify(data))
    environmentAnalysis = await gem.environmentAnalysis(JSON.stringify(rawMaterials))

    // @ts-ignore
    environmentAnalysis = JSON.parse(environmentAnalysis)
    // @ts-ignore
    genAnalysis = JSON.parse(genAnalysis)
    
    // @ts-ignore
    for (const mat of environmentAnalysis) {
        totalScore += parseInt(mat["score"][0])
    }

    // @ts-ignore
    totalScore = Math.round(totalScore / environmentAnalysis.length)
    
    // @ts-ignore
    for (const improv of genAnalysis) {
        profitIncrease += improv["profit"]
    }

    return json({ registered: true, message: 'Success' });
}

export function GET() {
    const data = {
        environmentAnalysis,
        genAnalysis,
        totalScore,
        profitIncrease
    }

    return json(data)
}