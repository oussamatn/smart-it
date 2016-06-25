"use strict";

angular.module('app.controllers', [])
  
.controller('acceuilCtrl', function($scope,$http,localStorageService) {
	//https://api.forecast.io/forecast/b39448259f308503ba470607bdbe91c1/37.8267,-122.423
	$scope.weather = {
			temp:null,
			desc:null,
			icon:null,
			city:null,
			humidi:null
	};
	navigator.geolocation.getCurrentPosition(function(position) {
      
	var API = "http://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&appid=30513909b16f5fbaee15ffaa6655555f&lang=fr";
			console.log(API);
			$http.get(API).then(function(res){
				var data  = res.data;
				$scope.weather.temp = data.main.temp -273.15;
				$scope.weather.icon = data.weather[0].id;
				$scope.weather.desc = data.weather[0].main +' : '+ data.weather[0].description;
				$scope.weather.city = data.name;
				$scope.weather.humidi = data.main.humidity;
				console.log(res.data);
			});
    });
	if(localStorageService.get('configLuminosit')){
		if(localStorageService.get('configLuminosit').state == true){
			$scope.Luminosit = "energized";
		}
	}
	if(localStorageService.get('configHumidi')){
		if(localStorageService.get('configHumidi').state == true){
			$scope.Humidi = "calm";
		}

	}
	if(localStorageService.get('configTemp')){
		if(localStorageService.get('configTemp').state == true){
			$scope.Temp = "assertive";
		}
	}
	if(localStorageService.get('configCo2')){
		if(localStorageService.get('configCo2').state == true){
			$scope.co2 = "royal";
		}
	}


})
   
.controller('acceuil2Ctrl', function($scope) {

})
   
.controller('capteursCtrl', function($scope) {

})
   
.controller('paramTresCtrl', function($scope) {

})
   
.controller('nousContacterCtrl', function($scope) {

})
      
.controller('formulaireDeContactCtrl', function($scope) {

})
   
.controller('appareilsCtrl', function($scope,$http,localStorageService) {
	var API,test=0;
	$scope.app = {};
	$scope.app.relais = localStorageService.get('relais');
	$scope.app.gpio17 = localStorageService.get('gpio17');
	$scope.app.gpio4 = localStorageService.get('gpio4');
	$scope.updateRelais = function(){
		localStorageService.set('relais',$scope.app.relais);
		test=0;
		if($scope.app.relais == true ) test= 1;

		$http.get('http://152.77.62.113/ecrire/piface/relais1/'+test);
	};


	$scope.updateGpio17 = function(){
		localStorageService.set('gpio17',$scope.app.gpio17);
		API = 'http://152.77.62.113/ecrire/gpio17/'+$scope.app.gpio17;
		$http.get(API)
		//console.log($scope.app.gpio17);
	};

	$scope.updateGpio4 = function(){
		localStorageService.set('gpio4',$scope.app.gpio17);
		API = 'http://152.77.62.113/ecrire/gpio4/'+$scope.app.gpio17;
		$http.get(API)
		//console.log($scope.app.gpio4);
	};

})
   
.controller('historiqueCtrl', function($scope) {

})
   
.controller('programmesCtrl', function($scope,$http,localStorageService) {
	$scope.config  = {};
	if(localStorageService.get('program')){
		$scope.config = localStorageService.get('program');
	}
	$scope.$watch('config', function() {
	    localStorageService.set('program',$scope.config);


	}, true);

})
   
.controller('crErUnProgrammeCtrl', function($scope) {

})
   
.controller('eclairageProgrammeCtrl', function($scope) {

})
   
.controller('chauffageProgrammeCtrl', function($scope) {

})
   
.controller('vMCProgrammeCtrl', function($scope) {

})
   
.controller('exempleHistoriqueCtrl', function($scope) {

})
   
.controller('actionEnDTailCtrl', function($scope,$http) {

})
   
