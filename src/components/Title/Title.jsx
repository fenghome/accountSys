import React from 'react';
import { titleClass } from './index.css';
export default function Title({title}){
    return (
        <div className={titleClass}>{title}</div>
    )
}