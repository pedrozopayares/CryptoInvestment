import { IconProps } from "iconsax-react";
import React, { MouseEventHandler, ReactElement } from "react"

interface IconButtonProps {
    icon?: ReactElement<IconProps>;
    onClick?: MouseEventHandler;
    type?: 'green' | 'red' | 'yellow' | 'blue' | 'violet' | 'black';
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, type })=>{

    let color = type;
    color ??= 'green';

    return (
        <button className={
            `m-4 p-4 rounded-full 
            transition duration-200 border shadow-sm flex 
            items-center justify-center font-medium 
            cursor-pointer focus:ring-4 focus:ring-primary 
            focus:ring-opacity-20 focus-visible:outline-none 
            [&:hover:not(:disabled)]:bg-opacity-90 
            [&:hover:not(:disabled)]:border-opacity-90 
            [&:not(button)]:text-center
            bg-${color}-200 dark:bg-${color}-950
            text-slate-600 dark:text-slate-400`
            
        } onClick={onClick}>
            {icon}
        </button>
    )
}
export default IconButton
