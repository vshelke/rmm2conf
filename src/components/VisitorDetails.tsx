import React, { ReactElement, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { IDataObject } from "@/pages";
import CircularProgress from "@mui/material/CircularProgress";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import NewReleasesRoundedIcon from "@mui/icons-material/NewReleasesRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import ReportRoundedIcon from "@mui/icons-material/ReportRounded";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
export interface IVisitorDetails {
  className?: string;
  data: IDataObject | null;
}

export interface IDetailItem {
  title: string;
  value: string | ReactElement;
}

const getVisitorDetails = (
  payload: IDataObject,
  onData: (data: object) => void
) => {
  return fetch("https://eo3aq3y7kt6w0lx.m.pipedream.net", {
    method: "POST",
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => onData(data));
};

const admitVisitor = (payload: object) => {
  return fetch("https://eo3ca78k1kpru8z.m.pipedream.net", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

const statusComponentMap: any = {
  loading: <CircularProgress size={25} thickness={5} />,
  default: <CircleRoundedIcon />,
  invalid: <NewReleasesRoundedIcon color="warning" />,
  valid: <VerifiedUserRoundedIcon color="success" />,
  error: <ReportRoundedIcon color="error" />,
};

const DetailItem: React.FC<IDetailItem> = ({ title, value }) => {
  return (
    <div className="flex justify-between">
      <span>{title}</span>
      <span>{value}</span>
    </div>
  );
};

const VisitorDetails: React.FC<IVisitorDetails> = ({ className, data }) => {
  const [details, setDetails] = useState<any>(null);
  const [disableAdmit, setDisableAdmit] = useState(true);

  useEffect(() => {
    if (data) {
      getVisitorDetails(data, setDetails);
    }
  }, [data, setDetails]);

  useEffect(() => {
    if (!details || details?.is_admitted) {
      setDisableAdmit(true);
    } else if (!!details || !details?.is_admitted) {
      setDisableAdmit(false);
    }
  }, [details, setDisableAdmit]);

  return (
    <Card className={className}>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="font-semibold text-xl">Visitor Details</div>
          <div className="text-base text-stone-400">
            {details?.is_valid
              ? statusComponentMap.valid
              : statusComponentMap.invalid}
          </div>
        </div>
        {details && (
          <div className="space-y-2 pt-4">
            <DetailItem
              title="Name"
              value={`${details?.data?.title} ${details?.data?.full_name}`}
            />
            <DetailItem
              title="Email"
              value={
                <a
                  className="underline text-blue-500"
                  href={`mailto:${details?.data?.email}`}
                >
                  {details?.data?.email}
                </a>
              }
            />
            <DetailItem title="Gender" value={details?.data?.gender} />
            <DetailItem title="Institute" value={details?.data?.institute} />
            <DetailItem
              title="Number"
              value={
                <a
                  className="underline text-blue-500"
                  href={`tel:${details?.data?.number}`}
                >
                  {details?.data?.number}
                </a>
              }
            />
          </div>
        )}
      </CardContent>
      <CardActions>
        <Button
          color="success"
          variant="outlined"
          className="w-full"
          disableElevation
          disabled={disableAdmit}
          onClick={() => {
            if (details) {
              admitVisitor({
                id: details?.data?.id,
                timestamp: details?.data?.timestamp,
                is_valid: details?.is_valid,
                title: details?.data?.title,
                full_name: details?.data?.full_name,
                email: details?.data?.email,
                gender: details?.data?.gender,
                institute: details?.data?.institute,
                number: details?.data?.number,
              });
              setDisableAdmit(true);
            }
          }}
        >
          Admit Visitor
        </Button>
      </CardActions>
    </Card>
  );
};

VisitorDetails.defaultProps = {};

export default VisitorDetails;
