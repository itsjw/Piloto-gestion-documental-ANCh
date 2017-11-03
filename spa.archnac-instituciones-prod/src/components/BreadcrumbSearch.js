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
import R from 'ramda'
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
        this.removeText = this.removeText.bind(this)
    }

    onCreateSerie(){
        const { routerGo, selectedRef } = this.props
        routerGo(`/page/classification/form/serie/new`, { selectedRef })
    }

    removeText(){
        const { routerGo, location: { query }} = this.props
        routerGo(`/page/start`, { ...query, text: undefined })
    }

    render(){
        console.log('BreadcrumbSearch.render', this.props)
        const { routerGo, intl, location: { query: { text }}} = this.props
        return (
            <div className="flex flexrow bgm-white deep-shadow" style={{ height: 50.4 }}>
                
                <div className="flex-1 f-w">
                    <div className="f-w flex flexrow f-h">
                        <div className="flex flex-center flex-1 p-l-15 p-r-15 f-h flexrow f-w">
                            <div className="flex flex-1 flex-center">
                                <ol className="breadcrumb m-0">
                                    <li><a onClick={ () =>routerGo(`/page/start`) }>Inicio</a></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-0 flex-center">
                    <div className="p-t-15 p-r-15 p-b-5">{/*style={{ minWidth: 256 }}*/}
                        { text && <div className="btn btn-info" onClick={ this.removeText }>
                            Text="{ text }" <i className="zmdi zmdi-close c-red"/> </div>
                        }
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