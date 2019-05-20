(function () {
    'use strict';
    angular.module('app').controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$scope','$window', '$timeout','$routeParams','$http','$interval'];

    function DashboardCtrl($scope, $window, $timeout, $routeParams, $http, $interval) {
       
        var vm = this; 
        vm.nomeJogador = $routeParams.nomeJogador;
        vm.cartaUm ="";
        vm.cartaDois = "";
        vm.rodadas = 0 ;
        vm.erros = 0;
        vm.acertos = 0;
        vm.contadorCartas = 0;
        vm.bloquearClique = false; 
        vm.terminou = false;


        vm.imagens = shuffle([
                        {"id": 1,  "icon" :"fa fa-whatsapp fa-4x", "virada": false },
                        {"id": 2, "icon" :"fa fa-amazon fa-4x " , "virada": false },
                        {"id": 3, "icon" :"fa fa-android fa-4x",  "virada": false },
                        {"id": 4, "icon" :"fa fa-apple fa-4x" ,   "virada": false },
                        {"id": 5, "icon" :"fa fa-bluetooth fa-4x","virada": false },
                        {"id": 6, "icon" :"fa fa-google fa-4x",   "virada": false },
                        {"id": 7, "icon" :"fa fa-gitlab fa-4x",   "virada": false },
                        {"id": 8, "icon" :"fa fa-youtube fa-4x",  "virada": false },
                        {"id": 9, "icon" :"fa fa-wordpress fa-4x","virada": false },
                        {"id": 10, "icon" :"fa fa-twitter fa-4x",  "virada": false }, 
                        {"id": 1,  "icon" :"fa fa-whatsapp fa-4x", "virada": false },
                        {"id": 2, "icon" :"fa fa-amazon fa-4x " , "virada": false },
                        {"id": 3, "icon" :"fa fa-android fa-4x",  "virada": false },
                        {"id": 4, "icon" :"fa fa-apple fa-4x" ,   "virada": false },
                        {"id": 5, "icon" :"fa fa-bluetooth fa-4x","virada": false },
                        {"id": 6, "icon" :"fa fa-google fa-4x",   "virada": false },
                        {"id": 7, "icon" :"fa fa-gitlab fa-4x",   "virada": false },
                        {"id": 8, "icon" :"fa fa-youtube fa-4x",  "virada": false },
                        {"id": 9, "icon" :"fa fa-wordpress fa-4x","virada": false },
                        {"id": 10, "icon" :"fa fa-twitter fa-4x",  "virada": false }, 
                        
                        {"id": 11, "icon" :"fa fa-microphone fa-4x", "virada": false },
                        {"id": 12, "icon" :"ffa fa-music fa-4x " , "virada": false },
                        {"id": 13, "icon" :"fa fa-moon-o fa-4x",  "virada": false },
                        {"id": 14, "icon" :"fa fa-paper-plane fa-4x" ,   "virada": false },
                        {"id": 15, "icon" :"fa fa fa-motorcycle fa-4x","virada": false },
                        {"id": 16, "icon" :"fa fa-graduation-cap fa-4x",   "virada": false },
                        {"id": 17, "icon" :"fa fa-paint-brush fa-4x",   "virada": false },
                        {"id": 18, "icon" :"fa  fa-snowflake-o fa-4x",  "virada": false },
                        {"id": 19, "icon" :"fa fa-signal fa-4x","virada": false },
                        {"id": 20, "icon" :"fa fa-futbol-o fa-4x",  "virada": false }, 
                        
                        {"id": 11,  "icon" :"fa fa-microphone fa-4x", "virada": false },
                        {"id": 12, "icon" :"ffa fa-music fa-4x " , "virada": false },
                        {"id": 13, "icon" :"fa fa-moon-o fa-4x",  "virada": false },
                        {"id": 14, "icon" :"fa fa-paper-plane fa-4x" ,   "virada": false },
                        {"id": 15, "icon" :"fa fa fa-motorcycle fa-4x","virada": false },
                        {"id": 16, "icon" :"fa fa-graduation-cap fa-4x",   "virada": false },
                        {"id": 17, "icon" :"fa fa-paint-brush fa-4x",   "virada": false },
                        {"id": 18, "icon" :"fa  fa-snowflake-o fa-4x",  "virada": false },
                        {"id": 19, "icon" :"fa fa-signal fa-4x","virada": false },
                        {"id": 20, "icon" :"fa fa-futbol-o  fa-4x",  "virada": false }, 
                    ]);

       

        vm.virarCarta = function(carta){ 
            if(vm.cartaUm &&  vm.cartaDois){
                return
            }   

            carta.virada = true; 

            if(!vm.cartaUm){
                vm.cartaUm = carta;
                return;  
            } 

            vm.cartaDois = carta;
            vm.bloquearClique = true;

            verificarCartasIguais() ? cartasIguais() :  cartasDiferentes();

        }                
    
        function verificarCartasIguais(){
            return vm.cartaUm.id == vm.cartaDois.id;
        }

        function cartasIguais(){
            
            vm.acertos = vm.acertos +1;
            if(vm.acertos == 20){ vm.verificarFimDeJogo()}
            vm.bloquearClique = false; 
            limparValoresCartas();
        }

        function cartasDiferentes(){
           
            $timeout(resetarCartas, 700);
             vm.bloquearClique = false;            
        }
        
        function resetarCartas(){
            vm.erros = vm.erros +1;
            vm.cartaUm.virada = false; 
            vm.cartaDois.virada = false; 
            limparValoresCartas()
            
        }

        function limparValoresCartas(){
            vm.cartaUm = "";
            vm.cartaDois = "";
        }
       
        vm.verificarFimDeJogo = function(){
            vm.imagens.forEach(function(el,i){
                if(el.virada){
                    vm.contadorCartas = vm.contadorCartas + 1;
                }
            }); 
            
            if(vm.contadorCartas == 40){
                cadastrarRanking();
            }
            
        }


        function cadastrarRanking() {
            var rest = {
                method: 'POST',
                url: "http://localhost:8080/ranking",
                headers: { 'Content-Type': 'application/json' },
                data: { data: { nomeJogador: vm.nomeJogador, 
                                acertos:  vm.acertos, 
                                erros:  vm.erros} 
                        }
            }
            $http(rest).then(function (e) {
                
                vm.terminou = true;
            });
        }

        vm.redirecionarPagina = function() {
            $window.location.href = '#/signin';   
        }

        /**
         * Shuffles array in place.
         * @param {Array} a items An array containing the items.
         */
        function shuffle(a) {
            var j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
            return a;
        }

    };

})();
