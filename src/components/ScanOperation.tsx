import QRScanner from "@/components/QRScanner";
import React, { useState, useMemo, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Switch } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { getChipsMap, getStatus } from "@/utils/helpers";

export interface IScanOperation {
  className?: string;
  onParsedData?: (data: object) => void;
}

const ScanOperation: React.FC<IScanOperation> = ({ className, onParsedData }) => {
  const [scanner, setScanner] = useState(false);
  const [data, setData] = useState("");
  const [error, setError] = useState<Error>();
  const [scanChip, dataChip, dataStatus] = useMemo(() => {
    const [scanStatus, dataStatus] = getStatus(scanner, data, error);
    const [scanChip, dataChip] = getChipsMap(scanStatus, dataStatus, error);
    return [scanChip, dataChip, dataStatus]
  }, [scanner, data, error]);

  useEffect(() => {
    if (dataStatus === "valid" && onParsedData) {
      const [id, timestamp] = atob(data).split("-");
      onParsedData({id, timestamp});
    }
  }, [data, dataStatus, onParsedData]);

  return (
    <Card className={className}>
      <CardContent>
        <div className="flex items-center justify-between">
          <Typography className="font-semibold text-xl text-stone-700">
            Scan QR Code
          </Typography>
          <Switch
            checked={scanner}
            onChange={(event, checked) => setScanner(checked)}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
        {scanner && (
          <QRScanner className="pt-3" onData={setData} onError={setError} />
        )}
      </CardContent>
      <div className={`${scanner && "pb-4 px-4"}`}>
        {scanner && (
          <Stack direction="row" spacing={1}>
            <Chip {...scanChip} />
            <Chip {...dataChip} />
          </Stack>
        )}
      </div>
    </Card>
  );
};

ScanOperation.defaultProps = {};

export default ScanOperation;
