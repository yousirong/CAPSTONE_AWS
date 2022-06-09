import { faker } from '@faker-js/faker';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridActionsCellItem,
} from '@mui/x-data-grid';

import { DataGridPro } from '@mui/x-data-grid-pro';
import { useDemoData } from '@mui/x-data-grid-generator';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

// @mui
import { filter } from 'lodash';
import { Icon } from '@iconify/react';

// material
import {
  Box,
  FormGroup,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  useTheme,
  Card,
  styled,
  Table,
  Stack,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Iconify from './Dashboard/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from './Dashboard/@Dashboard/app';
import FileOpenIcon from '@mui/icons-material/FileOpen';
// components
import Scrollbar from './Dashboard/Scrollbar';
import SearchNotFound from './Dashboard/SearchNotFound';
import { UserListHead, DashUserListToolbar, UserMoreMenu } from './Dashboard/user';
// mock
import USERLIST from '../../Mock/user';
import MetaData from '../Layouts/MetaData';
import DetailStore from '../DetailStore/DetailStore';
import DialogSelect from '../Layouts/dashboard/DialogSelect';
import { useFormik, FormikProvider } from 'formik';

const TABLE_HEAD = [
  { id: 'store_name', label: '매장이름', alignRight: false },
  { id: 'telephone', label: '대표번호', alignRight: false },
  { id: 'sub_category', label: '업종', alignRight: false },
  { id: 'rating', label: '평점', alignRight: false },
  { id: 'review_count', label: '리뷰', alignRight: false },
  { id: 'isnew', label: '신규', alignRight: false },
  { id: 'address', label: '위치', alignRight: false },
];
// 직접 제작한 최근 매장 검색
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
  color: theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
  '& .div.MuiDataGrid-main css-204u17-MuiDataGrid-main.div': {
    color: 'rgba(255, 255, 255, 0)',
  },
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
  },
  '& .MuiDataGrid-cell': {
    color: theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',

    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
      borderRight: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
      borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'}`,
    },
    '& .MuiDataGrid-cell': {
      color: theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
    },
    '& .MuiPaginationItem-root': {
      borderRadius: 0,
    },
    '& .MuiCheckbox-root svg': {
      width: 16,
      height: 16,
      backgroundColor: 'transparent',
      border: `1px solid ${theme.palette.mode === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'}`,
      borderRadius: 2,
    },
    '& .MuiCheckbox-root svg path': {
      display: 'none',
    },
    '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
      backgroundColor: '#1890ff',
      borderColor: '#1890ff',
    },
    '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
      position: 'absolute',
      display: 'table',
      border: '2px solid #fff',
      borderTop: 0,
      borderLeft: 0,
      transform: 'rotate(45deg) translate(-50%,-50%)',
      opacity: 1,
      transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
      content: '""',
      top: '50%',
      left: '39%',
      width: 5.71428571,
      height: 9.14285714,
    },
    '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
      width: 8,
      height: 8,
      backgroundColor: '#1890ff',
      transform: 'none',
      top: '39%',
      border: 0,
    },
  },
}));
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: 750,
  width: '100%',

  '& .MuiFormGroup-options': {
    alignItems: 'center',
    paddingBottom: theme.spacing(1),
    '& > div': {
      minWidth: 100,
      margin: theme.spacing(2),
      marginLeft: 0,
    },
  },
}));
//최근 매장 검색 pagenation 하는 부분 -> apply 버튼
function SettingsPanel(props) {
  const { onApply, type, size, theme } = props;
  const [sizeState, setSize] = React.useState(size);
  const [typeState, setType] = React.useState(type);
  const [selectedPaginationValue, setSelectedPaginationValue] = React.useState(-1);
  const [activeTheme, setActiveTheme] = React.useState(theme);
  const handleSizeChange = React.useCallback((event) => {
    setSize(Number(event.target.value));
  }, []);

  const handleDatasetChange = React.useCallback((event) => {
    setType(event.target.value);
  }, []);

  const handlePaginationChange = React.useCallback((event) => {
    setSelectedPaginationValue(event.target.value);
  }, []);

  const handleThemeChange = React.useCallback((event) => {
    setActiveTheme(event.target.value);
  }, []);

  const handleApplyChanges = React.useCallback(() => {
    onApply({
      size: sizeState,
      type: typeState,
      pagesize: selectedPaginationValue,
      theme: activeTheme,
    });
  }, [sizeState, typeState, selectedPaginationValue, activeTheme, onApply]);

  return (
    <FormGroup className="MuiFormGroup-options" row>
      <FormControl variant="standard">
        <InputLabel>Dataset</InputLabel>
        <Select value={typeState} onChange={handleDatasetChange}>
          <MenuItem value="Employee">Employee</MenuItem>
          <MenuItem value="Market">Market</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel>Rows</InputLabel>
        <Select value={sizeState} onChange={handleSizeChange}>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={1000}>{Number(1000).toLocaleString()}</MenuItem>
          <MenuItem value={10000}>{Number(10000).toLocaleString()}</MenuItem>
          <MenuItem value={100000}>{Number(100000).toLocaleString()}</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel>Page Size</InputLabel>
        <Select value={selectedPaginationValue} onChange={handlePaginationChange}>
          <MenuItem value={-1}>off</MenuItem>
          <MenuItem value={0}>auto</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={1000}>{Number(1000).toLocaleString()}</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel>Theme</InputLabel>
        <Select value={activeTheme} onChange={handleThemeChange}>
          <MenuItem value="ant">Analysis Design</MenuItem>
          <MenuItem value="default">Paid Theme</MenuItem>
        </Select>
      </FormControl>
      <Button size="small" variant="outlined" color="primary" onClick={handleApplyChanges}>
        <KeyboardArrowRightIcon fontSize="small" /> Apply
      </Button>
    </FormGroup>
  );
}

