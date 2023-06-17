// NavbarLinks.map((item) => (
//   <div key={item.division}>
//     {/* ------ Sidebar Main list------ */}
//     <List
//       key={item.division}
//       component='nav'
//       aria-labelledby='nested-list-subheader'
//       // Subheading
//       subheader={
//         <ListSubheader
//           component='div'
//           id='nested-list-subheader'
//           sx={{
//             backgroundColor: 'inherit',
//             color: theme.palette.text.disabled,
//           }}
//         >
//           {item.division}
//         </ListSubheader>
//       }
//     >
//       {/* Function to generate list accordingly wrt to children available */}
//       {/* Mapping Section-wise */}
//       {item.section.map((navLinks) => {
//         const Icon = icons[navLinks.icon];
//         return navLinks.options ? (
//           <ListItem
//             key={navLinks.title}
//             disablePadding
//             sx={{ display: 'block' }}
//           >
//             <StyledListItemButton
//               onClick={() => {
//                 handleClick(navLinks);
//               }}
//               component={Link}
//               to={navLinks.to}
//             >
//               <StyledListItemIcon>
//                 {<Icon sx={{ fontSize: '1.3rem' }}>{navLinks.icon}</Icon>}
//               </StyledListItemIcon>
//               <ListItemText
//                 primary={navLinks.title}
//                 primaryTypographyProps={{
//                   fontSize: 13,
//                   fontWeight: 'medium',
//                   lineHeight: '20px',
//                 }}
//                 sx={{ my: 0 }}
//               />
//               {navLinks === openFolder ? (
//                 <icons.ExpandLess
//                   sx={{ display: openWide ? 'block' : 'none' }}
//                 />
//               ) : (
//                 <icons.ExpandMore
//                   sx={{ display: openWide ? 'block' : 'none' }}
//                 />
//               )}
//             </StyledListItemButton>

//             {/* Mapping options-wise */}
//             {navLinks.options.map((subnavLinks) => {
//               const Icons = icons[subnavLinks.icon];
//               return (
//                 <Collapse
//                   in={navLinks === openFolder}
//                   timeout='auto'
//                   key={subnavLinks.title}
//                   unmountOnExit
//                 >
//                   <List
//                     component='div'
//                     disablePadding
//                     sx={{
//                       backgroundColor: alpha(theme.palette.grey[500], 0.15),
//                     }}
//                   >
//                     <StyledListItemButton
//                       variant='sidenav'
//                       sx={{ px: 3 }}
//                       component={Link}
//                       to={subnavLinks.to}
//                     >
//                       <StyledListItemIcon>
//                         {
//                           <Icons sx={{ fontSize: '1.2rem' }}>
//                             {subnavLinks.icon}
//                           </Icons>
//                         }
//                       </StyledListItemIcon>
//                       <ListItemText
//                         primary={subnavLinks.title}
//                         primaryTypographyProps={{
//                           fontSize: 12,
//                           fontWeight: 'small',
//                           lineHeight: '20px',
//                         }}
//                       />
//                     </StyledListItemButton>
//                   </List>
//                 </Collapse>
//               );
//             })}
//           </ListItem>
//         ) : (
//           <StyledListItemButton
//             key={navLinks.title}
//             variant='sidenav'
//             component={Link}
//             to={navLinks.to}
//           >
//             <StyledListItemIcon>
//               {<Icon sx={{ fontSize: '1.3rem' }}>{navLinks.icon}</Icon>}
//             </StyledListItemIcon>
//             <ListItemText
//               primary={navLinks.title}
//               primaryTypographyProps={{
//                 fontSize: 13,
//                 fontWeight: 'medium',
//                 lineHeight: '20px',
//                 mb: '2px',
//               }}
//             />
//           </StyledListItemButton>
//         );
//       })}
//     </List>
//     <Divider variant='middle' />
//   </div>
// ));

// import { apiSlice } from '../../App/api/apiSlice';

// export const teacherApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getTeacherData: builder.query({
//       query: () => `teacher/dashboard`,
//       providesTags: ['Data'],
//     }),

//     addStudent: builder.mutation({
//       query: ({ classId, data }) => ({
//         url: `teacher/${classId}/student/add-new`,
//         method: 'POST',
//         body: data,
//       }),
//       invalidatesTags: ['Data'],
//     }),

//     updateStudent: builder.mutation({
//       query: ({ classId, id, data }) => ({
//         url: `teacher/${classId}/student/${id}/update`,
//         method: 'PUT',
//         body: data,
//       }),
//       invalidatesTags: ['Data'],
//     }),

//     deleteStudent: builder.mutation({
//       query: ({ classId, id, data }) => ({
//         url: `teacher/${classId}/student/${id}/delete`,
//         method: 'DELETE',
//         body: data,
//       }),
//       invalidatesTags: ['Data'],
//     }),

//     addAssignment: builder.mutation({
//       query: ({ classId, data }) => ({
//         url: `teacher/${classId}/assignment/add-new`,
//         method: 'POST',
//         body: data,
//       }),
//       invalidatesTags: ['Data'],
//     }),

//     updateAssignment: builder.mutation({
//       query: ({ classId, id, data }) => ({
//         url: `teacher/${classId}/assignment/${id}/update`,
//         method: 'PUT',
//         body: data,
//       }),
//       invalidatesTags: ['Data'],
//     }),

//     deleteAssignment: builder.mutation({
//       query: ({ classId, id, data }) => ({
//         url: `teacher/${classId}/assignment/${id}/delete`,
//         method: 'DELETE',
//         body: data,
//       }),
//       invalidatesTags: ['Data'],
//     }),

//     addEvent: builder.mutation({
//       query: ({ classId, ...data }) => ({
//         url: `teacher/${classId}/event/add`,
//         method: 'POST',
//         body: data,
//       }),
//       invalidatesTags: ['Data'],
//     }),

//     deleteEvent: builder.mutation({
//       query: ({ classId, ...data }) => ({
//         url: `teacher/${classId}/event/delete`,
//         method: 'DELETE',
//         body: data,
//       }),
//       invalidatesTags: ['Data'],
//     }),

//     addExams: builder.mutation({
//       query: ({ classId, data }) => ({
//         url: `teacher/${classId}/upload/exam`,
//         method: 'POST',
//         body: data,
//       }),
//       invalidatesTags: ['Data'],
//     }),

//     updateExamination: builder.mutation({
//       query: ({ classId, id, data }) => ({
//         url: `teacher/${classId}/examination/${id}/update`,
//         method: 'PUT',
//         body: data,
//       }),
//       invalidatesTags: ['Data'],
//     }),

//     deleteExamination: builder.mutation({
//       query: ({ classId, id, data }) => ({
//         url: `teacher/${classId}/examination/${id}/delete`,
//         method: 'DELETE',
//         body: data,
//       }),
//       invalidatesTags: ['Data'],
//     }),

//     addResults: builder.mutation({
//       query: ({ classId, data }) => ({
//         url: `teacher/${classId}/upload/results`,
//         method: 'POST',
//         body: data,
//       }),
//       invalidatesTags: ['Data'],
//     }),

