import React from 'react'
import {Route, Routes,} from 'react-router-dom';
import Addmenu from './admin/components/addmenu';
import Adduser from './admin/components/Adduser';
import Login from './Login';
import PrivateRoutes from './ProtectedRoutes';

function SiteRoutes() {
    return (
      <Routes>
          <Route path="/" element={<Login/>}/>  
          <Route path="/login" element={<Login/>} />
          <Route path="/admin" element={<PrivateRoutes><Adduser/></PrivateRoutes>} />
          <Route path="/admin/addmenu/:id" element={<PrivateRoutes><Addmenu/></PrivateRoutes>} />
      </Routes>
    )
  }
  
  export default SiteRoutes