import React, { useState, useEffect } from "react";
import axios from "axios";
import InvoiceModal from "./InvoiceModal";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    const [invoices, setInvoices] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [invoiceBeingEdited, setInvoiceBeingEdited] = useState(null);

    useEffect(() => {
        axios.get("/api/v1/invoices").then((response) => {
            setInvoices(response.data);
        });
    }, []);

    function openModal(invoice) {
        setModalIsOpen(true);
        setInvoiceBeingEdited(invoice);
    }

    function closeModal(updatedInvoice = null) {
        setModalIsOpen(false);
        setInvoiceBeingEdited(null);

        if (updatedInvoice) {
            updateEditedInvoice(updatedInvoice);
        }
    }

    function updateEditedInvoice(updatedInvoice) {
        const invoiceIndexToUpdate = invoices.findIndex(
            (invoice) => invoice.id === updatedInvoice.id
        );
        invoices[invoiceIndexToUpdate] = updatedInvoice;
    }

    return (
        <Container className="m-2">
            <Card>
                <Card.Body>
                    <table>
                        <thead>
                        <tr>
                            <th>Invoice #</th>
                            <th>Amount</th>
                            <th>Fees Accrued</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>View/Edit</th>
                        </tr>
                        </thead>

                        <tbody>
                        {invoices.map((invoice) => {
                            return (
                                <tr key={invoice.token}>
                                    <td>{invoice.token}</td>
                                    <td>{invoice.amount}</td>
                                    <td>{invoice.fees_accrued}</td>
                                    <td>{invoice.due_at}</td>
                                    <td>{invoice.status}</td>
                                    <th>
                                        {" "}
                                        <button onClick={() => openModal(invoice)}>
                                            View/Edit
                                        </button>{" "}
                                    </th>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </Card.Body>
            </Card>
            {modalIsOpen && (
                <InvoiceModal
                    invoice={invoiceBeingEdited}
                    modalIsOpen={modalIsOpen}
                    onModalClose={closeModal}
                />
            )}
        </Container>
    );
}

export default App;
