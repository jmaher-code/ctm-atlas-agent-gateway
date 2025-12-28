import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: "health check"
    });

    return res.status(200).json({
      status: "ok",
      openai: "authenticated",
      response_id: response.id
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
      type: err.type,
      code: err.code
    });
  }
}
