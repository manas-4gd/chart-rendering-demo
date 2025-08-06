export interface ChartDataItem {
  category: string;
  label: string;
  value: number;
  additional_data?: {
    color?: string;
    department?: string;
    level?: string;
    experience_years?: number;
    quarter?: string;
    year?: string;
    region?: string;
    product?: string;
    size?: number;
    tooltip?: string;
    [key: string]: any;
  };
}

export interface ChartConfig {
  type: 'bar' | 'grouped_bar' | 'pie' | 'line' | 'scatter' | 'histogram' | 'heatmap';
  title?: string;
  description?: string;
  showLegend?: boolean;
  groupBy?: string;
  seriesBy?: string;
  xField?: string;
  yField?: string;
  colorscale?: string;
  colors?: { [key: string]: string };
  suggested_graphs?: string[];
  scale_info?: {
    min_value: number;
    max_value: number;
    scale_type: string;
    scale_labels: { [key: string]: string };
    scale_description: string;
    color_range?: string[];
  };
  legend_config?: {
    show_scale: boolean;
    show_interpretation: boolean;
    show_categories?: boolean;
    interpretation_text: string;
  };
  layout?: any;
}

export interface DataSummary {
  type: string;
  record_count: number;
  has_trends: boolean;
  has_demographics: boolean;
  has_numerical_data: boolean;
}

export interface ChartMetadata {
  chart_available: boolean;
  data_summary?: DataSummary;
  chart_data: ChartDataItem[];
  chart_config: ChartConfig;
}

// Using a more compatible type definition for Plotly data
export interface PlotlyDataTrace {
  x?: any[];
  y?: any[];
  z?: any[][];
  labels?: any[];
  values?: any[];
  text?: any[];
  name?: string;
  type: string;
  mode?: string;
  marker?: {
    color?: any;
    colors?: any[];
    size?: any;
  };
  line?: {
    color?: any;
  };
  colorscale?: string;
  showscale?: boolean;
  [key: string]: any; // Allow any additional properties that Plotly might need
}

export interface GroupData {
  x: any[];
  y: any[];
  name: string;
}
