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
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import moment from 'moment'
import { Pagination } from 'react-bootstrap'
import { nodeRefToUri, routerGo, getNodeRef } from 'alicia-common'
import classNames from 'classnames'
import { alfSearchPits } from '../actions'
import { getItemsParentRefs, getNodeFromState, getItemParentRefs } from '../selectors/app'
import FileItem from './FileItem'

const SEP = ' / '
const renderInfo = list => ( list.map( (item, key) => item === SEP ? SEP : <span className="c-lightblue" key={key}>{item}</span>) )
class PageSip extends Component {
    
    constructor(props){
        super(props)
        this.updateDimensions = this.updateDimensions.bind(this)
        this.state = {}
    }

    formatLabelVal(id, val){
        const { intl } = this.props
        return (
            <span><span className="c-default">{ intl.formatMessage({ id }) }: </span>{ val }</span>
        )
    }

    getColumns(){
        const { containerSize } = this.state
        let columns = [
            { id: 'achn:pit_estado', width: 75, sort: false  },
            { id: 'cm:name', width: '225px', sort: false  },
        ]

        if(containerSize > 300){
            columns.push({ id: 'achn:pit_institucion_productora', width: 50, sort: false })
            columns.push({ id: 'achn:pit_institucion_receptora', width: 50, sort: false })
        }

        if(containerSize > 400){
            columns.push({ id: 'achn:pit_acuerdo_codigo', width: 200, sort: false })

            // columns.push({ id: 'tc_fecha_formalizacion', width: 250, sort: true })
            // columns.push({ id: 'tc_fecha_vencimiento', width: 250, sort: true })
        }

        if(containerSize > 550){

        }

        // if(containerSize > 700){
        //     columns.push({ id: 'tc_fecha_formalizacion', width: 150, sort: false })
        // }
        
        // if(containerSize > 850){
        //     columns.push({ id: 'tc_tasa', width: 150, sort: false })
        // }

        // if(containerSize > 550){
        //     columns.push({ id: 'tc_nombre_o_razon_social_persona', width: 150, sort: false })
        // }

        return columns
    }

    updateDimensions(elem){
        // console.log('updating dimensions', elem, elem ? elem.offsetWidth : undefined)
        if(elem) {
            const containerSize = elem.offsetWidth
            if(containerSize !== this.state.containerSize){
                this.setState({ ...this.state, containerSize })
            }
        }
    }

    renderCol(node, col){

        return node.properties[col.id]
                   
    }

    getClasses(node){
        // const isSelected = node.id === this.props.selected.node.nodeRef
        return classNames('table-cell inbox-table-cell', { 
            selected: false/*isSelected*/,
            'bgm-lightblue': false/*isSelected*/,
            'c-white': false /*isSelected*/,
            // 'bgm-yellow': node.tc_estado === 'FALTANTE' && !isSelected
        })
    }

    render(){
        const { pits, getNode } = this.props  
        const columns = this.getColumns()
        return (
            <div id="content-area" className="row f-h m-t-10" ref={ this.updateDimensions }>
                <div className="col-xs-12 p-0 f-h">
                    <div className="card doclib m-0">
                        <div className="card-header">
                            <h2 className="lvh-label hidden-xs">
                                Paquetes de Transferencias
                                <small>Lista de paquetes de transferencias disponibles</small>
                            </h2>
                        </div>
                        <div className="card-body">
                            <div className="f-h"><div className="inbox-table-row-wrapper custom-scroll"><div><div className="">
                                <div className="inbox-table-layout">
                                    <div className="table-col-grp">
                                        { columns.map(header => <div key={ header.id } className="table-col"></div>) }
                                    </div>
                                    <div className="inbox-table-row-th">
                                        { columns.map( header => 
                                            <div key={ header.id } className="inbox-table-th" style={{ width: header.width }}>
                                                <a className="flex content-label c-default">
                                                    <div className=""><FormattedMessage id={ header.id } /></div>
                                                    <div className="flex-1">
                                                        { header.sort && <i className="sort-icon fa fa-sort-alpha-desc" />}
                                                    </div>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                    <div className="table-row-grp">
                                        {pits && pits.map(node => 
                                            <div key={ getNodeRef(node) } className="table-row">{ columns.map(col => 
                                                <div key={ col.id } className={ this.getClasses(node) } onClick={ e =>undefined }>
                                                    { this.renderCol(node, col) }
                                                </div>
                                            )}</div>
                                        )}
                                    </div>
                                </div>
                            </div></div></div></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount(){
        const { alfSearchPits } = this.props
        alfSearchPits()
        window.addEventListener("resize", () => {
            console.log('add resize event')
            const elem = document.getElementById('content-area')
            if(elem) {
                this.updateDimensions(elem)
            }
        });
        //.then(({ resp: { items }}) => alfSearchParents(getItemsParentRefs(items)))
    }

    
}

export default connect(
    state => ({ pits: state.archnac.pits, getNode: getNodeFromState(state)}), 
    { alfSearchPits }
)(injectIntl(PageSip))
