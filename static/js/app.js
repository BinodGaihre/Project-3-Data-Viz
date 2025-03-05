function buildMetadata(sample) {
  d3.csv("./static/js/cleaned_data_city.csv").then((data) => {
    // Using d3 to select the panel with id of `#sample-metadata`
    let select_panel = d3.select("#sample-metadata");

    // Clear any existing metadata
    select_panel.html("");

    let filteredData = data.filter(function(row) {
      return row["city"] == sample;
    });

    // Iterate through the filtered row and access each column
    filteredData.forEach(function(row) {
      Object.keys(row).forEach(function(column) {
        let value = row[column];  // Access the value for each column
        select_panel.append("p").text(`${column}: ${value}`).style("font-size", "16px");
      });
    });
  });
};

// Building the charts
function buildCharts(sample) {
  d3.csv("./static/js/cleaned_data.csv").then((data) => {
    let x = [];
    let y = [];
    let tract = [];
    let rent = [];
    let shortComutes = [];
    let gradRate = [];
    let filteredData = data.filter(function(row) {
      return row["city"] == sample;
    });

    filteredData.forEach(function(row) {
      // datacollection
      y.push(row["Poverty_Rate"]);
      x.push(row["Median_Hhold_Income"]);
      tract.push(row["tract"]);
      rent.push(parseFloat(row['Median_Rent']));
      shortComutes.push(row["Short_Work_Commutes"]);
      gradRate.push(row["College_Graduates"]);
    });
    console.log(tract)
    console.log(rent)
    // Building a scatter Chart
    var trace1 = {
      x: x,
      y: y,
      mode: 'markers',
      type: 'scatter',
      marker: {
        size: 8,
        color : 'blue',
        capacity : 0.8
      },
      name : 'Data Points' 
    };
    let slopeIntercept = linearReg(x,y)
    let s = slopeIntercept.slope
    let i = slopeIntercept.intercept
    let xValue = [Math.min(...x), Math.max(...x)];
    let yValue = xValue.map(value => s * value + i);
    var trace2 = {
      x:xValue,
      y: yValue,
      mode: 'lines',
      type: 'scatter',
      line: {
        color: 'red',
        width: 2
      },
    name: 'Regression Line'
    }

    var data1 = [trace1, trace2];

    // Applying a title to the layout
    var layout1 = {
      title: `Poverty Rate vs Median Household Income for ${sample}`,
      xaxis: { title: "Median Household Income" },
      yaxis: { title: "Poverty Rate" },
      margin: { l: 100, r: 50, t: 50, b: 50 }
    };

    Plotly.newPlot('scatter', data1, layout1);

    // Building a Bar Chart
    let trace3 = {
      y: rent,
      marker: {
        color : 'green'
      },
      type: "bar"
    };
    
    let data3 = [trace3];
    
    // Applying a title to the layout
    let layout3 = {
      title: `rent over sample areas in ${sample}`,
      yaxis : {title: "Rent"},
      xaxis: {
        title: "Random Sample Areas",
      },
      margin: {
        l: 100,
        r: 50,
        t: 50,
        b: 150
      }, 
    };
    
    // Rendering the plot to the div tag with id "bar"
    Plotly.newPlot("bar", data3, layout3);
    let scaleFactor = 10; 

    // Scale the rent values
    let scaledRent = rent.map(value => value / scaleFactor);

    // building a bubble chart 
    let trace4 ={
      x: x,
      y: rent,
      mode: 'markers',
      marker: {
        size: scaledRent,
        color: gradRate,
        colorscale: 'Viridis',
        showscale: true,
        colorbar: {
          title: 'Graduation Rate',  // Title for the color scale
          tickformat: '.0%'
          }
      },
    }
    let data4 = [trace4];
    let layout4 = {
      title: `Bubble Chart - Household Income, Rent, and Graduation rate for ${sample}`,
      xaxis: {
        title: 'Median Household Income'
      },
      yaxis: {
        title: 'rent'
      },
      showlegend: false
    };

    // Create the chart
    Plotly.newPlot('bubblechart', data4, layout4);

    let areas = ['Chicago South Side', 'Chicago West Side', 'Chicago North Side',
      'Chicago Suburbs', 'Chicago East Side'];
    
    let metrics = ["Median_Rent", "Median_Hhold_Income", "Poverty_Rate", "College_Graduates", "Short_Work_Commutes"];
    
    // Function to calculate data for a given metric
    function calculateMetricData(d, areas, metric) {
      let metricArray = [];
      console.log(d)
    
      for (let i = 0; i < areas.length; i++) {
        let area = areas[i];
        let count = 0;
        let total = 0;
    
        for (let j = 0; j < d.length; j++) {
          let row = d[j];
          if (row.area == area) {
            total += row[metric];
            count += 1;
          }
        }
    
        let meanValue = count > 0 ? total / count : 0;
        metricArray.push(meanValue);
      }
    
      return metricArray;
      
    }
    
    // Initial metric to plot
    let initialMetric = "Median_Hhold_Income";
    let initialData = calculateMetricData(d, areas, initialMetric);
    
    // Set up the initial trace
    let trace5 = {
      x: areas,
      y: initialData,
      type: "bar",
      marker :{
        color :"red"
      }
    };
    let chart = [trace5];
    
    // Set up layout with dropdown
    let layout5 = {
      title: `Cities/ Chicago Neighborhoods ${initialMetric}`,
      updatemenus: [{
        buttons: metrics.map(metric => ({
          method: 'update',
          args: [
            { y: [calculateMetricData(d, areas, metric)] },   // Update Y data
            { title: `Cities/ Chicago Neighborhoods ${metric}` }  // Update title
          ],
          label: metric
        })),
        direction: 'down',
        showactive: true
      }]
    };
    
    // Create the initial plot
    Plotly.newPlot("zbar", chart, layout5);

  });
}

// Initializing the page
function init() {
  d3.csv("./static/js/cleaned_data_city.csv").then((data) => {
    // Get unique city names from the data
    let names = [...new Set(data.map(function(row) {
      return row["city"];
    }))];

    // Using d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select("#selDataset");

    // Using the list of city names to populate the select options
    names.forEach(function(name) {
      dropdownMenu.append("option").text(name).attr("value", name);
    });

    // Get the first city from the list
    let first_sample = names[0];

    // Build charts and metadata panel with the first city
    buildCharts(first_sample);
    buildMetadata(first_sample);
  });
}

// Event listener for dropdown selection
function optionChanged(newSample) {
  // Building charts and metadata panel each time a new city is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
function linearReg(x,y){

  const n = x.length;
  const sum_x = math.sum(x);
  const sum_y = math.sum(y);
  const sum_xx = math.sum(x.map(val => val * val)); // x^2
  const sum_xy = math.sum(x.map((val, i) => val * y[i])); // x * y

  // Calculate slope (m) and intercept (b) using the normal equation
  const slope = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
  const intercept = (sum_y - slope * sum_x) / n;

  return {slope, intercept};
}