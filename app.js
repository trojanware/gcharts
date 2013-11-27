angular.module('Dashboard', []).controller('CtrlChart1', function($scope) {
    var data = {
	'cols': [
	    {'id': 'task', label: 'Task', type:'string'},
	    {'id': 'value', label: 'Hours per day', type:'string'}
	],
	'rows': [
	    {c: [{v: 'Escalated'}, {v: 26}]},
	    {c: [{v: 'Resolved'}, {v: 254}]},
	    {c: [{v: 'Irrelevent'}, {v: 459}]},
	    {c: [{v: 'Unresolved'}, {v: 76}]},
	    {c: [{v: 'Flushed'}, {v: 189}]},
	]
    };
    $scope.chartData = data;
    var options = {
	pieHole: 0.3,
	backgroundColor: '#20242a',
	pieSliceBorderColor: '#20242a',
	legend: {
	    textStyle: {
		color: 'white'
	    }
	}
    };
    $scope.chartOptions = options;

}).controller('CtrlChart2', function($scope) {
	var data = new google.visualization.arrayToDataTable([
	    ["Time", "Line 1"],
	    ["3pm", 540],
	    ["4pm", 440],
	    ["5pm", 400],
	    ["6pm", 100],
	    ["7pm", 400],
	    ["9pm", 810]
	]);
	$scope.chartData = data;
	$scope.chartOptions = {
	    colors: ['#28bef8'],
	    slices: [
		{color: 'crimson'},
		{color: 'indigo'},
	    ],
	    titleTextStyle: {
		color: 'white'
	    },
	    legend: {
		position: 'none'
	    },
	    title: 'Incoming Posts',
	    areaOpacity: 1.0,
	    backgroundColor: '#20242a',
	    chartArea: {
		width: 600,
		left: 55
	    },
	    vAxis: {
		textStyle: {
		    color: 'white'
		},
		gridlines: {
		    color: '#20242a'
		}
	    },
	    hAxis: {
		textStyle: {
		    color: 'white'
		}
	    }
	};

    }).controller('CtrlChart3', function($scope) {
	var data = new google.visualization.arrayToDataTable([
	    ["Time", "Line 1"],
	    ["3pm", 540],
	    ["4pm", 440],
	    ["5pm", 400],
	    ["6pm", 100],
	    ["7pm", 400],
	    ["9pm", 810]
	]);
	$scope.chartData = data;
	$scope.chartOptions = {
	    is3D: true,
	    backgroundColor: '#20242a',
	    chartArea: {
		height: 100,
		width: 100,
		top: 0
	    },
	    colors: ['#28bef8'],
	    legend: {
		position: 'none'
	    },
	    areaOpacity: 1.0,
	    vAxis: {
		textPosition: 'none',
		gridlines: {
		    color: '#20242a'
		}
	    },
	    hAxis: {
		textPosition: 'none',
		gridlines: {
		    color: '#20242a'
		}
	    }
	};
    }).controller('CtrlSlider', function($scope) {
	$scope.value = 10;
    }).directive('slider', function() {
	function getSliderComponent(height, width, x, y, color) {
	    var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
	    rect.setAttribute('height', height);
	    rect.setAttribute('width', width);
	    rect.setAttribute('x', x);
	    rect.setAttribute('y', y);
	    rect.setAttribute('fill', color);
	    return rect;
	}

	function drawSlider($element, red, yellow, green ,value) {
	    var totalWidth = $element.width();
	    var redWidth = totalWidth * (parseInt(red) / 100);
	    var yellowWidth = totalWidth * (parseInt(yellow) / 100);
	    var greenWidth = totalWidth * (parseInt(green) / 100);
	    var markerPos = 100 == parseInt(value) ? totalWidth-5 : totalWidth * (parseInt(value) / 100);

	    var redRect = getSliderComponent(10, redWidth, 0, 5, 'rgb(255,0,0)');
	    var yellowRect = getSliderComponent(10, yellowWidth, redWidth, 5, 'rgb(255, 255,0)');
	    var greenRect = getSliderComponent(10, greenWidth, redWidth + yellowWidth, 5, 'rgb(0, 255,0)');

	    var marker = getSliderComponent(20, 5, markerPos, 0, 'rgb(144, 144, 144)');

	    var svgRoot = document.createElementNS('http://www.w3.org/2000/svg','svg');
	    svgRoot.setAttribute('height', $element.height());
	    svgRoot.appendChild(redRect);
	    svgRoot.appendChild(yellowRect);
	    svgRoot.appendChild(greenRect);
	    svgRoot.appendChild(marker);
	    $element.empty();
	    $element.prepend(svgRoot);
	}

	return {
	    restrict: 'E',
	    require: '^ngController',
	    scope: {
		value: '=value',
		red: '@red',
		yellow: '@yellow',
		green: '@green'
	    },
	    link: function($scope, $element, $attrs, $controller) {
		$scope.$watch('value', function(newVal, oldValue, scope) {
			drawSlider($element, scope.red, scope.yellow, scope.green, scope.value);
		    });
	    }
	}
    }).directive('googleChart', function() {
	function getChart(chartName, $elem) {
	    var chartObj;
	    switch(chartName){
	    case "PieChart":
		chartObj = new google.visualization.PieChart($elem);
		break;
	    case "AreaChart":
		chartObj = new google.visualization.AreaChart($elem);
		break;
	    }
	    return chartObj;
	}

	function drawChart(chartType, data, options, el) {
	    var dataTable;
	    if(data instanceof google.visualization.DataTable)
		dataTable = data;
	    else
		dataTable = new google.visualization.DataTable(data, 0.6);
	    chartObj = getChart(chartType, el);
	    chartObj.draw(dataTable, options);
	}

	return {
	    restrict: 'A',
	    require: '^ngController',
	    scope: {
		type: '@chartType',
		data: '=chartData'
	    },

	    link: function($scope, $element, $attrs, $controller) {
		//var chart = new google.visualization.PieChart($element[0]);
		var options = $scope.$parent.chartOptions;
		$scope.$watch('data', function(newValue, oldValue, scope) {
		    drawChart($scope.type, newValue, options, $element[0]);
		}, true);
		/*var chart = getChart($scope.type, $element[0]);
		chart.draw($controller.chart1.data, options);*/
	    }
	};
    });

