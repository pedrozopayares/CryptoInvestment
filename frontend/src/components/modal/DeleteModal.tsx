import React, { MouseEventHandler } from "react";
import Modal, { ModalProps } from "./Modal";
import DeleteMessage from "./DeleteMessage";
import PrimaryButton from "../form/PrimaryButton";
import SecondaryButton from "../form/SecondaryButton";
import { Trash } from "iconsax-react";
import PageBlur from "./PageBlur";

interface props extends ModalProps {
    onConfirm?: () => MouseEventHandler | undefined | void;
}

const DeleteModal: React.FC<props> = ({ onClose, onConfirm }) => {

    return (
        <PageBlur>
            <Modal onClose={onClose} title={"Esta seguro?"} >
                <DeleteMessage />
                <div className='flex justify-end p-3 gap-3'>
                    <PrimaryButton className='flex-initial' onClick={onConfirm} icon={<Trash />}>
                        Confirmar
                    </PrimaryButton>
                    <SecondaryButton className='flex-initial' onClick={onClose}>
                        Cancelar
                    </SecondaryButton>
                </div>
            </Modal>
        </PageBlur>
    )
}

export default DeleteModal;