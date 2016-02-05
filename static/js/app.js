
var app = angular.module('Golem', []);

app.controller('GolemController', ['$scope', 'Socket',
	function($scope, Socket){
		
	}
]);

app.service('Socket', [
	function(){
		
		var socket = new SockJS(window.location.origin + '/ws');

		socket.onopen = function(){
			console.log('connection open');
		};

		socket.onmessage = function(e){
			var systemInfo = JSON.parse(e.data)
			console.log(systemInfo);
		};

		socket.onclose = function(){
			console.log('connection closed');
		};

		return {};	
	}
]);


