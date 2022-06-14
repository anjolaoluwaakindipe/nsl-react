import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSelector } from "../../../state/authSlice";
import { paths } from "../../../utils/constants/allPaths";
import { useEffect, useState } from 'react';

function ProtectedRoute({ children }: { children: React.ReactElement }) {
    // react-router variable
    const navigate = useNavigate();

    // redux react state varialbe
    const { accessToken, refreshToken } = useSelector(authSelector);

    // local state
    const [isLoading, setIsLoading] = useState(true);

    // check if user is login
    useEffect(() => {
        if (!accessToken && !refreshToken) {
            return navigate(paths.LOGIN, { replace: true });
        }
        setIsLoading(false);
    }, [accessToken, refreshToken, navigate]);

    return <>{isLoading ? <div></div> : children}</>;
}

export default ProtectedRoute;
