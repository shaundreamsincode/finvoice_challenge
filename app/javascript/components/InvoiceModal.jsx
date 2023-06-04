import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

function InvoiceModal(props) {
    const { invoice, modalIsOpen, onModalClose } = props;
    const [invoiceBeingPurchased, setInvoiceBeingPurchased] = useState(false);
    const [invoiceBeingClosed, setInvoiceBeingClosed] = useState(false);

    const purchaseInvoice = () => {
        axios.post(`/api/v1/invoices/${invoice.id}/purchase`).then((response) => {
            onModalClose(response.data);
        });
    };

    const closeInvoice = () => {
        axios.post(`/api/v1/invoices/${invoice.id}/close`).then((response) => {
            onModalClose(response.data);
        });
    };

    return (
        <>
            <Modal isOpen={modalIsOpen} onRequestClose={onModalClose}>
                <Container className="m-2">
                    <Card>
                        <Card.Body>
                            {!invoiceBeingPurchased && !invoiceBeingClosed && (
                                <div>
                                    invoice # {invoice.token} <br />
                                    Amount {invoice.amount} <br />
                                    Due Date {invoice.due_at} <br />
                                    Status {invoice.status} <br />
                                    Fees Accrued {invoice.fees_accrued} <br />
                                    Scan Name {invoice.scan_filename} <br />
                                    {invoice.status === "approved" && (
                                        <button onClick={() => setInvoiceBeingPurchased(true)}>
                                            Purchase Invoice
                                        </button>
                                    )}
                                    {invoice.status === "purchased" && (
                                        <button onClick={() => setInvoiceBeingClosed(true)}>
                                            Close Invoice
                                        </button>
                                    )}
                                </div>
                            )}

                            {invoiceBeingPurchased && (
                                <div>
                                    Are you sure you want to purchase the invoice {invoice.token}?
                                    <button onClick={purchaseInvoice}>Purchase</button>
                                </div>
                            )}

                            {invoiceBeingClosed && (
                                <div>
                                    Are you sure you want to close the invoice {invoice.token}?
                                    <button onClick={() => setInvoiceBeingClosed(false)}>
                                        Close
                                    </button>
                                    <button onClick={closeInvoice}>Close</button>
                                </div>
                            )}

                            <button onClick={onModalClose}>Cancel</button>
                        </Card.Body>
                    </Card>
                </Container>
            </Modal>
        </>
    );
}

export default InvoiceModal;
