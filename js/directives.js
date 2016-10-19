var USERNAME_REGEXP = /^[a-zA-Z0-9]{4,15}$/;
var NAME_REGEXP = /^[A-Z]{1}[a-z]{2,15}$/;
var PASSWORD_REGEXP = /^[1-9]{4,4}$/;

app.directive('usernameValidator', function($http, $q) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$asyncValidators.unique = function(modelValue, viewValue) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: 'http://83.212.118.209/test.php',
                    headers: {'Content-Type': undefined},
                    data: {action: "check-user", username: viewValue}
                }).then(function successCallback(response) {
                    if (response.data.available)
                        deferred.resolve('Available!');
                    else
                        deferred.reject('Username isn\'t available!');

                }, function errorCallback(response) {
                    return deferred.reject('Oops... something went wrong!');
                });

                scope.promise=deferred.promise.$$state;
                return deferred.promise;

            };
        }
    };
});

app.directive('usernamePattern', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.pattern = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }
                if (USERNAME_REGEXP.test(viewValue)) {
                    scope.alert = "";
                    return true;
                }
                return false;
            };
        }
    };
});


/*Directive to check if password input matches with pattern
* https://blog.brunoscopelliti.com/angularjs-directive-to-check-that-passwords-match/*/
app.directive('passwordPattern', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.pattern = function (modelValue, viewValue) {
                if (!ctrl.$isEmpty(modelValue) && PASSWORD_REGEXP.test(viewValue)) {
                    return true;
                }
                return false;
            };
        }
    };
});


/*Directive to check that passwords match*/
app.directive('passwordValidate', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.match = function (modelValue, viewValue) {
                var firstPassword = '#' + attrs.passwordValidate;
                if (elm.val() !== $(firstPassword).val()) {
                    return false;
                }
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

app.directive('domDirective', function () {
    return {
        restrict: 'A',
        link: function ($scope, element, attrs) {
            element.on('click', function () {
                element.html('You clicked me!');
            });
            element.on('mouseenter', function () {
                element.css('background-color', 'yellow');
            });
            element.on('mouseleave', function () {
                element.css('background-color', 'white');
            });
        }
    };
});