import React from 'react';

export const DropdownItem = ({ children, onClick, isDivider }) => {
    return (
        <div className={`dropdown-item ${isDivider && 'dropdown-ivider'}`} onClick={onClick}>
            {children}
        </div>
    );
};
