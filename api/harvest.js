import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    const { input } = req.body;

    const response = await client.responses.create({
      model: "gpt-5.1",
      agent_id: process.env.CTM_AGENT_ID,
      input
    });

    return res.status(200).json(response.output_parsed);
  } catch (err) {
    return res.status(500).json({
      error: err.message || "Agent execution failed"
    });
  }
}
