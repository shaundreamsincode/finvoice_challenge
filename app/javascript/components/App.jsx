import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
      axios.get('/api/v1/invoices').then((response) => {
          setInvoices(response.data)
      })
  }, [])
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
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    </div>
  );
}

export default App;
