import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../utils/constants/allPaths';
import { authSelector } from '../../../state/redux/authSlice';
import { useEffect } from 'react';

function DraftUserPage({ children }: { children: React.ReactElement }) {
    // react-redux variable
    const { rfStatus } = useSelector(authSelector).user!;
    const [loading, setLoading] = useState(true);

    // react-router variable
    const navigate = useNavigate();

    useEffect(() => {
        if (rfStatus === "Processed") {
            navigate(paths.USER_DASHBOARD);
        } else if (rfStatus === "New") {
            navigate(paths.WAITING);
        }
        setLoading(false);
    }, [rfStatus]); // eslint-disable-line

    // redux react state varialbe

    return <>{loading ? null : children}</>;
}

export default DraftUserPage