/**
 * Alberto ECM 
 * (c) 2017-11-02 19:45:14 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { routerGo, nodeRefToUri, getNodeRef } from 'alicia-common'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getItemsParentRefs, getNodeFromState, getParentRefs, getName } from '../selectors/app'

const SEP = ' / '
const renderInfo = list => ( list.map( (item, key) => item === SEP ? SEP : <span className="c-lightblue" key={key}>{item}</span>) )

class FileItem extends Component {
    
    onView(nodeRef){
        const { routerGo } = this.props
        routerGo(`/page/classification/${nodeRefToUri(nodeRef)}`)
    }

    formatLabelVal(id, val){
        const { intl } = this.props
        return (
            <span><span className="c-default">{ intl.formatMessage({ id }) }: </span>{ val }</span>
        )
    }

    render(){

        const { node, getNode, checkable } = this.props
        const serie = getNode(getParentRefs(node)[1])
        const pu = getNode(getParentRefs(node)[0])
        const header1 = renderInfo([ this.formatLabelVal('cm_name', getName(node)) ])
        const header2 = renderInfo([ 
            this.formatLabelVal('achn_producer_unit', pu ?getName(pu): ''), SEP,
            this.formatLabelVal('achn_serie', serie ? getName(serie) : ''),
        ])
        const header3 = renderInfo([ 
            this.formatLabelVal('achn_identificador', node.properties['achn:record_identificador']), SEP, 
            this.formatLabelVal('achn_fecha_captura', moment(node.properties['achn:fecha_captura'])
                .format('DD/MM/YYYY HH:mm')
            ), 
            SEP, 
            this.formatLabelVal( 'achn_archive_codigo', node.properties['achn:archive_codigo'])
        ])

        return (
            <div className="lv-item media">
                { checkable && 
                    <div className="pull-left">
                        <div className="checkbox pull-left">
                            <label>
                                <input type="checkbox" checked={ false } onClick={ this.checkTask }/>
                                <i className="input-helper" />
                            </label>
                        </div>
                    </div>
                }
                <div className="media-body flex">
                    <div className="flex-1 flex flexcol flex-justify-center">
                        <div className="lv-title">{ header1 }</div>
                        <div className="lv-title">{ header2 }</div>
                        <div className="lv-title">{ header3 }</div>
                    </div>

                    <div className="flex flex-0 flex-center flex-justify-end">
                        <a 
                            className="inbox-action" 
                            title="ver detalles" 
                            onClick={ () => this.onView(getNodeRef(node)) }>
                            <i className="zmdi zmdi-view-web"/>
                        </a>
                        <a className="inbox-action" title="Descargar" onClick={ this.onDelete }>
                            <i className="zmdi zmdi-download" />
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ getNode: getNodeFromState(state)}), 
    { routerGo }
)(injectIntl(FileItem))
