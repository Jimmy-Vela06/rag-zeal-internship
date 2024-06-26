import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import { Pinecone } from "@pinecone-database/pinecone";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

app.use(bodyParser.json());
app.use(cors());

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT,
});
const indexName = "idx";

async function getEmbedding(query) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/embeddings",
      {
        model: "text-embedding-ada-002",
        input: query,
      },
      {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      }
    );
    return response.data.data[0].embedding;
  } catch (error) {
    console.error("Error fetching embedding:", error);
    throw error; // Rethrow or handle as needed
  }
}

async function getChatCompletion(messages, maxTokens, temperature) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: messages,
        max_tokens: maxTokens,
        temperature: temperature,
      },
      {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching chat completion:", error);
    throw error; // Rethrow or handle as needed
  }
}

app.post("/chat", async (req, res) => {
  try {
    const chatbox = req.body.message;
    if (chatbox === "exit") {
      return res.json({ response: "Goodbye!" });
    }

    const embedding = await getEmbedding(chatbox);

    const index = pinecone.Index(indexName);
    const result = await index.query({
      vector: embedding,
      topK: 10,
      includeMetadata: true,
    });

    const context = result.matches.map((match) =>
      match.metadata.text.replace("\n", "")
    );

    const messages = [
      {
        role: "system",
        content:
          "You are William Shakespeare. Keep sentences summarized to less than 20 words. If asked to explain, give full detail. Only respond using the context provided. Do not add any extra information. For any unrelated questions, tell the user to ask something about the context.",
      },
      { role: "user", content: chatbox },
      { role: "system", content: context.join(" ") },
    ];

    const responseText = await getChatCompletion(messages, 500, 0.7);
    res.json({
      response: responseText.replace(/\\n/g, "\n").replace(/\\"/g, '"'),
    });
  } catch (error) {
    console.error("Error processing chat:", error);
    res.status(500).json({ response: "Internal Server Error" });
  }
});

app.post("/query", async (req, res) => {
  try {
    const { query, similar_vectors, response_len, temp, perspective } =
      req.body;

    const index = pinecone.Index(indexName);
    const embedding = await getEmbedding(query);

    const pineconeResult = await index.query({
      vector: embedding,
      topK: parseInt(similar_vectors),
      includeMetadata: true,
    });

    const context = pineconeResult.matches
      .map((match) => match.metadata.text.replace("\n", ""))
      .slice(0, 5);

    const messagesWithContext = [
      { role: "system", content: perspective },
      { role: "user", content: query },
      { role: "assistant", content: "Based on the following context:" },
      { role: "system", content: context.join(" ") },
    ];

    const messagesWithoutContext = [
      { role: "system", content: perspective },
      { role: "user", content: query },
    ];

    const [responseWithContext, responseWithoutContext] = await Promise.all([
      getChatCompletion(
        messagesWithContext,
        parseInt(response_len),
        parseFloat(temp)
      ),
      getChatCompletion(
        messagesWithoutContext,
        parseInt(response_len),
        parseFloat(temp)
      ),
    ]);

    res.json({
      results: [
        {
          context: context,
          response: responseWithContext.trim(),
        },
        {
          context: [],
          response: responseWithoutContext.trim(),
        },
      ],
    });
  } catch (error) {
    console.error("Error processing query:", error);
    res.status(500).json({ response: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
