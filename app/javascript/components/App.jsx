import React, { useState, useEffect } from "react";
import axios from "axios";
import EditModal from "./EditModal";

function App() {
  const [invoices, setInvoices] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [invoiceBeingEdited, setInvoiceBeingEdited] = useState(null);

  useEffect(() => {
      axios.get('/api/v1/invoices').then((response) => {
          setInvoices(response.data)
      })
  }, [])

    // todo - fix formatting...
    function openModal(invoice) {
        setModalIsOpen(true)
        setInvoiceBeingEdited(invoice)
    }

    function closeModal(updatedInvoice=null) {
      setModalIsOpen(false)
        setInvoiceBeingEdited(null)

        if (updatedInvoice) {
            updateEditedInvoice(updatedInvoice)
        }
    }

    function updateEditedInvoice(updatedInvoice) {
      const invoiceIndexToUpdate = invoices.findIndex((invoice) => invoice.id === updatedInvoice.id)
        invoices[invoiceIndexToUpdate] = updatedInvoice
    }

  return (
    <div>
        test

        <table>
            <thead>
            <tr>
                <th>Invoice #</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
            </tr>
            </thead>

            <tbody>
            {
                invoices.map((invoice) => {
                    console.log(invoice)
                    return(
                        <tr key={invoice.token}>
                            <td>{ invoice.token }</td>
                            <td>{ invoice.amount }</td>
                            <td>{ invoice.due_at }</td>
                            <td>{ invoice.status }</td>
                            <th> <button onClick={() => openModal(invoice)}>Edit</button> </th>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>

        {
            modalIsOpen && <EditModal invoice={invoiceBeingEdited} modalIsOpen={modalIsOpen} onModalClose={closeModal}/>
        }

    </div>
  );
}

export default App;

// const {invoice, modalIsOpen, onModalClose } = props;
