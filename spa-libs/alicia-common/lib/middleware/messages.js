'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _reduxForm = require('redux-form');

var _types = require('../services/types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * Alberto ECM 
                                                                                                                                                                                                     * (c) 2017-09-12 12:56:33 DOX, LTDA. http://www.dox.cl
                                                                                                                                                                                                     * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
                                                                                                                                                                                                     * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
                                                                                                                                                                                                     * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
                                                                                                                                                                                                     * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
                                                                                                                                                                                                     * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
                                                                                                                                                                                                     */

var getRegisteredFields = _ramda2.default.curry(function (form, state) {
    return _ramda2.default.keys(state.form[form].registeredFields);
});

exports.default = function (store) {
    return function (next) {
        return function (action) {

            if (action.type !== _types.COMBINE_MESSAGE) {
                return next(action);
            }

            setTimeout(function () {
                return _ramda2.default.forEach(function (form) {
                    return store.dispatch(_reduxForm.touch.apply(undefined, [form].concat(_toConsumableArray(getRegisteredFields(form, store.getState())))));
                }, (0, _reduxForm.getFormNames)()(store.getState()));
            });

            return next(action);
        };
    };
};