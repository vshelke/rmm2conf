import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';


export interface IQRScanner {}

const QRScanner: React.FC<IQRScanner> = () => {
  const [data, setData] = useState('No result');
  const [error, setError] = useState('No error');

  return (
    <div style={{ width: '75%'}}>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result.getText());
          }
          if (!!error) {
            console.info(error);
            setError(error.message);
          }
        }}
        constraints={{facingMode: "environment"}}
      />
      <p>Data: {data} <br/> {atob(data)}</p>
      <p>Error: {error}</p>
    </div>
  );
};

QRScanner.defaultProps = {}

export default QRScanner
