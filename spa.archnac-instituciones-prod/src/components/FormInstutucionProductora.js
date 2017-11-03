/**
 * Alberto ECM 
 * (c) 2017-10-03 20:19:22 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, getFormValues } from 'redux-form'
import { injectIntl, FormattedMessage } from 'react-intl'
import moment from 'moment'
import { InputField, DateField, TextAreaField, getNodeRef, nodeRefToUri, fieldValidations, routerGo } from 'alicia-common'
import { TYPE_AGGR } from '../constants'
import { alfFormProcessor, reduxUpdateNode, fetchSearchReverse, alfDeleteNode } from '../actions'
import Button from 'react-bootstrap-button-loader'
import { nodeToForm, renameBy, prop, formToNode, condFUndef, cond } from '../services/commons'
import { getCod, getDisposalScheduler, getAggrFchExistencia, getCreated } from '../selectors/app'


class FormInstutucionProductora extends Component {
    
    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {}
    }

    onSubmit(values){
        const { 
            node, alfFormProcessor, reduxUpdateNode, fetchSearchReverse, routerGo, mode, rootAggrRef, location: { query: { selectedRef }}
        } = this.props
        
        this.setState({ ...this.state, submitting: true })
        const values1 = { ...values, achn_aggr_fch_existencia: values.achn_aggr_fch_existencia.format() }
        const propValues = renameBy(prop, values1)

        if(mode === 'edit'){
            const nodeRef = getNodeRef(node)
            const dotValues = formToNode(node.type, propValues)

            alfFormProcessor('node', nodeRefToUri(nodeRef), propValues)
                .then(() => reduxUpdateNode(nodeRef, dotValues))
                .then(() => this.setState({ ...this.state, submitting: false }))
        }
        else if(mode === 'new'){

            alfFormProcessor('type', TYPE_AGGR, { ...propValues, alf_destination: selectedRef, prop_achn_archive_nombre: values.cm_name })
                .then(() => fetchSearchReverse( rootAggrRef, selectedRef ))
                .then(() => routerGo(`/page/classification/${nodeRefToUri(selectedRef)}`))
                .then(() => this.setState({ ...this.state, submitting: false }) )
        }
    }

    render(){
        const { node, mode, valid, intl, handleSubmit } = this.props
        return (
            <form className="card" onSubmit={ handleSubmit(this.onSubmit) }>
                <div className="card-header ch-alt">
                    <h2>
                        Formulario: Institución Productora
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
                            <Field 
                                name="achn_aggr_nivel_clasificacion" 
                                component={ InputField }
                                validate={ fieldValidations.required }
                            />
                        </div>
                        <div className="col-sm-6">
                            <Field 
                                name="achn_archive_codigo" 
                                component={ InputField } 
                                validate={ fieldValidations.required }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <Field 
                                name="achn_aggr_tipo_entidad" 
                                component={ InputField } 
                                validate={ fieldValidations.required }
                            />
                        </div>
                        <div className="col-sm-6">
                            <Field 
                                name="achn_aggr_estatuto_juridico" 
                                component={ InputField } 
                                validate={ fieldValidations.required }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <Field 
                                name="achn_aggr_fch_existencia" 
                                component={ DateField } 
                                defaultValue={ cond(() => moment(getAggrFchExistencia(node)), moment(), mode === 'edit') }
                                validate={ fieldValidations.required }
                            />
                        </div>
                        <div className="col-sm-6">
                            <Field 
                                name="cm_created" 
                                component={ DateField } 
                                defaultValue={ cond(() => moment(node.properties['cm:created']), moment(), mode === 'edit') }
                                validate={ fieldValidations.required }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <Field 
                                name="cm_name" 
                                component={ InputField } 
                                validate={ fieldValidations.required }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <Field 
                                labelId="achn_area_relaciones" 
                                name="achn_aggr_area_relaciones" 
                                component={ InputField }
                                validate={ fieldValidations.required }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <Field 
                                name="achn_aggr_estructura_interna" 
                                component={ TextAreaField } 
                                fieldProps={{ rows: 10 }} 
                                validate={ fieldValidations.required }
                                placeholder="Estructura interna de la Institución"
                            />
                        </div>
                        <div className="col-sm-6">
                            <Field 
                                name="achn_aggr_funciones" 
                                component={ TextAreaField } 
                                fieldProps={{ rows: 10 }} 
                                validate={ fieldValidations.required }
                                placeholder="Funciones de la Institución"
                            />
                        </div>
                    </div>

                </div>
            </form>
        )
    }

    componentDidMount(){
        const { initialize, node, intl, mode } = this.props
        if(mode === 'edit'){
            initialize(nodeToForm(this.props))
        } else {
            initialize({
                achn_aggr_nivel_clasificacion: 'Institución Productora',
                achn_aggr_tipo: 'INSTITUCION_PRODUCTORA',
                cm_created: moment().format()
            })
        }
        
    }

    componentWillUpdate(nextProps){
        const { initialize, node, intl, mode } = nextProps
        const { node: currNode} = this.props

        if(mode === 'edit') {
            if(getCod(node) !== getCod(currNode)){
                initialize(nodeToForm(nextProps))
            }
        }
    }
}

export default connect(
    (state, props) => ({ 
        rootAggrRef: condFUndef(() => getNodeRef(state.archnac.rootAggr), state.archnac.rootAggr),
        selectedNode: condFUndef(() => state.archnac.nodes[props.location.query.selectedRef], props.mode === 'new'),
        formValues: getFormValues('serieForm')(state)
    }), 
    { alfFormProcessor, reduxUpdateNode, fetchSearchReverse, routerGo, alfDeleteNode }
)(reduxForm({ form: 'producerInst' })(injectIntl(FormInstutucionProductora)))