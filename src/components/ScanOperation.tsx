import QRScanner from "@/components/QRScanner";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Switch } from "@mui/material";

export interface IScanOperation {
  className?: string

}

const ScanOperation: React.FC<IScanOperation> = ({ className }) => {
  const [scanner, setScanner] = useState(false);

  return (
    <Card className={className}>
      <CardContent>
        <div className="flex items-center justify-between">
          <Typography className="font-semibold text-xl">
            Scan QR Code
          </Typography>
          <Switch 
          checked={scanner}
          onChange={(event, checked) => setScanner(checked)}
          inputProps={{ 'aria-label': 'controlled' }}/>
        </div>
        {scanner && <QRScanner onData={data => console.log(data)}/>}
      </CardContent>
      <div></div>
    </Card>
  );
};

ScanOperation.defaultProps = {}

export default ScanOperation