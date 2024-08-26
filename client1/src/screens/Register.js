import React, { useState } from "react";
import axios from "axios"
import Success  from "../components/Success";
import Loader from "../components/Loader";
export default function Register() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "" ,
    cpassword:"" 
  });

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setValues((values) => ({
      ...values,
      [name]: value
    }));
  };

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const [message,setMessage]=useState();

  async function handleSubmit (e)  {
    e.preventDefault();
    if(values.password!==values.cpassword)
    {
        alert('Passwords are different')
    }
    if (values.firstName && values.lastName && values.email && values.password && values.password===values.cpassword) {
      setValid(true);
      const d = await (await axios.post('/api/users/registeruser', values)).data;
  
      setMessage(d);

    }
    setSubmitted(true);
  };

  return (
    <>
<div>
{submitted && valid && message && (
  <Success message={message} />
)}
</div>
    <div className="form-container mt-5">
       
        
      <form className="register-form" onSubmit={handleSubmit}>
       
        {!valid && (
          <input
            className="form-field"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={values.firstName}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.firstName && (
          <span id="first-name-error">Please enter a first name</span>
        )}

        {!valid && (
          <input
            className="form-field"
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={values.lastName}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.lastName && (
          <span id="last-name-error">Please enter a last name</span>
        )}

        {!valid && (
          <input
            className="form-field"
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.email && (
          <span id="email-error">Please enter an email address</span>
        )}

        {!valid && (
          <input
            className="form-field"
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
          />
        )}

        {submitted && !values.password && (
          <span id="password-error">Please enter a password</span>
        )}
        {!valid && (
          <input
            className="form-field"
            type="password"
            placeholder="Confirm Password"
            name="cpassword"
            value={values.cpassword}
            onChange={handleInputChange}
          />
        )}
        {submitted && !values.password && (
          <span id="password-error">Please enter a password</span>
        )}

        {!valid && (
          <button className="btn btn-dark" type="submit">
            Register
          </button>
        )}
      </form>
    </div>
    </>
  );
}
