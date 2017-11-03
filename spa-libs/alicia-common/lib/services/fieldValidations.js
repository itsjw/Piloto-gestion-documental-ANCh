'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Alberto ECM 
 * (c) 2017-08-19 17:55:13 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */
var required = exports.required = function required(value) {
    return value ? undefined : 'validation_required';
};

var regex = function regex(regexp, errorMsg) {
    return function (value) {
        return regexp.test(value) ? undefined : errorMsg;
    };
};

var timeFormat = exports.timeFormat = regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'El formato de la hora debe ser HH:mm. Ex. 00:30, 20:15, 10:30');

var maxLength = exports.maxLength = function maxLength(max) {
    return function (value) {
        return value && value.length > max ? 'Must be ' + max + ' characters or less' : undefined;
    };
};

var maxLength15 = exports.maxLength15 = maxLength(15);

var number = exports.number = function number(value) {
    return value && isNaN(Number(value)) ? 'Must be a number' : undefined;
};

var minValue = exports.minValue = function minValue(min) {
    return function (value) {
        return value && value < min ? 'Must be at least ' + min : undefined;
    };
};

var minValue18 = exports.minValue18 = minValue(18);

var email = exports.email = function email(value) {
    return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;
};

var tooOld = exports.tooOld = function tooOld(value) {
    return value && value > 65 ? 'You might be too old for this' : undefined;
};

var aol = exports.aol = function aol(value) {
    return value && /.+@aol\.com/.test(value) ? 'Really? You still use AOL for your email?' : undefined;
};

var rolname = exports.rolname = regex(/^[A-Z_]+$/, 'validation_rolname');