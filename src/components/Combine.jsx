import React, { useState } from 'react';

function Combine() {
  const [inputText, setInputText] = useState('');
  const [resultText, setResultText] = useState('');
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setResultText('');
    setError(null);
  };

  const keepFirstOne = () => {
    const lines = inputText.split('\n').filter((line) => line.trim() !== '');
    const seenNumbers = new Map();

    for (const line of lines) {
      const parts = line.split(' ');

      if (parts.length === 2) {
        const [address, value] = parts;
        if (seenNumbers.has(address)) {
          const existingValue = seenNumbers.get(address);
          seenNumbers.set(address, existingValue + parseInt(value, 10));
        } else {
          seenNumbers.set(address, parseInt(value, 10));
        }
      }
    }

    const results = [];

    for (const [address, value] of seenNumbers.entries()) {
      results.push(`${address} ${value}`);
    }

    const result = results.join('\n'); // Each result on a new line
    setResultText(result);
  };

  return (
    <div className="container"  style={{width:'60vw'}}>
      <h1 className="mt-5">Combine Duplicate</h1>
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
     
      {resultText && (
        <div className="alert alert-success mt-3" role="alert">
          Result:
          <br />
          <pre>{resultText}</pre>
        </div>
      )}
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
            <span className='me-3'><i className="fa fa-exclamation-circle" aria-hidden="true"></i></span>  
          {error}
        </div>
      )}
       </div>
      <button className="btn btn-primary mt-3 w-100" onClick={keepFirstOne}>
        Next
      </button>
    </div>
  );
}

export default Combine;
