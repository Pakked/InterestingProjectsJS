const axios = require('axios');
const openai = require('openai');
const config = require('./config');

openai.apiKey = config.openaiApiKey;

const generatePoem = async (prompt) => {
  try {
    const response = await openai.Completion.create({
      prompt: prompt,
      model: 'text-davinci-002',
      temperature: 0.7,
      max_tokens: 300,
    });
    console.log(response.choices[0].text);
  } catch (error) {
    console.error(error);
  }
}

const prompt = 'Write a poem about love';
generatePoem(prompt);
