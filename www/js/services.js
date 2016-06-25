angular.module('app.services', [])

.factory('Sensors', [function($rootScope, $http){
	var Sensors = {};
	Sensors.data = {};

	var URL = "http://127.0.0.1:5000";
	
	Sensors.getSensorData = function(id){
		var APIURL = "/mesures/"+id;
		$http.get(APIURL)
            .success(function(data) {
                Sensors.data.id = data;
            });

        return Sensors.data;
	};

}])

.factory('Weather', [function($rootScope, $http){
	var Weather = {};
	Weather.data = {};

	Weather.getWeatherData = function(){
		navigator.geolocation.getCurrentPosition(function(position) {

		var API = "http://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&appid=30513909b16f5fbaee15ffaa6655555f&langfr";
			console.log(API);
			$http.get(API)
	            .success(function(data) {
	                Weather.data = data;
	                console.log(data);
	            });
	    });



        return Weather.data;
	};
	return Weather;

}])


.service('BlankService', [function(){

}]);

