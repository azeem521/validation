
import React, { useState } from 'react';

import 'font-awesome/css/font-awesome.min.css';

function Disperse() {
  const [inputData, setInputData] = useState('');
  const [error, setError] = useState(null);
  const [result, setResult] = useState('');

  const checkForDuplicates = (lines) => {
    const seenAddresses = new Map();
    let lineNumber = 1;
    for (const line of lines) {
      const [address] = line.split(/\s+/);
      if (seenAddresses.has(address)) {
        seenAddresses.get(address).push(lineNumber);
      } else {
        seenAddresses.set(address, [lineNumber]);
      }
      lineNumber++;
    }
    return seenAddresses;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);

    try {
      const lines = inputData.split('\n').map((line) => line.trim());
      const seenAddresses = checkForDuplicates(lines);

      const duplicateAddresses = [];
      for (const [address, lineNumbers] of seenAddresses.entries()) {
        if (lineNumbers.length > 1) {
          duplicateAddresses.push(`${address} encountered duplicate in line ${lineNumbers.join(', ')}`);
        }
      }

      if (duplicateAddresses.length > 0) {
        throw new Error(`Duplicate addresses:\n${duplicateAddresses.join('\n')}`);
      }

      const addressBalances = new Map();
      let balanceMessage = '';
      let finalResult = '';

      for (let lineNumber = 1; lineNumber <= lines.length; lineNumber++) {
        const line = lines[lineNumber - 1];
        const parts = line.split(/\s+/);

        if (parts.length !== 2) {
          throw new Error(`Line ${lineNumber} has an incorrect format: ` + line);
        }

        const [address, amount] = parts;

        if (!isValidEthereumAddress(address)) {
          throw new Error(`Invalid Ethereum address in Line ${lineNumber}: ` + address);
        }

        if (!isValidNumber(amount)) {
          throw new Error(`Line ${lineNumber}: ` + amount + ' is an invalid amount');
        }

        const amountValue = parseFloat(amount);

        if (addressBalances.has(address)) {
          addressBalances.set(address, addressBalances.get(address) + amountValue);
        } else {
          addressBalances.set(address, amountValue);
        }
      }

      for (const [address, balance] of addressBalances.entries()) {
        balanceMessage += `${address}: ${balance.toFixed(2)}\n`;
      }

      if (balanceMessage) {
        finalResult += 'Combined Balances\n' + balanceMessage;
      }

      setResult(finalResult);
    } catch (err) {
      setResult('');
      setError(<span style={{ color: 'red' }}>Error: {err.message}</span>);
    }
  };

  const isValidEthereumAddress = (address) => {
    const ethereumAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
    return ethereumAddressRegex.test(address);
  };

  const isValidNumber = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="">
         
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3" style={{textAlign:'left',color:'grey',fontSize:'0.8rem',fontWeight:'500'}}>
                   <p> Addresses with Amounts </p>
                  <textarea
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                    style={{background:'#f5f5fa'}}
                    id="inputData"
                    rows="6"
                    value={inputData}
                    onChange={(e) => {
                      setInputData(e.target.value);
                      setError(null);
                      setResult('');
                    }}
                  ></textarea>
                  <p  style={{textAlign:'left',color:'grey',fontSize:'0.8rem', fontWeight:'500'}}>
                    Seperated by ',' or '' or '='
                  </p>
                  {error && (
                    <div className={`invalid-feedback border border-danger rounded`}>
                      
                      <div className="error-box m-3">
                        <span className='me-3'><i className="fa fa-exclamation-circle" aria-hidden="true"></i></span>
                        {error}
                      </div>
                    </div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Next
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {result && (
        <div className="row justify-content-center mt-4">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h3>Result</h3>
              </div>
              <div className="card-body">
                <pre>{result}</pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Disperse;




