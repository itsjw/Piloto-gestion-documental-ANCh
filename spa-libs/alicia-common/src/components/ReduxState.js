/**
 * Alberto ECM 
 * (c) 2017-09-11 14:01:26 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MODULE } from '../export'
class ReduxState extends Component {
    
    render(){
        const { reduxState } = this.props
        return (
            <div className="card">
                <div className="card-header ch-alt">
                    <h2>Redux State</h2>
                    <small>Paquete: { MODULE }</small>
                </div>
                <div className="card-body card-padding">
                    <pre><code>{ JSON.stringify(reduxState, null, 2)}</code></pre>
                </div>
            </div>
        )
    }
}

export default connect(state => ({ reduxState: state }))(ReduxState)