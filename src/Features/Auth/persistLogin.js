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
  }, []);

  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    content = <Loading open={isLoading} />;
  } else if (isErorr) {
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
    content = <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
