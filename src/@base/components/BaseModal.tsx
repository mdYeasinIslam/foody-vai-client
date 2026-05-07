import { Modal, ModalProps } from 'antd';
import React from 'react';

interface BaseModalProps extends ModalProps {
    children?: React.ReactNode;
    title?: string;
    onCancel?: () => void;
    onOk?: () => void;
    open?: boolean;
    footer?: string;
}

const BaseModal: React.FC<BaseModalProps> = ({
    title,
    open,
    onCancel,
    onOk,
    children,
    footer = null,
    ...props
}) => {
    return (
        <Modal
            title={title}
            open={open}
            onCancel={onCancel}
            onOk={onOk}
            footer={footer}
            {...props}
        >
            {children}
        </Modal>
    );
};

export default BaseModal;