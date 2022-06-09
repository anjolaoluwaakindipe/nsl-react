import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSelector } from "../../../state/authSlice";
import { paths } from "../../../utils/constants/allPaths";
import { useEffect } from 'react';

function ProtectedRoute({ children }: { children: React.ReactElement }) {
    const navigate = useNavigate();
    const { accessToken, refreshToken } = useSelector(authSelector);


    useEffect(()=>{
        if (!accessToken && !refreshToken) {
            return navigate(paths.LOGIN, { replace: true });
        }

    }, [accessToken, refreshToken, navigate])

    
    return <>{children}</>;
}

export default ProtectedRoute;
