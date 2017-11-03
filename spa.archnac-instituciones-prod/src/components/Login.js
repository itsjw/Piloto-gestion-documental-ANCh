/**
 * Alberto ECM 
 * (c) 2017-10-24 11:55:22 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { FormattedMessage } from 'react-intl'
import { InputField, fieldValidations, alfLogin } from 'alicia-common'
import Button from 'react-bootstrap-button-loader'
import './Login.css'
import { getLoginLogo } from '../selectors/app'

class Login extends Component {

    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            loading: false
        }
    }
    
    onSubmit(credentials){
        const { alfLogin, location: { query: { redirect }}} = this.props
        this.setState({ ...this.state, loading: true })

        alfLogin(credentials)
            .then(() => this.setState({ ...this.state, loading: false }))
            .then(() => window.location.href = redirect )
            .catch(err => this.setState({ ...this.state, loading: false, loginError: true }))
    }

    render(){
        const { handleSubmit } = this.props
        return (
            <form className="login-content" onSubmit={ handleSubmit(this.onSubmit) }>
                
                <div className="lc-block toggled text-left" id="l-login">

                    <div className="input-group m-b-20">
                        <h2 className="c-default">
                            <div className="pull-left m-r-10">
                                <img className="logo64" src={ getLoginLogo() } />
                            </div>
                            <FormattedMessage id="login_header" />
                        </h2>
                    </div>
                    { this.state.loginError &&
                        <div className="input-group m-b-20 has-error">
                            <span className="input-group-addon c-white">
                                <i className="zmdi zmdi-alert-circle-o" style={{ position: 'inherit'}} /> <FormattedMessage 
                                    id="login_fail" 
                                />
                            </span>
                        </div>
                    }
                    <Field name="username" component={ InputField } validate={[ fieldValidations.required ]} />

                    <Field name="password" component={ InputField } type="password" validate={[ fieldValidations.required ]} />


                    <div className="clearfix"></div>

                    <div className="m-t-5">
                        <Button className="btn btn-info btn-block bgm-lightblue" type="submit" loading={ this.state.loading }>
                            <FormattedMessage id="login_in" />
                        </Button>
                    </div>
                </div>
            </form>
        )
    }
}

export default connect(undefined, { alfLogin })(reduxForm({ form: 'loginForm' })(Login))