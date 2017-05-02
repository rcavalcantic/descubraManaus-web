angular.module('descubraManaus')
.controller('detalheCtrl', function($scope, estabelecimentoAPI, $rootScope){
	$scope.mensagem = "Opa";
	estabelecimentoAPI.listarEstabelecimento('0').then(function(dados){
		$scope.estabelecimento = dados;
	});


})