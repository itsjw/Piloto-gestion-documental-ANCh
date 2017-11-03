/**
 * Alberto ECM 
 * (c) 2017-09-29 11:58:27 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, { Component } from 'react'
import { Route, withRouter  } from 'react-router-dom'
class AlfApiClasses extends Component {
    
    render(){
        console.log('AlfApiClasses.render', this.props)
        return (
            <div>
                some val Class
            </div>
        )
    }
}

export default withRouter(AlfApiClasses)