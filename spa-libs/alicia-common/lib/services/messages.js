'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineMessages = exports.lngWithoutRegionCode = exports.browserLng = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Alberto ECM 
                                                                                                                                                                                                                                                                   * (c) 2017-08-19 19:02:18 DOX, LTDA. http://www.dox.cl
                                                                                                                                                                                                                                                                   * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
                                                                                                                                                                                                                                                                   * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
                                                                                                                                                                                                                                                                   * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
                                                                                                                                                                                                                                                                   * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
                                                                                                                                                                                                                                                                   * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
                                                                                                                                                                                                                                                                   */

// import R from 'ramda'


var _store = require('./store');

var _actions = require('../actions');

var browserLng = exports.browserLng = navigator.languages && navigator.languages[0] || navigator.language || navigator.userLanguage;
var lngWithoutRegionCode = exports.lngWithoutRegionCode = browserLng.toLowerCase().split(/[_-]+/)[0];

var path = function path(p) {
  return './i18n/' + p + '.json';
};
var createMessages = function createMessages(m) {
  return _store.store.messages = _extends({}, _store.store.messages, m);
};

var combineMessages = exports.combineMessages = function combineMessages(fn) {
  return fn(path(lngWithoutRegionCode)).then(function (_ref) {
    var bundleId = _ref.bundleId,
        message = _ref.message;
    return _store.store.dispatch((0, _actions.combineMessage)(bundleId, message));
  }).catch(function (err) {
    return console.error(err);
  });
};