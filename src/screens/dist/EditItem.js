"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var react_native_2 = require("react-native");
var react_native_elements_1 = require("react-native-elements");
var db_1 = require("../db");
var db = new db_1["default"]();
var itemZero = {
    name: '',
    price: 0,
    stock: 0,
    description: ''
};
function EditItem(_a) {
    var _this = this;
    var route = _a.route, navigation = _a.navigation;
    var edit = route.params.edit;
    var _b = react_1.useState(edit || itemZero), item = _b[0], setItem = _b[1];
    var _c = react_1.useState([]), unqueItems = _c[0], setUniqueItems = _c[1];
    var _d = react_1.useState({}), errors = _d[0], setErrors = _d[1];
    var _e = react_1.useState([false, '']), notice = _e[0], setNotice = _e[1];
    var _f = react_1.useState(false), deleteNotice = _f[0], setDeleteNotice = _f[1];
    react_1.useEffect(function () {
        function init() {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = setUniqueItems;
                            return [4 /*yield*/, db.getInvertoryNames()];
                        case 1:
                            _a.apply(void 0, [_b.sent()]);
                            return [2 /*return*/];
                    }
                });
            });
        }
        init();
    }, []);
    var nameIsUnique = function (v) {
        return unqueItems.find(function (s) { return s === v; }) ? false : true;
    };
    var submitForm = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // validate the data
                    if (item.name.trim() === '' ||
                        (nameIsUnique(item.name) === false && item.name !== edit.name)) {
                        return [2 /*return*/, setErrors(__assign(__assign({}, errors), { name: true }))];
                    }
                    if (item.stock <= 0 && isNaN(item.stock) === false) {
                        return [2 /*return*/, setErrors(__assign(__assign({}, errors), { stock: true }))];
                    }
                    if (item.price <= 0 && isNaN(item.price) === false) {
                        return [2 /*return*/, setErrors(__assign(__assign({}, errors), { price: true }))];
                    }
                    if (item.description.trim() === '' ||
                        item.description.split(' ').length < 3) {
                        return [2 /*return*/, setErrors(__assign(__assign({}, errors), { description: true }))];
                    }
                    return [4 /*yield*/, db.update(item)];
                case 1:
                    if ((_a.sent()) === true) {
                        setNotice([true, 'Inventory item updated']);
                    }
                    else {
                        setNotice([true, 'Failed to update inventory item']);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(react_native_2.View, { style: { padding: 10 } },
        react_1["default"].createElement(react_native_elements_1.Text, { style: { marginBottom: 20, paddingLeft: 10 }, h4: true },
            "Edit ",
            edit.name),
        react_1["default"].createElement(react_native_elements_1.Input, { value: item.name, inputContainerStyle: styles.inputCs, placeholder: "Name", onChangeText: function (v) {
                setItem(__assign(__assign({}, item), { name: v }));
                setErrors(__assign(__assign({}, errors), { name: false }));
            }, errorMessage: errors.name ? 'Name is required' : '' }),
        react_1["default"].createElement(react_native_elements_1.Input, { value: String(item.stock || ''), inputContainerStyle: styles.inputCs, placeholder: "Total stock", keyboardType: "numeric", onChangeText: function (v) {
                setItem(__assign(__assign({}, item), { stock: Number(v) }));
                setErrors(__assign(__assign({}, errors), { stock: false }));
            }, errorMessage: errors.stock ? 'Total stock is required and should be a number' : '' }),
        react_1["default"].createElement(react_native_elements_1.Input, { value: String(item.price || ''), inputContainerStyle: styles.inputCs, placeholder: "Price", keyboardType: "numeric", onChangeText: function (v) {
                setItem(__assign(__assign({}, item), { price: Number(v) }));
                setErrors(__assign(__assign({}, errors), { price: false }));
            }, errorMessage: errors.price ? 'Price is required and should be a number' : '' }),
        react_1["default"].createElement(react_native_elements_1.Input, { value: item.description, inputContainerStyle: styles.inputCs, inputStyle: styles.multilineText, placeholder: "Description", multiline: true, numberOfLines: 10, onChangeText: function (v) {
                setItem(__assign(__assign({}, item), { description: v }));
                setErrors(__assign(__assign({}, errors), { description: false }));
            }, errorMessage: errors.description
                ? 'Description is required and must be atleast 3 words'
                : '' }),
        react_1["default"].createElement(react_native_elements_1.Button, { onPress: submitForm, title: "Submit", containerStyle: { marginHorizontal: 10, marginBottom: 10 } }),
        react_1["default"].createElement(react_native_elements_1.Button, { onPress: function () { return setDeleteNotice(true); }, title: "Delete", containerStyle: { marginHorizontal: 10 }, buttonStyle: { backgroundColor: '#b90000' } }),
        react_1["default"].createElement(react_native_elements_1.Dialog, { isVisible: notice[0], onBackdropPress: function () { return setNotice([false, '']); } },
            react_1["default"].createElement(react_native_elements_1.Dialog.Title, { title: "Alert" }),
            react_1["default"].createElement(react_native_elements_1.Text, null, notice[1]),
            react_1["default"].createElement(react_native_elements_1.Dialog.Actions, null,
                react_1["default"].createElement(react_native_elements_1.Dialog.Button, { title: "Dismiss", onPress: function () { return setNotice([false, '']); } }),
                react_1["default"].createElement(react_native_elements_1.Dialog.Button, { title: "Home", onPress: function () { return navigation.navigate('Inventory'); } }))),
        react_1["default"].createElement(react_native_elements_1.Dialog, { isVisible: deleteNotice, onBackdropPress: function () { return setDeleteNotice(false); } },
            react_1["default"].createElement(react_native_elements_1.Dialog.Title, { title: "Are you sure?" }),
            react_1["default"].createElement(react_native_elements_1.Text, null,
                "You are about to delete \"",
                item.name || edit.name,
                "\""),
            react_1["default"].createElement(react_native_elements_1.Dialog.Actions, null,
                react_1["default"].createElement(react_native_elements_1.Dialog.Button, { title: "Proceed", onPress: function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    setDeleteNotice(false);
                                    return [4 /*yield*/, db.remove(edit)];
                                case 1:
                                    if (_a.sent()) {
                                        navigation.navigate('Inventory');
                                    }
                                    else {
                                        setNotice([true, 'Failed to delete']);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); } }),
                react_1["default"].createElement(react_native_elements_1.Dialog.Button, { title: "Cancel", onPress: function () { return setDeleteNotice(false); } })))));
}
exports["default"] = EditItem;
var styles = react_native_1.StyleSheet.create({
    inputCs: {
        borderBottomWidth: 1,
        borderWidth: 1,
        borderRadius: 8
    },
    multilineText: {
        textAlignVertical: 'top'
    }
});
