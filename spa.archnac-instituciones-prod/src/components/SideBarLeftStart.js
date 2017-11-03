/**
 * Alberto ECM 
 * (c) 2017-10-03 12:57:52 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, { Component } from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { Label } from 'react-bootstrap'
import data from './PageSearchSampleData.json'
import { aggrByPu, aggrBySerie, aggrByDocumentalType, aggrByAuthor, aggrByClassificationLevel } from '../services/commons'
import { getName, getNodeFromState, getTitle } from '../selectors/app'
import { FACETS, FACET_INTO_SECTION, FACET_INTO_SERIE, FACET_RECORD_TYPE, FACET_TYPE, FACET_RECORD_AUTHOR } from '../constants'

const LiItem = ({ text, val }) => (
    <li>
        <a className="c-lightblue">
            <div className="flex">
                <div className="flex-1">{ text }</div>
                <div className="flex-0"><Label>{ val }</Label></div>
                </div>
        </a>
    </li> 
)

const FacetResult = ({ facet,  getNode }) => {
    const node = getNode(`workspace://SpacesStore/${facet.value}`)
    return node ?<LiItem key={ facet.value } text={ getName(node) } val={ facet.hits } />: null
}


class SideBarLeftStart extends Component {

    render(){
        const { intl, breadcrumb, facets, getNode } = this.props
        const mapFacets = facet => <FacetResult key={ facet.value } getNode={ getNode } facet={ facet } />
        const mapFacets2 = facet => <LiItem key={ facet.value } text={ facet.label } val={ facet.hits } />
        const mapFacets3 = facet => <LiItem key={ facet.value } text={ intl.formatMessage({ id: facet.label }) } val={ facet.hits } />

        const pu = facets[`@${FACET_INTO_SECTION}`]
        const serie = facets[`@${FACET_INTO_SERIE}`]
        const recordType = facets[`@${FACET_RECORD_TYPE}`]
        const author = facets[`@${FACET_RECORD_AUTHOR}`]
        const type = facets[FACET_TYPE]
        const style = { top: 121, height: 'calc(100% - 121px)', boxShadow: '0 0 1px 0px rgba(51, 51, 51, 0.38)' }
        return (
            <section id="sidebar" className="toggled" style={ style }>
                <div className="sidebar-inner c-overflow custom-scroll">    
                    <ul className="main-menu">
                        <li>
                            <a><i className="zmdi zmdi-filter-list"></i> Limitar los resultados por:</a>
                        </li>
                        {/* data-ng-className="{ 'active toggled': mactrl.$state.includes('headers') }">*/}
                        <li className="sub-menu active toggled"> 
                            <a><i className="zmdi zmdi-view-compact"></i> Ubicado en sección</a>
                            <ul>
                                { pu && pu.map(mapFacets) }
                            </ul>
                        </li>
                        <li className="sub-menu active toggled">
                            <a><i className="zmdi zmdi-folder"></i> Ubicado en serie documental</a>
                            <ul>
                                { serie && serie.map(mapFacets) }
                            </ul>
                        </li>
                        <li className="sub-menu active toggled">
                            <a><i className="zmdi zmdi-account"></i> Autor</a>
                            <ul>
                                { author && author.map(mapFacets2) }
                            </ul>
                        </li>
                        <li className="sub-menu active toggled">
                            <a><i className="zmdi zmdi-present-to-all"></i> Tipo documental</a>
                            <ul>
                                { recordType && recordType.map(mapFacets2) }
                            </ul>
                        </li>
                        <li className="sub-menu active toggled">
                            <a><i className="zmdi zmdi-trending-up"></i> Nivel de clasificación</a>
                            <ul>
                                { type && type.map(mapFacets3) }
                            </ul>
                        </li>
                    </ul>
                </div>

            </section>
        )
    }
}

export default connect(state => ({ facets: state.archnac.records.facets, getNode: getNodeFromState(state) }))(injectIntl(SideBarLeftStart))