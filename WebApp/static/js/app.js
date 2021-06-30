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
        console.log(this_sample)
        var otu_ids = this_sample.otu_ids;
        console.log("This Subject's ID")
        console.log(this_sample.id);
        console.log("This Subject's otu IDs")
        console.log(otu_ids)
        var trace1 = {
            x: otu_ids,
            y: samples.samples,
            type: "bar"
        };
        
        var data = [trace1];
        
        var layout = {
            title: "'Bar' Chart"
        };
        
        Plotly.newPlot("test-bar", data, layout);
    }).catch(function(error) {
        console.log(error);
  });

}
