'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ChartMetadata, ChartDataItem, ChartConfig, GroupData } from '../../types';

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import('react-plotly.js'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="text-center text-gray-500">Loading chart...</div>
    </div>
  )
});

interface GeneralChartRendererProps {
  metadata: ChartMetadata;
}

// Enhanced Legend component for all chart types
const ChartLegend: React.FC<{ config: ChartConfig; data: ChartDataItem[] }> = ({ config, data }) => {
  if (!config.legend_config?.show_scale && !config.legend_config?.show_interpretation && !config.legend_config?.show_categories) {
    return null;
  }

  // Extract unique categories/groups for categorical legends
  const getCategoricalLegend = () => {
    const categories = new Map<string, { color?: string; count: number }>();
    
    data.forEach(item => {
      const key = item.additional_data?.group || item.category || item.label;
      const color = item.additional_data?.color || config.colors?.[key];
      
      if (categories.has(key)) {
        categories.get(key)!.count++;
      } else {
        categories.set(key, { color, count: 1 });
      }
    });
    
    return categories;
  };

  const shouldShowCategorical = config.type === 'pie' || config.type === 'grouped_bar' || 
    (config.legend_config?.show_categories && config.colors);

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
      {config.legend_config?.show_interpretation && (
        <div className="mb-3">
          <h4 className="font-semibold text-sm text-gray-700 mb-1">Chart Interpretation:</h4>
          <p className="text-sm text-gray-600">{config.legend_config.interpretation_text}</p>
        </div>
      )}
      
      {/* Numerical Scale Legend (for heatmaps, etc.) */}
      {config.legend_config?.show_scale && config.scale_info && (
        <div className={config.legend_config?.show_interpretation ? "mb-3" : ""}>
          <h4 className="font-semibold text-sm text-gray-700 mb-2">Scale Reference:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 text-xs">
            {Object.entries(config.scale_info.scale_labels).map(([value, label]) => (
              <div key={value} className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded border border-gray-300"
                  style={{
                    backgroundColor: config.scale_info?.color_range?.[parseInt(value) - 1] || '#ccc'
                  }}
                />
                <span className="text-gray-700">
                  <strong>{value}:</strong> {label}
                </span>
              </div>
            ))}
          </div>
          {config.scale_info.scale_description && (
            <p className="mt-2 text-xs text-gray-500 italic">
              {config.scale_info.scale_description}
            </p>
          )}
        </div>
      )}

      {/* Categorical Legend (for pie charts, grouped bars, etc.) */}
      {shouldShowCategorical && (
        <div>
          <h4 className="font-semibold text-sm text-gray-700 mb-2">
            {config.type === 'pie' ? 'Categories:' : 'Legend:'}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-xs">
            {Array.from(getCategoricalLegend().entries()).map(([category, info]) => (
              <div key={category} className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded border border-gray-300"
                  style={{
                    backgroundColor: info.color || `hsl(${Array.from(category).reduce((a, b) => a + b.charCodeAt(0), 0) % 360}, 70%, 60%)`
                  }}
                />
                <span className="text-gray-700 truncate" title={category}>
                  {category}
                  {config.type === 'pie' && info.count > 1 && (
                    <span className="text-gray-500 ml-1">({info.count})</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chart-specific information */}
      {config.type === 'heatmap' && !config.scale_info && (
        <div className="mt-2 text-xs text-gray-500 italic">
          Intensity represents the magnitude of values - darker colors indicate higher values.
        </div>
      )}
      
      {config.type === 'scatter' && (
        <div className="mt-2 text-xs text-gray-500 italic">
          Each point represents a data item. Hover over points for detailed information.
        </div>
      )}
    </div>
  );
};

// Simple Bar Chart
const processBarData = (data: ChartDataItem[], config: ChartConfig): any[] => {
  const x = data.map((item: ChartDataItem) => item.label);
  const y = data.map((item: ChartDataItem) => item.value);
  const colors = data.map((item: ChartDataItem) => item.additional_data?.color || config.colors?.[item.label]);

  return [{
    x: x,
    y: y,
    type: 'bar',
    marker: { color: colors.filter(Boolean).length > 0 ? colors : undefined }
  }];
};

// Grouped Bar Chart
const processGroupedBarData = (data: ChartDataItem[], config: ChartConfig): any[] => {
  const groups: { [key: string]: GroupData } = {};
  
  data.forEach((item: ChartDataItem) => {
    const groupKey = item.additional_data?.[config.groupBy || 'group'] || item.category;
    const seriesKey = item.additional_data?.[config.seriesBy || 'series'] || item.label;
    
    if (!groups[seriesKey]) {
      groups[seriesKey] = { x: [], y: [], name: seriesKey };
    }
    
    groups[seriesKey].x.push(groupKey);
    groups[seriesKey].y.push(item.value);
  });

  return Object.values(groups).map((group: GroupData) => ({
    x: group.x,
    y: group.y,
    name: group.name,
    type: 'bar',
    marker: { color: config.colors?.[group.name] }
  }));
};

// Pie Chart
const processPieData = (data: ChartDataItem[], config: ChartConfig): any[] => {
  return [{
    labels: data.map((item: ChartDataItem) => item.label),
    values: data.map((item: ChartDataItem) => item.value),
    type: 'pie',
    marker: {
      colors: data.map((item: ChartDataItem) => item.additional_data?.color || config.colors?.[item.label])
    }
  }];
};

// Line Chart
const processLineData = (data: ChartDataItem[], config: ChartConfig): any[] => {
  if (config.seriesBy) {
    // Multiple series
    const series: { [key: string]: GroupData } = {};
    
    data.forEach((item: ChartDataItem) => {
      const seriesKey = item.additional_data?.[config.seriesBy || 'series'] || item.category;
      const xValue = item.additional_data?.[config.xField || 'x'] || item.label;
      
      if (!series[seriesKey]) {
        series[seriesKey] = { x: [], y: [], name: seriesKey };
      }
      
      series[seriesKey].x.push(xValue);
      series[seriesKey].y.push(item.value);
    });

    return Object.values(series).map((s: GroupData) => ({
      x: s.x,
      y: s.y,
      name: s.name,
      type: 'scatter',
      mode: 'lines+markers',
      line: { color: config.colors?.[s.name] }
    }));
  } else {
    // Single series
    return [{
      x: data.map((item: ChartDataItem) => item.additional_data?.[config.xField || 'x'] || item.label),
      y: data.map((item: ChartDataItem) => item.value),
      type: 'scatter',
      mode: 'lines+markers'
    }];
  }
};

// Scatter Plot
const processScatterData = (data: ChartDataItem[], config: ChartConfig): any[] => {
  if (config.seriesBy) {
    // Multiple series
    const series: { [key: string]: { x: any[], y: any[], name: string, text: any[] } } = {};
    
    data.forEach((item: ChartDataItem) => {
      const seriesKey = item.additional_data?.[config.seriesBy || 'series'] || item.category;
      
      if (!series[seriesKey]) {
        series[seriesKey] = { x: [], y: [], name: seriesKey, text: [] };
      }
      
      series[seriesKey].x.push(item.additional_data?.[config.xField || 'x'] || 0);
      series[seriesKey].y.push(item.additional_data?.[config.yField || 'y'] || item.value);
      series[seriesKey].text.push(item.additional_data?.tooltip || item.label);
    });

    return Object.values(series).map((s) => ({
      x: s.x,
      y: s.y,
      text: s.text,
      name: s.name,
      type: 'scatter',
      mode: 'markers',
      marker: { 
        color: config.colors?.[s.name],
        size: data.map((item: ChartDataItem) => item.additional_data?.size || 8)
      }
    }));
  } else {
    // Single series
    return [{
      x: data.map((item: ChartDataItem) => item.additional_data?.[config.xField || 'x'] || 0),
      y: data.map((item: ChartDataItem) => item.additional_data?.[config.yField || 'y'] || item.value),
      text: data.map((item: ChartDataItem) => item.additional_data?.tooltip || item.label),
      type: 'scatter',
      mode: 'markers',
      marker: {
        size: data.map((item: ChartDataItem) => item.additional_data?.size || 8),
        color: data.map((item: ChartDataItem) => item.additional_data?.color)
      }
    }];
  }
};

// Histogram
const processHistogramData = (data: ChartDataItem[], config: ChartConfig): any[] => {
  // For histogram, we expect the data to already be binned
  return [{
    x: data.map((item: ChartDataItem) => item.label),
    y: data.map((item: ChartDataItem) => item.value),
    type: 'bar',
    name: 'Frequency'
  }];
};

// Heatmap
const processHeatmapData = (data: ChartDataItem[], config: ChartConfig): any[] => {
  const matrix: { [key: string]: { [key: string]: number } } = {};
  const xLabels = new Set<string>();
  const yLabels = new Set<string>();

  data.forEach((item: ChartDataItem) => {
    const x = item.additional_data?.[config.xField || 'x'] || item.label;
    const y = item.additional_data?.[config.yField || 'y'] || item.category;
    
    xLabels.add(x);
    yLabels.add(y);
    
    if (!matrix[y]) matrix[y] = {};
    matrix[y][x] = item.value;
  });

  const xArray = Array.from(xLabels).sort();
  const yArray = Array.from(yLabels).sort();
  
  const z = yArray.map((y: string) => 
    xArray.map((x: string) => matrix[y]?.[x] || 0)
  );

  // Use color range from config if available, otherwise default
  const colorscale = config.scale_info?.color_range ? 
    config.scale_info.color_range.map((color, i) => [i / (config.scale_info!.color_range!.length - 1), color]) :
    config.colorscale || 'RdYlGn';

  return [{
    z: z,
    x: xArray,
    y: yArray,
    type: 'heatmap',
    colorscale: colorscale,
    showscale: true,
    colorbar: {
      title: {
        text: config.scale_info?.scale_description || 'Values',
        side: 'right'
      },
      tickvals: config.scale_info ? Object.keys(config.scale_info.scale_labels).map(Number) : undefined,
      ticktext: config.scale_info ? Object.values(config.scale_info.scale_labels) : undefined
    }
  }];
};

// Main chart renderer component
const GeneralChartRenderer: React.FC<GeneralChartRendererProps> = ({ metadata }) => {
  if (!metadata?.chart_available) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center text-gray-500">
          <div className="text-2xl mb-2">📊</div>
          <div>Chart not available for this data</div>
        </div>
      </div>
    );
  }

  const { chart_data, chart_config } = metadata;
  if (!chart_data || !chart_config) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center text-gray-500">
          <div className="text-2xl mb-2">⚠️</div>
          <div>Invalid chart configuration</div>
        </div>
      </div>
    );
  }

  let plotData: any[] = [];
  let layout = {
    title: chart_config.title || 'Chart',
    showlegend: chart_config.showLegend !== false,
    ...chart_config.layout
  };

  // Process data based on chart type
  switch (chart_config.type) {
    case 'bar':
      plotData = processBarData(chart_data, chart_config);
      break;
    case 'grouped_bar':
      plotData = processGroupedBarData(chart_data, chart_config);
      break;
    case 'pie':
      plotData = processPieData(chart_data, chart_config);
      break;
    case 'line':
      plotData = processLineData(chart_data, chart_config);
      break;
    case 'scatter':
      plotData = processScatterData(chart_data, chart_config);
      break;
    case 'histogram':
      plotData = processHistogramData(chart_data, chart_config);
      break;
    case 'heatmap':
      plotData = processHeatmapData(chart_data, chart_config);
      break;
    default:
      console.warn('Unknown chart type:', chart_config.type);
      return (
        <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center text-gray-500">
            <div className="text-2xl mb-2">❓</div>
            <div>Unknown chart type: {chart_config.type}</div>
          </div>
        </div>
      );
  }

  return (
    <div className="w-full">
      <div className="h-96">
        <Plot
          data={plotData}
          layout={layout}
          config={{
            responsive: true,
            displayModeBar: false
          }}
          style={{ width: '100%', height: '100%' }}
          useResizeHandler={true}
        />
      </div>
      <ChartLegend config={chart_config} data={chart_data} />
    </div>
  );
};

export default GeneralChartRenderer;