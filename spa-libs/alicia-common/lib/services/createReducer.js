'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Alberto ECM 
                                                                                                                                                                                                                                                                   * (c) 2017-08-18 02:16:16 DOX, LTDA. http://www.dox.cl
                                                                                                                                                                                                                                                                   * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
                                                                                                                                                                                                                                                                   * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
                                                                                                                                                                                                                                                                   * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
                                                                                                                                                                                                                                                                   * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
                                                                                                                                                                                                                                                                   * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
                                                                                                                                                                                                                                                                   */

exports.default = createReducer;

var _redux = require('redux');

var _app = require('../reducers/app');

var _app2 = _interopRequireDefault(_app);

var _notifications = require('../reducers/notifications');

var _notifications2 = _interopRequireDefault(_notifications);

var _reactRouterRedux = require('react-router-redux');

var _reduxForm = require('redux-form');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createReducer(asyncReducers) {
  return (0, _redux.combineReducers)(_extends({ app: _app2.default, notifications: _notifications2.default, form: _reduxForm.reducer, routing: _reactRouterRedux.routerReducer }, asyncReducers));
}