'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRequest = exports.jsonPost = exports.CALL_API = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Alberto ECM 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * (c) 2017-09-12 10:44:42 DOX, LTDA. http://www.dox.cl
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _commons = require('../services/commons');

var _types = require('../services/types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CALL_API = exports.CALL_API = Symbol('Call API');

var jsonPost = exports.jsonPost = function jsonPost(body) {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
};

var getRequest = exports.getRequest = { method: 'GET' };

var MIMETYPE_JSON = 'application/json';

/**
 * [description]
 * @param  {[type]} resp [description]
 * @return {[type]}      [description]
 */
var isJson = function isJson(r) {
  return r.headers.get('Content-Type').startsWith(MIMETYPE_JSON);
};

/**
 * [description]
 * @param  {[type]} R [description]
 * @return {[type]}   [description]
 */
var body = function body(r) {
  return isJson(r) ? r.json() : r.text();
};
/*
const authFilter = (O) => {
    
    if(O.status.code === 401){
        go(page_login())
    }

    return Promise.reject(O)
}
 */
var raise = function raise(b, r) {
  throw r.status === 401 ? _types.UNAUTHORIZED : b;
};

var doFetch = function doFetch(uri, conf) {
  return fetch(uri, conf).then(function (r) {
    return body(r).then(function (b) {
      return r.ok ? b : raise(b, r);
    });
  });
};

var actionWith = _ramda2.default.pickBy(function (val, key) {
  return key !== CALL_API;
});

var pickNext = function pickNext(next, action) {
  return !action[CALL_API] ? function () {
    return next(action);
  } : callApi(action[CALL_API]);
};

var callApi = function callApi(_ref) {
  var _ref$types = _slicedToArray(_ref.types, 3),
      req = _ref$types[0],
      res = _ref$types[1],
      fail = _ref$types[2],
      endpoint = _ref.endpoint,
      reduxInfo = _ref.reduxInfo,
      conf = _objectWithoutProperties(_ref, ['types', 'endpoint', 'reduxInfo']);

  return function (store, next) {
    return !next({ type: req, conf: conf, reduxInfo: reduxInfo }) || doFetch(endpoint, conf).then(function (resp) {
      return next({ resp: resp, type: res, reduxInfo: reduxInfo });
    }).catch(function (err) {
      return Promise.reject(store.dispatch({ err: err, reduxInfo: reduxInfo, type: err === _types.UNAUTHORIZED ? _types.UNAUTHORIZED : fail }));
    });
  };
};

exports.default = function (store) {
  return function (next) {
    return function (action) {
      return pickNext(next, action)(store, next);
    };
  };
};