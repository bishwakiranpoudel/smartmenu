import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

const Login = () => {
    const { currentUser } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signIn } = useAuth();
    const { navigate } = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     signIn(email, password);
    //     navigate('/admin');
    // }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('')
            setLoading(true)
            await signIn(email, password);
            navigate('/admin');

        } catch (e) {
            if (e.code === 'auth/user-not-found') {
                setError('You are not registered.')
            } else if (e.code === 'auth/wrong-password') {
                setError('Incorrect password.')
            } else if (e.code === 'auth/too-many-requests') {
                setError('Too many attempts. Try again later.')
            } else {
                setError('Server error. Contact LinkBinary.')
            }
        }
        setLoading(false)
    }


    return (
        <>
            <div className="admin h-screen">
            <div className='flex flex-col items-center justify-center py-32 body'>
                {
                    !currentUser &&
                    <>
                        <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-4">
                            <h1 className="text-4xl font-semibold ">Welcome.</h1>
                        </div>
                        <form onSubmit={handleSubmit} className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-6">
                            <input
                                className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500"
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmail}
                            />
                            <input
                                className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePassword}
                            />

                            {
                                error &&
                                <div className="my-5 flex items-center">
                                    <div className="text-red-500 text-sm">{error}</div>
                                </div>
                            }

                            <div className="flex items-center">
                                <div className="w-1/2 flex items-center">
                                    <input id="remember-me" type="checkbox" className="mt-1 mr-2" />
                                    <label htmlFor="remember-me">Remember me!</label>
                                </div>

                                <button
                                    className="ml-auto w-1/2 bg-slate-600 text-white p-2 rounded font-semibold hover:bg-primary-d"
                                    type="submit"
                                >
                                    {loading ? <>Logging in...</>
                                        :
                                        'Log in'
                                    }
                                </button>
                            </div>
                        </form>
                        <div className="text-right w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-6">
                            <a href="https://linkbinary.com/support" target='_none' className="text-sm font-bold text-primary hover:underline cursor-pointer"
                            >
                                Contact support
                            </a>
                        </div>
                        <div
                            className="flex justify-center w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12"
                        >
                            <p className="font-semibold text-gray-600 text-sm">
                                If you are the administrator of Smart Tailors. and don't have your credentials yet, do contact
                                {' '}
                                <a href='https://linkbinary.com' target='_none' className='underline'>
                                    LinkBinary
                                </a>
                                .
                            </p>
                        </div>
                    </>
                }
                {currentUser &&
                    <>
                        <h1>
                            You are logged in.
                        </h1>
                        <Link to='/admin/'>
                            <button
                                className="ml-auto mt-5 bg-slate-600 text-white p-2 rounded font-semibold hover:bg-primary-d"
                                type="submit"
                            >
                                View Dashboard
                            </button>
                        </Link>
                    </>
                }
            </div >
            </div>
        </>
    )
}

export default Login