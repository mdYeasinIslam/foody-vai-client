import cn from "@/src/@libs/utils/_cn";
import { Button } from "antd";
import React from "react";
import { ClassNameValue } from "tailwind-merge";
interface IProps {
    className?: ClassNameValue;
    content: string;
    type?: "primary" | "link" | "text" | "default" | "dashed";
    [key: string]: any;
}

const BaseButton: React.FC<IProps> = ({
    className,
    content,
    type = "primary",
    ...props
}) => {
    return (
        <Button
            type={type}
            htmlType="submit"
            block
            {...props}
            className={cn(
                className,
                "btn-primary w-full! bg-transparent! border-2! border-(--primary-color-700)! hover:text-white! font-semibold! sm:py-5! sm:text-base!",
            )}
        >
            {content}
        </Button>
    );
};

export default BaseButton;
