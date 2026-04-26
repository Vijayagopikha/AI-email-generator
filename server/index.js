import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildPrompt } from "./utils/promptBuilder.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
app.post("/generate", async (req, res) => {
  try {
    const {
      emailType,
      purpose,
      role,
      degree,
      experienceYears,
      experienceIn,
      tone,
      length,
    } = req.body;

   
    const prompt = buildPrompt({
      emailType,
      purpose,
      role,
      degree,
      experienceYears,
      experienceIn,
      tone,
      length,
    });

    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("✅ GEMINI RESPONSE:", text);

    res.json({ email: text });

  } catch (err) {
    console.error("❌ GEMINI ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));