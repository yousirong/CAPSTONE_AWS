import * as React from 'react';
import { filter } from 'lodash';

import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { useDemoData } from '@mui/x-data-grid-generator';
import { DataGridPro } from '@mui/x-data-grid-pro';

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import PropTypes, { string } from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';

// components
import Iconify from '../Home/Dashboard/Iconify';
import SearchNotFound from '../Home/Dashboard/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../Home/Dashboard/user';
// mock
import USERLIST from '../../Mock/user';
import MetaData from '../Layouts/MetaData';
import { useEffect } from 'react';
import axios from 'axios';

import { useSnackbar } from 'notistack';
import DetailStore from '../DetailStore/DetailStore';
// user_myshop page 출력함수
// my shop 페이지에서 +new shop 버튼은 일단 만들어놓음 -> 추후에 개발 시간 남으면 개발 ㄱ
// ----------------------------------------------------------------------
// 순서대로 myshop 열 데이터
// 매장이름-> 대표자이름 -> 대표번호 -> 업종 -> 평점 -> 리뷰  ->신규 -> 진행상황

const TABLE_HEAD = [
  { id: 'store_name', label: '매장이름', alignRight: false },
  { id: 'telephone', label: '대표번호', alignRight: false },
  { id: 'sub_category', label: '업종', alignRight: false },
  { id: 'rating', label: '평점', alignRight: false },
  { id: 'review_count', label: '리뷰', alignRight: false },
  { id: 'isnew', label: '신규', alignRight: false },
  { id: 'address', label: '위치', alignRight: false },
];
// ----------------------------------------------------------------------
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

//---------------------------------------------------------------------------------
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
          <MenuItem value="default">Default Theme</MenuItem>
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
  type: PropTypes.oneOf(['Commodity', 'Employee']).isRequired,
};

