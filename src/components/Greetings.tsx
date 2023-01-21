import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useQuery } from "urql";
import { CircularProgress } from "@mui/material";

export interface IGreetings {
  className?: string;
}

const StatsQuery = `
query Stats {
  admitted_count: visitor_aggregate(where: {has_attended: {_eq: true}}) {
    aggregate {
      count
    }
  }
  total_count: visitor_aggregate {
    aggregate {
      count
    }
  }
}
`;

const Greetings: React.FC<IGreetings> = ({ className }) => {
  const [result, reexecuteQuery] = useQuery({
    query: StatsQuery,
  });

  const { data, fetching, error } = result;

  return (
    <Card className={className}>
      <CardContent>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl">Visitor Onboarding</h2>
          {fetching ? <CircularProgress size={25} thickness={5}/> : <div>{data?.admitted_count?.aggregate?.count} / {data?.total_count?.aggregate?.count}</div>} 
        </div>
      </CardContent>
      <div></div>
    </Card>
  );
};

Greetings.defaultProps = {};

export default Greetings;
