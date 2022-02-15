import React from 'react'
import { PropTypes } from 'prop-types'

const CalendarDay = props => {
  return <div {...props}>{props.day}</div>
}

CalendarDay.propTypes = {
  day: PropTypes.number
}

export { CalendarDay }