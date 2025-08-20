import { useState } from 'react'
import { ProfileDelete } from 'iconsax-react'
import Modal from '../modal/Modal';
import DeleteMessage from '../modal/DeleteMessage';
import PrimaryButton from '../form/PrimaryButton';
import SecondaryButton from '../form/SecondaryButton';

export default function ButtonModalDelete () {

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false)

  return (
    <>
        <button className='mx-8' onClick={()=>setIsOpen(true)}>
            <ProfileDelete
                size="28"
                color="black"
            /></button>
        {
            isOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[10000]'>
                        <div>
                            <div className="flex items-center justify-center">
                                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl">
                                    <Modal   onClose={closeModal}  title={"Confirmar"} >
                                        <DeleteMessage/> 
                                            <div className='flex justify-end p-3 gap-3'>
                                                <PrimaryButton className='flex-initial w-20'>
                                                    Aceptar
                                                </PrimaryButton>
                                                <SecondaryButton className='flex-initial w-20' onClick={closeModal}>
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
