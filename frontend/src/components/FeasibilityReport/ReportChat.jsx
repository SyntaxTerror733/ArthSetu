import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  User,
  AlertCircle,
  Loader2,
  HelpCircle,
} from 'lucide-react';
import { useChatQuestion } from '../../hooks/useApi';

/**
 * ReportChat Component
 * Interactive Q&A Chatbot for follow-up questions on the feasibility report.
 * 
 * Props expected:
 * @param {string} district - District name (e.g. 'Ghaziabad')
 * @param {string} businessCategory - Business sector/category (e.g. 'Retail')
 * @param {Object} report - Feasibility report dictionary object
 * @param {string} currentLang - Language selection ('en' | 'hi')
 */
export default function ReportChat({
  district = '',
  businessCategory = '',
  report = null,
  currentLang = 'en',
}) {
  const [messages, setMessages] = useState([]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [chatError, setChatError] = useState(null);
  const chatContainerRef = useRef(null);

  const { askQuestion, loading } = useChatQuestion();

  // Extract clean district name
  const cleanDistrict = (district || 'Local Area').split(',')[0].trim();
  const cleanCategory = businessCategory || 'Micro Enterprise';

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (messages.length > 0 || loading) {
      scrollToBottom();
    }
  }, [messages, loading]);

  const handleSendQuestion = async (qText) => {
    const textToSend = qText || inputQuestion.trim();
    if (!textToSend || loading) return;

    // Reset error state for new attempt
    setChatError(null);

    // Create user message entry
    const userMsgId = Date.now().toString();
    const newUserMsg = {
      id: userMsgId,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputQuestion('');

    try {
      const res = await askQuestion(cleanDistrict, cleanCategory, textToSend, report || {});
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: res?.answer || (currentLang === 'hi' ? 'उत्तर प्राप्त नहीं हुआ।' : 'No answer received.'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat API call error:', err);
      setChatError(
        err.message ||
          (currentLang === 'hi'
            ? 'सवाल का जवाब पाने में परेशानी हो रही है — कृपया थोड़ी देर बाद पुनः प्रयास करें।'
            : "I'm having trouble answering right now — please try again in a moment.")
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendQuestion();
  };

  const handleSuggestionClick = (suggestionText) => {
    handleSendQuestion(suggestionText);
  };

  const promptSuggestions = [
    currentLang === 'hi' ? 'यहां प्रतिस्पर्धा अधिक क्यों है?' : 'Why is competition high here?',
    currentLang === 'hi' ? 'मुख्य बाजार अवसर क्या हैं?' : 'What are the key market opportunities?',
    currentLang === 'hi' ? 'मैं अपना लाभ मार्जिन कैसे बढ़ा सकता हूं?' : 'How can I improve my profit margin?',
  ];

  return (
    <div
      className="dashboard-card"
      style={{
        marginTop: '1.5rem',
        padding: '1.5rem',
        borderTop: '3px solid var(--color-emerald, #059669)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
          paddingBottom: '0.75rem',
          borderBottom: '1px solid var(--color-border, #E2E8F0)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: 'rgba(5, 150, 105, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#059669',
            }}
          >
            <Bot size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              {currentLang === 'hi'
                ? 'व्यवहार्यता रिपोर्ट एआई सहायक'
                : 'Feasibility Report AI Assistant'}
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#64748B', margin: 0 }}>
              {currentLang === 'hi'
                ? 'अपनी व्यवहार्यता रिपोर्ट के बारे में कोई भी प्रश्न पूछें'
                : `Ask follow-up questions about the ${cleanCategory} report in ${cleanDistrict}`}
            </p>
          </div>
        </div>

        <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
          <Sparkles size={12} />
          <span>Interactive AI</span>
        </span>
      </div>

      {/* Conversation Container */}
      <div
        ref={chatContainerRef}
        style={{
          minHeight: messages.length > 0 ? '160px' : '80px',
          maxHeight: '380px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.875rem',
          padding: '0.5rem 0.25rem',
          marginBottom: '1rem',
        }}
      >
        {messages.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '1.25rem 1rem',
              backgroundColor: 'var(--color-bg, #F8FAFC)',
              borderRadius: '8px',
              border: '1px dashed var(--color-border, #CBD5E1)',
            }}
          >
            <HelpCircle size={24} style={{ color: '#059669', margin: '0 auto 0.5rem' }} />
            <p style={{ fontSize: '0.875rem', color: '#475569', fontWeight: 500, marginBottom: '0.75rem' }}>
              {currentLang === 'hi'
                ? 'इस रिपोर्ट के बारे में एक प्रश्न पूछें — जैसे "यहां प्रतिस्पर्धा अधिक क्यों है?"'
                : "Ask a question about this report — e.g. 'Why is competition high here?'"}
            </p>
            {/* Quick Prompt Suggestions */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
              {promptSuggestions.map((sug, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSuggestionClick(sug)}
                  disabled={loading}
                  style={{
                    fontSize: '0.75rem',
                    padding: '4px 10px',
                    borderRadius: '16px',
                    border: '1px solid rgba(5, 150, 105, 0.3)',
                    backgroundColor: '#FFFFFF',
                    color: '#047857',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  💡 {sug}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                maxWidth: '85%',
                padding: '0.75rem 1rem',
                borderRadius: msg.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                backgroundColor: msg.sender === 'user' ? '#059669' : '#F1F5F9',
                color: msg.sender === 'user' ? '#FFFFFF' : '#0F172A',
                fontSize: '0.875rem',
                lineHeight: 1.5,
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              }}
            >
              {msg.text}
            </div>
            <span
              style={{
                fontSize: '0.6875rem',
                color: '#94A3B8',
                marginTop: '3px',
                marginRight: msg.sender === 'user' ? '4px' : '0',
                marginLeft: msg.sender === 'bot' ? '4px' : '0',
              }}
            >
              {msg.timestamp}
            </span>
          </div>
        ))}

        {/* Loading Indicator */}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669', fontSize: '0.8125rem', padding: '0.5rem' }}>
            <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
            <span>{currentLang === 'hi' ? 'एआई उत्तर सोच रहा है...' : 'AI Assistant is thinking...'}</span>
          </div>
        )}
      </div>

      {/* Inline Error Alert if call fails without clearing chat history */}
      {chatError && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#FEF2F2',
            border: '1px solid #FCA5A5',
            borderRadius: '6px',
            padding: '0.5rem 0.75rem',
            marginBottom: '0.75rem',
            fontSize: '0.8125rem',
            color: '#991B1B',
          }}
        >
          <AlertCircle size={16} style={{ flexShrink: 0 }} />
          <span>{chatError}</span>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          placeholder={
            currentLang === 'hi'
              ? 'इस रिपोर्ट के बारे में सवाल पूछें — जैसे "यहाँ प्रतिस्पर्धा अधिक क्यों है?"'
              : "Ask a question about this report — e.g. 'Why is competition high here?'"
          }
          disabled={loading}
          style={{
            flex: 1,
            padding: '0.625rem 0.875rem',
            borderRadius: '6px',
            border: '1px solid var(--color-border, #CBD5E1)',
            fontSize: '0.875rem',
            outline: 'none',
            backgroundColor: '#FFFFFF',
            color: '#0F172A',
          }}
        />
        <button
          type="submit"
          disabled={loading || !inputQuestion.trim()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0 1.25rem',
            height: '40px',
            borderRadius: '6px',
            backgroundColor: '#059669',
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: '0.875rem',
            border: 'none',
            cursor: loading || !inputQuestion.trim() ? 'not-allowed' : 'pointer',
            opacity: loading || !inputQuestion.trim() ? 0.6 : 1,
            transition: 'all 0.15s ease',
          }}
        >
          <span>{currentLang === 'hi' ? 'पूछें' : 'Ask'}</span>
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
