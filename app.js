var app = angular.module("EasyPolicy", ['LocalStorageModule']);
app.controller('MainCtrl', function($scope, SeatService, localStorageService) {
    $scope.mainCtrl = {
        user: {},
        showSeats: false,
        seatsMatrix: SeatService.getAllSeats(),
        seatsBooked: SeatService.getUsersSeats(),
        nameExists: false,
        maxBookLimit: 6,
    };
    $scope.goToSeats = function() {
        if ($scope.mainCtrl.user.name && $scope.mainCtrl.user.seatsNeeded > 0 && $scope.mainCtrl.user.seatsNeeded <= $scope.mainCtrl.maxBookLimit) {
            var nameIdx = checkBookedNameDupes();
            if (nameIdx === -1) {
                $scope.mainCtrl.nameExists = false;
                $scope.mainCtrl.seatsBooked.push({
                    user: $scope.mainCtrl.user.name,
                    seatsNo: $scope.mainCtrl.user.seatsNeeded,
                    seatsId: []
                });
                $scope.mainCtrl.showSeats = true;
            } else {
                $scope.mainCtrl.nameExists = true;
            }
        } else {

            $scope.mainCtrl.showSeats = false;
        }
    };

    function checkBookedNameDupes() {
        for (var i = 0; i < $scope.mainCtrl.seatsBooked.length; i++) {
            if ($scope.mainCtrl.seatsBooked[i].user === $scope.mainCtrl.user.name) {
                return i;
            }
        }
        return -1;
    }
    $scope.onSeatClicked = function(seat, rowIdx, seatIdx) {
        var nameIdx = checkBookedNameDupes();
        if ($scope.mainCtrl.showSeats === true && $scope.mainCtrl.seatsMatrix[rowIdx].seats[seatIdx].booked === false && $scope.mainCtrl.seatsMatrix[rowIdx].seats[seatIdx].status === 'EMPTY') {
            if ($scope.mainCtrl.seatsBooked[nameIdx].seatsId.length < $scope.mainCtrl.seatsBooked[nameIdx].seatsNo) {
                $scope.mainCtrl.seatsBooked[nameIdx].seatsId.push($scope.mainCtrl.seatsMatrix[rowIdx].seats[seatIdx].id);
                $scope.mainCtrl.seatsMatrix[rowIdx].seats[seatIdx].booked = true;
                $scope.mainCtrl.seatsMatrix[rowIdx].seats[seatIdx].status = 'HOLD';
                $scope.mainCtrl.seatsMatrix[rowIdx].seats[seatIdx].bookedBy = $scope.mainCtrl.user.name;
            }
        } else {
            if ($scope.mainCtrl.seatsMatrix[rowIdx].seats[seatIdx].booked === true && $scope.mainCtrl.seatsMatrix[rowIdx].seats[seatIdx].status === 'HOLD') {
                var userSeastIdx = $scope.mainCtrl.seatsBooked[nameIdx].seatsId.indexOf($scope.mainCtrl.seatsMatrix[rowIdx].seats[seatIdx].id);
                if (userSeastIdx > -1) {
                    $scope.mainCtrl.seatsBooked[nameIdx].seatsId.splice(userSeastIdx, 1);
                    $scope.mainCtrl.seatsMatrix[rowIdx].seats[seatIdx].booked = false;
                    $scope.mainCtrl.seatsMatrix[rowIdx].seats[seatIdx].status = 'EMPTY';
                    $scope.mainCtrl.seatsMatrix[rowIdx].seats[seatIdx].bookedBy = '';
                }

            }
        }
    };

    function reserveSeats(userIdx) {
        angular.forEach($scope.mainCtrl.seatsBooked[userIdx].seatsId, function(key, value) {
            angular.forEach($scope.mainCtrl.seatsMatrix, function(rowKey, rowIdx) {
                angular.forEach(rowKey.seats, function(seatKey, seatIdx) {
                    if (key === seatKey.id) {
                        seatKey.booked = true;
                        seatKey.status = 'RESERVED';
                    }
                });
            });
        });
    }

    function resetOnSuccess() {
        $scope.mainCtrl.user.name = undefined;
        $scope.mainCtrl.user.seatsNeeded = 1;
        $scope.mainCtrl.showSeats = false;
        $scope.mainCtrl.nameExists = false;
    }
    $scope.submitSeats = function() {
        var nameIdx = checkBookedNameDupes();
        if ($scope.mainCtrl.seatsBooked[nameIdx].seatsId.length > 0 && $scope.mainCtrl.seatsBooked[nameIdx].seatsId.length === $scope.mainCtrl.user.seatsNeeded) {
            reserveSeats(nameIdx);
            var updateResponse = SeatService.updateSeats($scope.mainCtrl.seatsMatrix, $scope.mainCtrl.seatsBooked);
            $scope.mainCtrl.seatsMatrix = updateResponse.seatsMatrix;
            $scope.mainCtrl.seatsBooked = updateResponse.users;
            resetOnSuccess();
        }
    };
});

