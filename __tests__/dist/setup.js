"use strict";
exports.__esModule = true;
require("react-native-gesture-handler/jestSetup");
// @ts-ignore
var async_storage_mock_1 = require("@react-native-async-storage/async-storage/jest/async-storage-mock");
jest.mock('react-native-reanimated', function () {
    var Reanimated = require('react-native-reanimated/mock');
    // The mock for `call` immediately calls the callback which is incorrect
    // So we override it with a no-op
    Reanimated["default"].call = function () { };
    return Reanimated;
});
// As of react-native@0.64.X file has moved
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('@react-native-async-storage/async-storage', function () { return async_storage_mock_1["default"]; });
jest.setTimeout(10000);
