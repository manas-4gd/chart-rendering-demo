import { ChartMetadata } from '../types';

export const topManagersBarChartMetadata: ChartMetadata = {
"chart_available":true,"data_summary":{"type":"survey","record_count":12,"has_trends":false,"has_demographics":false,"has_numerical_data":true},"chart_data":[{"category":"Sentiment","label":"Positive","value":7,"additional_data":{"tooltip":"7 responses with positive sentiment","color":"#4CAF50"}},{"category":"Sentiment","label":"Neutral","value":2,"additional_data":{"tooltip":"2 responses with neutral sentiment","color":"#FFC107"}},{"category":"Sentiment","label":"Negative","value":3,"additional_data":{"tooltip":"3 responses with negative sentiment","color":"#F44336"}},{"category":"Liked Features","label":"Value for money","value":5,"additional_data":{"tooltip":"5 mentions of value for money","color":"#2196F3"}},{"category":"Liked Features","label":"Reliability","value":1,"additional_data":{"tooltip":"1 mention of reliability","color":"#9C27B0"}},{"category":"Liked Features","label":"Quality of services/products","value":1,"additional_data":{"tooltip":"1 mention of quality","color":"#FF9800"}},{"category":"Liked Features","label":"Ease of use","value":1,"additional_data":{"tooltip":"1 mention of ease of use","color":"#009688"}},{"category":"Improvement Areas","label":"Value for money","value":1,"additional_data":{"tooltip":"1 mention of value for money improvement","color":"#E91E63"}},{"category":"Improvement Areas","label":"Customer support","value":1,"additional_data":{"tooltip":"1 mention of customer support improvement","color":"#795548"}},{"category":"Improvement Areas","label":"Communication","value":2,"additional_data":{"tooltip":"2 mentions of communication improvement","color":"#607D8B"}}],"chart_config":{"type":"bar","description":"Summary of positive feedback and improvement areas across all customers","showLegend":true,"groupBy":"category","xField":"label","yField":"value","scale_info":{"min_value":0,"max_value":7,"scale_type":"count_scale","scale_labels":{"0":"0","3":"3","7":"7"},"scale_description":"Number of mentions or responses","color_range":["#F44336","#FFC107","#4CAF50"]},"legend_config":{"show_scale":true,"show_interpretation":true,"show_categories":true,"interpretation_text":"Bar height represents the number of mentions or responses for each category"},"layout":{"xaxis":{"title":"Feedback Categories","type":"category"},"yaxis":{"title":"Number of Mentions","type":"number"},"margin":{"l":50,"r":50,"t":50,"b":50}}}}

