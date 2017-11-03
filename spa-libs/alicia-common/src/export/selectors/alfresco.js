import R from 'ramda'

/**
 * Alberto ECM 
 * (c) 2017-09-24 21:12:51 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */
export const getUserHomeNodeRef = (state, branch = 'app') => state[branch].userHomeNodeRef

/**
 * Determina si un nodo tiene una asociacion
 * @param  {String} name   El nombre de la asociación
 * @param  {DoxNode} node  Nodo al que se le hará la asociación
 * @sig name => node => bool
 * @return {Boolean}       True si contiene la asociación, False en si no
 */
export const hasAssoc = R.curry((name, node) => node && node.assocs && node.assocs[name])

/**
 * Obtiene la lista de nodos asociados a un nodo
 * @param  {String} name   El nombre de la asociación
 * @param  {DoxNode} node  Nodo al que se le obtendrán los nodos asociados
 * @sig    name => node => array
 * @return {Array}         Lisda de nodos asociados. En caso de no existir la asociación se devuelve una lista vacía
 */
export const getNodeAssoc = R.curry((name, node) => hasAssoc(name, node) ? node.assocs[name] :[])

/**
 * Obtiene los nodos asociados por la assoc cm:contains
 * @param  {DoxNode} node  Nodo al que se le obtendrán los nodos hijos
 * @return {Array}         Lisda de nodos asociados. En caso de no existir la asociación se devuelve una lista vacía
 */
export const getChildren = getNodeAssoc('cm:contains')

/**
 * Obtiene el noderef de un nodo
 * @param  {DoxNode} node Nodo al que se le obtendrá el nodeRef
 * @return {String}       NodeRef String con el formato <storeProtocol>://<storeId>/<nodeUUID>. 
 *                        Ex: workspace://SpacesStore/257aeabc-1574-4585-ae5a-6cc81174812c
 */
export const getNodeRef = ({ properties }) => 
    `${properties['sys:store-protocol']}://${properties['sys:store-identifier']}/${properties['sys:node-uuid']}`