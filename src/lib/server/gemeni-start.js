import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = process.env.API_KEY;

// @ts-ignore
const genAI = new GoogleGenerativeAI(API_KEY);

async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt =
        "put promt shit here";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}

run();