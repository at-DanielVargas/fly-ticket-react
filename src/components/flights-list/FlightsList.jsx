import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './FlightsList.module.scss';
import { FlightsSelectors } from '@store';
import { BsList } from 'react-icons/bs';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { FaPlane } from 'react-icons/fa';
import { Button } from '@ui';
import { DisplayUtil } from '@utils';

export const FlightsList = ({ onFlightSelect }) => {
    const flights = useSelector(FlightsSelectors.selectSearchFlightsResults);
    const searchState = useSelector(FlightsSelectors.selectSearchLoadingState);
    return (
        <div className='row'>
            <div className='col-md-12'>
                {!searchState ? (
                    flights.map((flight, index) => (
                        <div
                            className='d-flex flex-xs-column a-items-center justify-between round bg-wash mb-5 p-3 hoverable'
                            key={index}
                            onClick={() => onFlightSelect(flight)}
                        >
                            <div className='d-flex position-relative justify-between mr-3'>
                                <div>
                                    <h4 className='m-0'>{DisplayUtil.timeFormat(flight.departureTime)}</h4>
                                    <small>{flight.departureCity}</small>
                                </div>
                                <div className='position-xs-absolute'>
                                    <FaPlane className='mr-2' />
                                </div>
                                <div>
                                    <h4 className='m-0'>{DisplayUtil.timeFormat(flight.arrivalTime)}</h4>
                                    <small>{flight.arrivalCity}</small>
                                </div>
                            </div>
                            <div className='mr-auto'>
                                <small>Duración</small>
                                <p>{DisplayUtil.timeDiff(flight.arrivalTime, flight.departureTime, true)}</p>
                            </div>
                            <div>
                                <small>Precio</small>
                                <p>{DisplayUtil.currency(flight.cost)}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='d-flex align-center justify-center'>
                        <p>Cargando...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

{
    /* <div className={styles.flight_wrapper} key={index}>
                            <div className={styles.flight}>
                                <div className={styles.flight_header}>
                                    <span>{flight.departureDate}</span>
                                    <div className='reservation-button'>
                                        <Button color='default' onClick={() => onFlightSelect(flight)}>
                                            {flight.inOffer && <div className='badge'>$</div>}
                                            <FaCalendarAlt /> Reservar
                                        </Button>
                                    </div>
                                </div>
                                <div className={styles.flight_content_header}>
                                    <h3>Vuelo {flight.code}</h3>
                                    <span>{flight.departureDate}</span>
                                </div>
                                <div className={styles.route}>
                                    <span className={styles.arrow}>
                                        <FaLongArrowAltRight />
                                    </span>
                                    <div className={styles.departure}>
                                        <span>
                                            <FaPlaneDeparture /> {flight.departureCity}
                                        </span>
                                        <span>{flight.departureTime}</span>
                                    </div>
                                    <div className={styles.arrival}>
                                        <span>
                                            {flight.arrivalCity} <FaPlaneArrival />
                                        </span>
                                        <span>{flight.arrivalTime}</span>
                                    </div>
                                </div>
                                <div className={styles.flight_footer}>
                                    <div className={styles.seats}>{flight.availableSeats} Asientos disponibles</div>
                                </div>
                            </div>
                        </div> */
}
