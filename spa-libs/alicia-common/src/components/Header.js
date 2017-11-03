/**
 * Alberto ECM 
 * (c) 2017-09-29 16:25:00 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
class Header extends Component {
    
    render(){
        console.log('Header.render', this.props)
        return (
            <header id="header" data-current-skin="lightblue" >
                <div className="flex">
                    <div className="flex-0">
                        <ul className="header-inner clearfix ">
                            <li className="hidden-xs">
                                <a onClick={ e => undefined }>
                                    <h1 className="ttcheck-header c-white">
                                        <span style={{ margin: '0 5px' }}>SomeLabel</span>
                                        <small className="c-white">Some desc</small>
                                    </h1>
                                </a>
                            </li>  
                        </ul>
                    </div>
                    <div className="flex-1 p-relative">

                    </div>
                </div>
            </header>
        )
    }
}

export default withRouter(Header)