import { EmojiSad } from "iconsax-react";
import React from "react";

const NoData: React.FC = () => {
    return (
        <div className='mt-60 text-5xl flex align-middle items-center justify-center text-gray-300'>
        <EmojiSad size={100}/>
        <span className='ml-4'>
          No hay registros
        </span>
      </div>
    )
} 

export default NoData;