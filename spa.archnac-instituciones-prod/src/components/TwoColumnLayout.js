/**
 * Alberto ECM 
 * (c) 2017-10-02 17:23:29 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { alfProfileCookies } from 'alicia-common'
import { fetchRoot } from '../actions'
import { getHeaderSkin } from '../selectors/app'
import Header from './Header'
import PageSearch from './PageSearch'
import PageDisposition from './PageDisposition'
import PageSip from './PageSip'
import SideBarLeftClassification from './SideBarLeftClassification'
import SideBarLeftStart from './SideBarLeftStart'
import Classification from './Classification'
import Audits from './Audits'
import FilesView from './FilesView'

class TwoColumnLayout extends Component {
    
    render(){
        const { isReady } = this.props
        return isReady ? (
            <div className="f-h">
                
                <section id="main" style={{ height: 'calc(100% - 70px)', marginTop: 120, padding: 0 }}>
                    <section id="content" className="f-h">
                        <div className="container f-h">
                            <Route path="/page/disposition" component={ PageDisposition } />
                            <Route path="/page/sips" component={ PageSip } />

                            <div className="p-relative" style={{ marginLeft:  268 }}>
                                {/*Rutas anidadas*/}
                                <Route path="/page/start" component={ PageSearch } />

                                <Route exact path="/page/files/:storeProtocol/:storeId/:uuid" component={ FilesView } />
                                <Route exact path="/page/classification/:storeProtocol/:storeId/:uuid" component={ Classification } />
                                <Route exact path="/page/classification" component={ Classification } />

                                <Route exact path="/page/audits/:storeProtocol/:storeId/:uuid" component={ Audits } />
                            </div>
                        </div>
                    </section>
                </section>
               
                
                <Route exact path="/page/classification/:storeProtocol/:storeId/:uuid" component={ SideBarLeftClassification } />
                <Route exact path="/page/audits/:storeProtocol/:storeId/:uuid" component={ SideBarLeftClassification } />
                <Route exact path="/page/files/:storeProtocol/:storeId/:uuid" component={ SideBarLeftClassification } />
                <Route exact path="/page/classification" component={ SideBarLeftClassification } />
                <Route exact path="/page/start" component={ SideBarLeftStart } />
                {/*<SideBarLeft />*/}
                
                <Route path="/page" component={ () => <Header id="header" skin={ getHeaderSkin() } pageName="Tesla" /> } />
            </div>
        ): null
    }

    componentDidMount(){
        const { alfProfileCookies, loginPage, fetchRoot } = this.props
        alfProfileCookies()
        fetchRoot()
    }
}

export default connect(state => ({ isReady: state.app.user }), { alfProfileCookies, fetchRoot })(TwoColumnLayout)