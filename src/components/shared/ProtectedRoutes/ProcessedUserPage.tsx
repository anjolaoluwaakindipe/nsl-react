import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { authSelector } from "../../../state/authSlice";
import { paths } from '../../../utils/constants/allPaths';

function ProcessedUserPage({ children }: { children: React.ReactElement }) {
    // react-redux variable
    const { rfStatus } = useSelector(authSelector).user!;
    const [loading, setLoading] = useState(true);

    // react-router variable
    const navigate = useNavigate();

    useEffect(() => {
        if (rfStatus === "Draft") {
            navigate(paths.WELCOME);
        } else if (rfStatus === "New") {
            navigate(paths.WAITING)
        }
        setLoading(false);
    }, [rfStatus]); // eslint-disable-line

    // redux react state varialbe

    return <>{loading ? null : children}</>;
}

export default ProcessedUserPage;