const User = () => {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/myshop`);
        setInfo(res.data.results);
        console.log(res.data.results);
        enqueueSnackbar('수집된 매장 데이터 전송 선공', { variant: 'success' });
      } catch (err) {
        console.error(err);
        enqueueSnackbar(err.message == null ? '수집된 매장 데이터 전송 실패' : err.message, { variant: 'error' });
      }
      setLoading(false);
    };

    fetchData();
    // setLoading(false);
  }, []);

  // 원하는 매장 한 개 삭제
  const deleteCompany = React.useCallback(
    (store_no) => () => {
      setTimeout(() => {
        setInfo((prevRows) => prevRows.filter((row) => row.store_no !== store_no));
        async function deleteMarket() {
          setLoading(true);
          console.log(JSON.stringify({ store_no: store_no }));
          try {
            const res = await axios({
              url: `/api/myshop/delete`,
              headers: {
                'content-Type': 'application/json',
              },
              method: 'POST',
              data: JSON.stringify({ store_no: store_no }),
            });
            enqueueSnackbar('수집한 매장 삭제 성공', { variant: 'success' });
          } catch (err) {
            console.error(err);
            enqueueSnackbar(err.message, { variant: 'error' });
          }
          setLoading(false);
        }
        deleteMarket();
      });
    },
    [],
  );
  // 모든 매장 삭제
  const deleteallCompany = React.useCallback(
    (store_no) => () => {
      setTimeout(() => {
        setInfo((prevRows) => prevRows.filter((row) => row.store_no === store_no && row.store_no !== store_no));
        async function deleteMarket() {
          setLoading(true);
          console.log(JSON.stringify({ store_no: store_no }));
          try {
            const res = await axios({
              url: `/api/myshop/delete/all`,
              headers: {
                'content-Type': 'application/json',
              },
              method: 'POST',
              //   data: JSON.stringify({ store_no: store_no }),
            });
            enqueueSnackbar('수집한 매장 모두 삭제 성공', { variant: 'success' });
          } catch (err) {
            console.error(err);
            enqueueSnackbar(err.message, { variant: 'error' });
          }
          setLoading(false);
        }
        deleteMarket();
      });
    },
    [],
  );
  // 모든 진행상황 변경
  const editallStatus = React.useCallback(
    (id) => () => {
      setInfo((prevRows) => prevRows.map((row) => (row.id ? { ...row, status: '미정' } : row)));
    },
    [],
  );
  const editStatus = React.useCallback((id) => () => {
    setTimeout(() => {
      async function deleteMarket() {
        setLoading(true);
        console.log(JSON.stringify({ status: id.target.value }));
        try {
          const res = await axios({
            url: `/api/myshop/prog`,
            headers: {
              'content-Type': 'application/json',
            },
            method: 'POST',
            data: JSON.stringify({ status: id.target.value }),
          });
          enqueueSnackbar('수집한 매장 모두 삭제 성공', { variant: 'success' });
        } catch (err) {
          console.error(err);
          enqueueSnackbar(err.message, { variant: 'error' });
        }
        setLoading(false);
      }
      deleteMarket();
    });
  });
  const columns = React.useMemo(
    () => [
      {
        field: 'actions_Detail',
        headerName: '상세',
        type: 'actions',
        width: 0,
        getActions: (params) => [<DetailStore onClick={params} />],
      },
      {
        field: 'store_name',
        headerName: '매장이름',
        type: 'string',
        width: 270,
        alignRight: false,
      },
      {
        field: 'telephone',
        headerName: '대표번호',
        type: 'string',
        width: 110,
        alignRight: false,
      },
      {
        field: 'cat_3',
        headerName: '업종',
        type: 'string',
        width: 150,
        alignRight: false,
      },
      {
        field: 'rating',
        headerName: '평점',
        type: 'number',
        width: 65,
        alignRight: false,
      },
      {
        field: 'review_count',
        headerName: '리뷰',
        type: 'number',
        width: 75,
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
        field: 'status',
        headerName: '진행상황',
        type: 'singleSelect',
        value: string,
        label: string,
        editable: true,
        onchange: { editStatus },
        valueOptions: ({ row }) => {
          if (row === undefined) {
            return ['미정', '진행중', '완료', '실패'];
          }
          const options = [];
          if (!['미정', '진행중', '완료', '실패'].includes(row.status)) {
            options.push('미정', '진행중', '완료', '실패');
          } else {
            options.push('미정', '진행중', '완료', '실패');
          }
          return options;
        },
        width: 85,
        alignRight: false,
      },
      {
        field: 'rb_addr',
        headerName: '위치',
        type: 'string',
        width: 350,
        alignRight: false,
      },
      {
        field: 'actions',
        headerName: '관리',
        type: 'actions',
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={deleteCompany(params.id)} />,
          <GridActionsCellItem
            icon={<SecurityIcon />}
            label="Edit all '미정'data"
            onClick={editallStatus(params.id)}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<SecurityIcon />}
            label="Delete all data"
            onClick={deleteallCompany(params.id)}
            showInMenu
          />,
        ],
      },
    ],
    [deleteCompany],
  );
  const theme = useTheme();
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('store_name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.store_name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  const [isAntDesign, setIsAntDesign] = React.useState(true);

  const [type, setType] = React.useState('Market');
  const [size, setSize] = React.useState(100);
  const { data, setRowLength, loadNewData } = useDemoData({
    dataSet: type,
    rowLength: size,
    maxColumns: 8,
    editable: true,
  });
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

  function Managepanel(props) {
    const { manage, manageapply } = props;
    const [manageData, setManageData] = React.useState(manage);
    const handleManageChange = React.useCallback((event) => {
      setManageData(event.target.value);
    }, []);
    // 모든 매장 삭제
    const deleteallCompany = React.useCallback(
      (id) => () => {
        setTimeout(() => {
          setInfo((prevRows) => prevRows.filter((row) => row.id));
        });
      },
      [],
    );
    // 모든 진행상황 변경
    const editallStatus = React.useCallback(
      (id) => () => {
        setInfo((prevRows) => prevRows.map((row) => (row.id ? { ...row, status: '미정' } : row)));
      },
      [],
    );

    const handleManageApplyChanges = React.useCallback(() => {
      manageapply({
        manage: manageData,
      });
    }, [manageData, manageapply]);
    return (
      <FormGroup className="MuiFormGroup-options" row>
        <FormControl variant="standard">
          <InputLabel>관리</InputLabel>
          <Select value={manageData} onChange={handleManageChange}>
            <MenuItem value="모든 데이터 삭제" onChange={deleteallCompany}>
              모든 데이터 삭제
            </MenuItem>
            <MenuItem value="모든 데이터 상태 변경" onChange={editallStatus}>
              모든 데이터 상태 변경
            </MenuItem>
          </Select>
        </FormControl>
        <Button size="small" variant="outlined" color="primary" onClick={handleManageApplyChanges}>
          <KeyboardArrowRightIcon fontSize="small" /> Apply
        </Button>
      </FormGroup>
    );
  }
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport
          csvOptions={{
            fileName: 'customerDataBase',
            delimiter: ';',
            utf8WithBom: true,
          }}
          printOptions={{
            hideFooter: true,
            hideToolbar: true,
          }}
        />
        {/* <Managepanel /> */}
      </GridToolbarContainer>
    );
  }
  //   CustomToolbar.propTypes = {
  //     manage: PropTypes.oneOf(['모든 데이터 삭제', '모든 데이터 상태 변경']).isRequired,
  //     manageapply: PropTypes.func.isRequired,
  //   };
  const DataGridComponent = isAntDesign ? StyledDataGrid : DataGridPro;

  return (
    <>
      <MetaData title="My Shop">
        <Container maxWidth="xl">
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={7}>
            <Typography lang="ko" variant="h4" gutterBottom>
              영업 관리 매장{/* My Shop */}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                lang="ko"
                variant="contained"
                component={RouterLink}
                to="#"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                새로운 매장{/* New Shop */}
              </Button>
              {/* <Button variant="contained">삭제</Button> */}
              <Button lang="ko" variant="contained">
                진행상황 저장
              </Button>
            </Stack>
          </Stack>

          <StyledBox>
            <SettingsPanel onApply={handleApplyClick} size={size} type={type} theme={getActiveTheme()} />

            <Card>
              <DataGridComponent
                loading={loading}
                onApply={handleApplyClick}
                columns={columns}
                getRowId={(row) => row.store_no}
                rows={info}
                components={{
                  LoadingOverlay: LinearProgress,
                  Toolbar: CustomToolbar,
                  NoRowsOverlay: CustomNoRowsOverlay,
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
              <UserListToolbar
                numSelected={selected.length}
                filterName={columns.store_name}
                onFilterName={handleFilterByName}
              />
              {/* <Scrollbar> */}
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
                      const { store_code, store_name, telephone, sub_category, rating, review_count, isnew, address } =
                        row;
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
                            <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, store_name)} />
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
                        <TableCell colSpan={10} />
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
              {/* </Scrollbar> */}
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
        </Container>
      </MetaData>
    </>
  );
};
export default User;
