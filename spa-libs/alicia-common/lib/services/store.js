'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.history = exports.store = undefined;
exports.default = configureStore;
exports.injectAsyncReducer = injectAsyncReducer;

var _redux = require('redux');

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _history = require('history');

var _qhistory = require('qhistory');

var _qhistory2 = _interopRequireDefault(_qhistory);

var _qs = require('qs');

var _reactRouterRedux = require('react-router-redux');

var _callApi = require('../middleware/callApi');

var _callApi2 = _interopRequireDefault(_callApi);

var _messages = require('../middleware/messages');

var _messages2 = _interopRequireDefault(_messages);

var _createReducer = require('./createReducer');

var _createReducer2 = _interopRequireDefault(_createReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var historyWithQuery = (0, _qhistory2.default)((0, _history.createBrowserHistory)(), _qs.stringify, _qs.parse);

function configureStore() {
    var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _redux.applyMiddleware)(_reduxThunk2.default, _callApi2.default, _messages2.default, (0, _reactRouterRedux.routerMiddleware)(historyWithQuery), _reduxLogger2.default);

    var store = (0, _redux.createStore)((0, _createReducer2.default)(), initialState);
    store.asyncReducers = {};
    return store;
}

function injectAsyncReducer(store, name, asyncReducer) {
    store.asyncReducers[name] = asyncReducer;
    store.replaceReducer((0, _createReducer2.default)(store.asyncReducers));
}

var store = exports.store = configureStore();
var history = exports.history = historyWithQuery;