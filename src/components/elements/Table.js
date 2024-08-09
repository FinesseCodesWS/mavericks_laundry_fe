import React from "react";

export function Table({ children, style, className }) { return <table style={style} className={ className }>{ children }</table> }
export function Thead({ children,  style, className }) { return <thead className={ className }  style={style}>{ children }</thead> }
export function Tbody({ children,  style, className }) { return <tbody className={ className } style={style}>{ children }</tbody> }
export function Th({ children, className, style }) { return <th className={ className }  style={style}>{ children }</th> }
export function Tr({ children,  style, className, onClick }) { return <tr onClick={onClick} style={style} className={ className }>{ children }</tr> }
export function Td({ children,  style, className }) { return <td className={ className } style={style}>{ children }</td> }