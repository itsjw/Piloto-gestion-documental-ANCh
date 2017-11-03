/**
 * Alberto ECM 
 * (c) 2017-10-04 00:36:54 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, { Component } from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { SelectField, InputField, DateField, TextAreaField, getNodeRef, nodeRefToUri, fieldValidations } from 'alicia-common'
import Button from 'react-bootstrap-button-loader'
import { injectIntl, FormattedMessage } from 'react-intl'
import moment from 'moment'
import { nth, formIsAnual, formIsDaily, condFUndef, cond, propdot, renameBy } from '../services/commons'
import { alfFormProcessor, fetchSearchReverse, alfAddAggr } from '../actions'
import { TYPE_DISPOSAL_SCHEDULE } from '../constants'
import { 
    getAggrDispositionType, getDispositionTypes, getAggrAlcanceUnidad, getFrecuencyTypes, getAggrObservacion, getAggrValorDocumental,
    getRecordValues, getAggrFchInicio, getAggrAlcance
} from '../selectors/app'

const fillValLabel = n => {
    let l = []
    for (var i = 1; i <= n; i++) { l.push({ value: i, label:  `${ i < 10 ?'0':''}${i}`}) }
    return l
}


class DispositionConfig extends Component {
    
    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeFrecuency = this.onChangeFrecuency.bind(this)

        const { intl } = props

        this.state = {
            submitting: false,
        }
    }

    getDispositionType(node){
        const { intl } = this.props
        return R.find(type => type.value === getAggrDispositionType(node), getDispositionTypes(intl))
    }

    getFrecuencyType(node){
        const { intl } = this.props
        return R.find(type => type.value === getAggrAlcanceUnidad(node), getFrecuencyTypes(intl))
    }

    getRecordValue(node){
        const { intl } = this.props
        return R.find(type => type.value === getAggrValorDocumental(node), getRecordValues(intl))
    }

    getDispositionEach(node){
        const i = getAggrAlcance(node)
        return ({ value: i, label: `${ i < 10 ?'0':''}${i}` })
    }

    onSubmit(values){
        
        console.log('DispositionConfig.onSubmit', values)
        
        const { alfFormProcessor, fetchSearchReverse, alfAddAggr, node, onClose, parentRef, rootAggrRef } = this.props

        const params = {
            prop_achn_aggr_alcance: values.disposition_each.value,
            prop_achn_aggr_alcance_unidad: values.disposition_frecuency.value,
            prop_achn_aggr_disposicion_type: values.disposition_type.value,
            prop_achn_aggr_valor_documental: values.disposition_record_value.value,
            prop_achn_aggr_fch_inicio: values.disposition_start_on.format(),
            prop_achn_aggr_observacion: values.disposition_observations

        }

        this.setState({ ...this.state, submitting: true })

        //update
        if(node){

            alfFormProcessor('node', nodeRefToUri(getNodeRef(node)), params)
                .then(() => this.setState({ ...this.state, submitting: false }))
                .then(() => onClose(true, params, getNodeRef(node)) )
        } 
        // create
        else {
            const payload = { p: {
                parentRef,
				type: { type: TYPE_DISPOSAL_SCHEDULE, props: renameBy(propdot, params) },
				assoc: { type: 'achn:disposal_scheduler', name: (new Date()).getTime() }
            }}
            alfAddAggr(payload)
                .then(() => this.setState({ ...this.state, submitting: false }))
                .then(() => fetchSearchReverse( rootAggrRef, parentRef ))
                .then(() => onClose(false) )
        }

        
        
    }

    onChangeFrecuency(event, disposition_frecuency ){

        // const { change } = this.props
        // this.setState({ ...this.state, disposition_frecuency })

        // if(disposition_frecuency.value === 'por_dias'){
        //     setTimeout(() => change('disposition_by_days_each', this.selectOptions.disposition_by_days_each[0]))
        // }
        // else if(disposition_frecuency.value === 'por_semanas'){
        //     // setTimeout(() => change('disposition_by_weeks_each', this.selectOptions.disposition_by_weeks_each[0]))
        // }
        // else if(disposition_frecuency.value === 'por_meses'){
        //     setTimeout(() => change('disposition_by_months_each', this.selectOptions.disposition_by_months_each[0]))
        // }
        // else if(disposition_frecuency.value === 'por_annos'){
        //     setTimeout(() => change('disposition_each', this.selectOptions.disposition_each[0]))
        // }

    }

    render(){
        console.log('DispositionConfig.render', this.props)
        const { onClose, handleSubmit, intl, node, formValues } = this.props
        const maxVal = formIsAnual(formValues) ? 10 : formIsDaily(formValues) ? 30 : 4
        return (
            <Modal show onHide={ () => onClose() }>
                <form onSubmit={ handleSubmit(this.onSubmit) }>
                    <Modal.Header closeButton>
                        <Modal.Title>Configurar plan de disposición de la serie </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row m-b-20">
                            <div className="col-sm-4">
                                <Field 
                                    name="disposition_type" 
                                    component={ SelectField }
                                    options={ getDispositionTypes(intl) }
                                    displayOptions={{ clearable: false }}
                                    validate={ fieldValidations.required }
                                />
                            </div>
                            <div className="col-sm-4">
                                <Field 
                                    name="disposition_frecuency" 
                                    component={ SelectField }
                                    options={ getFrecuencyTypes(intl) }
                                    displayOptions={{ clearable: false }}
                                    onChange={ this.onChangeFrecuency }
                                    validate={ fieldValidations.required }
                                />
                            </div>
                            <div className="col-sm-4">
                                <div className="flex flex-center">
                                    <div className="flex-1">
                                        <Field 
                                            name="disposition_each" 
                                            labelId="disposition_by_each"
                                            component={ SelectField }
                                            options={ fillValLabel(maxVal) }
                                            displayOptions={{ clearable: false }}
                                            validate={ fieldValidations.required }
                                        />
                                    </div>
                                    <div className="flex-0 p-t-10 p-l-10">
                                        { formIsAnual(formValues) && <FormattedMessage id="years" /> }
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row m-b-20">
                            <div className="col-sm-4">
                                <Field 
                                    name="disposition_record_value" 
                                    component={ SelectField }
                                    options={ getRecordValues(intl) }
                                    displayOptions={{ clearable: false }}
                                    validate={ fieldValidations.required }
                                />
                            </div>
                            <div className="col-sm-4">
                                <Field 
                                    name="disposition_start_on" 
                                    component={ DateField }
                                    defaultValue={ cond(() => moment(getAggrFchInicio(node)), moment(), node) }
                                    onChange={ this.onChangeFrecuency }
                                />
                            </div>
                            <div className="col-sm-4">
                                <Field name="disposition_volumen" component={ InputField } readOnly />
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <Field 
                                    name="disposition_observations" 
                                    component={ TextAreaField }
                                    fieldProps={{ rows: 5 }} 
                                />
                            </div>
                        </div>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" loading={ this.state.submitting } className="btn-info">Confirmar</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        )
    }

    componentDidMount(){
        const { initialize, intl, node } = this.props
        
        node && initialize({
            disposition_type: this.getDispositionType(node),
            disposition_frecuency: this.getFrecuencyType(node),
            disposition_record_value: this.getRecordValue(node),
            disposition_start_on: getAggrFchInicio(node),
            disposition_each: this.getDispositionEach(node),
            disposition_volumen: '10 Gb',
            disposition_observations: getAggrObservacion(node)
        })
    }
}

export default connect(
    state =>({ 
        rootAggrRef: getNodeRef(state.archnac.rootAggr),
        formValues: getFormValues('dispositionConfig')(state) 
    }),
    { alfFormProcessor, fetchSearchReverse, alfAddAggr }
)(reduxForm({ form: 'dispositionConfig' })(injectIntl(DispositionConfig)))
