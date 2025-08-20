export const orders = [
    {
        id: 7,
        company_id:1,
        farmer_id:2,
        harvest_id:3,
        expires_at:4,
        quantity:5,
        unit_id:6,
        price:7,
        currency_id:8,
        created_at:9,
        updated_at:9,
        status:1
    },
];
export const orders_Cols = [
    { title: 'ID', align: 'left', className: '', attribute: 'id' },
    { title: 'ID de la compañía', align: 'left', className: '', attribute: 'company_id' },
    { title: 'ID granjero', align: 'left', className: '', attribute: 'farmer_id' },
    { title: 'ID cosechas', align: 'left', className: '', attribute: 'harvest_id' },
    { title: 'Expira', align: 'right', className: '', attribute: 'expires_at' },
    { title: 'Cantidad', align: 'right', className: '', attribute: 'quantity' },
    { title: 'ID unidad', align: 'right', className: '', attribute: 'unit_id' },
    { title: 'Precio', align: 'right', className: '', attribute: 'price' },
    { title: 'Divisa', align: 'left', className: '', attribute: 'currency_id' },
    { title: 'Fecha de creación', align: 'right', className: '', attribute: 'created_at' },
    { title: 'Fecha de actualización', align: 'right', className: '', attribute: 'updated_at' },
    { title: 'Estado', align: 'left', className: '', attribute: 'status' }
];
export default orders;