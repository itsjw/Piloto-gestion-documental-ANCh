/**
 * Alberto ECM 
 * (c) 2017-08-18 01:58:04 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import R from 'ramda'

import { Cookies } from 'react-cookie'

export const MODULE = 'alicia-common'

export const isDev = process.env.NODE_ENV === 'development'

export const cookies = new Cookies()

export const COOKIES_OPTS = {
    path: '/',
    domain: window.location.host.match(/(?:[\s.].+)/)
}

export const COOKIE_TICKET = 'ticket'

export const COOKIE_USERNAME = 'username'

export const createQName = (module, name) => `${module}/${name}`

export const isUndef = any => R.type(any) === 'Undefined'

export const isArr = any => R.type(any) === 'Array'

export const isFunction = any => R.type(any) === 'Function'

export const isStr = any => R.type(any) === 'String'

/**
 * Agrega el query string al endpoint uri
 * @param  {String} uri URL endpoint 
 * @param  {String} q QueryString
 * @return {String} nueva uri con querystring agregado
 */
export const qs = (uri, q = '') => !q ?uri :(uri + (uri.match(/\?/) ?'&' :'?') + q)

export const guestLoginPage = () => {
    const match = window.location.host.match(/(\w+?(qa|dev){0,1})(\..+\..+)/)
    if(match){
        const [, name, sufix, subdomain] = match
        return `accounts${sufix ?'qa' :''}${subdomain}`
    }
    return `${window.location.host}/login`
}