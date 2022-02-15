import  { useState } from 'react'
import { useSelector } from 'react-redux'
import { ReservationsSelectors } from '@store'
import { Plane } from '@components'
import { DEPARTURE_KEY, RETURN_KEY, SEARCH_TYPES } from '@constants'
import { DisplayUtil } from '@utils'
// eslint-disable-next-line no-unused-vars
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
// eslint-disable-next-line no-unused-vars
import { object, string } from 'yup'

const Seats = () => {
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

  const getSeatForSelectedPassenger = passenger => {
    console.log( passenger )
    // return passenger.seats.find( seat => seat.type === flightType )
  }

  const handleSeatSelect = seat => {
    console.log( seat )
  }

  const initialValues = {
    passengers: [...passengers]
  }

  const handlePasengerChange = ( e, field, values, setValues ) => {
    console.log( e )
    console.log( field )
    console.log( values )
    console.log( setValues )
  }

  return (
    <div className='container-lg'>
      <Formik initialValues={initialValues}>
        {( { values, setValues } ) => (
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
            <Form className="col-12">

              <fieldset className='p-4'>
                <legend>Asientos</legend>
                <div className='d-xs-block d-md-flex'>
                  <div className='w-100 mr-4'>
                    <p>Pasajeros</p>
                    <div className='list-group list-group-checkable'>
                      <FieldArray name='passengers'>
                        {() => ( values.passengers.map( ( passenger, i ) => {
                          return (
                            <label className='list-group-item py-3' htmlFor={'passenger'} key={i}>
                              <Field name='pasenger'>
                                {( {field} ) => (
                                  <input
                                    {...field}
                                    type='checkbox'
                                    id={`passenger-${i}`}
                                    onChange={e => handlePasengerChange( e, field, values, setValues )}
                                  />
                                )}
                              </Field>
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
                          )
                        } ) )}
                      </FieldArray>
                    </div>
                  </div>
                  <div>
                    <Plane
                      name='seat'
                      seatsRows={getFlightRowsForMode()}
                      selectedSeat={getSeatForSelectedPassenger()}
                      onSeatSelect={handleSeatSelect}
                    />
                  </div>
                </div>
              </fieldset>

            </Form>
          </div>
        )}
      </Formik>
    </div>
  )
}

export { Seats }
