"use client";

import { ChartToggleButton } from '@/components/charts';
import type { Message } from '@/components/agent-chat/types';

export default function ChartsPage() {
  // Your hardcoded chart metadata
  const chartMetadata = {
    "chart_available": true,
    "chart_data_available": true,
    "suggested_chart_types": ["bar", "pie"],
    "data_summary": {
      "type": "analytics",
      "record_count": 10,
      "has_trends": false,
      "has_demographics": true,
      "has_numerical_data": true
    },
    "sql_results": [
      {"category": "Age Distribution", "Manager_Name": "18-24", "avg_rating": 46.0},
      {"category": "Age Distribution", "Manager_Name": "55+", "avg_rating": 85.0},
      {"category": "Age Distribution", "Manager_Name": "35-44", "avg_rating": 128.0},
      {"category": "Age Distribution", "Manager_Name": "45-54", "avg_rating": 142.0},
      {"category": "Age Distribution", "Manager_Name": "25-34", "avg_rating": 143.0},
      {"category": "Bottom 10% Managers", "Manager_Name": " Ritu Agrawal", "avg_rating": 3.6363636363636362},
      {"category": "Bottom 10% Managers", "Manager_Name": " Nisha Gupta", "avg_rating": 3.6363636363636362},
      {"category": "Bottom 10% Managers", "Manager_Name": " Gaurav Khurana", "avg_rating": 4.0},
      {"category": "Bottom 10% Managers", "Manager_Name": " Kavita Narayan", "avg_rating": 4.1},
      {"category": "Bottom 10% Managers", "Manager_Name": " Amitabh Jain", "avg_rating": 4.2727272727272725}
    ]
  };

  // Create a mock message with your chart metadata
  const messageWithChartData: Message = {
    id: 'charts-demo',
    content: 'Analysis of age distribution and manager performance data.',
    metadata: chartMetadata,
    role: 'assistant',
    timestamp: new Date()
  };

  const handleChartGenerated = (charts: any[]) => {
    console.log('Charts generated:', charts);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Chart Demo</h1>
          <p className="text-gray-600">
            Interactive charts generated from your analytics data
          </p>
        </div>

        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-gray-700">{messageWithChartData.content}</p>
            </div>
            
            <ChartToggleButton 
              message={messageWithChartData}
              onChartGenerated={handleChartGenerated}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="font-semibold text-blue-900">Data Type</div>
            <div className="text-blue-700">{chartMetadata.data_summary.type}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="font-semibold text-green-900">Records</div>
            <div className="text-green-700">{chartMetadata.data_summary.record_count}</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="font-semibold text-purple-900">Chart Types</div>
            <div className="text-purple-700">{chartMetadata.suggested_chart_types.join(', ')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
