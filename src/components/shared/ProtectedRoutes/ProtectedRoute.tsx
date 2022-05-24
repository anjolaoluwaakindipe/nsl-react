import { useKeycloak } from '@react-keycloak/web'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({children}:{children:React.ReactElement}) {
    const {initialized, keycloak} = useKeycloak()
    const navigate= useNavigate();

    // if (!keycloak.authenticated && !initialized) {
    //     return <div></div>;
    // }

    

    if (!keycloak.authenticated && initialized) {
       
    }
  return (
    <>{initialized && keycloak.authenticated? children: null}</>
  )
}

export default ProtectedRoute