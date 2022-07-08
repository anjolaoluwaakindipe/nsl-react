import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../state/authSlice';

function NewUserPage({children}: {children:React.ReactElement}) {
    // react-redux variable
    const { rfStatus } = useSelector(authSelector).user!;
    const [loading, setLoading] = useState(true);

    // react-router variable
    const navigate = useNavigate();

    useEffect(() => {
        if (rfStatus !== "New") {
            navigate(-1);
        } else {
            setLoading(false);
        }
    }, [rfStatus]); // eslint-disable-line

    // redux react state varialbe

    return <>{loading ? null : children}</>;
}

export default NewUserPage