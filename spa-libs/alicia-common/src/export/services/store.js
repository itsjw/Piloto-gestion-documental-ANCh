/**
 * Alberto ECM 
 * (c) 2017-08-18 16:42:47 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

/**
 * Componente para configurar el store de redux
 */

import { createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import { createBrowserHistory, createHashHistory } from 'history'
import qhistory from 'qhistory'
import { stringify, parse } from 'qs'
import  { syncHistoryWithStore, routerMiddleware, } from 'react-router-redux'

import callApiMiddleware from '../middleware/callApi'
import messagesMiddleware from '../middleware/messages'
import createReducer from './createReducer'

const historyWithQuery = qhistory(createBrowserHistory(), stringify, parse)

export default function configureStore(initialState = applyMiddleware(
    thunkMiddleware, 
    callApiMiddleware, 
    messagesMiddleware, 
    routerMiddleware(historyWithQuery),
    loggerMiddleware
)) {
    const store = createStore(createReducer(), initialState)
    store.asyncReducers = {}
    return store
}

export function injectAsyncReducer(store, name, asyncReducer) {
    store.asyncReducers[name] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
}

export const store = configureStore()
export const history = historyWithQuery