// Example 2: Grouped Bar Chart
export const groupedBarMetadata: ChartMetadata = {
"chart_available":true,"chart_data":[{"category":"Feedback","label":"Gopal","value":4.0,"additional_data":{"tooltip":"Feedback score: 4.0","color":"#3498db","group":"Gopal"}},{"category":"Coaching","label":"Gopal","value":4.0,"additional_data":{"tooltip":"Coaching score: 4.0","color":"#3498db","group":"Gopal"}},{"category":"Unbiased","label":"Gopal","value":5.0,"additional_data":{"tooltip":"Unbiased score: 5.0","color":"#3498db","group":"Gopal"}},{"category":"Collaboration","label":"Gopal","value":4.0,"additional_data":{"tooltip":"Collaboration score: 4.0","color":"#3498db","group":"Gopal"}},{"category":"Availability","label":"Gopal","value":5.0,"additional_data":{"tooltip":"Availability score: 5.0","color":"#3498db","group":"Gopal"}},{"category":"Positive Environment","label":"Gopal","value":4.0,"additional_data":{"tooltip":"Positive Environment score: 4.0","color":"#3498db","group":"Gopal"}},{"category":"Feedback","label":"V Ram","value":3.5,"additional_data":{"tooltip":"Feedback score: 3.5","color":"#2ecc71","group":"V Ram"}},{"category":"Coaching","label":"V Ram","value":2.5,"additional_data":{"tooltip":"Coaching score: 2.5","color":"#2ecc71","group":"V Ram"}},{"category":"Unbiased","label":"V Ram","value":3.5,"additional_data":{"tooltip":"Unbiased score: 3.5","color":"#2ecc71","group":"V Ram"}},{"category":"Collaboration","label":"V Ram","value":2.5,"additional_data":{"tooltip":"Collaboration score: 2.5","color":"#2ecc71","group":"V Ram"}},{"category":"Availability","label":"V Ram","value":3.5,"additional_data":{"tooltip":"Availability score: 3.5","color":"#2ecc71","group":"V Ram"}},{"category":"Positive Environment","label":"V Ram","value":3.0,"additional_data":{"tooltip":"Positive Environment score: 3.0","color":"#2ecc71","group":"V Ram"}},{"category":"Feedback","label":"K Antara","value":4.0,"additional_data":{"tooltip":"Feedback score: 4.0","color":"#e74c3c","group":"K Antara"}},{"category":"Coaching","label":"K Antara","value":3.5,"additional_data":{"tooltip":"Coaching score: 3.5","color":"#e74c3c","group":"K Antara"}},{"category":"Unbiased","label":"K Antara","value":4.5,"additional_data":{"tooltip":"Unbiased score: 4.5","color":"#e74c3c","group":"K Antara"}},{"category":"Collaboration","label":"K Antara","value":2.5,"additional_data":{"tooltip":"Collaboration score: 2.5","color":"#e74c3c","group":"K Antara"}},{"category":"Availability","label":"K Antara","value":4.0,"additional_data":{"tooltip":"Availability score: 4.0","color":"#e74c3c","group":"K Antara"}},{"category":"Positive Environment","label":"K Antara","value":3.5,"additional_data":{"tooltip":"Positive Environment score: 3.5","color":"#e74c3c","group":"K Antara"}}],"chart_config":{"type":"grouped_bar","description":"Grouped bar chart of team leader performance scores across different behavioral categories in Penta Ltd department","showLegend":true,"groupBy":"label","xField":"category","yField":"value","layout":{"xaxis":{"title":"Behavioral Categories","type":"category"},"yaxis":{"title":"Score","type":"number"},"margin":{"l":50,"r":50,"t":50,"b":100}}}}
// Example 3: Pie Chart
export const pieChartMetadata: ChartMetadata = {
"chart_available":true,"data_summary":{"type":"survey","record_count":12,"has_trends":false,"has_demographics":false,"has_numerical_data":true},"chart_data":[{"category":"Department","label":"Talent Academy","value":6.77,"additional_data":{"tooltip":"Average rating: 6.77"}},{"category":"Department","label":"Technology","value":5.94,"additional_data":{"tooltip":"Average rating: 5.94"}},{"category":"Department","label":"Finance","value":5.95,"additional_data":{"tooltip":"Average rating: 5.95"}},{"category":"Department","label":"Risk Management","value":5.75,"additional_data":{"tooltip":"Average rating: 5.75"}},{"category":"Department","label":"Sales & Distribution","value":5.74,"additional_data":{"tooltip":"Average rating: 5.74"}},{"category":"Department","label":"Floor Ops","value":5.58,"additional_data":{"tooltip":"Average rating: 5.58"}},{"category":"Department","label":"Operations & Customer Service","value":5.4,"additional_data":{"tooltip":"Average rating: 5.40"}},{"category":"Department","label":"Investments","value":5.3,"additional_data":{"tooltip":"Average rating: 5.30"}},{"category":"Department","label":"Human Resources","value":5.32,"additional_data":{"tooltip":"Average rating: 5.32"}},{"category":"Department","label":"Marketing","value":4.95,"additional_data":{"tooltip":"Average rating: 4.95"}},{"category":"Department","label":"Legal, Compliance & Regulatory affairs","value":4.79,"additional_data":{"tooltip":"Average rating: 4.79"}},{"category":"Department","label":"Digital","value":4.31,"additional_data":{"tooltip":"Average rating: 4.31"}}],"chart_config":{"type":"pie","description":"Average rating by department","showLegend":false,"xField":"label","yField":"value","layout":{"xaxis":{"title":"Department","type":"category"},"yaxis":{"title":"Average Rating","type":"number"},"margin":{"l":50,"r":50,"t":50,"b":100}}}}

