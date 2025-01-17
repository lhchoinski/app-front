import React, { useMemo, useState } from 'react';
import {
    disableStatus,
    enableStatus,
    showSuccessToast,
} from '@/components/SweetAlert';
import { deleteData, disableData, enableData } from '@/services/GenericService';
import DeleteModal from '@/components/Modals/Delete';
import { IActionMenuProps } from './interfaces';
import ContextMenu from '@/components/ContextMenu';
import { useTranslation } from 'react-i18next';

const ActionMenu = <T,>({
    item,
    apiRoute,
    customButtons,
    hideEdit = false,
    hideDelete = false,
    hideDisable = false,
    hideEnable = false,
    deleteDirectBtn = false,
    EnableButtonText = 'button.enable',
    DisableButtonText = 'button.disable',
    EnableButtonIcon = 'IoToggleOutline',
    DisableButtonIcon = 'BsToggleOff',
    ModaltextEnable = 'message.toEnable',
    ModalTitleEnable = 'button.enable',
    ModaltextDisable = 'message.toDisable',
    ModalTitleDisable = 'button.disable',
    onRefresh,
    pageRoute,
    updateRoute = 'editar',
    activeColumnName = 'Status',
    customId,
}: IActionMenuProps<T>) => {
    const { t } = useTranslation();

    const [isDeleteMessageModal, setIsDeleteMessageModal] =
        useState<boolean>(false);
    const [currentItem, setCurrentItem] = useState<any>(null);

    const getId = (item: any): string | number => {
        if (customId) {
            return customId;
        }

        return item.id;
    };

    const onActionDisable = (item: any) => {
        disableStatus(async () => {
            await disableData(apiRoute, getId(item));

            if (onRefresh) {
                onRefresh();
            }
        },ModalTitleDisable,ModaltextDisable);
    };

    const onActionEnable = (item: any) => {
        enableStatus(async () => {
            await enableData(apiRoute, getId(item));

            if (onRefresh) {
                onRefresh();
            }
        } ,ModalTitleEnable,ModaltextEnable);
    };

    const onActionDelete = (item: any) => {
        setCurrentItem(item);
        setIsDeleteMessageModal(true);
    };

    const deleteEvent = async () => {
        await deleteData(apiRoute, getId(currentItem));
        if (onRefresh) {
            onRefresh();
        }
        setIsDeleteMessageModal(false);
        setCurrentItem(null);
        await showSuccessToast();
    };

    const buttons = useMemo(() => {
        const btns = customButtons
            ? typeof customButtons === 'function'
                ? customButtons(item)
                : customButtons
            : [];

        const hasEditButton = btns.some(
            btn => btn.text === t('button.edit') || btn.icon === 'LuPencilLine',
        );

        if (!hideEdit && !hasEditButton) {
            btns.push({
                text: t('button.edit'),
                icon: 'LuPencilLine',
                to: `/${pageRoute ? pageRoute : apiRoute}/${updateRoute}/${getId(item)}`,
            });
        }

        const hasDisableButton = btns.some(
            btn =>
                btn.text === t(DisableButtonText) ||
                btn.icon === DisableButtonIcon,
        );

        if (!hideDisable && item[activeColumnName] && !hasDisableButton) {
            btns.push({
                text: t(DisableButtonText),
                icon: DisableButtonIcon,
                onClick: () => onActionDisable(item),
            });
        }

        const hasEnableButton = btns.some(
            btn =>
                btn.text === t(EnableButtonText) ||
                btn.icon === EnableButtonIcon,
        );

        if (!hideEnable && !item[activeColumnName] && !hasEnableButton) {
            btns.push({
                text: t(EnableButtonText),
                icon: EnableButtonIcon,
                onClick: () => onActionEnable(item),
            });
        }

        const hasDeleteButton = btns.some(
            btn =>
                btn.text === t('button.delete') || btn.icon === 'FaRegTrashAlt',
        );

        if (!hideDelete && !item[activeColumnName] && !hasDeleteButton) {
            btns.push({
                text: t('button.delete'),
                icon: 'FaRegTrashAlt',
                color: 'red',
                onClick: () => onActionDelete(item),
            });
        }

        return btns;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        item,
        customButtons,
        hideEdit,
        hideDelete,
        hideDisable,
        hideEnable,
        deleteDirectBtn,
        t,
        pageRoute,
        apiRoute,
        updateRoute,
        activeColumnName,
    ]);

    return (
        <>
            <ContextMenu<T> data={item} buttons={buttons} />

            <DeleteModal
                isDeleteMessageModal={isDeleteMessageModal}
                setIsDeleteMessageModal={setIsDeleteMessageModal}
                deleteEvent={deleteEvent}
            />
        </>
    );
};

export default ActionMenu;
