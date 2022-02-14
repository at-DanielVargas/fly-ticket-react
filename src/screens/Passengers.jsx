import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { ReservationsSelectors, ReservationActions, FlightsActions, FlightsSelectors } from '@store';
import { FaUserAlt } from 'react-icons/fa';
import { Button, Input } from '@ui';
import { ValidatorUtil } from '@utils';

const FORM_RULES = {
    rules: {
        name: 'required|minLength:4',
        lastname: 'required|minLength:4',
        phone: 'required',
        email: 'required|email'
    },
    messages: {
        name: {
            required: 'El nombre es requerido',
            minLength: 'El nombre debe tener al menos 4 caracteres'
        },
        lastname: {
            required: 'El apellido es requerido',
            minLength: 'El apellido debe tener al menos 4 caracteres'
        },
        phone: 'El teléfono es requerido',
        email: {
            email: 'El email no es válido',
            required: 'El email es requerido'
        }
    }
};

export const Passengers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const reservationRequest = useSelector(FlightsSelectors.selectLastSearch);
    const passengers = useSelector(FlightsSelectors.selectPassengers);
    const departureFlight = useSelector(FlightsSelectors.selectDepartureFlight);
    const returnFlight = useSelector(FlightsSelectors.selectReturnFlight);

    const [reservationData, setReservationData] = useState({
        passengers: []
    });

    const [passengersErrors, setPassengersErrors] = useState([]);

    useEffect(() => {
        setReservationData({ ...reservationData, passengers });
    }, []);

    useEffect(() => {
        const actualErrors = [...passengersErrors];
        reservationData.passengers.forEach((passenger, index) => {
            ValidatorUtil.check(passenger, FORM_RULES).catch(err => {
                if (actualErrors.length === 0) {
                    actualErrors.push({ index, errors: err });
                } else {
                    actualErrors[index] = { index, errors: err };
                }
            });
            setPassengersErrors(actualErrors);
        });
    }, [reservationData]);

    const handlePassengerData = e => {
        const passengerIndex = parseInt(e.target.dataset.id);
        const passengerKey = e.target.name;

        const updatedPasengers = [...reservationData.passengers].map((passenger, index) => {
            if (index === passengerIndex) {
                return { ...passenger, [passengerKey]: e.target.value };
            }
            return passenger;
        });

        setReservationData({ ...reservationData, passengers: updatedPasengers });
    };

    const getError = (index, field) => {
        const errorForField = passengersErrors
            .find(error => error.index === index)
            ?.errors.filter(error => error.property === field);
        return errorForField?.[0]?.message;
    };

    const handleSavePassengers = () => {};

    // if (reservation === null) {
    //     return <Navigate to='/' />;
    // }

    return (
        <div className='container-lg'>
            <div className='row'>
                <div className='col-12'>
                    <h1>Información de pasajeros</h1>
                </div>

                <div className='col-12'>
                    {/* <fieldset>
                        <legend>Información del vuelo</legend>
                        <div className='row'>
                            <div className='col-md-12 d-flex direction-column'>
                                <h4>Vuelo {reservation?.flight?.code}</h4>
                            </div>
                            <div className='col-md-3 d-flex direction-column'>
                                <b>Origen</b>
                                <small className='text-gray'>{reservation?.flight?.departureCity}</small>
                            </div>
                            <div className='col-md-3 d-flex direction-column'>
                                <b>Destino</b>
                                <small className='text-gray'>{reservation?.flight?.arrivalCity}</small>
                            </div>
                            <div className='col-md-3 d-flex direction-column'>
                                <b>Fecha de salida</b>
                                <small className='text-gray'>{reservation?.flight?.departureDate}</small>
                            </div>
                            <div className='col-md-3 d-flex direction-column'>
                                <b>Fecha de llegada</b>
                                <small className='text-gray'>{reservation?.flight?.arrivalDate}</small>
                            </div>
                            <div className='col-md-3 d-flex direction-column'>
                                <b>Hora de salida</b>
                                <small className='text-gray'>{reservation?.flight?.departureTime}</small>
                            </div>
                            <div className='col-md-3 d-flex direction-column'>
                                <b>Hora de llegada</b>
                                <small className='text-gray'>{reservation?.flight?.arrivalTime}</small>
                            </div>
                            <div className='col-md-3 d-flex direction-column'>
                                <b>Pasajeros que viajan</b>
                                <small className='text-gray'>{reservation?.passengers.length}</small>
                            </div>
                            <div className='col-md-3 d-flex direction-column'>
                                <b>Total por vuelo</b>
                                <small>$ {reservation?.flight?.cost}</small>
                                <small>No incluye seleccion de asientos</small>
                            </div>
                        </div>
                    </fieldset> */}

                    <fieldset className='p-4'>
                        <legend>Pasajeros</legend>

                        <p>Por favor rellena la información necesaria de cada pasajero.</p>

                        {passengers?.map((passenger, i) => (
                            <div className='row' key={i}>
                                <div className='col-md-2'>
                                    <span>
                                        <FaUserAlt /> Pasajero {i + 1}
                                    </span>
                                </div>
                                <div className='col-md-10 no-gutter'>
                                    <div className='row'>
                                        <div className='col-md-3'>
                                            <small>Nombre</small>
                                            <Input
                                                data-id={i}
                                                name='name'
                                                onChange={handlePassengerData}
                                                placeholder='Nombre'
                                                className='input-sm'
                                            />
                                            <small className='txt-red'>{getError(i, 'name')}</small>
                                        </div>
                                        <div className='col-md-3'>
                                            <small>Apellido</small>
                                            <Input
                                                data-id={i}
                                                name='lastname'
                                                onChange={handlePassengerData}
                                                placeholder='Apellido'
                                                className='input-sm'
                                            />
                                            <small className='txt-red'>{getError(i, 'lastname')}</small>
                                        </div>
                                        <div className='col-md-3'>
                                            <small>Teléfono</small>
                                            <Input
                                                data-id={i}
                                                name='phone'
                                                onChange={handlePassengerData}
                                                placeholder='Teléfono'
                                                data-pattern='+52 (000) 000-0000'
                                                data-slots='0'
                                                data-accept='\d'
                                                className='input-sm'
                                            />
                                            <small className='txt-red'>{getError(i, 'phone')}</small>
                                        </div>
                                        <div className='col-md-3'>
                                            <small>Email</small>
                                            <Input
                                                data-id={i}
                                                name='email'
                                                onChange={handlePassengerData}
                                                placeholder='Email'
                                                className='input-sm'
                                            />
                                            <small className='txt-red'>{getError(i, 'email')}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </fieldset>

                    <div className='mt-20 d-flex justify-content-end'>
                        <Button color='default' className='button-sm' onClick={handleSavePassengers}>
                            Guardar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
