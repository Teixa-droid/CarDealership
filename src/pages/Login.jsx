import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='flex flex-col w-full justify-center items-center'>
      <h2 className='m-3 text-center text-3xl font-extrabold text-gray-900'>
        {' '}
        Inicia a tua conta
      </h2>
      <form className='mt-8 max-w-md'>
        <div>
          <input
            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            type='email'
            placeholder='dsl@cc.com'
            required
          />
          <input className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
           type='password' 
           required />
        </div>
        <div className='flex justify-between'>
          <div>
            <label htmlFor='recordame'>
              <input type='checkbox' name='recordame' />
              Recorda-me
            </label>
          </div>
          <div>
            <Link to='/'>Esqueces-te a tua password?</Link>
          </div>
        </div>
        <div>
          <Link to='/admin'>
            <button type='submit'>Iniciar sessao</button>
          </Link>
        </div>
        <div>o</div>
        <div>
          <button> Continua com google</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
