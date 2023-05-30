// Store our API endpoint as queryUrl.
const query_url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Perform a GET request to the query URL/
d3.json(query_url).then(function (data) {
    //View in console
    console.log(data);
  });
  
// Create the initialize function 
function initialize() {
    
    // Select the dropdown menu
    let dropdown = d3.select("#selDataset");

    d3.json(query_url).then((data) => {
        // Declare variable for names data
        let names = data.names;
        
        // Add sample to dropdown
        names.forEach((id) => {
            // View id value in console
            console.log(id);

            //append in dropdown
            dropdown.append("option").text(id).property("value", id);
        });
        // Declare variable to hold sample one
        let first_sample = names[0];
        console.log(first_sample);
           
        meta(first_sample);
        bar(first_sample);
        bubble(first_sample);
    });
};

// Create meta function
function meta(first_sample) {

    // Perform a GET request to the query URL/
    d3.json(query_url).then((data) => {

        let meta = data.metadata;
        let value = meta.filter(result => result.id == first_sample);
        // view in console
        console.log(value)
        // Get the first index from the array
        let value_data = value[0];

        d3.select("#sample-metadata").html("");
    
        Object.entries(value_data).forEach(([key,value]) => {
            console.log(key,value);
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });                                                                                                                                                                                                                                                                                                                                             
    });

};

// OptionChanged function
function optionChanged(value) { 

    //console log new value
    console.log(value); 

   // Call meta, bar, bubble functions
    meta(value);
    bar(value);
    bubble(value);
   
};

// Function for bar chart
function bar(first_sample) {

    // Perform a GET request to the query URL/
    d3.json(query_url).then((data) => {

        // Retrieve sample data
        let sample_info = data.samples;

        // Filter based on the value of the sample
        let value = sample_info.filter(result => result.id == first_sample);

       // Get array first index
       let value_data = value[0];

        // Get values of otu_ids, labels, sample values
        let otu_Ids= value_data.otu_ids;
        let otu_labels= value_data.otu_labels;
        let sample_values= value_data.sample_values;
  
        // Log the data to the console
        console.log(otu_Ids,otu_labels,sample_values);
  
        let yticks  =  otu_Ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks  =  sample_values.slice(0,10).reverse();
        let labels  =  otu_labels.slice(0,10).reverse();
        
        // Set up the trace for the bar chart
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        // Setup the layout
        let layout = {
            title: "Top 10 OTUs Present"
        };

        // Plot bar chart calling Plotly 
        Plotly.newPlot("bar", [trace], layout)
    });
};

// Create bubble chart function
function bubble(first_sample) {

    // Perform a GET request to the query URL/
    d3.json(query_url).then((data) => {
        
        // Retrieve sample data
        let sample_info = data.samples;
      
        let value = sample_info.filter(result => result.id == first_sample);

        // Get array first index
        let value_data = value[0];

        // Get values of otu_ids, labels, sample values
        let otu_Ids= value_data.otu_ids;
        let otu_labels= value_data.otu_labels;
        let sample_values= value_data.sample_values;

        // Log the data to the console
        console.log(otu_Ids,otu_labels,sample_values);
        
        // Set up bubble chart trace
        let trace1 = {
            x: otu_Ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_Ids,
                colorscale: "Earth"
            }
        };

        // Layout
        let layout ={
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        // Create bubble plot calling Plotly
        Plotly.newPlot("bubble", [trace1], layout)
    });
};

// Call initialize
initialize();