import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    authSelector,
    getUserFull,
    refreshUserTokens,
} from "../../../state/redux/authSlice";
import { AppDispatch } from "../../../state/redux/store";
import { paths } from "../../../utils/constants/allPaths";

function ProtectedRoute({ children }: { children: React.ReactElement }) {
    // react-redux variable
    const dispatch = useDispatch<AppDispatch>();

    // react-router variable
    const navigate = useNavigate();

    // redux react state varialbe
    const { accessToken, refreshToken } = useSelector(authSelector);

    // local state
    const [isLoading, setIsLoading] = useState(true);

    // refresh user info
    const refreshUserInfo = async () => {
        await dispatch(refreshUserTokens());
        await dispatch(getUserFull());
    };
    useEffect(() => {
        refreshUserInfo();
    }, []); // eslint-disable-line

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
