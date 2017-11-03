/**
 * Alberto ECM 
 * (c) 2017-10-04 19:54:18 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { InputField } from 'alicia-common'
import { injectIntl } from 'react-intl'
import { nodeToForm, findNode } from '../services/commons'
import { connect } from 'react-redux'
import { Pagination } from 'react-bootstrap'
import data from './ClassificationSampleData.json'
import data1 from './AuditsSampleData.json'

class Audits extends Component {
    
    render(){
        console.log('Audits.render', this.props)
        return (
            <div className="p-relative" style={{ marginLeft:  268 }}>
                <div className="row f-h m-t-10">
                    <div className="card">
                        <div className="card-body card-padding">
                            <div className="row">
                                <div className="col-sm-6">
                                    <Field name="level" component={ InputField }/>
                                </div>
                                <div className="col-sm-6">
                                    <Field name="cod_clasificacion" component={ InputField }/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="table-responsive f-h"  style={{ overflowY: 'auto' }}>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Evento</th>
                                                <th>Unidad Productora</th>
                                                <th>Serie</th>
                                                <th>Tipo documental</th>
                                                <th>Fecha</th>
                                                <th>Usuario</th>
                                                <th>Objeto</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { data1.map((info, index) => 
                                                <tr key={ index }>
                                                    <td>{ info.evento }</td>
                                                    <td>{ info.producer_unit} </td>
                                                    <td>{ info.serie }</td>
                                                    <td>{ info.tipo_documental }</td>
                                                    <td>{ info.fecha }</td>
                                                    <td>{ info.usuario}</td>
                                                    <td><a>{ info.object }</a></td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    <div className="m-t-20 text-center">
                                        <Pagination 
                                            prev 
                                            next 
                                            first 
                                            last 
                                            boundaryLinks 
                                            maxButtons={ 1 }
                                            items={ Math.ceil(data.length / 50) }
                                            style={{ margin: 0 }}
                                            activePage={ 1 }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount(){
        const { initialize, node, intl } = this.props
        //initialize(nodeToForm(this.props))
    }
}

export default connect((state, props) => ({
    node: findNode('achn:identificador', props.match.params.classificationId,  data)
}))(reduxForm({ form: 'audits'})(injectIntl(Audits)))