.controller('tempRatureCtrl', function($scope,$http,localStorageService) {

	var datas=[];
	
	if(localStorageService.get('configTemp')){
		$scope.config = localStorageService.get('configTemp');

	}else{
		$scope.config = {
						frequence:10,
						precision:1,
						state:true
					};
	}
	



	//Start Chart
	Date.prototype.formatMMDDYYYY = function() {
        return (this.getMonth() + 1) +
        "/" +  this.getDate() +
        "/" +  this.getFullYear();
    }

	$http.get("http://152.77.62.113/json/mesures/3").then(function(res){
		datas = res.data;

		var labels = [], data_temp=[],time; 
	    angular.forEach(datas, function(key,value) {
	    	time = parseInt(key[1]);
	    	console.log(time);
	      labels.push(new Date(time).getHours());
	      data_temp.push(parseFloat(key[0]));
	    });

	    //console.log(data_temp,labels);

		var ctx = document.getElementById("TempChart").getContext("2d");
		var data = {
		    labels: labels,
		    datasets: [
		        {
		            label: "Température",
		            fill: false,
		            lineTension: 0.1,
		            backgroundColor: "rgba(75,192,192,0.4)",
		            borderColor: "rgba(75,192,192,1)",
		            borderCapStyle: 'butt',
		            borderDash: [],
		            borderDashOffset: 0.0,
		            borderJoinStyle: 'miter',
		            pointBorderColor: "rgba(75,192,192,1)",
		            pointBackgroundColor: "#fff",
		            pointBorderWidth: 1,
		            pointHoverRadius: 5,
		            pointHoverBackgroundColor: "rgba(75,192,192,1)",
		            pointHoverBorderColor: "rgba(220,220,220,1)",
		            pointHoverBorderWidth: 2,
		            pointRadius: 1,
		            pointHitRadius: 10,
		            data: data_temp,
		        }
		    ]
		};

		var myLineChart = new Chart(ctx, {
		    type: 'line',
		    data: data,
		    skipLabels :10,
		    showXLabels: 10
		    
		});
	});
	//======END Chart=======
	//====configuration
	$scope.updateConfig = function() {
		//console.log($scope.config.precision);
		localStorageService.set('configTemp',$scope.config);
	};

})
   
.controller('humiditCtrl', function($scope,$http,localStorageService) {
	var datas=[];
	if(localStorageService.get('configHumidi')){
		$scope.config = localStorageService.get('configHumidi');

	}else{
		$scope.config = {
						frequence:10,
						precision:1,
						state:true
					};
	}
	



	//Start Chart
	Date.prototype.formatMMDDYYYY = function() {
        return (this.getMonth() + 1) +
        "/" +  this.getDate() +
        "/" +  this.getFullYear();
    }

	$http.get("http://152.77.62.113/json/mesures/2").then(function(res){
		datas = res.data;
		//console.log(datas);
		//traitement de résultat
		var labels = [], data_temp=[];
	    angular.forEach(datas, function(key,value) {
	      labels.push(new Date(key.date).formatMMDDYYYY());
	      data_temp.push(parseFloat(key.temp));
	    });

	    //console.log(data_temp,labels);

		var ctx = document.getElementById("HumidiChart").getContext("2d");
		var data = {
		    labels: labels,
		    datasets: [
		        {
		            label: "Humidité",
		            fill: false,
		            lineTension: 0.1,
		            backgroundColor: "rgba(75,192,192,0.4)",
		            borderColor: "rgba(75,192,192,1)",
		            borderCapStyle: 'butt',
		            borderDash: [],
		            borderDashOffset: 0.0,
		            borderJoinStyle: 'miter',
		            pointBorderColor: "rgba(75,192,192,1)",
		            pointBackgroundColor: "#fff",
		            pointBorderWidth: 1,
		            pointHoverRadius: 5,
		            pointHoverBackgroundColor: "rgba(75,192,192,1)",
		            pointHoverBorderColor: "rgba(220,220,220,1)",
		            pointHoverBorderWidth: 2,
		            pointRadius: 1,
		            pointHitRadius: 10,
		            data: data_temp,
		        }
		    ]
		};

		var myLineChart = new Chart(ctx, {
		    type: 'line',
		    data: data,
		    skipLabels :10,
		    showXLabels: 10
		    
		});
	});
	//======END Chart=======
	//====configuration
	$scope.updateConfig = function() {
		//console.log($scope.config.precision);
		localStorageService.set('configHumidi',$scope.config);
	};
})
   
