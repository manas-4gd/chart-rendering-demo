"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Settings
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ChartRenderer } from '@/components/charts';
import type { Message, ChartData } from '@/components/agent-chat/types';

interface ChartToggleButtonProps {
  message: Message;
  onChartGenerated?: (charts: ChartData[]) => void;
}

export function ChartToggleButton({ message, onChartGenerated }: ChartToggleButtonProps) {
  const [generatedCharts, setGeneratedCharts] = useState<ChartData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedChartTypes, setSelectedChartTypes] = useState<string[]>([]);
  const [currentChartIndex, setCurrentChartIndex] = useState(0);
  const [chartsPerPage] = useState(1); // Show 1 chart at a time

  // All available chart types
  const allChartTypes = [
    { value: 'bar', label: 'Bar Chart', icon: '📊' },
    { value: 'pie', label: 'Pie Chart', icon: '🍰' },
    { value: 'line', label: 'Line Chart', icon: '📈' },
    { value: 'scatter', label: 'Scatter Plot', icon: '📍' },
    { value: 'histogram', label: 'Histogram', icon: '📊' },
    { value: 'heatmap', label: 'Heatmap', icon: '🔥' }
  ];

  // Function to extract chart metadata from message content
  const extractChartMetadata = (content: string) => {
    const metadataRegex = /---CHART_METADATA---([\s\S]*?)---END_METADATA---/;
    const match = content.match(metadataRegex);
    
    if (match) {
      try {
        let metadataJson = match[1].trim();
        
        // Remove markdown code blocks if present
        if (metadataJson.startsWith('```json')) {
          metadataJson = metadataJson.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        } else if (metadataJson.startsWith('```')) {
          metadataJson = metadataJson.replace(/^```\s*/, '').replace(/\s*```$/, '');
        }
        
        return JSON.parse(metadataJson.trim());
      } catch (error) {
        console.error('Failed to parse chart metadata:', error);
        console.error('Metadata string:', match[1]);
        return null;
      }
    }
    
    return null;
  };

  // Check for metadata in both message.metadata and content
  const contentMetadata = extractChartMetadata(message.content);
  const backendMetadata = message.metadata;

  // Handle nested chart_metadata structure
  const nestedMetadata = backendMetadata?.chart_metadata;
  
  // Prefer backend metadata if it has chart data, otherwise use content metadata
  const hasBackendChartData = backendMetadata && 
    (backendMetadata.chart_available || 
     backendMetadata.suggested_chart_types ||
     nestedMetadata?.chart_available ||
     nestedMetadata?.suggested_chart_types);
  
  // Use nested metadata if available, otherwise fallback to direct metadata or content metadata
  const chartMetadata = nestedMetadata || (hasBackendChartData ? backendMetadata : contentMetadata);
  
  const hasChartMetadata = chartMetadata?.chart_available === true && 
                           chartMetadata?.chart_data_available === true;
  
  // Use the extracted or backend metadata
  const dataSummary = chartMetadata?.data_summary;
  const hasValidData = chartMetadata?.extracted_data || chartMetadata?.sql_results || chartMetadata?.chart_data;
  
  // Initialize selected chart types with agent suggestions
  useEffect(() => {
    if (chartMetadata?.suggested_chart_types && selectedChartTypes.length === 0) {
      setSelectedChartTypes(chartMetadata.suggested_chart_types);
    }
  }, [chartMetadata?.suggested_chart_types]);  
  // Only show charts if we have basic chart metadata
  if (!hasChartMetadata) {
    return null;
  }


  // Pagination helpers
  const totalPages = Math.ceil(generatedCharts.length / chartsPerPage);
  const currentPage = Math.floor(currentChartIndex / chartsPerPage) + 1;
  const startIndex = currentChartIndex;
  const endIndex = Math.min(startIndex + chartsPerPage, generatedCharts.length);
  const visibleCharts = generatedCharts.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentChartIndex(Math.max(0, currentChartIndex - chartsPerPage));
  };

  const handleNextPage = () => {
    setCurrentChartIndex(Math.min(generatedCharts.length - chartsPerPage, currentChartIndex + chartsPerPage));
  };

  // Generate sample data when no actual data is provided
  const generateSampleData = (dataSummary: any) => {
    if (!dataSummary) return [];
    
    const { type, record_count } = dataSummary;    const sampleData = [];
    
    if (type === 'general') {
      // General employee data - departments
      const departments = ['IT', 'Finance', 'Marketing', 'Sales', 'Operations', 'HR', 'Legal', 'Customer Service'];
      departments.forEach(dept => {
        sampleData.push({
          category: dept,
          value: Math.floor(Math.random() * 200) + 50 // Random count 50-250
        });
      });
    } else if (type === 'survey') {
      // Survey satisfaction data
      const departments = ['Sales', 'Operations', 'Finance', 'HR', 'Legal', 'Marketing'];
      departments.forEach(dept => {
        sampleData.push({
          category: dept,
          value: Math.random() * 2 + 3 // Random score 3.0-5.0
        });
      });
    } else {
      // Default sample data
      for (let i = 1; i <= Math.min(8, Math.floor((record_count || 100) / 100) || 6); i++) {
        sampleData.push({
          category: `Category ${i}`,
          value: Math.floor(Math.random() * 100) + 20
        });
      }
    }
    
    return sampleData;
  };
  const handleGenerateCharts = async () => {
    setIsGenerating(true);
    
    try {
      // Use the user-selected chart types (or agent suggestions as default)
      const typesToGenerate = selectedChartTypes.length > 0 ? selectedChartTypes : (chartMetadata?.suggested_chart_types || ['bar']);
      
      // Get data from metadata - prioritize sql_results from agent
      let dataToChart = chartMetadata?.sql_results || chartMetadata?.extracted_data || chartMetadata?.chart_data;
      
      // If no actual data, create sample data based on data_summary
      if (!dataToChart || dataToChart.length === 0) {
        dataToChart = generateSampleData(chartMetadata?.data_summary);
      }
      
      if (!dataToChart || dataToChart.length === 0) {
        throw new Error('No chart data available');
      }
      
      // Generate charts using user's selection
      const charts = generateChartsFromData(dataToChart, typesToGenerate);
      
      if (charts.length === 0) {
        throw new Error('Could not generate charts from the provided data');
      }
      
      setGeneratedCharts(charts);
      setIsExpanded(true);
      setCurrentChartIndex(0); // Reset pagination
            
      // Notify parent component
      onChartGenerated?.(charts);
      
    } catch (error) {
      console.error('Chart generation failed:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate charts');
      
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    handleGenerateCharts();
  };

  const handleRegenerateWithNewTypes = async () => {
    if (selectedChartTypes.length === 0) {
      setError('Please select at least one chart type');
      return;
    }
    
    setGeneratedCharts([]); // Clear existing charts
    setCurrentChartIndex(0); // Reset pagination
    await handleGenerateCharts();
  };
  // Generate charts from extracted data
  const generateChartsFromData = (data: any[], chartTypes: string[]): ChartData[] => {
    if (!data || data.length === 0) return [];
    
    const charts: ChartData[] = [];
    
    // Helper function to extract numeric values safely
    const getNumericValue = (item: any): number => {
      const value = item.avg_rating || item.value || item.amount || item.count || 
                    (typeof Object.values(item)[1] === 'number' ? Object.values(item)[1] : 0) || 1;
      return parseFloat(value) || 1;
    };
    
    // Helper function to extract labels safely  
    const getLabel = (item: any): string => {
      // For your specific data structure, use Manager_Name as the primary label
      return item.Manager_Name || item.category || item.name || item.label || 
             item.department || Object.keys(item)[0] || 'Unknown';
    };
    
    // Group data by category for better visualization
    const groupedData = data.reduce((acc: any, item: any) => {
      const category = item.category || 'General';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});
    
    chartTypes.forEach(chartType => {
      try {
        // Create charts for each category
        Object.keys(groupedData).forEach(category => {
          const categoryData = groupedData[category];
          
          switch (chartType) {
            case 'pie':
              charts.push({
                type: 'pie',
                data: [{
                  type: 'pie',
                  labels: categoryData.map(getLabel),
                  values: categoryData.map(getNumericValue),
                  textinfo: 'label+percent',
                  hovertemplate: '<b>%{label}</b><br>Rating: %{value}<br>Percentage: %{percent}<extra></extra>',
                  marker: {
                    colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316']
                  }
                }],
                layout: {
                  title: `${category} - Distribution`,
                  showlegend: true,
                  height: 300
                },
                title: `${category} Pie Chart`,
                description: `Distribution breakdown for ${category}`
              });
              break;

            case 'bar':
              const yValues = categoryData.map(getNumericValue);
              const minY = Math.min(...yValues);
              const maxY = Math.max(...yValues);
              const padding = (maxY - minY) * 0.1; // 10% padding
              
              charts.push({
                type: 'bar',
                data: [{
                  type: 'bar',
                  x: categoryData.map(getLabel),
                  y: yValues,
                  marker: {
                    color: category === 'Age Distribution' ? '#10B981' : '#3B82F6',
                    opacity: 0.8
                  },
                  hovertemplate: '<b>%{x}</b><br>Value: %{y}<extra></extra>'
                }],
                layout: {
                  title: `${category} - Comparison`,
                  xaxis: { 
                    title: category === 'Age Distribution' ? 'Age Groups' : 'Managers',
                    tickangle: -45
                  },
                  yaxis: { 
                    title: category === 'Age Distribution' ? 'Count' : 'Average Rating',
                    range: [Math.max(0, minY - padding), maxY + padding],
                    autorange: false
                  },
                  height: 300,
                  margin: { b: 120 } // Extra space for rotated labels
                },
                title: `${category} Bar Chart`,
                description: `Comparison of values for ${category}`
              });
              break;

            case 'line':
              const lineYValues = categoryData.map(getNumericValue);
              const lineMinY = Math.min(...lineYValues);
              const lineMaxY = Math.max(...lineYValues);
              const linePadding = (lineMaxY - lineMinY) * 0.1;
              
              charts.push({
                type: 'line',
                data: [{
                  type: 'scatter',
                  mode: 'lines+markers',
                  x: categoryData.map(getLabel),
                  y: lineYValues,
                  line: { color: '#3B82F6', width: 3 },
                  marker: { color: '#3B82F6', size: 6 },
                  hovertemplate: '<b>%{x}</b><br>Value: %{y}<extra></extra>'
                }],
                layout: {
                  title: `${category} - Trend`,
                  xaxis: { 
                    title: category === 'Age Distribution' ? 'Age Groups' : 'Managers',
                    tickangle: -45
                  },
                  yaxis: { 
                    title: category === 'Age Distribution' ? 'Count' : 'Average Rating',
                    range: [Math.max(0, lineMinY - linePadding), lineMaxY + linePadding],
                    autorange: false
                  },
                  height: 300,
                  margin: { b: 120 }
                },
                title: `${category} Line Chart`,
                description: `Trend visualization for ${category}`
              });
              break;

            case 'histogram':
              const histValues = categoryData.map(getNumericValue);
              charts.push({
                type: 'histogram',
                data: [{
                  type: 'histogram',
                  x: histValues,
                  marker: {
                    color: category === 'Age Distribution' ? '#10B981' : '#3B82F6',
                    opacity: 0.7
                  },
                  hovertemplate: 'Range: %{x}<br>Count: %{y}<extra></extra>'
                }],
                layout: {
                  title: `${category} - Distribution Histogram`,
                  xaxis: { title: category === 'Age Distribution' ? 'Count Values' : 'Rating Values' },
                  yaxis: { title: 'Frequency' },
                  height: 300
                },
                title: `${category} Histogram`,
                description: `Distribution histogram for ${category}`
              });
              break;

            case 'heatmap':
              // Create a simple heatmap for single category data
              const heatLabels = categoryData.map(getLabel);
              const heatValues = categoryData.map(getNumericValue);
              
              // Create a correlation-style matrix
              const matrix = [];
              for (let i = 0; i < heatLabels.length; i++) {
                const row = [];
                for (let j = 0; j < heatLabels.length; j++) {
                  // Simple correlation simulation
                  const correlation = i === j ? 1 : Math.abs(heatValues[i] - heatValues[j]) / Math.max(heatValues[i], heatValues[j]);
                  row.push(1 - correlation);
                }
                matrix.push(row);
              }
              
              charts.push({
                type: 'heatmap',
                data: [{
                  type: 'heatmap',
                  z: matrix,
                  x: heatLabels,
                  y: heatLabels,
                  colorscale: category === 'Age Distribution' ? 'Greens' : 'Blues',
                  hovertemplate: '<b>%{x}</b> vs <b>%{y}</b><br>Similarity: %{z:.2f}<extra></extra>'
                }],
                layout: {
                  title: `${category} - Similarity Heatmap`,
                  height: 300,
                  xaxis: { title: category === 'Age Distribution' ? 'Age Groups' : 'Managers' },
                  yaxis: { title: category === 'Age Distribution' ? 'Age Groups' : 'Managers' }
                },
                title: `${category} Heatmap`,
                description: `Similarity heatmap for ${category}`
              });
              break;
          }
        });
        
        // If only one category or user wants overall view, create combined charts
        if (Object.keys(groupedData).length === 1 || chartType === 'scatter') {
          const allData = data;
          
          if (chartType === 'scatter') {
            const scatterYValues = allData.map(getNumericValue);
            const scatterMinY = Math.min(...scatterYValues);
            const scatterMaxY = Math.max(...scatterYValues);
            const scatterPadding = (scatterMaxY - scatterMinY) * 0.1;
            
            charts.push({
              type: 'scatter',
              data: [{
                type: 'scatter',
                mode: 'markers',
                x: allData.map((_, index) => index + 1),
                y: scatterYValues,
                marker: {
                  color: allData.map(item => item.category === 'Age Distribution' ? '#10B981' : '#3B82F6'),
                  size: 10
                },
                text: allData.map(item => `${getLabel(item)} (${item.category})`),
                hovertemplate: '<b>%{text}</b><br>Value: %{y}<extra></extra>'
              }],
              layout: {
                title: 'All Data - Scatter Plot',
                xaxis: { title: 'Data Point Index' },
                yaxis: { 
                  title: 'Values',
                  range: [Math.max(0, scatterMinY - scatterPadding), scatterMaxY + scatterPadding],
                  autorange: false
                },
                height: 300
              },
              title: 'Combined Scatter Plot',
              description: 'Scatter plot of all data points with proper scaling'
            });
          }
        }
        
      } catch (error) {
        console.error(`❌ Error creating ${chartType} chart:`, error);
      }
    });
    
    return charts;
  };

  return (
    <div className="mt-3 space-y-3">
      {/* Chart Toggle Button */}
      <div className="flex items-center gap-2 flex-wrap">
        <div
          onClick={handleGenerateCharts}
          className={`
            inline-flex items-center justify-center
            border border-gray-300 bg-white 
            hover:bg-gray-50 hover:text-gray-900
            h-9 rounded-md px-3 text-sm font-medium
            transition-colors cursor-pointer
            ${(isGenerating || generatedCharts.length > 0) ? 'opacity-50 pointer-events-none' : ''}
          `}
          style={{ 
            width: '140px',
            minWidth: '140px',
            maxWidth: '140px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            boxSizing: 'border-box'
          }}
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2 flex-shrink-0" />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>Loading</span>
            </>
          ) : generatedCharts.length > 0 ? (
            <>
              <BarChart3 className="h-4 w-4 mr-2 flex-shrink-0" />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>Generated</span>
            </>
          ) : (
            <>
              <BarChart3 className="h-4 w-4 mr-2 flex-shrink-0" />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>Generate</span>
            </>
          )}
        </div>
        
        {/* Data Type Badge */}
        <Badge variant="secondary" className="text-xs">
          {dataSummary?.type || 'general'} data • {dataSummary?.record_count || 0} records
        </Badge>
        
        {/* Chart Type Selector Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="px-2">
              <Settings className="h-3 w-3 mr-1" />
              Chart Types ({selectedChartTypes.length})
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel className="text-xs">
              Select Chart Types
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {allChartTypes.map((chartType) => (
              <DropdownMenuCheckboxItem
                key={chartType.value}                
                checked={selectedChartTypes.includes(chartType.value)}
                onCheckedChange={(checked: boolean) => {
                  if (checked) {
                    setSelectedChartTypes([...selectedChartTypes, chartType.value]);
                  } else {
                    setSelectedChartTypes(selectedChartTypes.filter(t => t !== chartType.value));
                  }
                }}
                className="text-xs"
              >
                <span className="mr-2">{chartType.icon}</span>
                {chartType.label}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-gray-500">
              Agent suggested: {chartMetadata?.suggested_chart_types?.join(', ') || 'none'}
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Regenerate Button */}
        {generatedCharts.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleRegenerateWithNewTypes}
            disabled={isGenerating}
            className="px-2"
          >
            Regenerate          </Button>
        )}
        
        {/* Expand/Collapse Toggle */}
        {generatedCharts.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-2"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        )}
        
        {/* Error Display */}
        {error && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRetry}
              className="px-2"
            >
              Retry
            </Button>          </div>
        )}
      </div>
      
      {/* Generated Charts with Pagination */}
      {isExpanded && generatedCharts.length > 0 && (
        <div className="space-y-3 mt-4">
          {/* Pagination Controls */}
          {generatedCharts.length > chartsPerPage && (
            <div className="flex items-center justify-between mb-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentChartIndex === 0}
                className="px-3"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              
              <span className="text-sm text-gray-500">
                Page {currentPage} of {totalPages} • Charts {startIndex + 1}-{endIndex} of {generatedCharts.length}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentChartIndex + chartsPerPage >= generatedCharts.length}
                className="px-3"
              >                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
          
          {/* Display Current Page Charts */}
          {visibleCharts.map((chart, index) => (
            <ChartRenderer
              key={`${message.id}-chart-${startIndex + index}`}
              chartData={chart}
              size="compact"
              className="w-full"
            />
          ))}
        </div>
      )}
    </div>
  );
}