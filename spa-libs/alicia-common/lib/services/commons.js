'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.guestLoginPage = exports.qs = exports.isStr = exports.isFunction = exports.isArr = exports.isUndef = exports.createQName = exports.COOKIE_USERNAME = exports.COOKIE_TICKET = exports.COOKIES_OPTS = exports.cookies = exports.isDev = exports.MODULE = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Alberto ECM 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * (c) 2017-08-18 01:58:04 DOX, LTDA. http://www.dox.cl
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _reactCookie = require('react-cookie');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MODULE = exports.MODULE = 'alicia-common';

var isDev = exports.isDev = process.env.NODE_ENV === 'development';

var cookies = exports.cookies = new _reactCookie.Cookies();

var COOKIES_OPTS = exports.COOKIES_OPTS = {
    path: '/',
    domain: window.location.host.match(/(?:[\s.].+)/)
};

var COOKIE_TICKET = exports.COOKIE_TICKET = 'ticket';

var COOKIE_USERNAME = exports.COOKIE_USERNAME = 'username';

var createQName = exports.createQName = function createQName(module, name) {
    return module + '/' + name;
};

var isUndef = exports.isUndef = function isUndef(any) {
    return _ramda2.default.type(any) === 'Undefined';
};

var isArr = exports.isArr = function isArr(any) {
    return _ramda2.default.type(any) === 'Array';
};

var isFunction = exports.isFunction = function isFunction(any) {
    return _ramda2.default.type(any) === 'Function';
};

var isStr = exports.isStr = function isStr(any) {
    return _ramda2.default.type(any) === 'String';
};

/**
 * Agrega el query string al endpoint uri
 * @param  {String} uri URL endpoint 
 * @param  {String} q QueryString
 * @return {String} nueva uri con querystring agregado
 */
var qs = exports.qs = function qs(uri) {
    var q = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    return !q ? uri : uri + (uri.match(/\?/) ? '&' : '?') + q;
};

var guestLoginPage = exports.guestLoginPage = function guestLoginPage() {
    var match = window.location.host.match(/(\w+?(qa|dev){0,1})(\..+\..+)/);
    if (match) {
        var _match = _slicedToArray(match, 4),
            name = _match[1],
            sufix = _match[2],
            subdomain = _match[3];

        return 'accounts' + (sufix ? 'qa' : '') + subdomain;
    }
    return window.location.host + '/login';
};