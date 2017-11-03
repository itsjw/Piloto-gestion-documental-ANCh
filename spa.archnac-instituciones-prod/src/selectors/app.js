/**
 * Alberto ECM 
 * (c) 2017-10-02 17:28:07 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import R from 'ramda'
import { getChildren, getNodeRef, getNodeAssoc } from 'alicia-common'
import { 
    PROP_NAME, PROP_ARCHIVE_COD, PROP_AGRR_TYPE, PROP_AGGR_ALCANCE, PROP_AGGR_ALCANCE_UNIDAD, PROP_AGGR_FCH_INICIO, 
    PROP_AGGR_DISPOSITION_TYPE, PROP_AGRR_OBSERVACION, PROP_AGGR_VALOR_DOCUMENTAL, PROP_AGGR_FCH_EXISTENCIA, PROP_CREATED,
    VALUE_TRANSFERENCIA, VALUE_EXPURGO, VALUE_DAILY, VALUE_WEEKLY, VALUE_MONTHLY, VALUE_ANNUAL, VALUE_PRIMARIO, VALUE_SECUNDARIO,
    LABEL_ANNOS,
    TREE_PROPS
} from '../constants'
import attaLogo from '../assets/images/Logo-ATTA-RGB.jpg'
import defLogo from '../assets/images/site-64.png'

export const getHeaderSkin = () => /((dev)|(qa))\.archivonacional\.gob\.cl$/.test(window.location.hostname) ?'blue' :'montse'

export const getLoginLogo = () => {
    const hostSplit = window.location.host.split(/\./)
    const name = hostSplit[0].replace(/(dev|qa)$/, '')
    switch(name){
        case 'atta': 
            return attaLogo
        default: 
            return defLogo
    }
}

/**
 * Obtiene el nombre de un nodo
 * @param  {DoxNode} node El nodo al que se le hará la consulta
 * @return {String}      Valor de la propiedad achn:name
 */
export const getName = node => node.properties[PROP_NAME]

export const getCreated = node => node.properties[PROP_CREATED]

/**
 * Obtiene el código de un nodo tipo achn:aggregation
 * @param  {DoxNode} node El nodo al que se le hara la consulta
 * @return {String}      Valor de la propiedad achn:archive_codigo
 */
export const getCod = node => node.properties[PROP_ARCHIVE_COD]

/**
 * Obtiene un title del nodo
 * @param  {DoxNode} node El nodo al que se le hará la consulta
 * @return {String}      Valor resultado del código más el nombre
 */
export const getTitle = node => `${getCod(node)} ${getName(node)}`

/**
 * Obtiene el tipo de agregación del nodo
 * @param  {DoxNode} node El nodo al que se le hará la consulta
 * @return {String}      Valor de la propiedad achn:aggr_tipo
 */
export const getAggrType = node => node.properties[PROP_AGRR_TYPE]

export const getAggrAlcance = node => node.properties[PROP_AGGR_ALCANCE]

export const getAggrAlcanceUnidad = node => node.properties[PROP_AGGR_ALCANCE_UNIDAD]

export const getAggrFchInicio = node => node.properties[PROP_AGGR_FCH_INICIO]

export const getAggrDispositionType = node => node.properties[PROP_AGGR_DISPOSITION_TYPE]

export const getAggrObservacion = node => node.properties[PROP_AGRR_OBSERVACION]

export const getAggrValorDocumental = node => node.properties[PROP_AGGR_VALOR_DOCUMENTAL]

export const getAggrFchExistencia = node => node.properties[PROP_AGGR_FCH_EXISTENCIA]

export const getNodeRefFromParams = ({ storeProtocol, storeId, uuid }) => `${storeProtocol}://${storeId}/${uuid}`

export const getNodeRefFromProps = ({ match: { params }}) => getNodeRefFromParams(params)

export const getPathFromProps = ({ match: { path }}) => path

export const getTreeNode = ({ type, properties }) => ({ type, properties: R.pick(TREE_PROPS, properties) })

export const getTreeChildren = R.pipe(getChildren, R.map(getTreeNode))

export const getDisposalScheduler = R.pipe(getNodeAssoc('achn:disposal_scheduler'), R.nth(0))

const isAnnual = str => str === VALUE_ANNUAL

export const getFrecuencyLabel = R.cond([ [ isAnnual, R.always(LABEL_ANNOS) ] ])

export const getFrecuencyLabelNode = R.pipe(getAggrAlcanceUnidad, getFrecuencyLabel)

const createSelectValue = R.curry((value, intl) => ({ value, label: intl.formatMessage({ id: value }) }))

/**
 * Crea una vez los tipos de disposicion y luego los mantiene grabados en memoria
 * @param {intl} intl React Intl
 * @type {[type]}
 */
export const getDispositionTypes = R.once(R.juxt([ createSelectValue(VALUE_TRANSFERENCIA), createSelectValue(VALUE_EXPURGO) ]))

export const getFrecuencyTypes = R.once(R.juxt([ 
    createSelectValue(VALUE_DAILY), 
    createSelectValue(VALUE_WEEKLY), 
    createSelectValue(VALUE_MONTHLY), 
    createSelectValue(VALUE_ANNUAL)
]))

export const getRecordValues = R.once(R.juxt([ createSelectValue(VALUE_PRIMARIO), createSelectValue(VALUE_SECUNDARIO) ]))

export const getParentRefs = ({ properties: { 'achn:into_seccion': s1, 'achn:into_serie': s2, 'achn:into_subseccion': s3 }}) =>
    [ `workspace://SpacesStore/${s1}`,  `workspace://SpacesStore/${s2}`, `workspace://SpacesStore/${s3}`]

export const getItemParentRefs = item => getParentRefs(item.node) 

export const getItemsParentRefs = R.pipe(R.map(getItemParentRefs), R.reduce(R.concat, []), R.uniq)

export const getNodeFromState = R.curry((state, nodeRef) => state.archnac.nodes[nodeRef])