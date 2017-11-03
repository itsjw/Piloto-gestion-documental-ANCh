import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import TwoColumnLayout from './components/TwoColumnLayout'
import Login from './components/Login'
import { MODULE } from './services/commons'


export default connect(state => ({ isReady: state.app.bundles[MODULE]}))(({ isReady}) => isReady ?(
    <div className="f-h">
        <Route exact path="/login" component={ Login } />
        <Route path="/page" component={ TwoColumnLayout } />
        
    </div>
): (
    <div>
        cargando...
    </div>
))
