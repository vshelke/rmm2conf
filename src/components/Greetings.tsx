import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export interface IGreetings {
  className?: string
}

const Greetings: React.FC<IGreetings> = ({ className }) => {
  return (
    <Card className={className}>
      <CardContent>
        <Typography className="font-semibold text-xl">
          Visitor Onboarding
        </Typography>
      </CardContent>
      <div></div>
    </Card>
  );
};

Greetings.defaultProps = {};

export default Greetings;
