import React, { useEffect } from 'react'
import { MdEventSeat } from 'react-icons/md'
import { PropTypes } from 'prop-types'

import { useField } from 'formik'

const Plane = ( { seatsRows, selectedSeat, ...props } ) => {
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField( props )

  useEffect( () => {
    helpers.setValue( selectedSeat )
  }, [] )

  const handleSeatSelect = seat => {
    helpers.setTouched( true )
    helpers.setValue( seat )
  }

  return (
    <div className='plane'>
      <div className='seat-letters'>
        <span>A</span>
        <span>B</span>
        <span>C</span>
        <span></span>
        <span>D</span>
        <span>E</span>
        <span>F</span>
      </div>
      <div className='seat-rows'>
        {seatsRows.map( ( row, rowIndex ) => (
          <div className='seat-row' key={rowIndex}>
            {row.map( ( seat, seatIndex ) => (
              <div className='seat' key={seatIndex}>
                <input
                  type='checkbox'
                  disabled={!seat.available}
                  defaultChecked={selectedSeat.id === seat.id}
                  id={`row-${rowIndex}-seat-${seatIndex}`}
                  onChange={() => handleSeatSelect( seat )}
                />
                <label htmlFor={`row-${rowIndex}-seat-${seatIndex}`}>
                  <div className='seat-icon'>
                    <MdEventSeat />
                  </div>
                </label>
              </div>
            ) )}
            <div className='seat num'>{rowIndex + 1}</div>
          </div>
        ) )}
      </div>
    </div>
  )
}

Plane.propTypes = {
  seatsRows: PropTypes.arrayOf( PropTypes.arrayOf( PropTypes.object ) ),
  selectedSeat: PropTypes.object,
  onSeatSelect: PropTypes.func
}

export { Plane }
