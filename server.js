import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;
const API_KEY ="73b0ff22b9eaa9b5ef874005d20948f31004d1de9324e714878b64a051d27b3a"; 

app.use(cors());
app.use(express.json());
//p.use(cors({ origin: "http://localhost:5173" }));
app.use(cors({ origin: "https://ai-search-assistant.vercel.app/" }));

app.post("/search", async (req, res) => {
    try {
        const userMessage = req.body.query;
        const API_URL = "https://api.together.xyz/v1/chat/completions";

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
                messages: [{ role: "user", content: userMessage }]
            }),
        });

        const data = await response.json();
        res.json({ response: data.choices[0].message.content });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
