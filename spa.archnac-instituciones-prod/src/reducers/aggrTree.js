/**
 * Alberto ECM 
 * (c) 2017-10-25 12:14:41 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import R from 'ramda'
import { getChildren, getNodeRef, getNodeAssoc } from 'alicia-common'
import { condFUndef, nodesToObj } from '../services/commons'
import { getTreeChildren } from '../selectors/app'
import { 
    ROOT_RESPONSE, CHILDREN_BY_COD_REQUEST, CHILDREN_BY_COD_RESPONSE, SEARCH_REVERSE_RESPONSE, RC_TREE_EXPANDKEYS, REDUX_UPDATE_NODE, 
    ALF_DELETE_NODE_RESPONSE
} from '../services/types'

const initialState = {
    data: {},
    expandedKeys: []
}

const uniqAppend = R.cond([[R.complement(R.contains), R.append], [R.T, R.nthArg(1)]])
const listToObj = R.pipe(R.map(node => [ getNodeRef(node), getTreeChildren(node) ]), R.fromPairs)
export default function aggrTree(state = initialState, action){

    switch(action.type){

        case ROOT_RESPONSE: 
        case CHILDREN_BY_COD_RESPONSE: 

            const nodes = listToObj(action.resp)
            const parentNodeRef = condFUndef(() => action.reduxInfo.parentNodeRef, action.reduxInfo)
            const parent = condFUndef(() => ({ [ action.reduxInfo.parentNodeRef ]: action.resp }), parentNodeRef)
            const expandedKeys = parentNodeRef ?uniqAppend(parentNodeRef, state.expandedKeys) :R.keys(nodes)

            return { ...state, data: { ...state.data, ...nodes, ...parent  }, expandedKeys }

        case CHILDREN_BY_COD_REQUEST:
            return state

        case SEARCH_REVERSE_RESPONSE:
            const data = action.resp
            return { ...state, data: { ...state.data, ...data }, expandedKeys: [ ...state.expandedKeys, ...R.keys(data)] }

        case RC_TREE_EXPANDKEYS:
            return { ...state, expandedKeys: action.keys }

        case ALF_DELETE_NODE_RESPONSE:
            let index = -1
            const data1 = R.toPairs(state.data)
            const indexList = R.findIndex(([, list ]) => (index = R.findIndex(node => getNodeRef(node) === action.reduxInfo.nodeRef, list )) >= 0, data1)
            const newData = { ...state.data, [data1[indexList][0]]: R.remove(index, 1, data1[indexList][1])}

            return { ...state, data: newData }
        default: 
            return state
    }
}
