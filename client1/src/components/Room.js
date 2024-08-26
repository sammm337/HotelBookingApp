import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate, Link } from 'react-router-dom';

function ControlledCarousel({ room }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {room.imageUrls.map((imageUrl, idx) => (
        <Carousel.Item key={idx}>
          <img
            className="d-block w-100"
            src={imageUrl}
            alt={`Slide ${idx + 1}`}
          />
          <Carousel.Caption>
            <h3>{room.name}</h3>
            <p>{`Slide ${idx + 1}`}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

function MyVerticallyCenteredModal({ room, show, onHide }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {room.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ControlledCarousel room={room} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Room({ room, fromDate, toDate }) {
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();

  const handleBookingClick = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      alert('Please login');
      navigate('/login');
    } else {
      navigate(`/bookings/${room._id}/${fromDate}/${toDate}`);
    }
  };

  return (
    <div className='row bs'>
      <div className='col-md-4'>
        <img src={room.imageUrls[0]} alt={room.name} className='smallimg' />
      </div>
      <div className='col-md-7 text-left'>
        <h1>{room.name}</h1>
        <p>Max Count: {room.maxcount}</p>
        <p>Phone Number: {room.phoneNumber}</p>
        <p>Type: {room.type}</p>
        <div className="button-container">
          {fromDate && toDate && (
            <Button
              variant="primary"
              className="btn btn-dark m-2"
              onClick={handleBookingClick}
            >
              Book Now
            </Button>
          )}
          <Button
            variant="primary"
            className="btn btn-dark"
            onClick={() => setModalShow(true)}
          >
            View Details
          </Button>
          <MyVerticallyCenteredModal
            room={room}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default Room;
