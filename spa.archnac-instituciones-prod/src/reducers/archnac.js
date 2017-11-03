/**
 * Alberto ECM 
 * (c) 2017-10-24 17:48:37 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import R from 'ramda'
import { getNodeRef, getChildren, getNodeAssoc } from 'alicia-common'
import { PAGE_CLASSIFICATION } from '../services/commons'
import { 
    ROOT_RESPONSE, CHILDREN_BY_COD_RESPONSE, SEARCH_REVERSE_RESPONSE, RC_TREE_EXPANDKEYS, REDUX_UPDATE_NODE, ALF_DELETE_NODE_RESPONSE,
    ALF_SEARCH_RECORD_RESPONSE, FETCH_PARENTS_RESPONSE, PIT_SEARCH_RESPONSE
} from '../services/types'

const initialState = {
    nodes: {},
    records: {
        facets: {},
        items: [],
        totalRecords: 0,
        numberFound: 0,
        startIndex: 0
    }
}

const nodeListToPairs = R.map(node => [ getNodeRef(node), node ])

const nodesToObj = R.pipe(nodeListToPairs, R.fromPairs)

const processUpdateNode = (state, action) => {
    const node = state.nodes[action.nodeRef]
    const { opts: { target }} = action
    switch(target){
        //procesar la actualizacion de una asociacion
        case 'assoc':
            const { opts: { targetParams: { assocName, nodeRef }}} = action  
            const assocNodes = getNodeAssoc(assocName, node)
            const index = R.findIndex(node => getNodeRef(node) === nodeRef, assocNodes)
            const nodeToUpdate = assocNodes[index]
            
            // if(action.opts.strategy === 'merge'){
            // solo estamos haciendo strategia de mezcla por ahora
            const type1 = action.updateData.type || nodeToUpdate.type 
            const nodeToUpdate1 = { 
                ...nodeToUpdate, 
                type: type1, 
                properties: { ...nodeToUpdate.properties, ...action.updateData.properties }
            }
            const assocNodes1 = R.update(index, nodeToUpdate1, assocNodes)
            const node1 = { ...node, assocs: { ...node.assocs, [assocName]: assocNodes1 }}
            return { ...state, nodes: { ...state.nodes, [action.nodeRef]: node1 }}
            // }


        case 'node':
            const type2 = action.updateData.type || node.type
            const node2 = { 
                ...node, 
                type: type2, 
                properties: { ...node.properties, ...action.updateData.properties }
            }
            return { ...state, nodes: { ...state.nodes, [action.nodeRef]: node2 }}
        default:
            return state
    }
}

export default function archnac(state = initialState, action){

    switch(action.type){

        case '@@router/LOCATION_CHANGE': 
            const pRouteClf = action.payload.pathname.startsWith(PAGE_CLASSIFICATION)
            return { ...state, pRouteClf }

        case ROOT_RESPONSE: 
            const rootAggr = action.resp[0]
            return { ...state, rootAggr, nodes: { ...state.nodes, [getNodeRef(rootAggr)]: rootAggr, ...nodesToObj(getChildren(rootAggr)) } }

        case FETCH_PARENTS_RESPONSE:
        case CHILDREN_BY_COD_RESPONSE:
        case 'alicia-common/FIND_NODE_RESPONSE':
            return { ...state, nodes: { ...state.nodes, ...nodesToObj(action.resp) }}

        case SEARCH_REVERSE_RESPONSE:

            return { ...state, nodes: { ...state.nodes, ...nodesToObj(R.reduce(R.concat, [], R.values(action.resp))) }}

        case RC_TREE_EXPANDKEYS:

            return { ...state, expandedKeys: action.keys }

        case REDUX_UPDATE_NODE:

            return processUpdateNode(state, action)

        case ALF_DELETE_NODE_RESPONSE:
            
            return { ...state, nodes: R.pickBy((v, k) => k !== action.reduxInfo.nodeRef, state.nodes ) }

        case ALF_SEARCH_RECORD_RESPONSE:

            return { ...state, records: action.resp }

        case PIT_SEARCH_RESPONSE:
            return { ...state, pits: action.resp }

        default:
            return state
    }

}
