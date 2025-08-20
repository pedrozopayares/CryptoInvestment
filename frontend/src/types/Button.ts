import { ReactNode } from "react";

export interface ButtonProps {
    children: React.ReactNode;
    onClick?: (value: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    icon?: ReactNode ;
}