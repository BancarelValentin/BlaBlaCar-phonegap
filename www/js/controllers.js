angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    //LOGIN
        $scope.loginData = {};

        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        $scope.login = function() {
            $scope.modal.show();
        };

        $scope.doLogin = function() {
            for (var i = $scope.users.length - 1; i >= 0; i--) {
                if ($scope.users[i].login == $scope.loginData.login) {
                    if ($scope.users[i].pass == $scope.loginData.pass) {
                        console.log("connected");
                        $scope.currentUserId = $scope.users[i].id;
                        $scope.closeLogin();
                        return true;
                    }
                    console.log("wrong password");
                    $scope.closeLogin();
                    return false;
                }
            }
            console.log("Unknow login");
            $scope.closeLogin();
            return false;
        };

    //CREATE PROFILE
        $scope.createProfileData = {};

        $ionicModal.fromTemplateUrl('templates/createProfile.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.createProfileModal = modal;
        });

        $scope.showCreateProfile = function() {
            $scope.createProfileModal.show();
        };

        $scope.closeCreateProfile = function() {
            $scope.createProfileModal.hide();
        };

        $scope.createProfile = function() {
            console.log("Before: " + $scope.users.length);
            $scope.users.push({
                id: $scope.users.length,
                login: $scope.createProfileData.login,
                pass: $scope.createProfileData.pass,
                bookings: []
            });
            $scope.currentUserId = $scope.users.length - 1;
            console.log("After: " + $scope.users.length);
            $scope.closeCreateProfile();
        };

    //UPDATE PROFILE
        $scope.updateProfileData = {};

        $ionicModal.fromTemplateUrl('templates/updateProfile.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.updateProfileModal = modal;
        });

        $scope.showUpdateProfile = function() {
            $scope.updateProfileModal.show();
        };

        $scope.closeUpdateProfile = function() {
            $scope.updateProfileModal.hide();
        };

        $scope.updateProfile = function() {
            $scope.users[$scope.currentUserId].login = $scope.updateProfileData.login;
            $scope.users[$scope.currentUserId].pass = $scope.updateProfileData.pass;
            console.log("Updated");
            $scope.closeUpdateProfile();
        };

    //DELETE PROFILE
        $scope.deleteProfileData = {};

        $ionicModal.fromTemplateUrl('templates/deleteProfile.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.deleteProfileModal = modal;
        });

        $scope.showDeleteProfile = function() {
            $scope.deleteProfileModal.show();
        };

        $scope.closeDeleteProfile = function() {
            $scope.deleteProfileModal.hide();
        };

        $scope.deleteProfile = function() {
            console.log("Before: " + $scope.users.length);
            for (var i = $scope.users.length - 1; i >= 0; i--) {
                if ($scope.users[i].id == $scope.currentUserId) {
                    $scope.users.splice(i, 1);
                    $scope.currentUserId = $scope.users[1].id;
                }
            }
            console.log("After: " + $scope.users.length);
            $scope.closeUpdateProfile();
        };

    //ADD ROUTE
        $scope.addRouteData = {};

        $ionicModal.fromTemplateUrl('templates/addRoute.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.addRouteModal = modal;
        });

        $scope.showAddRoute = function() {
            $scope.addRouteModal.show();
        };

        $scope.closeAddRoute = function() {
            $scope.addRouteModal.hide();
        };

        $scope.addRoute = function() {
            console.log("before: " + $scope.routes.length);
            $scope.routes.push({
                id: $scope.routes.length,
                from: $scope.addRouteData.from,
                to: $scope.addRouteData.to,
                date: new Date($scope.addRouteData.on),
                driverId: $scope.currentUserId,
                dateFromNow: function() {
                    return moment(this.date).fromNow();
                }
            });
            alert("toto");
            console.log("after: " + $scope.routes.length);
            $scope.closeAddRoute();
        };


    $scope.routes = [{
        id: 0,
        from: "Clermont",
        to: "Salers",
        date: new Date(),
        driverId: 2,
        dateFromNow: function() {
            return moment(this.date).fromNow();
        }
    }, {
        id: 1,
        from: "Aurillac",
        to: "Mauriac",
        date: new Date(),
        driverId: 1,
        dateFromNow: function() {
            return moment(this.date).fromNow();
        }
    }, {
        id: 2,
        from: "Paris",
        to: "Lyon",
        date: new Date(),
        driverId: 0,
        dateFromNow: function() {
            return moment(this.date).fromNow();
        }
    }, {
        id: 3,
        from: "Beurg",
        to: "Lyon",
        date: new Date(),
        driverId: 1,
        dateFromNow: function() {
            return moment(this.date).fromNow();
        }
    }, {
        id: 4,
        from: "Lyon",
        to: "Moscou",
        date: new Date(),
        driverId: 2,
        dateFromNow: function() {
            return moment(this.date).fromNow();
        }
    }, ];

    $scope.users = [{
        id: 0,
        login: "kevin",
        pass: "test",
        bookings: [2, 3]
    }, {
        id: 1,
        login: "jackie",
        pass: "test",
        bookings: [4, 1, 0]
    }, {
        id: 2,
        login: "pierre",
        pass: "test",
        bookings: [1, 4]
    }];

    $scope.currentUserId = 1;

    $scope.userWithId = function(id) {
        for (var i = $scope.users.length - 1; i >= 0; i--) {
            if ($scope.users[i].id == id) {
                return $scope.users[id];
            }
        }
        return false;
    }

    $scope.routeWithId = function(id) {
        for (var i = $scope.routes.length - 1; i >= 0; i--) {
            if ($scope.routes[i].id == id) {
                return $scope.routes[id];
            }
        }
        return false;
    }

    $scope.routesBookedForUserWithId = function(id) {
        var toReturn = [];
        for (var i = $scope.users.length - 1; i >= 0; i--) {
            if ($scope.users[i].id == id) {
                for (var j = $scope.users[i].bookings.length - 1; j >= 0; j--) {
                    toReturn.push($scope.routes[$scope.users[i].bookings[j]]);
                };
            }
        }
        return toReturn;
    }

    $scope.routesCreatedByUserWithId = function(id) {
        var toReturn = [];
        for (var i = $scope.routes.length - 1; i >= 0; i--) {
            if ($scope.routes[i].driverId == id) {
                toReturn.push($scope.routes[i]);
            }
        }
        return toReturn;
    }

    $scope.book = function(routeId) {
        console.log("before: " + $scope.userWithId($scope.currentUserId).bookings.length);
        $scope.userWithId($scope.currentUserId).bookings.push(routeId);
        console.log("after: " + $scope.userWithId($scope.currentUserId).bookings.length);
    }

    $scope.deleteBookWithRouteNumber = function(routeId) {
        console.log("before: " + $scope.userWithId($scope.currentUserId).bookings.length);
        for (var i = $scope.userWithId($scope.currentUserId).bookings.length - 1; i >= 0; i--) {
            if ($scope.userWithId($scope.currentUserId).bookings[i] == routeId) {
                $scope.userWithId($scope.currentUserId).bookings.splice(i, 1);
            }
        }
        console.log("after: " + $scope.userWithId($scope.currentUserId).bookings.length);
    }

    $scope.deleteRouteNumber = function(routeId) {
        console.log("before: " + $scope.routes.length);
        for (var i = $scope.routes.length - 1; i >= 0; i--) {
            if ($scope.routes[i].id == routeId) {
                $scope.routes.splice(i, 1);
            }
        }
        console.log("after: " + $scope.routes.length);
    }

})