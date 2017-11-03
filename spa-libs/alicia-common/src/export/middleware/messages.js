/**
 * Alberto ECM 
 * (c) 2017-09-12 12:56:33 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import R from 'ramda'
import { getFormNames, initialize, touch,  } from 'redux-form'
import { COMBINE_MESSAGE } from '../services/types'

const getRegisteredFields = R.curry((form, state) => R.keys(state.form[form].registeredFields))

export default store => next => action => {

    if(action.type !== COMBINE_MESSAGE){
        return next(action)
    }

    setTimeout(() => R.forEach(
        form => store.dispatch(touch(form, ...getRegisteredFields(form, store.getState()))),
        getFormNames()(store.getState())
    ))

    return next(action)
}