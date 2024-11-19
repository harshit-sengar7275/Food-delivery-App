import React from 'react'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom'

export default function Login() {
  const [cred, setcred] = useState({ email: "", Password: "" })
let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();              //synthetic event
    console.log(JSON.stringify({ email: cred.email, Password: cred.Password }))
    const response = await fetch("http://localhost:4000/api/loginuser", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: cred.email,
        Password: cred.Password
      })

    })
    const json = await response.json();
    console.log(json);
   

    if (!json.success) {
      alert("write a valid information");
    }
    if (json.success) {
       localStorage.setItem("userEmail",cred.email);
       localStorage.setItem("authToken",json.authToken);
       console.log(localStorage.getItem("authToken"));
       navigate("/");
    }

  }

  const changeValue = (event) => {
    setcred({ ...cred, [event.target.name]: event.target.value })
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
         <div className="mb-3">
            <label htmlfor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={cred.email} onChange={changeValue} id="exampleInputEmail1" aria-describedby="emailHelp" />
         <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
         </div>
        <div className="mb-3">
            <label htmlfor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='Password' value={cred.Password} onChange={changeValue} id="exampleInputPassword1" />
         </div>
         <button type="submit" className="m-3 btn btn-success">Submit</button>
         <Link to="/createuser" className='m-3 btn btn-danger'>Signup</Link>
     </form>
    </div>
  )
}
