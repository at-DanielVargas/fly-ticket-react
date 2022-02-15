import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// eslint-disable-next-line no-unused-vars
import { useNavigate, Navigate } from 'react-router-dom'
import { ReservationsSelectors, FlightsSelectors, ReservationActions } from '@store'
import { Button } from '@ui'
import { Formik, Form, Field, FieldArray } from 'formik'
import { object, string, array } from 'yup'
import { DisplayUtil } from '@utils'

export const Passengers = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const flightMode = useSelector( ReservationsSelectors.selectFlightMode )
  const departureFlightSeats = useSelector( ReservationsSelectors.selectDepartureFlightSeats )
  const returnFlightSeats = useSelector( ReservationsSelectors.selectReturnFlightSeats )
  const passengers = useSelector( FlightsSelectors.selectPassengers )

  const initialValues = {
    passengers: [...passengers]
  }

  const validationSchema = object().shape( {
    passengers: array().of(
      object().shape( {
        type: string(),
        name: string().required( 'El nombre es requerido' ),
        lastname: string().required( 'El apellido es requerido' ),
        email: string()
          .email( 'El correo electronico ingresado es invalido' )
          .required( 'El correo electronico es requerido' ),
        phone: string().required( 'El telefono es requerido' )
      } )
    )
  } )

  const autoAssignSeatsForPassenger = passenger => {
    passenger.seats = []
    if ( flightMode === 'roundtrip' ) {
      const departureSeat = departureFlightSeats[Math.floor( Math.random() * departureFlightSeats.length )]
      const returnSeat = returnFlightSeats[Math.floor( Math.random() * returnFlightSeats.length )]
      passenger.seats.push( { ...departureSeat, type: 'departure' } )
      passenger.seats.push( { ...returnSeat, type: 'return' } )
    } else {
      const departureSeat = departureFlightSeats[Math.floor( Math.random() * departureFlightSeats.length )]
      passenger.seats.push( { ...departureSeat, type: 'departure' } )
    }
    return passenger
  }

  const onSubmit = fields => {
    if ( fields.passengers ) {
      const passengers = fields.passengers.map( passenger => autoAssignSeatsForPassenger( passenger ) )
      dispatch( ReservationActions.updatePassengers( { passengers: passengers } ) )
      navigate( '/reservation/seats' )
    }
  }

  if ( !flightMode || flightMode === undefined ) {
    console.log( 'rerotno', flightMode )
    // return <Navigate to='/' />
  }

  return (
    <div className='container-lg'>
      <div className='row'>
        <div className='col-12'>
          <h1>Información de pasajeros</h1>
        </div>

        <div className='col-12'>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {( { errors, values, touched } ) => (
              <Form>
                <fieldset className='p-4'>
                  <legend>Pasajeros</legend>
                  <p>Por favor rellena la información necesaria de cada pasajero.</p>
                  <FieldArray name='passengers'>
                    {() =>
                      values.passengers.map( ( passenger, i ) => {
                        const passengerErrors =
                                                    ( errors.passengers?.length && errors.passengers[i] ) || {}
                        return (
                          <div className='bg-wash p-4 round mb-3' key={i}>
                            <h5>
                                                            Pasajero {DisplayUtil.pasengerLabel( values.passengers[i] )}{' '}
                              {i + 1}
                            </h5>
                            <div className='row'>
                              <div className='col-md-3'>
                                <label>Nombre</label>
                                <Field
                                  name={`passengers.${i}.name`}
                                  placeholder='Nombre(s)'
                                  type='text'
                                />
                                <small className='txt-red'>
                                  {touched.passengers &&
                                                                    touched.passengers[i] &&
                                                                    touched.passengers[i].name
                                    ? passengerErrors.name
                                    : ''}
                                </small>
                              </div>

                              <div className='col-md-3'>
                                <label>Apellido</label>
                                <Field
                                  name={`passengers.${i}.lastname`}
                                  placeholder='Apellido(s)'
                                  type='text'
                                />
                                <small className='txt-red'>
                                  {touched.passengers &&
                                                                    touched.passengers[i] &&
                                                                    touched.passengers[i].lastname
                                    ? passengerErrors.lastname
                                    : ''}
                                </small>
                              </div>

                              <div className='col-md-3'>
                                <label>Correo electrónico</label>
                                <Field
                                  name={`passengers.${i}.phone`}
                                  placeholder='Teléfono'
                                  type='text'
                                />
                                <small className='txt-red'>
                                  {touched.passengers &&
                                                                    touched.passengers[i] &&
                                                                    touched.passengers[i].phone
                                    ? passengerErrors.phone
                                    : ''}
                                </small>
                              </div>

                              <div className='col-md-3'>
                                <label>Correo electrónico</label>
                                <Field
                                  name={`passengers.${i}.email`}
                                  placeholder='Correo electrónico'
                                  type='text'
                                />
                                <small className='txt-red'>
                                  {touched.passengers &&
                                                                    touched.passengers[i] &&
                                                                    touched.passengers[i].email
                                    ? passengerErrors.email
                                    : ''}
                                </small>
                              </div>
                            </div>
                          </div>
                        )
                      } )
                    }
                  </FieldArray>
                </fieldset>

                <div className='d-flex justify-end mt-5'>
                  <Button type='submit' className='button-sm'>
                                        Ir a seleccion de asientos
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
