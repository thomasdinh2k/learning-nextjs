import React, { FC } from 'react';

interface invoicesProps {}

const invoices: FC<invoicesProps> = (): React.JSX.Element => {
  return (
    <div className="invoices">
      <h1>invoices</h1>
    </div>
  );
};

export default invoices;
