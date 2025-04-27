// import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI, Type } from "@google/genai";
import { API_KEY } from '$env/static/private';


/**
 * @type {GoogleGenAI}
 */
let genAI;
export function connect() {
    genAI = new GoogleGenAI({ apiKey: API_KEY });
}


/**
 * @param {string} prompt
 */
export async function run(prompt) {
    const response = await genAI.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: "Analyze the environmental impact of the following raw materials please be harsh but also vocal on how to maximize profitability" + prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        'rawMaterial': {
                            type: Type.STRING,
                            description: 'Name of the raw material',
                            nullable: false,
                        },
                        'environmentalImprovement': {
                            type: Type.ARRAY,
                            description: 'Two suggestions for the company to imporove their environmental impact while maintaining profitability',
                            items: {
                                type: Type.STRING
                            },
                            nullable: false,
                        },
                        'score': {
                            type: Type.ARRAY,
                            description: 'A numeric score from 1 - 100 based how positive it is for the environment',
                            items: {
                                type: Type.STRING
                            },
                            nullable: false,
                        },
                    },
                    required: ['rawMaterial', 'environmentalImprovement', 'score'],
                },
            },
        },
    });

    return response.text
}

/**
 * @param {string} prompt
 */
export async function generalAnalysis(prompt) {
    // console.log(prompt);
    
    const response = await genAI.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: "With followings json about raw materials, revenue and costs give ways to opitimize the business " + prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        'category': {
                            type: Type.STRING,
                            description: 'The category of what the imporvment falls into start with an emoji that represents the category',
                            nullable: false,
                        },
                        'improvement': {
                            type: Type.ARRAY,
                            description: 'A dense sentence explaing the suggestion for optimization business',
                            items: {
                                type: Type.STRING
                            },
                            nullable: false,
                        },
                        'profit': {
                            type: Type.INTEGER,
                            description: 'The predicted minimum percent increase in profits please be reasonable ',
                            nullable: false,
                        },
                        'reason': {
                            type: Type.ARRAY,
                            description: 'a short explanation in a javasript list format of the predicted percent increase in profits',
                            items: {
                                type: Type.STRING
                            },
                            nullable: false,
                        },
                    },
                    required: ['category', 'improvement', 'profit', 'reason'],
                },
            },
        },
    });

    return response.text
}

/**
 * @param {string} prompt
 */
export async function environmentAnalysis(prompt) {
    const response = await genAI.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        'rawMaterial': {
                            type: Type.STRING,
                            description: 'Name of the raw material start with an emoji that represents the material',
                            nullable: false,
                        },
                        'environmentalImprovement': {
                            type: Type.ARRAY,
                            description: 'Give 2 concise but meaningful suggestions for the company to imporove their environmental impact while maintaining profitability, if applicable generate a better location for production',
                            items: {
                                type: Type.STRING
                            },
                            nullable: false,
                        },
                        'score': {
                            type: Type.ARRAY,
                            description: 'A numeric score from 1 - 100 based how positive it is for the environment',
                            items: {
                                type: Type.STRING
                            },
                            nullable: false,
                        },
                    },
                    required: ['rawMaterial', 'environmentalImprovement', 'score'],
                },
            },
        },
    });

    return response.text
}
