import React, { useState, useEffect, useRef, forwardRef } from 'react'
import { FaCaretRight, FaCaretLeft } from 'react-icons/fa'
import { PropTypes } from 'prop-types'
import { CalendarDay } from './CalendarDay'

const Calendar = forwardRef( ( { onSelectDate, className = '', reservations = [] }, ref ) => {
  let days = ['Do', 'Lu', 'Ma', 'Mié', 'Ju', 'Vie', 'Sa']
  let months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Augosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]

  const yearRef = useRef()

  const [state, setState] = useState( {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    date: new Date().getDate(),
    change: 'static'
  } )

  const [selected, setSelected] = useState( `${state.year}-${Number( state.month ) + 1}-${state.date}` )

  useEffect( () => {
    if ( ref && ref.current && ref.current.value !== '' ) {
      const [y, m, d] = ref.current.value.split( '-' )
      setState( {
        year: Number( y ),
        month: Number( m ) - 1,
        date: Number( d ),
        change: 'static'
      } )
    }
  }, [ref?.current?.value] )

  useEffect( () => {
    if ( onSelectDate ) {
      onSelectDate( selected )
      if ( ref && ref.current ) {
        ref.current.value = selected
      }
    }
  }, [selected] )

  const changeDate = e => {
    setSelected( `${e.target.dataset.year}-${Number( e.target.dataset.month ) + 1}-${e.target.innerText}` )
    setState( {
      year: Number( e.target.dataset.year ),
      month: Number( e.target.dataset.month ),
      date: Number( e.target.innerText ),
      change: 'static'
    } )
  }

  const handleFocus = e => {
    if ( e.type === 'keydown' && e.keyCode === 13 ) {
      changeDate( e )
    }
  }

  const setClasses = data => {
    if ( data.getMonth() !== state.month ) {
      return 'day outday'
    } else if ( data.getDate() === state.date ) {
      return 'day active'
    } else if (
      data.getDate() === new Date().getDate() &&
      data.getMonth() === new Date().getMonth() &&
      data.getFullYear() === new Date().getFullYear()
    ) {
      return 'day today'
    }
    return 'day'
  }

  const changeYear = () => {
    setState( {
      ...state,
      change: 'input'
    } )
    setTimeout( () => {
      let input = ref.current
      input.focus()
    }, 0 )
  }

  const inputChange = () => {
    let input = ref.current
    let year = parseInt( input.value )
    if ( year > 1899 && year < 3000 ) {
      setState( {
        ...state,
        year: year,
        change: 'static'
      } )
    } else if ( year < 1900 ) {
      setState( {
        ...state,
        year: 1900,
        change: 'static'
      } )
    } else if ( year > 3000 ) {
      setState( {
        ...state,
        year: 2999,
        change: 'static'
      } )
    } else {
      setState( {
        ...state,
        change: 'static'
      } )
    }
  }

  const onKeyup = e => {
    if ( e.keyCode === 13 ) {
      inputChange()
    }
  }

  const prevMonth = () => {
    const { year: currentYear, month: currentMonth } = state
    let year = currentMonth === 0 ? currentYear - 1 : currentYear
    let month = currentMonth === 0 ? 11 : currentMonth - 1
    setState( {
      ...state,
      year,
      month
    } )
  }
  const nextMonth = () => {
    const { year: currentYear, month: currentMonth } = state
    let year = currentMonth === 11 ? currentYear + 1 : currentYear
    let month = currentMonth === 11 ? 0 : currentMonth + 1
    setState( {
      ...state,
      year,
      month,
      date: 1
    } )
  }

  let firstDay = new Date( state.year, state.month ).getDay()
  let dates = []
  for ( let i = 1; i <= 42; i++ ) {
    const date = new Date( state.year, state.month, i - firstDay )
    if ( reservations.length > 0 ) {
      console.log( 'reservations', reservations )
    }
    dates.push( date )
  }

  return (
    <div className={`calendar ${className}`}>
      <div className='header'>
        <div className='controls'>
          <button onClick={prevMonth}>
            <FaCaretLeft />
          </button>
          <button onClick={nextMonth}>
            <FaCaretRight />
          </button>
        </div>
        <h1>{months[state.month]}</h1>
        <p onClick={changeYear}>
          {state.change === 'static' ? (
            state.year
          ) : (
            <input
              ref={yearRef}
              type='number'
              min='1900'
              max='2999'
              defaultValue={state.year}
              onChange={changeYear}
              onKeyUp={onKeyup}
              onBlur={inputChange}
            />
          )}
        </p>
      </div>
      <div className='container'>
        {days.map( ( day, index ) => (
          <span key={index} className='day name'>
            {day}
          </span>
        ) )}
        {dates.map( ( date, index ) => (
          <CalendarDay
            tabIndex={0}
            onFocus={handleFocus}
            onKeyDown={handleFocus}
            key={index}
            className={setClasses( date )}
            data-year={date.getFullYear().toString()}
            data-month={date.getMonth().toString()}
            onClick={changeDate}
            day={date.getDate()}
          />
        ) )}
      </div>
    </div>
  )
} )


Calendar.propTypes = {
  reservations: PropTypes.array,
  onSelectDate: PropTypes.func,
  className: PropTypes.string
}

export { Calendar }