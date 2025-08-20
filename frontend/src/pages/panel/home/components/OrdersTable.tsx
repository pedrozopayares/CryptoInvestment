
import Table from '@/components/table/index.tsx';
import orders, { orders_Cols } from '../orders_data';
import { TableHeadType } from '@/components/table/TableTypes';

const OrdersTable: React.FC = () => {
  return (<Table  columns={orders_Cols as TableHeadType[]} data={orders} />)
}
export default OrdersTable;