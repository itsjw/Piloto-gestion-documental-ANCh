/**
 * Alberto ECM 
 * (c) 2017-08-18 01:26:34 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { IntlProvider, addLocaleData } from 'react-intl'
import es from 'react-intl/locale-data/es'
import { AlertList } from "react-bs-notifier"
import { store } from '../services/store'
import { browserLng } from '../services/messages'

addLocaleData([ ...es ])

class _DoxIntlProvider extends Component {
    render(){
        const { notifications } = this.props
        console.log('_DoxIntlProvider.render', this.props)
        return (
            <IntlProvider locale={ browserLng } messages={ this.props.messages }>
                <div className="f-h">
                    <AlertList
                        showIcon={ false }
                        className="bgm-indigo growl-animated animated fadeInDown"
                        position="bottom-left"
                        alerts={ notifications }
                        onDismiss={ this.onAlertDismissed }
                    />
                    <div className="f-h">
                        {this.props.children}
                    </div>
                </div>
            </IntlProvider>
        )
    }
}

const DoxIntlProvider = connect(state => ({ 
    messages: state.app.messages,
    notifications: state.notifications
}))(_DoxIntlProvider)

class DoxPlatform extends Component {
    
    render(){
        console.log('DoxPlatform.render')
        return (
            <Provider store={ store }>
                <DoxIntlProvider>{ this.props.children }</DoxIntlProvider>
            </Provider>
        )
    }
}

export default DoxPlatform