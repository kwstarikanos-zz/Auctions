function forgot($scope) {
    $scope.submit = function () {
        $scope.message = "You type: " + $scope.user;
    }
}
/*Navigation Bar:*/
app.controller("navbar", function ($scope) {
});

/*Content: All content (Loggedin|Logout)*/
app.controller("content", function content($scope, $http) {
    $scope.message = "Message from main controller!";
    $scope.connected = true;

    $http.get("http://www.w3schools.com/angular/customers.php").then(function (response) {
        $scope.names = response.data.records;


    });


});

/*User: Login Form*/
app.controller("login", function login($scope, $http, $location) {
    $scope.submit = function () {
        var req = {
            method: 'POST',
            url: 'http://83.212.118.209/test.php',
            headers: {
                'Content-Type': undefined
            },
            data: {action: "login", user: $scope.data.user, password: $scope.data.password}
        }

        $http(req).then(function successCallback(response) {
            if (response.data.available) {
                $scope.message = "";
                $location.path('/content');
            }
            else {
                $scope.message = "Login fail!";
            }
        }, function errorCallback(response) {
            $scope.message = "Something went wrong!";
        });

    }
});


app.controller("register", function login($scope, $http, $location) {
    $scope.data = {info: {}};
    $scope.submit = function () {

        var req = {
            method: 'POST',
            url: 'http://83.212.118.209/test.php',
            headers: {'Content-Type': undefined },
            data: {action: "register", info: $scope.data.info}
        }

        $http(req).then(function successCallback(response) {
            if (response.data.available) {
                $scope.message = "";

                //Successfull register
                //$location.path('/content');
            }
            else {
                $scope.message = "Register fail!";
            }
        }, function errorCallback(response) {
            $scope.message = "Something went wrong with registration!";
        });

    }
});


/*Content: Admin Panel*/
app.controller("admin", function ($scope) {
    $scope.fName = '';
    $scope.lName = '';
    $scope.passw1 = '';
    $scope.passw2 = '';

    $scope.users = [
        {id: 1, fName: 'Hege', lName: "Pege"},
        {id: 2, fName: 'Kim', lName: "Pim"},
        {id: 3, fName: 'Sal', lName: "Smith"},
        {id: 4, fName: 'Jack', lName: "Jones"},
        {id: 5, fName: 'John', lName: "Doe"},
        {id: 6, fName: 'Peter', lName: "Pan"}
    ];

    $scope.hideform = true;
    $scope.edit = true;
    $scope.error = false;
    $scope.incomplete = false;

    $scope.editUser = function (id) {
        $scope.hideform = false;
        if (id == 'new') {
            $scope.edit = true;
            $scope.incomplete = true;
            $scope.fName = '';
            $scope.lName = '';
        } else {
            $scope.edit = false;
            $scope.fName = $scope.users[id - 1].fName;
            $scope.lName = $scope.users[id - 1].lName;
        }
    };

    $scope.$watch('passw1', function () {
        $scope.test();
    });
    $scope.$watch('passw2', function () {
        $scope.test();
    });
    $scope.$watch('fName', function () {
        $scope.test();
    });
    $scope.$watch('lName', function () {
        $scope.test();
    });

    $scope.test = function () {
        if ($scope.passw1 !== $scope.passw2) {
            $scope.error = true;
        } else {
            $scope.error = false;
        }

        $scope.incomplete = false;

        if ($scope.edit && (!$scope.fName.length || !$scope.lName.length || !$scope.passw1.length || !$scope.passw2.length)) {
            $scope.incomplete = true;
        }
    };
});

/*Register Input Controllers*/
app.controller("registerUsernameController", function ($scope) {
});
app.controller("registerFirstnameController", function ($scope) {
});
app.controller("registerLastnameController", function ($scope) {
});
app.controller("registerPasswordController", function ($scope) {
});
app.controller("registerPasswordRepeatController", function ($scope) {
});
app.controller("registerEmailController", function ($scope) {
});
app.controller("registerEmailRepeatController", function ($scope) {
});
app.controller("registerTelephoneController", function ($scope) {
});
app.controller("registerAddressController", function ($scope) {
});
app.controller("registerVatController", function ($scope) {
});

/*User: Forgot Password*/
app.controller("forgot", forgot);


// Code goes here

