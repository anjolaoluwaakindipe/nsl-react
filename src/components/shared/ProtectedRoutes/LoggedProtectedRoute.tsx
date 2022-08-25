import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSelector } from "../../../state/redux/authSlice";
import { paths } from "../../../utils/constants/allPaths";

function LoggedProtectedRoute({ children }: { children: React.ReactElement }) {

    // react-router variable
    const navigate = useNavigate();

    // redux react state varialbe
    const { accessToken, refreshToken,} = useSelector(authSelector);

    // local state
    const [isLoading, setIsLoading] = useState(true);


    // check if user is login
    useEffect(() => {
        if (accessToken && refreshToken) {
            return navigate(paths.USER_DASHBOARD, { replace: true });
        }

        setIsLoading(false);
    }, []);// eslint-disable-line

    return <>{isLoading ? <div></div> : children}</>;
}

export default LoggedProtectedRoute;
