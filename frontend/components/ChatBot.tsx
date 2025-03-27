
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, SendIcon, XIcon, BarChart2, PinIcon } from 'lucide-react';
import { useChatTranscript } from '../hooks/useChatTranscript';
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

// Define message types
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  graph?: GraphData | null;
}

// Graph data type
interface GraphData {
  id: string;
  title: string;
  description: string;
  type: 'bar' | 'line' | 'pie';
  data: Record<string, any>[];
  config: {
    xKey?: string;
    yKey?: string;
    dataKey?: string;
    colors?: string[];
  };
  query: string;
  createdAt: Date;
}

// Sample responses for simulated AI
const sampleResponses = [
  {
    query: "Are there any products with high return rates this week?",
    response: "Yes, slim-fit jeans in M-size have a return rate of 28%, versus an average of 15%. Should I check what are the common reasons for returns?"
  },
  {
    query: "Yes, please.",
    response: "Sure! The most common reason is Did not fit (40%). Customers often mention being too tight around the waist. Should I break down by customer demographics?"
  },
  {
    query: "No, thank you.",
    response: "Alright! 😊 Let me know if you'd to explore anything else."
  }
];

// Keywords that indicate graph generation requests
const graphKeywords = [
  'show me', 'graph', 'chart', 'visualize', 'visualization', 'plot',
  'display', 'trend', 'compare', 'comparison', 'over time', 'return rate',
  'sales'
];

// Sample graph data for demonstration
const sampleGraphs = {
  returnRates: {
    id: uuidv4(),
    title: 'Return Rates for Polo Shirts',
    description: 'Return rates for polo shirts over the last 7 days',
    type: 'bar' as const,
    data: [
      { day: 'Mon', rate: 5.2 },
      { day: 'Tue', rate: 4.8 },
      { day: 'Wed', rate: 6.1 },
      { day: 'Thu', rate: 5.7 },
      { day: 'Fri', rate: 4.9 },
      { day: 'Sat', rate: 3.8 },
      { day: 'Sun', rate: 3.2 },
    ],
    config: {
      xKey: 'day',
      yKey: 'rate',
      colors: ['#0088FE']
    },
    query: '',
    createdAt: new Date()
  },
  salesByCategory: {
    id: uuidv4(),
    title: 'Sales by Category',
    description: 'Distribution of sales across product categories',
    type: 'pie' as const,
    data: [
      { name: 'Shirts', value: 35 },
      { name: 'Pants', value: 25 },
      { name: 'Dresses', value: 20 },
      { name: 'Accessories', value: 15 },
      { name: 'Shoes', value: 5 },
    ],
    config: {
      dataKey: 'value',
      colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']
    },
    query: '',
    createdAt: new Date()
  },
  salesTrend: {
    id: uuidv4(),
    title: 'Sales Trend for Polo Shirts',
    description: 'Weekly sales trend for polo shirts over the last month',
    type: 'line' as const,
    data: [
      { week: 'Week 1', sales: 125 },
      { week: 'Week 2', sales: 143 },
      { week: 'Week 3', sales: 156 },
      { week: 'Week 4', sales: 132 },
    ],
    config: {
      xKey: 'week',
      yKey: 'sales',
      colors: ['#8884d8']
    },
    query: '',
    createdAt: new Date()
  }
};

// Function to get a simulated response with potential graph data
const getAIResponse = (query: string): Promise<{ text: string; graph: GraphData | null }> => {
  // Convert query to lowercase for easier matching
  const lowerQuery = query.toLowerCase().trim();

  // Check if query seems to be asking for a visualization
  const shouldGenerateGraph = graphKeywords.some(keyword => lowerQuery.includes(keyword.toLowerCase()));

  // Look for an exact match in our sample responses
  const exactMatch = sampleResponses.find(item =>
    item.query.toLowerCase() === lowerQuery
  );

  let responseText = '';
  let graphData: GraphData | null = null;

  if (exactMatch) {
    responseText = exactMatch.response;
  }
  // Handle graph generation requests
  else if (shouldGenerateGraph) {
    if (lowerQuery.includes('polo') && (lowerQuery.includes('return') || lowerQuery.includes('rate'))) {
      graphData = { ...sampleGraphs.returnRates, query };
      responseText = "Here's a visualization of return rates for polo shirts over the last 7 days. The highest return rate was on Wednesday at 6.1%.";
    }
    else if (lowerQuery.includes('category') || lowerQuery.includes('distribution')) {
      graphData = { ...sampleGraphs.salesByCategory, query };
      responseText = "Here's the sales distribution by product category. Shirts make up the largest portion at 35% of total sales.";
    }
    else if (lowerQuery.includes('trend') || lowerQuery.includes('over time') || lowerQuery.includes('weekly')) {
      graphData = { ...sampleGraphs.salesTrend, query };
      responseText = "Here's the sales trend for polo shirts over the last month. We saw a peak in week 3 with 156 units sold.";
    }
    else {
      responseText = "I understand you're looking for a visualization, but I need more specific information. Try asking about return rates, sales by category, or sales trends for specific products.";
    }
  }
  // Look for keyword matches if no exact match
  else if (lowerQuery.includes("jeans") || lowerQuery.includes("product") || lowerQuery.includes("offer")) {
    responseText = sampleResponses[0].response;
  }
  else if (lowerQuery.includes("detail") || lowerQuery.includes("more") || lowerQuery.includes("yes")) {
    responseText = sampleResponses[1].response;
  }
  else if (lowerQuery.includes("engagement") || lowerQuery.includes("interact")) {
    responseText = sampleResponses[2].response;
  }
  else if (lowerQuery.includes("conversion") || lowerQuery.includes("rate") || lowerQuery.includes("low")) {
    responseText = sampleResponses[3].response;
  }
  else if (lowerQuery.includes("feature") || lowerQuery.includes("ask") || lowerQuery.includes("question")) {
    responseText = sampleResponses[4].response;
  }
  else {
    // Default response if no match
    responseText = "I don't have specific data on that query. Try asking about product requests, engagement metrics, conversion rates, or common customer questions. You can also ask me to visualize data like 'Show me return rates for polo shirts'.";
  }

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ text: responseText, graph: graphData });
    }, 1200); // Simulate API delay
  });
};

