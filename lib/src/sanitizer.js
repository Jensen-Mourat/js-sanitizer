"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizer = void 0;
var ban_list_1 = require("./ban-list");
var banSet = new Set(ban_list_1.BAN_LIST);
var keywordSet = new Set(ban_list_1.KEYWORDS);
var sanitizer = function (fn, options) {
    var throwError = function (err) {
        if (options.failSilently) {
            console.warn(err);
        }
        else {
            throw new Error(err);
        }
    };
    var preventString = function (s, err) {
        for (var i = 0; i < s.length; i++) {
            if (fn.includes(s[i])) {
                throwError(err + s[i]);
            }
        }
    };
    var expandBanList = function (expand, throwOnKeywordError) {
        for (var i = 0; i < expand.length; i++) {
            if (!keywordSet.has(expand[i])) {
                banSet.add(expand[i]);
            }
            else {
                if (throwOnKeywordError)
                    throwError('cannot ban a javascript keyword');
            }
        }
    };
    if (options === null || options === void 0 ? void 0 : options.expandBanList) {
        expandBanList(options === null || options === void 0 ? void 0 : options.expandBanList, true);
    }
    if (options === null || options === void 0 ? void 0 : options.preventKeyWord) {
        preventString(options.preventKeyWord, 'A forbidden keyword present: ');
    }
    if (options === null || options === void 0 ? void 0 : options.preventString) {
        preventString(options.preventString, 'A forbidden keyword present: ');
    }
    if (options === null || options === void 0 ? void 0 : options.sanitizeWindowProperties) {
        if (window) {
            var keys = Object.keys(window);
            expandBanList(keys);
        }
        else {
            throwError('window is undefined');
        }
    }
    var banList = Array.from(banSet);
    var _fn = "return function(" + banList.join(',') + "){" + fn + "}";
    return new Function('', _fn).apply({}, banList);
};
exports.sanitizer = sanitizer;
