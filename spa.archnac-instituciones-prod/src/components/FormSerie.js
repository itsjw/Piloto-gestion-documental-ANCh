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
import DispositionField from './form-control/DispositionField'

class FormSerie extends Component {
    
    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.onRemove = this.onRemove.bind(this)
        this.onViewFiles = this.onViewFiles.bind(this)
        this.state = {
            submitting: false
        }
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

    onRemove(){
        const { node, alfDeleteNode, rootAggrRef, routerGo } = this.props
        this.setState({ ...this.state, submitting: true })
        alfDeleteNode(getNodeRef(node))
            .then(() => this.setState({ ...this.state, submitting: false }))
            .then(() => routerGo(`/page/classification/${nodeRefToUri(rootAggrRef)}`))
    
    }

    onViewFiles(){
        const { routerGo, node } = this.props
        routerGo(`/page/files/${nodeRefToUri(getNodeRef(node))}`)
    }

    render(){
        console.log('FormSerie.render', this.props)
        const { node, handleSubmit, mode, valid, intl } = this.props
        return (
            <form className="card" onSubmit={ handleSubmit(this.onSubmit) }>
                <div className="card-header ch-alt">
                    <h2>
                        <FormattedMessage id="form_serie" />
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
                            <Field 
                                name="achn_aggr_nivel_clasificacion" 
                                component={ InputField } 
                                readonly
                                validate={ fieldValidations.required }
                            />
                        </div>
                        <div className="col-sm-6">
                            <Field 
                                name="achn_archive_codigo" 
                                component={ InputField } 
                                readonly={ mode === 'edit' }
                                validate={ fieldValidations.required } 
                            />
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-sm-6">
                            <Field 
                                labelId="fecha_inicio" 
                                name="achn_aggr_fch_existencia" 
                                component={ DateField } 
                                defaultValue={ cond(() => moment(getAggrFchExistencia(node)), moment(), mode === 'edit') }
                             />
                        </div>
                        <div className="col-sm-6">
                            <Field name="cm_created" component={ InputField }  />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <Field 
                                name="cm_name" 
                                component={ InputField } 
                                readonly={ mode === 'edit' }
                                validate={ fieldValidations.required } 
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <Field name="achn_aggr_tipo" component={ InputField } readonly/>
                        </div>
                    </div>

                    { mode === 'edit' && 
                        <div className="row m-b-10">
                            <div className="col-sm-12">
                                <Field 
                                    name="disposition" 
                                    component={ DispositionField } 
                                    node={ condFUndef(() => getDisposalScheduler(node), mode === 'edit') } 
                                    parentRef={ condFUndef(() => getNodeRef(node), mode === 'edit') }
                                    mode={ mode }
                                    readonly
                                />
                            </div>
                        </div>
                    }

                    <div className="row">
                        <div className="col-sm-12">
                            <Field 
                                labelId="contenido" 
                                name="achn_archive_descripcion" 
                                component={ TextAreaField } 
                                fieldProps={{ rows: 5 }} 
                                validate={ fieldValidations.required }
                            />
                        </div>
                    </div>
                </div>
            </form>
        )
    }

    componentDidMount(){
        const { initialize, node, intl, mode, selectedNode } = this.props

        if(mode === 'edit'){
            initialize({ ...nodeToForm(this.props), cm_created: moment(getCreated(node)).format('YYYY/MM/DD HH:mm') })
        } else {
            initialize({
                achn_aggr_nivel_clasificacion: 'Serie',
                achn_archive_codigo: condFUndef(() => `${getCod(selectedNode)}<codigo>`, selectedNode),
                achn_aggr_tipo: 'SERIE',
                cm_created: moment().format()
            })
        }
    }

    componentWillUpdate(nextProps){
        const { formValues, selectedNode, change } = nextProps
        const { selectedNode: currSelectedNode } = this.props

        // se acaba de conectar el selected Node
        if(!currSelectedNode && selectedNode ){
            setTimeout(() => change('achn_archive_codigo', `${getCod(selectedNode)}<codigo>`))
        }

    //     const { initialize, node, intl, mode } = nextProps
    //     const { node: currNode} = this.props
    //     // if(mode === 'edit' && getCod(node) !== getCod(currNode)){
    //     //     initialize({ ...nodeToForm(nextProps), cm_created: moment(getCreated(node)).format('YYYY/MM/DD HH:mm') })
    //     // } else {
    //     //     initialize({
    //     //         achn_aggr_tipo: 'SERIE',
    //     //         cm_created: moment().format()
    //     //     })
    //     // }
    }
}

export default connect(
    (state, props) => ({ 
        rootAggrRef: condFUndef(() => getNodeRef(state.archnac.rootAggr), state.archnac.rootAggr),
        selectedNode: condFUndef(() => state.archnac.nodes[props.location.query.selectedRef], props.mode === 'new'),
        formValues: getFormValues('serieForm')(state)
    }), 
    { alfFormProcessor, reduxUpdateNode, fetchSearchReverse, routerGo, alfDeleteNode }
)(reduxForm({ form: 'serieForm' })(injectIntl(FormSerie)))
