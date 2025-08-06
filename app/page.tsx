import React from 'react';
import { topManagersBarChartMetadata, groupedBarMetadata, pieChartMetadata, lineChartMetadata, heatmapMetadata } from './data';
import dynamic from 'next/dynamic';

// Dynamically import the client component to avoid "self is not defined" errors
const GeneralChartRenderer = dynamic(() => import('./components/ChartRenderer'), { ssr: false });

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Data Visualization Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Top Managers Performance</h2>
          <GeneralChartRenderer metadata={topManagersBarChartMetadata} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Grouped Bar Chart</h2>
          <GeneralChartRenderer metadata={groupedBarMetadata} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Pie Chart</h2>
          <GeneralChartRenderer metadata={pieChartMetadata} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Line Chart</h2>
          <GeneralChartRenderer metadata={lineChartMetadata} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Heatmap</h2>
          <GeneralChartRenderer metadata={heatmapMetadata} />
        </div>
      </div>
    </div>
  );
}