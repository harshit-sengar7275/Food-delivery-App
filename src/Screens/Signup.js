import React from 'react'
import { Link } from 'react-router-dom'
import {useState} from 'react'
export default function Signup() {

  const [cred, setcred] = useState({name: "", email: "", Password: "", geolocation: ""})


const handleSubmit = async(e) =>{
      e.preventDefault();              //synthetic event
      const response = await fetch("http://localhost:4000/api/createuser", {
        method: 'POST',
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          name: cred.name,
          email: cred.email,
          Password: cred.Password,
          location:cred.geolocation
        })

      })   
      const json = await response.json();
      console.log(json);   
      if(!json.success){
        alert("write a valid information");
      }
} 

const changeValue = (event) => {
  setcred({...cred, [event.target.name]: event.target.value})
}

  return (
  <>
    <div className='container'>
      <form onSubmit={handleSubmit}>
         <div className="mb-3">
          <label htmlfor="username" className="form-label">Name</label>
          <input type="text" className="form-control" name='name' value={cred.name} onChange={changeValue}/>
        </div>
        <div className="mb-3">
          <label htmlfor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' value={cred.email} onChange={changeValue} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlfor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" name='Password' value={cred.Password} onChange={changeValue} id="exampleInputPassword1" />
        </div>
        <div className="mb-3">
          <label htmlfor="username" className="form-label">Location</label>
          <input type="text" className="form-control" name='geolocation' value={cred.geolocation} onChange={changeValue}/>
        </div>
        <button type="submit" className="m-3 btn btn-success">Submit</button>
        <Link to="/login" className='m-3 btn btn-danger'>Log in</Link>
      </form>
      </div>
  </>
  )
}

