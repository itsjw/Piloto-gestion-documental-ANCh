/**
 * Alberto ECM 
 * (c) 2017-10-02 17:30:33 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { SelectField, routerGo } from 'alicia-common'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import Breadcrumb from './Breadcrumb'
import BreadcrumbSearch from './BreadcrumbSearch'
import BreadcrumbDisposition from './BreadcrumbDisposition'
import attLogo from '../assets/images/Logo-ATTA-RGB.jpg'
import SearchInputField from './form-control/SearchInputField'
import HeaderClassificationManager from './header/HeaderClassificationManager'
import HeaderFront from './header/HeaderFront'
import HeaderDisposition from './header/HeaderDisposition'

class Header extends Component {

    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.onMenuTrigger = this.onMenuTrigger.bind(this)
    }

    onMenuTrigger(){

    }

    onSubmit(values){
        console.log('submit this form, with this values', values)
        const { routerGo } = this.props
        routerGo(`/page/start`, {
            text: values.searchParams
        })
    }
    
    render(){
        console.log('Header.render', this.props)
        const { skin, id, handleSubmit, intl, isSearching, location: { pathname }, routerGo } = this.props

        const isFront = /page\/start/.test(pathname)
        return (
            <div>
                <header id={ id } data-current-skin={ skin } className="search-toggled">
                    <div className="flex">
                        <div className="flex-0">
                            <ul className="header-inner clearfix ">
                                <li 
                                    id="menu-trigger" 
                                    onClick={ this.onMenuTrigger }
                                    className={ "" /*showFilterSiderBar ?"open" :""*/}>
                                    <div className="line-wrap">
                                        <div className="line top"></div>
                                        <div className="line center"></div>
                                        <div className="line bottom"></div>  
                                    </div>
                                </li>
                                <li>
                                    <a onClick={ undefined }>
                                        <img src={ attLogo } alt="" style={{ height: 32 }} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="flex-1 flex p-relative">
                            <div className="flex-1">
                                <form 
                                    id="top-search-wrap" 
                                    style={{ background: 'inherit', position: 'inherit' }} 
                                    onSubmit={ handleSubmit(this.onSubmit) }>
                                    <div className="tsw-inner">
                                        <Field name="searchParams" type="text" component={ SearchInputField } /> 
                                        <button 
                                            id="top-search-close" 
                                            className="btn btn-link" 
                                            style={{ left: 'unset', right: 15 }}
                                            type="submit">
                                            <i  
                                                className={ classNames('p-relative zmdi', {
                                                    'zmdi-rotate-right zmdi-hc-spin': isSearching,
                                                    'zmdi-search': !isSearching
                                                })} 
                                                style={{ top: -2 }} 
                                                onClick={ undefined } 
                                            />
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="flex-0">
                                <ul className="header-inner clearfix" style={{ zIndex: 11, display: 'inline-block' }}>
                                    <li>
                                        <ul className="top-menu">
                                            <HeaderClassificationManager { ...this.props }/>
                                            <HeaderDisposition { ...this.props } />
                                            <HeaderFront { ...this.props } />
                                            
                                            <li>
                                                <a 
                                                    onClick={ () => routerGo(`/login`, { 
                                                        redirect: `/page/start`}) 
                                                    }>
                                                    <div className="tm-icon" style={{ lineHeight: '12px' }}>
                                                        <i className="c-white tm-icon zmdi zmdi-account"></i>
                                                        <small className="c-white" style={{ display: 'block' }}>elazo</small>
                                                    </div>
                                                </a>
                                            </li>                      
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="f-w p-fixed" style={{ top: 70, zIndex: 6 }}>
                    <Route exact path="/page/classification/:storeProtocol/:storeId/:uuid" component={ Breadcrumb } />
                    <Route exact path="/page/audits/:storeProtocol/:storeId/:uuid" component={ Breadcrumb } />
                    <Route exact path="/page/files/:storeProtocol/:storeId/:uuid" component={ Breadcrumb } />
                    <Route exact path="/page/classification" component={ Breadcrumb } />
                    <Route path="/page/start" component={ BreadcrumbSearch } />
                    <Route path="/page/disposition" component={ BreadcrumbDisposition } />
                </div>
            </div>
        )
    }

    componentDidMount(){
        const { location: { query: { text }}, initialize } = this.props
        if(text){
            initialize({ searchParams: text })
        }
    }
}

export default connect(undefined, { routerGo })(withRouter(reduxForm({ form: 'headerForm' })(Header)))