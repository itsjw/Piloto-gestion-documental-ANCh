'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterRedux = require('react-router-redux');

var _store = require('../services/store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  return _react2.default.createElement(_reactRouterRedux.ConnectedRouter, { history: _store.history, children: props.children });
}; /**
    * Alberto ECM 
    * (c) 2017-09-27 17:01:37 DOX, LTDA. http://www.dox.cl
    * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
    * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
    * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
    * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
    * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
    */