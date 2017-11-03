'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = render;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render(component, elem, store) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};


    _reactDom2.default.render(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        component
    ), elem);
} /**
   * Alberto ECM 
   * (c) 2017-08-18 01:26:34 DOX, LTDA. http://www.dox.cl
   * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
   * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
   * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
   * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
   * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
   */