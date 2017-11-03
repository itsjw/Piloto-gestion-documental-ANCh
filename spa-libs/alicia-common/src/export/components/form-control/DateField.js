/**
 * Alberto ECM 
 * (c) 2017-10-04 13:55:33 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

/**
 * Alberto ECM 
 * (c) 2017-05-18 17:23:45 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import Datetime from 'react-datetime'
import classNames from 'classnames'
import { change } from 'redux-form'
import moment from 'moment'
import 'react-datetime/css/react-datetime.css'

class Date extends Component {
    
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        // console.log('Date.render', this.props)
        const { input, className, defaultValue, meta: { dispatch, form, error }, labelId } = this.props
        const fieldClass = classNames({ 'form-group': true, 'has-error': error, 'fg-line': true }, className )
        const labelId1 = labelId || input.name
        
        if(defaultValue && !this.state[input.name]) {
            setTimeout(() => {
                dispatch(change(form, input.name, defaultValue))
                this.setState({ ...this.state, [input.name]: true })
            })
        }

        return (
            <div className={fieldClass}>
                <FormattedMessage id={ labelId1 } tagName="label" />
                <div>
                    <Datetime 
                        defaultValue={ defaultValue }
                        onChange={ date => 
                            moment.isMoment(date) && date.isValid() ?dispatch(change(form, input.name, date)) :
                            dispatch(change(form, input.name, ""))
                        } 
                    />
                </div>           
                { error && <small className="help-block"><FormattedMessage id={ error } /></small> }
            </div>
        )
    }
}

export default Date