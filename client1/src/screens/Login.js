import React, { useState } from "react";
import axios from "axios"
import Success from "../components/Success";
import Error from "../components/Error";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const navigate = useNavigate();
  const [values, setValues] = useState({
    
    email: "",
    password: ""  
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
  const [message,setMessage]=useState();
  const [valid, setValid] = useState(false);
  const[error,setError]=useState("invalid username or password")
  


  async function handleSubmit(e) {
    e.preventDefault();
   
    if (values.email && values.password) {
      setValid(true);
      const d = await (await axios.post('/api/users/login', values)).data;
  
      setMessage(d);
      const user = d;
    
   if(d)
   {

       localStorage.setItem('currentUser', JSON.stringify(user));
       window.location.href='/'
       
       
   }
      
    }
    setSubmitted(true);
  }

  return (
    <>
    <div>
    {submitted && valid && message && (
  <Success message={message} />
  

)}

{submitted && valid && !message && (
    
  <Error error={error}/>

)}

    </div>
    <div className="form-container mt-5">
    
      <form className="register-form" onSubmit={handleSubmit}>
   
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
          <button className="btn btn-dark" type="submit" >
           Login
          </button>
        )}
      </form>
    </div>
    </>
  );
}