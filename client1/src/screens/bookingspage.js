import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios"
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment'
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';
function Bookingspage(match) {
    const { roomid, fromdate, todate } = useParams();
    const fdate=moment(fromdate,'DD-MM-YYYY')
    const tdate=moment(todate,'DD-MM-YYYY');
    const total=moment.duration(tdate.diff(fdate)).asDays()+1
  
    const [room, setRoom] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await axios.post('/api/rooms/getroombyid', { roomid });
                const data = response.data;
                console.log(data)
                setRoom(data)
               
                setLoading(false)
            } catch (error) {
                setError(true)
                console.log(error)
                setLoading(false)
            }
        };

        fetchData();
    }, []);
   async function onToken(token)  {
        fetch('/save-stripe-token', {
          method: 'POST',
          body: JSON.stringify(token),
        }).then(response => {
          response.json().then(data => {
            alert(`We are in business, ${data.email}`);
          });
        });
        const bookingDetails={
            room,
            userid:JSON.parse(localStorage.getItem('currentUser'))._id,
            fromdate,
            todate,
            totalAmt,
            total,
            token


        }
        try{
            setLoading(true)
            const result = await axios.post('/api/bookings/bookroom',bookingDetails)
            setLoading(false)
            Swal.fire('Congratulations','Your Room Booked Successfully','success').then(result=>{
                window.location.href='/bookings'
            })
        }
        catch(error){

            Swal.fire('Oops','Something went wrong','error')
        }
    }
    const totalAmt=total * room.rent
    async function bookRoom(){

       
    }
    
    return (

        <div className='m-5'>
            {loading ? (<Loader/>) : error ? (<Error/>) : (<div>
                <div className='row justify-content-center bs'>
                    <div className='col-md-5'>
                        <h1>{room.name}</h1>
                        <img src={room.imageUrls[0]} className='bigimg' />
                    </div>
                    <div className='col-md-5'>
                        <div style={{textAlign:'right'}}>
                            <h1>Booking Details</h1>
                            <hr></hr>
                            <b>
                                <p>Name :{JSON.parse(localStorage.getItem('currentUser')).firstName} { JSON.parse(localStorage.getItem('currentUser')).lastName } </p>
                                <p>From : {fromdate} </p>
                                <p>Till : {todate}</p>
                                <p>Max Count: {room.maxcount}</p>
                            </b>
                        </div>
                        <div style={{textAlign:'right'}}>
                            <h1>Amount</h1>
                            <hr></hr>
                            <b>
                                <p>Total Days :{total} </p>
                                <p>Price : $ {room.rent}</p>
                                <p>Total Amount : $ {totalAmt} </p>

                            </b>

                        </div>
                        <div style={{textAlign:'right'}}>
                            
                            <StripeCheckout
        token={onToken}
        currency='USD'
        amount={totalAmt *100}
        stripeKey="pk_test_51PqxzNP7ED4WsSitkH72G0vZ29lhiiuhQaZi3lRdOcZeicfOMBX2hDN6o1bGllTqS4mnOkSWoBCsAMquQvX4wFXD0000E8byPx">
            <button variant="primary" className="btn btn-dark ">Pay Now</button>
        </StripeCheckout>
        

      
                        </div>

                    </div>
                </div>

            </div>)}
        </div>

    );
}
export default Bookingspage