//     updateResults: builder.mutation({
//       query: ({ classId, id, data }) => ({
//         url: `teacher/${classId}/results/${id}/update`,
//         method: 'PUT',
//         body: data,
//       }),
//       invalidatesTags: ['Data'],
//     }),

//     deleteResult: builder.mutation({
//       query: ({ classId, id, data }) => ({
//         url: `teacher/${classId}/results/${id}/delete`,
//         method: 'DELETE',
//         body: data,
//       }),
//       invalidatesTags: ['Data'],
//     }),

//     addAttendance: builder.mutation({
//       query: ({ classId, data }) => ({
//         url: `teacher/${classId}/upload/attendance`,
//         method: 'POST',
//         body: data,
//       }),
//       invalidatesTags: ['Data'],
//     }),

//     addMiscellanousInfo: builder.mutation({
//       query: ({ classId, data }) => ({
//         url: `teacher/${classId}/upload/miscellaneous`,
//         method: 'POST',
//         body: data,
//       }),
//       invalidatesTags: ['Data'],
//     }),
//   }),
// });

// export const {
//   useGetTeacherDataQuery,
//   useAddStudentMutation,
//   useUpdateStudentMutation,
//   useDeleteStudentMutation,

//   useAddAssignmentMutation,
//   useUpdateAssignmentMutation,
//   useDeleteAssignmentMutation,

//   useAddEventMutation,
//   useDeleteEventMutation,

//   useAddExamsMutation,
//   useUpdateExaminationMutation,
//   useDeleteExaminationMutation,

//   useAddResultsMutation,
//   useUpdateResultsMutation,
//   useDeleteResultMutation,

//   useAddAttendanceMutation,

//   useAddMiscellanousInfoMutation,
// } = teacherApiSlice;

// [
//   {
//     _id: '6476f11b73ef509c8480ee25',
//     classId: 9,
//     timetable: [
//       {
//         day: 'Monday',
//         firstPeriod: 'English',
//         secondPeriod: 'Malayalam',
//         thirdPeriod: 'Biology',
//         fourthPeriod: 'PT',
//         fifthPeriod: 'Maths',
//         sixthPeriod: 'Maths',
//         seventhPeriod: 'Malayalam',
//       },
//       {
//         day: 'Tuesday',
//         firstPeriod: 'English',
//         secondPeriod: 'Maths',
//         thirdPeriod: 'Physics',
//         fourthPeriod: 'Malayalam',
//         fifthPeriod: 'Social Science',
//         sixthPeriod: 'Social Science',
//         seventhPeriod: 'Counselling',
//       },
//       {
//         day: 'Wednesday',
//         firstPeriod: 'English',
//         secondPeriod: 'Malayalam',
//         thirdPeriod: 'Maths',
//         fourthPeriod: 'Social Science',
//         fifthPeriod: 'Chemistry',
//         sixthPeriod: 'Social Science',
//         seventhPeriod: 'Biology',
//       },
//       {
//         day: 'Thursday',
//         firstPeriod: 'English',
//         secondPeriod: 'Malayalam',
//         thirdPeriod: 'Chemistry',
//         fourthPeriod: 'PT',
//         fifthPeriod: 'Biology',
//         sixthPeriod: 'Social Science',
//         seventhPeriod: 'Maths',
//       },
//       {
//         day: 'Friday',
//         firstPeriod: 'English',
//         secondPeriod: 'Maths',
//         thirdPeriod: 'Social Science',
//         fourthPeriod: 'Malayalam',
//         fifthPeriod: 'Physics',
//         sixthPeriod: 'Maths',
//         seventhPeriod: 'Chemistry',
//       },
//       {
//         day: 'Saturday',
//         firstPeriod: 'Malayalam',
//         secondPeriod: 'Maths',
//         thirdPeriod: 'English',
//         fourthPeriod: 'Social Science',
//         fifthPeriod: 'Library',
//         sixthPeriod: 'Physics',
//         seventhPeriod: 'PT',
//       },
//     ],
//     staff: [
//       {
//         subject: 'English',
//         name: 'Mrs. Preethi',
//         contactInfo: '8866332213',
//       },
//       {
//         subject: 'Malayalam',
//         name: 'Mrs. Majisha',
//         contactInfo: '7645321923',
//       },
//       {
//         subject: 'Math',
//         name: 'Mrs. Jijisha',
//         contactInfo: '8934125678',
//       },
//       {
//         subject: 'Biology',
//         name: 'Mrs. Reena',
//         contactInfo: '9183275472',
//       },
//       {
//         subject: 'Physics',
//         name: 'Mrs. Renisha',
//         contactInfo: '8723456732',
//       },
//       {
//         subject: 'Chemistry',
//         name: 'Mrs. Rekha',
//         contactInfo: '9911223344',
//       },
//       {
//         subject: 'Social Science (SS)',
//         name: 'Mrs. Beena',
//         contactInfo: '7698315143',
//       },
//       {
//         subject: 'Physical Training(PT)',
//         name: 'Mr. Liju',
//         contactInfo: '9843125643',
//       },
//       {
//         subject: 'Counselling',
//         name: 'Dr. Mubashira',
//         contactInfo: '7237389191',
//       },
//     ],
//     studentInfo: [
//       {
//         id: '1',
//         name: 'Aakarsh A K',
//         gender: 'Male',
//         guardianName: 'Kannan A K',
//         contactInfo: '9911223344',
//       },
//       {
//         name: 'Abhijay S',
//         gender: 'Male',
//         guardianName: 'Suresh S',
//         contactInfo: '8866332213',
//         id: '2',
//       },
//       {
//         name: 'Bhavya Sharath',
//         gender: 'Female',
//         guardianName: 'Sharath S',
//         contactInfo: '8934125678',
//         id: '3',
//       },
//       {
//         name: 'Chaitanya A R',
//         gender: 'Female',
//         guardianName: 'Raj Kumar',
//         contactInfo: '7698315143',
//         id: '4',
//       },
//       {
//         name: 'Dipsa S',
//         gender: 'Female',
//         guardianName: 'Aravind S',
//         contactInfo: '9183275472',
//         id: '5',
//       },
//       {
//         name: 'Divya Das',
//         gender: 'Female',
//         guardianName: 'Vijay Das',
//         contactInfo: '7345632711',
//         id: '6',
//       },
//       {
//         name: 'Elizabeth A',
//         gender: 'Female',
//         guardianName: 'John Xavier',
//         contactInfo: '9823411738',
//         id: '7',
//       },
//       {
//         name: 'Felmi S',
//         gender: 'Female',
//         guardianName: 'Lalu Kumar',
//         contactInfo: '8789631512',
//         id: '8',
//       },
//       {
//         name: 'Febin Santhosh',
//         gender: 'Male',
//         guardianName: 'Santhosh S',
//         contactInfo: '7563216452',
//         id: '9',
//       },
//       {
//         name: 'Harshavardhan K',
//         gender: 'Male',
//         guardianName: 'Vijayakanth K',
//         contactInfo: '8754216786',
//         id: '10',
//       },
//       {
//         name: 'Jubin N K',
//         gender: 'Male',
//         guardianName: 'Raju N K',
//         contactInfo: '9843125643',
//         id: '11',
//       },
//       {
//         name: 'Muhammed Aslam',
//         gender: 'Male',
//         guardianName: 'kabir A S',
//         contactInfo: '7237389191',
//         id: '12',
//       },
//       {
//         name: 'Muhammed Shamal',
//         gender: 'Male',
//         guardianName: 'Nazzer S K',
//         contactInfo: '8723456732',
//         id: '13',
//       },
//       {
//         name: 'Vrinda M',
//         gender: 'Female',
//         guardianName: 'Sajeev M',
//         contactInfo: '7645321923',
//         id: '14',
//       },
//       {
//         id: '15',
//         name: 'Waheeda R K',
//         gender: 'Female',
//         guardianName: 'Faizal R M',
//         contactInfo: '76352517281',
//       },
//     ],
//     events: [],
//     subjects: [
//       {
//         subjectName: 'English',
//       },
//       {
//         subjectName: 'Malayalam',
//       },
//       {
//         subjectName: 'Maths',
//       },
//       {
//         subjectName: 'Social Science',
//       },
//       {
//         subjectName: 'Biology',
//       },
//       {
//         subjectName: 'Physics',
//       },
//       {
//         subjectName: 'Chemistry',
//       },
//     ],
//     assignments: [],
//     examinations: [],
//     results: [],
//     attendance: [
//       {
//         date: '03/Jun/2023',
//         absentees: ['Muhammed Shamal', 'Vrinda M'],
//         attendancePercentage: '86.67',
//       },
//       {
//         date: '04/Jun/2023',
//         absentees: [
//           'Bhavya Sharath',
//           'Divya Das',
//           'Febin Santhosh',
//           'Muhammed Shamal',
//           'Vrinda M',
//         ],
//         attendancePercentage: '66.67',
//       },
//       {
//         date: '04/Jun/2023',
//         absentees: [
//           'Bhavya Sharath',
//           'Divya Das',
//           'Febin Santhosh',
//           'Muhammed Shamal',
//           'Vrinda M',
//         ],
//         attendancePercentage: '66.67',
//       },
//     ],
//     miscellaneousInfo: [
//       {
//         title: 'syllabusCompleted',
//         progress: 45,
//       },
//       {
//         title: 'projectsSubmitted',
//         progress: 47,
//       },
//       {
//         title: 'libraryBooksReturned',
//         progress: 51,
//       },
//     ],
//   },
// ];

