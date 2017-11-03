/**
 * Alberto ECM 
 * (c) 2017-09-29 12:13:03 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */
import React, { Component } from 'react'
import AlfrescoClient from './AlfrescoClient'
import AlfApiClasses from './AlfApiClasses'


class App extends Component {
    
    render(){
        return (
            <div className="row p-10">
                <div className="col-xs-12 col-sm-6 col-lg-3">
                    <AlfrescoClient />
                </div>

                <div className="col-xs-12 col-sm-6 col-lg-3">
                </div>

                <div className="col-xs-12 col-sm-6 col-lg-3">
                </div>
            </div>
        )
    }
}

export default App