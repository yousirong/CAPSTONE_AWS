// import { useState, useCallback, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children, isAdmin }) => {
//   const { loading, isAuthenticated, ping } = useState((state) => state.ping);

//   return (
//     <>
//       {loading === false &&
//         (isAuthenticated === false ? (
//           <Navigate to="/login" />
//         ) : isAdmin ? (
//           ping.role !== 'dashboard' ? (
//             <Navigate to="/login" />
//           ) : (
//             children
//           )
//         ) : (
//           children
//         ))}
//     </>
//   );
// };

// export default ProtectedRoute;
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import isLogin from '../utils/isLogin';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route {...rest} render={(props) => (isLogin() ? <Component {...props} /> : <Navigate to="/signin" />)} />
  );
};
export default ProtectedRoute;
