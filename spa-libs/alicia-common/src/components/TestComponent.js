/**
 * Alberto ECM 
 * (c) 2017-08-18 02:02:28 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import moment from 'moment'
import "alicia-ui"
import { 
    MODULE, TEST_ACTION, 
    SelectField, InputField, DateField, fieldValidations 
} from '../export'

class Test extends Component {
    
    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(values){
        const { actionName: type, actionValue } = values
        const { dispatch } = this.props
        console.log(values)
        dispatch({ type, actionValue })
    }

    render(){
        console.info('Test.render', this.props)
        const { reduxState, handleSubmit } = this.props
        return (
            <div className="card">
                <div className="card-header ch-alt">
                    <h2>Test Component </h2>
                    <small>Paquete: { MODULE }</small>
                </div>
                <div className="card-body card-padding">
                    <form onSubmit={ handleSubmit(this.onSubmit) }>
                        <a>Enviar una acción</a>
                        <Field 
                            component={ SelectField } 
                            name="actionName" 
                            options={[
                                { value: TEST_ACTION, label: TEST_ACTION },
                                { value: `${MODULE}/UNSUPORTED_TYPE`, label: `${MODULE}/UNSUPORTED_TYPE`  }
                            ]}
                            validate={ fieldValidations.required }
                            displayOptions={{ showLabel: false, clearable: false }}
                            onChange={ (e, val, oldVal) => console.log(val, oldVal)}>
                        </Field>
                        <Field 
                            component={ InputField } 
                            name="actionValue" 
                            type="text" 
                            validate={ fieldValidations.required }
                        />
                        <Field 
                            component={ DateField } 
                            name="dateField"
                            defaultValue={ moment() } 
                        />
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        )
    }

    componentDidMount(){
        const { initialize } = this.props
        // initialize({ actionName: TEST_ACTION })
    }
}

export default reduxForm({ form: 'testComponent' })(Test)