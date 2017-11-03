/**
 * Alberto ECM 
 * (c) 2017-09-11 13:57:32 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { MODULE, combineMessages } from '../export'

class Services extends Component {
    //
    constructor(props){
        super(props)
        this.combineMessages = this.combineMessages.bind(this)
        this.state = {
            translate: false
        }
    }

    combineMessages(){
        const { loadedMessage } = this.props
        if(!loadedMessage){
            combineMessages(() => import(`../i18n/es.json`).then(message => ({ bundleId: MODULE, message })))    
        }
        
    }

    render(){
        const { loadedMessage } = this.props
        const { translate } = this.state
        return (
            <div className="card">
                <div className="card-header ch-alt">
                    <h2>Services</h2>
                    <small></small>
                </div>
                <div className="card-body card-padding">
                    <button className="btn btn-link" onClick={ this.combineMessages }>
                        { translate && <FormattedMessage id="combine_messages" /> }
                        { !translate && 'combine_messages' }
                    </button>
                </div>
            </div>
        )
    }

    componentWillUpdate(nextProps){
        if(nextProps.loadedMessage && !this.props.loadedMessage){
            alert('los mensajes han sido cargados')
            setTimeout(() => this.setState({ ...this.state, translate: true }))
        }
    }
}

export default connect(state => ({ loadedMessage: state.app.bundles[MODULE] }))(Services)