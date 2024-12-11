import { Metadata } from 'next';
import React, { FC } from 'react';

export const metadata: Metadata = {
  title: "Customers"
}

const customers: FC = (): React.JSX.Element => {

  return (
    <div className='test-dashboard'>
      <h1>Customers</h1>
    </div>

  );
};

export default customers;