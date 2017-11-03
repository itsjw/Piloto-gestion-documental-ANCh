'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nodeRefToUri = exports.user = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var user = exports.user = _ramda2.default.pick(['avatar', 'capabilities', 'email', 'firstName', 'lastName', 'userName', 'organizationId', 'groups']);

/**
 * Convierte un NodeRef en un NodeURi. Esto permite embeber la referencia de forma segura en una uri. Ej. una llamada a un servicio rest de
 * alfresco
 * @param  {string} nodeRef La referencia del nodo en alfresco
 * @return {string}         La referencia como uri del nodo
 */
/**
 * Alberto ECM 
 * (c) 2017-09-23 20:24:09 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

var nodeRefToUri = exports.nodeRefToUri = function nodeRefToUri(nodeRef) {
  return nodeRef.replace(/:\/\//, '/');
};