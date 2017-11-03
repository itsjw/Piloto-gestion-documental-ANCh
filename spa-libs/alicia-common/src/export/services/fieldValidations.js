/**
 * Alberto ECM 
 * (c) 2017-08-19 17:55:13 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */
export const required = value => value ? undefined : 'validation_required'

const regex = (regexp, errorMsg) => (value) => regexp.test(value) ?undefined :errorMsg

export const timeFormat = regex(
    /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 
    'El formato de la hora debe ser HH:mm. Ex. 00:30, 20:15, 10:30'
)

export const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined

export const maxLength15 = maxLength(15)

export const number = value => 
    value && isNaN(Number(value)) ? 'Must be a number' : undefined

export const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined

export const minValue18 = minValue(18)

export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
    'Invalid email address' : undefined

export const tooOld = value =>
    value && value > 65 ? 'You might be too old for this' : undefined

export const aol = value =>
    value && /.+@aol\.com/.test(value) ? 'Really? You still use AOL for your email?' : undefined

export const rolname = regex(/^[A-Z_]+$/, 'validation_rolname')