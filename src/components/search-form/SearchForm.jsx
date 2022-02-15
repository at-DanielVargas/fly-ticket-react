import React from 'react'
import { useState } from 'react'
import { Input, Button, Dropdown, DropdownItem, Counter, Autocomplete } from '@ui'
import { SEARCH_TYPES } from '@constants'

import { PropTypes } from 'prop-types'

const SearchForm = ( { onSearch } ) => {
  const [state, setState] = useState( {
    departure: '',
    arrival: '',
    departureDate: '',
    returnDate: '',
    passengers: [],
    flightType: SEARCH_TYPES.ONEWAY
  } )

  const [errors, setErrors] = useState( {} )

  const isValid = () => {
    if ( state.departure === '' ) {
      setErrors( { ...errors, departure: 'Este campo es requerido.' } )
      return false
    }
    if ( state.arrival === '' ) {
      setErrors( { ...errors, arrival: 'Este campo es requerido.' } )
      return false
    }
    if ( state.departureDate === '' ) {
      setErrors( { ...errors, departureDate: 'Este campo es requerido.' } )
      return false
    }
    if ( state.flightType === 'roundtrip' && state.returnDate === '' ) {
      setErrors( { ...errors, returnDate: 'Este campo es requerido.' } )
      return false
    }

    if ( state.passengers.length === 0 ) {
      setErrors( { ...errors, passengers: 'Este campo es requerido.' } )
      return false
    }

    setErrors( {} )
    return true
  }

  const getError = controlName => {
    return errors[controlName]
  }

  const handleSearch = () => {
    if ( isValid() ) {
      onSearch( {
        departure: state.departure.name,
        arrival: state.arrival.name,
        departureDate: state.departureDate,
        returnDate: state.returnDate,
        passengers: state.passengers,
        flightType: state.flightType
      } )
    }
  }

  const handlePassengersCount = e => {
    const { name, value: count } = e.target
    const passenger = { type: name }
    const newPassengers = [...state.passengers].filter( ap => ap.type !== passenger.type )
    for ( let i = 0; i < count; i++ ) {
      newPassengers.push( passenger )
    }
    setState( { ...state, passengers: newPassengers } )
  }

  const handleControlChange = e => {
    setErrors( { ...errors, [e.target.name]: null } )
    setState( { ...state, [e.target.name]: e.target.value } )
  }

  return (
    <div className='form-container round p-4 bg-white'>
      <div className='row'>
        <div className='col-md-2'>
          <p>Vuelo:</p>
        </div>
        <div className='col-xs-4 col-md-3'>
          <div className='d-flex align-center'>
            <input
              type='radio'
              onChange={handleControlChange}
              defaultChecked={state.flightType === SEARCH_TYPES.ONEWAY}
              name='flightType'
              value={SEARCH_TYPES.ONEWAY}
              id={SEARCH_TYPES.ONEWAY}
            />
            <label className='check-label' htmlFor={SEARCH_TYPES.ONEWAY}>
                            sencillo
            </label>
          </div>
          <div className='d-flex align-center'>
            <input
              type='radio'
              onChange={handleControlChange}
              defaultChecked={state.flightType === SEARCH_TYPES.ROUNDTRIP}
              name='flightType'
              value={SEARCH_TYPES.ROUNDTRIP}
              id={SEARCH_TYPES.ROUNDTRIP}
            />
            <label className='check-label' htmlFor={SEARCH_TYPES.ROUNDTRIP}>
                            redondo
            </label>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className={`col-xs-12 ${state.flightType === 'roundtrip' ? 'col-md-6' : 'col-md-3'}`}>
          <small>Origen</small>
          <Autocomplete name='departure' onChange={handleControlChange} placeholder='origen' />
          <small className='txt-red'>{getError( 'departure' )}</small>
        </div>
        <div className={`col-xs-12  ${state.flightType === 'roundtrip' ? 'col-md-6' : 'col-md-3'}`}>
          <small>Destino</small>
          <Autocomplete name='arrival' onChange={handleControlChange} placeholder='Destino' />
          <small className='txt-red'>{getError( 'arrival' )}</small>
        </div>
        <div className='col-xs-12 col-md-3'>
          <small>Fecha de salida</small>
          <Input
            type='date'
            name='departureDate'
            onChange={handleControlChange}
            placeholder='Fecha de salida'
            className='input-sm'
          />
          <small className='txt-red'>{getError( 'departureDate' )}</small>
        </div>
        {state.flightType === 'roundtrip' && (
          <div className='col-xs-12 col-md-3'>
            <small>Fecha de regreso</small>
            <Input
              type='date'
              name='returnDate'
              onChange={handleControlChange}
              placeholder='Fecha de regreso'
              className='input-sm'
            />
            <small className='txt-red'>{getError( 'returnDate' )}</small>
          </div>
        )}

        <div className='col-xs-12  col-md-3'>
          <small>Pasajeros</small>
          <Dropdown placeholder='Pasajeros' className='block' color='default'>
            <DropdownItem>
              <div className='counter-container'>
                <div className='counter-data'>
                  <p className='m-0'>Adultos</p>
                  <small>+18 años</small>
                </div>
                <div className='count'>
                  <Counter name='adults' onChange={handlePassengersCount} />
                </div>
              </div>
            </DropdownItem>
            <DropdownItem>
              <div className='counter-container'>
                <div className='counter-data'>
                  <p className='m-0'>Niños</p>
                  <small>-18 años</small>
                </div>
                <div className='count'>
                  <Counter name='childs' onChange={handlePassengersCount} />
                </div>
              </div>
            </DropdownItem>
            <DropdownItem>
              <div className='counter-container'>
                <div className='counter-data'>
                  <p className='m-0'>Infantes</p>
                  <small>-2 años</small>
                </div>
                <div className='count'>
                  <Counter name='infant' onChange={handlePassengersCount} />
                </div>
              </div>
            </DropdownItem>
          </Dropdown>
          <small className='txt-red'>{getError( 'passengers' )}</small>
        </div>

        <div className='col-xs-12  col-md-3 d-flex a-items-end'>
          <Button onClick={handleSearch} className='button-sm'>
                        Buscar
          </Button>
        </div>
      </div>
    </div>
  )
}

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired
}
export { SearchForm }
