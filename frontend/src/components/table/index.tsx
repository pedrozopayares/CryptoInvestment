import React from "react";
import TableHead from "./TableHead";
import { TableHeadType, TableProps } from "./TableTypes";
import Paginated from "./paginated";
import IconButton from "../form/IconButton";
import { Edit2, Trash } from "iconsax-react";
import { UnknownAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

// Render tipos de celda
const renderImage = (src: string) => (
  <div className="m-2 p-10 outline rounded-full outline-gray-400">
    <img src={src} />
  </div>);

const renderLink = (src: string) =>
  <a className="text-blue-600 visited:text-purple-600" href={src}>
    {src}
  </a>;

const renderCheckbox = (value: boolean) =>
  value ? (
    <span className="text-green-500">✅</span>
  ) : (
    <span>❌</span>
  );

function renderTableCellContent(col: TableHeadType, row: object) {

  const attribute = col.attribute as keyof object;

  if (col.attributeType === 'image') return renderImage(row[attribute]);
  if (col.attributeType === 'boolean') return renderCheckbox(row[attribute] === 1);
  if (col.attributeType === 'link') return renderLink(row[attribute]);
  return row[attribute];
}

// El componente tabla depende 
const Table: React.FC<TableProps> = (props) => {

  const dispatch = useDispatch();
  const { columns, store, data } = props;
  //const data = useSelector(store?.selectors.selectData); -- puede que no sea posible extraer la data del store


  const renderHead = () => { // renderizar la fila de headers para cada columna

    return (
      <tr>
        {columns.map((col, i) => <TableHead key={i} {...col} />)}
        <TableHead title={"Opciones"} align="center" />
      </tr>
    );
  };

  
  const renderRows = () => { // renderizar las filas
    const cellStyle =
    "border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400";
    
    return (
      <>
        {data.map((row, row_index) => {
          
          // handelers para los botones de opciones
          const handleFormIcon = () => {
            dispatch?.(store?.actions.setSelected(row) as unknown as UnknownAction);
            dispatch?.(store?.actions.setFormState(1) as unknown as UnknownAction);
          }
        
          const handleDeleteIcon = () => {
            dispatch?.(store?.actions.setSelected(row) as unknown as UnknownAction);
            dispatch?.(store?.actions.setDeleteState(1) as unknown as UnknownAction);
          }

          return ( // renderizar cada celda extrayendo la  propiedad que corresponda segun la columna actual
            <tr key={"row_" + row_index}>
              {columns.map((col, col_index) => {
                return (
                  <td className={cellStyle} key={`col_${col_index}`}>
                    {renderTableCellContent(col, row)}
                  </td>
                );
              })}
              <td>
                <div className="flex">
                  <div className="p-2 flex-1">
                    <IconButton
                      type='green'
                      icon={<Edit2 />}
                      onClick={handleFormIcon}
                    />
                  </div>
                  <div className="p-2 flex-1">
                    <IconButton
                    type="red"
                    icon={<Trash/>}
                    onClick={handleDeleteIcon}
                    />
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </>
    );
  };


  const styles = 
    `absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] 
    dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),
    rgba(255,255,255,0.5))]`;

  return ( // renderizar tabla
    <div className="mt-4 -mb-3">
      <div className="relative rounded-lg bg-gray-50 dark:bg-gray-700">
        <div
          className={styles}
          style={{ backgroundPosition: "10px 10px" }}
        ></div>
        <div className="relative rounded-xl overflow-auto">
          <div className="shadow-sm overflow-auto my-6">
            <table className="border-collapse table-auto w-full text-sm">
              <thead>{renderHead()}</thead>
              <tbody className="bg-white dark:bg-slate-800">
                {renderRows()}
              </tbody>
            </table>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5"></div>
      </div>
      <Paginated />
    </div>
  );

}

export default Table;
