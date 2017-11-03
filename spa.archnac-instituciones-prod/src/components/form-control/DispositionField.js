/**
 * Alberto ECM 
 * (c) 2017-10-04 00:05:19 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'
import { reduxUpdateNode } from '../../actions'
import { formToNode, condFUndef } from '../../services/commons'
import { getAggrAlcance, getFrecuencyLabelNode, getAggrFchInicio } from '../../selectors/app'
import DispositionConfig from '../DispositionConfig'

class DispositionField extends Component {
    
    constructor(props){
        super(props)
        this.onEdit = this.onEdit.bind(this)
        this.onCloseDispositionConfig = this.onCloseDispositionConfig.bind(this)
        this.state = {
            showModal: false
        }
    }

    onCloseDispositionConfig(refresh, nextProps, nodeRef){
        this.setState({ ...this.state, showModal: false })
        if(refresh){
            const { parentRef, reduxUpdateNode } = this.props
            reduxUpdateNode(parentRef, formToNode(undefined, nextProps), { 
                target: 'assoc', 
                targetParams: { assocName: 'achn:disposal_scheduler', nodeRef },
                strategy: 'merge' 
            })
        }
    }

    onEdit(e){
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
        this.setState({ ...this.state, showModal: true })
    }

    render(){
        console.log('DispositionField.render', this.props)
        const { input, className, readonly, type, labelId, node, mode } = this.props
        const labelId1 = labelId || input.name
        
        const alcance = condFUndef(() =>getAggrAlcance(node), node)
        const frecuency = condFUndef(() => getFrecuencyLabelNode(node), node)
        const value = condFUndef(() => moment(getAggrFchInicio(node)).format('DD-MM-YYYY HH:mm'), node)
        const actionLabel = node ? 'edit_disposition_schedule' : 'create_disposition_schedule'
        const btnStyle = node ? 'btn btn-link c-lightblue' : 'btn btn-info bgm-deeporange c-white'
        return (

            <div className="form-group fg-line">
                { node && 
                    <div className="col-sm-12 p-0 m-0">
                        <FormattedMessage id={ labelId1 } tagName="label" />
                    </div>
                }
                { node && 
                    <div className="col-sm-6 p-l-0">
                        <input 
                            id={ input.name } 
                            { ...input } 
                            type={ type } 
                            value={ value }
                            className="form-control input-sm"
                            readOnly 
                        /> 
                    </div>
                }
                <div className="col-sm-6">
                    <span>
                        { node && <FormattedMessage id="disposition_resume" values={{ alcance, frecuency }} /> } &nbsp;
                        <a className={ btnStyle } onClick={ this.onEdit }>
                            <FormattedMessage id={ actionLabel } />
                        </a>
                    </span>
                </div>
                { this.state.showModal && <DispositionConfig onClose={ this.onCloseDispositionConfig } { ...this.props } /> }
            </div>
        )
    }
}

export default connect(undefined, { reduxUpdateNode })(DispositionField)