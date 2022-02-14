import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { useClickOutSideDetect } from '@hooks';
import { Button } from '@ui';

export const Dropdown = ({ children, placeholder, icon = true, closeOnSelect = true, color, className = '' }) => {
    const ref = useRef(null);
    const menuRef = useRef(null);
    const [isOpen, setOpen] = useState(false);
    useClickOutSideDetect(ref, () => setOpen(false));
    const open = () => {
        setTimeout(() => {
            const { x, width, y, height } = menuRef.current.getBoundingClientRect();
            if (x + width > window.innerWidth) {
                ref.current.classList.add('right');
            }
            if (y + height > window.innerHeight) {
                ref.current.classList.add('top');
            }
        }, 0);
        setOpen(true);
    };

    return (
        <div className={`dropdown ${isOpen && 'active'} ${className}`} ref={ref}>
            <div className='dropdown-trigger'>
                <Button
                    onClick={() => open()}
                    type='button'
                    color={color}
                    className='button-sm with-icon-right button-block'
                >
                    {placeholder}
                    <i className='icon'>
                        <HiChevronDown />
                    </i>
                </Button>
            </div>
            <div className='dropdown-menu' ref={menuRef}>
                <div className='dropdown-content'>
                    {React.Children.map(children, (child, index) => {
                        return React.cloneElement(child, {
                            key: index
                        });
                    })}
                    <div className='dropdown-item'>
                        <Button className='mt-auto button-sm button-block' onClick={() => setOpen(false)}>
                            Cerrar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
