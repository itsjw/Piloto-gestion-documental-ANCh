/**
 * Alberto ECM 
 * (c) 2017-09-12 10:44:42 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import R from 'ramda'
import { isUndef } from '../services/commons'
import { UNAUTHORIZED } from '../services/types'

export const CALL_API = Symbol('Call API')

export const jsonPost = body => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
})

export const getRequest = { method: 'GET' }

const MIMETYPE_JSON = 'application/json'

/**
 * [description]
 * @param  {[type]} resp [description]
 * @return {[type]}      [description]
 */
const isJson = r => r.headers.get('Content-Type').startsWith(MIMETYPE_JSON)


/**
 * [description]
 * @param  {[type]} R [description]
 * @return {[type]}   [description]
 */
const body = r => isJson(r) ?r.json() :r.text()
/*
const authFilter = (O) => {
    
    if(O.status.code === 401){
        go(page_login())
    }

    return Promise.reject(O)
}
 */
const raise = (b, r) => { throw (r.status === 401 ?UNAUTHORIZED :b) }

const doFetch = (uri, conf) => fetch(uri, conf).then(r => body(r).then( b => r.ok ?b :raise(b, r)))

const actionWith = R.pickBy((val, key) => key !== CALL_API)

const pickNext = (next, action) => !action[CALL_API] ?() => next(action) :callApi(action[CALL_API])

const callApi = ({ types: [ req, res, fail ], endpoint, reduxInfo, ...conf }) => (store, next) => 
    !next({ type: req, conf, reduxInfo }) || doFetch(endpoint, conf)
        .then(resp => next({ resp, type: res, reduxInfo }))
        .catch(err => Promise.reject(store.dispatch({ err, reduxInfo, type: err === UNAUTHORIZED ?UNAUTHORIZED :fail })))

export default store => next => action => pickNext(next, action)(store, next)