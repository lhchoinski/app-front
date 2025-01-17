import { Dispatch, SetStateAction } from 'react';

export interface IDeleteModalProps {
    isDeleteMessageModal: boolean;
    setIsDeleteMessageModal: Dispatch<SetStateAction<boolean>>;
    deleteEvent: () => void;
}
