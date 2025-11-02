import React, { useState, useEffect, useMemo } from 'react';
import { Box, Text, useInput, useApp } from 'ink';
import TextInput from 'ink-text-input';
import Spinner from 'ink-spinner';

interface ChatUIProps {
  onMessage: (message: string) => Promise<string>;
  provider: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Memoized message component for better performance
const ChatMessage = React.memo<{ msg: Message }>(({ msg }) => (
  <Box marginBottom={1}>
    <Box marginRight={1}>
      <Text color={msg.role === 'user' ? 'magenta' : 'cyan'} bold>
        {msg.role === 'user' ? '➤ You:' : '🤖 BLNT:'}
      </Text>
    </Box>
    <Box flexDirection="column">
      <Text>{msg.content}</Text>
    </Box>
  </Box>
));

ChatMessage.displayName = 'ChatMessage';

export const ChatUI: React.FC<ChatUIProps> = ({ onMessage, provider }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { exit } = useApp();

  useInput((input, key) => {
    if (key.escape || (input === 'q' && !isLoading)) {
      exit();
    }
  });

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await onMessage(userMessage);
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      setMessages((prev) => [...prev, { role: 'assistant', content: `Error: ${errorMsg}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Only show last 10 messages, memoized for performance
  const displayedMessages = useMemo(() => messages.slice(-10), [messages]);

  return (
    <Box flexDirection="column" padding={1}>
      <Box borderStyle="round" borderColor="cyan" padding={1} marginBottom={1}>
        <Text color="cyan" bold>
          🤖 BLNT Interactive Chat ({provider})
        </Text>
      </Box>

      <Box flexDirection="column" marginBottom={1}>
        {displayedMessages.map((msg, idx) => (
          <ChatMessage key={`msg-${idx}`} msg={msg} />
        ))}
      </Box>

      {isLoading && (
        <Box>
          <Text color="cyan">
            <Spinner type="dots" />
          </Text>
          <Text color="gray"> Thinking...</Text>
        </Box>
      )}

      <Box borderStyle="single" borderColor="green" padding={1}>
        <Box marginRight={1}>
          <Text color="green" bold>
            {'>'} 
          </Text>
        </Box>
        <TextInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          placeholder="Type your message... (ESC to exit)"
        />
      </Box>

      <Box marginTop={1}>
        <Text color="gray" dimColor>
          Press ESC or 'q' to exit
        </Text>
      </Box>
    </Box>
  );
};