// [
//   {
//     date: '05/May/2023',
//     absentees: [
//       {
//         name: 'Bhavya Sharath',
//         rollno: '3',
//       },
//       {
//         name: 'Divya Das',
//         rollno: '6',
//       },
//       {
//         name: 'Felmi S',
//         rollno: '8',
//       },
//       {
//         name: 'Harshavardhan K',
//         rollno: '10',
//       },
//       {
//         name: 'Muhammed Aslam',
//         rollno: '12',
//       },
//       {
//         name: 'Vrinda M',
//         rollno: '14',
//       },
//       {
//         name: 'Waheeda R K',
//         rollno: '15',
//       },
//     ],
//     attendancePercentage: '53.33',
//   },
//   {
//     date: '06/Jun/2023',
//     absentees: [
//       {
//         name: 'Bhavya Sharath',
//         rollno: '3',
//       },
//       {
//         name: 'Divya Das',
//         rollno: '6',
//       },
//       {
//         name: 'Felmi S',
//         rollno: '8',
//       },
//       {
//         name: 'Harshavardhan K',
//         rollno: '10',
//       },
//       {
//         name: 'Muhammed Aslam',
//         rollno: '12',
//       },
//       {
//         name: 'Vrinda M',
//         rollno: '14',
//       },
//       {
//         name: 'Waheeda R K',
//         rollno: '15',
//       },
//     ],
//     attendancePercentage: '53.33',
//   },
//   {
//     date: '06/Jun/2023',
//     absentees: [
//       {
//         name: 'Bhavya Sharath',
//         rollno: '3',
//       },
//       {
//         name: 'Divya Das',
//         rollno: '6',
//       },
//       {
//         name: 'Felmi S',
//         rollno: '8',
//       },
//       {
//         name: 'Harshavardhan K',
//         rollno: '10',
//       },
//       {
//         name: 'Muhammed Aslam',
//         rollno: '12',
//       },
//       {
//         name: 'Vrinda M',
//         rollno: '14',
//       },
//       {
//         name: 'Waheeda R K',
//         rollno: '15',
//       },
//     ],
//     attendancePercentage: '53.33',
//   },
// ];

import dayjs from 'dayjs';
import React from 'react';

export const Test = () => {
  const data = [
    {
      date: '05/May/2023',
      absentees: [
        {
          name: 'Bhavya Sharath',
          rollno: '3',
        },
        {
          name: 'Divya Das',
          rollno: '6',
        },
        {
          name: 'Felmi S',
          rollno: '8',
        },
        {
          name: 'Harshavardhan K',
          rollno: '10',
        },
        {
          name: 'Muhammed Aslam',
          rollno: '12',
        },
        {
          name: 'Vrinda M',
          rollno: '14',
        },
        {
          name: 'Waheeda R K',
          rollno: '15',
        },
      ],
      attendancePercentage: '53.33',
    },
    {
      date: '06/July/2023',
      absentees: [
        {
          name: 'Bhavya Sharath',
          rollno: '3',
        },
        {
          name: 'Divya Das',
          rollno: '6',
        },
        {
          name: 'Felmi S',
          rollno: '8',
        },
        {
          name: 'Harshavardhan K',
          rollno: '10',
        },
        {
          name: 'Muhammed Aslam',
          rollno: '12',
        },
        {
          name: 'Vrinda M',
          rollno: '14',
        },
        {
          name: 'Waheeda R K',
          rollno: '15',
        },
      ],
      attendancePercentage: '53.33',
    },
    {
      date: '06/Jun/2023',
      absentees: [
        {
          name: 'Bhavya Sharath',
          rollno: '3',
        },
        {
          name: 'Divya Das',
          rollno: '6',
        },
        {
          name: 'Felmi S',
          rollno: '8',
        },
        {
          name: 'Harshavardhan K',
          rollno: '10',
        },
        {
          name: 'Muhammed Aslam',
          rollno: '12',
        },
        {
          name: 'Vrinda M',
          rollno: '14',
        },
        {
          name: 'Waheeda R K',
          rollno: '15',
        },
      ],
      attendancePercentage: '53.33',
    },
  ];

  const filteredData = data.filter((item) => {
    const date = dayjs(item.date, 'DD/MMM/YYYY');
    const currentDate = dayjs();
    const thirtyDaysAgo = currentDate.subtract(30, 'day');

    return date.isAfter(thirtyDaysAgo) || date.isSame(thirtyDaysAgo, 'day');
  });

  return <div>{console.log(filteredData)}</div>;
};

