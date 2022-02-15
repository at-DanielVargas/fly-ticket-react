import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { ReservationActions, FlightsSelectors, ReservationsSelectors } from '@store'
import { FlightsList } from '@components'
import { Button } from '@ui'
import { DisplayUtil } from '@utils'

export const Flights = () => {
  const flightRequest = useSelector( FlightsSelectors.selectLastSearch )
  const departureFlight = useSelector( ReservationsSelectors.selectDepartureFlight )
  const returnFlight = useSelector( ReservationsSelectors.selectReturnFlight )

  const { mode: selectionMode } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleFlightSelect = flight => {
    departureFlight
      ? dispatch( ReservationActions.setFlight( { flight, type: 'return' } ) )
      : dispatch( ReservationActions.setFlight( { flight, type: 'departure' } ) )
  }

  const handleContinue = () => {
    if ( ( !departureFlight && selectionMode === 'one-way' ) || ( !returnFlight && selectionMode === 'roundtrip' ) ) {
      console.log( 'No se ha seleccionado ningún vuelo' )
    } else {
      navigate( '/reservation/passengers' )
    }
  }

  if ( flightRequest === null ) {
    return <Navigate to='/' />
  }

  return (
    <div className='container'>
      {departureFlight !== null && (
        <div className='row'>
          <div className='col-md-12'>
            <h4 className='txt-blue'>Vuelo de salida</h4>
            <h1>
              {departureFlight?.departureCity} ✈ {departureFlight?.arrivalCity}
            </h1>
            <div className='d-flex'>
              <p>{DisplayUtil.dateFormat( departureFlight?.departureDate )}</p>
            </div>
          </div>
        </div>
      )}
      {returnFlight !== null && (
        <div className='row'>
          <div className='col-md-12'>
            <h4 className='txt-blue'>Vuelo de regreso</h4>
            <h1>
              {returnFlight?.departureCity} ✈ {returnFlight?.arrivalCity}
            </h1>
            <div className='d-flex'>
              <p>{DisplayUtil.dateFormat( returnFlight?.departureDate )}</p>
            </div>
          </div>
        </div>
      )}

      {( ( !departureFlight && selectionMode === 'one-way' ) ||
                ( !returnFlight && selectionMode === 'roundtrip' ) ) && (
        <FlightsList onFlightSelect={handleFlightSelect} />
      )}
      <div className='row'>
        <div className='col-12 d-flex justify-end'>
          <Button onClick={handleContinue}>Continuar</Button>
        </div>
      </div>
    </div>
  )
}
