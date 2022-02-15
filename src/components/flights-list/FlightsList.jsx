
import { useSelector } from 'react-redux'
import { FlightsSelectors } from '@store'
import { FaPlane } from 'react-icons/fa'
import { DisplayUtil } from '@utils'
import { PropTypes } from 'prop-types'

const FlightsList = ( { onFlightSelect } ) => {
  const flights = useSelector( FlightsSelectors.selectSearchFlightsResults )
  const searchState = useSelector( FlightsSelectors.selectSearchLoadingState )
  return (
    <div className='row'>
      <div className='col-md-12'>
        {!searchState ? (
          flights.map( ( flight, index ) => (
            <div
              className='d-flex flex-xs-column a-items-center justify-between round bg-wash mb-5 p-3 hoverable'
              key={index}
              onClick={() => onFlightSelect( flight )}
            >
              <div className='d-flex position-relative justify-between mr-3'>
                <div>
                  <h4 className='m-0'>{DisplayUtil.timeFormat( flight.departureTime )}</h4>
                  <small>{flight.departureCity}</small>
                </div>
                <div className='position-xs-absolute'>
                  <FaPlane className='mr-2' />
                </div>
                <div>
                  <h4 className='m-0'>{DisplayUtil.timeFormat( flight.arrivalTime )}</h4>
                  <small>{flight.arrivalCity}</small>
                </div>
              </div>
              <div className='mr-auto'>
                <small>Duración</small>
                <p>{DisplayUtil.timeDiff( flight.arrivalTime, flight.departureTime, true )}</p>
              </div>
              <div>
                <small>Precio</small>
                <p>{DisplayUtil.currency( flight.cost )}</p>
              </div>
            </div>
          ) )
        ) : (
          <div className='d-flex align-center justify-center'>
            <p>Cargando...</p>
          </div>
        )}
      </div>
    </div>
  )
}

FlightsList.propTypes = {
  onFlightSelect: PropTypes.func.isRequired
}

export { FlightsList }