{
  /* ---------APP Bar For larger Screens ------ */
}
<Hidden smDown>
  <AppBar
    position='fixed'
    color='inherit'
    elevation={0}
    // open={open}
    open={openWide}
  >
    <Toolbar>
      <Box sx={{ flexGrow: 1 }} />
      {/*------- Search Input------- */}
      <Searchbar />
      {/*--------- Nav Accessories ------- */}
      <Box sx={{ flexGrow: 1 }} />
      {/* ----Theme Icon ------ */}
      <Tooltip title='Theme'>
        <IconButton
          size='large'
          edge='start'
          color='primary'
          variant='navbtn'
          onClick={() => dispatch(toggleTheme())}
        >
          {darkMode ? <LightModeOutlined /> : <DarkModeOutlined />}
        </IconButton>
        {/* -----Chat Icon------- */}
      </Tooltip>
      <Tooltip title='Chat'>
        <IconButton size='large' color='primary'>
          <ChatOutlined />
        </IconButton>
      </Tooltip>
      {/* ----- Notification Icon------- */}
      <Tooltip title='Notifications'>
        <IconButton size='large' color='primary'>
          <NotificationsOutlined />
        </IconButton>
      </Tooltip>
      {/* ----- User Account------- */}
      <Divider orientation='vertical' variant='middle' flexItem />
      <Hidden lgDown>
        <Typography
          sx={{
            color: 'primary',
            marginLeft: '20px',
            lineHeight: '21px',
          }}
        >
          John Doe
        </Typography>
      </Hidden>
      <Tooltip title='User Account'>
        <IconButton
          aria-describedby={popoverId}
          size='large'
          edge='end'
          ref={anchorEl}
          aria-label='account of current user'
          color='primary'
          onClick={handleClick} // Add onClick event handler
        >
          <Avatar
            alt=''
            src=''
            sx={{
              width: 32,
              height: 32,
              color: 'inherit',
              backgroundColor: 'inherit',
            }}
          ></Avatar>
        </IconButton>
      </Tooltip>
      {/* Add Popover component */}
      <Popover
        id={popoverId}
        open={popOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {/* Content of the popover */}
        <UserProfile />
      </Popover>
    </Toolbar>
  </AppBar>
</Hidden>;

// ///////////////////////////////////
import React from 'react';
import {
  ChatOutlined,
  DarkModeOutlined,
  LightModeOutlined,
  Menu,
  NotificationsOutlined,
} from '@mui/icons-material';
import {
  Avatar,
  Divider,
  Hidden,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/system';
import MuiAppBar from '@mui/material/AppBar';

import {
  selectMobView,
  toggleLgView,
  toggleMobView,
} from '../../Features/ToggleSideBar/ToggleSidebarSlice';
import { selectTheme, toggleTheme } from '../../Features/Theme/themeSlice';
import { Searchbar } from '../Searchbar';
import { drawerWidth, fullDrawerWidth } from './DrawerWidth';

// ----- Navbar Function -----
export const NavBar = () => {
  const dispatch = useDispatch();
  const open = useSelector(selectMobView);
  const darkMode = useSelector(selectTheme);

  const handleDrawer = () => {
    dispatch(toggleMobView());
    dispatch(toggleLgView());
  };

  // Custom AppBar styles when toggling
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'openWide',
  })(({ theme, open, openWide }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('sm')]: {
      marginLeft: `${drawerWidth}px`,
      width: `calc(100% - ${drawerWidth}px)`,
    },
    backgroundColor: theme.palette.background.default,
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    ...(openWide && {
      marginLeft: `${fullDrawerWidth}px !important`,
      width: `calc(100% - ${fullDrawerWidth}px) !important`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  return (
    <>
      {/* ------ APPBAR ------- */}
      <AppBar position='fixed' color='inherit' elevation={0} open={open}>
        <Toolbar>
          {/*------ Menu Icon------ */}
          <Hidden smUp>
            <Tooltip title='Menu'>
              <IconButton
                size='large'
                edge='start'
                color='primary'
                aria-label='open drawer'
                sx={{ mr: 2 }}
                onClick={handleDrawer}
              >
                <Menu />
              </IconButton>
            </Tooltip>
          </Hidden>

          <Box sx={{ flexGrow: 1 }} />
          {/*------- Search Input------- */}
          <Hidden smDown>
            <Searchbar />
          </Hidden>

          {/*--------- Nav Accessories ------- */}
          <Box sx={{ flexGrow: 1 }} />
          {/* ----Theme Icon ------ */}
          <Tooltip title='Theme'>
            <IconButton
              size='large'
              edge='start'
              color='primary'
              variant='navbtn'
              onClick={() => dispatch(toggleTheme())}
            >
              {darkMode ? <LightModeOutlined /> : <DarkModeOutlined />}
            </IconButton>
          </Tooltip>

          {/* -----Chat Icon------- */}
          <Tooltip title='Chat'>
            <IconButton size='large' color='primary'>
              <ChatOutlined />
            </IconButton>
          </Tooltip>
          {/* ----- Notification Icon------- */}
          <Tooltip title='Notifications'>
            <IconButton size='large' color='primary'>
              <NotificationsOutlined />
            </IconButton>
          </Tooltip>
          {/* ----- User Account------- */}
          <Divider orientation='vertical' variant='middle' flexItem />
          <Hidden lgDown>
            <Typography
              sx={{ color: 'primary', marginLeft: '20px', lineHeight: '21px' }}
            >
              John Doe
            </Typography>
          </Hidden>
          <Tooltip title='User Account'>
            <IconButton
              size='large'
              edge='end'
              aria-label='account of current user'
              color='primary'
            >
              <Avatar
                alt=''
                src=''
                sx={{
                  width: 32,
                  height: 32,
                  color: 'inherit',
                  backgroundColor: 'inherit',
                }}
              ></Avatar>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </>
  );
};
///////////////////////////////////

///////////////////////////

import React, { memo } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as icons from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  ListItemIcon,
} from '@mui/material';
import styled from '@emotion/styled';
import NavbarLinks from '../../Data/Sidebar.json';
import { useSelector } from 'react-redux';
import { selectCurrentRole } from '../../Features/Auth/AuthSlice';
import { selectMobView } from '../../Features/ToggleSideBar/ToggleSidebarSlice';

export const SideNavLinks = () => {
  // Hook for opening sub-menu
  const role = useSelector(selectCurrentRole);
  const { classId } = useParams();

  const mobScreenView = useSelector(selectMobView);

  const theme = useTheme(); // use theme

  // Custom List Item
  const StyledListItemButton = styled(ListItemButton)(() => ({
    flexDirection: mobScreenView ? 'column' : 'row',
    justifyContent: mobScreenView ? 'center' : 'initial',
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor:
        theme.palette.mode === 'light' ? theme.palette.primary[50] : '#00386F',
    },
    '&:focus': {
      borderRight: `3px solid ${theme.palette.primary[500]}`,
      backgroundColor:
        theme.palette.mode === 'light' ? theme.palette.primary[50] : '#00386F',
      color: theme.palette.primary.main,
    },
  }));

  // Custom List Icon
  const StyledListItemIcon = styled(ListItemIcon)(() => ({
    justifyContent: mobScreenView ? 'center' : 'initial',
    color: theme.palette.primary[500],
  }));

  const NavLinks = NavbarLinks.filter((user) => user.type === `${role}`);

  return (
    <>
      {NavLinks.map((data) =>
        data.content.map((item) => (
          <div key={item.division}>
            {/* ------ Sidebar Main list------ */}
            <List
              key={item.division}
              component='nav'
              aria-labelledby='nested-list-subheader'
              // Subheading
              subheader={
                <ListSubheader
                  component='div'
                  id='nested-list-subheader'
                  sx={{
                    backgroundColor: 'inherit',
                    color: theme.palette.text.disabled,
                  }}
                >
                  {item.division}
                </ListSubheader>
              }
            >
              {/* Function to generate list accordingly wrt to children available */}
              {/* Mapping Section-wise */}
              {item.section.map((navLinks) => {
                const Icon = icons[navLinks.icon];
                return (
                  <StyledListItemButton
                    key={navLinks.title}
                    variant='sidenav'
                    component={Link}
                    to={`${role}/${classId}/${navLinks.to}`}
                  >
                    <StyledListItemIcon>
                      {<Icon sx={{ fontSize: '1.3rem' }}>{navLinks.icon}</Icon>}
                    </StyledListItemIcon>
                    <ListItemText
                      primary={navLinks.title}
                      primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: 'medium',
                        lineHeight: '20px',
                        mb: '2px',
                      }}
                    />
                  </StyledListItemButton>
                );
              })}
            </List>
            <Divider variant='middle' />
          </div>
        ))
      )}
    </>
  );
};
///////////////////////////
.............................
////////////////////////////
........................


