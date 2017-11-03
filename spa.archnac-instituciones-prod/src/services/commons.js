/**
 * Alberto ECM 
 * (c) 2017-10-02 16:40:07 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import R from 'ramda'
import { getNodeAssoc, getChildren, getNodeRef } from 'alicia-common'
import { getName, getCod, getPathFromProps } from '../selectors/app'
import {
    VALUE_TRANSFERENCIA, VALUE_EXPURGO, VALUE_ANNUAL, VALUE_DAILY, LABEL_ANNOS
} from '../constants'

export const MODULE = 'alicia-atta-achn'

export const PAGE_CLASSIFICATION = '/page/classification'

/**
 * @todo Comprobar el tipo documental.
 */
export const TYPE_SIMPLE_UNIT = 'achn:unidad_simple'


export const dotlow = R.replace(':', '_')
export const propdot = R.pipe(R.replace(/prop_/, ''), R.replace('_', ':'))
export const prop = str => `prop_${str}`

export const getAssocPu = node => getNodeAssoc('achn:inProducerUnit', node)[0]
export const getAssocSerie = node => getNodeAssoc('achn:inSerie', node)[0]
export const aggrByPu = R.pipe(R.map(getAssocPu), R.groupBy(getNodeRef), R.toPairs)
export const aggrBySerie = R.pipe(R.map(getAssocSerie), R.groupBy(getNodeRef), R.toPairs)
export const aggrByDocumentalType = R.pipe(R.groupBy(node => node.properties['achn:tipo_documental']), R.toPairs)
export const aggrByAuthor = R.pipe(R.groupBy(node => node.properties['achn:autor']), R.toPairs)
export const aggrByClassificationLevel = R.pipe(R.groupBy(node => node.type), R.toPairs)

export const findNode = R.curry((propName, propVal,  node) => {

    if(node.properties[propName] === propVal){
        return node
    }

    const children = getChildren(node)
    let result;
    for(var i = 0; i < children.length; i++){
        result = findNode(propName, propVal, children[i])
        if(result){
            return result
        }
    }

    return undefined
})

export const findNodeByIdentificador = findNode('achn:archive_codigo')

export const renameBy = R.curry((fn, obj) => R.pipe(R.toPairs, R.map(R.adjust(fn, 0)), R.fromPairs)(obj));

export const nodeToForm = ({ node: { properties, type }, intl }) => ({ ...renameBy(dotlow, properties), type }) 

export const formToNode = (type, props) => ({ properties: renameBy(propdot, props), type })

const findByNodeRef = (nodeRef, node) => R.find(node => node.nodeRef === nodeRef, node)

export const nth = n => {

    switch(n){
        case 1: return 'primer'
        case 2: return 'segundo'
        case 3: return 'tercer'
        case 4: return 'cuarto'
        case 5: return 'quinto'
        case 6: return 'sexto'
        case 7: return 'séptimo'
        case 8: return 'octavo'
        case 9: return 'noveno'
        case 10: return 'décimo'
        default: return ''
    }
}

export const isFun = any => R.type(any) === 'Function'

export const cond = R.curry((onTrue, onFalse, condition) => 
    condition ?(isFun(onTrue) ?onTrue() :onTrue) :( isFun(onFalse) ?onFalse() :onFalse )) 
export const condFNull = cond(R.__, null, R.__)
export const condFUndef = cond(R.__, undefined, R.__)

export const isClfPath = path => /\/page\/(classification|audits|files)\/.+/.test(path)
export const isClfProps = R.pipe(getPathFromProps, isClfPath)

// export const isAudits = R.pipe(getPathFromProps, isAuditPath)

export const CLASSIFICATION_MANAGER = 'GROUP_CLASSIFICATION_MANAGER'


export const isAdmin = user => user.capabilities.isAdmin
export const hasGroup = R.curry((groupName, user) => isAdmin(user) || R.find(g => g.itemName === groupName, user.groups))
export const hasGrpClfManager = hasGroup(CLASSIFICATION_MANAGER)

export const frecuencyIsDaily = (df) => df && df.value === VALUE_DAILY
export const frecuencyIsAnual = (df) => df && df.value === VALUE_ANNUAL

// export const getDispositionFrecuency = ({ disposition_frecuency }) => disposition_frecuency

export const formIsDaily = formValues => formValues && frecuencyIsDaily(formValues.disposition_frecuency)
export const formIsAnual = formValues => formValues && frecuencyIsAnual(formValues.disposition_frecuency)