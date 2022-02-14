import React from 'react';
import { useSelector } from 'react-redux';
import { ReservationsSelectors } from '@store';
import { Plane } from '@components';
export const Confirm = () => {
    const reservation = useSelector(ReservationsSelectors.currentReservation) || {};
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-8'>
                    <h1 className='text-center'>Confirmar Reservación</h1>
                </div>
                <div className='col-md-4'></div>
            </div>
        </div>
    );
};
