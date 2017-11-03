/**
 * Alberto ECM 
 * (c) 2017-10-04 18:26:34 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { injectIntl, FormattedMessage } from 'react-intl'
import moment from 'moment'
import { InputField, TextAreaField } from 'alicia-common'
import Button from 'react-bootstrap-button-loader'
import { nodeToForm } from '../services/commons'
import { getCod, getCreated } from '../selectors/app'
import InformacionFEA from './InformacionFEA'


class FormRecord extends Component {

    constructor(props){
        super(props)
        this.onCloseInformacionFEA = this.onCloseInformacionFEA.bind(this)
        this.state = {
            showModal: false
        }
    }

    onCloseInformacionFEA(){
        this.setState({ ...this.state, showModal: false })
    }
    
    render(){
        const { node, valid, mode, intl } = this.props
        return (
            <div className="card">
                <div className="card-header ch-alt">
                    <h2>
                        <FormattedMessage id="form_record" />
                        <div className="pull-right">
                            <Button 
                                type="submit" 
                                className="btn-info bgm-lightblue m-r-5" 
                                loading={ this.state.submitting } 
                                disabled={ !valid }>
                                <FormattedMessage id={`${mode}_form`} />
                            </Button>

                            { mode === 'edit' && 
                                <Button 
                                    className="btn-info m-r-5" 
                                    loading={ this.state.submitting } 
                                    onClick={ this.onViewFiles }
                                    disabled={ !valid }
                                    title={ intl.formatMessage({ id: 'view_files' }) }>
                                    <i className="zmdi zmdi-attachment-alt" /> 
                                </Button>
                            }

                            { mode === 'edit' && 
                                <Button 
                                    className="btn-info bgm-deeporange waves-effect m-r-5" 
                                    loading={ this.state.submitting } 
                                    onClick={ this.onRemove }
                                    disabled={ !valid }
                                    title={ intl.formatMessage({ id: 'remove_node' }) }>
                                    <i className="zmdi zmdi-delete" /> 
                                </Button>
                            }

                        </div>
                    </h2>
                </div>
                <div className="card-body card-padding">
                    <div className="row">
                        <div className="col-sm-6">
                            <Field name="achn_aggr_nivel_clasificacion" component={ InputField }/>
                        </div>
                        <div className="col-sm-6">
                            <Field name="achn_archive_codigo" component={ InputField } />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <Field 
                                labelId="numero_ordenamiento"  
                                name="achn_record_numero_ordenamiento" 
                                component={ InputField } 
                            />
                        </div>
                        <div className="col-sm-6">
                            <Field labelId="identificador" name="achn_record_identificador" component={ InputField } />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <Field labelId="tipo_documental" name="achn_record_tipo" component={ InputField } />
                        </div>
                        <div className="col-sm-6">
                            <Field labelId="autor" name="achn_record_autor" component={ InputField } />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <Field name="achn_record_fch_creacion" component={ InputField } />
                        </div>
                        <div className="col-sm-6">
                            <Field name="achn_record_fch_finalizacion" component={ InputField } />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <Field name="cm_created" component={ InputField } />
                        </div>
                        <div className="col-sm-6">
                            <Field name="cm_name" component={ InputField } />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <Field labelId="software" name="achn_record_software" component={ InputField } readOnly />
                        </div>
                        <div className="col-sm-6">
                            <Field labelId="formato" name="mimetype" component={ InputField } readOnly />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <Field name="achn_record_responsable_fea" component={ InputField } readOnly />
                        </div>
                        <div className="col-sm-6">
                            <Field labelId="volumen" name="size" component={ InputField } readOnly />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <a onClick={ () => this.setState({ ...this.state, showModal: true })}>
                                <FormattedMessage id="show_fea_info" />
                            </a>
                        </div>
                        <div className="col-sm-6">
                            <Field labelId="soporte" name="achn_record_soporte" component={ InputField } readOnly />
                        </div>
                    </div>

                </div>
                { this.state.showModal && 
                    <InformacionFEA onClose={ this.onCloseInformacionFEA } node={node.peerAssocs['achn:signed_by' ][0]}/> 
                }
            </div>
        )
    }

    componentDidMount(){
        const { initialize, node, intl, mode } = this.props
        if(mode === 'edit'){
            initialize({ 
                ...nodeToForm(this.props), 
                cm_created: moment(getCreated(node)).format('YYYY/MM/DD HH:mm'),
                achn_record_fch_finalizacion: moment(node.properties['achn_record_fch_finalizacion']).format('YYYY/MM/DD HH:mm'),
                achn_record_fch_creacion: moment(node.properties['achn_record_fch_creacion']).format('YYYY/MM/DD HH:mm'),
                mimetype: node.mimetype,
                size: node.size,
                achn_aggr_nivel_clasificacion: 'Unidad Documental Simple'
            })
        } 
        else {
            initialize(nodeToForm(this.props))   
        }
        
    }

    componentWillUpdate(nextProps){
        // const { initialize, node, intl} = nextProps
        // const { node: currNode} = this.props
        // if(getCod(node) !== getCod(currNode)){
        //     initialize(nodeToForm(nextProps))
        // }
    }
}

export default reduxForm({ form: 'recordForm' })(injectIntl(FormRecord))