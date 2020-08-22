function giveMeThosePlost(id) {
    d3.json("../static/data/samples.json").then((data) => {

        // Check that we are getting data.
        console.log(data);

        //filter the the data using the id provided
        var filteredData = data.samples.filter(d => d.id.toString() == id)[0];

        //Create the traces of the plot.

        //Create variable for the top 10 sample values
        //from data, got key sample at index 0 and then get values under the key sample_values and then slice the the top 10. 
        var tableTop10SampleValues = filteredData.sample_values.slice(0,10).reverse();
        console.log(tableTop10SampleValues);

        //Create variable for the top 10 ids.
        //from data, got key sample at index 0 and then get values under the key otu_ids and then slice the the top 10. 
        var tableTop10ids = filteredData.otu_ids.slice(0,10).reverse();
        console.log(tableTop10ids);

        //In order to change to the correct format we want to use map.
        var tableTop10idsText = tableTop10ids.map(id => "OTU " + id);
        console.log(tableTop10idsText);

        //Create variable for the top 10 labels.
        //from data, got key sample at index 0 and then get values under the key tableTop10Labels and then slice the the top 10. 
        var tableTop10Labels = filteredData.otu_labels.slice(0,10).reverse();
        console.log(tableTop10Labels);

        //Create the trace1 for the bar plot.
        var trace1 = {
            x: tableTop10SampleValues,
            y: tableTop10idsText,
            text: tableTop10Labels,
            type:'bar',
            orientation: 'h',
            marker:{
                color:'blue'
            }
        };

        //Create the data trace for the bar graph.
        var dataTrace1 = [trace1];

        //Layout to make it pretty
        var layout1 = {
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };

        //Create the bar plot
        Plotly.newPlot("bar", dataTrace1, layout1);

        //Create the trace1 for the bubble plot.
        var trace2 = {
            x: filteredData.otu_ids, //We cannot use the variabels we created because they are sliced from  0 to 10
            y: filteredData.sample_values,
            text: filteredData.otu_labels,
            mode: 'markers',
            marker:{
                size: filteredData.sample_values,
                color: filteredData.otu_ids
            }
        };

        //Create the data trace for the bar graph.
        var dataTrace2 = [trace2];

        //Layout to make it pretty
        var layout2 = {
            xaxis:{title: "OTU ID"},
            height: 900,
            width: 1300
        };

        //Create the bar plot
        Plotly.newPlot('bubble', dataTrace2,layout2);
    });
};

//Create the function to get the metadata
function giveMeThatBoxInfo (id) {

    //link the json file to read the metadata
    d3.json("../static/data/samples.json").then((mdata) =>{
        var metaData = mdata.metadata;

        //filter the metadata using the id provided
        var query = metaData.filter(m => m.id.toString() == id)[0];

        //Find the text panel to pass the query
        var textBox = d3.select('#sample-metadata');

        //Clears any previous html code.
        textBox.html("");

        Object.entries(query).forEach((key) => {textBox.append("h5").text(key[0].toUpperCase() + " : " + key[1] + '\n');
        });
        buildGauge(query.WFREQ);
    });
};

//Function to refresh everything when we have a change in event.

function optionChanged(id) {
    giveMeThosePlost(id);
    giveMeThatBoxInfo(id);
};


//Init function 
function init() {

    //Variable to modify the options in the drop down menu
    var dropOptions = d3.select("#selDataset");


    //imports json
    d3.json("../static/data/samples.json").then((data) => {

        data.names.forEach(function(name){
            dropOptions.append("option").text(name).property("value");
        });


        giveMeThosePlost(data.names[0]);
        giveMeThatBoxInfo(data.names[0]);

    });
};

init();


