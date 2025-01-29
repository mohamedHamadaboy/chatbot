import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Message {
  sender: "user" | "agent";
  text: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

interface ChatStore {
  conversations: Conversation[];
  currentConversationId: string | null;
  setCurrentConversationId: (id: string | null) => void;
  removeConversation: (id: string | null) => void;
  addConversation: (conversation: Conversation) => void;
  addMessage: (message: Message) => void;
  clearConversations: () => void;
}

export const useChatStore = create(
  persist<ChatStore>(
    (set, get) => ({
      conversations: [],
      currentConversationId: null,

      setCurrentConversationId: (id: string | null) =>
        set({ currentConversationId: id }),

      addConversation: (conversation: Conversation) =>
        set((state) => ({
          conversations: [conversation, ...state.conversations],
          currentConversationId: conversation.id,
        })),

      addMessage: (message: Message) => {
        const { currentConversationId, conversations } = get();
        if (!currentConversationId) return;

        set({
          conversations: conversations.map((conv) =>
            conv.id === currentConversationId
              ? { ...conv, messages: [...conv.messages, message] }
              : conv
          ),
        });
      },

      removeConversation: (id) =>
        set((state) => {
          const updatedConversations = state.conversations.filter(
            (conv) => conv.id !== id
          );
          return {
            conversations: updatedConversations,
            currentConversationId:
              state.currentConversationId === id && updatedConversations.length
                ? updatedConversations[0].id
                : null,
          };
        }),

      clearConversations: () =>
        set({ conversations: [], currentConversationId: null }),
    }),

    {
      name: "chat-storage",
    }
  )
);