import './App.css';
import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CssBaseline, responsiveFontSizes, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { customizations } from './Theme';
import { selectTheme } from './Features/Theme/themeSlice';
import TeacherDashboard from './Features/Teachers/TeacherDashboard';
import LandingPage from './Pages/LandingPage';
import Login from './Features/Auth/Login';
import SignUp from './Features/Auth/Signup';
import AccountVerify from './Features/Auth/AccountVerify';
import ForgotPassword from './Features/Auth/ForgotPassword';
import { ResetPassword } from './Features/Auth/ResetPassword';
import NotFound404 from './Pages/NotFound404';
import StudentDashboard from './Features/Student/StudentDashboard';
import { LayoutContainer } from './Components/Layouts/LayoutContainer';
import { Assignments } from './Features/Student/Assignments';
import { Examination } from './Features/Student/Examination';
import { Results } from './Features/Student/Results';
import { TimeTableBox } from './Features/Teachers/TimeTable/TimeTableBox';
import RequireAuth from './Features/Auth/RequireAuth';
import { TeacherCalendarContainer } from './Features/Teachers/Calendar/TeacherCalendarContainer';
import { TeacherAssignmentContainer } from './Features/Teachers/Assignment/TeacherAssignmentContainer';
import PersistLogin from './Features/Auth/persistLogin';
import { TeacherExaminationContainer } from './Features/Teachers/Examination/TeacherExaminationContainer';
import { TeacherResultsContainer } from './Features/Teachers/Results/TeacherResultsContainer';
import { StudentContainer } from './Features/Teachers/StudentInfo/StudentContainer';
import { CalendarContainer } from './Features/Student/CalendarContainer';
import { Timetable } from './Features/Student/Timetable';
import { Attendance } from './Features/Teachers/Attendance/Attendance';
import { OtherInfo } from './Features/Teachers/MiscellaneousInfo/OtherInfo';

const App = () => {
  // For toggling theme (Dark || Light)
  const [mode, setMode] = useState('light');
  const darkMode = useSelector(selectTheme);

  const memoizedDarkMode = useMemo(() => darkMode, [darkMode]);

  useEffect(() => {
    memoizedDarkMode ? setMode('dark') : setMode('light');
  }, [memoizedDarkMode]);

  // Custom theme template
  let theme = createTheme(customizations(mode));
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Paper
        style={{ borderRadius: '0', minHeight: '100vh', minWidth: '100vw' }}
        elevation={0}
      >
        <Routes>
          {/* --- Public Routes ----- */}
          <Route path='/' element={<LandingPage />} />

          {/* ---- Auth Routes ----- */}
          <Route path='/auth/*'>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<SignUp />} />
            <Route
              path='verifyaccount/:email/:token'
              element={<AccountVerify />}
            />
            <Route path='forgotpassword' element={<ForgotPassword />} />
            <Route
              path='resetpassword/:_id/:token'
              element={<ResetPassword />}
            />
          </Route>

          {/* ----Protected Routes----- */}
          <Route element={<PersistLogin />}>
            <Route path='dashboard' element={<LayoutContainer />}>
              {/* ---Teacher Routes--- */}
              <Route element={<RequireAuth allowedRoles={1110} />}>
                <Route path='1110/:classId'>
                  <Route index element={<TeacherDashboard />} />
                  <Route path='students' element={<StudentContainer />} />
                  <Route
                    path='assignment'
                    element={<TeacherAssignmentContainer />}
                  />
                  <Route path='timetable' element={<TimeTableBox />} />
                  <Route
                    path='calendar'
                    element={<TeacherCalendarContainer />}
                  />
                  <Route
                    path='examinations'
                    element={<TeacherExaminationContainer />}
                  />
                  <Route path='results' element={<TeacherResultsContainer />} />
                  <Route path='attendance' element={<Attendance />} />
                  <Route path='miscellaneous' element={<OtherInfo />} />
                </Route>
              </Route>
            </Route>

            {/* ---Student Routes------ */}
            <Route path='dashboard' element={<LayoutContainer />}>
              <Route element={<RequireAuth allowedRoles={1100} />}>
                <Route path='1100/:classId'>
                  <Route index element={<StudentDashboard />} />
                  <Route path='assignments' element={<Assignments />} />
                  <Route path='timetable' element={<Timetable />} />
                  <Route path='calendar' element={<CalendarContainer />} />
                  <Route path='examinations' element={<Examination />} />
                  <Route path='results' element={<Results />} />
                </Route>
              </Route>
            </Route>

            <Route element={<RequireAuth allowedRoles={1111} />}>
              <Route path='dashboard' element={<LayoutContainer />}>
                <Route path='1111/:classId'>{'JHellsmks admin'}</Route>
              </Route>
            </Route>

            <Route path='/404' element={<NotFound404 />} />
            <Route path='*' element={<Navigate replace to='/404' />} />
          </Route>
        </Routes>
      </Paper>
    </ThemeProvider>
  );
};

export default App;





