import { useState } from "react";
import {Link, useNavigate} from "react-router-dom"

export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]:e.target.value});
  }
  console.log('formData', formData);
  const handelSubmit = async (e)=>{
    e.preventDefault();

    
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setLoading(false);
      if(data.success === false){
        setError(true);
        return;
      }
      navigate('/signIn');
      
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit = {handelSubmit} className = 'flex flex-col gap-4'>
        <input type='text' placeholder='UserName' id='userName' 
        className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
        <input type='email' placeholder='email' id='email' 
        className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
        <input type='password' placeholder='Password' id='password' 
        className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
        <button 
        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading? 'Loading...' : 'Sign Up'}</button>
      </form>

      <div className = 'flex gap-2 mt-5'>
        <p>Have an Account?</p>
        <Link to='/SignIn'>
          <span className='text-blue-500'>Sign in</span>
        </Link>
       
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went Wrong'}</p>
    </div>
  )
}
