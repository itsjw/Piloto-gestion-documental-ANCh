/**
 * Alberto ECM 
 * (c) 2017-10-24 17:15:53 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { routerGo } from 'alicia-common'
import { hasGrpClfManager, PAGE_CLASSIFICATION, condFNull } from '../../services/commons'

export default connect(state => ({ user: state.app.user, pRouteClf: state.archnac.pRouteClf }), { routerGo })(
    ({ pRouteClf, user, routerGo, ...props }) => console.log(props) || condFNull(
        <li>
            <a onClick={ () => routerGo(`/page/disposition`) }>
                <div className="tm-icon" style={{ lineHeight: '12px' }}>
                    <i className="c-white tm-icon zmdi zmdi-collection-case-play"></i>
                    <small className="c-white" style={{ display: 'block' }}>
                        Disposición
                    </small>
                </div>
            </a>
        </li>, 
        hasGrpClfManager(user) && !props.location.pathname.match(`\/page\/disposition`)
    )
)