import { Configuration, OpenAIApi } from 'openai';
import { NextResponse } from 'next/server';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const systemPrompt = `You are a helpful AI assistant for an e-commerce and local business platform. Your task is to provide relevant product recommendations and local store locations based on user queries. Always respond with a JSON object containing three keys: 'chat_response', 'products', and 'locations'. The 'chat_response' should be a brief, friendly message. The 'products' should be an array of product objects, each containing 'name', 'category', 'price', 'description', 'productUrl', and 'graphicUrl'. The 'locations' should be an array of location objects, each containing 'name' and 'address'. Ensure all responses are family-friendly and appropriate for all ages.`;

export async function POST(request) {
  try {
    const { query } = await request.json();

    const completion = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: query }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const responseContent = completion.data.choices[0].message.content;
    const parsedResponse = JSON.parse(responseContent);

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
  }
}