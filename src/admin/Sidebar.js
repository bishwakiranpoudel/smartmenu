import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SettingsRoundedIcon, { SettingsRounded } from '@mui/icons-material'
import Divider from '@mui/material/Divider';

const Sidebar = ({ children }) => {
    return (
        <>
            <div className="admin ">
                <div className='flex'>
                    <div className="panel hidden lg:block ">
                        <aside className="py-5 px-3 h-screen sticky top-0 bg-opacity-20 inset-y-0 z-10 flex flex-col flex-shrink-0 w-16  overflow-x-hidden overflow-y-hidden transition-all transform bg-white dark:bg-grayer dark:border-white-rgba-1 border-r shadow-lg lg:z-10 lg:shadow-none">
                            {/* <img className="h-4  sm:h-2 mt-5" src={logo}  alt="Flowbite Logo" /> */}
                            <div className="pt-3">
                                <Divider varient="middle" color="black" className="h-1/2 rounded-xl">


                                </Divider>
                            </div>
                            <div className='mt-10'>
                                <ul className='flex flex-col gap-7 font-sans'>
                                    <li className=''>
                                        <NavLink
                                            to='/admin/'
                                            className={({ isActive }) => (isActive ? 'uppercase p-3 mr-5 rounded-lg bg-black bg-opacity-5' : 'uppercase p-3 mr-5  rounded-lg hover:bg-black hover:bg-opacity-5')}
                                        >
                                            <DashboardRoundedIcon />
                                        </NavLink>

                                    </li>
                                    <li>
                                        <NavLink
                                            to='/admin/user'
                                            className={({ isActive }) => (isActive ? 'uppercase p-3 mr-5 rounded-lg bg-black bg-opacity-5' : 'uppercase p-3 mr-5 rounded-lg hover:bg-black hover:bg-opacity-5')}
                                        >
                                            <PersonRoundedIcon />
                                        </NavLink>
                                    </li>
                                    <li>

                                    </li>

                                </ul>

                            </div>
                            <div className="mt-auto">
                                <NavLink
                                    to='/admin/setting'
                                    className={({ isActive }) => (isActive ? 'uppercase p-3 mr-5 rounded-lg bg-black bg-opacity-5' : 'uppercase p-3 mr-5 rounded-lg hover:bg-black hover:bg-opacity-5')}
                                >
                                    <SettingsRounded />
                                </NavLink>
                            </div>
                        </aside>
                    </div>
                    <div className="block body w-full h-full">
                        <div className="lg:hidden h-fit">
                            <Navbar />
                        </div>
                        <div className='flex flex-col w-full'>

                            <div className="min-h-screen max-h-full">
                                <main className='p-5 flex-1'>
                                    {children}
                                </main>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Navbar = () => {
    function myFunction() {
        var element = document.getElementById("myDIV");
        element.classList.toggle("hidden");
    }
    return (
        <>
            <nav className="panel  px-2 sm:px-4 py-2.5 ">
                <div className="container flex flex-wrap justify-between items-center mx-auto">

                    {/* <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" /> */}


                    <button onClick={myFunction} type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">

                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    </button>
                    <div className="w-full" id='myDIV'>
                        <div className=" w-full md:block md:w-auto" id="navbar-default">
                            <ul class=" p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li className='m-4 '>
                                    <NavLink
                                        to='/admin/' className={({ isActive }) => (isActive ? 'uppercase p-3 mr-5 my-3 text-white rounded-lg bg-black ' : 'uppercase p-3 mr-5 rounded-lg my-3  hover:bg-black hover:bg-opacity-5')} >DashBoard</NavLink>
                                </li>
                                <li className='m-4 '>
                                    <NavLink
                                        to='/admin/client' className={({ isActive }) => (isActive ? 'uppercase p-3 mr-5 my-3 text-white rounded-lg bg-black ' : 'uppercase p-3 mr-5 rounded-lg my-3  hover:bg-black hover:bg-opacity-5')}>Clients</NavLink>
                                </li>
                                <li className='m-4 '>
                                    <NavLink
                                        to='/admin/setting' className={({ isActive }) => (isActive ? 'uppercase p-3 mr-5 my-3 text-white rounded-lg bg-black ' : 'uppercase p-3 mr-5 rounded-lg my-3  hover:bg-black hover:bg-opacity-5')}>Settings</NavLink>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Sidebar