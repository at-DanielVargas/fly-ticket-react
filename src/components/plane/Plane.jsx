import React from 'react';
import { MdEventSeat } from 'react-icons/md';

export const Plane = ({ seatsRows = [], onSeatSelect }) => {
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
                {seatsRows.map((row, rowIndex) => (
                    <div className='seat-row' key={rowIndex}>
                        {row.map((seat, seatIndex) => (
                            <div className='seat' key={seatIndex}>
                                <input
                                    type='checkbox'
                                    disabled={seat.available}
                                    id={`row-${rowIndex}-seat-${seatIndex}`}
                                    onChange={() => onSeatSelect(seat)}
                                />
                                <label htmlFor={`row-${rowIndex}-seat-${seatIndex}`}>
                                    <div className='seat-icon'>
                                        <MdEventSeat />
                                    </div>
                                </label>
                            </div>
                        ))}
                        <div className='seat num'>{rowIndex + 1}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* <div className={styles.plane}>
            <PlaneIcon />
            <div className={styles.cabin}></div>
            <ol className={`${styles.fuselage}`}>
                {seatsRows.map((row, rowIndex) => (
                    <li className={styles.row} key={rowIndex}>
                        <ol className={styles.seats} type='A'>
                            {row.map((seat, seatIndex) => (
                                <li className={styles.seat} key={seatIndex}>
                                    <input type='checkbox' disabled={seat.available} id={seat.id} />
                                    <label htmlFor={seat.id}>{seat.seat}</label>
                                </li>
                            ))}
                        </ol>
                    </li>
                ))}
            </ol>
        </div> */
