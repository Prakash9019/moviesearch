import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let navigate = useNavigate();
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://notes-application-api-pi.vercel.app/api/auth/login', {
              email: credentials.email,
              password: credentials.password,
            });
      
            const json = response.data;
            // console.log(json);
      
            // Save the token to localStorage
            localStorage.setItem('jwtData', json.jwtData);
      
            // Navigate to the next screen or perform other actions
            console.log('Token saved:', json.jwtData);
          
      //  console.log(json.sucess);
        if (json.sucess){
            toast("Login Successfully");
            // Save the auth token and redirect
            // localStorage.setItem('jwtData', json.jwtData); 
            // console.log(json.jwtData);
            navigate("/");

        }
        else{
           // console.log(response);
            toast(json.errors[0].msg);
            
        }
    }
        catch (error) {
            console.error('Error during login:', error.message);
            // Handle login failure, show an alert, etc.
          }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
      <div className="flex min-h-screen flex-col justify-center items-center p-6">
      <div className="w-full max-w-sm">
        
        <h2 className="mt-10 text-center text-2xl font-bold">Sign in to your account</h2>
      </div>
      <div className="mt-10 w-full max-w-sm">
        <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block flex text-sm font-medium">Email address</label>
            <input id="email" name="email" type="email" value={credentials.email} onChange={onChange}  required autoComplete="email" className="mt-2 block w-full rounded-md border py-1.5 p-2" />
          </div>
          <div>
            <div className="flex justify-between">
              <label htmlFor="password" className="block text-sm font-medium">Password</label>
              <a href="#" className="text-sm text-indigo-600">Forgot password?</a>
            </div>
            <input id="password" name="password" type="password" value={credentials.password} onChange={onChange} required autoComplete="current-password" className="mt-2 p-2 block w-full rounded-md border py-1.5" />
          </div>
          <button type="submit" className="w-full rounded-md bg-indigo-600 py-1.5 text-white">Sign in</button>
        </form>
        <p className="mt-10 text-center text-sm">Don't have a account ? <a href="#" className="text-indigo-600">Register</a></p>
      </div>
    </div>
    )
}

export default Login
