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
  Mic,
  MicOff,
  Volume2,
  Square,
} from 'lucide-react';
import { useChatQuestion } from '../../hooks/useApi';

/**
 * ReportChat Component
 * Interactive Q&A Chatbot for follow-up questions on the feasibility report.
 * Features Web Speech API integration: Speech-to-Text input & Text-to-Speech output.
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
  suggestedQuestions,
  suggested_questions,
}) {
  const [messages, setMessages] = useState([]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [chatError, setChatError] = useState(null);

  // Web Speech API States
  const [isListening, setIsListening] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState(null);

  const chatContainerRef = useRef(null);
  const recognitionRef = useRef(null);

  const { askQuestion, loading } = useChatQuestion();

  // Extract clean district name
  const cleanDistrict = (district || 'Local Area').split(',')[0].trim();
  const cleanCategory = businessCategory || 'Micro Enterprise';

  // Available suggested questions (from props, report object, or fallback defaults)
  const activeSuggestedQuestions =
    (suggestedQuestions && suggestedQuestions.length > 0 && suggestedQuestions) ||
    (suggested_questions && suggested_questions.length > 0 && suggested_questions) ||
    (report?.suggested_questions && report.suggested_questions.length > 0 && report.suggested_questions) || [
      currentLang === 'hi' ? 'यहां प्रतिस्पर्धा अधिक क्यों है?' : 'Why is competition high here?',
      currentLang === 'hi' ? 'मुख्य बाजार अवसर क्या हैं?' : 'What are the key market opportunities?',
      currentLang === 'hi' ? 'मैं अपना लाभ मार्जिन कैसे बढ़ा सकता हूं?' : 'How can I improve my profit margin?',
    ];

  // Feature detection for Web Speech API
  const SpeechRecognition =
    typeof window !== 'undefined' &&
    (window.SpeechRecognition || window.webkitSpeechRecognition);
  const isSpeechRecognitionSupported = Boolean(SpeechRecognition);

  const isSpeechSynthesisSupported =
    typeof window !== 'undefined' && 'speechSynthesis' in window;

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

  // Clean up speech recognition & synthesis on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore cleanup errors
        }
      }
      if (isSpeechSynthesisSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSpeechSynthesisSupported]);

  // 1. Speech-to-Text (Speech Input) Handler
  const handleToggleListening = () => {
    if (!isSpeechRecognitionSupported) return;

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = currentLang === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0]?.[0]?.transcript;
        if (transcript) {
          setInputQuestion((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Failed to start SpeechRecognition:', err);
      setIsListening(false);
    }
  };

  // 2. Text-to-Speech (Speech Output) Handler
  const handleSpeakAnswer = (msgId, textToSpeak) => {
    if (!isSpeechSynthesisSupported) return;

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = currentLang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setSpeakingMsgId(msgId);
    };

    utterance.onend = () => {
      setSpeakingMsgId(null);
    };

    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      setSpeakingMsgId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleSendQuestion = async (qText) => {
    const textToSend = qText || inputQuestion.trim();
    if (!textToSend || loading) return;

    // Reset error state for new attempt
    setChatError(null);

    // Stop listening if active
    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
    }

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
      const res = await askQuestion(cleanDistrict, cleanCategory, textToSend, report || {}, currentLang);
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

  const handleSuggestionSelect = (suggestionText) => {
    setInputQuestion(suggestionText);
  };

  return (
    <div
      data-html2canvas-ignore="true"
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
                ? 'अपनी व्यवहार्यता रिपोर्ट के बारे में कोई भी प्रश्न पूछें या बोलकर बताएं'
                : `Ask follow-up questions by typing or speaking about ${cleanCategory} in ${cleanDistrict}`}
            </p>
          </div>
        </div>

        <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
          <Sparkles size={12} />
          <span>Voice & AI</span>
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
            <p style={{ fontSize: '0.875rem', color: '#475569', fontWeight: 600, marginBottom: '0.75rem' }}>
              {currentLang === 'hi' ? 'सुझाए गए प्रश्न (Suggested Questions):' : 'Suggested questions:'}
            </p>
            {/* Quick Prompt Suggestions Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
              {activeSuggestedQuestions.map((sug, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSuggestionSelect(sug)}
                  disabled={loading}
                  title={currentLang === 'hi' ? 'इनपुट में जोड़ने के लिए क्लिक करें' : 'Click to populate input'}
                  style={{
                    fontSize: '0.75rem',
                    padding: '6px 12px',
                    borderRadius: '16px',
                    border: '1px solid rgba(5, 150, 105, 0.3)',
                    backgroundColor: '#FFFFFF',
                    color: '#047857',
                    fontWeight: 500,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
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
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', maxWidth: '88%' }}>
              <div
                style={{
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

              {/* Text-to-Speech Speaker Button for Bot Responses */}
              {msg.sender === 'bot' && isSpeechSynthesisSupported && (
                <button
                  type="button"
                  onClick={() => handleSpeakAnswer(msg.id, msg.text)}
                  title={
                    speakingMsgId === msg.id
                      ? currentLang === 'hi' ? 'पढ़ना रोकें' : 'Stop speaking'
                      : currentLang === 'hi' ? 'उत्तर सुनें' : 'Read aloud'
                  }
                  style={{
                    marginTop: '4px',
                    padding: '6px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: speakingMsgId === msg.id ? '#EF4444' : 'rgba(5, 150, 105, 0.1)',
                    color: speakingMsgId === msg.id ? '#FFFFFF' : '#059669',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.15s ease',
                  }}
                >
                  {speakingMsgId === msg.id ? <Square size={14} /> : <Volume2 size={15} />}
                </button>
              )}
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
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          placeholder={
            isListening
              ? currentLang === 'hi' ? 'सुन रहा है... बोलिए' : 'Listening to your voice...'
              : currentLang === 'hi'
                ? 'इस रिपोर्ट के बारे में सवाल पूछें — जैसे "यहाँ प्रतिस्पर्धा अधिक क्यों है?"'
                : "Ask a question about this report — e.g. 'Why is competition high here?'"
          }
          disabled={loading}
          style={{
            flex: 1,
            minWidth: 0,
            padding: '0.625rem 0.875rem',
            borderRadius: '6px',
            border: isListening ? '2px solid #EF4444' : '1px solid var(--color-border, #CBD5E1)',
            fontSize: '0.875rem',
            outline: 'none',
            backgroundColor: isListening ? '#FEF2F2' : '#FFFFFF',
            color: '#0F172A',
            transition: 'all 0.15s ease',
          }}
        />

        {/* Microphone Button for Speech Input (only if supported) */}
        {isSpeechRecognitionSupported && (
          <button
            type="button"
            onClick={handleToggleListening}
            disabled={loading}
            title={
              isListening
                ? currentLang === 'hi' ? 'सुनना बंद करें' : 'Stop listening'
                : currentLang === 'hi' ? 'बोलकर सवाल पूछें' : 'Speak your question'
            }
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '6px',
              backgroundColor: isListening ? '#EF4444' : 'rgba(5, 150, 105, 0.1)',
              color: isListening ? '#FFFFFF' : '#059669',
              border: isListening ? 'none' : '1px solid rgba(5, 150, 105, 0.3)',
              cursor: loading ? 'not-allowed' : 'pointer',
              flexShrink: 0,
              transition: 'all 0.15s ease',
            }}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
        )}

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
            flexShrink: 0,
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
