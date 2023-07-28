import React, { useState,useEffect } from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRouteForLogin({children}) {
   
    const getUser = localStorage.getItem('user')

    if(!getUser) {
     return children
    }
    return <Navigate to={"/"}/>
}