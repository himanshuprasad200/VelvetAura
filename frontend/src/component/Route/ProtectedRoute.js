import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin, Component, ...rest }) => {
  const { loading, isAuthenticated, user} = useSelector((state) => state.user);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const login = localStorage.getItem('login');
  //   if (!login) {
  //     navigate('/login');
  //   } else if (isAdmin && !localStorage.getItem('isAdmin')) {
  //     navigate('/login');
  //   }
  // }, [isAdmin, navigate]);

  return (
    <Fragment>
      {!loading === false && (
        <Routes>
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              navigate('/login')
            }
            if(isAdmin === true && user.role !== "admin"){
              navigate("/login")
            }
            return <Component{...props}/>
          }}
        />
        </Routes>
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
