'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('UserCtrl', function ($q, $http, $scope, $upload, $state, $interval, Language, Auth, APP_ROLES, API_IMAGES, $timeout, User, auth, WSAlert, REQUEST_STATUS) {
    $scope.loading = {};    
    $scope.userId = $state.params.userId;
    $scope.myProfile = false;
    $scope.profile = {}; 
    
    $scope.request_status = false;  
    $scope.REQUEST_STATUS = REQUEST_STATUS;  

    /** IMAGE DATA */
    $scope.canUploadImages = false;
    $scope.imageData = false;
    $scope.stateName = $state.current.name;
    $scope.profileImage = false;
    $scope.imageWarning = false;
    $scope.MIN_WIDTH = 600;
    $scope.MIN_HEIGHT = 800; //temporary
    $scope.sizeWarning = "Warning: Picture is too small (minimum size: " + $scope.MIN_WIDTH + " x " + $scope.MIN_HEIGHT + ") px";
    $scope.uploadWarning = "Warning: You don't have permissions to upload an image";
    $scope.cropImage = false;
    /** IMAGE DATA */

    $scope.init = function(){
        $scope.loading.user = true;

        //load user info
        User.getById($scope.userId).then(function(result){
            $scope.loading.user = false;
            $scope.profile = result;

            //check if the user can upload
            $scope.role = Auth.activeRole();
            $scope.canUploadImages = ($scope.role.name == APP_ROLES.ADMIN || $scope.userId == User.data.id) ? true : false;

            //profile image            
            $scope.profileImage = $scope.getImageThumbnail("accreditation");
            $scope.checkExistingDimensions();

            //check if a connection exists between the users
            $scope.loading.request_contact = true;        
            $q.all([User.connections.promise, User.requested.promise]).then(function(){
                $scope.request_status = (User.getRequestStatus($scope.userId));

                $scope.loading.request_contact = false;
            },
            function(error){
                //also on error, finish loading
              $scope.loading.request_contact = false;  
            });            
        },
        function(error){
            WSAlert.danger(error);
            $scope.loading.user = false;
        });

        //get user subscriptions
        User.getUserSubscriptions($scope.userId).then(function(result){
            $scope.profile.subscriptions = result;
        },
        function(error){
            WSAlert.danger("", error);
        })

        //check if user is editable        
        $q.when(User.data.promise).then(function(){
            $scope.myProfile = (User.data.id == $scope.userId) ? true : false;
        },
        function(error){
            WSAlert.danger("", "Could not fetch user edit status: " + error.data.user_msg);
        });
    };

    //$scope.init();

    $scope.requestContact = function(userId){
        $scope.loading.request_contact = true;

        User.requestContact(userId).then(function(){
            WSAlert.success("Contact request sent");
            $scope.loading.request_contact = false;
            $scope.init();
        },
        function(error){
            WSAlert.danger(error);
            $scope.loading.request_contact = false;
        });
    };

    $scope.cancelRequest = function(userId){
        $scope.loading.request_contact = true;

        User.cancelRequestByUserId(userId).then(function(result){
            WSAlert.success("Contact request cancelled");
            $scope.loading.request_contact = false;
            $scope.init();
        },
        function(error){
            WSAlert.danger(error);
            $scope.loading.request_contact = false;
        });
    };

    //after User has loaded
    $q.when(User.data.promise).then(function(){
        $scope.init();
    });  



    /** IMAGE UPLOAD AND CROPPER FUNCTIONS - copied from people TODO: Create separate directives and controllers **/   
    //image upload
    $scope.uploading = false;
    $scope.progress = "0 %";
    $scope.fileReaderSupported = (window.FileReader != null) ? true : false; //FIXME FileAPI support


    $scope.restrictedUploadWarning = function(){
        WSAlert.warning($scope.uploadWarning);
    };


    $scope.onFileSelect = function($files) {
        if($scope.uploading === true) return false;
        else if($scope.canUploadImages === false){
            WSAlert.warning($scope.uploadWarning);
            return false;
        }//check upload rights

        //max filesize
        var max_size = 10 * 1024 * 1024; //10 MB        
        
        //check for filesize
        if($files[0].size > max_size){
            WSAlert.danger("Error: Maximum size for a picture is 10 Mb.");
            return false;
        }

        var min_resolution = {
            width: 600,
            height: 800
        };

        $scope.uploading = true;

        $scope.upload = $upload.upload({
            url: API_IMAGES,
            file: $files[0],
        }).progress(function(evt) {
            var percentage = parseInt(100.0 * evt.loaded / evt.total);
            //if(percentage % 5 == 0) //only every even 5%
            //FIXME - rendering problem with showing the progress - not sure if angular or browser related
            $scope.progress = "Uploading: " + parseInt(100.0 * evt.loaded / evt.total) + " %";
        }).success(function(data, status, headers, config) {                                            
            $scope.progress = "";
            $scope.loading.processing = true;

            //check dimensions
            if(data.width < $scope.MIN_WIDTH || data.height < $scope.MIN_HEIGHT){
                //$scope.imageWarning = true;
                WSAlert.warning($scope.sizeWarning);
                $scope.progress = 0.0;
                $scope.uploading = false;
                return false;
            }
            else{ 
                $scope.imageWarning = false;
                WSAlert.setAllDisplayed();
                WSAlert.clear();
                WSAlert.success("Image uploaded successfully, processing image, please wait...");                
            }

            User.saveImage($scope.profile, data).then(function(image){
                //check that the accreditation file has been generated                
                $scope.profile.image = image;
                
                //wait till image exists
                var checkForFile;
                checkForFile = $interval(function(){                    
                    var img = $scope.getImageThumbnail("accreditation");
                    $scope.checkImage(img, function(){                  
                        $scope.profileImage = img;
                        $scope.uploading = false;
                        $interval.cancel(checkForFile);
                        WSAlert.setAllDisplayed();
                        WSAlert.clear();
                        $scope.loading.processing = false;
                        WSAlert.success("Image uploaded successfully, consider cropping the image?");                
                    });                    
                }, 500); //timeout between checks
            },
            function(error){
                WSAlert.danger(error);
                $scope.uploading = false;
            });
        });
    };     

    $scope.fileExists = function(uri){ //fails on CORS check
        var retval = false;

        var request = new XMLHttpRequest();
        try{
            request.open('HEAD', uri, false);
            request.send();
        }
        catch(err){
            //errors are ok here..
        }

        if(request.status == 200) {
            retval = true;
        } else {
            retval = false;
        }

        return retval;
    };



    //FIXME - should this be in somewhere shared?
    $scope.getImageThumbnail = function(type){
        var retval = false;

        if(typeof $scope.profile.image == 'undefined' || typeof $scope.profile.image.links == 'undefined') return false;
        type = (typeof type == 'undefined') ? "" : "_"+type;
        angular.forEach($scope.profile.image.links, function(val, key){
            if(val.rel == 'alternate'){ 
                retval = val.href + type;
            }
        });
        return retval;
    };

    $scope.checkImage = function(src, success) {
        try{ //only supressess the error in IE, better than nothing..
            var img = new Image();
            img.onload = success; 
            img.src = src;
        }
        catch(e){
            //doNothing - errors are ok
        }
    };

    $scope.reCrop = function(e){    
        e.stopPropagation(); //prevent upload from executing below this element

        if($scope.canUploadImages === false){
            WSAlert.warning($scope.uploadWarning);
            return false;
        }//check upload rights
        
        if(!$scope.profileImage)
            WSAlert.warning("You need to upload a profile image first.");
        else if($scope.profile.imageWarning)
            WSAlert.warning("Image size too small to be re-cropped, please upload a bigger image!");
        else
            $state.go("user.image", {pid: $scope.profile.id});
    };

    $scope.checkExistingDimensions = function(){
        //FIXME remove this in the future when it's clear all pictures are big enough, this is really here only for old pictures, new ones are always big enough
        if(typeof $scope.profile.image == 'undefined' || typeof $scope.profile.image.image_id == 'undefined') return;

        $http.get(API_IMAGES+"/"+$scope.profile.image.image_id+"/"+$scope.profile.image.hash).then(function(data){
            $scope.imageData = data.data;
            if(data.data.width < $scope.MIN_WIDTH || data.data.height < $scope.MIN_HEIGHT)
                $scope.imageWarning = true;            
        });
    };   

    $scope.getEventById = function(eid){
        var retval = false;
        angular.forEach($scope.events.data, function(val, key){
            if(val.id == eid) retval = val;
        });

        return retval;
    };

  })
.directive('requestbtn', function(){
  return {
    restrict: 'E',    
    replace: true,
    templateUrl: 'views/directive.requestbtn.html'    
  }
});
