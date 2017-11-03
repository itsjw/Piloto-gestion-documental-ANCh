'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SLINGSHOT_SEARCH_ERROR = exports.SLINGSHOT_SEARCH_RESPONSE = exports.SLINGSHOT_SEARCH_REQUEST = exports.UNAUTHORIZED = exports.CLASSES_ERROR = exports.CLASSES_RESPONSE = exports.CLASSES_REQUEST = exports.FIND_USERHOME_NODE_ERROR = exports.FIND_USERHOME_NODE_RESPONSE = exports.FIND_USERHOME_NODE_REQUEST = exports.FIND_NODE_ERROR = exports.FIND_NODE_RESPONSE = exports.FIND_NODE_REQUEST = exports.SLINGSHOT_USERHOME_ERROR = exports.SLINGSHOT_USERHOME_RESPONSE = exports.SLINGSHOT_USERHOME_REQUEST = exports.USER_SITES_ERROR = exports.USER_SITES_RESPONSE = exports.USER_SITES_REQUEST = exports.USER_ERROR = exports.USER_RESPONSE = exports.USER_REQUEST = exports.LOGIN_ERROR = exports.LOGIN_RESPONSE = exports.LOGIN_REQUEST = exports.SET_LOGIN_PAGE = exports.COMBINE_MESSAGE = exports.TEST_ACTION = undefined;

var _commons = require('./commons');

var TEST_ACTION = exports.TEST_ACTION = (0, _commons.createQName)(_commons.MODULE, 'TEST_ACTION'); /**
                                                                                                    * Alberto ECM 
                                                                                                    * (c) 2017-08-18 02:12:18 DOX, LTDA. http://www.dox.cl
                                                                                                    * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
                                                                                                    * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
                                                                                                    * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
                                                                                                    * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
                                                                                                    * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
                                                                                                    */

var COMBINE_MESSAGE = exports.COMBINE_MESSAGE = (0, _commons.createQName)(_commons.MODULE, 'COMBINE_MESSAGE');
var SET_LOGIN_PAGE = exports.SET_LOGIN_PAGE = (0, _commons.createQName)(_commons.MODULE, 'SET_LOGIN_PAGE');

// fetchLogin
var LOGIN_REQUEST = exports.LOGIN_REQUEST = (0, _commons.createQName)(_commons.MODULE, 'LOGIN_REQUEST');
var LOGIN_RESPONSE = exports.LOGIN_RESPONSE = (0, _commons.createQName)(_commons.MODULE, 'LOGIN_RESPONSE');
var LOGIN_ERROR = exports.LOGIN_ERROR = (0, _commons.createQName)(_commons.MODULE, 'LOGIN_ERROR');

// fetchUser
var USER_REQUEST = exports.USER_REQUEST = (0, _commons.createQName)(_commons.MODULE, 'USER_REQUEST');
var USER_RESPONSE = exports.USER_RESPONSE = (0, _commons.createQName)(_commons.MODULE, 'USER_RESPONSE');
var USER_ERROR = exports.USER_ERROR = (0, _commons.createQName)(_commons.MODULE, 'USER_ERROR');

// fetchUserSites
var USER_SITES_REQUEST = exports.USER_SITES_REQUEST = (0, _commons.createQName)(_commons.MODULE, 'USER_SITES_REQUEST');
var USER_SITES_RESPONSE = exports.USER_SITES_RESPONSE = (0, _commons.createQName)(_commons.MODULE, 'USER_SITES_RESPONSE');
var USER_SITES_ERROR = exports.USER_SITES_ERROR = (0, _commons.createQName)(_commons.MODULE, 'USER_SITES_ERROR');

//fetchSlingShotUserHome
var SLINGSHOT_USERHOME_REQUEST = exports.SLINGSHOT_USERHOME_REQUEST = (0, _commons.createQName)(_commons.MODULE, 'SLINGSHOT_USERHOME_REQUEST');
var SLINGSHOT_USERHOME_RESPONSE = exports.SLINGSHOT_USERHOME_RESPONSE = (0, _commons.createQName)(_commons.MODULE, 'SLINGSHOT_USERHOME_RESPONSE');
var SLINGSHOT_USERHOME_ERROR = exports.SLINGSHOT_USERHOME_ERROR = (0, _commons.createQName)(_commons.MODULE, 'SLINGSHOT_USERHOME_ERROR');

//findNode
var FIND_NODE_REQUEST = exports.FIND_NODE_REQUEST = (0, _commons.createQName)(_commons.MODULE, 'FIND_NODE_REQUEST');
var FIND_NODE_RESPONSE = exports.FIND_NODE_RESPONSE = (0, _commons.createQName)(_commons.MODULE, 'FIND_NODE_RESPONSE');
var FIND_NODE_ERROR = exports.FIND_NODE_ERROR = (0, _commons.createQName)(_commons.MODULE, 'FIND_NODE_ERROR');

//findUserHomeNode
var FIND_USERHOME_NODE_REQUEST = exports.FIND_USERHOME_NODE_REQUEST = (0, _commons.createQName)(_commons.MODULE, 'FIND_USERHOME_NODE_REQUEST');
var FIND_USERHOME_NODE_RESPONSE = exports.FIND_USERHOME_NODE_RESPONSE = (0, _commons.createQName)(_commons.MODULE, 'FIND_USERHOME_NODE_RESPONSE');
var FIND_USERHOME_NODE_ERROR = exports.FIND_USERHOME_NODE_ERROR = (0, _commons.createQName)(_commons.MODULE, 'FIND_USERHOME_NODE_ERROR');

//classes
var CLASSES_REQUEST = exports.CLASSES_REQUEST = (0, _commons.createQName)(_commons.MODULE, 'CLASSES_REQUEST');
var CLASSES_RESPONSE = exports.CLASSES_RESPONSE = (0, _commons.createQName)(_commons.MODULE, 'CLASSES_RESPONSE');
var CLASSES_ERROR = exports.CLASSES_ERROR = (0, _commons.createQName)(_commons.MODULE, 'CLASSES_ERROR');

//unauthorized 
var UNAUTHORIZED = exports.UNAUTHORIZED = (0, _commons.createQName)(_commons.MODULE, 'UNAUTHORIZED');

var SLINGSHOT_SEARCH_REQUEST = exports.SLINGSHOT_SEARCH_REQUEST = (0, _commons.createQName)(_commons.MODULE, 'SLINGSHOT_SEARCH_REQUEST');
var SLINGSHOT_SEARCH_RESPONSE = exports.SLINGSHOT_SEARCH_RESPONSE = (0, _commons.createQName)(_commons.MODULE, 'SLINGSHOT_SEARCH_RESPONSE');
var SLINGSHOT_SEARCH_ERROR = exports.SLINGSHOT_SEARCH_ERROR = (0, _commons.createQName)(_commons.MODULE, 'SLINGSHOT_SEARCH_ERROR');