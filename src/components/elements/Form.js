import React from "react";

export default function Form({ children, className, ...rest }) {
  return (
    <form {...rest} className={className}>
      {children}
    </form>
  );
}