SettingsPanel.propTypes = {
  onApply: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  theme: PropTypes.oneOf(['ant', 'default']).isRequired,
  type: PropTypes.oneOf(['Market', 'Employee']).isRequired,
};

// 메인 대시보드 부분
const Home = () => {
  const [info, setInfo] = useState([]);
  const [infoStats, setinfoStats] = useState([]);
  const [infoDetail, setinfoDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/dashboard`);
        setInfo(res.data.results);
        console.log(res.data.results);
        enqueueSnackbar('매장 추천 데이터 전송 성공', { variant: 'success' });
      } catch (err) {
        console.error(err);
        enqueueSnackbar(err.message ? null : '매장 추천 데이터 전송 실패', { variant: 'error' });
      }
      setLoading(false);
    };
    const breifData = async () => {
      setLoading(true);
      try {
        const res_stats = await axios.get(`/api/dashboard/brief`);
        setinfoStats(res_stats.data.results);
        console.log(res_stats.data);
        enqueueSnackbar('매장 통계 데이터 전송 성공', { variant: 'success' });
      } catch (err) {
        //console.error(err);
        enqueueSnackbar(err.message, { variant: 'error' });
      }
      setLoading(false);
    };
    fetchData();
    breifData();
    console.log('first loading');
  }, []);

  // 카테고리 검색 formik
  const formik = useFormik({
    onSubmit: async (values) => {
      try {
        const res = await axios(
          {
            url: `/api/dashboard/query`,
            headers: {
              'content-Type': 'application/json',
            },
            method: 'GET',
            data: JSON.stringify(values),
          },
          { withCredentials: true },
        );
        console.log(res);
        setInfo(res.data);
        enqueueSnackbar(res.data.message, { variant: 'success' });
      } catch (err) {
        console.error(err);
        // snackbar variant 값 default | error | success | warning | info
        enqueueSnackbar(err.message, { variant: 'error' });
      }
    },
  });
  // 수집기능
  const storeCompany = React.useCallback(
    (store_no) => () => {
      setTimeout(() => {
        setInfo((prevRows) => prevRows.filter((row) => row.store_no !== store_no));
        async function collectMarket() {
          setLoading(true);
          console.log(JSON.stringify({ store_no: store_no }));
          try {
            const res = await axios({
              url: `/api/dashboard/collect`,
              headers: {
                'content-Type': 'application/json',
              },
              method: 'POST',
              data: JSON.stringify({ store_no: store_no }),
            });
            enqueueSnackbar('매장 데이터 전송 성공', { variant: 'success' });
          } catch (err) {
            console.error(err);
            enqueueSnackbar(err.message, { variant: 'error' });
          }
          setLoading(false);
        }
        collectMarket();
      });
    },
    [],
  );
  //클릭시 상세페이지에 데이터 요청
  const detailCompany = React.useCallback(
    (store_no) => () => {
      setTimeout(() => {
        setinfoDetail((prevRows) => prevRows.filter((row) => row.store_no === store_no));
        async function detailData() {
          setLoading(true);
          console.log(infoDetail);
          try {
            const res = await axios({
              url: `/api/detail`,
              headers: {
                'content-Type': 'application/json',
              },
              method: 'POST',
              data: JSON.stringify({ store_no: store_no }),
            });
            console.log(res.data.results);
            setinfoDetail(res.data.results);
            enqueueSnackbar('매장 데이터 전송 성공', { variant: 'success' });
          } catch (err) {
            console.error(err);
            enqueueSnackbar(err.message, { variant: 'error' });
          }
          setLoading(false);
        }
        detailData();
      });
    },
    [],
  );
  // 칼럼 데이터
  const columns = React.useMemo(
    () => [
      {
        field: 'actions_Detail',
        headerName: '상세',
        type: 'actions',
        width: 0,
        getActions: (params) => [
          //   <GridActionsCellItem icon={<FileOpenIcon />} label="Detail" onClick={detailCompany(params.id)} />,
          <DetailStore icon={<FileOpenIcon />} label="Detail" detailData={params} onClick={detailCompany(params.id)} />,
        ],
      },
      {
        field: 'store_name',
        headerName: '매장이름',
        type: 'string',
        width: 300,
        alignRight: false,
        pinnable: false,
      },
      {
        field: 'telephone',
        headerName: '대표번호',
        type: 'string',
        width: 110,
        alignRight: false,
        pinnable: false,
      },
      {
        field: 'cat_3',
        headerName: '업종',
        type: 'string',
        width: 150,
        alignRight: false,
        pinnable: false,
      },
      {
        field: 'rating',
        headerName: '평점',
        type: 'string',
        width: 70,
        alignRight: false,
      },
      {
        field: 'review_count',
        headerName: '리뷰',
        type: 'number',
        width: 85,
        alignRight: false,
      },
      {
        field: 'isnew',
        headerName: '신규',
        type: 'boolean',
        width: 90,
        alignRight: false,
      },
      {
        field: 'rb_addr',
        headerName: '위치',
        type: 'string',
        width: 380,
        alignRight: false,
        pinnable: false,
      },
      {
        field: 'actions',
        headerName: '수집',
        type: 'actions',
        width: 5,
        getActions: (params) => [
          <GridActionsCellItem icon={<AddToPhotosIcon />} label="Store" onClick={storeCompany(params.id)} />,
        ],
      },
    ],
    [storeCompany, detailCompany],
  );

  const theme = useTheme();
  const [page, setPage] = useState(0);
  // 정렬
  const [order, setOrder] = useState('asc');
  // 최근 검색 매장에서 유저가 선택하기전 미리 선택해놓은 데이터는 없음(디폴트)
  const [selected, setSelected] = useState([]);
  // 최근 검색 매장에서 출력된 후 첫 번째는 매장 이름순으로 정렬
  const [orderBy, setOrderBy] = useState('store_name');
  // 최근 검색 매장에서 매장이름으로 검색 상태
  const [filterName, setFilterName] = useState('');
  // 최근 검색 매장 출력되는 행은 5개
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  // 모든 click시 선택되는 핸들러 처리
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.store_name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  // Click관련 핸들러 처리
  const handleClick = (event, store_name) => {
    const selectedIndex = selected.indexOf(store_name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, store_name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };
  // 유저가 페이지 변환시 상태 핸들러
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // 유저가 페이지를 행변환 할시 핸들러
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };
  // 유저가 최근 검색 매장에서 매장이름으로 검색시 filter target
  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };
  // 최근 검색 매장에서 매장이름이 비어있는 경우 핸들러
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;
  // 최근 검색 매장에서 매장이름으로 검색 시 Userlist -> filter -> order -> filtername
  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);
  // 매장이름으로 검색했는데 찾지 못했을 경우 반환 값
  const isUserNotFound = filteredUsers.length === 0;

  //-----------------------------------------------------------------------------------
  // 내가 그린 theme
  const [isAntDesign, setIsAntDesign] = React.useState(true);
  const [type, setType] = React.useState('Market');
  const [size, setSize] = React.useState(100);
  const { data, setRowLength, loadNewData } = useDemoData({
    dataSet: type,
    rowLength: size,
    maxColumns: 8,
    editable: true,
  });

  const [pagination, setPagination] = React.useState({
    // pagination: false,
    autoPageSize: false,
    pageSize: undefined,
  });
  const getActiveTheme = () => {
    return isAntDesign ? 'ant' : 'default';
  };
  const handleApplyClick = (settings) => {
    if (size !== settings.size) {
      setSize(settings.size);
    }

    if (type !== settings.type) {
      setType(settings.type);
    }
    if (getActiveTheme() !== settings.theme) {
      setIsAntDesign(!isAntDesign);
    }
    if (size !== settings.size || type !== settings.type) {
      setRowLength(settings.size);
      loadNewData();
    }

    const newPaginationSettings = {
      pagination: settings.pagesize !== -1,
      autoPageSize: settings.pagesize === 0,
      pageSize: settings.pagesize > 0 ? settings.pagesize : undefined,
    };

    setPagination((currentPaginationSettings) => {
      if (
        currentPaginationSettings.pagination === newPaginationSettings.pagination &&
        currentPaginationSettings.autoPageSize === newPaginationSettings.autoPageSize &&
        currentPaginationSettings.pageSize === newPaginationSettings.pageSize
      ) {
        return currentPaginationSettings;
      }
      return newPaginationSettings;
    });
  };
  //
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport
          csvOptions={{
            fileName: 'customerDataBase',
            utf8WithBom: true,
          }}
          printOptions={{
            hideFooter: true,
            hideToolbar: true,
          }}
        />
        <DialogSelect onChange={DialogSelect.handleApplyChanges} info={info} />
      </GridToolbarContainer>
    );
  }
  const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .ant-empty-img-1': {
      fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
      fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
      fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
      fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
      fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
      fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    },
  }));

  function CustomNoRowsOverlay() {
    return (
      <StyledGridOverlay>
        <svg width="120" height="100" viewBox="0 0 184 152" aria-hidden focusable="false">
          <g fill="none" fillRule="evenodd">
            <g transform="translate(24 31.67)">
              <ellipse className="ant-empty-img-5" cx="67.797" cy="106.89" rx="67.797" ry="12.668" />
              <path
                className="ant-empty-img-1"
                d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
              />
              <path
                className="ant-empty-img-2"
                d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
              />
              <path
                className="ant-empty-img-3"
                d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
              />
            </g>
            <path
              className="ant-empty-img-3"
              d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
            />
            <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
              <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
              <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
            </g>
          </g>
        </svg>
        <Box sx={{ mt: 1 }}>No Rows</Box>
      </StyledGridOverlay>
    );
  }
  const DataGridComponent = isAntDesign ? StyledDataGrid : DataGridPro;
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <MetaData title="Dashboard">
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 2 }}>
            안녕하세요, 환영합니다.
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              {/* [0,1,2,3] */}
              <AppWidgetSummary title="총 매장" total={infoStats[0] ? infoStats[0] : 4867911} icon="mdi:store" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="총 회원"
                total={infoStats[1] ? infoStats[1] : 456484}
                color="info"
                icon="mdi:store-search"
              />
              {/* total={infoStats.총 검색된 시장 수 data */}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="영업 진행 매장"
                total={infoStats[2] ? infoStats[2] : 897895}
                color="warning"
                icon="mdi:store-plus"
              />
              {/* total={infoStats.저장된 매장 수 data */}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="영업 완료 매장"
                total={infoStats[3] ? infoStats[3] : 315}
                color="error"
                icon="mdi:store-check"
              />
              {/* total={infoStats.신규 매장등록 수data */}
            </Grid>
            <Container maxWidth="xl">
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                <Typography variant="h4" sx={{ mb: 2 }} gutterBottom>
                  최근 매장 검색
                </Typography>
              </Stack>
              <FormikProvider value={formik}>
                <StyledBox>
                  <SettingsPanel onApply={handleApplyClick} size={size} type={type} theme={getActiveTheme()} />
                  <Card>
                    <DataGridComponent
                      //loading={loading}
                      onApply={handleApplyClick}
                      onChange={DialogSelect.handleApplyChanges}
                      columns={columns}
                      rows={info}
                      getRowId={(row) => row.store_no}
                      components={{
                        LoadingOverlay: LinearProgress,
                        Toolbar: CustomToolbar,
                        NoRowsOverlay: CustomNoRowsOverlay,
                      }}
                      componentsProps={{
                        toolbar: { showQuickFilter: true },
                      }}
                      checkboxSelection
                      disableSelectionOnClick
                      rowThreshold={0}
                      initialState={{
                        ...data.initialState,
                        pinnedColumns: { left: ['__check__', 'store_name'] },
                      }}
                      {...pagination}
                    />
                    <DashUserListToolbar
                      numSelected={selected.length}
                      filterName={filterName}
                      onFilter
                      Name={handleFilterByName}
                    />
                    <Scrollbar>
                      <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                          <UserListHead
                            lang="ko"
                            order={order}
                            orderBy={orderBy}
                            headLabel={TABLE_HEAD}
                            rowCount={USERLIST.length}
                            numSelected={selected.length}
                            onRequestSort={handleRequestSort}
                            onSelectAllClick={handleSelectAllClick}
                          />
                          <TableBody>
                            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                              const {
                                store_code,
                                store_name,
                                telephone,
                                sub_category,
                                rating,
                                review_count,
                                isnew,
                                address,
                              } = row;
                              const isItemSelected = selected.indexOf(store_name) !== -1;
                              return (
                                <TableRow
                                  hover
                                  key={store_code}
                                  tabIndex={-1}
                                  role="checkbox"
                                  selected={isItemSelected}
                                  aria-checked={isItemSelected}
                                >
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      checked={isItemSelected}
                                      onChange={(event) => handleClick(event, store_name)}
                                    />
                                  </TableCell>
                                  <TableCell component="th" scope="row" padding="none">
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                      {/* <Avatar alt={name} src={avatarUrl} />
                                  <Typography variant="subtitle2" noWrap>
                                    {name}
                                  </Typography> */}
                                    </Stack>
                                  </TableCell>
                                  <TableCell align="left">{store_name}</TableCell>
                                  <TableCell align="left">{telephone}</TableCell>
                                  <TableCell align="left">{sub_category}</TableCell>
                                  <TableCell align="left">{rating}</TableCell>
                                  <TableCell align="left">{review_count}</TableCell>
                                  <TableCell align="left">
                                    {isnew ? <Icon icon="bi:check" width="25" height="25" /> : ''}
                                  </TableCell>
                                  <TableCell align="left">{address}</TableCell>
                                  <TableCell align="left"></TableCell>
                                  <TableCell align="right">
                                    <UserMoreMenu />
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                            {emptyRows > 0 && (
                              <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                              </TableRow>
                            )}
                          </TableBody>
                          {isUserNotFound && (
                            <TableBody>
                              <TableRow>
                                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                  <SearchNotFound searchQuery={filterName} />
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          )}
                        </Table>
                      </TableContainer>
                    </Scrollbar>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={USERLIST.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Card>
                </StyledBox>
              </FormikProvider>
            </Container>
            <Grid item xs={12} md={6} lg={8}>
              <AppWebsiteVisits
                title="Website Visits"
                subheader="(+16%) than last year"
                chartLabels={[
                  '01/01/2022',
                  '02/01/2022',
                  '03/01/2022',
                  '04/01/2022',
                  '05/01/2022',
                  '06/01/2022',
                  '07/01/2022',
                  '08/01/2022',
                  '09/01/2022',
                  '10/01/2022',
                  '11/01/2022',
                ]}
                chartData={[
                  {
                    name: '영업자',
                    type: 'column',
                    fill: 'solid',
                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                  },
                  {
                    name: '소상공인',
                    type: 'area',
                    fill: 'gradient',
                    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                  },
                  {
                    name: '동접속자수',
                    type: 'line',
                    fill: 'solid',
                    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentVisits
                title="Current Visits"
                chartData={[
                  { label: '부산', value: 4344 },
                  { label: '서울', value: 5435 },
                  { label: '대전', value: 1443 },
                  { label: '경기', value: 4443 },
                ]}
                chartColors={[
                  theme.palette.primary.main,
                  theme.palette.chart.blue[0],
                  theme.palette.chart.violet[0],
                  theme.palette.chart.yellow[0],
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <AppConversionRates
                title="영업진행인기순"
                subheader="(+43%) than last year"
                chartData={[
                  { label: '떡,한과', value: 400 },
                  { label: '한스', value: 430 },
                  { label: '돈까스,우동', value: 448 },
                  { label: '제과,베이커리', value: 470 },
                  { label: '멕시칸,브라질', value: 540 },
                  { label: '스터디카페,스터디룸', value: 580 },
                  { label: '중화요리', value: 690 },
                  { label: '도미노피자', value: 1100 },
                  { label: '고기집', value: 1200 },
                  { label: '카페', value: 1380 },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentSubject
                title="Current Subject"
                chartLabels={['한식', '중식', '일식', '양식', '주류', '별미']}
                chartData={[
                  { name: '영업자', data: [80, 50, 30, 40, 100, 20] },
                  { name: '소상공인', data: [20, 30, 40, 80, 20, 80] },
                  { name: '모든접속자', data: [44, 76, 78, 13, 43, 10] },
                ]}
                chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <AppNewsUpdate
                title="News Update"
                list={[...Array(5)].map((_, index) => ({
                  store_code: faker.datatype.uuid(),
                  title: faker.name.jobTitle(),
                  description: faker.name.jobTitle(),
                  image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                  postedAt: faker.date.recent(),
                }))}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <AppOrderTimeline
                title="프로그램 Timeline"
                list={[...Array(5)].map((_, index) => ({
                  store_code: faker.datatype.uuid(),
                  title: [
                    'Crawling',
                    'Labeling',
                    'Storing data in the Backend System',
                    'Get data through HTTP communication using API',
                    'Show data in Front System',
                  ][index],
                  type: `order${index + 1}`,
                  time: faker.date.recent(),
                }))}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <AppTrafficBySite
                title="Traffic by Site"
                list={[
                  {
                    name: 'FaceBook',
                    value: 323234,
                    icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />,
                  },
                  {
                    name: 'Google',
                    value: 341212,
                    icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />,
                  },
                  {
                    name: 'Linkedin',
                    value: 411213,
                    icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />,
                  },
                  {
                    name: 'Twitter',
                    value: 443232,
                    icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />,
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <AppTasks
                title="Tasks"
                list={[
                  { id: '1', label: 'Dashboard에서 매장 찾기' },
                  { id: '2', label: 'Dashboard에서 매장 수집하기' },
                  { id: '3', label: 'Myshop에서 수집된 매장 확인하기' },
                  { id: '4', label: '영업 매장 진행상황 확인 및 저장하기' },
                  { id: '5', label: '상세페이지에서 영업할 매장 확인하기' },
                ]}
              />
            </Grid>
          </Grid>

          <Typography> Created By Juneyong Lee | &#169; 2022 All Rights Reserved</Typography>
        </Container>
      </MetaData>
    </>
  );
};

export default Home;
