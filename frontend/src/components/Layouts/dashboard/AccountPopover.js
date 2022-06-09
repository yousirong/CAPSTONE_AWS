import { useRef, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack';
import axios from 'axios';

// components
import MenuPopover from '../../Home/Dashboard/MenuPopover';
// mocks_
import account from '../../../Mock/Account';

// dashboard에서 오른쪽 상단에 표시될 User의 account 클릭 반응 및 출력 관련 함수
// ----------------------------------------------------------------------
// 아래의 내용 개발 안할 경우 지우기
const MENU_OPTIONS = [
  {
    // label: 'Home',
    label: '메인홈',
    icon: 'eva:home-fill',
    linkTo: '/',
  },
  {
    // label: 'Profile',
    label: '내 계정',
    icon: 'eva:person-fill',
    linkTo: '#',
  },
  {
    // label: 'Settings',
    label: '환경설정',
    icon: 'eva:settings-2-fill',
    linkTo: '#',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      first_name: '',
      email: '',
    },
    onSubmit: async (values) => {
      try {
        const res = await axios({
          //body: JSON.stringify(values),

          url: `/api/user`,
          headers: {
            //Authorization: `Basic ${TOKEN}`,
            'content-Type': 'application/json',
          },
          method: 'GET',
          //data: JSON.stringify(values),
        });
        console.log(res.data);
        setUsers(res.data);
        //enqueueSnackbar(res.data.message, { variant: 'success' });
        //   setUserNo(res.data.user_no);
      } catch (err) {
        console.error(err);
        // snackbar variant 값 default | error | success | warning | info
        enqueueSnackbar(err.message, { variant: 'error' });
      }
    },
  });
  useEffect(() => {
    console.log(users);
  }, []);
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <IconButton
            ref={anchorRef}
            onClick={handleOpen}
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{
              p: 0,
              ...(open && {
                '&:before': {
                  zIndex: 1,
                  content: "''",
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  position: 'absolute',
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                },
              }),
            }}
          >
            <Avatar src={account.photoURL} alt="photoURL" />
          </IconButton>
        </Form>

        <MenuPopover
          open={Boolean(open)}
          anchorEl={open}
          onClose={handleClose}
          sx={{
            p: 0,
            mt: 1.5,
            ml: 0.75,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          }}
        >
          <Box sx={{ my: 1.5, px: 2.5 }} key={users.user_no}>
            <Typography variant="subtitle2" noWrap error={Boolean(touched.first_name && errors.first_name)}>
              {users.first_name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary' }}
              noWrap
              error={Boolean(touched.email && errors.email)}
            >
              {users.email}
            </Typography>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack sx={{ p: 1 }}>
            {MENU_OPTIONS.map((option) => (
              <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
                {option.label}
              </MenuItem>
            ))}
          </Stack>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <MenuItem onClick={handleClose} sx={{ m: 1 }}>
            로그아웃{/* Logout */}
          </MenuItem>
        </MenuPopover>
      </FormikProvider>
    </>
  );
}
