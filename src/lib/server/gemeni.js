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


// @ts-ignore
export async function run(prompt) {
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
                        'recipeName': {
                            type: Type.STRING,
                            description: 'Name of the recipe',
                            nullable: false,
                        },
                    },
                    required: ['recipeName'],
                },
            },
        },
    });

    console.debug(response.text);
}

