/**
 * Alberto ECM 
 * (c) 2017-10-29 22:06:46 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import Button from 'react-bootstrap-button-loader'
import { getNodeRefFromProps } from '../selectors/app'
import {  getNodeRef, nodeRefToUri, routerGo, getChildren } from 'alicia-common'
import FileItem from './FileItem'

class FilesView extends Component {
    
    constructor(props){
        super(props)
        this.onViewDescription = this.onViewDescription.bind(this)
        this.state = {}
    }

    onViewDescription(){
        const { routerGo, node } = this.props
        routerGo(`/page/classification/${nodeRefToUri(getNodeRef(node))}`)
    }

    render(){
        console.log('FilesView.render', this.props)
        const { node, intl } =this.props
        return (
            node ? <div className="row f-h m-t-10">
                <div className="card">
                    <div className="card-header">
                        <h2>
                            <div className="pull-right">
                                {/*<Button 
                                    type="submit" 
                                    className="btn-info bgm-lightblue m-r-5" 
                                    loading={ this.state.submitting } >
                                    <FormattedMessage id="add_files" />
                                </Button>*/}
                                <Button 
                                    className="btn-info m-r-5" 
                                    loading={ this.state.submitting } 
                                    onClick={ this.onViewDescription }
                                    title={ intl.formatMessage({ id: 'view_descriptions' }) }>
                                    <i className="zmdi zmdi-view-web" /> Ver descripción
                                </Button>
                            </div>
                            <FormattedMessage id="container_name" values={{ name: node.properties['cm:name'] }} />
                            <small><FormattedMessage id="document_view" /></small>
                        </h2>

                    </div>
                    <div className="listview lv-bordered lv-lg f-h" style={{ overflowY: 'auto' }}>
                        <div className="lv-body">
                            { getChildren(node).map((node, index) => <FileItem node={ node } /> )}
                        </div>
                    </div>
                </div>
            </div>
            : null
        )
    }
}

export default connect(
    (state, props) => ({ nodeRef: getNodeRefFromProps(props), node: state.archnac.nodes[getNodeRefFromProps(props)] }),
    { routerGo }
)(injectIntl(FilesView))