[
  {
    "type": "1110",
    "content": [
      {
        "division": "Dashboard",
        "section": [
          {
            "title": "Dashboard",
            "icon": "DashboardOutlined",
            "to": ""
          }
        ]
      },
      {
        "division": "Class Info",
        "section": [
          {
            "title": "Students",
            "icon": "GroupsOutlined",
            "to": "students"
          },
          {
            "title": "Assigments",
            "icon": "AssignmentOutlined",
            "to": "assignment"
          },
          {
            "title": "Time Table",
            "icon": "TableChartOutlined",
            "to": "timetable"
          },
          {
            "title": "Calendar",
            "icon": "CalendarMonthOutlined",
            "to": "calendar"
          },
          {
            "title": "Examinations",
            "icon": "QuizOutlined",
            "to": "examinations"
          },
          {
            "title": "Results",
            "icon": "AssessmentOutlined",
            "to": "results"
          }
        ]
      },
      {
        "division": "Add ons",
        "section": [
          {
            "title": "Attendance",
            "icon": "HowToRegOutlined",
            "to": "attendance"
          }
        ]
      },
      {
        "division": "Miscellaneous",
        "section": [
          {
            "title": "Other Class Info",
            "icon": "InfoOutlined",
            "to": "miscellaneous"
          }
        ]
      }
    ]
  },
  {
    "type": "1100",
    "content": [
      {
        "division": "Dashboard",
        "section": [
          {
            "title": "Dashboard",
            "icon": "DashboardOutlined",
            "to": "/"
          }
        ]
      },
      {
        "division": "Addons",
        "section": [
          {
            "title": "Assigments",
            "icon": "AssignmentOutlined",
            "to": "assignments"
          },
          {
            "title": "Time Table",
            "icon": "TableChartOutlined",
            "to": "timetable"
          },
          {
            "title": "Calendar",
            "icon": "CalendarMonthOutlined",
            "to": "calendar"
          },
          {
            "title": "Examinations",
            "icon": "QuizOutlined",
            "to": "examinations"
          },
          {
            "title": "Results",
            "icon": "AssessmentOutlined",
            "to": "results"
          }
        ]
      }
    ]
  }
]



import React from 'react';
import { Link } from 'react-router-dom';
import * as icons from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  ListItemIcon,
} from '@mui/material';
import styled from '@emotion/styled';
import NavbarLinks from '../../Data/Sidebar.json';
import { useSelector } from 'react-redux';
import { selectCurrentRole } from '../../Features/Auth/AuthSlice';
import { selectMobView } from '../../Features/ToggleSideBar/ToggleSidebarSlice';

export const SideNavLinks = () => {
  // Hook for opening sub-menu
  const role = useSelector(selectCurrentRole);

  const mobScreenView = useSelector(selectMobView);

  const theme = useTheme(); // use theme

  // Custom List Item
  const StyledListItemButton = styled(ListItemButton)(() => ({
    flexDirection: mobScreenView ? 'column' : 'row',
    justifyContent: mobScreenView ? 'center' : 'initial',
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor:
        theme.palette.mode === 'light' ? theme.palette.primary[50] : '#00386F',
    },
    '&:focus': {
      borderRight: `3px solid ${theme.palette.primary[500]}`,
      backgroundColor:
        theme.palette.mode === 'light' ? theme.palette.primary[50] : '#00386F',
      color: theme.palette.primary.main,
    },
  }));

  // Custom List Icon
  const StyledListItemIcon = styled(ListItemIcon)(() => ({
    justifyContent: mobScreenView ? 'center' : 'initial',
    color: theme.palette.primary[500],
  }));

  const NavLinks = NavbarLinks.filter((user) => user.type === `${role}`);

  return (
    <>
      {NavLinks.map((data) =>
        data.content.map((item) => (
          <div key={item.division}>
            {/* ------ Sidebar Main list------ */}
            <List
              key={item.division}
              component='nav'
              aria-labelledby='nested-list-subheader'
              // Subheading
              subheader={
                <ListSubheader
                  component='div'
                  id='nested-list-subheader'
                  sx={{
                    backgroundColor: 'inherit',
                    color: theme.palette.text.disabled,
                  }}
                >
                  {item.division}
                </ListSubheader>
              }
            >
              {/* Mapping Section-wise */}
              {item.section.map((navLinks) => {
                const Icon = icons[navLinks.icon];
                return (
                  <StyledListItemButton
                    key={navLinks.title}
                    variant='sidenav'
                    component={Link}
                    to={navLinks.to}
                  >
                    <StyledListItemIcon>
                      {<Icon sx={{ fontSize: '1.3rem' }}>{navLinks.icon}</Icon>}
                    </StyledListItemIcon>
                    <ListItemText
                      primary={navLinks.title}
                      primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: 'medium',
                        lineHeight: '20px',
                        mb: '2px',
                      }}
                    />
                  </StyledListItemButton>
                );
              })}
            </List>
            <Divider variant='middle' />
          </div>
        ))
      )}
    </>
  );
};
///////////////////////////////////////




import React from 'react';
import { Link } from 'react-router-dom';
import * as icons from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  ListItemIcon,
} from '@mui/material';
import styled from '@emotion/styled';
import NavbarLinks from '../../Data/Sidebar.json';
import { useSelector } from 'react-redux';
import {
  selectCurrentClassAssigned,
  selectCurrentRole,
} from '../../Features/Auth/AuthSlice';
import { selectMobView } from '../../Features/ToggleSideBar/ToggleSidebarSlice';

export const SideNavLinks = () => {
  const role = useSelector(selectCurrentRole);
  const classId = useSelector(selectCurrentClassAssigned);
  const mobScreenView = useSelector(selectMobView);
  const theme = useTheme();

  const StyledListItemButton = styled(ListItemButton)(() => ({
    flexDirection: mobScreenView ? 'column' : 'row',
    justifyContent: mobScreenView ? 'center' : 'initial',
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor:
        theme.palette.mode === 'light' ? theme.palette.primary[50] : '#00386F',
    },
    '&:focus': {
      borderRight: `3px solid ${theme.palette.primary[500]}`,
      backgroundColor:
        theme.palette.mode === 'light' ? theme.palette.primary[50] : '#00386F',
      color: theme.palette.primary.main,
    },
  }));

  const StyledListItemIcon = styled(ListItemIcon)(() => ({
    justifyContent: mobScreenView ? 'center' : 'initial',
    color: theme.palette.primary[500],
  }));

  const NavLinks = NavbarLinks.filter((user) => user.type === `${role}`);

  // Replace placeholders in URL with actual values
  const replaceUrlPlaceholders = (url, classId, userRoles) => {
    let updatedUrl = url.replace(':classId', classId);
    updatedUrl = updatedUrl.replace(':userRoles', userRoles);
    return updatedUrl;
  };

  return (
    <>
      {NavLinks.map((data) =>
        data.content.map((item) => (
          <div key={item.division}>
            <List
              key={item.division}
              component='nav'
              aria-labelledby='nested-list-subheader'
              subheader={
                <ListSubheader
                  component='div'
                  id='nested-list-subheader'
                  sx={{
                    backgroundColor: 'inherit',
                    color: theme.palette.text.disabled,
                  }}
                >
                  {item.division}
                </ListSubheader>
              }
            >
              {item.section.map((navLinks) => {
                const Icon = icons[navLinks.icon];
                const to = replaceUrlPlaceholders(navLinks.to, classId, role);
                return (
                  <StyledListItemButton
                    key={navLinks.title}
                    variant='sidenav'
                    component={Link}
                    to={to}
                  >
                    <StyledListItemIcon>
                      {<Icon sx={{ fontSize: '1.3rem' }}>{navLinks.icon}</Icon>}
                    </StyledListItemIcon>
                    <ListItemText
                      primary={navLinks.title}
                      primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: 'medium',
                        lineHeight: '20px',
                        mb: '2px',
                      }}
                    />
                  </StyledListItemButton>
                );
              })}
            </List>
            <Divider variant='middle' />
          </div>
        ))
      )}
    </>
  );
};



