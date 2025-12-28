import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  try {
    const response = await client.responses.create({
      model: "gpt-5.1",
      input: "Say OK"
    });

    return res.status(200).json({
      success: true,
      output: response.output_text || "OK"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      type: err.name
    });
  }
}
