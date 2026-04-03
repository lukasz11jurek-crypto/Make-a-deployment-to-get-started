import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ELEVEN_API_KEY = process.env.ELEVEN_API_KEY;

app.post("/voice", async (req, res) => {
  const userText = "Klient dzwoni";

  const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Jesteś profesjonalną recepcjonistką mówiącą po polsku."
        },
        {
          role: "user",
          content: userText
        }
      ]
    })
  });

  const data = await aiResponse.json();
  const text = data.choices[0].message.content;

  const voice = await fetch("https://api.elevenlabs.io/v1/text-to-speech", {
    method: "POST",
    headers: {
      "xi-api-key": ELEVEN_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: text
    })
  });

  const audio = await voice.arrayBuffer();

  res.set("Content-Type", "audio/mpeg");
  res.send(Buffer.from(audio));
});

app.listen(3000, () => console.log("Server działa 🚀"));
