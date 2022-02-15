import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CitiesActions } from '@store'
import { useClickOutSideDetect } from '@hooks'
import { Input } from '@ui'
import { PropTypes } from 'prop-types'

const AutocompleteSuggestion = ( { name, active, onClick } ) => {
  return (
    <div className={active ? 'dropdown-item active' : 'dropdown-item'} onClick={onClick}>
      {name}
    </div>
  )
}

AutocompleteSuggestion.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func
}

const Autocomplete = ( { onChange, name, placeholder } ) => {
  const ref = useRef()

  const menuRef = useRef( null )

  const dispatch = useDispatch()

  const { suggestions } = useSelector( state => state.cities )

  const [isOpen, setIsOpen] = useState( false )

  const [selectionIndex, setSelectionIndex] = useState( 0 )

  const [value, setValue] = useState( '' )

  useClickOutSideDetect( ref, () => setIsOpen( false ) )

  useEffect( () => {
    setTimeout( () => {
      const { x, width, y, height } = menuRef.current.getBoundingClientRect()
      if ( x + width > window.innerWidth ) {
        ref.current.classList.add( 'right' )
      }
      if ( y + height > window.innerHeight ) {
        ref.current.classList.add( 'top' )
      }
    }, 0 )
  } )

  const handleOnChange = event => {
    const searchValue = event.target.value
    if ( searchValue !== '' ) {
      dispatch( CitiesActions.search( { search: searchValue } ) )
      setIsOpen( true )
    }
  }

  const handleWithDebounce = e => handleOnChange( e )

  const onKeyDown = e => {
    setIsOpen( true )
    // enter
    if ( e.keyCode === 13 ) {
      setSelectionIndex( 0 )
      setIsOpen( false )
      setValue( `${suggestions[selectionIndex].name} (${suggestions[selectionIndex].state.code})` )
      onChange( { target: { name, value: suggestions[selectionIndex] } } )
    } else {
      if ( e.keyCode === 38 ) {
        if ( selectionIndex === 0 ) {
          return
        }
        setSelectionIndex( selectionIndex - 1 )
      }
      if ( e.keyCode === 40 ) {
        if ( selectionIndex === suggestions.length - 1 ) {
          return
        }
        setSelectionIndex( selectionIndex + 1 )
      }
    }
  }

  const onClick = suggestion => {
    setValue( `${suggestion.name} (${suggestion.state.code})` )
    onChange( { target: { name, value: suggestion } } )
  }

  return (
    <div className={`${isOpen ? 'dropdown active' : 'dropdown'} block`} ref={ref}>
      <div className='dropdown-trigger'>
        <Input
          type='text'
          onChange={handleWithDebounce}
          onKeyDown={onKeyDown}
          onFocus={() => setIsOpen( true )}
          placeholder={placeholder}
          className={'input-sm'}
          val={value}
        />
      </div>
      <div className='dropdown-menu' ref={menuRef}>
        <div className='dropdown-content scrollable'>
          {suggestions.map( ( suggestion, index ) => (
            <AutocompleteSuggestion
              key={index}
              active={index === selectionIndex}
              name={`${suggestion.name} (${suggestion.state.code}) ${suggestion.state.name}`}
              onClick={() => onClick( suggestion, index )}
            />
          ) )}
        </div>
      </div>
    </div>
  )
}


Autocomplete.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string
}



export { Autocomplete, AutocompleteSuggestion }