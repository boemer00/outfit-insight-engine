
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, SendIcon, XIcon } from 'lucide-react';
import { useChatTranscript } from '../hooks/useChatTranscript';
import { toast } from "sonner";

// Define message types
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Sample responses for simulated AI
const sampleResponses = [
  {
    query: "have customers asked for any product that we don't offer?",
    response: "Yes, 35% of users regularly ask for jeans. These customers have primarily purchased M-size products. Would you like more details?"
  },
  {
    query: "yes please",
    response: "Our analysis shows that most requests are for slim-fit jeans in medium wash. The average price point users expect is $65-85. These customers typically purchase tops from our casual collection, suggesting they're looking to complete outfits."
  },
  {
    query: "what categories drive the most engagement?",
    response: "Formal wear drives the highest engagement with an average of 5.2 messages per conversation. Users spend 25% more time discussing formal items compared to casual wear, and request more styling advice for these products."
  },
  {
    query: "what products have low conversion rates?",
    response: "Our data shows that graphic t-shirts have a 12% lower conversion rate than other product types. Users frequently mention concerns about quality and fit accuracy. Would you like recommendations to improve this?"
  },
  {
    query: "which product features do customers ask about most often?",
    response: "Material composition is mentioned in 48% of conversations, followed by sizing accuracy (42%) and care instructions (29%). Customers considering higher-priced items are 3x more likely to ask detailed questions about materials."
  }
];

// Function to get a simulated response
const getAIResponse = (query: string): Promise<string> => {
  // Convert query to lowercase for easier matching
  const lowerQuery = query.toLowerCase().trim();
  
  // Look for an exact match in our sample responses
  const exactMatch = sampleResponses.find(item => 
    item.query.toLowerCase() === lowerQuery
  );
  
  if (exactMatch) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(exactMatch.response);
      }, 1200); // Simulate API delay
    });
  }
  
  // Look for keyword matches if no exact match
  if (lowerQuery.includes("jeans") || lowerQuery.includes("product") || lowerQuery.includes("offer")) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(sampleResponses[0].response);
      }, 1200);
    });
  }
  
  if (lowerQuery.includes("detail") || lowerQuery.includes("more") || lowerQuery.includes("yes")) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(sampleResponses[1].response);
      }, 1200);
    });
  }
  
  if (lowerQuery.includes("engagement") || lowerQuery.includes("interact")) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(sampleResponses[2].response);
      }, 1200);
    });
  }
  
  if (lowerQuery.includes("conversion") || lowerQuery.includes("rate") || lowerQuery.includes("low")) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(sampleResponses[3].response);
      }, 1200);
    });
  }
  
  if (lowerQuery.includes("feature") || lowerQuery.includes("ask") || lowerQuery.includes("question")) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(sampleResponses[4].response);
      }, 1200);
    });
  }
  
  // Default response if no match
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("I don't have specific data on that query. Try asking about product requests, engagement metrics, conversion rates, or common customer questions.");
    }, 1200);
  });
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI data assistant. Ask me questions about your customer behavior and product performance.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Add chat transcript functionality
  const { sessionId, saveChat, isLoading, error } = useChatTranscript();
  
  // Show error toast if transcript saving fails
  useEffect(() => {
    if (error) {
      toast.error("Failed to save chat transcript", {
        description: error
      });
    }
  }, [error]);
  
  // Auto scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Get AI response
    const response = await getAIResponse(inputValue);
    
    // Add AI response message
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response,
      sender: 'bot',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
    
    // Save the conversation to the database
    const fullTranscript = `User: ${inputValue}\nAI: ${response}`;
    saveChat(fullTranscript, {
      user_query: inputValue,
      ai_response: response,
      session_start_time: messages[0].timestamp.toISOString()
    });
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <>
      {/* Chat toggle button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(prev => !prev)}
          className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg flex items-center justify-center"
        >
          {isOpen ? <XIcon size={24} /> : <MessageCircle size={24} />}
        </Button>
      </div>
      
      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 flex flex-col z-40 overflow-hidden animate-in slide-in-from-bottom">
          <div className="bg-primary p-3 text-white flex items-center justify-between">
            <h3 className="font-semibold">AI Data Assistant</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-primary/90"
              onClick={() => setIsOpen(false)}
            >
              <XIcon size={18} />
            </Button>
          </div>
          
          {/* Messages area */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-4 max-w-[85%] ${message.sender === 'user' ? 'ml-auto' : 'mr-auto'}`}
              >
                <div 
                  className={`p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-gray-100 dark:bg-gray-800 rounded-tl-none'
                  }`}
                >
                  {message.content}
                </div>
                <div className={`text-xs mt-1 text-gray-500 ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-800 flex items-end gap-2">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your customer data..."
              className="min-h-[60px] resize-none flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              size="icon" 
              className="h-10 w-10"
              disabled={isTyping || !inputValue.trim() || isLoading}
            >
              <SendIcon size={18} />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
