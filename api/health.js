export default async function handler(req, res) {
  return res.status(200).json({
    status: "ok",
    env: {
      hasOpenAIKey: !!process.env.OPENAI_API_KEY,
      hasAgentId: !!process.env.CTM_AGENT_ID
    },
    timestamp: new Date().toISOString()
  });
}
