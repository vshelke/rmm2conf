import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export interface IGreetings {
  className?: string
}

const Greetings: React.FC<IGreetings> = ({ className }) => {
  return (
    <Card className={className}>
      <CardContent>
        <h2 className="font-semibold text-xl">
          Visitor Onboarding
        </h2>
      </CardContent>
      <div></div>
    </Card>
  );
};

Greetings.defaultProps = {};

export default Greetings;
