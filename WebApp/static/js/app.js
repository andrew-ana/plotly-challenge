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
        var subject_ids = samples.map(d =>d.id);
        // Let's get this subject from the option selector
        var this_sample = samples.filter(d => d.id == subject_id)[0];
        var otu_ids = this_sample.otu_ids.slice(0,9);
        var labeled_otu_ids = otu_ids.map(d => "OTU "+d);
        var sample_values = this_sample.sample_values.slice(0,9);
        console.log(otu_ids)
        console.log(sample_values);
        
        var trace1 = {
            x: sample_values,
            y: labeled_otu_ids,
            type: "bar",
            orientation: 'h',
            text: labeled_otu_ids
        };
        
        var data = [trace1];
        
        var layout = {
            title: "Sample Values by OTU ID",
            yaxis: {'categoryorder':'total ascending'}
        };
        
        Plotly.newPlot("bar-holder", data, layout);
    }).catch(function(error) {
        console.log(error);
  });

}
