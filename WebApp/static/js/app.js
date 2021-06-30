// Read Sample json data or log error
d3.json("data/samples.json").then((sampleData) => {
    var samples = sampleData.samples;
    var otu_ids = samples.map(d => d.otu_ids);
    var subject_ids = samples.map(d =>d.id);
    console.log(subject_ids);
    console.log(samples);
    console.log(otu_ids);
    var trace1 = {
        x: samples.samples,
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
