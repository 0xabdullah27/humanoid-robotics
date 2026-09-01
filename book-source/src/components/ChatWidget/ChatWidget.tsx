import React, { useState, useEffect, useRef } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  Bot,
  Sparkles,
  RotateCcw,
  X,
  Send,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  Terminal,
  Bookmark
} from 'lucide-react';
import styles from './ChatWidget.module.css';

interface Citation {
  source_id: string;
  title?: string;
  text?: string;
  score?: number;
}

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: number;
  citations?: Citation[];
  isVerified?: boolean;
  hasDisclaimer?: boolean;
}

interface ChatWidgetProps {
  apiEndpoint?: string;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ apiEndpoint }) => {
  const { siteConfig } = useDocusaurusContext();
  const configuredApiBase = (siteConfig.customFields?.chatbotApiBase as string) || 'https://humanoid-robotics-api.vercel.app/api';
  const API_BASE = apiEndpoint || configuredApiBase;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedContext, setSelectedContext] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectionPos, setSelectionPos] = useState<{ text: string; x: number; y: number } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize history on mount
  useEffect(() => {
    const saved = localStorage.getItem('docusaurus_chat_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        } else {
          setWelcomeMessage();
        }
      } catch {
        setWelcomeMessage();
      }
    } else {
      setWelcomeMessage();
    }

    // Text selection listener across the book
    const handleMouseUp = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest('#docusaurus-chat-container')) {
        setSelectionPos(null);
        return;
      }

      const selection = window.getSelection();
      const selectedText = selection?.toString().trim();

      if (selectedText && selectedText.length > 5) {
        const range = selection?.getRangeAt(0);
        const rect = range?.getBoundingClientRect();
        if (rect) {
          setSelectionPos({
            text: selectedText,
            x: rect.left + window.scrollX,
            y: Math.max(10, rect.top + window.scrollY - 42),
          });
        }
      } else {
        setSelectionPos(null);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const setWelcomeMessage = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'bot',
        content: '**VECTRA AI COPILOT // PHYSICAL AI ASSISTANT**\n\nI am your intelligent companion for **Physical AI & Humanoid Robotics**. Ask me any technical question regarding ROS 2 nodes, URDF modeling, Gazebo physics, Isaac Sim perception, or VLA pipelines.',
        timestamp: Date.now(),
      },
    ]);
  };

  // Save history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('docusaurus_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  const handleSend = async (overrideText?: string) => {
    const text = (overrideText || inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    const contextToSend = selectedContext;
    setSelectedContext(null);

    const validHistory = updatedMessages
      .filter((m) => m.id !== 'welcome')
      .slice(-20)
      .map((m) => ({
        role: m.role === 'bot' ? 'assistant' : 'user',
        content: m.content,
      }));

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          messages: validHistory,
          question: text,
          context: contextToSend || undefined,
        }),
      });

      clearTimeout(timeoutId);

      if (response.status === 429) {
        throw new Error('RATE_LIMIT');
      }

      if (!response.ok) {
        throw new Error(`HTTP_${response.status}`);
      }

      const data = await response.json();
      const botMsg: Message = {
        id: `bot_${Date.now()}`,
        role: 'bot',
        content: data.answer || 'No response generated.',
        timestamp: Date.now(),
        citations: data.citations || [],
        isVerified: Boolean(data.is_from_book),
        hasDisclaimer: Boolean(data.has_disclaimer),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error('Chat Error:', error);

      let userFriendlyMessage = 'Unable to connect to the AI Assistant. Please verify backend API connectivity or retry shortly.';

      if (error?.name === 'AbortError') {
        userFriendlyMessage = '**Request Timed Out**: The AI inference service took longer than 15 seconds to respond. Please try with a more specific query.';
      } else if (error?.message === 'RATE_LIMIT') {
        userFriendlyMessage = '**Rate Limit Encountered**: Multiple concurrent requests detected. Please wait a brief moment before re-submitting.';
      } else if (error?.message?.startsWith('HTTP_5')) {
        userFriendlyMessage = '**Server Endpoint Error**: Backend service encountered an unhandled exception. Please retry in a few moments.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot_err_${Date.now()}`,
          role: 'bot',
          content: userFriendlyMessage,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  const handleContextSelect = () => {
    if (selectionPos) {
      setSelectedContext(selectionPos.text);
      setIsOpen(true);
      setSelectionPos(null);
    }
  };

  const clearChat = () => {
    localStorage.removeItem('docusaurus_chat_history');
    setWelcomeMessage();
  };

  const quickPrompts = [
    'Explain ROS 2 QoS profiles and use cases',
    'How do I setup URDF inertia tensors for humanoid legs?',
    'What is Isaac ROS Visual SLAM architecture?',
  ];

  return (
    <>
      {/* Floating Highlight Action Tooltip (Only when chat is closed) */}
      {!isOpen && selectionPos && (
        <button
          className={styles.selectionTooltip}
          style={{
            position: 'absolute',
            left: `${selectionPos.x}px`,
            top: `${selectionPos.y}px`,
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            handleContextSelect();
          }}
        >
          <Bot size={14} className={styles.tooltipIcon} />
          <span>Ask AI Copilot about selection</span>
        </button>
      )}

      {/* Floating Launcher Button */}
      <button
        className={`${styles.floatingButton} ${isOpen ? styles.active : ''}`}
        onClick={() => {
          setIsOpen(!isOpen);
          setSelectionPos(null);
        }}
        aria-label="Toggle AI Book Assistant"
        title="Physical AI Copilot"
      >
        {isOpen ? (
          <X size={22} />
        ) : (
          <div className={styles.fabIcon}>
            <Bot size={24} />
            <span className={styles.pulseDot}></span>
          </div>
        )}
      </button>

      {/* Chat Window Panel */}
      <div id="docusaurus-chat-container" className={`${styles.chatContainer} ${isOpen ? styles.open : ''}`}>
        {/* Header */}
        <div className={styles.chatHeader}>
          <div className={styles.headerInfo}>
            <div className={styles.avatarBadge}>
              <Bot size={20} />
            </div>
            <div>
              <h3 className={styles.title}>VECTRA COPILOT</h3>
              <p className={styles.subtitle}>Physical AI & Robotics Intelligence</p>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.iconBtn} onClick={clearChat} title="Reset Chat History">
              <RotateCcw size={15} />
            </button>
            <button className={styles.iconBtn} onClick={() => setIsOpen(false)} title="Close Chat">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Selected Context Chip */}
        {selectedContext && (
          <div className={styles.contextBanner}>
            <Bookmark size={14} className={styles.contextIcon} />
            <div className={styles.contextText}>
              <strong>Selected Context:</strong> &ldquo;{selectedContext.slice(0, 80)}...&rdquo;
            </div>
            <button className={styles.closeContext} onClick={() => setSelectedContext(null)}>
              <X size={12} />
            </button>
          </div>
        )}

        {/* Messages */}
        <div className={styles.messagesList}>
          {messages.map((msg) => (
            <div key={msg.id} className={`${styles.message} ${msg.role === 'user' ? styles.user : styles.bot}`}>
              <div className={styles.messageBubble}>
                <div className={styles.messageContent}>{msg.content}</div>

                {/* Citations & Verified Badges */}
                {msg.isVerified && (
                  <div className={styles.verifiedTag}>
                    <CheckCircle2 size={12} />
                    <span>Grounded in Book Reference</span>
                  </div>
                )}

                {msg.citations && msg.citations.length > 0 && (
                  <div className={styles.citationsContainer}>
                    <span className={styles.citationsLabel}>Sources:</span>
                    {msg.citations.map((c, i) => (
                      <span key={i} className={styles.citationBadge} title={c.title || c.source_id}>
                        <FileText size={10} />
                        <span>{c.source_id}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className={`${styles.message} ${styles.bot}`}>
              <div className={`${styles.messageBubble} ${styles.loadingBubble}`}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        {messages.length <= 1 && (
          <div className={styles.quickPrompts}>
            {quickPrompts.map((prompt, idx) => (
              <button key={idx} className={styles.promptChip} onClick={() => handleSend(prompt)}>
                <Sparkles size={12} className={styles.promptIcon} />
                <span>{prompt}</span>
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className={styles.inputArea}>
          <input
            type="text"
            className={styles.textInput}
            placeholder={selectedContext ? "Query highlighted section..." : "Ask technical robotics question..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <button
            className={styles.sendButton}
            onClick={() => handleSend()}
            disabled={isLoading || !inputValue.trim()}
            title="Transmit Query"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;