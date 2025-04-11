export default async function handler(req, res) {
  const SUPABASE_URL = "https://ojfxbnavshemmsbbprem.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qZnhibmF2c2hlbW1zYmJwcmVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyNjEwNjIsImV4cCI6MjA1OTgzNzA2Mn0.jCCyX9Kj2IHUglYC3qE4Oa8N5rDWjYl5247GlnFVrVo"; // full key here

  if (req.method === "GET") {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/reviews?select=*`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    const data = await response.json();
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const { name, text } = req.body;

    const response = await fetch(`${SUPABASE_URL}/rest/v1/reviews`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation"
      },
      body: JSON.stringify({ name, text })
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  }

  res.status(405).json({ message: "Method not allowed" });
}
