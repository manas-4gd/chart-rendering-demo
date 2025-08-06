import { ChartMetadata } from '../types';

export const topManagersBarChartMetadata: ChartMetadata = {
"chart_available":true,"data_summary":{"type":"survey","record_count":12,"has_trends":false,"has_demographics":false,"has_numerical_data":true},"chart_data":[{"category":"Sentiment","label":"Positive","value":7,"additional_data":{"tooltip":"7 responses with positive sentiment (score > 0)"}},{"category":"Sentiment","label":"Neutral","value":2,"additional_data":{"tooltip":"2 responses with neutral sentiment (score = 0)"}},{"category":"Sentiment","label":"Negative","value":3,"additional_data":{"tooltip":"3 responses with negative sentiment (score < 0)"}},{"category":"Positive Feedback","label":"Value for money","value":5,"additional_data":{"tooltip":"5 mentions of value for money"}},{"category":"Positive Feedback","label":"Reliability","value":1,"additional_data":{"tooltip":"1 mention of reliability"}},{"category":"Positive Feedback","label":"Quality of services/products","value":1,"additional_data":{"tooltip":"1 mention of quality of services/products"}},{"category":"Positive Feedback","label":"Ease of use","value":1,"additional_data":{"tooltip":"1 mention of ease of use"}},{"category":"Improvement Areas","label":"Value for money","value":1,"additional_data":{"tooltip":"1 mention of value for money as an improvement area"}},{"category":"Improvement Areas","label":"Customer support","value":1,"additional_data":{"tooltip":"1 mention of customer support as an improvement area"}}],"chart_config":{"type":"bar","description":"Summary of positive feedback, improvement areas, and sentiment across all customers","showLegend":true,"groupBy":"category","xField":"label","yField":"value","suggested_graphs":["bar","pie","groupbar"],"scale_info":{"min_value":0,"max_value":7,"scale_type":"count","scale_labels":{"0":"0","3":"3","7":"7"},"scale_description":"Number of mentions or responses","color_range":["#FFA07A","#98FB98","#87CEFA"]},"legend_config":{"show_scale":true,"show_interpretation":true,"show_categories":true,"interpretation_text":"Bar height represents the frequency of mentions for each category and label"},"layout":{"xaxis":{"title":"Feedback Categories","type":"category"},"yaxis":{"title":"Number of Mentions","type":"number"},"margin":{"l":50,"r":50,"t":50,"b":50}}}}

