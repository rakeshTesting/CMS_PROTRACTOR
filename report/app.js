var app = angular.module('reportingApp', []);

//<editor-fold desc="global helpers">

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};
var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
    } else if (getSpec(item.description) !== getSpec(prevItem.description)) {
        item.displaySpecName = true;
    }
};

var getParent = function (str) {
    var arr = str.split('|');
    str = "";
    for (var i = arr.length - 2; i > 0; i--) {
        str += arr[i] + " > ";
    }
    return str.slice(0, -3);
};

var getShortDescription = function (str) {
    return str.split('|')[0];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};

var defaultSortFunction = function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) {
        return -1;
    }
    else if (a.sessionId > b.sessionId) {
        return 1;
    }

    if (a.timestamp < b.timestamp) {
        return -1;
    }
    else if (a.timestamp > b.timestamp) {
        return 1;
    }

    return 0;
};


//</editor-fold>

app.controller('ScreenshotReportController', function ($scope, $http) {
    var that = this;
    var clientDefaults = {};

    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, clientDefaults.searchSettings || {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = clientDefaults.columnSettings; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        } else {
            this.inlineScreenshots = false;
        }
    }

    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        return getParent(str);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };

    this.getShortDescription = function (str) {
        return getShortDescription(str);
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };

    var results = [
    {
        "description": "user login in to the application|@Functionality test cases",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "sessionId": "d9b6be9ba807f2d261e8915830c3eaca",
        "instanceId": 21282,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "chrome-extension://invalid/ - Failed to load resource: net::ERR_FAILED",
                "timestamp": 1568196911314,
                "type": ""
            }
        ],
        "screenShotFile": "images/00fd00d4-00f6-006f-0009-00d2008c00c8.png",
        "timestamp": 1568196905879,
        "duration": 31941
    },
    {
        "description": "when we enter @ symbol user list must highlight|@Functionality test cases",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "sessionId": "d9b6be9ba807f2d261e8915830c3eaca",
        "instanceId": 21282,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/00ea00c2-00fa-00aa-00f1-00d8001a008e.png",
        "timestamp": 1568196938245,
        "duration": 15891
    },
    {
        "description": "user can search for praticular user|@Functionality test cases",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "sessionId": "d9b6be9ba807f2d261e8915830c3eaca",
        "instanceId": 21282,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/005000ff-0013-00d3-0062-00c9001f0019.png",
        "timestamp": 1568196954554,
        "duration": 5681
    },
    {
        "description": "user can select searched user|@Functionality test cases",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "sessionId": "d9b6be9ba807f2d261e8915830c3eaca",
        "instanceId": 21282,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/#/feature/message/nagshaku 0:5 Uncaught SyntaxError: Unexpected token )",
                "timestamp": 1568196965864,
                "type": ""
            }
        ],
        "screenShotFile": "images/00f100c1-00bd-00a9-002f-007d00330029.png",
        "timestamp": 1568196960601,
        "duration": 10437
    },
    {
        "description": "user can send @ message to other user|@Functionality test cases",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "sessionId": "d9b6be9ba807f2d261e8915830c3eaca",
        "instanceId": 21282,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images/00ac0071-0041-00c2-0083-005f00d000d7.png",
        "timestamp": 1568196971381,
        "duration": 5667
    },
    {
        "description": "user when we click @ message then user profile pop up will display|@Functionality test cases",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "sessionId": "d9b6be9ba807f2d261e8915830c3eaca",
        "instanceId": 21282,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "ng:///ChatModule/ProfilePopupComponent.ngfactory.js 55:76 \"ERROR\"",
                "timestamp": 1568196977869,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "ng:///ChatModule/ProfilePopupComponent.ngfactory.js 55:76 \"ERROR CONTEXT\"",
                "timestamp": 1568196977871,
                "type": ""
            }
        ],
        "screenShotFile": "images/00d6004a-0070-005e-0082-00ee004200f0.png",
        "timestamp": 1568196977409,
        "duration": 5637
    },
    {
        "description": "login user can open the praticular user profile|@Functionality test cases",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "sessionId": "d9b6be9ba807f2d261e8915830c3eaca",
        "instanceId": 21282,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/memberportal-modules-features-features-module.js 6722:71 Uncaught TypeError: Cannot read property 'long_name' of undefined",
                "timestamp": 1568196989040,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/memberportal-modules-features-features-module.js 6722:71 Uncaught TypeError: Cannot read property 'long_name' of undefined",
                "timestamp": 1568196989040,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/vendor.js 109154 WebSocket connection to 'wss://chat.dev.zapoj.com/socket.io/?auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjhiNDMyY2YwNjE4NmM0ZTNiZGYwMiIsImlhdCI6MTU2ODE5NjkzNCwiZXhwIjoxNTY4MjQwMTM0fQ.krGG3yS4A8ba8znsv86_2Ff-BsdgFVNM3kLIfSldULI&EIO=3&transport=websocket' failed: Error during WebSocket handshake: Unexpected response code: 502",
                "timestamp": 1568196994467,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/vendor.js 109154 WebSocket connection to 'wss://chat.dev.zapoj.com/socket.io/?auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjhiNDMyY2YwNjE4NmM0ZTNiZGYwMiIsImlhdCI6MTU2ODE5NjkzNCwiZXhwIjoxNTY4MjQwMTM0fQ.krGG3yS4A8ba8znsv86_2Ff-BsdgFVNM3kLIfSldULI&EIO=3&transport=websocket' failed: Error during WebSocket handshake: Unexpected response code: 502",
                "timestamp": 1568196994467,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/vendor.js 109154 WebSocket connection to 'wss://chat.dev.zapoj.com/socket.io/?auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjhiNDMyY2YwNjE4NmM0ZTNiZGYwMiIsImlhdCI6MTU2ODE5NjkzNCwiZXhwIjoxNTY4MjQwMTM0fQ.krGG3yS4A8ba8znsv86_2Ff-BsdgFVNM3kLIfSldULI&EIO=3&transport=websocket' failed: Error during WebSocket handshake: Unexpected response code: 502",
                "timestamp": 1568196994467,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/vendor.js 109154 WebSocket connection to 'wss://chat.dev.zapoj.com/socket.io/?auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjhiNDMyY2YwNjE4NmM0ZTNiZGYwMiIsImlhdCI6MTU2ODE5NjkzNCwiZXhwIjoxNTY4MjQwMTM0fQ.krGG3yS4A8ba8znsv86_2Ff-BsdgFVNM3kLIfSldULI&EIO=3&transport=websocket' failed: Error during WebSocket handshake: Unexpected response code: 502",
                "timestamp": 1568196994477,
                "type": ""
            }
        ],
        "screenShotFile": "images/00a30058-00ca-008c-003a-00c4006200ec.png",
        "timestamp": 1568196983489,
        "duration": 10965
    },
    {
        "description": "login user can open the praticular user chat page|@Functionality test cases",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "sessionId": "d9b6be9ba807f2d261e8915830c3eaca",
        "instanceId": 21282,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "ng:///ChatModule/ProfilePopupComponent.ngfactory.js 55:76 \"ERROR\"",
                "timestamp": 1568196995210,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "ng:///ChatModule/ProfilePopupComponent.ngfactory.js 55:76 \"ERROR CONTEXT\"",
                "timestamp": 1568196995211,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/vendor.js 109154 WebSocket connection to 'wss://chat.dev.zapoj.com/socket.io/?auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjhiNDMyY2YwNjE4NmM0ZTNiZGYwMiIsImlhdCI6MTU2ODE5NjkzNCwiZXhwIjoxNTY4MjQwMTM0fQ.krGG3yS4A8ba8znsv86_2Ff-BsdgFVNM3kLIfSldULI&EIO=3&transport=websocket' failed: Error during WebSocket handshake: Unexpected response code: 502",
                "timestamp": 1568197000270,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/vendor.js 109154 WebSocket connection to 'wss://chat.dev.zapoj.com/socket.io/?auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjhiNDMyY2YwNjE4NmM0ZTNiZGYwMiIsImlhdCI6MTU2ODE5NjkzNCwiZXhwIjoxNTY4MjQwMTM0fQ.krGG3yS4A8ba8znsv86_2Ff-BsdgFVNM3kLIfSldULI&EIO=3&transport=websocket' failed: Error during WebSocket handshake: Unexpected response code: 502",
                "timestamp": 1568197000270,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/vendor.js 109154 WebSocket connection to 'wss://chat.dev.zapoj.com/socket.io/?auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjhiNDMyY2YwNjE4NmM0ZTNiZGYwMiIsImlhdCI6MTU2ODE5NjkzNCwiZXhwIjoxNTY4MjQwMTM0fQ.krGG3yS4A8ba8znsv86_2Ff-BsdgFVNM3kLIfSldULI&EIO=3&transport=websocket' failed: Error during WebSocket handshake: Unexpected response code: 502",
                "timestamp": 1568197000271,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/vendor.js 109154 WebSocket connection to 'wss://chat.dev.zapoj.com/socket.io/?auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjhiNDMyY2YwNjE4NmM0ZTNiZGYwMiIsImlhdCI6MTU2ODE5NjkzNCwiZXhwIjoxNTY4MjQwMTM0fQ.krGG3yS4A8ba8znsv86_2Ff-BsdgFVNM3kLIfSldULI&EIO=3&transport=websocket' failed: Error during WebSocket handshake: Unexpected response code: 502",
                "timestamp": 1568197000271,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/vendor.js 109277 WebSocket connection to 'wss://chat.dev.zapoj.com/socket.io/?auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjhiNDMyY2YwNjE4NmM0ZTNiZGYwMiIsImlhdCI6MTU2ODE5NjkzNCwiZXhwIjoxNTY4MjQwMTM0fQ.krGG3yS4A8ba8znsv86_2Ff-BsdgFVNM3kLIfSldULI&EIO=3&transport=websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1568197000271,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/vendor.js 109154 WebSocket connection to 'wss://chat.dev.zapoj.com/socket.io/?auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjhiNDMyY2YwNjE4NmM0ZTNiZGYwMiIsImlhdCI6MTU2ODE5NjkzNCwiZXhwIjoxNTY4MjQwMTM0fQ.krGG3yS4A8ba8znsv86_2Ff-BsdgFVNM3kLIfSldULI&EIO=3&transport=websocket' failed: Error during WebSocket handshake: Unexpected response code: 502",
                "timestamp": 1568197000272,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://chat.dev.zapoj.com/chatHistory - Failed to load resource: the server responded with a status of 502 (Bad Gateway)",
                "timestamp": 1568197005757,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://chat.dev.zapoj.com/chatHistory - Failed to load resource: the server responded with a status of 502 (Bad Gateway)",
                "timestamp": 1568197005757,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/#/feature/message/jyoti - Access to XMLHttpRequest at 'https://chat.dev.zapoj.com/chatHistory' from origin 'https://d1qbzrr1cuc5zg.cloudfront.net' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.",
                "timestamp": 1568197005757,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://chat.dev.zapoj.com/getPinnedMsg/o20190828092008798 - Failed to load resource: the server responded with a status of 502 (Bad Gateway)",
                "timestamp": 1568197005757,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://chat.dev.zapoj.com/getPinnedMsg/o20190828092008798 - Failed to load resource: the server responded with a status of 502 (Bad Gateway)",
                "timestamp": 1568197005757,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/#/feature/message/jyoti - Access to XMLHttpRequest at 'https://chat.dev.zapoj.com/getPinnedMsg/o20190828092008798' from origin 'https://d1qbzrr1cuc5zg.cloudfront.net' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.",
                "timestamp": 1568197005757,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://chat.dev.zapoj.com/getPinnedMsg/o20190828092008798 - Failed to load resource: the server responded with a status of 502 (Bad Gateway)",
                "timestamp": 1568197005757,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://chat.dev.zapoj.com/getPinnedMsg/o20190828092008798 - Failed to load resource: the server responded with a status of 502 (Bad Gateway)",
                "timestamp": 1568197005757,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/#/feature/message/jyoti - Access to XMLHttpRequest at 'https://chat.dev.zapoj.com/getPinnedMsg/o20190828092008798' from origin 'https://d1qbzrr1cuc5zg.cloudfront.net' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.",
                "timestamp": 1568197005758,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/vendor.js 61259:18 \"ERROR\"",
                "timestamp": 1568197005758,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/vendor.js 61259:18 \"ERROR\"",
                "timestamp": 1568197005758,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/vendor.js 61259:18 \"ERROR\"",
                "timestamp": 1568197005758,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/vendor.js 109154 WebSocket connection to 'wss://chat.dev.zapoj.com/socket.io/?auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjhiNDMyY2YwNjE4NmM0ZTNiZGYwMiIsImlhdCI6MTU2ODE5NjkzNCwiZXhwIjoxNTY4MjQwMTM0fQ.krGG3yS4A8ba8znsv86_2Ff-BsdgFVNM3kLIfSldULI&EIO=3&transport=websocket' failed: Error during WebSocket handshake: Unexpected response code: 502",
                "timestamp": 1568197005758,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/vendor.js 109154 WebSocket connection to 'wss://chat.dev.zapoj.com/socket.io/?auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjhiNDMyY2YwNjE4NmM0ZTNiZGYwMiIsImlhdCI6MTU2ODE5NjkzNCwiZXhwIjoxNTY4MjQwMTM0fQ.krGG3yS4A8ba8znsv86_2Ff-BsdgFVNM3kLIfSldULI&EIO=3&transport=websocket' failed: Error during WebSocket handshake: Unexpected response code: 502",
                "timestamp": 1568197005758,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/vendor.js 109277 WebSocket connection to 'wss://chat.dev.zapoj.com/socket.io/?auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjhiNDMyY2YwNjE4NmM0ZTNiZGYwMiIsImlhdCI6MTU2ODE5NjkzNCwiZXhwIjoxNTY4MjQwMTM0fQ.krGG3yS4A8ba8znsv86_2Ff-BsdgFVNM3kLIfSldULI&EIO=3&transport=websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1568197005759,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/vendor.js 109154 WebSocket connection to 'wss://chat.dev.zapoj.com/socket.io/?auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjhiNDMyY2YwNjE4NmM0ZTNiZGYwMiIsImlhdCI6MTU2ODE5NjkzNCwiZXhwIjoxNTY4MjQwMTM0fQ.krGG3yS4A8ba8znsv86_2Ff-BsdgFVNM3kLIfSldULI&EIO=3&transport=websocket' failed: Error during WebSocket handshake: Unexpected response code: 502",
                "timestamp": 1568197005759,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/vendor.js 109154 WebSocket connection to 'wss://chat.dev.zapoj.com/socket.io/?auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjhiNDMyY2YwNjE4NmM0ZTNiZGYwMiIsImlhdCI6MTU2ODE5NjkzNCwiZXhwIjoxNTY4MjQwMTM0fQ.krGG3yS4A8ba8znsv86_2Ff-BsdgFVNM3kLIfSldULI&EIO=3&transport=websocket' failed: Error during WebSocket handshake: Unexpected response code: 502",
                "timestamp": 1568197005941,
                "type": ""
            }
        ],
        "screenShotFile": "images/007200b3-0000-0058-0026-001a003f00ba.png",
        "timestamp": 1568196994842,
        "duration": 11202
    },
    {
        "description": "login user can logout the application|@Functionality test cases",
        "passed": true,
        "pending": false,
        "os": "Linux",
        "sessionId": "d9b6be9ba807f2d261e8915830c3eaca",
        "instanceId": 21282,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/vendor.js 109154 WebSocket connection to 'wss://chat.dev.zapoj.com/socket.io/?auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjhiNDMyY2YwNjE4NmM0ZTNiZGYwMiIsImlhdCI6MTU2ODE5NjkzNCwiZXhwIjoxNTY4MjQwMTM0fQ.krGG3yS4A8ba8znsv86_2Ff-BsdgFVNM3kLIfSldULI&EIO=3&transport=websocket' failed: Error during WebSocket handshake: Unexpected response code: 502",
                "timestamp": 1568197012083,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/vendor.js 109154 WebSocket connection to 'wss://chat.dev.zapoj.com/socket.io/?auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjhiNDMyY2YwNjE4NmM0ZTNiZGYwMiIsImlhdCI6MTU2ODE5NjkzNCwiZXhwIjoxNTY4MjQwMTM0fQ.krGG3yS4A8ba8znsv86_2Ff-BsdgFVNM3kLIfSldULI&EIO=3&transport=websocket' failed: Error during WebSocket handshake: Unexpected response code: 502",
                "timestamp": 1568197012084,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/vendor.js 109277 WebSocket connection to 'wss://chat.dev.zapoj.com/socket.io/?auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjhiNDMyY2YwNjE4NmM0ZTNiZGYwMiIsImlhdCI6MTU2ODE5NjkzNCwiZXhwIjoxNTY4MjQwMTM0fQ.krGG3yS4A8ba8znsv86_2Ff-BsdgFVNM3kLIfSldULI&EIO=3&transport=websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1568197012084,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/vendor.js 109154 WebSocket connection to 'wss://chat.dev.zapoj.com/socket.io/?auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNjhiNDMyY2YwNjE4NmM0ZTNiZGYwMiIsImlhdCI6MTU2ODE5NjkzNCwiZXhwIjoxNTY4MjQwMTM0fQ.krGG3yS4A8ba8znsv86_2Ff-BsdgFVNM3kLIfSldULI&EIO=3&transport=websocket' failed: Error during WebSocket handshake: Unexpected response code: 502",
                "timestamp": 1568197012084,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://d1qbzrr1cuc5zg.cloudfront.net/assets/js/RTCMultiConnection.js 292:24 \"webrtc socket.io connection is closed\"",
                "timestamp": 1568197012680,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "chrome-extension://invalid/ - Failed to load resource: net::ERR_FAILED",
                "timestamp": 1568197013826,
                "type": ""
            }
        ],
        "screenShotFile": "images/007a00d9-00d1-00f7-0055-009c00bd0071.png",
        "timestamp": 1568197006478,
        "duration": 18381
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.loadResultsViaAjax = function () {

        $http({
            url: './combined.json',
            method: 'GET'
        }).then(function (response) {
                var data = null;
                if (response && response.data) {
                    if (typeof response.data === 'object') {
                        data = response.data;
                    } else if (response.data[0] === '"') { //detect super escaped file (from circular json)
                        data = CircularJSON.parse(response.data); //the file is escaped in a weird way (with circular json)
                    }
                    else
                    {
                        data = JSON.parse(response.data);
                    }
                }
                if (data) {
                    results = data;
                    that.sortSpecs();
                }
            },
            function (error) {
                console.error(error);
            });
    };


    if (clientDefaults.useAjax) {
        this.loadResultsViaAjax();
    } else {
        this.sortSpecs();
    }


});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        if (!items) {
            return filtered; // to avoid crashing in where results might be empty
        }
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            var isHit = false; //is set to true if any of the search criteria matched
            countLogMessages(item); // modifies item contents

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    isHit = true;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    isHit = true;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    isHit = true;
                }
            }
            if (isHit) {
                checkIfShouldDisplaySpecName(prevItem, item);

                filtered.push(item);
                prevItem = item;
            }
        }

        return filtered;
    };
});

