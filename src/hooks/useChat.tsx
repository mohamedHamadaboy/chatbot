import { useChatStore } from "./useChatStore";

export const useChat = () => {
  const messages = useChatStore((state) => state.messages);
  const addMessage = useChatStore((state) => state.addMessage);

  const fetchAgentResponse = async (input: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a helpful AI assistant." },
          { role: "user", content: input },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch the response from OpenAI");
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  };

  const sendMessage = async (text: string) => {
    addMessage({ sender: "user", text });

    try {
      const response = await fetchAgentResponse(text);
      addMessage({ sender: "agent", text: response });
    } catch (error) {
      console.error(error);
      addMessage({
        sender: "agent",
        text: "Désolé, une erreur est survenue.",
      });
    }
  };

  return { messages, sendMessage };
};
