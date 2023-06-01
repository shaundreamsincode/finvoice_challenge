import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
      axios.get('/api/v1/invoices').then((response) => {
          setInvoices(response.data.invoices)
          debugger
      })
  }, [])

    console.log(invoices)
  return (
    <div>
        test
    </div>
  );
}

export default App;
