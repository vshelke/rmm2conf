import React, { ReactElement } from "react";

export interface IDetailItem {
  title: string;
  value: string | ReactElement;
}

const DetailItem: React.FC<IDetailItem> = ({ title, value }) => {
  return (
    <div className="flex justify-between">
      <span>{title}</span>
      <span>{value}</span>
    </div>
  );
};

DetailItem.defaultProps = {};

export default DetailItem;
