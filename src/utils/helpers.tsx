import QrCodeScannerRoundedIcon from "@mui/icons-material/QrCodeScannerRounded";
import BrokenImageRoundedIcon from "@mui/icons-material/BrokenImageRounded";
import CenterFocusStrongRoundedIcon from "@mui/icons-material/CenterFocusStrongRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DataObjectRoundedIcon from "@mui/icons-material/DataObjectRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import FormatAlignRightRoundedIcon from "@mui/icons-material/FormatAlignRightRounded";
import DangerousRoundedIcon from "@mui/icons-material/DangerousRounded";

const isBase64 = (value: string) =>
  /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(
    value
  );

export const getStatus = (scanner: boolean, data: string, error?: Error) => {
  let scanStatus = "idle";
  let dataStatus = "not_found";
  if (scanner) {
    if (!!error) {
      if (error.name === "e") {
        scanStatus = "scanning";
      } else {
        scanStatus = "error";
      }
    } else {
      scanStatus = "scanning";
    }

    if (data === "") {
      dataStatus = "not_found";
    } else {
      scanStatus = "success";
      if (isBase64(data)) {
        try {
          const [_, __] = atob(data).split("-");
          dataStatus = "valid";
        } catch (parseError) {
          dataStatus = "format_error";
        }
      } else {
        dataStatus = "invalid_data";
      }
    }
  }
  return [scanStatus, dataStatus];
}

export const getChipsMap = (scanStatus: string, dataStatus: string, error?: Error) => {
  const scanMap: any = {
    idle: {
      label: "Standby",
      color: "default",
      icon: <QrCodeScannerRoundedIcon />,
    },
    error: {
      label: error?.name,
      color: "error",
      icon: <BrokenImageRoundedIcon />,
    },
    scanning: {
      label: "Scanning",
      color: "warning",
      icon: <CenterFocusStrongRoundedIcon />,
    },
    success: {
      label: "Scanned",
      color: "success",
      icon: <CheckCircleRoundedIcon />,
    },
  };
  const dataMap: any = {
    not_found: {
      label: "No Data",
      color: "default",
      icon: <DataObjectRoundedIcon />,
    },
    valid: {
      label: "QR Code Valid",
      color: "success",
      icon: <VerifiedRoundedIcon />,
    },
    format_error: {
      label: "Invalid Format",
      color: "error",
      icon: <FormatAlignRightRoundedIcon />,
    },
    invalid_data: {
      label: "Invalid Data",
      color: "error",
      icon: <DangerousRoundedIcon />,
    },
  };
  return [scanMap[scanStatus], dataMap[dataStatus]];
};
