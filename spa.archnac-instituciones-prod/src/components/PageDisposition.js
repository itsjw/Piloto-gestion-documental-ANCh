/**
 * Alberto ECM 
 * (c) 2017-10-04 20:40:16 DOX, LTDA. http://www.dox.cl
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
import moment from 'moment'
import { Pagination } from 'react-bootstrap'
import { nodeRefToUri, routerGo } from 'alicia-common'
import { alfSearchRecord, alfSearchParents } from '../actions'
import { FACETS, FACET_RECORD_TYPE } from '../constants'
import { getItemsParentRefs, getNodeFromState, getItemParentRefs } from '../selectors/app'
import SerieItem from './SerieItem'

const SEP = ' / '
const renderInfo = list => ( list.map( (item, key) => item === SEP ? SEP : <span className="c-lightblue" key={key}>{item}</span>) )
class PageDisposition extends Component {
    
    formatLabelVal(id, val){
        const { intl } = this.props
        return (
            <span><span className="c-default">{ intl.formatMessage({ id }) }: </span>{ val }</span>
        )
    }

    render(){
        const { records: { items }, getNode } = this.props  
        const group = R.groupBy(item => `workspace://SpacesStore/${item.node.properties['achn:into_serie']}`, items)
        const keys = R.keys(group)
        return (
            <div className="row f-h m-t-10">
                <div className="col-xs-12 p-0 f-h">
                    <div className="card doclib m-0">
                        <div className="card-header">
                            <div className="checkbox pull-left" style={{ marginBottom: 0 }}>
                                <label>
                                    <input name="checkAll" type="checkbox" />
                                    <i className="input-helper"></i>
                                </label>
                            </div>
                            <div className="pull-right">
                                <button className="btn btn-info bgm-lightblue">
                                    Crear PIT
                                </button>
                            </div>
                            <h2 className="lvh-label hidden-xs">
                                Documentos disponibles
                                <small>Lista de documentos disponibles. Permite crear paquetes de transferencias</small>
                            </h2>
                        </div>
                        <div className="listview lv-bordered lv-lg">

                            <div className="lv-body">
                                { keys.map((k, index) => <SerieItem key={ index } checkable nodeRef={ k } nodes={ group[k] }/> )} 
                            </div>
                            <div className="lv-pagination p-10">
                                <Pagination 
                                    prev 
                                    next 
                                    first 
                                    last 
                                    boundaryLinks 
                                    maxButtons={ 1 }
                                    items={ Math.ceil(21 / 50) }
                                    style={{ margin: 0 }}
                                    activePage={ 1 }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount(){
        const { alfSearchRecord, alfSearchParents } = this.props
        alfSearchRecord({ 
            term: `TYPE:"achn:record" AND @achn:disposed_status:DISPONIBLE`, 
            repo: true, 
            facetFields: []
        })
    }

    
}

export default connect(
    state => ({ records: state.archnac.records, getNode: getNodeFromState(state)}), 
    { alfSearchRecord, alfSearchParents, routerGo }
)(injectIntl(PageDisposition))
