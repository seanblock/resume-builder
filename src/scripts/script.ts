import { ResumeType } from '@/fakeData/personal';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateUpdatedResumeSimplified(): Promise<any> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": "Who won the world series in 2020?"},
          {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
          {"role": "user", "content": "Where was it played?"}],
      model: "gpt-4o",
    });
    console.log(completion.choices[0]);
    return completion.choices[0];
  } catch (error) {
    console.error("Error in simplified function:", error);
    throw error;
  }
}