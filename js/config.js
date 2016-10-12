app.config(function ($locationProvider, $routeProvider) {
    //$locationProvider.hashPrefix('');
    $routeProvider
        .when("/login", {
            templateUrl: "content/forms/login.html",
            controller: "login"
        })
        .when("/register", {
            templateUrl: "content/forms/register.html",
            controller: "register"
        })
        .when("/forgot", {
            templateUrl: "content/forms/forgot.html",
            controller: "forgot"
        })
        .when("/admin", {
        templateUrl: "content/admin-panel/admin.html",
        controller: "admin"
        })
        .when("/requests", {
            templateUrl: "content/admin-panel/requests.html",
            controller: "admin"
        })
        .when("/analytics", {
            templateUrl: "content/admin-panel/analytics.html",
            controller: "admin"
        })
        .otherwise({
            templateUrl: "content/content.html",
            controller: "content"
        });
})
;