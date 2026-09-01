import React, { useState, useEffect, useRef } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
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
  const configuredApiBase = (siteConfig.customFields?.chatbotApiBase as string) || 'http://localhost:3001/api';
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
    // Load local history
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
    const handleMouseUp = () => {
      const selection = window.getSelection();
      const selectedText = selection?.toString().trim();

      if (selectedText && selectedText.length > 5) {
        const range = selection?.getRangeAt(0);
        const rect = range?.getBoundingClientRect();
        if (rect) {
          setSelectionPos({
            text: selectedText,
            x: rect.left + window.scrollX,
            y: rect.top + window.scrollY - 38,
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
        content: '👋 Hi! I am your **Physical AI & Humanoid Robotics Assistant**.\n\nAsk me anything about ROS 2, Gazebo, Isaac Sim, Digital Twins, or VLA models from the book!',
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

    // Prepare recent conversation turns (up to 20 messages = 10 user + 10 assistant)
    const validHistory = updatedMessages
      .filter((m) => m.id !== 'welcome')
      .slice(-20)
      .map((m) => ({
        role: m.role === 'bot' ? 'assistant' : 'user',
        content: m.content,
      }));

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: validHistory,
          question: text,
          context: contextToSend || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
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
      console.error('Chat Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot_err_${Date.now()}`,
          role: 'bot',
          content: '⚠️ Unable to connect to the AI service. Please verify the backend is running at `' + API_BASE + '`.',
          timestamp: Date.now(),
        },
      ]);
    } finally {
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
    setCurrentSessionId(`sess_${Date.now()}`);
  };

  const quickPrompts = [
    'What is ROS 2 and its core concepts?',
    'How do I spawn a humanoid in Gazebo?',
    'Explain Isaac Sim sensor pipelines',
  ];

  return (
    <>
      {/* Floating Highlight Action Tooltip */}
      {selectionPos && (
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
          🤖 Ask AI about this selection
        </button>
      )}

      {/* Floating Launcher Button */}
      <button
        className={`${styles.floatingButton} ${isOpen ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Book Assistant"
        title="Physical AI Book Assistant"
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <div className={styles.fabIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
              <rect x="4" y="8" width="16" height="12" rx="3" />
              <circle cx="9" cy="13" r="1.5" fill="currentColor" />
              <circle cx="15" cy="13" r="1.5" fill="currentColor" />
              <path d="M9 17h6" />
            </svg>
            <span className={styles.pulseDot}></span>
          </div>
        )}
      </button>

      {/* Chat Window Panel */}
      <div className={`${styles.chatContainer} ${isOpen ? styles.open : ''}`}>
        {/* Header */}
        <div className={styles.chatHeader}>
          <div className={styles.headerInfo}>
            <div className={styles.avatarBadge}>🤖</div>
            <div>
              <h3 className={styles.title}>Physical AI Assistant</h3>
              <p className={styles.subtitle}>Grounded in Book Content</p>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.iconBtn} onClick={clearChat} title="Reset Chat History">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M8 16H3v5" />
              </svg>
            </button>
            <button className={styles.iconBtn} onClick={() => setIsOpen(false)} title="Close Chat">
              ✕
            </button>
          </div>
        </div>

        {/* Selected Context Chip */}
        {selectedContext && (
          <div className={styles.contextBanner}>
            <span className={styles.contextIcon}>📌</span>
            <div className={styles.contextText}>
              <strong>Highlighted Context:</strong> &ldquo;{selectedContext.slice(0, 80)}...&rdquo;
            </div>
            <button className={styles.closeContext} onClick={() => setSelectedContext(null)}>✕</button>
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
                    <span>✓ Verified Book Content</span>
                  </div>
                )}

                {msg.citations && msg.citations.length > 0 && (
                  <div className={styles.citationsContainer}>
                    <span className={styles.citationsLabel}>Sources:</span>
                    {msg.citations.map((c, i) => (
                      <span key={i} className={styles.citationBadge} title={c.title || c.source_id}>
                        📖 {c.source_id}
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
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className={styles.inputArea}>
          <input
            type="text"
            className={styles.textInput}
            placeholder={selectedContext ? "Ask a question about this selection..." : "Ask anything about the book..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <button
            className={styles.sendButton}
            onClick={() => handleSend()}
            disabled={isLoading || !inputValue.trim()}
            title="Send Message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;