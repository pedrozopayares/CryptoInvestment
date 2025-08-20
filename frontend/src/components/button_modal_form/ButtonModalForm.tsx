import React, { useState } from 'react'
import { Edit } from 'iconsax-react'
import Modal from '../modal/Modal';
import PrimaryButton from '../form/PrimaryButton';
import SecondaryButton from '../form/SecondaryButton';


interface props {
    renderForm: React.ReactNode,
    title?: string
}
export const ButtonModalForm:React.FC<props> = ({renderForm, title}) => {

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false)

  return (
    <>
        <button className='mx-8' onClick={()=>setIsOpen(true)}><Edit size="28" color="black"/></button>
        {
            isOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[10000]'>
                        <div>
                            <div className="flex items-center justify-center">
                                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl">
                                    <Modal title={title} onClose={closeModal} >
                                        { renderForm }
                                            <div className='flex justify-end p-3 gap-3'>
                                                <PrimaryButton className='flex-initial'>
                                                    Enviar
                                                </PrimaryButton>
                                                <SecondaryButton className='flex-initial' onClick={closeModal}>
                                                    Cerrar
                                                </SecondaryButton>
                                            </div> 
                                    </Modal>
                                </div>
                            </div>
                        </div>
                </div>
            )
        }
    </>
  )
}

export default ButtonModalForm;