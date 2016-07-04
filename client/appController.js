angular.module('vaultDragonApp')
.controller('appController',function($scope,$http){

	$scope.res = null;

	$('#timePicker').timepicker({
		'minTime': '12:00am',
    	'maxTime': '12:00pm',
    	'scrollbar' : true
	});

	$( '#datetimepicker' ).datetimepicker({
		changeMonth: true,
                changeYear: true,
                dateFormat: 'mm/dd/yy'
	});


	$scope.createKeyValue = function(data){
		$scope.dataErr = false;
		$scope.dataKeyErr = false;
		$scope.dataValueErr = false;
		if(!data){
			$scope.dataErr = true;
			return;
		}
		if(!data.key){
			$scope.dataKeyErr = true;
			return;	
		}
		if(!data.value){
			$scope.dataValueErr = true;
			return;	
		}
		var d = new Date().getTime();
		console.log(d);
		data.timestamp = d;
		// console.log(data)
		$http.post('/updateKeyValue',data)
		.then(function(res){
			console.log(res);
			$scope.res = res;
		});
	}

	$scope.searchValue = function(search){
		if(!search){
			$scope.searchErr = true;
			return;
		}
		$http.post('/readValue',search)
		.then(function(res){
			$scope.res = res;
			$scope.rows = res.data.rows[0];
		});
	}

	$scope.searchValuePart = function(searchPart){
		if(!searchPart){
			$scope.searchPartErr = true;
			return;
		}
		console.log(searchPart);
		$http.post('/readValue',searchPart)
		.then(function(res){
			$scope.resPart = res;
			$scope.rowsPart = res.data.rows[0];
		});
	}

});