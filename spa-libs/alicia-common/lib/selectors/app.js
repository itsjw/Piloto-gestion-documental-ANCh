"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Alberto ECM 
 * (c) 2017-09-27 14:58:19 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

var getLoginPage = exports.getLoginPage = function getLoginPage(state) {
  return window.location.protocol + "//" + state.app.loginPage + "?redirect=" + window.location.href;
};