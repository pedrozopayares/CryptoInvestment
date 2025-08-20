import React, { MouseEventHandler } from 'react'
import { CloseCircle } from 'iconsax-react';



export interface ModalProps {
    title?: String | React.ReactElement;
    children?: React.ReactNode;
    onClose: () => MouseEventHandler | undefined | void;
}

const Modal: React.FC<ModalProps> = ({ children, title, onClose }) => {
  return (
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[10000]'>
            <div>
                <div className="flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl">
                        <div className='flex justify-end' onClick={onClose}>
                            <CloseCircle size="40" color="black"/>                           
                        </div>  
                        <div className="flex justify-between">
                            <h2 className="text-2xl font-bold mb-3 text-gray-900">{ title }</h2>
                        </div>
                       {children}
                    </div>
                </div>
            </div>                                   
        </div>
  )
}
export default Modal;
