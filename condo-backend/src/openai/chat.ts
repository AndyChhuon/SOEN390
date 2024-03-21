import OpenAI from "openai";
import { Response } from "express";
const {
  addFinancialsToProperty,
  getIdFromToken,
  userExists,
  addToPropertiesOwned,
  getCostEntries,
} = require("../firebase/firebase");
const dotenv = require("dotenv");
dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY
  ? process.env.OPENAI_API_KEY
  : "";

const openai = new OpenAI();

openai.apiKey = openaiApiKey;

async function generateResponse(
  tokenId: String,
  messagesArr: OpenAI.Chat.ChatCompletionMessageParam[],
  res: Response
) {
  const id = await getIdFromToken(tokenId);
  if (await userExists(id)) {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful customer service agent for a condo management company. Answer questions and if the user asks you to do something, pretend to do it.",
        },
        ...messagesArr,
      ],
      stream: true,
    });

    for await (const chunk of completion) {
      if (chunk && chunk.choices[0].delta.content) {
        console.log(chunk.choices[0].delta.content);
        res.write(chunk.choices[0].delta.content);
      }
    }

    res.end();
  } else {
    res.status(404).send("User not found");
  }
}

export { generateResponse };
