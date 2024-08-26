import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { DatePicker } from 'antd';
import moment from 'moment';


const { RangePicker } = DatePicker;

function Home() {
    const [rooms, setRooms] = useState([]);
    const [dummy, setDummy] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [availableRooms, setAvailableRooms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = (await axios.get('/api/rooms/getallrooms')).data;
                setRooms(data);
                setDummy(data);
                setAvailableRooms(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                console.error("Error fetching room data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    function filterByDate(dates) {
        if (!dates) {
            setAvailableRooms(dummy); // Show all rooms if no dates are selected
            return;
        }

        const formattedFromDate = dates[0].format('DD-MM-YYYY');
        const formattedToDate = dates[1].format('DD-MM-YYYY');
        setFromDate(formattedFromDate);
        setToDate(formattedToDate);

        const tempRooms = [];

        for (const room of dummy) {
            let availability = false;

            if (room.bookings && room.bookings.length > 0) {
                for (const booking of room.bookings) {
                    const bookingFromDate = moment(booking.fromdate, 'YYYY-MM-DD');
                    const bookingToDate = moment(booking.todate, 'YYYY-MM-DD');

                    if (
                        !moment(formattedFromDate, 'DD-MM-YYYY').isBetween(bookingFromDate, bookingToDate, null, '[]') &&
                        !moment(formattedToDate, 'DD-MM-YYYY').isBetween(bookingFromDate, bookingToDate, null, '[]')
                    ) {
                        if (
                            formattedFromDate !== booking.fromdate &&
                            formattedFromDate !== booking.todate &&
                            formattedToDate !== booking.fromdate &&
                            formattedToDate !== booking.todate
                        ) {
                            availability = true;
                        }
                    }
                }
            } else {
                availability = true; // Room is available if there are no bookings
            }

            if (availability) {
                tempRooms.push(room);
            }
        }

        setAvailableRooms(tempRooms);
    }

    return (
        <div className='container'>
            <div className='row mt-5'>
                <div className='col-md-3'>
                    <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
                </div>
            </div>
            <div className='row justify-content-center mt-5'>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Error />
                ) : (
                    availableRooms.map(room => (
                        <div className='col-md-9 mt-2' key={room._id}>
                            <Room room={room} fromDate={fromDate} toDate={toDate} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Home;
