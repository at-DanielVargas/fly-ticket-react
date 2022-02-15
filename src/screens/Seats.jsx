import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ReservationsSelectors } from '@store'
import { Plane } from '@components'
import { DEPARTURE_KEY, RETURN_KEY, SEARCH_TYPES } from '@constants'
import { DisplayUtil } from '@utils'
// eslint-disable-next-line no-unused-vars
import { Formik, Field, ErrorMessage } from 'formik'
// eslint-disable-next-line no-unused-vars
import { object, string } from 'yup'

const Seats = () => {
  const departureSeats = useSelector( ReservationsSelectors.selectDeparturePasengersSeats )
  const returnSeats = useSelector( ReservationsSelectors.selectReturnPassengersSeats )
  const departureFlightSeats = useSelector( ReservationsSelectors.selectDepartureFlightSeatsRows )
  const returnFlightSeats = useSelector( ReservationsSelectors.selectReturnFlightSeatsRows )
  const passengers = useSelector( ReservationsSelectors.selectPassengers )
  const mode = useSelector( ReservationsSelectors.selectFlightMode )

  const [flightType, setFlightType] = useState( DEPARTURE_KEY )

  const handleFlightTypeChange = type => {
    setFlightType( type )
  }

  const getPassengerSeatForFlight = passenger => {
    const seat = passenger.seats.find( seat => seat.type === flightType )
    if ( seat ) {
      return seat.row + seat.seat
    }
  }

  const getFlightRowsForMode = () => {
    return flightType === DEPARTURE_KEY ? departureFlightSeats : returnFlightSeats
  }

  const getPassengerSelectedSeatsForMode = () => {
    return flightType === DEPARTURE_KEY ? departureSeats : returnSeats
  }

  const handleSeatSelect = seat => {
    console.log( seat )
  }

  const initialValues = {
    passengers: [...passengers]
  }

  const validationSchema = object().shape( {} )

  return (
    <div className='container-lg'>
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        <div className='row'>
          <div className='col-12'>
            <h1>Selección de asiento </h1>

            {mode === SEARCH_TYPES.ROUNDTRIP && (
              <div className='button-group'>
                <button
                  className='button button-sm'
                  onClick={() => handleFlightTypeChange( DEPARTURE_KEY )}
                >
                                    Vuelo de ida
                </button>
                <button className='button button-sm' onClick={() => handleFlightTypeChange( RETURN_KEY )}>
                                    Vuelo de regreso
                </button>
              </div>
            )}
          </div>
          <div className='col-12'>
            <fieldset className='p-4'>
              <legend>Asientos</legend>
              <div className='d-xs-block d-md-flex'>
                <div className='w-100 mr-4'>
                  <p>Pasajeros</p>
                  <div className='list-group list-group-checkable'>
                    {passengers.map( ( passenger, i ) => (
                      <label className='list-group-item py-3' htmlFor={`passenger-${i}`} key={i}>
                        <input
                          className='list-group-item-check'
                          type='radio'
                          name='passenger'
                          id={`passenger-${i}`}
                        />
                        <small>
                                                    Pasajero {i + 1} {DisplayUtil.pasengerLabel( passenger )}
                        </small>
                        <p>
                          {passenger.name} {passenger.lastname}
                        </p>
                        <small>
                                                    Asiento asignado <b>{getPassengerSeatForFlight( passenger )}</b>
                        </small>
                      </label>
                    ) )}
                  </div>
                </div>
                <div>
                  <Plane
                    name='seat'
                    seatsRows={getFlightRowsForMode()}
                    selectedSeat={getPassengerSelectedSeatsForMode()}
                    onSeatSelect={handleSeatSelect}
                  />
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </Formik>
    </div>
  )
}

export { Seats }
