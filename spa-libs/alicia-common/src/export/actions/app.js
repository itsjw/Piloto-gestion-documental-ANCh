/**
 * Alberto ECM 
 * (c) 2017-08-20 02:07:41 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import { stringify } from 'qs'
import { COMBINE_MESSAGE, SET_LOGIN_PAGE } from '../services/types'
import { qs } from '../services/commons'
import { push  } from 'react-router-redux'

export const combineMessage = (bundleId, message) => ({ type: COMBINE_MESSAGE, bundleId, message })

export const setLoginPage = page => ({ type: SET_LOGIN_PAGE, page })

export const routerGo = (uri, qsObj) => push(qs(uri, stringify(qsObj)))