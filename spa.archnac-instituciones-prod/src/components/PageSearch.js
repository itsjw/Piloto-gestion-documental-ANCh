/**
 * Alberto ECM 
 * (c) 2017-10-02 19:22:01 DOX, LTDA. http://www.dox.cl
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
import FileItem from './FileItem'


class PageSearch extends Component {
    
    constructor(props){
        super(props)
        this.onView = this.onView.bind(this)
    }

    onView(nodeRef){
        const { routerGo } = this.props
        routerGo(`/page/classification/${nodeRefToUri(nodeRef)}`)
    }

    render(){
        console.log('PageSearch.render', this.props)
        const { records: { items, numberFound, totalRecords }, getNode } = this.props 
        return (
            <div className="row f-h m-t-10">
                <div className="col-xs-12 p-0 f-h">
                    <div className="card doclib f-h m-0">
                        <div className="card-header">
                            <h2>
                                Resultado de la búsqueda
                                <small> {totalRecords} documentos mostrados de {numberFound} </small>
                            </h2>
                        </div>
                        <div className="listview lv-bordered lv-lg f-h" style={{ overflowY: 'auto' }}>
                            <div className="lv-body">
                                { items.map((item, index) => <FileItem node={ item.node } /> )} 
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
        const { location: { query: { text }}} = this.props
        this.doSearch(this.props, text)
    }

    componentWillUpdate(nextProps){

        const { location: { query: { text }}} = nextProps
        const { location: { query: { text: currText }}} = this.props

        if(text != currText){
            this.doSearch(nextProps, text)
        }

    }

    doSearch(props, text){
        const { alfSearchRecord, alfSearchParents } = this.props

        let term = ['TYPE:"achn:record"']
        if(text){
            term.push(`(|@cm:name:"*${text}*" |@achn:archive_nombre:"*${text}*" |@achn:record_identificador:"${text}")`)
        }
        alfSearchRecord({ 
            term: term.join(' AND '), 
            repo: true, 
            facetFields: FACETS.join()
        }).then(({ resp: { items }}) => alfSearchParents(getItemsParentRefs(items)))
    }
}

export default connect(
    state => ({ records: state.archnac.records, getNode: getNodeFromState(state)}), 
    { alfSearchRecord, alfSearchParents, routerGo }
)(injectIntl(PageSearch))