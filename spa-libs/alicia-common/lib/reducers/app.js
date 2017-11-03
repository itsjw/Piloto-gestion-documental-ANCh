'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Alberto ECM 
                                                                                                                                                                                                                                                                   * (c) 2017-08-18 02:28:28 DOX, LTDA. http://www.dox.cl
                                                                                                                                                                                                                                                                   * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
                                                                                                                                                                                                                                                                   * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
                                                                                                                                                                                                                                                                   * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
                                                                                                                                                                                                                                                                   * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
                                                                                                                                                                                                                                                                   * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
                                                                                                                                                                                                                                                                   */


exports.default = app;

var _commons = require('../services/commons');

var _types = require('../services/types');

var _alfresco = require('../services/alfresco');

var _app = require('../selectors/app');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
    loginPage: (0, _commons.guestLoginPage)(),
    messages: {},
    bundles: {}
};

function app() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];


    switch (action.type) {

        case _types.COMBINE_MESSAGE:
            return _extends({}, state, {
                messages: _extends({}, state.messages, action.message),
                bundles: _extends({}, state.bundles, _defineProperty({}, action.bundleId, true))

                // registrar el username en las cookies
            });case _types.LOGIN_REQUEST:
            _commons.cookies.set(_commons.COOKIE_USERNAME, JSON.parse(action.conf.body).username, _commons.COOKIES_OPTS);
            return _extends({}, state);

        // registrar el ticket en las cookies
        case _types.LOGIN_RESPONSE:
            var ticket = action.resp.data.ticket;

            _commons.cookies.set(_commons.COOKIE_TICKET, ticket, _commons.COOKIES_OPTS);
            return _extends({}, state);

        case _types.UNAUTHORIZED:
            _commons.cookies.remove(_commons.COOKIE_TICKET, _commons.COOKIES_OPTS);
            _commons.cookies.remove(_commons.COOKIE_USERNAME, _commons.COOKIES_OPTS);
            setTimeout(function () {
                return window.location.href = (0, _app.getLoginPage)({ app: state });
            });
            return _extends({}, initialState, { loginPage: state.loginPage });

        case _types.USER_RESPONSE:
            return _extends({}, state, { user: (0, _alfresco.user)(action.resp) });

        case _types.SLINGSHOT_USERHOME_RESPONSE:
            return _extends({}, state, { userHomeNodeRef: action.resp.parent.nodeRef });

        case _types.USER_SITES_RESPONSE:
            return _extends({}, state, { userSites: action.resp });

        case _types.FIND_USERHOME_NODE_RESPONSE:
            return _extends({}, state, { userHomeNode: action.resp[0] });

        case _types.SET_LOGIN_PAGE:
            return _extends({}, state, { loginPage: action.page });

        default:
            return state;
    }
}