export default function handler(req, res) {
  res.status(200).json({
    status: "ok",
    env: {
      hasOpenAIKey: Boolean(process.env.OPENAI_API_KEY),
      hasAgentId: Boolean(process.env.CTM_AGENT_ID)
    },
    timestamp: new Date().toISOString()
  });
}
