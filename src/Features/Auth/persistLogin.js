import React, { useEffect, useRef, useState } from 'react';
import usePersist from '../../Hooks/usePersist';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './AuthSlice';
import { useRefreshMutation } from './authApiSlice';
import { Link, Outlet } from 'react-router-dom';
import Loading from '../../Components/Loading';
import Error from '../../Components/Error';

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  // mutation hook for Persist Login
  const [refresh, { isUninitialized, isLoading, isSuccess, isErorr, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true) {
      const verifyRefreshToken = async () => {
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (error) {
          console.log(error);
        }
      };
      if (!token && persist) verifyRefreshToken();
    }
    return () => (effectRan.current = true);
  }, [persist, refresh, token]);

  let content;
  if (!persist) {
    // If persist is false, render the nested routes
    content = <Outlet />;
  }
  // If loading, show the loading indicator
  else if (isLoading) {
    content = <Loading open={isLoading} />;
  }
  // If there's an error, display the error message and a link to the login page
  else if (isErorr) {
    content = (
      <>
        <div>
          <Error erro={error} />
        </div>
        <div>
          <p>{`${error?.data?.message} - `}</p>
          <Link to='/auth/login'>Please Login</Link>
        </div>
      </>
    );
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    // If the refresh was successful, render the nested routes
    content = <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    // If there is a token and it's in the uninitialized state, render the nested routes
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
