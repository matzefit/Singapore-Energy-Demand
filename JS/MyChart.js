        var options = {
            chart: {
                type: 'line'
            },
            series: [{
                name: 'sales',
                data: [document.getElementById('#CoolingJanuary').innerHTML, 40, 35, 50, 49, 60, 70, 91, 125,100,110,200]
            }],
            xaxis: {
                categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November','December']
            }
        }

        var chart = new ApexCharts(document.querySelector("#chart"), options);

        chart.render();