/**
 * Alberto ECM 
 * (c) 2017-08-18 02:28:28 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */
import { cookies, COOKIES_OPTS, COOKIE_USERNAME, COOKIE_TICKET, guestLoginPage } from '../services/commons'
import { COMBINE_MESSAGE, LOGIN_REQUEST, LOGIN_RESPONSE, SET_LOGIN_PAGE } from '../services/types'
import { user } from '../services/alfresco'
import { getLoginPage } from '../selectors/app'
import { 
    USER_SITES_RESPONSE, USER_RESPONSE, SLINGSHOT_USERHOME_RESPONSE, FIND_USERHOME_NODE_RESPONSE, UNAUTHORIZED
} from '../services/types'

const initialState = {
    loginPage: guestLoginPage(),
    messages: {},
    bundles: {}
}

export default function app(state = initialState, action){
    
    switch(action.type){

        case COMBINE_MESSAGE:
            return  { 
                ...state,
                messages: { ...state.messages, ...action.message }, 
                bundles: { ...state.bundles, [action.bundleId]: true }
            }

        // registrar el username en las cookies
        case LOGIN_REQUEST:
            cookies.set(COOKIE_USERNAME, JSON.parse(action.conf.body).username, COOKIES_OPTS)
            return { ...state }

        // registrar el ticket en las cookies
        case LOGIN_RESPONSE: 
            const { resp: { data: { ticket }}} = action
            cookies.set(COOKIE_TICKET, ticket, COOKIES_OPTS)
            return { ...state }

        case UNAUTHORIZED:
            cookies.remove(COOKIE_TICKET, COOKIES_OPTS)
            cookies.remove(COOKIE_USERNAME, COOKIES_OPTS)
            setTimeout(() => window.location.href = getLoginPage({ app: state }))
            return { ...initialState, loginPage: state.loginPage }

        case USER_RESPONSE:
            return { ...state, user: user(action.resp) }

        case SLINGSHOT_USERHOME_RESPONSE:
            return { ...state, userHomeNodeRef: action.resp.parent.nodeRef }

        case USER_SITES_RESPONSE:
            return { ...state, userSites: action.resp }

        case FIND_USERHOME_NODE_RESPONSE:
            return { ...state, userHomeNode: action.resp[0] }

        case SET_LOGIN_PAGE:
            return { ...state, loginPage: action.page }

        default: 
            return state
    }
}