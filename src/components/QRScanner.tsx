import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import ViewFinder from "./ViewFinder";

export interface IQRScanner {}

const isBase64 = (value: string) => /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(value);

const QRScanner: React.FC<IQRScanner> = () => {
  const [data, setData] = useState("No result");
  const [error, setError] = useState<string | null>(null);

  return (
    <div style={{ width: "100%", margin: "auto" }} className="flex flex-col">
      <QrReader
        className="pb-5"
        onResult={(result, error) => {
          if (!!result) {
            setData(result.getText());
          }
          if (!!error) {
            console.info(error);
            setError(error.message);
          }
        }}
        constraints={{ facingMode: "environment" }}
        ViewFinder={ViewFinder}
      />
      <h3 className="text-center text-2xl font-semibold text-stone-500">{data}</h3>
      <h3 className="text-center text-xl font-normal text-stone-500">{isBase64(data) ? atob(data) : ""}</h3>
      <h3 className="text-center text-sm font-light text-stone-400">{error}</h3>
    </div>
  );
};

QRScanner.defaultProps = {};

export default QRScanner;
