import React from "react";
import { QrReader } from "react-qr-reader";
import ViewFinder from "./ViewFinder";

export interface IQRScanner {
  onData: (data: string) => void,
  onError?: (error: Error) => void,
}

const QRScanner: React.FC<IQRScanner> = ({ onData, onError }) => {
  return (
    <div className="w-full m-auto">
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            onData(result.getText());
          }
          if (!!error) {
            onError && onError(error);
          }
        }}
        constraints={{ facingMode: "environment" }}
        ViewFinder={ViewFinder}
      />
    </div>
  );
};

QRScanner.defaultProps = {};

export default QRScanner;