// Example 2: Grouped Bar Chart
export const groupedBarMetadata: ChartMetadata = {
"chart_available":true,"chart_data":[{"category":"Feedback","label":"Gopal","value":4.0,"additional_data":{"tooltip":"Feedback score: 4.0","color":"#3498db","group":"Gopal"}},{"category":"Coaching","label":"Gopal","value":4.0,"additional_data":{"tooltip":"Coaching score: 4.0","color":"#3498db","group":"Gopal"}},{"category":"Unbiased","label":"Gopal","value":5.0,"additional_data":{"tooltip":"Unbiased score: 5.0","color":"#3498db","group":"Gopal"}},{"category":"Collaboration","label":"Gopal","value":4.0,"additional_data":{"tooltip":"Collaboration score: 4.0","color":"#3498db","group":"Gopal"}},{"category":"Availability","label":"Gopal","value":5.0,"additional_data":{"tooltip":"Availability score: 5.0","color":"#3498db","group":"Gopal"}},{"category":"Positive Environment","label":"Gopal","value":4.0,"additional_data":{"tooltip":"Positive Environment score: 4.0","color":"#3498db","group":"Gopal"}},{"category":"Feedback","label":"V Ram","value":3.5,"additional_data":{"tooltip":"Feedback score: 3.5","color":"#2ecc71","group":"V Ram"}},{"category":"Coaching","label":"V Ram","value":2.5,"additional_data":{"tooltip":"Coaching score: 2.5","color":"#2ecc71","group":"V Ram"}},{"category":"Unbiased","label":"V Ram","value":3.5,"additional_data":{"tooltip":"Unbiased score: 3.5","color":"#2ecc71","group":"V Ram"}},{"category":"Collaboration","label":"V Ram","value":2.5,"additional_data":{"tooltip":"Collaboration score: 2.5","color":"#2ecc71","group":"V Ram"}},{"category":"Availability","label":"V Ram","value":3.5,"additional_data":{"tooltip":"Availability score: 3.5","color":"#2ecc71","group":"V Ram"}},{"category":"Positive Environment","label":"V Ram","value":3.0,"additional_data":{"tooltip":"Positive Environment score: 3.0","color":"#2ecc71","group":"V Ram"}},{"category":"Feedback","label":"K Antara","value":4.0,"additional_data":{"tooltip":"Feedback score: 4.0","color":"#e74c3c","group":"K Antara"}},{"category":"Coaching","label":"K Antara","value":3.5,"additional_data":{"tooltip":"Coaching score: 3.5","color":"#e74c3c","group":"K Antara"}},{"category":"Unbiased","label":"K Antara","value":4.5,"additional_data":{"tooltip":"Unbiased score: 4.5","color":"#e74c3c","group":"K Antara"}},{"category":"Collaboration","label":"K Antara","value":2.5,"additional_data":{"tooltip":"Collaboration score: 2.5","color":"#e74c3c","group":"K Antara"}},{"category":"Availability","label":"K Antara","value":4.0,"additional_data":{"tooltip":"Availability score: 4.0","color":"#e74c3c","group":"K Antara"}},{"category":"Positive Environment","label":"K Antara","value":3.5,"additional_data":{"tooltip":"Positive Environment score: 3.5","color":"#e74c3c","group":"K Antara"}}],"chart_config":{"type":"grouped_bar","description":"Grouped bar chart of team leader performance scores across different behavioral categories in Penta Ltd department","showLegend":true,"groupBy":"label","xField":"category","yField":"value","colors":{"Gopal":"#3498db","V Ram":"#2ecc71","K Antara":"#e74c3c"},"legend_config":{"show_scale":false,"show_interpretation":true,"show_categories":true,"interpretation_text":"Each colored bar represents a different team leader. Compare performance across behavioral categories to identify strengths and development areas."},"layout":{"xaxis":{"title":"Behavioral Categories","type":"category"},"yaxis":{"title":"Score","type":"number"},"margin":{"l":50,"r":50,"t":50,"b":100}}}}
// Example 3: Pie Chart
export const pieChartMetadata: ChartMetadata = {
"chart_available":true,"data_summary":{"type":"survey","record_count":12,"has_trends":false,"has_demographics":false,"has_numerical_data":true},"chart_data":[{"category":"Department","label":"Talent Academy","value":6.77,"additional_data":{"tooltip":"Average rating: 6.77","color":"#1f77b4"}},{"category":"Department","label":"Technology","value":5.94,"additional_data":{"tooltip":"Average rating: 5.94","color":"#ff7f0e"}},{"category":"Department","label":"Finance","value":5.95,"additional_data":{"tooltip":"Average rating: 5.95","color":"#2ca02c"}},{"category":"Department","label":"Risk Management","value":5.75,"additional_data":{"tooltip":"Average rating: 5.75","color":"#d62728"}},{"category":"Department","label":"Sales & Distribution","value":5.74,"additional_data":{"tooltip":"Average rating: 5.74","color":"#9467bd"}},{"category":"Department","label":"Floor Ops","value":5.58,"additional_data":{"tooltip":"Average rating: 5.58","color":"#8c564b"}},{"category":"Department","label":"Operations & Customer Service","value":5.4,"additional_data":{"tooltip":"Average rating: 5.40","color":"#e377c2"}},{"category":"Department","label":"Investments","value":5.3,"additional_data":{"tooltip":"Average rating: 5.30","color":"#7f7f7f"}},{"category":"Department","label":"Human Resources","value":5.32,"additional_data":{"tooltip":"Average rating: 5.32","color":"#bcbd22"}},{"category":"Department","label":"Marketing","value":4.95,"additional_data":{"tooltip":"Average rating: 4.95","color":"#17becf"}},{"category":"Department","label":"Legal, Compliance & Regulatory affairs","value":4.79,"additional_data":{"tooltip":"Average rating: 4.79","color":"#ff9896"}},{"category":"Department","label":"Digital","value":4.31,"additional_data":{"tooltip":"Average rating: 4.31","color":"#c5b0d5"}}],"chart_config":{"type":"pie","description":"Average rating by department","showLegend":false,"xField":"label","yField":"value","legend_config":{"show_scale":false,"show_interpretation":true,"show_categories":true,"interpretation_text":"Each slice represents a department's average rating. Larger slices indicate departments with higher average ratings."},"layout":{"xaxis":{"title":"Department","type":"category"},"yaxis":{"title":"Average Rating","type":"number"},"margin":{"l":50,"r":50,"t":50,"b":100}}}}

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
"chart_available":true,"data_summary":{"type":"survey","record_count":5,"has_trends":false,"has_demographics":false,"has_numerical_data":true},"chart_data":[{"category":"Gives Regular Feedback","label":"K Antara","value":4,"additional_data":{"tooltip":"K Antara: Always gives regular feedback","metadata":{"original_value":"Always","quantized_value":4,"scale_type":"frequency_scale"}}},{"category":"Guides Career Growth","label":"K Antara","value":3,"additional_data":{"tooltip":"K Antara: Mostly guides career growth","metadata":{"original_value":"Mostly","quantized_value":3,"scale_type":"frequency_scale"}}},{"category":"Not Biased","label":"K Antara","value":4,"additional_data":{"tooltip":"K Antara: Always not biased","metadata":{"original_value":"Always","quantized_value":4,"scale_type":"frequency_scale"}}},{"category":"Encourages Collaboration","label":"K Antara","value":2,"additional_data":{"tooltip":"K Antara: Sometimes encourages collaboration","metadata":{"original_value":"Sometimes","quantized_value":2,"scale_type":"frequency_scale"}}},{"category":"Available When Needed","label":"K Antara","value":4,"additional_data":{"tooltip":"K Antara: Always available when needed","metadata":{"original_value":"Always","quantized_value":4,"scale_type":"frequency_scale"}}},{"category":"Builds Positive Environment","label":"K Antara","value":3,"additional_data":{"tooltip":"K Antara: Mostly builds positive environment","metadata":{"original_value":"Mostly","quantized_value":3,"scale_type":"frequency_scale"}}},{"category":"Experience Score","label":"K Antara","value":3.5,"additional_data":{"tooltip":"K Antara: Average experience score of 3.5","metadata":{"original_value":3.5,"quantized_value":3.5,"scale_type":"rating_scale"}}},{"category":"Gives Regular Feedback","label":"Gopal","value":3,"additional_data":{"tooltip":"Gopal: Mostly gives regular feedback","metadata":{"original_value":"Mostly","quantized_value":3,"scale_type":"frequency_scale"}}},{"category":"Guides Career Growth","label":"Gopal","value":3,"additional_data":{"tooltip":"Gopal: Mostly guides career growth","metadata":{"original_value":"Mostly","quantized_value":3,"scale_type":"frequency_scale"}}},{"category":"Not Biased","label":"Gopal","value":4,"additional_data":{"tooltip":"Gopal: Always not biased","metadata":{"original_value":"Always","quantized_value":4,"scale_type":"frequency_scale"}}},{"category":"Encourages Collaboration","label":"Gopal","value":3,"additional_data":{"tooltip":"Gopal: Mostly encourages collaboration","metadata":{"original_value":"Mostly","quantized_value":3,"scale_type":"frequency_scale"}}},{"category":"Available When Needed","label":"Gopal","value":4,"additional_data":{"tooltip":"Gopal: Always available when needed","metadata":{"original_value":"Always","quantized_value":4,"scale_type":"frequency_scale"}}},{"category":"Builds Positive Environment","label":"Gopal","value":3,"additional_data":{"tooltip":"Gopal: Mostly builds positive environment","metadata":{"original_value":"Mostly","quantized_value":3,"scale_type":"frequency_scale"}}},{"category":"Experience Score","label":"Gopal","value":4,"additional_data":{"tooltip":"Gopal: Experience score of 4.0","metadata":{"original_value":4.0,"quantized_value":4,"scale_type":"rating_scale"}}},{"category":"Gives Regular Feedback","label":"V Ram","value":2.5,"additional_data":{"tooltip":"V Ram: Mixed feedback (Rarely and Always)","metadata":{"original_value":"Mixed","quantized_value":2.5,"scale_type":"frequency_scale"}}},{"category":"Guides Career Growth","label":"V Ram","value":2,"additional_data":{"tooltip":"V Ram: Mixed feedback (Never and Mostly)","metadata":{"original_value":"Mixed","quantized_value":2,"scale_type":"frequency_scale"}}},{"category":"Not Biased","label":"V Ram","value":2.5,"additional_data":{"tooltip":"V Ram: Mixed feedback (Rarely and Always)","metadata":{"original_value":"Mixed","quantized_value":2.5,"scale_type":"frequency_scale"}}},{"category":"Encourages Collaboration","label":"V Ram","value":2,"additional_data":{"tooltip":"V Ram: Mixed feedback (Never and Mostly)","metadata":{"original_value":"Mixed","quantized_value":2,"scale_type":"frequency_scale"}}},{"category":"Available When Needed","label":"V Ram","value":2.5,"additional_data":{"tooltip":"V Ram: Mixed feedback (Rarely and Always)","metadata":{"original_value":"Mixed","quantized_value":2.5,"scale_type":"frequency_scale"}}},{"category":"Builds Positive Environment","label":"V Ram","value":2,"additional_data":{"tooltip":"V Ram: Mixed feedback (Never and Always)","metadata":{"original_value":"Mixed","quantized_value":2,"scale_type":"frequency_scale"}}},{"category":"Experience Score","label":"V Ram","value":2.5,"additional_data":{"tooltip":"V Ram: Average experience score of 2.5","metadata":{"original_value":2.5,"quantized_value":2.5,"scale_type":"rating_scale"}}}],"chart_config":{"type":"heatmap","description":"Heatmap showing team leader performance across behavioral categories in Penta Ltd department","showLegend":true,"groupBy":"label","seriesBy":"category","xField":"category","yField":"label","suggested_graphs":["heatmap","groupbar"],"scale_info":{"min_value":1,"max_value":4,"scale_type":"frequency_scale","scale_labels":{"1":"Never","2":"Rarely","3":"Mostly","4":"Always"},"scale_description":"Frequency scale ranging from Never (1) to Always (4), with Experience Score on a 1-5 scale","color_range":["#FF4136","#FFDC00","#2ECC40"]},"legend_config":{"show_scale":true,"show_interpretation":true,"show_categories":false,"interpretation_text":"Higher values (darker colors) indicate better performance across behavioral categories and higher experience scores"},"layout":{"xaxis":{"title":"Behavioral Categories","type":"category"},"yaxis":{"title":"Team Leaders","type":"category"},"margin":{"l":100,"r":50,"t":50,"b":100}}}}
