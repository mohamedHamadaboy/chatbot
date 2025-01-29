import React, { useState, useEffect, useRef } from "react";
import {
  VStack,
  Input,
  Center,
  Heading,
  IconButton,
  Flex,
  Text,
  Box,
  HStack,
} from "@chakra-ui/react";
import { useChat } from "../hooks/useChat";
import { InputGroup } from "../components/ui/input-group";
import { EnterIcon } from "../assets/icons/other-icons";
import { useMemo } from "react";

interface ChatBoxProps {
  conversation?: {
    id: string;
    title: string;
    messages: { sender: "user" | "agent"; text: string }[];
  };
}

const ChatBox: React.FC<ChatBoxProps> = ({ conversation }) => {
  const [input, setInput] = useState("");
  const { sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const messages = useMemo(
    () => conversation?.messages || [],
    [conversation?.messages]
  );

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {conversation && (
        <Flex direction="column" h="100%" p={5}>
          <VStack align="stretch" overflowY="auto" flex={1} p={4} bg="white">
            {conversation.messages.map((msg, index) => (
              <Flex
                key={index}
                justify={msg.sender === "user" ? "flex-end" : "flex-start"}
                m={{ base: 2, md: 0 }}
              >
                <Box
                  bg={msg.sender === "user" ? "gray.200" : "cyan.50"}
                  color={msg.sender === "user" ? "black" : "black"}
                  p={3}
                  borderRadius="lg"
                  maxW="70%"
                  shadow="md"
                >
                  <Text>{msg.text}</Text>
                </Box>
              </Flex>
            ))}
            <div ref={messagesEndRef} />
          </VStack>

          {conversation.messages.length === 0 && (
            <Center flex="1">
              <VStack gap="6">
                <Heading size="3xl">Comment je peux t'aider ?</Heading>
              </VStack>
            </Center>
          )}

          <Box bg="white" p={4}>
            <HStack>
              <InputGroup
                flex={1}
                endElement={
                  <IconButton
                    fontSize="2xl"
                    size="sm"
                    borderRadius="full"
                    disabled={input.trim() === ""}
                    onClick={handleSend}
                  >
                    <EnterIcon fontSize="2xl" />
                  </IconButton>
                }
              >
                <Input
                  placeholder="Votre Message"
                  variant="subtle"
                  size="lg"
                  borderRadius="3xl"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </InputGroup>
            </HStack>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default ChatBox;
