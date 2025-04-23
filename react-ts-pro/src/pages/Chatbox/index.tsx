import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, List, ListItem, Typography } from '@mui/material';

// 类型定义
interface Message {
    role: 'user' | 'assistant' | 'loading';
    content: string;
}

interface OpenAIResponse {
    choices: { message: { content: string } }[];
}

const Chatbox: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dotCount, setDotCount] = useState<number>(1); // 控制点的数量
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // 动态点状动画
    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setDotCount((prev) => (prev % 3) + 1); // 循环1->2->3
            }, 300); // 每300ms更新
            return () => clearInterval(interval); // 清理定时器
        }
    }, [isLoading]);

    // 自动滚动到底部
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // 处理发送消息
    const handleSend = async () => {
        if (!input.trim()) return;

        // 添加用户消息
        const userMessage: Message = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // 添加加载中消息
        const loadingMessage: Message = { role: 'loading', content: '.' };
        setMessages((prev) => [...prev, loadingMessage]);

        try {
            // 调用OpenAI API
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_OPENAI_API_KEY', // 替换为你的API密钥
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [...messages, userMessage].map(({ role, content }) => ({
                        role: role === 'loading' ? 'assistant' : role,
                        content,
                    })),
                    max_tokens: 500,
                }),
            });

            if (!response.ok) throw new Error('API调用失败');

            const data: OpenAIResponse = await response.json();
            const assistantMessage: Message = {
                role: 'assistant',
                content: data.choices[0].message.content,
            };

            // 移除加载中消息，添加模型回复
            setMessages((prev) => [...prev.filter((msg) => msg.role !== 'loading'), assistantMessage]);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage: Message = {
                role: 'assistant',
                content: '抱歉，API调用失败，请稍后重试。',
            };
            setMessages((prev) => [...prev.filter((msg) => msg.role !== 'loading'), errorMessage]);
        } finally {
            setIsLoading(false);
            setDotCount(1); // 重置点数
        }
    };

    // 处理输入框按Enter键发送
    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    return (
        <Box className="flex flex-col h-screen max-w-2xl mx-auto p-4 bg-gray-100">
            {/* 聊天窗口 */}
            <Box
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 bg-white rounded-lg shadow-md"
            >
                <List>
                    {messages.map((message, index) => (
                        <ListItem
                            key={index}
                            sx={{
                                display: 'flex',
                                justifyContent: message.role === 'user' ? 'flex-start' : 'flex-end',
                                mb: 1,
                            }}
                        >
                            <Box
                                sx={{
                                    maxWidth: '70%',
                                    p: 2,
                                    borderRadius: 3,
                                    bgcolor:
                                        message.role === 'user'
                                            ? '#e3f2fd'
                                            : message.role === 'loading'
                                                ? '#4caf50'
                                                : '#4caf50',
                                    color: message.role === 'user' ? 'black' : 'white',
                                    boxShadow: 1,
                                    position: 'relative',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: '25%',
                                        [message.role === 'user' ? 'left' : 'right']: '-20px',
                                        border: '10px solid transparent',
                                        borderColor:
                                            message.role === 'user'
                                                ? '#e3f2fd transparent transparent transparent'
                                                : message.role === 'loading'
                                                    ? '#4caf50 transparent transparent transparent'
                                                    : '#4caf50 transparent transparent transparent',
                                        transform: message.role === 'user' ? 'rotate(90deg)' : 'rotate(-90deg)',
                                    },
                                }}
                            >
                                <Typography>
                                    {
                                        message.role === 'loading' ? (
                                        <div className="w-[1.125rem]">
                                            <span className="inline-block">{'.'.repeat(dotCount)}</span>
                                        </div>
                                    ) : (
                                        message.content
                                    )}
                                </Typography>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* 输入区域 */}
            <Box className="mt-4 flex gap-2">
                <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="输入你的消息..."
                    variant="outlined"
                    className="bg-white"
                    disabled={isLoading}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="px-6"
                >
                    发送
                </Button>
            </Box>
        </Box>
    );
};

export default Chatbox;