import React, { useState } from "react";
import Modal from 'react-modal';
import axios from "axios";

function EditModal(props) {
    const {invoice, modalIsOpen, onModalClose } = props;
    const [invoiceBeingPurchased, setInvoiceBeingPurchased] = useState(false)
    const [invoiceBeingClosed, setInvoiceBeingClosed] = useState(false)

    const purchaseInvoice = () => {
        axios.post(`/api/v1/invoices/${invoice.id}/purchase`).then((response) => {
            onModalClose(response.data)
        })
    }

    const closeInvoice = () => {
        axios.post(`/api/v1/invoices/${invoice.id}/close`).then((response) => {
            onModalClose(response.data)
        })
    }


    return(<div>
        <Modal isOpen={modalIsOpen} onRequestClose={onModalClose}>
            {
                !invoiceBeingPurchased && !invoiceBeingClosed && <div>
                    invoice # { invoice.token }
                    <div> I am a modal! </div>

                    {
                        invoice.status === 'approved' && <button onClick={() => setInvoiceBeingPurchased(true)}>Purchase Invoice</button>
                    }

                    {
                        invoice.status === 'purchased' && <button onClick={() => setInvoiceBeingClosed(true)}>Close Invoice</button>
                    }
                </div>
            }

            {
                invoiceBeingPurchased && <div>
                    Are you sure you want to purchase the invoice { invoice.token }?
                    <button onClick={() => setInvoiceBeingPurchased(false)}>Cancel</button>
                    <button onClick={purchaseInvoice}>Purchase</button>
                </div>
            }

            {
                invoiceBeingClosed && <div>
                    Are you sure you want to close the invoice { invoice.token }?
                    <button onClick={() => setInvoiceBeingClosed(false)}>Cancel</button>
                    <button onClick={closeInvoice}>Close</button>
                </div>
            }
        </Modal>
    </div>)
}

export default EditModal;
