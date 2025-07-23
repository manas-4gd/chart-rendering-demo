export interface ChartData {
  type: string;
  data: any[];
  layout?: any;
  config?: any;
  title?: string;
  description?: string;
}

export interface Message {
  id: string;
  content: string;
  metadata?: ChartMetadata;
  role: 'user' | 'assistant';
  timestamp?: Date;
}

export interface ChartMetadata {
  chart_metadata_available?: boolean;
  chart_metadata?: {
    chart_available?: boolean;
    chart_data_available?: boolean;
    suggested_chart_types?: string[];
    data_summary?: {
      type: string;
      record_count: number;
      has_trends?: boolean;
      has_demographics?: boolean;
      has_numerical_data?: boolean;
    };
    sql_results?: Array<{
      category: string;
      Manager_Name: string;
      avg_rating: number;
    }>;
  };
  // Legacy support for existing metadata structure
  chart_available?: boolean;
  chart_data_available?: boolean;
  suggested_chart_types?: string[];
  data_summary?: {
    type: string;
    record_count: number;
    has_trends?: boolean;
    has_demographics?: boolean;
    has_numerical_data?: boolean;
  };
  sql_results?: Array<{
    category: string;
    Manager_Name: string;
    avg_rating: number;
  }>;
  extracted_data?: any[];
  chart_data?: any[];
}
