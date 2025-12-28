import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const { input } = req.body;

    // Plain Responses API call (NO agent_id here)
    const response = await client.responses.create({
      model: "gpt-4.1",
      input
    });

    return res.status(200).json({
      ok: true,
      text: response.output_text,
      raw: response
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: err.message,
      name: err.name
    });
  }
}