/////////////////////////////////////////

[
    {
        "_id": "6476f11b73ef509c8480ee25",
        "classId": 9,
        "timetable": [
            {
                "day": "Monday",
                "firstPeriod": "English",
                "secondPeriod": "Malayalam",
                "thirdPeriod": "Biology",
                "fourthPeriod": "PT",
                "fifthPeriod": "Maths",
                "sixthPeriod": "Maths",
                "seventhPeriod": "Malayalam"
            },
            {
                "day": "Tuesday",
                "firstPeriod": "English",
                "secondPeriod": "Maths",
                "thirdPeriod": "Physics",
                "fourthPeriod": "Malayalam",
                "fifthPeriod": "Social Science",
                "sixthPeriod": "Social Science",
                "seventhPeriod": "Counselling"
            },
            {
                "day": "Wednesday",
                "firstPeriod": "English",
                "secondPeriod": "Malayalam",
                "thirdPeriod": "Maths",
                "fourthPeriod": "Social Science",
                "fifthPeriod": "Chemistry",
                "sixthPeriod": "Social Science",
                "seventhPeriod": "Biology"
            },
            {
                "day": "Thursday",
                "firstPeriod": "English",
                "secondPeriod": "Malayalam",
                "thirdPeriod": "Chemistry",
                "fourthPeriod": "PT",
                "fifthPeriod": "Biology",
                "sixthPeriod": "Social Science",
                "seventhPeriod": "Maths"
            },
            {
                "day": "Friday",
                "firstPeriod": "English",
                "secondPeriod": "Maths",
                "thirdPeriod": "Social Science",
                "fourthPeriod": "Malayalam",
                "fifthPeriod": "Physics",
                "sixthPeriod": "Maths",
                "seventhPeriod": "Chemistry"
            },
            {
                "day": "Saturday",
                "firstPeriod": "Malayalam",
                "secondPeriod": "Maths",
                "thirdPeriod": "English",
                "fourthPeriod": "Social Science",
                "fifthPeriod": "Library",
                "sixthPeriod": "Physics",
                "seventhPeriod": "PT"
            }
        ],
        "staff": [
            {
                "subject": "English",
                "name": "Mrs. Preethi",
                "contactInfo": "8866332213"
            },
            {
                "subject": "Malayalam",
                "name": "Mrs. Majisha",
                "contactInfo": "7645321923"
            },
            {
                "subject": "Math",
                "name": "Mrs. Jijisha",
                "contactInfo": "8934125678"
            },
            {
                "subject": "Biology",
                "name": "Mrs. Reena",
                "contactInfo": "9183275472"
            },
            {
                "subject": "Physics",
                "name": "Mrs. Renisha",
                "contactInfo": "8723456732"
            },
            {
                "subject": "Chemistry",
                "name": "Mrs. Rekha",
                "contactInfo": "9911223344"
            },
            {
                "subject": "Social Science (SS)",
                "name": "Mrs. Beena",
                "contactInfo": "7698315143"
            },
            {
                "subject": "Physical Training(PT)",
                "name": "Mr. Liju",
                "contactInfo": "9843125643"
            },
            {
                "subject": "Counselling",
                "name": "Dr. Mubashira",
                "contactInfo": "7237389191"
            }
        ],
        "studentInfo": [
            {
                "id": "1",
                "name": "Aakarsh A K",
                "gender": "Male",
                "guardianName": "Kannan A K",
                "contactInfo": "9911223344"
            },
            {
                "name": "Abhijay S",
                "gender": "Male",
                "guardianName": "Suresh S",
                "contactInfo": "8866332213",
                "id": "2"
            },
            {
                "name": "Bhavya Sharath",
                "gender": "Female",
                "guardianName": "Sharath S",
                "contactInfo": "8934125678",
                "id": "3"
            },
            {
                "name": "Chaitanya A R",
                "gender": "Female",
                "guardianName": "Raj Kumar",
                "contactInfo": "7698315143",
                "id": "4"
            },
            {
                "name": "Dipsa S",
                "gender": "Female",
                "guardianName": "Aravind S",
                "contactInfo": "9183275472",
                "id": "5"
            },
            {
                "name": "Divya Das",
                "gender": "Female",
                "guardianName": "Vijay Das",
                "contactInfo": "7345632711",
                "id": "6"
            },
            {
                "name": "Elizabeth A",
                "gender": "Female",
                "guardianName": "John Xavier",
                "contactInfo": "9823411738",
                "id": "7"
            },
            {
                "name": "Felmi S",
                "gender": "Female",
                "guardianName": "Lalu Kumar",
                "contactInfo": "8789631512",
                "id": "8"
            },
            {
                "name": "Febin Santhosh",
                "gender": "Male",
                "guardianName": "Santhosh S",
                "contactInfo": "7563216452",
                "id": "9"
            },
            {
                "name": "Harshavardhan K",
                "gender": "Male",
                "guardianName": "Vijayakanth K",
                "contactInfo": "8754216786",
                "id": "10"
            },
            {
                "name": "Jubin N K",
                "gender": "Male",
                "guardianName": "Raju N K",
                "contactInfo": "9843125643",
                "id": "11"
            },
            {
                "name": "Muhammed Aslam",
                "gender": "Male",
                "guardianName": "kabir A S",
                "contactInfo": "7237389191",
                "id": "12"
            },
            {
                "name": "Muhammed Shamal",
                "gender": "Male",
                "guardianName": "Nazzer S K",
                "contactInfo": "8723456732",
                "id": "13"
            },
            {
                "name": "Vrinda M",
                "gender": "Female",
                "guardianName": "Sajeev M",
                "contactInfo": "7645321923",
                "id": "14"
            },
            {
                "id": "15",
                "name": "Waheeda R K",
                "gender": "Female",
                "guardianName": "Faizal R M",
                "contactInfo": "76352517281"
            }
        ],
        "events": [
            {
                "id": "2023-06-05-Webinar",
                "title": "Webinar",
                "start": "2023-06-05",
                "end": "2023-06-06",
                "allDay": true
            }
        ],
        "subjects": [
            {
                "subjectName": "English"
            },
            {
                "subjectName": "Malayalam"
            },
            {
                "subjectName": "Maths"
            },
            {
                "subjectName": "Social Science"
            },
            {
                "subjectName": "Biology"
            },
            {
                "subjectName": "Physics"
            },
            {
                "subjectName": "Chemistry"
            }
        ],
        "assignments": [],
        "examinations": [],
        "results": [
            {
                "id": "UT1",
                "examType": "Unit Test 1",
                "passPercentage": "95",
                "description": "https://drive.google.com/file/d/1S8gJeCD_vDjbM2JKk8Ojkt-6Uj_fdn_NQPdzHeQnn0Y/view"
            },
            {
                "id": "UT2",
                "examType": "Unit Test 2",
                "passPercentage": "91",
                "description": "https://drive.google.com/file/d/1S8gJeCD_vDjbM2JKk8Ojkt-6Uj_fdn_NQPdzHeQnn0Y/view"
            },
            {
                "id": "PA1",
                "examType": "Periodic Assessment 1",
                "passPercentage": "87",
                "description": "https://drive.google.com/file/d/1S8gJeCD_vDjbM2JKk8Ojkt-6Uj_fdn_NQPdzHeQnn0Y/view"
            },
            {
                "id": "UT3",
                "examType": "Unit Test 3",
                "passPercentage": "88",
                "description": "https://drive.google.com/file/d/1S8gJeCD_vDjbM2JKk8Ojkt-6Uj_fdn_NQPdzHeQnn0Y/view"
            },
            {
                "id": "UT4",
                "examType": "Unit Test 4",
                "passPercentage": "82",
                "description": "https://drive.google.com/file/d/1S8gJeCD_vDjbM2JKk8Ojkt-6Uj_fdn_NQPdzHeQnn0Y/view"
            },
            {
                "id": "PA2",
                "examType": "Periodic Assessment 2",
                "passPercentage": "78",
                "description": "https://drive.google.com/file/d/1S8gJeCD_vDjbM2JKk8Ojkt-6Uj_fdn_NQPdzHeQnn0Y/view"
            }
        ],
        "attendance": [
            {
                "date": "03/Jun/2023",
                "absentees": [
                    "Muhammed Shamal",
                    "Vrinda M"
                ],
                "attendancePercentage": "86.67"
            },
            {
                "date": "04/Jun/2023",
                "absentees": [
                    "Bhavya Sharath",
                    "Divya Das",
                    "Febin Santhosh",
                    "Muhammed Shamal",
                    "Vrinda M"
                ],
                "attendancePercentage": "66.67"
            },
            {
                "date": "05/Jun/2023",
                "absentees": [
                    {
                        "name": "Bhavya Sharath",
                        "rollno": "3"
                    },
                    {
                        "name": "Divya Das",
                        "rollno": "6"
                    },
                    {
                        "name": "Felmi S",
                        "rollno": "8"
                    },
                    {
                        "name": "Harshavardhan K",
                        "rollno": "10"
                    },
                    {
                        "name": "Muhammed Aslam",
                        "rollno": "12"
                    },
                    {
                        "name": "Vrinda M",
                        "rollno": "14"
                    },
                    {
                        "name": "Waheeda R K",
                        "rollno": "15"
                    }
                ],
                "attendancePercentage": "53.33"
            },
            {
                "date": "07/Jun/2023",
                "absentees": [
                    {
                        "name": "Bhavya Sharath",
                        "rollno": "3"
                    },
                    {
                        "name": "Jubin N K",
                        "rollno": "11"
                    },
                    {
                        "name": "Waheeda R K",
                        "rollno": "15"
                    }
                ],
                "attendancePercentage": "80.00"
            },
            {
                "date": "08/Jun/2023",
                "absentees": [
                    "All Present"
                ],
                "attendancePercentage": "100.00"
            }
        ],
        "miscellaneousInfo": [
            {
                "title": "Syllabus",
                "progress": 61
            },
            {
                "title": "Projects",
                "progress": 72
            },
            {
                "title": "Homework",
                "progress": 77
            },
            {
                "title": "Library",
                "progress": 57
            }
        ]
    }
]

