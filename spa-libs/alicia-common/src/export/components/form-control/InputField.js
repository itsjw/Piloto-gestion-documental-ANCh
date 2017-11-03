/**
 * Alberto ECM 
 * (c) 2016-12-28 12:46:03 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, {Component} from 'react'
import classNames from 'classnames'
import { FormattedMessage, injectIntl } from 'react-intl'
// import {connect} from 'react-redux'

class InputField extends Component {

    renderDefault() {
        const { input, placeholder, className, readonly, type, meta: { error, warning }, labelId, autoFocus } = this.props
        const fieldClass = classNames({ 'form-group': true, 'has-error': error, 'fg-line': true }, className )
        const labelId1 = labelId || input.name
        
        return (
            <div className={ fieldClass }>
                <FormattedMessage id={ labelId1 } tagName="label" />
                <input 
                    id={ input.name } 
                    { ...input } 
                    type={ type } 
                    className="form-control input-sm" 
                    placeholder={ placeholder } 
                    readOnly={ readonly }
                    autoFocus={ autoFocus } 
                />                
                {
                    ( error && <small className="help-block"><FormattedMessage id={ error } /></small> ) || 
                    ( warning && <small className="c-orange"><FormattedMessage id={ warning } /></small>)
                }
            </div>
        )
    }

    renderInline(){

        const { input, placeholder, readonly, type, autoFocus, autoComplete } = this.props

        return (
            <div className="form-group" style={{ display: 'inline' }}>
                <input 
                    {...input} 
                    type={ type } 
                    className="form-control input-sm" 
                    placeholder={ placeholder }  
                    readOnly={ readonly }
                    autoFocus={ autoFocus }
                    autoComplete={ autoComplete }
                />
            </div>
        )
    }

    renderHorizontal(){
        const { input, placeholder, readonly, type, meta: { error }, labelId, autoFocus, intl } = this.props
        const labelId1 = labelId || input.name

        return (
            <div className="form-group">
                <label htmlFor={ input.name } className="col-sm-2 control-label">{ intl.formatMessage({ id: labelId1 }) }</label>
                <div className="col-sm-10">
                    <div className="">
                        <input 
                            id={ input.name } 
                            { ...input }
                            type={ type }
                            className="form-control input-sm" 
                            placeholder={ placeholder } 
                            readOnly={ readonly }
                            autoFocus={ autoFocus }
                        />
                        { error && <small className="help-block"><FormattedMessage id={ error } /></small> }
                    </div>
                </div>
            </div>
        )
    }

    render(){
        const { mode } = this.props
        // console.log(mode)
        switch(mode){
            case 'inline': 
                return this.renderInline()

            case 'horizontal': 
                return this.renderHorizontal()

            default: 
                return this.renderDefault()
        }
    }
}

export default injectIntl(InputField)

