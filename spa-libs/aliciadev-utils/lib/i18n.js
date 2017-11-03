'use strict';

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _glob = require('glob');

var _mkdirp = require('mkdirp');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Alberto ECM 
 * (c) 2017-08-20 00:56:52 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */
var MESSAGES_PATTERN = './src/**/*.i18n.json';
var LANG_DIR = './src/i18n/';

// Aggregates the default messages that were extracted from the example app's
// React components via the React Intl Babel plugin. An error will be thrown if
// there are messages in different components that use the same `id`. The result
// is a flat collection of `id: message` pairs for the app's default locale.
var defaultMessages = (0, _glob.sync)(MESSAGES_PATTERN).map(function (filename) {
    return fs.readFileSync(filename, 'utf8');
}).map(function (file) {
    return JSON.parse(file);
}).reduce(function (collection, descriptors) {
    _ramda2.default.mapObjIndexed(function (defaultMessage, id) {
        if (collection.hasOwnProperty(id)) {
            throw new Error('Duplicate message id: ' + id);
        }
        collection[id] = defaultMessage;
    }, descriptors);

    return collection;
}, {});

(0, _mkdirp.sync)(LANG_DIR);
fs.writeFileSync(LANG_DIR + 'es.json', JSON.stringify(defaultMessages, null, 2));