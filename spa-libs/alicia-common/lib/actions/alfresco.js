'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.alfSlingshotSearch = exports.alfClasses = exports.alfProfileCookies = exports.alfProfile = exports.alfFindNode = exports.alfSlingshotUserHome = exports.alfUserSites = exports.alfUser = exports.alfLogin = exports.alb = exports.alf = exports.ticketUri = exports.qsUrlify = exports.ensureRootPath = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Alberto ECM 
                                                                                                                                                                                                                                                                   * (c) 2017-09-12 11:53:15 DOX, LTDA. http://www.dox.cl
                                                                                                                                                                                                                                                                   * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
                                                                                                                                                                                                                                                                   * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
                                                                                                                                                                                                                                                                   * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
                                                                                                                                                                                                                                                                   * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
                                                                                                                                                                                                                                                                   * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
                                                                                                                                                                                                                                                                   */

// import { alf } from '../services/restClients'


var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _qs = require('qs');

var _callApi = require('../middleware/callApi');

var _commons = require('../services/commons');

var _alfresco = require('../services/alfresco');

var _alfresco2 = require('../selectors/alfresco');

var _types = require('../services/types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _window = window,
    urify = _window.encodeURIComponent;

/**
 * Asegura que la uri comience con /
 * @param  {String} uri URI que se desea asegurar
 * @return {String}     nueva URI con / inicial
 */

var ensureRootPath = exports.ensureRootPath = function ensureRootPath(uri) {
    return uri[0] === '/' ? uri : '/' + uri;
};

/**
 * Convertir un objeto en queryString
 * @param  {object} obj [description]
 * @return {String}     [description]
 */
var qsUrlify = exports.qsUrlify = _ramda2.default.pipe(_ramda2.default.toPairs, _ramda2.default.map(_ramda2.default.join('=')), _ramda2.default.join('&'));

/**
 * Agrega el ticket del usuario a una uri
 * @param  {String} uri Uri que se desea agregar el ticket de usuario
 * @return {String}     Uri con el ticket agregado
 */
var ticketUri = exports.ticketUri = function ticketUri(uri) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return '' + (0, _commons.qs)(uri, (0, _qs.stringify)(_extends({}, params, { alf_ticket: _commons.cookies.get(_commons.COOKIE_TICKET, _commons.COOKIES_OPTS) })));
};

/**
 * Path seguro para invocar un servicio rest de alfresco autenticado
 * @param  {String} uri Uri que se desea invocar
 * @return {String}     Uri absoluta del servicio rest
 */
var alf = exports.alf = function alf(uri, qs) {
    return '/s' + ticketUri(ensureRootPath(uri), qs);
};

var alb = exports.alb = function alb(uri, qs) {
    return '/api' + ticketUri(ensureRootPath(uri), qs);
};

var alfLogin = exports.alfLogin = function alfLogin(body) {
    return _defineProperty({}, _callApi.CALL_API, _extends({
        types: [_types.LOGIN_REQUEST, _types.LOGIN_RESPONSE, _types.LOGIN_ERROR],
        endpoint: alf('/api/login')
    }, (0, _callApi.jsonPost)(body)));
};

var alfUser = exports.alfUser = function alfUser(username) {
    var groups = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return _defineProperty({}, _callApi.CALL_API, _extends({
        types: [_types.USER_REQUEST, _types.USER_RESPONSE, _types.USER_ERROR],
        endpoint: alf('/api/people/' + username + '?groups=' + groups)
    }, _callApi.getRequest));
};

var alfUserSites = exports.alfUserSites = function alfUserSites(username) {
    var roles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'user';
    var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
    return _defineProperty({}, _callApi.CALL_API, _extends({
        types: [_types.USER_SITES_REQUEST, _types.USER_SITES_RESPONSE, _types.USER_SITES_ERROR],
        endpoint: alf('/api/people/' + username + '/sites?roles=' + roles + '&size=' + size)
    }, _callApi.getRequest));
};

var alfSlingshotUserHome = exports.alfSlingshotUserHome = function alfSlingshotUserHome() {
    return _defineProperty({}, _callApi.CALL_API, {
        types: [_types.SLINGSHOT_USERHOME_REQUEST, _types.SLINGSHOT_USERHOME_RESPONSE, _types.SLINGSHOT_USERHOME_ERROR],
        endpoint: alf('/slingshot/doclib/treenode/node/alfresco/company/home', { libraryRoot: urify('alfresco://user/home') })
    });
};

var alfFindNode = exports.alfFindNode = function alfFindNode(nodeRefUri) {
    var types = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [_types.FIND_NODE_REQUEST, _types.FIND_NODE_RESPONSE, _types.FIND_NODE_ERROR];
    return _defineProperty({}, _callApi.CALL_API, _extends({ types: types, endpoint: alf('/dox/findnode/' + nodeRefUri) }, _callApi.getRequest));
};

var alfFindUserHomeNode = function alfFindUserHomeNode() {
    return function (d, gs) {
        return d(alfFindNode((0, _alfresco.nodeRefToUri)((0, _alfresco2.getUserHomeNodeRef)(gs())), [_types.FIND_USERHOME_NODE_REQUEST, _types.FIND_USERHOME_NODE_RESPONSE, _types.FIND_USERHOME_NODE_ERROR]));
    };
};

var alfProfile = exports.alfProfile = function alfProfile(cred) {
    return function (d, gs) {
        return d(alfLogin(cred)).then(function () {
            return d(alfUser(cred.username));
        }).then(function () {
            return d(alfSlingshotUserHome());
        }).then(function () {
            return Promise.all([d(alfUserSites(cred.username)), alfFindUserHomeNode()(d, gs)]);
        });
    };
};

var alfProfileCookies = exports.alfProfileCookies = function alfProfileCookies() {
    return function (d, gs) {
        return d(alfUser(_commons.cookies.get(_commons.COOKIE_USERNAME, _commons.COOKIES_OPTS))).then(function () {
            return d(alfSlingshotUserHome());
        }).then(function () {
            return Promise.all([d(alfUserSites(_commons.cookies.get(_commons.COOKIE_USERNAME, _commons.COOKIES_OPTS))), alfFindUserHomeNode()(d, gs)]);
        });
    };
};

var alfClasses = exports.alfClasses = function alfClasses() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _defineProperty({}, _callApi.CALL_API, _extends({
        types: [_types.CLASSES_REQUEST, _types.CLASSES_RESPONSE, _types.CLASSES_ERROR],
        endpoint: alf('/api/classes', params)
    }, _callApi.getRequest));
};

var alfSlingshotSearch = exports.alfSlingshotSearch = function alfSlingshotSearch(params) {
    var types = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [_types.SLINGSHOT_SEARCH_REQUEST, _types.SLINGSHOT_SEARCH_RESPONSE, _types.SLINGSHOT_SEARCH_ERROR];
    return _defineProperty({}, _callApi.CALL_API, _extends({
        types: types,
        endpoint: alf('/dox/slingshot/search', _extends({
            spellcheck: false,
            nc: new Date().getTime(),
            maxResults: 100,
            pageSize: 100,
            repo: false,
            startIndex: 0,
            facetFields: ['{http://www.alfresco.org/model/content/1.0}creator', '{http://www.alfresco.org/model/content/1.0}content.mimetype', '{http://www.alfresco.org/model/content/1.0}created', '{http://www.alfresco.org/model/content/1.0}content.size', '{http://www.alfresco.org/model/content/1.0}modifier', '{http://www.alfresco.org/model/content/1.0}modified'].join()
        }, params))
    }, _callApi.getRequest));
};