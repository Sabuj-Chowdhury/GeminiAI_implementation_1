require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { default: axios } = require("axios");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  // systemInstruction: "You are a MERN expert.",
});

app.use(express.json());
app.use(cors());

// text to text route
app.get("/test", async (req, res) => {
  //   const prompt = "tell me about yourself";
  const prompt = req.query?.prompt;
  if (!prompt) {
    return res.send({ message: "please provide a prompt in the query!" });
  }

  const result = await model.generateContent(prompt);
  //   console.log(result.response.text());
  res.send({ ans: result.response.text() });
});

// Creates a chat conversation
app.get("/chat", async (req, res) => {
  const prompt = req.query?.prompt;
  if (!prompt) {
    return res.send({ message: "Please provide prompt in the query!" });
  }

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: "when i give you any prompt/text you have to tell me whether it is true or false ",
          },
        ],
      },
      {
        role: "model",
        parts: [{ text: "ok" }],
      },
      {
        role: "user",
        parts: [{ text: "Human can fly" }],
      },
      {
        role: "model",
        parts: [{ text: "False, Human can't fly." }],
      },
      {
        role: "user",
        parts: [{ text: "I can beat horse in a race!" }],
      },
      {
        role: "model",
        parts: [{ text: "false." }],
      },
      {
        role: "user",
        parts: [{ text: "Aliens do exist" }],
      },
      {
        role: "model",
        parts: [{ text: "false" }],
      },
      {
        role: "user",
        parts: [{ text: "India is country" }],
      },
      {
        role: "model",
        parts: [{ text: "true" }],
      },
      {
        role: "user",
        parts: [{ text: "India is food" }],
      },
      {
        role: "model",
        parts: [{ text: "false" }],
      },
      {
        role: "user",
        parts: [{ text: "India is heaven" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "false, heaven or hell is just theory, no existence in real world",
          },
        ],
      },
    ],
  });

  let result = await chat.sendMessage(prompt);
  const ans = result.response.text();
  res.send({ answer: ans });
});

// generate JSON  ***BUGS : can not handle complex prompt or more tha 2 tokens can't handle
app.get("/json", async (req, res) => {
  const prompt = req.query?.prompt;
  if (!prompt) {
    return res.send({ message: "Please provide prompt in the query!" });
  }

  const finalPrompt = `${prompt} generate basic JSON data using this JSON schema:

output = {'key': value}
Return: Array<output>`;

  // const finalPrompt = `
  // ${prompt}.generate a JSON schema:
  //  output = {'property': string}
  //  Return: Array<output>`;
  const result = await model.generateContent(finalPrompt);
  const output = result.response.text().slice(7, -4);
  // const ans = result.response.text();
  res.send(JSON.parse(output));
});

// Image to text (generate text content about that image form URL)
// *****BUGS: anything other imageURL crashes the app*****
app.get("/image", async (req, res) => {
  const prompt = req.query?.prompt;
  if (!prompt) {
    return res.send({ message: "Provide query prompt(URL)!" });
  }

  // Fetch the image from the URL
  const imageResp = await axios.get(prompt, { responseType: "arraybuffer" });
  // const imageBuffer = imageResp.data;
  // console.log(imageBuffer);

  const result = await model.generateContent([
    {
      inlineData: {
        data: Buffer.from(imageResp.data).toString("base64"),
        mimeType: "image/jpeg",
      },
    },
    "Tell me about the details of the image.",
  ]);
  // console.log(result.response.text());
  res.send({ Description: result.response.text() });
});

app.get("/", (req, res) => {
  res.send("hurrrrraaaaahhhhh!!");
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
