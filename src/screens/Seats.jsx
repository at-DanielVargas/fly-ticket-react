import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { ReservationsSelectors, ReservationActions } from '@store';
import { Plane } from '@components';
export const Seats = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const reservation = useSelector(ReservationsSelectors.currentReservation);
    const passengers = useSelector(ReservationsSelectors.selectPassengers);
    const [seatsState, setSeatsState] = useState({
        seats: reservation?.flight?.seats.flat().filter(seat => seat.available) || []
    });

    const handleSeatSelect = seat => {
        console.log(seat);
    };

    if (!reservation) {
        return <Navigate to='/' />;
    }

    return (
        <div className='container-lg'>
            <div className='row'>
                <div className='col-12'>
                    <h1>Selección de asiento </h1>
                </div>
                <div className='col-12'>
                    <fieldset>
                        <legend>Asientos</legend>
                        <div className='row'>
                            <div className='col-md-8'>
                                <p>Usuarios</p>
                                <ul>
                                    {passengers.map((passenger, index) => (
                                        <li key={index}>
                                            {passenger.name} {passenger.lastname}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='col-md-4'>
                                <Plane seatsRows={reservation?.flight?.seats} onSeatSelect={handleSeatSelect} />
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    );
};
