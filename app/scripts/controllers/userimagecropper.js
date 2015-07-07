'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:UserimagecropperCtrl
 * @description
 * # UserimagecropperCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('UserImageCropperCtrl', function ($scope, User, $timeout, API_IMAGES, $q, $interval, $http, $stateParams, $state, $translate, WSAlert, Language) {
    $scope.selectedLanguage = Language.selectedLanguage;    
    $scope.tmp_user = {};
    $scope.cropImage = false;
    $scope.loading.crop = false;
    $scope.loading.base64 = false;

    //clear possible alerts
    WSAlert.setAllDisplayed();
    WSAlert.clear();



     //load base64 image
    $scope.getBase64Image = function(image_id, thumbnail_hash){
      var deferred = $q.defer();

      $http({
      	url: API_IMAGES + "/" + image_id + "/" + thumbnail_hash + "/base64", 
      	transformResponse: function(data){ return data; }, //custom method to return raw data
      	method: "GET"
      }).then(function(data){ 
        deferred.resolve(data.data);
      },
      function(error){
        deferred.reject(error);
      });

      return deferred.promise;
    };
      
    //wait until person object has been loaded and image crop parameters have loaded
    var interval = $interval(function(){          
      if(typeof $scope.profile.image != 'undefined' && typeof $scope.imageData != 'undefined'){            	
        $scope.loading.base64 = true;
        $scope.getBase64Image($scope.profile.image.image_id, $scope.profile.image.hash).then(function(result){
          $scope.data = {
            x: $scope.imageData.crop_x,
            y: $scope.imageData.crop_y,
            width: $scope.imageData.crop_width,
            height: $scope.imageData.crop_height,
            rotate: 0
          };

          $scope.cropImage = result;
          $scope.loading.base64 = false;
        });        
        $interval.cancel(interval);
      }
    }, 100);

    $scope.cancel = function(){
      //redir
      $state.go('user.profile', {userId: $scope.profile.id});
    };

    $scope.saveCrop = function(){
      $scope.loading.crop = true;
      WSAlert.setAllDisplayed();
      WSAlert.clear();

      //convert rotate (example: -90 --> 270 degrees)
      if($scope.data.rotate < 0) $scope.data.rotate += 360;

      //data
      var cropParams = {
        'crop_x': parseInt($scope.data.x),
        'crop_y': parseInt($scope.data.y),
        'crop_width': parseInt($scope.data.width),
        'crop_height': parseInt($scope.data.height)
        //'rotate': $scope.data.rotate, //TODO enable rotate once in images
      };

      //save
      $http.post(API_IMAGES + "/" + $scope.profile.image.image_id + "/" + $scope.profile.image.hash + "/clone", cropParams).then(function(data){
        $scope.cropImage = false;

        User.saveImage($scope.profile, data.data).then(function(image){
          //check that the accreditation file has been generated                
          $scope.profile.image = image;
          WSAlert.success("Image cropped, processing thumbnails, please wait...");
          //wait till image exists
          var checkForFile;
          checkForFile = $interval(function(){                    
              var img = $scope.$parent.getImageThumbnail("accreditation");
              $scope.$parent.checkImage(img, function(){                  
                  $scope.$parent.profileImage = img;
                  $interval.cancel(checkForFile);
                  WSAlert.setAllDisplayed();
                  WSAlert.clear();
                  WSAlert.success("Image cropped successfully!");
                  //$scope.loading.crop = false; //no need to reset this - keep hidden until state has transitioned
                  $state.go("user.profile", {userId: $scope.profile.id});
                  delete $scope.form.image;
              });                    
          }, 500); //timeout between checks
        });        
      });
    };

    $scope.rotate = function(degrees){
      $scope.data.rotate += degrees;      
    };
});
