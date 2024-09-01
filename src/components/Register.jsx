import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

  const [credentials, setCredentials] = useState({username:"" ,email: "", password: "",cpassword:""}) 
  let navigate = useNavigate();
   const diffToast = ()=>{
      toast("Registered Successfully");
   }
  const handleSubmit = async (e) => {
      e.preventDefault();
      const {username,email,password} = credentials;
      const response = await fetch("https://notes-application-api-pi.vercel.app/api/auth/user", {
          method: 'POST',
          headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
           "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"
          },
          body: JSON.stringify({username,email,password})
      });
      console.log(response);
     // console.log("hello");
      // console.log("hello"+response.jwtData);
      // console.log(response);
      console.log(response.jwtData);
      const json = await response.json()
    //  console.log(json);
          // Save the auth token and redirect
          localStorage.setItem('jwtData', json.jwtData); 
          
          navigate("/");
  }

  const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
  }


  return (
    <div className='container mt-3'>
      <h2 className="my-3">Create an account to use Movie Database</h2>
      <form onSubmit={handleSubmit}>
      <div className="my-3 flex row">
    <label htmlFor="name" className='flex'>Name</label>
    <input type="name" className="form-control" id="username" name="username" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter name" />
  </div>
  <div className="mb-3 flex row">
    <label htmlFor="email " className='flex'>Email address</label>
    <input type="email" className="mt-2 p-2 block w-full rounded-md border py-1.5"c id="email" name="email" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email"  />
  </div>
  <div className="mb-3 flex row">
    <label htmlFor="password" className='flex'>Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange} placeholder="Password" />
  </div>
  <div className="mb-3 flex row">
    <label htmlFor="cpassword" className='flex'>Confirm Password</label>
    <input type="cpassword" className="form-control" id="cpassword" name="cpassword" onChange={onChange} placeholder="Confirm Password" />
  </div>

  <button type="submit" className="btn btn-primary" onClick={diffToast}>Submit</button>
</form>
    </div>
  )
}

export default Register
