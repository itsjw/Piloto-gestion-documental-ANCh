/**
 * Alberto ECM 
 * (c) 2017-09-12 11:53:15 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import R from 'ramda'
import { stringify } from 'qs'
import { CALL_API, jsonPost, getRequest } from '../middleware/callApi'
// import { alf } from '../services/restClients'
import { COOKIE_TICKET, COOKIE_USERNAME, COOKIES_OPTS, cookies, qs } from '../services/commons'
import { nodeRefToUri } from '../services/alfresco'
import { getUserHomeNodeRef } from '../selectors/alfresco'
import { 
    LOGIN_REQUEST, LOGIN_RESPONSE, LOGIN_ERROR,
    USER_REQUEST, USER_RESPONSE, USER_ERROR,
    USER_SITES_REQUEST, USER_SITES_RESPONSE, USER_SITES_ERROR,
    SLINGSHOT_USERHOME_REQUEST, SLINGSHOT_USERHOME_RESPONSE, SLINGSHOT_USERHOME_ERROR,
    FIND_NODE_REQUEST, FIND_NODE_RESPONSE, FIND_NODE_ERROR,
    FIND_USERHOME_NODE_REQUEST, FIND_USERHOME_NODE_RESPONSE, FIND_USERHOME_NODE_ERROR,
    SLINGSHOT_SEARCH_REQUEST, SLINGSHOT_SEARCH_RESPONSE, SLINGSHOT_SEARCH_ERROR,
    CLASSES_REQUEST, CLASSES_RESPONSE, CLASSES_ERROR
} from '../services/types'


const { encodeURIComponent: urify } = window

/**
 * Asegura que la uri comience con /
 * @param  {String} uri URI que se desea asegurar
 * @return {String}     nueva URI con / inicial
 */
export const ensureRootPath = uri => uri[0] === '/' ?uri :`/${uri}`

/**
 * Convertir un objeto en queryString
 * @param  {object} obj [description]
 * @return {String}     [description]
 */
export const qsUrlify = R.pipe(R.toPairs, R.map(R.join('=')), R.join('&'))

/**
 * Agrega el ticket del usuario a una uri
 * @param  {String} uri Uri que se desea agregar el ticket de usuario
 * @return {String}     Uri con el ticket agregado
 */
export const ticketUri = (uri, params = {}) => `${qs(uri, stringify({ ...params, alf_ticket: cookies.get(COOKIE_TICKET, COOKIES_OPTS) }))}`

/**
 * Path seguro para invocar un servicio rest de alfresco autenticado
 * @param  {String} uri Uri que se desea invocar
 * @return {String}     Uri absoluta del servicio rest
 */
export const alf = (uri, qs) => `/s${ticketUri(ensureRootPath(uri), qs)}`

export const alb = (uri, qs) => `/api${ticketUri(ensureRootPath(uri), qs)}`

export const alfLogin = body => ({
    [CALL_API]: {
        types: [ LOGIN_REQUEST, LOGIN_RESPONSE, LOGIN_ERROR ],
        endpoint: alf(`/api/login`),
        ...jsonPost(body)
    }
})

export const alfUser = (username, groups = true) => ({
    [CALL_API]: {
        types: [ USER_REQUEST, USER_RESPONSE, USER_ERROR ],
        endpoint: alf(`/api/people/${username}?groups=${groups}`),
        ...getRequest
    }
})

export const alfUserSites = (username, roles = 'user', size = 100) => ({
    [CALL_API]: {
        types: [ USER_SITES_REQUEST, USER_SITES_RESPONSE, USER_SITES_ERROR ],
        endpoint: alf(`/api/people/${username}/sites?roles=${roles}&size=${size}`),
        ...getRequest
    }
})

export const alfSlingshotUserHome = () => ({
    [CALL_API]: {
        types: [ SLINGSHOT_USERHOME_REQUEST, SLINGSHOT_USERHOME_RESPONSE, SLINGSHOT_USERHOME_ERROR ],
        endpoint: alf(`/slingshot/doclib/treenode/node/alfresco/company/home`, { libraryRoot : urify('alfresco://user/home') }),
    }
})

export const alfFindNode = (nodeRefUri, types = [ FIND_NODE_REQUEST, FIND_NODE_RESPONSE, FIND_NODE_ERROR ]) => ({
    [CALL_API]: { types, endpoint: alf(`/dox/findnode/${nodeRefUri}`), ...getRequest }
})

const alfFindUserHomeNode = () => (d, gs) => d(alfFindNode(
    nodeRefToUri(getUserHomeNodeRef(gs())), 
    [ FIND_USERHOME_NODE_REQUEST, FIND_USERHOME_NODE_RESPONSE, FIND_USERHOME_NODE_ERROR ]
))

export const alfProfile = cred => (d, gs) => d(alfLogin(cred))
    .then(() => d(alfUser(cred.username)))
    .then(() => d(alfSlingshotUserHome()))
    .then(() => Promise.all([ d(alfUserSites(cred.username)), alfFindUserHomeNode()(d, gs) ]))

export const alfProfileCookies = () => (d, gs) => 
    d(alfUser(cookies.get(COOKIE_USERNAME, COOKIES_OPTS)))
        .then(() => d(alfSlingshotUserHome()))
        .then(() => Promise.all([ d(alfUserSites(cookies.get(COOKIE_USERNAME, COOKIES_OPTS))), alfFindUserHomeNode()(d, gs) ]))

export const alfClasses = ( params = {} ) => ({
    [CALL_API]: {
        types: [ CLASSES_REQUEST, CLASSES_RESPONSE, CLASSES_ERROR ],
        endpoint: alf(`/api/classes`, params),
        ...getRequest
    }
})

export const  alfSlingshotSearch = (params, types = [ SLINGSHOT_SEARCH_REQUEST, SLINGSHOT_SEARCH_RESPONSE, SLINGSHOT_SEARCH_ERROR ]) => ({
    [CALL_API]: {
        types,
        endpoint: alf(`/dox/slingshot/search`, {
            spellcheck: false, 
            nc: (new Date()).getTime(), 
            maxResults: 100, 
            pageSize: 100, 
            repo: false, 
            startIndex: 0,
            facetFields: [
                '{http://www.alfresco.org/model/content/1.0}creator',
                '{http://www.alfresco.org/model/content/1.0}content.mimetype',
                '{http://www.alfresco.org/model/content/1.0}created',
                '{http://www.alfresco.org/model/content/1.0}content.size',
                '{http://www.alfresco.org/model/content/1.0}modifier',
                '{http://www.alfresco.org/model/content/1.0}modified'
            ].join(),
            ...params
        }),
        ...getRequest
    }
})