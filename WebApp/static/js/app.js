d3.json("data/samples.json").then((sampleData) => {
    var samples = sampleData.samples;
    var subject_ids = samples.map(d =>d.id);
    // Let's dynamically fill the select with options
    var subject_select = d3.select("#selDataset")
    subject_ids.forEach(element => {
        subject_select.append("option").attr("value", element).html(element);
    });
}).catch(function(error) {
    console.log("Could not fill select options");
    console.log(error);
});






function optionChanged(subject_id) {
    console.log(subject_id);
    // Read Sample json data or log error
    d3.json("data/samples.json").then((sampleData) => {
        var samples = sampleData.samples;
        var metas = sampleData.metadata;
        var subject_ids = samples.map(d =>d.id);
        // Let's get this subject from the option selector
        var this_sample = samples.filter(d => d.id == subject_id)[0];
        var this_meta = metas.filter(d => d.id == subject_id)[0];
                // Let's add the demo information
                d3.select("#demo-id").html("ID: "+this_meta.id);
                d3.select("#demo-eth").html("ETHNICITY: "+this_meta.ethnicity);
                d3.select("#demo-gen").html("GENDER: "+this_meta.gender);
                d3.select("#demo-age").html("AGE: "+this_meta.age);
                d3.select("#demo-loc").html("LOCATION: "+this_meta.location);
                d3.select("#demo-BBT").html("BBTYPE: "+this_meta.bbtype);
                d3.select("#demo-wfrq").html("WFREQ: "+this_meta.wfreq);
        
        // For readability I would like to save off my variables        
        var otu_ids = this_sample.otu_ids.slice(0,9);
        var labeled_otu_ids = otu_ids.map(d => "OTU "+d); // Add 'OTU' prefix to labels
        var sample_values = this_sample.sample_values.slice(0,9);
        console.log(otu_ids)
        console.log(sample_values);
        // Let's make our Bar Chart
        var barTrace = {
            x: sample_values,
            y: labeled_otu_ids,
            type: "bar",
            orientation: 'h',
            text: labeled_otu_ids
        };
        var barData = [barTrace];
        var layout = {
            title: "Sample Values by OTU ID",
            yaxis: {'categoryorder':'total ascending'}
        };
        Plotly.newPlot("bar-holder", barData, layout);
        // Let's make our bubble chart
        var bubbleTrace = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            marker: {
              size: sample_values,
            },
            text: 
          };
          
          var bubbleData = [bubbleTrace];
          
          var layout = {
            title: 'Marker Size',
            showlegend: false,
            height: 600,
            width: 600
          };
          
          Plotly.newPlot('bubble-holder', bubbleData, layout);

    }).catch(function(error) {
        console.log(error);
  });

}
