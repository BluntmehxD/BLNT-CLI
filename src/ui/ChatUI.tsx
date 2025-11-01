import React, { useState, useEffect } from 'react';
import { Box, Text, useInput, useApp } from 'ink';
import TextInput from 'ink-text-input';
import Spinner from 'ink-spinner';

interface ChatUIProps {
  onMessage: (message: string) => Promise<string>;
  provider: string;
}

export const ChatUI: React.FC<ChatUIProps> = ({ onMessage, provider }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
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

  return (
    <Box flexDirection="column" padding={1}>
      <Box borderStyle="round" borderColor="cyan" padding={1} marginBottom={1}>
        <Text color="cyan" bold>
          🤖 BLNT Interactive Chat ({provider})
        </Text>
      </Box>

      <Box flexDirection="column" marginBottom={1}>
        {messages.slice(-10).map((msg, idx) => (
          <Box key={idx} marginBottom={1}>
            <Box marginRight={1}>
              <Text color={msg.role === 'user' ? 'magenta' : 'cyan'} bold>
                {msg.role === 'user' ? '➤ You:' : '🤖 BLNT:'}
              </Text>
            </Box>
            <Box flexDirection="column">
              <Text>{msg.content}</Text>
            </Box>
          </Box>
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
