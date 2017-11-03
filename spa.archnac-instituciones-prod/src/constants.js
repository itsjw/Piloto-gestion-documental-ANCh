/**
 * Alberto ECM 
 * (c) 2017-10-27 11:24:11 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

export const TYPE_AGGR = 'achn:aggregation'
export const TYPE_RECORD = 'achn:record'
export const TYPE_DISPOSAL_SCHEDULE = 'achn:disposal_schedule'

/**
 * [PROP_COD_CLF description]
 * @type {String}
 */
export const PROP_COD_CLF = 'achn:cod_clasificacion'

export const PROP_AGRR_TYPE = 'achn:aggr_tipo'

export const PROP_ARCHIVE_COD = 'achn:archive_codigo'

export const PROP_NAME = 'cm:name'

export const PROP_CREATED = 'cm:created'

export const PROP_STORE_PROTOCOL = 'sys:store-protocol'

export const PROP_STORE_ID = 'sys:store-identifier'

export const PROP_UUID = 'sys:node-uuid'

export const PROP_AGGR_ALCANCE = 'achn:aggr_alcance'

export const PROP_AGGR_ALCANCE_UNIDAD = 'achn:aggr_alcance_unidad'

export const PROP_AGGR_FCH_INICIO = 'achn:aggr_fch_inicio'

export const PROP_AGGR_FCH_EXISTENCIA = 'achn:aggr_fch_existencia'

export const PROP_AGGR_DISPOSITION_TYPE = 'achn:aggr_disposicion_type'

export const PROP_AGRR_OBSERVACION = 'achn:aggr_observacion'

export const PROP_AGGR_VALOR_DOCUMENTAL = 'achn:aggr_valor_documental'

export const TREE_PROPS = [ PROP_NAME, PROP_COD_CLF, PROP_AGRR_TYPE, PROP_STORE_PROTOCOL, PROP_STORE_ID, PROP_UUID, PROP_ARCHIVE_COD ] 

export const VALUE_ANNUAL = 'ANUAL'
export const LABEL_ANNOS = 'Años'

export const VALUE_TRANSFERENCIA = 'TRANSFERENCIA'
export const VALUE_EXPURGO = 'EXPURGO'

export const VALUE_PRIMARIO = 'Primario'

export const VALUE_SECUNDARIO = 'Secundario'

export const VALUE_DAILY = 'DIA' 
export const VALUE_WEEKLY = 'por_semanas'
export const VALUE_MONTHLY = 'por_meses'

export const FACET_MIMETYPE = '{http://www.alfresco.org/model/content/1.0}content.mimetype'
export const FACET_SIZE = '{http://www.alfresco.org/model/content/1.0}content.size'
export const FACET_CREATED = '{http://www.alfresco.org/model/content/1.0}created'
export const FACET_CREATOR = '{http://www.alfresco.org/model/content/1.0}creator'
export const FACET_MODIFIED = '{http://www.alfresco.org/model/content/1.0}modified'
export const FACET_MODIFIER = '{http://www.alfresco.org/model/content/1.0}modifier'
export const FACET_TYPE = 'TYPE'

export const FACET_AGGR_TYPE = '{http://www.dox.cl/model/content/1.0}aggr_nivel_clasificacion'
export const FACET_RECORD_TYPE = '{http://www.dox.cl/model/content/1.0}record_tipo'
export const FACET_INTO_SECTION = '{http://www.dox.cl/model/content/1.0}into_seccion'
export const FACET_INTO_SERIE = '{http://www.dox.cl/model/content/1.0}into_serie'
export const FACET_INTO_SUBSECTION = '{http://www.dox.cl/model/content/1.0}into_subseccion'
export const FACET_RECORD_AUTHOR = '{http://www.dox.cl/model/content/1.0}record_autor'


export const FACETS = [
    FACET_INTO_SECTION, FACET_INTO_SERIE, FACET_RECORD_AUTHOR, FACET_RECORD_TYPE, FACET_TYPE
]
