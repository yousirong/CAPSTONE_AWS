import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import axios from 'axios';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Typography } from '@mui/material';

// dashboard 화면 크기 및 route에 보낼 출력 함수
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 82;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(3),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------
const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const [ping, setPing] = useState(false);

  const getPing = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/ping`);
      setPing(data);
    } catch (err) {
      console.error(err);
    }
  }, []);
  useEffect(() => {
    getPing();
    return () => {
      setPing(false);
    };
  }, []);

  return (
    <>
      {ping && (
        <RootStyle>
          <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
          <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
          <MainStyle>
            <Outlet />
          </MainStyle>
        </RootStyle>
      )}
      {!ping && <Typography>서버 연결 불가</Typography>}
    </>
  );
};
export default DashboardLayout;
