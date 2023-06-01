import React from "react";
import Modal from 'react-modal';
import axios from "axios";

function EditModal(props) {
    const {invoice, modalIsOpen, onModalClose } = props;

    // todo (put this into its own component [the confirm modal]
    const purchaseInvoice = () => {
        axios.post(`/api/v1/invoices/${invoice.id}/purchase`).then((response) => {
            onModalClose(response.data)
        })
        // todo - add gating on FE for this...
    }

    return(<div>
        <Modal isOpen={modalIsOpen} onRequestClose={onModalClose}>
            invoice # { invoice.token }
            <div> I am a modal! </div>

            <button onClick={purchaseInvoice}>Purchase Invoice</button>
        </Modal>
    </div>)
}

export default EditModal;
