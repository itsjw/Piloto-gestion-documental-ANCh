/**
 * Alberto ECM 
 * (c) 2017-10-03 20:16:13 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-ivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, { Component } from 'react'
import FormInstutucionProductora from './FormInstutucionProductora'
import FormUnidadProductora from './FormUnidadProductora'
import FormSerie from './FormSerie'
import FormRecord from './FormRecord'
import { getAggrType } from '../selectors/app'
import { TYPE_RECORD } from '../constants'

class Form extends Component {
    
    renderModeEdit(){
        console.log('Form.render', this.props)

        const { node } = this.props
        const type = getAggrType(node)

        switch(type){
            case 'INSTITUCION_PRODUCTORA':
                return (<FormInstutucionProductora { ...this.props } />)

            case 'SECCION':
            case 'SUBSECCION':
                return <FormUnidadProductora { ...this.props } />

            case 'SERIE':
                return <FormSerie { ...this.props } />

            default: 
                if(node.type === TYPE_RECORD){
                    return <FormRecord { ...this.props } />
                }
                return null
        }
    }

    renderModeNew(){
        const { nodeRef } = this.props
        const [, type, ] = nodeRef.match(/form:\/\/(\w+)\/new/)
        switch(type){
            case 'serie': 
                return <FormSerie { ...this.props } />
            case 'up':
                return <FormUnidadProductora { ...this.props} mode="new" />
            case 'ip':
                return <FormInstutucionProductora { ...this.props} mode="new" />
            default:
                return null
        }
    }

    render(){
        const { mode } = this.props
        if(mode === 'edit') {
            return this.renderModeEdit()
        }
        else return this.renderModeNew()
    }
}

export default Form