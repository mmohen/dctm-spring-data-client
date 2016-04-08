(function() {
    'use strict';

    angular
        .module('angle')
        .controller('StudentController', Controller);

    Controller.$inject = ['$log', '$scope', '$http'];
    function Controller($log, $scope, $http) {
        // for controllerAs syntax
        // var vm = this;
        $scope.student = {};
        $scope.students = {}
        activate();

        ////////////////

        function activate() {
          $log.log('I\'m a line from custom.js');
        }

        $scope.createStudent = function (){
            $http.post('http://localhost:8080/api/students', $scope.student).success(function(data, status){
              $scope.result = data;
            }).failure(function(data, status){
              $scope.result = data;
            });
        }
        $scope.viewStudent = function (){
            $http.get('http://localhost:8080/api/students').success(function(data){
              $scope.students = data;
            }).error(function(data, status){
              $scope.students = data;
            });
        }

        $scope.viewStudent();
    }
})();
