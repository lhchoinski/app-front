import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { DynamicIcons } from '@/components/DynamicIcons';
import { IDeleteModalProps } from './interfaces';

const DeleteModal: React.FC<IDeleteModalProps> = ({
                                                      isDeleteMessageModal,
                                                      setIsDeleteMessageModal,
                                                      deleteEvent,
                                                  }) => {
    const { t } = useTranslation();

    return (
        <div>
            <Transition appear show={isDeleteMessageModal} as={Fragment}>
                <Dialog
                    as="div"
                    open={isDeleteMessageModal}
                    onClose={() => setIsDeleteMessageModal(false)}
                    className="relative z-[51]"
                >
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-[black]/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 z-[999] overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4 ">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="panel border-0 p-0 rounded-lg overflow-hidden md:w-full max-w-lg w-[90%] my-8">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsDeleteMessageModal(false);
                                        }}
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-white-dark"
                                    >
                                        <DynamicIcons name={'MdClose'} />
                                    </button>

                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                        {t('button.delete')}
                                    </div>

                                    <div className="p-5 text-center">
                                        <div className="text-white bg-danger ring-4 ring-danger/30 p-4 rounded-full w-fit mx-auto">
                                            <DynamicIcons
                                                name={'FaRegTrashAlt'}
                                            />
                                        </div>
                                        <div className="text-base sm:w-3/4 mx-auto mt-5">
                                            {t('message.deleteData')}
                                        </div>

                                        <div className="flex justify-center items-center mt-8">
                                            <button
                                                onClick={() => {
                                                    setIsDeleteMessageModal(
                                                        false,
                                                    );
                                                }}
                                                type="button"
                                                className="btn btn-outline-danger"
                                            >
                                                {t('button.cancel')}
                                            </button>
                                            <button
                                                onClick={deleteEvent}
                                                type="button"
                                                className="btn btn-primary ltr:ml-4 rtl:mr-4"
                                            >
                                                {t('button.delete')}
                                            </button>
                                        </div>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default DeleteModal;