app.factory('SeatService', function(localStorageService) {
    var seatsMatrix = [{
        row: 'A',
        seatsCount: 12,
        seats: [{
            id: 'A1',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'A2',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'A3',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'A4',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'A5',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'A6',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'A7',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'A8',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'A9',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'A10',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'A11',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'A12',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }]
    }, {
        row: 'B',
        seatsCount: 12,
        seats: [{
            id: 'B1',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'B2',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'B3',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'B4',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'B5',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'B6',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'B7',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'B8',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'B9',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'B10',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'B11',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'B12',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }]
    }, {
        row: 'C',
        seatsCount: 12,
        seats: [{
            id: 'C1',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'C2',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'C3',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'C4',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'C5',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'C6',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'C7',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'C8',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'C9',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'C10',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'C11',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'C12',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }]
    }, {
        row: 'D',
        seatsCount: 12,
        seats: [{
            id: 'D1',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'D2',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'D3',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'D4',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'D5',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'D6',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'D7',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'D8',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'D9',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'D10',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'D11',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'D12',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }]
    }, {
        row: 'E',
        seatsCount: 12,
        seats: [{
            id: 'E1',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'E2',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'E3',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'E4',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'E5',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'E6',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'E7',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'E8',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'E9',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'E10',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'E11',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'E12',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }]
    }, {
        row: 'F',
        seatsCount: 12,
        seats: [{
            id: 'F1',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'F2',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'F3',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'F4',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'F5',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'F6',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'F7',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'F8',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'F9',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'F10',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'F11',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'F12',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }]
    }, {
        row: 'G',
        seatsCount: 12,
        seats: [{
            id: 'G1',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'G2',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'G3',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'G4',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'G5',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'G6',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'G7',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'G8',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'G9',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'G10',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'G11',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'G12',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }]
    }, {
        row: 'H',
        seatsCount: 12,
        seats: [{
            id: 'H1',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'H2',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'H3',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'H4',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'H5',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'H6',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'H7',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'H8',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'H9',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'H10',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'H11',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'H12',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }]
    }, {
        row: 'I',
        seatsCount: 12,
        seats: [{
            id: 'I1',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'I2',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'I3',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'I4',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'I5',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'I6',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'I7',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'I8',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'I9',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'I10',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'I11',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'I12',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }]
    }, {
        row: 'I',
        seatsCount: 12,
        seats: [{
            id: 'J1',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'J2',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'J3',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'J4',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'J5',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'J6',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'J7',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'J8',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'J9',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'J10',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'J11',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }, {
            id: 'J12',
            booked: false,
            bookedBy: '',
            status: 'EMPTY'
        }]
    }];
    var users = [];
    return {
        getAllSeats: function() {
            var storageData = localStorageService.get('EasyPolicySeatsDB');
            if (storageData && storageData.length > 0) {
                return storageData;
            }
            return seatsMatrix;
        },
        getUsersSeats: function() {
            var storageData = localStorageService.get('EasyPolicyUsersDB');
            if (storageData && storageData.length > 0) {
                return storageData;
            }
            return users;
        },
        updateSeats: function(data, usersData) {
            seatsMatrix = data;
            users = usersData;
            localStorageService.set('EasyPolicySeatsDB', seatsMatrix);
            localStorageService.set('EasyPolicyUsersDB', users);
            return { seatsMatrix: seatsMatrix, users: users };
        }
    }
});
