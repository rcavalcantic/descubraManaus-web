angular.module('descubraManaus')
.service('estabelecimentoAPI', function($http){

	var url = 'http://descubramanaus/api/';

/*	url.listarEstabelecimento = function(id){
		return $http.get(url + 'estabelecimento/' + id);
	};

	return url;	*/

	return{
		listarEstabelecimentos : function(){
			return $http.get(url + 'estabelecimentos').then(function(response){
				return response.data;

			});
		},
		listarEstabelecimento : function(id){
			return $http.get(url + 'estabelecimento/' + id).then(function(response){
    			//console.log(response.data);
				return response.data;
			});
		}
	}

});