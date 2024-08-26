import React from 'react';

function Navbar() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(user);
    function logout(){
        localStorage.removeItem('currentUser')
        window.location.href='/login'
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Booking.com</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto mr-5">
                        {user ? (
                           <div class="dropdown">
                           <button class="btn btn-secondary dropdown-toggle btn-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                             {user.firstName}
                           </button>
                           <ul class="dropdown-menu">
                             
                             <li><button className='dropdown-item' onClick={()=>logout()}>Logout</button></li>
                             <li><a class="dropdown-item" href="#">Bookings </a></li>
                             
                           </ul>
                         </div>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/register">Register</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
