/**
 * Alberto ECM 
 * (c) 2017-09-29 12:07:05 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link  } from 'react-router-dom'
import { routerGo } from '../export'
import App from './App'
import AlfApiClasses from './AlfApiClasses'
import Header from './Header'
import Services from './Services'
import TestComponent from './TestComponent'
import AlfrescoAuthClient from './AlfrescoAuthClient'
import ReduxState from './ReduxState'
import TestModal from './TestModal'

class SampleLayout extends Component {
    
    constructor(props){
        super(props)
        this.onClickHome = this.onClickHome.bind(this)
    }

    onClickHome(){
        const { routerGo } = this.props
        routerGo('/', { test: 'val' })
    }

    render(){
        console.log('SampleLayout.render', this.props)
        return (
            <div className="f-h flex flexcol">    
                <Header />
                <section id="main" className="lex flexrow flex-1 f-w f-h p-b-0" style={{ paddingTop: 115 }}>
                    <section id="content">
                        <div className="container">
                            <div className="p-5">
                                <a onClick={ this.onClickHome }>home</a>
                                <br/>
                                
                                <Link to="/messages/example">Trabajo con i18n</Link>
                                <br />

                                <Link to="/redux/example">Trabajo con redux</Link>
                                <br />

                                <Link to="/alfresco/login">Formulario de Autenticación con Alfresco</Link>
                                <br />

                                <Link to="/api/classes">LLamar /api/classes servicio de Alfresco</Link>
                                <br />

                                <Link to="/test/modal">LLamar /api/classes servicio de Alfresco</Link>
                            </div>

                            <div className="col-xs-12 col-sm-6 col-lg-3">
                                {/*Rutas anidadas*/}
                                <Route path="/messages/example" component={ Services }/>
                                <Route path="/redux/example" component={ TestComponent }/>
                                <Route path="/alfresco/login" component={ AlfrescoAuthClient }/>
                                <Route path="/api/classes" component={ AlfApiClasses } />
                                <Route path="/test/modal" component={ TestModal } />
                            </div>
                            <div className="col-xs-12 col-sm-6 col-lg-3">
                                <ReduxState />
                            </div>
                            
                        </div>
                    </section>
                </section>
            </div>
        )
    }
}

export default connect(undefined, { routerGo })(SampleLayout)