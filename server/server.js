import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables from .env file
dotenv.config();

// Initialize Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const app = express();
app.use(cors());  // Enable CORS for cross-origin requests
app.use(express.json());  // Parse JSON request bodies

// Endpoint to interact with Google Generative AI and get AI-generated completion
app.post('/api/format-text', async (req, res) => {
  const { text, action } = req.body;

  if (!text) {
    return res.status(404).json({
      message: "Text not found"
    });
  }

  if (!action) {
    return res.status(404).json({
      message: "Action not found"
    });
  }

  // Define prompts based on the action
  let prompt;
  switch (action) {
    case 'Search':
      prompt = `${text}`;
      break;
    case 'Correct Text':
      prompt = `Please correct any spelling or grammatical mistakes in the given text donot explain and add too much content if text is a questoin donot answer , just give gramatical corrected form of question: ${text}`;
      break;
    case 'Explain':
      prompt = `Please provide an explanation for the given text make it simple to understand : ${text}`;
      break;
    case 'Get Code':
      prompt = `Please generate code based on the given text, do not give any explaination give only code and code should be in cpp by default  : ${text}`;
      break;
    case 'Get Summary':
      prompt = `Please summarize the given text do not make too lengthy: ${text}`;
      break;
    default:
      return res.status(400).json({ error: 'Invalid action specified' });
  }

  try {
    // Generate content with Google Generative AI based on the prompt
    const result = await model.generateContent(prompt);

    // Log the AI response for debugging
    console.log('AI Response:', result);

    // Check if the response has the generated text
    const generatedText = result.response && typeof result.response.text === 'function' ? result.response.text() : null;

    if (generatedText) {
      // Send the generated text as the response
      res.status(200).json({ generatedText });
    } else {
      // If no text is found, send an error message
      res.status(400).json({ error: 'No text returned from the AI model' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while communicating with Google Generative AI' });
  }
});

// Start the server on a specific port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
