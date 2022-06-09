// dashboard에서 오른쪽 상단 유저 account 부분 더미데이터
// ----------------------------------------------------------------------
import axios from 'axios';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';

import { useState, useCallback, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack';

const Account = {
  //왼쪽 상단에 sidebar 맨위에 등급 회원
  displayName: '일반회원',
  email: 'demo@gmail.com',
  photoURL: '/static/mock-images/avatars/avatar5.png',
};

export default Account;
