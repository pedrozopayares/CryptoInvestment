export interface Orders{
    id: number;
    company_id: number,
    farmer_id: number,
    harvest_id:number,
    expires_at:number,
    quantity:number,
    unit_id:number,
    price:number,
    currency_id:number,
    created_at:string,
    updated_at:string,
    status:string
}

export interface OrdersList {
    orders: Orders[];
}

