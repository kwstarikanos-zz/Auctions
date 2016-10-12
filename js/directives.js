var USERNAME_REGEXP = /^[a-zA-Z0-9]{4,15}$/;
var NAME_REGEXP = /^[A-Z]{1}[a-z]{2,15}$/;
var PASSWORD_REGEXP = /^[A-Z]{1}[a-zA-Z\s]{2,15}$/;

app.directive('usernameValidate', function ($q, $http) {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            elem.on('blur',
                function (evt) {
                    scope.$apply(function () {
                        if (USERNAME_REGEXP.test(elem.val())) {
                            scope.alert = "Check availability...";
                            var req = {
                                method: 'POST',
                                url: 'http://83.212.118.209/test.php',
                                headers: {
                                    'Content-Type': undefined
                                },
                                data: {action: "check-user", username: elem.val()}
                            }
                            $http(req).then(function successCallback(response) {
                                if (response.data.available) {
                                    scope.alert = "Username '" + elem.val() + "' is available!";
                                    ctrl.$setValidity('validate', true);
                                }
                                else {
                                    scope.alert = "Username '" + elem.val() + "' is already taken!";
                                    ctrl.$setValidity('validate', false);
                                }
                            }, function errorCallback(response) {
                                scope.alert = "Something went wrong!";
                                ctrl.$setValidity('validate', false);
                            });
                        }
                    })
                }
            )

        }
    };
});

app.directive('ngUnique', ['$http', function ($http) {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            elem.on('blur', function (evt) {
                scope.$apply(function () {


                    $http({
                        method: 'POST',
                        url: 'backendServices/checkUsername.php',
                        data: {
                            username: elem.val(),
                            dbField: attrs.ngUnique
                        }
                    }).success(function (data, status, headers, config) {
                        ctrl.$setValidity('unique', data.status);
                    });


                });
            })
        }
    }
}]);

app.directive('usernamePattern', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.pattern = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    scope.alert = "Username is required!";
                    return true;
                }
                if (USERNAME_REGEXP.test(viewValue)) {
                    scope.alert = "";
                    return true;
                }
                scope.alert = "Invalid username pattern!";
                return false;
            };
        }
    };
});

app.directive('namePattern', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.pattern = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    scope.alert = "First name is required!";
                    return true;
                }
                if (NAME_REGEXP.test(viewValue)) {
                    scope.alert = "";
                    return true;
                }
                else {

                }
                scope.alert = "Invalid first name pattern!";
                return false;
            };
        }
    };
});


app.directive('toUpperCase', function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            elem.on("blur propertychange keyup paste", function () {
                var value = elem.val().toLowerCase();
                elem.val(value.substring(0, 1).toUpperCase() + value.substring(1));
            });
        }
    };
});

app.directive('passwordPattern', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.pattern = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    scope.alert = "Password is required!";
                    return true;
                }
                if (PASSWORD_REGEXP.test(viewValue)) {
                    scope.alert = "";
                    return true;
                }
                scope.alert = "Invalid password pattern!";
                return false;
            };
        }
    };
});


app.directive('passwordValidate', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.pattern = function (modelValue, viewValue) {
                /*
                 if (ctrl.$isEmpty(modelValue)) {
                 scope.alert = "First name is required!";
                 return true;
                 }
                 if (PASSWORD_REGEXP.test(viewValue)) {
                 scope.alert = "";
                 return true;
                 }
                 scope.alert = "Invalid first name pattern!";
                 return false;
                 */
                return true;
            };
        }
    };
});

app.directive('draggable', ['$document', function ($document) {
    return {
        link: function (scope, element, attr) {
            var startX = 0, startY = 0, x = 0, y = 0;

            element.css({
                position: 'relative',
                //border: '1px solid red',
                //backgroundColor: 'lightgrey',
                //cursor: 'pointer'
            });

            element.on('mousedown', function (event) {
                // Prevent default dragging of selected content
                event.preventDefault();
                startX = event.pageX - x;
                startY = event.pageY - y;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });

            function mousemove(event) {
                y = event.pageY - startY;
                x = event.pageX - startX;
                element.css({
                    top: y + 'px',
                    left: x + 'px'
                });
            }

            function mouseup() {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
            }
        }
    };
}]);
