/**
 * Alberto ECM 
 * (c) 2017-08-18 02:12:18 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import { createQName, MODULE } from './commons'

export const TEST_ACTION = createQName(MODULE, 'TEST_ACTION')
export const COMBINE_MESSAGE = createQName(MODULE, 'COMBINE_MESSAGE')
export const SET_LOGIN_PAGE = createQName(MODULE, 'SET_LOGIN_PAGE')

// fetchLogin
export const LOGIN_REQUEST = createQName(MODULE, 'LOGIN_REQUEST')
export const LOGIN_RESPONSE = createQName(MODULE, 'LOGIN_RESPONSE')
export const LOGIN_ERROR = createQName(MODULE, 'LOGIN_ERROR')

// fetchUser
export const USER_REQUEST = createQName(MODULE, 'USER_REQUEST')
export const USER_RESPONSE = createQName(MODULE, 'USER_RESPONSE')
export const USER_ERROR = createQName(MODULE, 'USER_ERROR')

// fetchUserSites
export const USER_SITES_REQUEST = createQName(MODULE, 'USER_SITES_REQUEST')
export const USER_SITES_RESPONSE = createQName(MODULE, 'USER_SITES_RESPONSE')
export const USER_SITES_ERROR = createQName(MODULE, 'USER_SITES_ERROR')

//fetchSlingShotUserHome
export const SLINGSHOT_USERHOME_REQUEST = createQName(MODULE, 'SLINGSHOT_USERHOME_REQUEST')
export const SLINGSHOT_USERHOME_RESPONSE = createQName(MODULE, 'SLINGSHOT_USERHOME_RESPONSE')
export const SLINGSHOT_USERHOME_ERROR = createQName(MODULE, 'SLINGSHOT_USERHOME_ERROR')

//findNode
export const FIND_NODE_REQUEST = createQName(MODULE, 'FIND_NODE_REQUEST')
export const FIND_NODE_RESPONSE = createQName(MODULE, 'FIND_NODE_RESPONSE')
export const FIND_NODE_ERROR = createQName(MODULE, 'FIND_NODE_ERROR')

//findUserHomeNode
export const FIND_USERHOME_NODE_REQUEST = createQName(MODULE, 'FIND_USERHOME_NODE_REQUEST')
export const FIND_USERHOME_NODE_RESPONSE = createQName(MODULE, 'FIND_USERHOME_NODE_RESPONSE')
export const FIND_USERHOME_NODE_ERROR = createQName(MODULE, 'FIND_USERHOME_NODE_ERROR')

//classes
export const CLASSES_REQUEST = createQName(MODULE, 'CLASSES_REQUEST')
export const CLASSES_RESPONSE = createQName(MODULE, 'CLASSES_RESPONSE')
export const CLASSES_ERROR = createQName(MODULE, 'CLASSES_ERROR')

//unauthorized 
export const UNAUTHORIZED = createQName(MODULE, 'UNAUTHORIZED')

export const SLINGSHOT_SEARCH_REQUEST = createQName(MODULE, 'SLINGSHOT_SEARCH_REQUEST')
export const SLINGSHOT_SEARCH_RESPONSE = createQName(MODULE, 'SLINGSHOT_SEARCH_RESPONSE')
export const SLINGSHOT_SEARCH_ERROR = createQName(MODULE, 'SLINGSHOT_SEARCH_ERROR')