import React, { useEffect, useMemo, useState } from "react";
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
import { useMutation, useQuery } from "urql";
import DetailItem from "./DetailItem";

export interface IVisitorDetails {
  className?: string;
  data: IDataObject | null;
}

const GetVisitorDetailsQuery = `
query GetVisitorDetails($reference_id: String!) {
  visitor(where: {
    reference_id: {_eq: $reference_id}
  }) {
    id
    timestamp
    email
    title
    full_name
    age
    sex
    designation
    institute
    address
    mobile
    mmc_registration
    has_attended
  }
}`;
const AdmitVisitorMutation = `
mutation AdmitVisitor($id: uuid!) {
  update_visitor_by_pk(pk_columns: {id: $id}, _set: {has_attended: true}) {
    id
    has_attended
  }
}
`;

const statusComponentMap: any = {
  loading: <CircularProgress size={25} thickness={5} />,
  default: <CircleRoundedIcon />,
  invalid: <NewReleasesRoundedIcon color="warning" />,
  valid: <VerifiedUserRoundedIcon color="success" />,
  error: <ReportRoundedIcon color="error" />,
};

const VisitorDetails: React.FC<IVisitorDetails> = ({ className, data }) => {
  const [disableAdmit, setDisableAdmit] = useState(true);
  const [
    { data: visitorDetails, fetching: isLoading, error },
    reexecuteVisitorQuery,
  ] = useQuery({
    query: GetVisitorDetailsQuery,
    variables: { reference_id: data?.id },
  });
  const [updateVisitorResult, admitVisitor] = useMutation(AdmitVisitorMutation);
  const isValid = useMemo(() => {
    if (!!visitorDetails && visitorDetails?.visitor?.length === 1) {
      return visitorDetails?.visitor?.[0]?.timestamp === data?.timestamp;
    }
    return false;
  }, [visitorDetails, data]);

  const visitorData =
    visitorDetails?.visitor?.length === 1 ? visitorDetails?.visitor?.[0] : null;
  useEffect(() => {
    if (!visitorData || visitorData?.has_attended) {
      setDisableAdmit(true);
    } else if (!!visitorData || !visitorData?.has_attended) {
      setDisableAdmit(false);
    }
  }, [visitorData, setDisableAdmit]);

  return (
    <Card className={className}>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="font-semibold text-xl">Visitor Details</div>
          <div className="text-base text-stone-400">
            {isLoading
              ? statusComponentMap.loading
              : isValid
              ? statusComponentMap.valid
              : statusComponentMap.default}
          </div>
        </div>
        {visitorData && (
          <div className="space-y-2 pt-4">
            <DetailItem
              title="Name"
              value={`${visitorData?.title} ${visitorData?.full_name}`}
            />
            <DetailItem
              title="Email"
              value={
                <a
                  className="underline text-blue-500"
                  href={`mailto:${visitorData?.email}`}
                >
                  {visitorData?.email}
                </a>
              }
            />
            <DetailItem title="Gender" value={visitorData?.sex} />
            <DetailItem title="Institute" value={visitorData?.institute} />
            <DetailItem
              title="Number"
              value={
                <a
                  className="underline text-blue-500"
                  href={`tel:${visitorData?.mobile}`}
                >
                  {visitorData?.mobile}
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
            if (visitorData)
              admitVisitor({ id: visitorData?.id })
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
