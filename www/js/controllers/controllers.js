angular.module('descubraManaus')
.controller('welcomeCtrl', function ($scope, $state, $cookieStore) {

    /**
     * SOCIAL LOGIN
     * Facebook and Google
     */
    // FB Login
    $scope.fbLogin = function () {
        FB.login(function (response) {
            if (response.authResponse) {
                getUserInfo();
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'email,user_photos,user_videos'});

        function getUserInfo() {
            // get basic info
            FB.api('/me', function (response) {
                console.log('Facebook Login RESPONSE: ' + angular.toJson(response));
                // get profile picture
                FB.api('/me/picture?type=normal', function (picResponse) {
                    //console.log('Facebook Login RESPONSE: ' + picResponse.data.url);
                    response.imageUrl = picResponse.data.url;
                    // store data to DB - Call to API
                    // Todo
                    // After posting user data to server successfully store user data locally
                    var user = {};
                    user.name = response.name;
                    user.email = response.email;
                    user.gender = response.gender;
                    
                    user.profilePic = picResponse.data.url;
                    $cookieStore.put('userInfo', user);
                    $state.go('app.listagem');

                });
            });
        }
    };
    // END FB Login

    // Google Plus Login
    $scope.gplusLogin = function () {
        var myParams = {
            // Replace client id with yours
            'clientid': '851851085833-m3fria2hqlfef7ekil08na7lckul5hgp.apps.googleusercontent.com',
            'cookiepolicy': 'single_host_origin',
            'callback': loginCallback,
            'approvalprompt': 'force',
            'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
        };
        gapi.auth.signIn(myParams);

        function loginCallback(result) {
            if (result['status']['signed_in']) {
                var request = gapi.client.plus.people.get({'userId': 'me'});
                request.execute(function (resp) {
                  //  console.log('Google+ Login RESPONSE: ' + angular.toJson(resp));
                    var userEmail;
                    if (resp['emails']) {
                        for (var i = 0; i < resp['emails'].length; i++) {
                            if (resp['emails'][i]['type'] == 'account') {
                                userEmail = resp['emails'][i]['value'];
                            }
                        }
                    }
                    // store data to DB
                    var user = {};
                    user.name = resp.displayName;
                    user.email = userEmail;
                    user.gender = resp.gender;
                    user.placesLived = resp.placesLived[0].value;
                    console.log(resp.placesLived);
                    
                    user.profilePic = resp.image.url;
                   // console.log(user);
                    $cookieStore.put('userInfo', user);
                    $state.go('app.listagem');
                });
            }
        }
    };
    // END Google Plus Login

})

// Dashboard/Profile Controller
.controller('dashboardCtrl', function ($scope, $window, $state, $cookieStore) {
    // Set user details
    $scope.user = $cookieStore.get('userInfo');
    
    // Logout user
    $scope.logout = function () {
        $cookieStore.remove("userInfo");
        $state.go('welcome');
        $window.location.reload();
    };
});


