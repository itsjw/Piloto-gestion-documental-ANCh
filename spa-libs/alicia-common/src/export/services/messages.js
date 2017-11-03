/**
 * Alberto ECM 
 * (c) 2017-08-19 19:02:18 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

// import R from 'ramda'
import { store } from './store'
import { combineMessage } from '../actions'
export const browserLng = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage
export const lngWithoutRegionCode = browserLng.toLowerCase().split(/[_-]+/)[0]

const path = p => `./i18n/${p}.json`
const createMessages = m => store.messages = { ...store.messages, ...m }

export const combineMessages = fn => fn(path(lngWithoutRegionCode))
    .then(({ bundleId, message }) => store.dispatch(combineMessage(bundleId, message)))
    .catch(err => console.error(err))