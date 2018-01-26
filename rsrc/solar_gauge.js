
google.charts.load('current', {
  'packages': ['gauge']
});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Solar GW', 0]
  ]);

  var options = {
    max: 8,
    redFrom: 7,
    redTo: 8,
    yellowFrom: 5,
    yellowTo: 7,
    minorTicks: 5
  };

  var chart = new google.visualization.Gauge(document.getElementById('chart_div'));
  
  chart.draw(data, options);
  updateSolarGauge(chart, options, data);
}

function updateSolarGauge(chart, options, data) {
  $.ajax({
    url: "https://json2jsonp.com/",
    jsonp: "callback",
    dataType: "jsonp",
    data: {
      url: "https://www.solar.sheffield.ac.uk/ssfdb3/crud/nationalgrid/pvnowcast/0",
      format: "text"
    },
    success: function(response) {
      var generation = (response.generation_MW / 1000).toFixed(2);
      
      data.setValue(0, 1, generation);
      chart.draw(data, options);
    }
  });
}

