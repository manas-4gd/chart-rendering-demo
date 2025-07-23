"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Maximize2, Copy, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import type { ChartData } from '@/components/agent-chat/types';

import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with Plotly
const Plot = dynamic(() => import('react-plotly.js').then(mod => mod.default || mod), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-full h-48 max-h-48 flex items-center justify-center bg-muted rounded-lg overflow-hidden" style={{ maxWidth: '100%', maxHeight: '12rem' }}>
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
    </div>
  ),
});

interface ChartRendererProps {
  chartData: ChartData;
  className?: string;
  size?: 'compact' | 'default' | 'large';
}

export function ChartRenderer({ chartData, className = "", size = "default" }: ChartRendererProps) {
  const { toast } = useToast();
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Size configurations
  const sizeConfig = {
    compact: {
      height: 'h-80',
      plotHeight: 300,
      titleSize: 'text-sm',
      descriptionSize: 'text-xs',
      buttonSize: 'h-6 px-1.5',
      iconSize: 'h-3 w-3',
      fontSize: 11,
      margin: { l: 60, r: 20, t: 30, b: 60 }
    },
    default: {
      height: 'h-64',
      plotHeight: 240,
      titleSize: 'text-base',
      descriptionSize: 'text-sm',
      buttonSize: 'h-7 px-2',
      iconSize: 'h-3 w-3',
      fontSize: 11,
      margin: { l: 45, r: 15, t: 25, b: 50 }
    },
    large: {
      height: 'h-96',
      plotHeight: 350,
      titleSize: 'text-lg',
      descriptionSize: 'text-sm',
      buttonSize: 'h-8 px-2',
      iconSize: 'h-4 w-4',
      fontSize: 12,
      margin: { l: 50, r: 20, t: 30, b: 60 }
    }
  };
  const config = sizeConfig[size];

  // Default layout configurations for better appearance
  const defaultLayout = {
    autosize: true,
    responsive: true,
    font: {
      family: 'Inter, system-ui, sans-serif',
      size: config.fontSize,
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    showlegend: true,
    legend: {
      orientation: 'h',
      y: -0.15,
      font: { size: config.fontSize - 1 }
    },
    margin: config.margin,
    ...chartData.layout,
  };

  // Default config for better UX
  const defaultConfig = {
    responsive: true,
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: [
      'pan2d',
      'lasso2d',
      'select2d',
      'autoScale2d',
      'hoverClosestCartesian',
      'hoverCompareCartesian',
      'toggleSpikelines',
      'toImage', // Remove camera/screenshot button
      'sendDataToCloud', // Remove cloud button if present
      'zoom2d', // Remove zoom
      'zoomIn2d', // Remove zoom in
      'zoomOut2d', // Remove zoom out
      'resetScale2d', // Remove reset
      'hoverClosest3d', // Remove 3D hover
      'tableRotation', // Remove table rotation
      'resetCameraDefault3d', // Remove 3D camera reset
      'resetCameraLastSave3d', // Remove 3D camera save
      'orbitRotation', // Remove orbit rotation
      'pan3d', // Remove 3D pan
    ],
    modeBarButtonsToAdd: [], // No additional buttons
    toImageButtonOptions: { // Additional safety to hide image button
      format: 'png',
      filename: 'chart',
      height: 0,
      width: 0,
      scale: 0
    },
    ...chartData.config,
  };
  const handleDownload = () => {
    try {
      // Create a download link for the chart data
      const dataStr = JSON.stringify(chartData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `chart-${chartData.title?.replace(/\s+/g, '-').toLowerCase() || 'data'}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast({
        title: "Chart Data Downloaded",
        description: "Chart data has been saved as JSON",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Could not download chart data",
        variant: "destructive",
      });
    }
  };

  const handleCopyData = async () => {
    try {
      const dataStr = JSON.stringify(chartData, null, 2);
      await navigator.clipboard.writeText(dataStr);
      toast({
        title: "Copied to Clipboard",
        description: "Chart data has been copied",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Could not copy chart data",
        variant: "destructive",
      });
    }
  };
  return (
    <>
      {/* Main Chart Card */}
      <Card className={`w-full ${className}`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              {chartData.title && (
                <CardTitle className={config.titleSize}>{chartData.title}</CardTitle>
              )}
              {chartData.description && (
                <CardDescription className={config.descriptionSize}>{chartData.description}</CardDescription>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyData}
                className={config.buttonSize}
              >
                <Copy className={config.iconSize} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className={config.buttonSize}
              >
                <Download className={config.iconSize} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(true)}
                className={config.buttonSize}
              >
                <Maximize2 className={config.iconSize} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className={`w-full ${config.height}`}>
            <Plot
              data={chartData.data}
              layout={{
                ...defaultLayout,
                height: chartData.layout?.height || config.plotHeight,
              }}
              config={defaultConfig}
              style={{ 
                width: '100%', 
                height: '100%',
              }}
              useResizeHandler={true}
              onError={(error) => {
                console.error('Chart rendering error:', error);
              }}
            />
          </div>
        </CardContent>
      </Card>
      {/* Fullscreen Modal */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 overflow-hidden chart-modal-content">
          <DialogHeader className="p-6 pb-0 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl">{chartData.title || 'Chart'}</DialogTitle>
                {chartData.description && (
                  <DialogDescription className="text-base mt-1">{chartData.description}</DialogDescription>
                )}
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyData}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Data
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </DialogHeader>
          <div className="p-6 pt-4 flex-1 min-h-0 chart-modal-plot">
            <Plot
              data={chartData.data}
              layout={{
                ...defaultLayout,
                height: undefined,
                autosize: true,
                font: {
                  ...defaultLayout.font,
                  size: 14, // Larger font for fullscreen
                },
                margin: { l: 60, r: 30, t: 40, b: 60 }, // Better margins for fullscreen
              }}
              config={defaultConfig}
              style={{ 
                width: '100%', 
                height: '100%',
              }}
              useResizeHandler={true}
              onError={(error) => {
                console.error('Chart rendering error:', error);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}