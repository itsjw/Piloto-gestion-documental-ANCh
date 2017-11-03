'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routerGo = exports.setLoginPage = exports.combineMessage = undefined;

var _qs = require('qs');

var _types = require('../services/types');

var _commons = require('../services/commons');

var _reactRouterRedux = require('react-router-redux');

/**
 * Alberto ECM 
 * (c) 2017-08-20 02:07:41 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

var combineMessage = exports.combineMessage = function combineMessage(bundleId, message) {
  return { type: _types.COMBINE_MESSAGE, bundleId: bundleId, message: message };
};

var setLoginPage = exports.setLoginPage = function setLoginPage(page) {
  return { type: _types.SET_LOGIN_PAGE, page: page };
};

var routerGo = exports.routerGo = function routerGo(uri, qsObj) {
  return (0, _reactRouterRedux.push)((0, _commons.qs)(uri, (0, _qs.stringify)(qsObj)));
};