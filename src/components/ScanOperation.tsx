import QRScanner from "@/components/QRScanner";
import React, { useState, useMemo, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Switch } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { getChipsMap, getStatus } from "@/utils/helpers";
import { IDataObject } from "@/pages";
import FaceRoundedIcon from '@mui/icons-material/FaceRounded';

export interface IScanOperation {
  className?: string;
  onParsedData?: (data: IDataObject) => void;
}

const ScanOperation: React.FC<IScanOperation> = ({ className, onParsedData }) => {
  const [scanner, setScanner] = useState(false);
  const [data, setData] = useState("");
  const [error, setError] = useState<Error>();
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [scanChip, dataChip, dataStatus] = useMemo(() => {
    const [scanStatus, dataStatus] = getStatus(scanner, data, error);
    const [scanChip, dataChip] = getChipsMap(scanStatus, dataStatus, error);
    return [scanChip, dataChip, dataStatus]
  }, [scanner, data, error]);

  useEffect(() => {
    if (dataStatus === "valid" && onParsedData) {
      const [id, timestamp] = atob(data).split("-");
      setVisitorId(id);
      onParsedData({id, timestamp});
    }
  }, [data, dataStatus, onParsedData]);

  return (
    <Card className={className}>
      <CardContent>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-stone-700">
            Scan QR Code
          </h2>
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
            {visitorId && <Chip label={`ID: ${visitorId}`} color="info" icon={<FaceRoundedIcon />} />}
          </Stack>
        )}
      </div>
    </Card>
  );
};

ScanOperation.defaultProps = {};

export default ScanOperation;
