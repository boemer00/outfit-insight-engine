
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Types for our graphs
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Function to get pinned graphs from localStorage
const getPinnedGraphs = (): GraphData[] => {
  try {
    const storedGraphs = localStorage.getItem('pinnedGraphs');
    return storedGraphs ? JSON.parse(storedGraphs) : [];
  } catch (error) {
    console.error('Error parsing pinned graphs:', error);
    return [];
  }
};

// Function to save pinned graphs to localStorage
const savePinnedGraphs = (graphs: GraphData[]) => {
  localStorage.setItem('pinnedGraphs', JSON.stringify(graphs));
};

const GraphGenerator = () => {
  const [pinnedGraphs, setPinnedGraphs] = useState<GraphData[]>(getPinnedGraphs());
  const [isLoading, setIsLoading] = useState(false);

  // Listen for pinned graph updates from other components
  useEffect(() => {
    const handlePinnedGraphsUpdated = () => {
      setPinnedGraphs(getPinnedGraphs());
    };

    // Load pinned graphs on component mount
    handlePinnedGraphsUpdated();

    // Add event listener for pinned graphs updates
    window.addEventListener('pinnedGraphsUpdated', handlePinnedGraphsUpdated);

    return () => {
      window.removeEventListener('pinnedGraphsUpdated', handlePinnedGraphsUpdated);
    };
  }, []);
  
  const handleRemoveGraph = (id: string) => {
    // Update local state
    const updatedGraphs = pinnedGraphs.filter(graph => graph.id !== id);
    setPinnedGraphs(updatedGraphs);
    
    // Update localStorage
    savePinnedGraphs(updatedGraphs);
    
    toast.success('Graph removed successfully');
  };
  
  // Function to render the appropriate chart type
  const renderGraph = (graph: GraphData) => {
    switch (graph.type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={graph.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={graph.config.xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={graph.config.yKey} fill={graph.config.colors?.[0] || COLORS[0]} />
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={graph.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={graph.config.xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey={graph.config.yKey} 
                stroke={graph.config.colors?.[0] || COLORS[0]} 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        );
        
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
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
                    fill={graph.config.colors?.[index % (graph.config.colors?.length || 1)] || COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
        
      default:
        return <p>Unsupported graph type</p>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-dashboard-text-heading">Generate & Pin</h2>
          <p className="text-dashboard-text-body">Ask questions and pin visualizations to your dashboard</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500">
            {pinnedGraphs.length} {pinnedGraphs.length === 1 ? 'graph' : 'graphs'} pinned
          </p>
        </div>
      </div>
      
      <div className="flex flex-col gap-6">
        <p className="text-dashboard-text-body">
          Ask the AI assistant questions like <span className="font-medium">"Show me return rates for polo shirts over the last 7 days"</span> to 
          generate graphs. When a graph is generated, you can pin it to this dashboard.
        </p>
        
        {pinnedGraphs.length === 0 ? (
          <Card className="border-dashed border-2 p-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <PlusCircle className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-dashboard-text-heading mb-2">No pinned graphs yet</h3>
              <p className="text-dashboard-text-body max-w-md">
                Use the AI chatbot to ask questions about your data. 
                When a graph is generated, click "Pin to Dashboard" to save it here.
              </p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pinnedGraphs.map((graph) => (
              <Card key={graph.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{graph.title}</CardTitle>
                      <CardDescription>{graph.description}</CardDescription>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-gray-400 hover:text-red-500" 
                      onClick={() => handleRemoveGraph(graph.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {renderGraph(graph)}
                  <p className="text-xs text-gray-500 mt-2 italic">
                    Query: "{graph.query}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GraphGenerator;
