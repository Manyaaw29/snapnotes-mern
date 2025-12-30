import React from 'react'
import PasswordInput from '../../components/Input/PasswordInput';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';


const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [Error, setError] = React.useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)){
      setError('Please enter a valid email address.');
      return;
    }

    if(!password){
      setError('Please enter your password.');
      return;
    }

    setError('');
  
    // Login API
  }
  return (
    <div className='flex items-center justify-center mt-28'>
      
      <div className='w-96 border border-slate-700 rounded bg-white px-7 py-10'> 
        <form onSubmit={handleLogin} >
         <h2 className='text-2xl mb-7'> Login </h2>
          <input  type="text" placeholder='Email' className="input-box " value={email}
          onChange={(e)=>setEmail(e.target.value)}/>
        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
      
      {Error && <p className='text-sm text-red-500 pb-1'> {Error} </p>}


        <button type="submit" className="btn-primary ">Login </button>

        <p className='text-sm text-center mt-4'> Don't have an account ? {"  "}<Link to={"/signup"} className='font-medium text-[#2b85ff] underline'> Create an account</Link></p>
      
      
      </form>
      
      </div>
      
    </div>
  )
}

export default Login
