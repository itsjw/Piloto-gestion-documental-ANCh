/**
 * Alberto ECM 
 * (c) 2017-10-04 19:30:44 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { routerGo, SelectField } from 'alicia-common'
import { injectIntl, FormattedMessage } from 'react-intl'
import { reduxForm, Field } from 'redux-form'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import { getNodeRefFromProps } from '../selectors/app'

class BreadcrumbSearch extends Component {
    
    constructor(props){
        super(props)
        this.onCreateSerie = this.onCreateSerie.bind(this)
        this.onPit = this.onPit.bind(this)
    }

    onCreateSerie(){
        const { routerGo, selectedRef } = this.props
        routerGo(`/page/classification/form/serie/new`, { selectedRef })
    }

    onPit(){
        const { routerGo } = this.props
        routerGo(`/page/sips`)
    }

    render(){
        console.log('BreadcrumbSearch.render', this.props)
        const { routerGo, intl } = this.props
        return (
            <div className="flex flexrow bgm-white deep-shadow" style={{ height: 50.4 }}>
                <div className="p-t-15 p-l-15 p-b-5">{/*style={{ minWidth: 256 }}*/}
                    
                </div>
                <div className="flex-1 f-w">
                    <div className="f-w flex flexrow f-h">
                        <div className="flex flex-center flex-1 p-l-15 p-r-15 f-h flexrow f-w">
                            <div className="flex flex-1 flex-justify-center flex-center">
                                <ol className="breadcrumb m-0">
                                    <li><a>Home</a></li>
                                    <li className="active">Library</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-0 flex-justify-end">
                    <div className="p-t-5 p-r-15 p-b-5" style={{ marginTop: 2 }}>
                        <a 
                            className="inbox-action c-lightblue" 
                            style={{ background: 'rgba(0,0,0,.12)' }}
                            title="Pits generados"
                            onClick={ this.onPit }>
                            <i className="zmdi zmdi-archive"/>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    undefined,
    { routerGo }
)(reduxForm({ form: 'BreadcrumbSearch' })(injectIntl(BreadcrumbSearch)))