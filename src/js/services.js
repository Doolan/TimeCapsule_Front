/**
 * Created by Steven on 2/20/2016.
 */
(function(){
   var app = angular.module('DataManager',[]);

    app.service('PhotoService',['$http', function($http, $filter){
        var self = this;
        self.currentCity="";
        self.currentImages=[];
        self.pastCities=[];
        //Chicago

         var query = function(city, callback){
            if(city !== self.currentCity){
                if(city.currentCity){
                    self.pastCities[self.currentCity] = angular.copy(self.currentImages);
                }
                self.currentCity = city;

                $http({
                   method: 'GET',
                    url: 'http://timecapsulebackend.azurewebsites.net/images/getimagesinlocation',
                    params: {city: city}

                }).then(function(data){
                    self.currentImages = data.data;
                    console.log(data.data);
                    callback(self.currentImages);
                }, function(error){
                    console.log('Failure to load data', error);
                });
            }else {
                callback(self.currentImages);
            }
        };

       self.queryImagesForCity = function(cityName, callback){
           query(cityName, callback);
       }
    }]);
    app.service('CityService',['$http', function($http, $filter) {

        var self = this;
        self.cityArray =[];

        self.query = function(callback) {
           //callback( ["Chicago", "Los Angels", "New York", "Terre Haute"]);
            $http({
                method: 'GET',
                url: 'http://timecapsulebackend.azurewebsites.net/locations/getAllLocationsWithPhotoCount'
            }).then(function (data) {
                self.cityArray = data.data;
                callback(data.data);
            }, function (error) {
                console.log('Failure to load data', error);
            });
        };

        self.getCitesWithData = function(callback)
        {
            self.query(function(data){
                self.array = [];
                data.forEach(function(item){
                   // console.log
                  if(item.Count > 0){
                      self.array.push(item.Name);
                  }
               });
                callback(self.array);
            });
        };

        self.getAllCities = function(callback){
            self.query(function(data){
                self.nameArray = [];
                data.forEach(function(item){
                    self.nameArray.push(item.Name);
                });
            });

        };

    }]);

})();

