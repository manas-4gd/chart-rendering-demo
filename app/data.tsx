import { ChartMetadata } from '../types';

export const topManagersBarChartMetadata: ChartMetadata = {
  chart_available: true,
  data_summary: {
    type: "analytics",
    record_count: 5,
    has_trends: false,
    has_demographics: false,
    has_numerical_data: true
  },
  chart_data: [
    {
      category: "Manager_Name",
      label: "Ramesh Iyer",
      value: 7.82
    },
    {
      category: "Manager_Name",
      label: "Sujata Deshpande",
      value: 7.3
    },
    {
      category: "Manager_Name",
      label: "Pooja Joshi",
      value: 7.18
    },
    {
      category: "Manager_Name",
      label: "Abhishek Tandon",
      value: 7.1
    },
    {
      category: "Manager_Name",
      label: "Manju Rao",
      value: 7.0
    }
  ],
  chart_config: {
    type: "bar",
    title: "Top 5 Managers by Average Rating",
    description: "Bar chart showing the average ratings of the top 5 managers",
    showLegend: false,
    xField: "label",
    yField: "value",
    layout: {
      xaxis: {
        title: "Manager Name",
        type: "category"
      },
      yaxis: {
        title: "Average Rating",
        type: "number"
      },
      margin: {
        l: 50,
        r: 50,
        t: 50,
        b: 50
      }
    }
  }
};

// Example 2: Grouped Bar Chart
export const groupedBarMetadata: ChartMetadata = {
  chart_available: true,
  data_summary: {
    type: "survey",
    record_count: 6,
    has_trends: false,
    has_demographics: true, 
    has_numerical_data: true
  },
  chart_data: [
    {
      category: "Performance",
      label: "Junior Engineering",
      value: 7.2,
      additional_data: {
        department: "Engineering",
        level: "Junior",
        experience_years: 2.5
      }
    },
    {
      category: "Performance",
      label: "Senior Engineering", 
      value: 8.5,
      additional_data: {
        department: "Engineering",
        level: "Senior",
        experience_years: 6.8
      }
    },
    {
      category: "Performance",
      label: "Junior Marketing",
      value: 6.8,
      additional_data: {
        department: "Marketing", 
        level: "Junior",
        experience_years: 1.8
      }
    },
    {
      category: "Performance",
      label: "Senior Marketing",
      value: 7.9,
      additional_data: {
        department: "Marketing",
        level: "Senior", 
        experience_years: 5.2
      }
    }
  ],
  chart_config: {
    type: "grouped_bar",
    title: "Performance by Department and Level",
    groupBy: "department",
    seriesBy: "level",
    colors: {
      "Junior": "#3498db",
      "Senior": "#e74c3c"
    },
    layout: {
      xaxis: { title: "Department" },
      yaxis: { title: "Performance Score" }
    }
  }
};

// Example 3: Pie Chart
export const pieChartMetadata: ChartMetadata = {
  chart_available: true,
  data_summary: {
    type: "analytics",
    record_count: 5,
    has_trends: false,
    has_demographics: false,
    has_numerical_data: true
  },
  chart_data:[{"category":"Manager_Name","label":"Ramesh Iyer","value":7.82},{"category":"Manager_Name","label":"Sujata Deshpande","value":7.3},{"category":"Manager_Name","label":"Pooja Joshi","value":7.18},{"category":"Manager_Name","label":"Abhishek Tandon","value":7.1},{"category":"Manager_Name","label":"Manju Rao","value":7.0}],
  chart_config:{"type":"pie","title":"Top 5 Managers by Average Rating","description":"Bar chart showing the average ratings of the top 5 managers","showLegend":false,"xField":"label","yField":"value","layout":{"xaxis":{"title":"Manager Name","type":"category"},"yaxis":{"title":"Average Rating","type":"number"},"margin":{"l":50,"r":50,"t":50,"b":50}}}}

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
  chart_available: true,
  data_summary: {
    type: "analytics",
    record_count: 6,
    has_trends: false,
    has_demographics: true,
    has_numerical_data: true
  },
  chart_data: [
    {
      category: "Satisfaction",
      label: "North Product A",
      value: 8.2,
      additional_data: { region: "North", product: "Product A" }
    },
    {
      category: "Satisfaction",
      label: "South Product A", 
      value: 7.5,
      additional_data: { region: "South", product: "Product A" }
    },
    {
      category: "Satisfaction",
      label: "North Product B",
      value: 6.8,
      additional_data: { region: "North", product: "Product B" }
    },
    {
      category: "Satisfaction",
      label: "South Product B",
      value: 7.9,
      additional_data: { region: "South", product: "Product B" }
    },
    {
      category: "Satisfaction", 
      label: "North Product C",
      value: 9.1,
      additional_data: { region: "North", product: "Product C" }
    },
    {
      category: "Satisfaction",
      label: "South Product C",
      value: 8.7,
      additional_data: { region: "South", product: "Product C" }
    }
  ],
  chart_config: {
    type: "heatmap",
    title: "Customer Satisfaction Heatmap",
    xField: "region",
    yField: "product", 
    colorscale: "RdYlBu",
    layout: {
      xaxis: { title: "Region" },
      yaxis: { title: "Product" }
    }
  }
};