.controller('luminositCtrl', function($scope,$http,localStorageService) {

	var datas=[];
	if(localStorageService.get('configLuminosit')){
		$scope.config = localStorageService.get('configLuminosit');

	}else{
		$scope.config = {
						frequence:10,
						precision:1,
						state:true
					};
	}
	



	//Start Chart
	Date.prototype.formatMMDDYYYY = function() {
        return (this.getMonth() + 1) +
        "/" +  this.getDate() +
        "/" +  this.getFullYear();
    }

	$http.get("http://152.77.62.113/json/mesures/5").then(function(res){
		datas = res.data;
		//console.log(datas);
		//traitement de résultat
		var labels = [], data_temp=[];
	    angular.forEach(datas, function(key,value) {
	      labels.push(new Date(key.date).formatMMDDYYYY());
	      data_temp.push(parseFloat(key.temp));
	    });

	    //console.log(data_temp,labels);

		var ctx = document.getElementById("LuminositChart").getContext("2d");
		var data = {
		    labels: labels,
		    datasets: [
		        {
		            label: "Luminosité",
		            fill: false,
		            lineTension: 0.1,
		            backgroundColor: "rgba(75,192,192,0.4)",
		            borderColor: "rgba(75,192,192,1)",
		            borderCapStyle: 'butt',
		            borderDash: [],
		            borderDashOffset: 0.0,
		            borderJoinStyle: 'miter',
		            pointBorderColor: "rgba(75,192,192,1)",
		            pointBackgroundColor: "#fff",
		            pointBorderWidth: 1,
		            pointHoverRadius: 5,
		            pointHoverBackgroundColor: "rgba(75,192,192,1)",
		            pointHoverBorderColor: "rgba(220,220,220,1)",
		            pointHoverBorderWidth: 2,
		            pointRadius: 1,
		            pointHitRadius: 10,
		            data: data_temp,
		        }
		    ]
		};

		var myLineChart = new Chart(ctx, {
		    type: 'line',
		    data: data,
		    skipLabels :10,
		    showXLabels: 10
		    
		});
	});
	//======END Chart=======
	//====configuration
	$scope.updateConfig = function() {
		//console.log($scope.config.precision);
		localStorageService.set('configLuminosit',$scope.config);
	};
})
 .controller('cO2Ctrl', function($scope,$http,localStorageService) {
	var datas=[];
	if(localStorageService.get('configCo2')){
		$scope.config = localStorageService.get('configCo2');

	}else{
		$scope.config = {
						frequence:10,
						precision:1,
						state:true
					};
	}
	



	//Start Chart
	Date.prototype.formatMMDDYYYY = function() {
        return (this.getMonth() + 1) +
        "/" +  this.getDate() +
        "/" +  this.getFullYear();
    }

	$http.get("http://152.77.62.113/json/mesures/1").then(function(res){
		datas = res.data;
		//console.log(datas);
		//traitement de résultat
		var labels = [], data_temp=[],time; 
	    angular.forEach(datas, function(key,value) {
	    	time = parseInt(key[1]);
	    	console.log(new Date(time).getHours());
	      labels.push(new Date(time).getHours());
	      data_temp.push(parseFloat(key[0]));
	    });


	    //console.log(data_temp,labels);

		var ctx = document.getElementById("CO2Chart").getContext("2d");
		var data = {
		    labels: labels,
		    datasets: [
		        {
		            label: "Co2",
		            fill: false,
		            lineTension: 0.1,
		            backgroundColor: "rgba(75,192,192,0.4)",
		            borderColor: "rgba(75,192,192,1)",
		            borderCapStyle: 'butt',
		            borderDash: [],
		            borderDashOffset: 0.0,
		            borderJoinStyle: 'miter',
		            pointBorderColor: "rgba(75,192,192,1)",
		            pointBackgroundColor: "#fff",
		            pointBorderWidth: 1,
		            pointHoverRadius: 5,
		            pointHoverBackgroundColor: "rgba(75,192,192,1)",
		            pointHoverBorderColor: "rgba(220,220,220,1)",
		            pointHoverBorderWidth: 2,
		            pointRadius: 1,
		            pointHitRadius: 10,
		            data: data_temp,
		        }
		    ]
		};

		var myLineChart = new Chart(ctx, {
		    type: 'line',
		    data: data,
		    skipLabels :10,
		    showXLabels: 10
		    
		});
	});
	//======END Chart=======
	//====configuration
	$scope.updateConfig = function() {
		//console.log($scope.config.precision);
		localStorageService.set('configCo2',$scope.config);
	};
})