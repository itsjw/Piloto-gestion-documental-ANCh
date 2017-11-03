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
import Button from 'react-bootstrap-button-loader'
import { FormattedMessage } from 'react-intl'
import {
    InputField,
    fieldValidations,
    alfProfile
} from '../export'

class AlfrescoAuthClient extends Component {
    
    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(credentials){
        const { alfProfile } = this.props
        alfProfile(credentials)
    }   

    render(){
        console.log('AlfrescoAuthClient.render', this.props)
        const { handleSubmit } = this.props

        return (
            <div className="card">
                <div className="card-header">
                    <h2><FormattedMessage id="alfresco_login_form" /></h2>
                    <FormattedMessage id="alfresco_api" tagName="small" />
                </div>
                <div className="card-body card-padding">
                    
                    <form onSubmit={ handleSubmit(this.onSubmit) }>
                        
                        <Field component={ InputField } name="username" type="text" validate={ fieldValidations.required } />
                        <Field component={ InputField } name="password" type="text" validate={ fieldValidations.required } />

                        <div>
                            <div className="text-right">
                                {/*disabled={ !valid || submitting }*/}
                                <Button
                                    bsStyle="info" 
                                    type="submit"
                                    loading={ false }>
                                    <FormattedMessage id="submit_button" />
                                </Button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}

export default reduxForm({ form: 'AlfrescoAuthClient' })(connect(undefined, { alfProfile })(AlfrescoAuthClient))