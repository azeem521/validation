import React, { useState } from 'react';

function ValidEthereumAddressesValidator() {
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setError(null);
  };

  const onSubmit = () => {
    const lines = inputText.split('\n');
    const addressMap = new Map();
    const errors = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const parts = line.split(' ');

      if (parts.length !== 2) {
        errors.push(`Line ${i + 1} has an incorrect format.`);
      } else {
        const [address, amount] = parts;

        if (!/^0x[0-9a-fA-F]{40}$/.test(address)) {
          errors.push(`Line ${i + 1}: Invalid Ethereum address.`);
        }

        if (!/^\d+$/.test(amount)) {
          errors.push(`Line ${i + 1}: Invalid amount. Amount should be a positive integer.`);
        }

        // Check for duplicate address
        if (addressMap.has(address)) {
          const prevLine = addressMap.get(address);
          errors.push(`Address ${address} encountered duplicates in Lines ${prevLine} and ${i + 1}`);
        } else {
          addressMap.set(address, i + 1);
        }
      }
    }

    if (errors.length > 0) {
      setError(errors.join('\n'));
    } else {
      // Valid input, you can perform further actions here
      console.log('Input is valid.');
    }
  };

  return (
    <div className="container"  style={{width:'60vw'}}>
      <h1 className="mt-5">Addresses Validation</h1>
      <div className="mb-3" style={{textAlign:'left',color:'grey',fontSize:'0.8rem',fontWeight:'500'}}>
                   <p> Addresses with Amounts </p>
        <textarea
          className="form-control"
          
          style={{background:'#f5f5fa'}}
          rows="5"
          value={inputText}
          onChange={handleInputChange}
        />
         <p  style={{textAlign:'left',color:'grey',fontSize:'0.8rem', fontWeight:'500'}}>
                    Seperated by ',' or '' or '='
                  </p>
      </div>
      
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
            <span className='me-3'><i className="fa fa-exclamation-circle" aria-hidden="true"></i></span>
          {error}
        </div>
      )}
      <button className="btn btn-primary mt-3 w-100" onClick={onSubmit}>
        Next
      </button>
    </div>
  );
}

export default ValidEthereumAddressesValidator;
