/**
 * Alberto ECM 
 * (c) 2017-02-20 18:34:24 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, { Component } from 'react'
import classNames from 'classnames'
import {FormattedMessage} from 'react-intl'

class TextAreaField extends Component {
    
    render(){

        const { 
            input, 
            placeholder, 
            meta: { error }, 
            hideLabel, 
            labelId, 
            autoFocus, 
            fieldProps, 
            compClass = 'form-group fg-line' 
        } = this.props
        const fieldClass = classNames(compClass, { 'has-error': error })
        const labelId1 = labelId || input.name
        return (
            <div className={fieldClass} >
                { !hideLabel && <FormattedMessage id={ labelId1 } tagName="label" /> }
                <textarea
                    id={ input.name } 
                    { ...input } 
                    className="form-control input-sm" 
                    placeholder={ placeholder }
                    autoFocus={ autoFocus } 
                    { ...fieldProps }
                >{ this.props.children }</textarea>               
                { error && <small className="help-block"><FormattedMessage id={ error } /></small> }
            </div>
        )
    }
}

export default TextAreaField