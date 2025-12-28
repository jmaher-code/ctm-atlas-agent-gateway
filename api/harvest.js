import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    const { input } = req.body;

    if (!input || typeof input !== "string") {
      return res.status(400).json({
        error: "Missing or invalid `input` field",
      });
    }

    if (!process.env.CTM_AGENT_ID) {
      return res.status(500).json({
        error: "CTM_AGENT_ID env var not set",
      });
    }

    const response = await openai.responses.create({
      model: "gpt-5.1",
      agent: process.env.CTM_AGENT_ID,
      input,
    });

    return res.status(200).json({
      success: true,
      output_text: response.output_text ?? null,
      output: response.output ?? null,
      raw: response,
    });
  } catch (err) {
    console.error("CTM Atlas Gateway error:", err);

    return res.status(500).json({
      success: false,
      error: err?.message || "Unhandled server error",
    });
  }
}
