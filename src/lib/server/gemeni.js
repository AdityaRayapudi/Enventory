import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_KEY } from '$env/static/private';


let genAI;
/**
 * @type {import("@google/generative-ai").GenerativeModel}
 */
let model;

export function connect() {
    // @ts-ignore
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
}


// @ts-ignore
export async function run(prompt) {

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}

