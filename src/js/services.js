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

                $http({
                   method: 'GET',
                    url: 'mocks/chicago.json'
                }).then(function(data){
                    self.currentImages = data.data;
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
})();

