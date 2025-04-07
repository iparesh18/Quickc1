export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }
  
    const apiKey = process.env.OPENROUTER_API_KEY;
  
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(req.body),
    });
  
    const data = await response.json();
    res.status(response.status).json(data);
  }
  