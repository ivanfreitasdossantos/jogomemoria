(function () {
    'use strict';
    angular.module('app').controller('AuthCtrl', AuthCtrl);

    AuthCtrl.$inject = ['$scope','$window', '$http'];

    function AuthCtrl($scope, $window, $http) {
        var vm = this; 
        vm.nomeJogador = "";
        vm.desabilitarBotao = true;
        vm.listaRankig =[];

        buscarRanking();
        
        vm.redirecionarPagina = function(nomeJogador) {
            $window.location.href = '#/dashboard/'+nomeJogador;   
        }


        function buscarRanking(){
            var requisicao = {
                method: 'GET',
                url: "http://localhost:8080/ranking" ,
                headers: { 'Content-Type': 'application/json' }
            };

            $http(requisicao).then(function (e) {
                if(e.data){
                    vm.listaRankig = e.data;
                }
            });
        }
    }

})();