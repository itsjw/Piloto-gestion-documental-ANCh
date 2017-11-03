/**
 * Alberto ECM 
 * (c) 2017-09-12 12:01:13 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { push } from 'react-router-redux'
import { Route } from 'react-router-dom'
import Button from 'react-bootstrap-button-loader'
import { FormattedMessage } from 'react-intl'
import {
    InputField,
    fieldValidations,
    alfClasses
} from '../export'

class AlfrescoClient extends Component {
    
    constructor(props){
        super(props)
        this.onApiClassesClick = this.onApiClassesClick.bind(this)
    }

    onApiClassesClick(){
        const { push } = this.props
        push('/api/classes')
    }

    render(){
        console.log('AlfrescoClient.render', this.props)
        const { handleSubmit, alfClasses } = this.props

        return (
            <div className="card">
                <div className="card-header">
                    <h2><FormattedMessage id="alfresco_login_form" /></h2>
                    <FormattedMessage id="alfresco_api" tagName="small" />
                </div>
                <div className="card-body card-padding">
                    
                    <a onClick={ this.onApiClassesClick }>/api/classes</a>
                    
                </div>
            </div>
        )
    }
}

export default reduxForm({ form: 'alfrescoClient' })(connect(undefined, {  push })(AlfrescoClient))