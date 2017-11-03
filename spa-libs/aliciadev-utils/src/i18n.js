/**
 * Alberto ECM 
 * (c) 2017-08-20 00:56:52 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */
import * as fs from 'fs'
import R from 'ramda'
import {sync as globSync} from 'glob'
import {sync as mkdirpSync} from 'mkdirp'

const MESSAGES_PATTERN = './src/**/*.i18n.json'
const LANG_DIR         = './src/i18n/'

// Aggregates the default messages that were extracted from the example app's
// React components via the React Intl Babel plugin. An error will be thrown if
// there are messages in different components that use the same `id`. The result
// is a flat collection of `id: message` pairs for the app's default locale.
const defaultMessages = globSync(MESSAGES_PATTERN)
    .map(filename => fs.readFileSync(filename, 'utf8'))
    .map(file => JSON.parse(file))
    .reduce((collection, descriptors) => {
        R.mapObjIndexed((defaultMessage, id) => {
            if (collection.hasOwnProperty(id)) {
                throw new Error(`Duplicate message id: ${id}`);
            }
            collection[id] = defaultMessage;
        }, descriptors)

        return collection;
    }, {});

mkdirpSync(LANG_DIR);
fs.writeFileSync(LANG_DIR + 'es.json', JSON.stringify(defaultMessages, null, 2));