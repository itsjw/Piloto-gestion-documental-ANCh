/**
 * Alberto ECM 
 * (c) 2017-10-25 10:24:12 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import { createQName } from 'alicia-common'
import { MODULE } from './commons'

export const ROOT_REQUEST = createQName(MODULE, 'ROOT_REQUEST')
export const ROOT_RESPONSE = createQName(MODULE, 'ROOT_RESPONSE')
export const ROOT_ERROR = createQName(MODULE, 'ROOT_ERROR')

export const CHILDREN_BY_COD_REQUEST = createQName(MODULE, 'CHILDREN_BY_COD_REQUEST')
export const CHILDREN_BY_COD_RESPONSE = createQName(MODULE, 'CHILDREN_BY_COD_RESPONSE')
export const CHILDREN_BY_COD_ERROR = createQName(MODULE, 'CHILDREN_BY_COD_ERROR')

export const SEARCH_REVERSE_REQUEST = createQName(MODULE, 'SEARCH_REVERSE_REQUEST')
export const SEARCH_REVERSE_RESPONSE = createQName(MODULE, 'SEARCH_REVERSE_RESPONSE')
export const SEARCH_REVERSE_ERROR = createQName(MODULE, 'SEARCH_REVERSE_ERROR')

export const ALF_FORM_PROCESSOR_REQUEST = createQName(MODULE, 'ALF_FORM_PROCESSOR_REQUEST')
export const ALF_FORM_PROCESSOR_RESPONSE = createQName(MODULE, 'ALF_FORM_PROCESSOR_RESPONSE')
export const ALF_FORM_PROCESSOR_ERROR = createQName(MODULE, 'ALF_FORM_PROCESSOR_ERROR')

export const REFRESH_NODE_REQUEST = createQName(MODULE, 'REFRESH_NODE_REQUEST')
export const REFRESH_NODE_RESPONSE = createQName(MODULE, 'REFRESH_NODE_RESPONSE')
export const REFRESH_NODE_ERROR = createQName(MODULE, 'REFRESH_NODE_ERROR')

export const RC_TREE_EXPANDKEYS = createQName(MODULE, 'RC_TREE_EXPANDKEYS')
export const REDUX_UPDATE_NODE = createQName(MODULE, 'REDUX_UPDATE_NODE')

export const ALF_ADDAGGR_REQUEST = createQName(MODULE, 'ALF_ADDAGGR_ERROR')
export const ALF_ADDAGGR_RESPONSE = createQName(MODULE, 'ALF_ADDAGGR_ERROR')
export const ALF_ADDAGGR_ERROR = createQName(MODULE, 'ALF_ADDAGGR_ERROR')

export const ALF_DELETE_NODE_REQUEST = createQName(MODULE, 'ALF_DELETE_NODE_REQUEST')
export const ALF_DELETE_NODE_RESPONSE = createQName(MODULE, 'ALF_DELETE_NODE_RESPONSE')
export const ALF_DELETE_NODE_ERROR = createQName(MODULE, 'ALF_DELETE_NODE_ERROR')

export const ALF_SEARCH_RECORD_REQUEST = createQName(MODULE, 'ALF_SEARCH_RECORD_REQUEST')
export const ALF_SEARCH_RECORD_RESPONSE = createQName(MODULE, 'ALF_SEARCH_RECORD_RESPONSE')
export const ALF_SEARCH_RECORD_ERROR = createQName(MODULE, 'ALF_SEARCH_RECORD_ERROR')

export const FETCH_PARENTS_REQUEST = createQName(MODULE, 'FETCH_PARENTS_REQUEST')
export const FETCH_PARENTS_RESPONSE = createQName(MODULE, 'FETCH_PARENTS_RESPONSE')
export const FETCH_PARENTS_ERROR = createQName(MODULE, 'FETCH_PARENTS_ERROR')

export const PIT_REQUEST = createQName(MODULE, 'PIT_REQUEST')
export const PIT_RESPONSE = createQName(MODULE, 'PIT_RESPONSE')
export const PIT_ERROR = createQName(MODULE, 'PIT_ERROR')

//PIT_SEARCH_REQUEST, PIT_SEARCH_RESPONSE, PIT_SEARCH_ERROR
export const PIT_SEARCH_REQUEST = createQName(MODULE, 'PIT_SEARCH_REQUEST')
export const PIT_SEARCH_RESPONSE = createQName(MODULE, 'PIT_SEARCH_RESPONSE')
export const PIT_SEARCH_ERROR = createQName(MODULE, 'PIT_SEARCH_ERROR')


