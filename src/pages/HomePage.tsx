import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import ChatBot from "../components/Chatbot";
import { Tooltip } from "../components/ui/tooltip";
import { useChatStore } from "../hooks/useChatStore";
import { SidebarIcon } from "../assets/icons/sidebar-icons";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const conversations = useChatStore((state) => state.conversations);
  const currentConversationId = useChatStore(
    (state) => state.currentConversationId
  );
  const setCurrentConversationId = useChatStore(
    (state) => state.setCurrentConversationId
  );
  const addConversation = useChatStore((state) => state.addConversation);
  const removeConversation = useChatStore((state) => state.removeConversation);

  const handleNewChat = () => {
    const newConversation = {
      id: Date.now().toString(),
      title: `Chat ${conversations.length + 1}`,
      messages: [],
    };
    addConversation(newConversation);
  };

  const handleDeleteChat = (id: string) => {
    removeConversation(id);
  };

  const currentConversation = conversations.find(
    (conv) => conv.id === currentConversationId
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Flex h="100vh" bg="gray.100" direction={{ base: "column", md: "row" }}>
      <Box
        w={{ base: "full", md: isMenuOpen ? "300px" : "80px" }}
        bg="bg.muted"
        color="white"
        p={4}
        overflowY="auto"
        transition="width 0.3s ease"
      >
        <Flex alignItems="center" justifyContent="space-between" mb={4}>
          <Text
            fontSize="lg"
            fontWeight="bold"
            display={isMenuOpen ? "block" : "none"}
            color="gray.800"
          >
            Digitalkin
          </Text>
          <Flex>
            <Tooltip
              content="Close sidebar"
              positioning={{ placement: "right" }}
              showArrow
            >
              <IconButton variant="ghost" onClick={toggleMenu}>
                <SidebarIcon fontSize="2xl" color="fg.muted" />
              </IconButton>
            </Tooltip>
          </Flex>
        </Flex>

        {isMenuOpen && (
          <VStack align="start">
            <Button
              w="full"
              variant="ghost"
              colorScheme="teal"
              onClick={handleNewChat}
            >
              Nouveau Chat
            </Button>
            <Text fontSize="sm" color="gray.400">
              Historique
            </Text>

            {conversations.map((conv) => (
              <Flex alignItems={"center"} justifyContent={"center"}>
                <Button
                  key={conv.id}
                  onClick={() => setCurrentConversationId(conv.id)}
                  variant={
                    conv.id === currentConversationId ? "solid" : "ghost"
                  }
                  colorScheme={
                    conv.id === currentConversationId ? "blue" : "gray"
                  }
                  bg={
                    conv.id === currentConversationId ? "gray.400" : "gray.100"
                  }
                  color={conv.id === currentConversationId ? "white" : "black"}
                  w="full"
                  rounded="md"
                >
                  {conv.title}
                  <Icon
                    fontSize="2xl"
                    color="grey.50"
                    onClick={() => handleDeleteChat(conv.id)}
                  >
                    <IoIosClose />
                  </Icon>
                </Button>
              </Flex>
            ))}
          </VStack>
        )}
      </Box>

      <Flex flex={1} direction="column" bg="white">
        <ChatBot conversation={currentConversation} />
      </Flex>
    </Flex>
  );
};

export default HomePage;
