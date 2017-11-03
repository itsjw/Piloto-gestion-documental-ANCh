/**
 * Alberto ECM 
 * (c) 2017-10-24 18:38:27 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import R from 'ramda'
import { CALL_API, alf, jsonPost, getRequest, alfFindNode, nodeRefToUri, alfSlingshotSearch } from 'alicia-common'
import { 
    ROOT_REQUEST, ROOT_RESPONSE, ROOT_ERROR,
    CHILDREN_BY_COD_REQUEST, CHILDREN_BY_COD_RESPONSE, CHILDREN_BY_COD_ERROR,
    SEARCH_REVERSE_REQUEST, SEARCH_REVERSE_RESPONSE, SEARCH_REVERSE_ERROR,
    ALF_FORM_PROCESSOR_REQUEST, ALF_FORM_PROCESSOR_RESPONSE, ALF_FORM_PROCESSOR_ERROR,
    REFRESH_NODE_REQUEST, REFRESH_NODE_RESPONSE, REFRESH_NODE_ERROR,
    ALF_ADDAGGR_REQUEST, ALF_ADDAGGR_RESPONSE, ALF_ADDAGGR_ERROR,
	ALF_DELETE_NODE_REQUEST, ALF_DELETE_NODE_RESPONSE, ALF_DELETE_NODE_ERROR,
    ALF_SEARCH_RECORD_REQUEST, ALF_SEARCH_RECORD_RESPONSE, ALF_SEARCH_RECORD_ERROR,
    FETCH_PARENTS_REQUEST, FETCH_PARENTS_RESPONSE, FETCH_PARENTS_ERROR,
    PIT_REQUEST, PIT_RESPONSE, PIT_ERROR,
    PIT_SEARCH_REQUEST, PIT_SEARCH_RESPONSE, PIT_SEARCH_ERROR,
    REDUX_UPDATE_NODE
} from '../services/types'

export const fetchRoot = () => ({
    [CALL_API]: {
        types: [ ROOT_REQUEST, ROOT_RESPONSE, ROOT_ERROR ],
        endpoint: alf(`/dox/search`),
        ...jsonPost({ p: {
            q: '+PATH:"/app:company_home/*" +TYPE:"achn:aggregation"',
            size: 1
        }})
    }
})

export const fetchChildren = (parentNodeRef) => ({
    [CALL_API]: {
        types: [ CHILDREN_BY_COD_REQUEST, CHILDREN_BY_COD_RESPONSE, CHILDREN_BY_COD_ERROR ],
        endpoint: alf(`/dox/search`),
        ...jsonPost({ p: {
            q: `+TYPE:"achn:aggregation" +PARENT:"${parentNodeRef}"`
        }}),
        reduxInfo: { parentNodeRef }
    }
})

/**
 * 
 * @param  {String} rootNode NodeRef del Root
 * @param  {String} selected NodeRef del nodo selecciondao
 * @return {Promise}         Promise(ReduxActionResponse)
 */
export const fetchSearchReverse = (rootNode, selected) => ({
    [CALL_API]: {
        types: [ SEARCH_REVERSE_REQUEST, SEARCH_REVERSE_RESPONSE, SEARCH_REVERSE_ERROR ],
        endpoint: alf(`/dox/search/reverse`, { rootNode, selected }),
        ...getRequest,
        reduxInfo: { rootNode, selected }
    }
})

export const alfFormProcessor = (mode, id, params) => ({
    [CALL_API]: {
        types: [ ALF_FORM_PROCESSOR_REQUEST, ALF_FORM_PROCESSOR_RESPONSE, ALF_FORM_PROCESSOR_ERROR ],
        endpoint: alf(`/api/${mode}/${id}/formprocessor`),
        ...jsonPost(params)
    }
})

export const alfAddAggr = params => ({
    [CALL_API]: {
        types: [ ALF_ADDAGGR_REQUEST, ALF_ADDAGGR_RESPONSE, ALF_ADDAGGR_ERROR ],
        endpoint: alf(`/dox/aggr`),
        ...jsonPost(params)
    }
})

export const alfRefresh = nodeRef => (d) => 
    d(alfFindNode(nodeRefToUri(nodeRef), [ REFRESH_NODE_REQUEST, REFRESH_NODE_RESPONSE, REFRESH_NODE_ERROR ] ))

export const reduxUpdateNode = (nodeRef, updateData, opts = { target: 'node', strategy: 'merge' }) => 
    ({ type: REDUX_UPDATE_NODE, nodeRef, updateData, opts })

export const alfDeleteNode = nodeRef => ({
	[CALL_API]: {
		types: [ ALF_DELETE_NODE_REQUEST, ALF_DELETE_NODE_RESPONSE, ALF_DELETE_NODE_ERROR ],
		endpoint:  alf(`/slingshot/doclib/action/file/node/${nodeRefToUri(nodeRef)}`),
		method: 'DELETE',
		reduxInfo: { nodeRef }
	}
})

export const alfSearchRecord = params => d => 
    d(alfSlingshotSearch(params, [ ALF_SEARCH_RECORD_REQUEST, ALF_SEARCH_RECORD_RESPONSE, ALF_SEARCH_RECORD_ERROR ]))


export const alfSearchParents = list => ({
    [CALL_API]: {
        types: [ FETCH_PARENTS_REQUEST, FETCH_PARENTS_RESPONSE, FETCH_PARENTS_ERROR ],
        endpoint: alf(`/dox/search`),
        ...jsonPost({ p: {
            q: R.pipe(R.map(nodeRef => `ID:"${nodeRef}"`), R.join(''))(list)
        }}),
    }
})

export const alfPit = series => ({
    [CALL_API]: {
        types: [ PIT_REQUEST, PIT_RESPONSE, PIT_ERROR ],
        endpoint: alf(`dev/pit`),
        ...jsonPost(series)
    }
})

export const alfSearchPits = () => ({
    [CALL_API]: {
        types: [ PIT_SEARCH_REQUEST, PIT_SEARCH_RESPONSE, PIT_SEARCH_ERROR ],
        endpoint: alf(`/dox/search`),
        ...jsonPost({ p: {
            q: `TYPE:"achn:pit" PATH:"/app:company_home/cm:PITS//*"`
        }})
    }
})


// ({
//     [CALL_API]: {
//         types: [ CHILDREN_BY_COD_REQUEST, CHILDREN_BY_COD_RESPONSE, CHILDREN_BY_COD_ERROR ],
//         endpoint: alf(`/dox/search`),
//         ...jsonPost({ p: {
//             q: `+TYPE:"achn:aggregation" +PARENT:"${parentNodeRef}"`
//         }}),
//         reduxInfo: { parentNodeRef }
//     }
// })