import * as Yup from 'yup';
import * as React from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography, Stack, TextField, IconButton, InputAdornment } from '@mui/material';

import { LoadingButton } from '@mui/lab';
//hooks
// component
import Iconify from '../Home/Dashboard/Iconify';
import useResponsive from '../../utils/useResponsive';
import axios from 'axios';
// register page 관련 form 출력함수
const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

const Register = () => {
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  // 빨간색 글씨로 오류 처리하는 부분
  const RegisterSchema = Yup.object().shape({
    first_name: Yup.string().min(1, '너무 짧습니다.').max(10, '너무 깁니다.').required('이름은 필수 항목입니다.'),
    last_name: Yup.string().min(1, '너무 짧습니다.').max(10, '너무 깁니다.').required('성은 필수 항목입니다.'),
    email: Yup.string().email('이메일은 유효한 이메일 형식이어야 합니다.').required('이메일은 필수 항목입니다.'),
    password: Yup.string().min(8, '너무 짧습니다.').max(20, '너무 깁니다.').required('비밀번호는 필수 항목입니다.'),
    phone: Yup.string().required('핸드폰 번호는 필수 항목입니다.'),
  });
  //const [state, setState] = useState(null || '');
  const [showPassword, setShowPassword] = useState(false);
  //   const [checkEmail, setCheckEmail] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  //   const handleCheck = () => {
  //     setCheckEmail();
  //   };

  // register (sign up)
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      phone: '',
    },
    validationSchema: RegisterSchema,
    handleCheckEmailClick: async (values) => {
      // const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      // if (!signUp.email.match(emailRegex)) return alert('이메일을 정확히 입력하세요!');
      //   try {
      //     const res = await axios({
      //       url: `/api/register/check`,
      //       //   params: { email: signUp.email },
      //       headers: {
      //         //Authorization: `Basic ${TOKEN}`,
      //         'content-Type': 'application/json',
      //       },
      //       method: 'POST',
      //       data: JSON.stringify(values.email),
      //     });
      //     console.log(res.data.email);
      //     setCheckEmail(true);
      //     enqueueSnackbar(res.data.message, { variant: 'success' }); // check 메시지 받기
      //   } catch (err) {
      //     if (err?.res?.status === 401) {
      //       setCheckEmail(false);
      //       enqueueSnackbar(err.message, { variant: 'error' }); // 이미 가입된 이메일 입니다 받기
      //       return alert('이미 가입된 이메일 입니다.');
      //     }
      //     console.error(err);
      //   }
    },
    // register 확인될 경우 dashboard로 navigate
    onSubmit: async (values) => {
      try {
        // alert(JSON.stringify(values, null, 2));
        // console.log(values);
        const res = await axios({
          //body: JSON.stringify(values),
          url: `/api/register`,
          headers: {
            //Authorization: `Basic ${TOKEN}`,
            'content-Type': 'application/json',
          },
          method: 'POST',
          data: JSON.stringify(values),
        });
        console.log(res);
        enqueueSnackbar(res.data.message, { variant: 'success' });
        navigate('/login', { replace: true });
      } catch (err) {
        console.error(err);
        enqueueSnackbar(err.message, { variant: 'error' });
      }
    },
  });

  //   useEffect(() => {
  //     setSignUp({
  //       first_name: '',
  //       last_name: '',
  //       email: '',
  //       password: '',
  //       phone: '',
  //     });
  //     setCheckEmail(false);
  //   }, []);
  // error handler 및 유저 선택적 api 변수
  const { errors, touched, isSubmitting, handleCheckEmailClick, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <MetaData title="Register" />
      <RootStyle>
        <HeaderStyle>{/* <Logo /> */}</HeaderStyle>
        {mdUp && (
          <SectionStyle>
            <Typography lang="ko" variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              우리와 함께 더 효과적으로 작업을 관리하십시오.
              {/* Manage the job more effectively with us */}
            </Typography>
            <img alt="register" src="/static/illustrations/illustration_register.png" />
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Typography lang="ko" variant="h4" gutterBottom>
              오신 것을 환영합니다.{/* Get started free account. */}
            </Typography>

            <Typography lang="ko" sx={{ color: 'text.secondary', mb: 5 }}>
              지금 회원 가입하신 후 다양한 서비스를 만나보세요.
              {/* Free forever. No credit card needed. */}
            </Typography>

            {/* <AuthSocial /> */}

            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      lang="ko"
                      fullWidth
                      label="이름"
                      {...getFieldProps('first_name')}
                      error={Boolean(touched.first_name && errors.first_name)}
                      helperText={touched.first_name && errors.first_name}
                    />

                    <TextField
                      lang="ko"
                      fullWidth
                      label="성"
                      {...getFieldProps('last_name')}
                      error={Boolean(touched.last_name && errors.last_name)}
                      helperText={touched.last_name && errors.last_name}
                    />
                  </Stack>
                  <TextField
                    lang="ko"
                    fullWidth
                    autoComplete="username"
                    type="email"
                    label="이메일"
                    {...getFieldProps('email')}
                    // InputProps={{
                    //   endAdornment: (
                    //     <InputAdornment position="end">
                    //       <IconButton onClick={handleCheck} onChange={handleCheckEmailClick} edge="end">
                    //         <Iconify icon={checkEmail ? 'ant-design:check-circle-outlined' : 'akar-icons:circle-x'} />
                    //       </IconButton>
                    //     </InputAdornment>
                    //   ),
                    // }}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  {/* {signUp.email.length > 5 && checkEmail && (
                      <span style={{ color: `green`, fontWeight: `bold` }}>사용가능한 이메일</span>
                    )} */}
                  {/* <button onClick={handleCheckEmailClick}>중복 확인</button> */}
                  {/* </div> */}
                  <TextField
                    lang="ko"
                    fullWidth
                    autoComplete="current-password"
                    type={showPassword ? 'text' : 'password'}
                    label="비밀번호"
                    {...getFieldProps('password')}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleShowPassword} edge="end">
                            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <TextField
                    lang="ko"
                    fullWidth
                    label="핸드폰 번호"
                    {...getFieldProps('phone')}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                  <LoadingButton
                    lang="ko"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    계정 생성
                    {/* Create Account */}
                  </LoadingButton>
                </Stack>
              </Form>
            </FormikProvider>
            {smUp && (
              <Typography lang="ko" variant="body2" sx={{ mt: { md: 5 } }}>
                이미 계정이 있습니까? {/* Already have an account?  */}
                {''}
                <Link lang="ko" variant="subtitle2" component={RouterLink} to="/login">
                  로그인{/* Login */}
                </Link>
              </Typography>
            )}
            <Typography lang="ko" variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
              계정 등록함으로써 HUFS_CAPSTONE
              <Link lang="ko" underline="always" color="text.primary" href="#">
                {''} 서비스 약관 {/* Terms of Service */}
              </Link>
              {''}및 {/* and */}
              {''}
              <Link lang="ko" underline="always" color="text.primary" href="#">
                개인 정보 보호 정책{''}
                {/* Privacy Policy */}
              </Link>
              에 동의합니다.&nbsp;
              {/* By registering, I agree to HUFS_CAPSTONE */}
            </Typography>

            {!smUp && (
              <Typography lang="ko" variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                이미 계정이 있습니까?{/* Already have an account? */}{' '}
                <Link lang="ko" variant="subtitle2" to="/login" component={RouterLink}>
                  로그인{/* Login */}
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </>
  );
};
export default Register;
