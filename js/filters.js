app.filter('prettyJSON', function () {
    return function(json) { return angular.toJson(json, true); }
});