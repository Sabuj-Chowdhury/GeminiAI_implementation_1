require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are a MERN expert.",
});

app.use(express.json());
app.use(cors());

// test route
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

app.get("/", (req, res) => {
  res.send("hurrrrraaaaahhhhh!!");
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
