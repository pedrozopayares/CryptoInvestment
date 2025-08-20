import React from "react";
import OrdersTable from './components/OrdersTable';
import PageTitle from '../components/PageTitle';

const Home: React.FC  = () => {
  return (
    <div>
     <PageTitle title='Ventas'/>
      <div className='my-5'>
        <OrdersTable/>
      </div>
    </div>
  );
};

export default Home;