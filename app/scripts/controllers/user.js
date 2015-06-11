'use strict';

/**
 * @ngdoc function
 * @name connectApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the connectApp
 */
angular.module('connectApp')
  .controller('UserCtrl', function ($scope, $state, Language, APP_ROLES) {
    $scope.loading = {
        initial: true,
        basic_info: false,
        processing: false
    };

    $scope.canUploadImages = false;
    //TODO FIXME Important - divide logic into separate directives, templates and controllers - too much in one file
    $scope.imageData = false;
    $scope.stateName = $state.current.name;
    $scope.selectedLanguage = Language.selectedLanguage;
    $scope.title = "Loading, please wait...";
    $scope.title2 = "...";
    $scope.person = {};
    $scope.person_copy = {};
    $scope.app_roles = APP_ROLES;
    $scope.role = false;
    $scope.profileImage = false;
    $scope.imageWarning = false;
    $scope.MIN_WIDTH = 600;
    $scope.MIN_HEIGHT = 800;
    $scope.sizeWarning = "Warning: Picture is too small (minimum size: " + $scope.MIN_WIDTH + " x " + $scope.MIN_HEIGHT + ") px";
    $scope.uploadWarning = "Notice: Please contact your Technical Delegate if you wish to change your picture.";
    $scope.cropImage = false;

    //init scope variables
    $scope.form = {};
    $scope.countries = {};
    $scope.titles = {};
    $scope.phoneTypes = {};

    //select2
    $scope.select2Config = {
        allowClear : true
    }; 

    //show actions (save-reset..) on these states
    var actionStates = ['person.expertqualifications'];
    $scope.showActions = false;
    $scope.showActions = (actionStates.indexOf($state.current.name) > -1) ? true : false;
    
    //if($state.current.name == 'person.profile') $scope.showActions = true;
    //else($state.current.name == 'person.profile') $scope.showActions = true;

    

    //get countries
    // $http({method: "GET", url: API_PEOPLE + "/countries"})
    // .success(function(data, status, headers, config){
    //     $scope.countries = data.countries;
    // });    

    $scope.refresh = function(){
        //get the data from service
        // var promises = [];
        // promises.push(Person.countries());
        // promises.push(Person.titles());
       

        
        // $q.all(promises).then(function(data){
        //     $scope.role = Auth.activeRole();
        //     $scope.countries = data[0];
           
        //     $scope.sectors = {};

        //     //check upload rights            
            
        //     $scope.canUploadImages = ($scope.role.name == APP_ROLES.ADMIN || $scope.role.name == APP_ROLES.MANAGER) ? true : false;
            
        //     //sectors
        //     angular.forEach($scope.skills, function(val, key){
        //         if(typeof val.sector != 'undefined'){
        //             //if(typeof $scope.sectors[val.sector.id] == 'undefined') //might be faster to just assign multiple times
        //                 //add event to sector data
        //                 val.sector['event'] = val.event;
        //                 $scope.sectors[val.sector.id] = val.sector;
        //         }
        //     });
    
        //     $scope.title = $scope.person.first_name + " " + $scope.person.last_name;
        //     $scope.person_copy = angular.copy($scope.person);

        //     angular.forEach($scope.loading, function(val, key){
        //         $scope.loading[key] = false;
        //     });

        //     //profile image            
        //     $scope.profileImage = $scope.getImageThumbnail("accreditation");
        //     $scope.checkExistingDimensions();
            
        // });
    }//refresh

    $scope.refresh();




    //image upload
    $scope.uploading = false;
    $scope.progress = "0 %";
    $scope.fileReaderSupported = (window.FileReader != null) ? true : false; //FIXME FileAPI support
    $scope.person = [];


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

            Person.saveImage($scope.person, data).then(function(image){
                //check that the accreditation file has been generated                
                $scope.person.image = image;
                
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
                        //$state.go("person.image", {pid: $scope.person.id});
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

        if(typeof $scope.person.image.links == 'undefined') return false;
        type = (typeof type == 'undefined') ? "" : "_"+type;
        angular.forEach($scope.person.image.links, function(val, key){
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
        else if($scope.person.imageWarning)
            WSAlert.warning("Image size too small to be re-cropped, please upload a bigger image!");
        else
            $state.go("person.image", {pid: $scope.person.id});
    };

    $scope.checkExistingDimensions = function(){
        //FIXME remove this in the future when it's clear all pictures are big enough, this is really here only for old pictures, new ones are always big enough
        if(typeof $scope.person.image.image_id == 'undefined') return;

        $http.get(API_IMAGES+"/"+$scope.person.image.image_id+"/"+$scope.person.image.thumbnail_hash).then(function(data){
            $scope.imageData = data.data;
            if(data.data.width < $scope.MIN_WIDTH || data.data.height < $scope.MIN_HEIGHT)
                $scope.imageWarning = true;            
        });
    };        

    

    $scope.getNetworkClass = function(network){
        if(network.network.name == "Twitter") return "label-info";
        else if(network.network.name == "Youtube") return "label-danger";
        else if(network.network.name == "LinkedIn") return "label-info";
        else if(network.network.name == "Google+") return "label-danger";
        else if(network.network.name == "Facebook") return "label-primary";
        else if(network.network.name == "Vine") return "label-success";
        else return "label-info";
    };

  });
