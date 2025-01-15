import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_API_KEY = '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';

export const getChatbotResponse = async (message) => {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo', 
        messages: [{ role: 'user', content: message }],
        max_tokens: 150, 
        temperature: 0.7, 
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content; 
  } catch (error) {
    console.error('Erreur avec l\'API OpenAI :', error);
    return "Je suis désolé, je ne peux pas répondre pour le moment.";
  }
};