// Component to render the appropriate chart type
const GraphRenderer = ({ graph }: { graph: GraphData }) => {
  if (!graph) return null;

  switch (graph.type) {
    case 'bar':
      return (
        <div className="h-64 w-full my-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={graph.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={graph.config.xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={graph.config.yKey} fill={graph.config.colors?.[0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );

    case 'line':
      return (
        <div className="h-64 w-full my-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={graph.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={graph.config.xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={graph.config.yKey}
                stroke={graph.config.colors?.[0]}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );

    case 'pie':
      return (
        <div className="h-64 w-full my-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={graph.data}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey={graph.config.dataKey}
              >
                {graph.data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={graph.config.colors?.[index % (graph.config.colors?.length || 1)]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );

    default:
      return <p>Unsupported graph type</p>;
  }
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI data analyst. Ask me questions about your data or ask for visualizations by saying 'Show me...'",
      sender: 'bot',
      timestamp: new Date(),
      graph: null
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [pinnedGraphs, setPinnedGraphs] = useState<GraphData[]>([]);
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
      timestamp: new Date(),
      graph: null
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Get AI response
    const { text: response, graph } = await getAIResponse(inputValue);

    // Add AI response message
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response,
      sender: 'bot',
      timestamp: new Date(),
      graph
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);

    // Save the conversation to the database
    const fullTranscript = `User: ${inputValue}\nAI: ${response}`;
    saveChat(fullTranscript, {
      user_query: inputValue,
      ai_response: response,
      has_graph: !!graph,
      graph_type: graph?.type || null,
      session_start_time: messages[0].timestamp.toISOString()
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePinGraph = (graph: GraphData) => {
    // In a real app, this would save to Supabase or another backend
    setPinnedGraphs(prev => [...prev, graph]);

    // Save to localStorage as fallback/demo
    const storedGraphs = localStorage.getItem('pinnedGraphs');
    const parsedGraphs = storedGraphs ? JSON.parse(storedGraphs) : [];
    localStorage.setItem('pinnedGraphs', JSON.stringify([...parsedGraphs, graph]));

    toast.success('Graph pinned to dashboard', {
      description: 'You can view it in the "Generate & Pin" tab'
    });
  };

  const suggestionPrompts = [
    "Show me return rates for polo shirts over the last 7 days",
    "What's the sales distribution by product category?",
    "Show me the weekly sales trend for polo shirts"
  ];

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
        <div className="fixed bottom-24 right-6 w-96 lg:w-[450px] h-[600px] bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 flex flex-col z-40 overflow-hidden animate-in slide-in-from-bottom">
          <div className="bg-primary p-3 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">AI Data Assistant</h3>
              <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                Visualization Demo
              </span>
            </div>
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
                className={`mb-4 max-w-[90%] ${message.sender === 'user' ? 'ml-auto' : 'mr-auto'}`}
              >
                <div
                  className={`p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-white rounded-tr-none'
                      : 'bg-gray-100 dark:bg-gray-800 rounded-tl-none'
                  }`}
                >
                  {message.content}

                  {/* Render graph if available */}
                  {message.graph && (
                    <div className="mt-3">
                      <div className="mb-2 flex justify-between items-center">
                        <h4 className="text-sm font-medium">{message.graph.title}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 gap-1 text-xs"
                          onClick={() => handlePinGraph(message.graph!)}
                        >
                          <PinIcon size={12} />
                          Pin to Dashboard
                        </Button>
                      </div>
                      <GraphRenderer graph={message.graph} />
                    </div>
                  )}
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

          {/* Suggestion chips */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 flex flex-wrap gap-2">
              {suggestionPrompts.map((prompt, index) => (
                <button
                  key={index}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded-full transition-colors"
                  onClick={() => {
                    setInputValue(prompt);
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input area */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-800 flex items-end gap-2">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your data or 'Show me...' for visualizations..."
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
