"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
/* eslint-disable react-native/no-inline-styles */
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_elements_1 = require("react-native-elements");
var constants_1 = require("../constants");
var db_1 = require("../db");
var db = new db_1["default"]();
var keyExtractor = function (item, index) { return index.toString(); };
function Home(_a) {
    var _this = this;
    var navigation = _a.navigation;
    var _b = react_1.useState([]), list = _b[0], setList = _b[1];
    react_1.useEffect(function () {
        var unsubscribe = navigation.addListener('focus', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = setList;
                        return [4 /*yield*/, db.fetchData()];
                    case 1:
                        _a.apply(void 0, [_b.sent()]);
                        return [2 /*return*/];
                }
            });
        }); });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    var renderItem = function (_a) {
        var item = _a.item;
        return (react_1["default"].createElement(react_native_elements_1.ListItem, { onPress: function () { return navigation.navigate('Edit Item', { edit: item }); }, bottomDivider: true },
            react_1["default"].createElement(react_native_elements_1.Icon, { name: "category" }),
            react_1["default"].createElement(react_native_elements_1.ListItem.Content, null,
                react_1["default"].createElement(react_native_elements_1.ListItem.Title, null, item.name),
                react_1["default"].createElement(react_native_elements_1.ListItem.Subtitle, null,
                    "Stock: ",
                    item.stock)),
            react_1["default"].createElement(react_native_elements_1.ListItem.Content, null,
                react_1["default"].createElement(react_native_elements_1.ListItem.Title, null,
                    constants_1.NAIRA,
                    react_1["default"].createElement(react_native_elements_1.Text, { h3: true }, item.price))),
            react_1["default"].createElement(react_native_elements_1.ListItem.Chevron, null)));
    };
    return (react_1["default"].createElement(react_native_1.View, { style: { padding: 10 } },
        react_1["default"].createElement(react_native_1.View, { style: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            } },
            react_1["default"].createElement(react_native_elements_1.Text, null, "Touch an item to view"),
            react_1["default"].createElement(react_native_elements_1.Icon, { reverse: true, name: "add", onPress: function () { return navigation.navigate('Create Item'); } })),
        react_1["default"].createElement(react_native_1.FlatList, { style: { marginVertical: 20 }, keyExtractor: keyExtractor, data: list, renderItem: renderItem })));
}
exports["default"] = Home;
