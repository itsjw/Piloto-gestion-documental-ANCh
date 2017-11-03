/**
 * Alberto ECM 
 * (c) 2017-10-04 19:07:24 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { SelectField, InputField, DateField, TextAreaField, alfFindNode, getNodeRef, nodeRefToUri } from 'alicia-common'
import { nodeToForm } from '../services/commons'
import moment from 'moment'

class InformacionFEA extends Component {
    
    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(){

    }

    render(){
        const { handleSubmit, onClose } = this.props
        return (
            <Modal show onHide={ onClose }>
                <form onSubmit={ handleSubmit(this.onSubmit) }>
                    <Modal.Header closeButton>
                        <Modal.Title>Información de la firma electrónica avanzada</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row m-b-20">
                            <div className="col-sm-6">
                                <Field labelId="entidad" name="achn_fea_entidad" component={ InputField } />
                            </div>
                            <div className="col-sm-6">
                                <Field name="titular" component={ InputField } />
                            </div>
                            <div className="col-sm-6">
                                <Field name="achn_fea_fch_ini" labelId="fecha_certificado" component={ InputField } />
                            </div>
                            <div className="col-sm-6">
                                <Field name="fecha_vencimiento_certificado" name="achn_fea_fch_expira" component={ InputField } />
                            </div>
                            <div className="col-sm-12">
                                <Field labelId="cargo" name="achn_fea_cargo" component={ InputField } />
                            </div>
                        </div>
                    </Modal.Body>
                </form>
            </Modal>
        )
    }

    componentDidMount(){
        const { initialize, node, alfFindNode } = this.props
        console.log(node)
        
        alfFindNode(nodeRefToUri(getNodeRef(node)))
        // , {
        //     entidad: 'Acepta Chile',
        //     titular: 'Sebastián Rivas Anguita',
        //     fecha_certificado: moment().format(),
        //     fecha_vencimiento_certificado: moment().format(),
        //     cargo: 'Jefe Unidad Administradora de los Tribunales Tributarios y Aduaneros'
        // })
    }

    componentWillUpdate(nextProps){
        const { nodeLoaded } = nextProps
        const { nodeLoaded: currNodeLoaded, initialize } = this.props
        if(nodeLoaded && !currNodeLoaded){
            const titular = nodeLoaded.peerAssocs['achn:fea_titular_certificado'][0]
            setTimeout(() => initialize({ 
                ...nodeToForm({ node: nodeLoaded }),
                achn_fea_fch_expira: moment(nodeLoaded.properties['achn:fea_fch_expira']).format('YYYY/MM/DD HH:mm'),
                achn_fea_fch_ini: moment(nodeLoaded.properties['achn:fea_fch_ini']).format('YYYY/MM/DD HH:mm'),
                titular: `${titular.properties['cm:firstName']} ${titular.properties['cm:lastName']}`
            }))
        }
    }
}

export default connect(
    (state, props) => ({ nodeLoaded: state.archnac.nodes[getNodeRef(props.node)] }), 
    { alfFindNode }
)(reduxForm({ form: 'informacionFea' })(InformacionFEA))