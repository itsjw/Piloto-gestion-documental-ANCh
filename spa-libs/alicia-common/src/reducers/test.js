/**
 * Alberto ECM 
 * (c) 2017-08-18 02:06:58 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */
import { TEST_ACTION } from '../export'

export default function testReducer(state = {}, action){

    switch(action.type){
        case TEST_ACTION: 
            return { ...state, ...action }
        default:
            return state
    }
}