/**
 * Alberto ECM 
 * (c) 2017-09-26 10:33:14 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import Select from 'react-select'
import { change } from 'redux-form'
import 'react-select/dist/react-select.css'
import './SelectField.css'

class SelectField extends Component {
    
    render(){
        const { 
            input, 
            placeholder, 
            className, 
            readOnly, 
            meta: { error, warning }, 
            labelId, 
            autoFocus, 
            options,
            displayOptions,
        } = this.props
        const fieldClass = classNames({ 'form-group': true, 'has-error': error, 'fg-line': true }, className )
        const labelId1 = labelId || input.name
        const { showLabel, ...furtherOptions } = { showLabel: true,  ...displayOptions }
        return (
            <div className={ fieldClass }>
                { showLabel && <FormattedMessage id={ labelId1 } tagName="label" /> }
                <Select 
                    name={ input.name }
                    value={ input.value }
                    options={ options }
                    className="form-control input-sm"
                    onChange={ val => input.onChange(val) }
                    { ...furtherOptions }
                />               
                {
                    ( error && <small className="help-block"><FormattedMessage id={ error } /></small> ) || 
                    ( warning && <small className="c-orange"><FormattedMessage id={ warning } /></small>)
                }
            </div>
        )
    }
}

export default SelectField