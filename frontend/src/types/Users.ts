export interface User {
    id?: number;
    username?: string;
    email:string;
    password?: string; // Optional for registration, required for login
    token?: string; // Optional, will be set after login
    created_at?: string;
    updated_at?: string;
}

export interface UserList {
    users: User[];
}