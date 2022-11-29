import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `an intimate conversation with Marcus Aurelius and his life lessons
me: `;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 400,
  });
  
    const basePromptOutput = baseCompletion.data.choices.pop();
    
//     const secondPrompt = 
//   `
//   Take the table of contents and title of the blog post below and generate a blog post written in the style of Paul Graham. Make it feel like a story. Don't just list the points. Go deep into each one. Explain why.

//   Title: ${req.body.userInput}

//   Table of Contents: ${basePromptOutput.text}

//   Blog Post:
//   `
  
//   // I call the OpenAI API a second time with Prompt #2
//   const secondPromptCompletion = await openai.createCompletion({
//     model: 'text-davinci-002',
//     prompt: `${secondPrompt}`,
//     // I set a higher temperature for this one. Up to you!
//     temperature: 0.8,
// 		// I also increase max_tokens.
//     max_tokens: 1250,
//   });
  
//   // Get the output
//   const secondPromptOutput = secondPromptCompletion.data.choices.pop();

//   // Send over the Prompt #2's output to our UI instead of Prompt #1's.
//   res.status(200).json({ output: secondPromptOutput });
// };

//   when using only the inital prompt instead of promt chaining
  res.status(200).json({ output: basePromptOutput });
  };

export default generateAction;