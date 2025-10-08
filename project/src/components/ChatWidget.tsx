import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, HelpCircle, RotateCcw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useLocation } from 'react-router-dom';

interface Message {
  type: 'user' | 'bot';
  content: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);
  const location = useLocation();
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const pageContextMap: { [key: string]: string } = {
    '/': `Welcome to the Taxpayer Portal! Here are some common questions I can help with:
- How do I search for my tax bill?
- Where can I view my property information?
- How do I make a payment?
- What payment methods are accepted?
- How do I submit an appeal?`,
    '/taxpayer-apps': `Welcome to Taxpayer Applications! Here's what you can do here:
- Search and pay tax bills
- Look up real property information
- View gross receipt bills
- Submit and track appeals
- Access online listing services`,
    '/taxpayer-apps/bill-search': `The Bill Search page allows you to:
- Search bills by owner name, bill number, or address
- View and filter search results
- Hold multiple bills for payment
- Export search results
- Print bill information`,
    '/taxpayer-apps/payment': `On the Payment page, you can:
- Review selected bills for payment
- Choose from multiple payment methods
- Process secure payments
- View payment history
- Print payment receipts`,
    '/taxpayer-apps/reports': `The Reports page offers:
- Various report types for analysis
- Customizable parameters
- Export options
- Historical data access
- Comparative analysis tools`
  };

  const commonQuestions = [
    {
      q: "How do I search for my tax bill?",
      a: "You can search for your tax bill using:\n- Bill number\n- Owner name\n- Property address\n- Parcel ID"
    },
    {
      q: "What payment methods are accepted?",
      a: "We accept:\n- Credit/Debit cards\n- Bank transfers\n- Digital wallets"
    },
    {
      q: "How do I get a copy of my bill?",
      a: "You can:\n1. Search for your bill\n2. Click on the bill number\n3. Use the Print Bill button"
    },
    {
      q: "When does interest begin?",
      a: "Interest begins on the date shown on your bill. You can view this date in the bill details or calculate interest for a specific date using the Recalculate Interest feature."
    }
  ];

  useEffect(() => {
    if (isOpen) {
      setMessages([{ type: 'bot', content: 'Hello! How can I help you today?' }]);
    }
  }, [location.pathname, isOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleQuestionClick = (question: string) => {
    setMessages(prev => [...prev, { type: 'user', content: question }]);
    
    const matchedQuestion = commonQuestions.find(q => q.q === question);
    if (matchedQuestion) {
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', content: matchedQuestion.a }]);
        setShowSuggestions(true);
      }, 500);
    }
  };

  const handleRestart = () => {
    setMessages([{ type: 'bot', content: 'Hello! How can I help you today?' }]);
    setShowSuggestions(true);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setInput('');

    // Simple keyword matching for responses
    const lowerInput = userMessage.toLowerCase();
    let botResponse = "I'm not sure about that. Please try asking something else or rephrase your question.";

    // Check for matches in common questions
    const matchedQuestion = commonQuestions.find(q => 
      lowerInput.includes(q.q.toLowerCase()) || 
      q.q.toLowerCase().includes(lowerInput)
    );

    if (matchedQuestion) {
      botResponse = matchedQuestion.a;
    } else if (lowerInput.includes('payment') || lowerInput.includes('pay')) {
      botResponse = "You can pay your bills using credit/debit cards, bank transfers, or digital wallets. Select the bills you want to pay and click 'Make Payment' to proceed.";
    } else if (lowerInput.includes('search') || lowerInput.includes('find')) {
      botResponse = "You can search for bills using the bill number, owner name, property address, or parcel ID. Use the advanced search for more specific criteria.";
    } else if (lowerInput.includes('print') || lowerInput.includes('copy')) {
      botResponse = "To print a bill:\n1. Find your bill in the search results\n2. Click on the bill number\n3. Click the 'Print Bill' button on the bill details page";
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', content: botResponse }]);
      setShowSuggestions(true);
    }, 500);
  };

  return (
    <div className="fixed bottom-16 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg w-72 md:w-80 flex flex-col border">
          <div className="p-2 border-b bg-[#002B5B] text-white rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              <span className="font-medium">Help Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div 
            ref={chatBodyRef}
            className="flex-1 overflow-y-auto p-2 max-h-[450px] space-y-2"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`rounded-lg px-2.5 py-1.5 max-w-[85%] ${
                    message.type === 'user'
                      ? 'bg-[#002B5B] text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <ReactMarkdown className="text-[11px] whitespace-pre-wrap leading-tight">
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            
            {showSuggestions && (
              <div className="space-y-1 mt-1.5 border-t pt-1.5">
                <p className="text-xs font-medium text-gray-700">
                  {messages.length > 0 ? 'More questions I can help with:' : 'How can I help you?'}
                </p>
                {commonQuestions.map((q, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(q.q)}
                    className="w-full text-left text-[11px] py-1 px-1.5 rounded hover:bg-gray-50 border text-gray-700 hover:text-[#002B5B] hover:border-[#002B5B] transition-colors flex items-center gap-1"
                  >
                    <span className="w-3 h-3 rounded-full bg-gray-100 flex items-center justify-center text-[9px] text-gray-600">
                      {index + 1}
                    </span>
                    {q.q}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="p-2 border-t">
            <button
              onClick={handleRestart}
              className="flex items-center gap-1 px-2 py-1 mb-1.5 text-[11px] text-[#002B5B] hover:bg-gray-50 border border-[#002B5B] rounded w-full justify-center"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear Chat</span>
            </button>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 px-2 py-1 border rounded text-[11px] focus:outline-none focus:border-[#002B5B]"
              />
              <button
                type="submit"
                className="bg-[#002B5B] text-white p-1.5 rounded hover:bg-[#003875]"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#002B5B] text-white p-3 rounded-full shadow-lg hover:bg-[#003875] transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default ChatWidget;