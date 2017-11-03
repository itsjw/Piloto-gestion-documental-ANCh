/**
 * Alberto ECM 
 * (c) 2017-10-04 09:27:42 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
class TestModal extends Component {
    
    render(){
        return (
            <Modal show>
                <form>
                    <Modal.Header closeButton>
                        <Modal.Title>Crear/Modificar carpeta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        pepe
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-button btn-info">Confirmar</button>
                    </Modal.Footer>
                </form>
            </Modal>
        )
    }
}

export default TestModal