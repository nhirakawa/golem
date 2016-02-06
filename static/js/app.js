
var app = angular.module('Golem', [
	'nvd3'
]);

app.controller('GolemController', ['$scope',
	function($scope){

		var counter = 0;

		/* chart code */

		var addCpuData = function(cpu, timestamp){
			var user = {
				x: timestamp,
				y: cpu.user
			};

			var nice = {
				x: timestamp,
				y: cpu.nice
			};

			var system = {
				x: timestamp,
				y: cpu.system
			};
			$scope.cpuChart.data[0].values.push(user);
			$scope.cpuChart.data[1].values.push(nice);
			$scope.cpuChart.data[2].values.push(system);
		};

		var addMemoryData = function(memory, timestamp){
			var usage = {
				x: timestamp,
				y: 100
			};
			$scope.memoryChart.data[0].values.push(usage);
		};

		var addNetworkData = function(network, timestamp){
			
		};

		var addDiskData = function(data, timestamp){
			
		};

		/* end chart code */

		/* socket code */

		var socket = new SockJS(window.location.origin + '/ws');

		socket.onopen = function(){
			console.log('connection open');
		};

		socket.onmessage = function(e){
			counter++;
			var systemInfo = JSON.parse(e.data);
			var time = Date.parse(systemInfo.timestamp);
			addCpuData(systemInfo.cpu, time);
			addMemoryData(systemInfo.memory, counter);
			$scope.$apply();
		};

		socket.onclose = function(){
			console.log('connection closed');
		};

		/* end socket code */
	}
]);
