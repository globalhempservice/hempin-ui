import * as React from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Container({ className = "", ...rest }: ContainerProps) {
  return (
    <div
      {...rest}
      className={`mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 ${className}`}
    />
  );
}