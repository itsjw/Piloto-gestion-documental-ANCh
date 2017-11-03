/**
 * Alberto ECM 
 * (c) 2017-10-03 18:01:25 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getNodeRefFromProps } from '../selectors/app'
import Form from './Form'

export default connect(
    (state, props) => ({ nodeRef: getNodeRefFromProps(props), node: state.archnac.nodes[getNodeRefFromProps(props)] })
)(props => (
    <div className="row f-h m-t-10">
        { props.node && <Form { ...props } mode="edit" /> }
        { /form:\/\/\w+\/new/.test(props.nodeRef) && <Form { ...props } mode="new" /> }
    </div>
))