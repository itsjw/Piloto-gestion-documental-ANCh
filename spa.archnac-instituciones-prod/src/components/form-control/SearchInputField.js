/**
 * Alberto ECM 
 * (c) 2017-10-02 18:03:50 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React from 'react'

export default ({ input, icon, placeholder, type }) => (
    <input { ...input } placeholder={ placeholder } type={ type } style={{ padding: '0 55px 0 10px'}} />
)