///////////////////////////////////////////////////


import React from 'react';
import {
  AccountCircleOutlined,
  ChatOutlined,
  DarkModeOutlined,
  LightModeOutlined,
  Menu,
  NotificationsOutlined,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  Hidden,
  IconButton,
  Popover,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/system';
import MuiAppBar from '@mui/material/AppBar';

import {
  selectMobView,
  toggleLgView,
  toggleMobView,
} from '../../Features/ToggleSideBar/ToggleSidebarSlice';
import { selectTheme, toggleTheme } from '../../Features/Theme/themeSlice';
import { Searchbar } from '../Searchbar';
import { drawerWidth, fullDrawerWidth } from './DrawerWidth';
import { UserProfile } from '../UserProfile';

// ----- Navbar Function -----
export const NavBar = () => {
  const dispatch = useDispatch();
  const open = useSelector(selectMobView);
  const darkMode = useSelector(selectTheme);

  const handleDrawer = () => {
    dispatch(toggleMobView());
    dispatch(toggleLgView());
  };

  // Custom AppBar styles when toggling
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'openWide',
  })(({ theme, open, openWide }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('sm')]: {
      marginLeft: `${drawerWidth}px`,
      width: `calc(100% - ${drawerWidth}px)`,
    },
    backgroundColor: theme.palette.background.default,
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    ...(openWide && {
      marginLeft: `${fullDrawerWidth}px !important`,
      width: `calc(100% - ${fullDrawerWidth}px) !important`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <>
      {/* ------ APPBAR ------- */}
      <AppBar position='fixed' color='inherit' elevation={0} open={open}>
        <Toolbar>
          {/*------ Menu Icon------ */}
          <Hidden smUp>
            <Tooltip title='Menu'>
              <IconButton
                size='large'
                edge='start'
                color='primary'
                aria-label='open drawer'
                sx={{ mr: 2 }}
                onClick={handleDrawer}
              >
                <Menu />
              </IconButton>
            </Tooltip>
          </Hidden>

          <Box sx={{ flexGrow: 1 }} />
          {/*------- Search Input------- */}
          <Hidden smDown>
            <Searchbar />
          </Hidden>

          {/*--------- Nav Accessories ------- */}
          <Box sx={{ flexGrow: 1 }} />
          {/* ----Theme Icon ------ */}
          <Tooltip title='Theme'>
            <IconButton
              size='large'
              edge='start'
              color='primary'
              variant='navbtn'
              onClick={() => dispatch(toggleTheme())}
            >
              {darkMode ? <LightModeOutlined /> : <DarkModeOutlined />}
            </IconButton>
          </Tooltip>

          {/* -----Chat Icon------- */}
          <Tooltip title='Chat'>
            <IconButton size='large' color='primary'>
              <ChatOutlined />
            </IconButton>
          </Tooltip>
          {/* ----- Notification Icon------- */}
          <Tooltip title='Notifications'>
            <IconButton size='large' color='primary'>
              <NotificationsOutlined />
            </IconButton>
          </Tooltip>
          {/* ----- User Account------- */}
          <Divider orientation='vertical' variant='middle' flexItem />
          <Hidden lgDown>
            <Typography
              sx={{ color: 'primary', marginLeft: '20px', lineHeight: '21px' }}
            >
              John Doe
            </Typography>
          </Hidden>
          <IconButton size='large' edge='end' color='primary'>
            <AccountCircleOutlined
              sx={{
                width: 32,
                height: 32,
                color: 'inherit',
                backgroundColor: 'inherit',
              }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};
