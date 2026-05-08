import cn from "@/src/@libs/utils/_cn";
import React from "react";
import { ClassNameValue } from "tailwind-merge";
interface IProps {
  className?: ClassNameValue;
}
const BaseLoader: React.FC<IProps> = ({ className }) => {
  const sharedStyle: React.CSSProperties = {
    content: "",
    width: "100%",
    height: "100%",
    display: "block",
    border: "5.6px solid var(--primary-color-800)",
    borderRadius: "50%",
    boxShadow: "0 -33.6px 0 -5.6px var(--primary-color-800)",
    position: "absolute",
    animation: "spinner-rotate 1.25s infinite ease",
  };

  return (
    <div className={cn(className, "relative w-[22.4px] h-[22.4px] ")}>
      <div
        style={{
          ...sharedStyle,
          animation:
            "spinner 0.5s backwards, spinner-rotate 1.25s 0.5s infinite ease",
        }}
      />
      <div
        style={{
          ...sharedStyle,
          animationDelay: "0s, 1.25s",
        }}
      />
      <style>
        {`
          @keyframes spinner {
            from {
              box-shadow: 0 0 0 -5.6px #474bff;
            }
          }

          @keyframes spinner-rotate {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default BaseLoader;
