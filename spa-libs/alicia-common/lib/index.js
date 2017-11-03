'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fieldValidations = exports.reducers = exports.getRequest = exports.jsonPost = exports.CALL_API = exports.history = exports.store = exports.injectAsyncReducer = exports.configureStore = exports.createReducer = exports.DoxRouter = exports.DoxPlatform = undefined;

var _DoxPlatform = require('./components/DoxPlatform');

Object.defineProperty(exports, 'DoxPlatform', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_DoxPlatform).default;
    }
});

var _DoxRouter = require('./components/DoxRouter');

Object.defineProperty(exports, 'DoxRouter', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_DoxRouter).default;
    }
});

var _commons = require('./services/commons');

Object.keys(_commons).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _commons[key];
        }
    });
});

var _createReducer = require('./services/createReducer');

Object.defineProperty(exports, 'createReducer', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_createReducer).default;
    }
});

var _store = require('./services/store');

Object.defineProperty(exports, 'configureStore', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_store).default;
    }
});
Object.defineProperty(exports, 'injectAsyncReducer', {
    enumerable: true,
    get: function get() {
        return _store.injectAsyncReducer;
    }
});
Object.defineProperty(exports, 'store', {
    enumerable: true,
    get: function get() {
        return _store.store;
    }
});
Object.defineProperty(exports, 'history', {
    enumerable: true,
    get: function get() {
        return _store.history;
    }
});

var _types = require('./services/types');

Object.keys(_types).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _types[key];
        }
    });
});

var _messages = require('./services/messages');

Object.keys(_messages).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _messages[key];
        }
    });
});

var _actions = require('./actions');

Object.keys(_actions).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _actions[key];
        }
    });
});

var _alfresco = require('./selectors/alfresco');

Object.keys(_alfresco).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _alfresco[key];
        }
    });
});

var _alfresco2 = require('./services/alfresco');

Object.keys(_alfresco2).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _alfresco2[key];
        }
    });
});

var _callApi = require('./middleware/callApi');

Object.defineProperty(exports, 'CALL_API', {
    enumerable: true,
    get: function get() {
        return _callApi.CALL_API;
    }
});
Object.defineProperty(exports, 'jsonPost', {
    enumerable: true,
    get: function get() {
        return _callApi.jsonPost;
    }
});
Object.defineProperty(exports, 'getRequest', {
    enumerable: true,
    get: function get() {
        return _callApi.getRequest;
    }
});

var _formControl = require('./components/form-control');

Object.keys(_formControl).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _formControl[key];
        }
    });
});

var _app = require('./reducers/app');

var _app2 = _interopRequireDefault(_app);

var _notifications = require('./reducers/notifications');

var _notifications2 = _interopRequireDefault(_notifications);

var _fieldValidations2 = require('./services/fieldValidations');

var _fieldValidations = _interopRequireWildcard(_fieldValidations2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducers = exports.reducers = {
    app: _app2.default,
    notifications: _notifications2.default
};

var fieldValidations = exports.fieldValidations = _fieldValidations;