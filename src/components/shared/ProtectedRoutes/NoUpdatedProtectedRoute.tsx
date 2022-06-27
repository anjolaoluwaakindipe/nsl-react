import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSelector, getUserFull } from "../../../state/authSlice";
import { paths } from "../../../utils/constants/allPaths";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../../state/store";

function NoUpdateProtectedRoute({ children }: { children: React.ReactElement }) {
    // react-redux variable
    const dispatch = useDispatch<AppDispatch>();

    // react-router variable
    const navigate = useNavigate();

    // redux react state varialbe
    const { accessToken, refreshToken, user } = useSelector(authSelector);

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

export default NoUpdateProtectedRoute;
