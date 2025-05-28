import readline from 'readline';
import { config } from 'dotenv';
import OpenAI from 'openai';

// Load environment variables
config();

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Setup readline interface for console input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Fixed system prompt
const systemPrompt = "You are a helpful assistant.";

rl.question("Enter your prompt: ", async (userPrompt) => {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ]
    });

    const reply = chatCompletion.choices[0].message.content;
    const tokens = chatCompletion.usage.total_tokens;

    console.log("\nAssistant's reply:");
    console.log(reply);
    console.log(`\nToken usage: ${tokens}`);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    rl.close();
  }
});
