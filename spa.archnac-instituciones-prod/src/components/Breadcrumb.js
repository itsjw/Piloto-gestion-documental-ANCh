/**
 * Alberto ECM 
 * (c) 2017-10-04 19:30:44 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { routerGo, SelectField } from 'alicia-common'
import { injectIntl, FormattedMessage } from 'react-intl'
import { reduxForm, Field } from 'redux-form'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import { getNodeRefFromProps } from '../selectors/app'
import './Breadcrumb.css'

class Breadcrumb extends Component {
    
    renderClassification(){
        console.log('Breadcrumb.render', this.props)
        const { routerGo, intl, selectedRef } = this.props
        const id = this.props.location.pathname.replace(/\/page\/\w+\//, '')
        return (
            <div className="flex flexrow bgm-white deep-shadow">
                <div className="p-t-15 p-l-15 p-b-5">{/*style={{ minWidth: 256 }}*/}
                    <DropdownButton 
                        id="new-button" 
                        title={ intl.formatMessage({ id: 'new_button' }) }
                        bsStyle="info" 
                        className="inbox-label">
                        <MenuItem eventKey="id02" onClick={ () => routerGo(`/page/classification/form/ip/new`, { selectedRef }) }>
                            <div className="p-10">Nueva Institución Productora</div>
                        </MenuItem>
                        <MenuItem eventKey="id02" onClick={ () => routerGo(`/page/classification/form/up/new`, { selectedRef }) }>
                            <div className="p-10">Nueva Unidad Productora</div>
                        </MenuItem>
                        <MenuItem eventKey="id01" onClick={ () => routerGo(`/page/classification/form/serie/new`, { selectedRef }) }>
                            <div className="p-10"><FormattedMessage id="create_serie" /></div>
                        </MenuItem>
                    </DropdownButton>
                </div>
                <div className="flex-1 f-w">
                    <div className="f-w flex flexrow f-h">
                        <div className="flex flex-center flex-1 p-l-15 p-r-15 f-h flexrow f-w">
                            {/*<div className="flex flex-1 flex-justify-center flex-center">
                                <ol className="breadcrumb m-0">
                                    <li><a>Home</a></li>
                                    <li className="active">Library</li>
                                </ol>
                            </div>*/}
                        </div>
                    </div>
                </div>
                <div className="flex flex-0 flex-justify-end">
                    {/*<div className="flex flex-1">
                        <div className="flex flex-center flex-justify-end">
                            <div className="m-r-10">
                                <a onClick={ () => {
                                    console.log(this.props)
                                    routerGo(`/page/audits/${id}`)
                                }}>Auditorias</a>
                                &nbsp;|&nbsp;
                                <a>Accesos</a>
                            </div>
                        </div>
                    </div>*/}
                </div>
            </div>
        )
    }

    renderDisposition(){
        const { routerGo, match: { params: { classificationId  }}} = this.props
        return (
            <div className="flex flexrow bgm-white deep-shadow">
                <div className="p-t-15 p-l-15 p-b-5">{/*style={{ minWidth: 256 }}*/}
                </div>
                <div className="flex-1 f-w">
                    <div className="f-w flex flexrow f-h">
                        <div className="flex flex-center flex-1 p-l-15 p-r-15 f-h flexrow f-w">
                            <div className="flex flex-1 flex-justify-center  p-t-5">
                                <div>
                                    <div className="btn btn-info bgm-lightblue m-t-5">
                                        Seleccionar Todos
                                    </div>
                                </div>
                                <div className="m-l-10" style={{ display: 'inline-block', minWidth: 150 }}>
                                    <Field 
                                        name="select_action" 
                                        component={ SelectField } 
                                        displayOptions={{ showLabel: false, clearable: false }}
                                        options={[
                                            { value: 1, label: 'Transferir' },
                                            { value: 2, label: 'Expurgar' }
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-0 flex-justify-end">
                    <div className="flex flex-1">
                        <div className="flex flex-center flex-justify-end">
                            <div className="m-r-10">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render(){
        const { location: { pathname }} = this.props
        

        if(pathname === '/page/disposition'){
            return this.renderDisposition()
        }
        else {
            return this.renderClassification()
        }

        return null
    }

    componentDidMount(){
        const { initialize } = this.props
        initialize({
            select_action: { value: 1, label: 'Transferir' }
        })
    }
}

export default connect(
    (state, props) => ({ selectedRef: getNodeRefFromProps(props)}), 
    { routerGo }
)(reduxForm({ form: 'breadcrumb' })(injectIntl(Breadcrumb)))