// Example 4: Line Chart
export const lineChartMetadata: ChartMetadata = {
  chart_available: true,
  data_summary: {
    type: "financial",
    record_count: 8,
    has_trends: true,
    has_demographics: false,
    has_numerical_data: true
  },
  chart_data: [
    {
      category: "Revenue",
      label: "Q1 2023",
      value: 125000,
      additional_data: { quarter: "Q1", year: "2023" }
    },
    {
      category: "Revenue",
      label: "Q2 2023",
      value: 142000,
      additional_data: { quarter: "Q2", year: "2023" }
    },
    {
      category: "Revenue", 
      label: "Q3 2023",
      value: 156000,
      additional_data: { quarter: "Q3", year: "2023" }
    },
    {
      category: "Revenue",
      label: "Q4 2023", 
      value: 189000,
      additional_data: { quarter: "Q4", year: "2023" }
    },
    {
      category: "Revenue",
      label: "Q1 2024",
      value: 201000,
      additional_data: { quarter: "Q1", year: "2024" }
    },
    {
      category: "Revenue",
      label: "Q2 2024",
      value: 225000,
      additional_data: { quarter: "Q2", year: "2024" }
    }
  ],
  chart_config: {
    type: "bar",
    title: "Revenue Trends by Quarter",
    seriesBy: "year",
    xField: "quarter",
    colors: {
      "2023": "#2ecc71", 
      "2024": "#9b59b6"
    },
    layout: {
      xaxis: { title: "Quarter" },
      yaxis: { title: "Revenue ($)" }
    }
  }
};

