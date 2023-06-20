// import React from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { Box, Paper, Typography } from '@mui/material';
// import { useVerifyAccountQuery } from './authApiSlice';
// import Logo from '../../Assets/Images/logo.png';
// import Check from '../../Assets/Images/check.gif';
// import Loading from '../../Components/Loading';
// import Error from '../../Components/Error';

// const AccountVerify = () => {
//   const { email, token } = useParams();
//   const { data, isLoading, isSuccess, isError, error } = useVerifyAccountQuery({
//     email: email,
//     token: token,
//   });

//   let content;

//   if (isLoading) {
//     content = <Loading open={isLoading} />;
//   } else if (isSuccess) {
//     content = (
//       <>
//         <Box sx={{ backgroundColor: '#fff' }}>
//           <img src={Check} alt='verify' height='300' width='300' />
//         </Box>
//         <Box sx={{ m: 1 }}>
//           <Typography component='h1' variant='h5'>
//             {data.message}
//           </Typography>
//         </Box>
//         <Box>
//           <Link to='/auth/login'>
//             <Typography sx={{ fontWeight: '500', color: '#1a73e8' }}>
//               Please Login
//             </Typography>
//           </Link>
//         </Box>
//       </>
//     );
//   } else if (isError) {
//     content = <Error error={error} />;
//   }

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '100vh',
//       }}
//     >
//       <Paper
//         sx={{
//           p: 3,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <Box sx={{ m: 2 }}>
//           <img src={Logo} alt='logo' height='32' width='32' />
//         </Box>
//         <Box sx={{ m: 2 }}>{content}</Box>
//       </Paper>
//     </Box>
//   );
// };

// export default AccountVerify;