// Example 5: Heatmap
export const heatmapMetadata: ChartMetadata = {
"chart_available":true,"data_summary":{"type":"survey","record_count":5,"has_trends":false,"has_demographics":false,"has_numerical_data": true},"chart_data":[{"category":"Constructive Feedback","label":"K Antara","value":3,"additional_data":{"tooltip":"Sometimes","metadata":{"original_value":"Sometimes","quantized_value":3,"scale_type":"frequency_scale"}}},{"category":"Career Growth","label":"K Antara","value":3,"additional_data":{"tooltip":"Sometimes","metadata":{"original_value":"Sometimes","quantized_value":3,"scale_type":"frequency_scale"}}},{"category":"Unbiased","label":"K Antara","value":4,"additional_data":{"tooltip":"Mostly","metadata":{"original_value":"Mostly","quantized_value":4,"scale_type":"frequency_scale"}}},{"category":"Collaboration","label":"K Antara","value":2,"additional_data":{"tooltip":"Rarely","metadata":{"original_value":"Rarely","quantized_value":2,"scale_type":"frequency_scale"}}},{"category":"Availability","label":"K Antara","value":3,"additional_data":{"tooltip":"Sometimes","metadata":{"original_value":"Sometimes","quantized_value":3,"scale_type":"frequency_scale"}}},{"category":"Positive Environment","label":"K Antara","value":3,"additional_data":{"tooltip":"Sometimes","metadata":{"original_value":"Sometimes","quantized_value":3,"scale_type":"frequency_scale"}}},{"category":"Experience Score","label":"K Antara","value":3.0,"additional_data":{"tooltip":"Experience Score: 3.0","metadata":{"original_value":3.0,"quantized_value":3.0,"scale_type":"rating_scale"}}},{"category":"Constructive Feedback","label":"V Ram","value":5,"additional_data":{"tooltip":"Always","metadata":{"original_value":"Always","quantized_value":5,"scale_type":"frequency_scale"}}},{"category":"Career Growth","label":"V Ram","value":4,"additional_data":{"tooltip":"Mostly","metadata":{"original_value":"Mostly","quantized_value":4,"scale_type":"frequency_scale"}}},{"category":"Unbiased","label":"V Ram","value":5,"additional_data":{"tooltip":"Always","metadata":{"original_value":"Always","quantized_value":5,"scale_type":"frequency_scale"}}},{"category":"Collaboration","label":"V Ram","value":4,"additional_data":{"tooltip":"Mostly","metadata":{"original_value":"Mostly","quantized_value":4,"scale_type":"frequency_scale"}}},{"category":"Availability","label":"V Ram","value":5,"additional_data":{"tooltip":"Always","metadata":{"original_value":"Always","quantized_value":5,"scale_type":"frequency_scale"}}},{"category":"Positive Environment","label":"V Ram","value":5,"additional_data":{"tooltip":"Always","metadata":{"original_value":"Always","quantized_value":5,"scale_type":"frequency_scale"}}},{"category":"Experience Score","label":"V Ram","value":4.0,"additional_data":{"tooltip":"Experience Score: 4.0","metadata":{"original_value":4.0,"quantized_value":4.0,"scale_type":"rating_scale"}}},{"category":"Constructive Feedback","label":"Gopal","value":4,"additional_data":{"tooltip":"Mostly","metadata":{"original_value":"Mostly","quantized_value":4,"scale_type":"frequency_scale"}}},{"category":"Career Growth","label":"Gopal","value":4,"additional_data":{"tooltip":"Mostly","metadata":{"original_value":"Mostly","quantized_value":4,"scale_type":"frequency_scale"}}},{"category":"Unbiased","label":"Gopal","value":5,"additional_data":{"tooltip":"Always","metadata":{"original_value":"Always","quantized_value":5,"scale_type":"frequency_scale"}}},{"category":"Collaboration","label":"Gopal","value":4,"additional_data":{"tooltip":"Mostly","metadata":{"original_value":"Mostly","quantized_value":4,"scale_type":"frequency_scale"}}},{"category":"Availability","label":"Gopal","value":5,"additional_data":{"tooltip":"Always","metadata":{"original_value":"Always","quantized_value":5,"scale_type":"frequency_scale"}}},{"category":"Positive Environment","label":"Gopal","value":4,"additional_data":{"tooltip":"Mostly","metadata":{"original_value":"Mostly","quantized_value":4,"scale_type":"frequency_scale"}}},{"category":"Experience Score","label":"Gopal","value":4.0,"additional_data":{"tooltip":"Experience Score: 4.0","metadata":{"original_value":4.0,"quantized_value":4.0,"scale_type":"rating_scale"}}}],"chart_config":{"type":"heatmap","description":"Heatmap showing team leader performance across behavioral categories in Penta Ltd department","showLegend":true,"groupBy":"label","seriesBy":"category","xField":"category","yField":"label","scale_info":{"min_value":1,"max_value":5,"scale_type":"frequency_scale","scale_labels":{"1":"Never","2":"Rarely","3":"Sometimes","4":"Mostly","5":"Always"},"scale_description":"Frequency of positive behaviors exhibited by team leaders","color_range":["#FF4136","#FFDC00","#2ECC40"]},"legend_config":{"show_scale":true,"show_interpretation":true,"show_categories":false,"interpretation_text":"Higher values (darker green) indicate more frequent positive behaviors across categories. Lower values (red) indicate areas for improvement."},"layout":{"xaxis":{"title":"Behavioral Categories","type":"category"},"yaxis":{"title":"Team Leaders","type":"category"},"margin":{"l":100,"r":50,"t":50,"b":100}}}}
