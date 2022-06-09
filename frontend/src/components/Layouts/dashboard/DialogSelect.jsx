import * as React from 'react';
import { useState, useCallback, useEffect, useRef } from 'react';
// material
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  MenuItem,
  FormGroup,
  Select,
  ListSubheader,
} from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import Home from '../../Home/Home';
import $ from 'jquery';
window.$ = $;
var area = {
  수도권: {
    서울특별시: [
      '강남구',
      '강동구',
      '강북구',
      '강서구',
      '관악구',
      '광진구',
      '구로구',
      '금천구',
      '노원구',
      '도봉구',
      '동대문구',
      '동작구',
      '마포구',
      '서대문구',
      '서초구',
      '성동구',
      '성북구',
      '송파구',
      '양천구',
      '영등포구',
      '용산구',
      '은평구',
      '종로구',
      '중구',
      '중랑구',
    ],
    경기도: [
      '수원시 장안구',
      '수원시 권선구',
      '수원시 팔달구',
      '수원시 영통구',
      '성남시 수정구',
      '성남시 중원구',
      '성남시 분당구',
      '의정부시',
      '안양시 만안구',
      '안양시 동안구',
      '부천시',
      '광명시',
      '평택시',
      '동두천시',
      '안산시 상록구',
      '안산시 단원구',
      '고양시 덕양구',
      '고양시 일산동구',
      '고양시 일산서구',
      '과천시',
      '구리시',
      '남양주시',
      '오산시',
      '시흥시',
      '군포시',
      '의왕시',
      '하남시',
      '용인시 처인구',
      '용인시 기흥구',
      '용인시 수지구',
      '파주시',
      '이천시',
      '안성시',
      '김포시',
      '화성시',
      '광주시',
      '양주시',
      '포천시',
      '여주시',
      '연천군',
      '가평군',
      '양평군',
    ],
    인천광역시: ['계양구', '미추홀구', '남동구', '동구', '부평구', '서구', '연수구', '중구', '강화군', '옹진군'],
  },
  강원권: {
    강원도: [
      '춘천시',
      '원주시',
      '강릉시',
      '동해시',
      '태백시',
      '속초시',
      '삼척시',
      '홍천군',
      '횡성군',
      '영월군',
      '평창군',
      '정선군',
      '철원군',
      '화천군',
      '양구군',
      '인제군',
      '고성군',
      '양양군',
    ],
  },
  충청권: {
    충청북도: [
      '청주시 상당구',
      '청주시 서원구',
      '청주시 흥덕구',
      '청주시 청원구',
      '충주시',
      '제천시',
      '보은군',
      '옥천군',
      '영동군',
      '증평군',
      '진천군',
      '괴산군',
      '음성군',
      '단양군',
    ],
    충청남도: [
      '천안시 동남구',
      '천안시 서북구',
      '공주시',
      '보령시',
      '아산시',
      '서산시',
      '논산시',
      '계룡시',
      '당진시',
      '금산군',
      '부여군',
      '서천군',
      '청양군',
      '홍성군',
      '예산군',
      '태안군',
    ],
    대전광역시: ['대덕구', '동구', '서구', '유성구', '중구'],
    세종특별자치시: ['세종특별자치시'],
  },
  전라권: {
    전라북도: [
      '전주시 완산구',
      '전주시 덕진구',
      '군산시',
      '익산시',
      '정읍시',
      '남원시',
      '김제시',
      '완주군',
      '진안군',
      '무주군',
      '장수군',
      '임실군',
      '순창군',
      '고창군',
      '부안군',
    ],
    전라남도: [
      '목포시',
      '여수시',
      '순천시',
      '나주시',
      '광양시',
      '담양군',
      '곡성군',
      '구례군',
      '고흥군',
      '보성군',
      '화순군',
      '장흥군',
      '강진군',
      '해남군',
      '영암군',
      '무안군',
      '함평군',
      '영광군',
      '장성군',
      '완도군',
      '진도군',
      '신안군',
    ],
    광주광역시: ['광산구', '남구', '동구', '북구', '서구'],
  },
  경상권: {
    경상북도: [
      '포항시 남구',
      '포항시 북구',
      '경주시',
      '김천시',
      '안동시',
      '구미시',
      '영주시',
      '영천시',
      '상주시',
      '문경시',
      '경산시',
      '군위군',
      '의성군',
      '청송군',
      '영양군',
      '영덕군',
      '청도군',
      '고령군',
      '성주군',
      '칠곡군',
      '예천군',
      '봉화군',
      '울진군',
      '울릉군',
    ],
    경상남도: [
      '창원시 의창구',
      '창원시 성산구',
      '창원시 마산합포구',
      '창원시 마산회원구',
      '창원시 진해구',
      '진주시',
      '통영시',
      '사천시',
      '김해시',
      '밀양시',
      '거제시',
      '양산시',
      '의령군',
      '함안군',
      '창녕군',
      '고성군',
      '남해군',
      '하동군',
      '산청군',
      '함양군',
      '거창군',
      '합천군',
    ],
    부산광역시: [
      '강서구',
      '금정구',
      '남구',
      '동구',
      '동래구',
      '부산진구',
      '북구',
      '사상구',
      '사하구',
      '서구',
      '수영구',
      '연제구',
      '영도구',
      '중구',
      '해운대구',
      '기장군',
    ],
    대구광역시: ['남구', '달서구', '동구', '북구', '서구', '수성구', '중구', '달성군'],
    울산광역시: ['남구', '동구', '북구', '중구', '울주군'],
  },
  제주권: {
    제주특별자치도: ['서귀포시', '제주시'],
  },
};

export default function DialogSelect(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(Home.info);
  const { onApply, cat1, cat2, addr1, addr2, addr3 } = props;
  const [cat1State, setCat1] = useState(cat1);
  const [cat2State, setCat2] = useState(cat2);
  const [addr1State, setAddr1] = useState(addr1);
  const [addr2State, setAddr2] = useState(addr2);
  const [addr3State, setAddr3] = useState(addr3);
  const [info_category, setCategory] = useState([]); // 1차 카테고리
  const [info_sector, setSector] = useState([]); //2차 카테고리
  const [info_addr1, setaddrInfo1] = useState([]); //시도
  const [info_addr2, setaddrInfo2] = useState([]); //시군구
  const [info_addr3, setaddrInfo3] = useState([]); //읍면도
  const [open, setOpen] = React.useState(false);
  // 라벨링 된 지역과 업종이 같이 와야됨. 현재 글자만 옴
  const fetchData = async () => {
    setLoading(true);
    try {
      const res1 = await axios.post(`/api/dashboard/cat_1`);
      setCategory(res1.data.results);
      console.log(res1.data.results);
      enqueueSnackbar('카테고리 전송 성공', { variant: 'success' });
      const res3 = await axios.post(`/api/dashboard/addr_1`);
      setaddrInfo1(res3.data.results);
      console.log(res3.data.results);
      enqueueSnackbar('시/도 전송 성공', { variant: 'success' });
    } catch (err) {
      console.error(err);
      enqueueSnackbar(err.message, { variant: 'error' });
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
    console.log(info_category);
  }, []);

  const handleChange = React.useCallback((event) => {
    console.log(event.target.value);
    setAddr1(event.target.value);
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };
  const cat1Click = React.useCallback((event) => {
    async function catSector() {
      setLoading(true);
      try {
        const res = await axios({
          url: `/api/dashboard/cat_2`,
          headers: {
            'content-Type': 'application/json',
          },
          method: 'POST',
          data: JSON.stringify({ cat_1: event.target.value }),
        });
        console.log(res.data.results);
        setSector(res.data.results);
        enqueueSnackbar('업종 전송 성공', { variant: 'success' });
      } catch (err) {
        console.error(err);
        enqueueSnackbar(err.message, { variant: 'error' });
      }
      setLoading(false);
    }
    setCat1(event.target.value);
    catSector();
  }, []);
  const cat2Click = React.useCallback((event) => {
    setCat2(event.target.value);
  }, []);
  const addr1Click = React.useCallback((event) => {
    setTimeout(() => {
      async function addrSector() {
        setLoading(true);

        try {
          const res = await axios({
            url: `/api/dashboard/addr_2`,
            headers: {
              'content-Type': 'application/json',
            },
            method: 'POST',
            data: JSON.stringify({ addr_1: event.target.value }),
          });
          console.log(res.data.results);
          setaddrInfo2(res.data.results);
          enqueueSnackbar('시군구 전송 성공', { variant: 'success' });
        } catch (err) {
          console.error(err);
          enqueueSnackbar(err.message, { variant: 'error' });
        }
        setLoading(false);
      }
      setAddr1(event.target.value);
      addrSector();
    });
  }, []);
  const addr2Click = React.useCallback((event) => {
    setTimeout(() => {
      async function addrSector() {
        setLoading(true);
        try {
          const res = await axios({
            url: `/api/dashboard/addr_3`,
            headers: {
              'content-Type': 'application/json',
            },
            method: 'POST',
            data: JSON.stringify({ addr_2: event.target.value }),
          });

          console.log(res.data.results);
          setaddrInfo3(res.data.results);
          enqueueSnackbar('시군구 전송 성공', { variant: 'success' });
        } catch (err) {
          console.error(err);
          enqueueSnackbar(err.message, { variant: 'error' });
        }
        setLoading(false);
      }
      setAddr2(event.target.value);
      addrSector();
    });
  }, []);
  const addr3Click = React.useCallback((event) => {
    setAddr3(event.target.value);
  }, []);
  const handleApplyChanges = React.useCallback(() => {
    // onApply({
    //   cat1: cat1State,
    //   cat2: cat2State,
    //   addr1: addr1State,
    //   addr2: addr2State,
    //   addr3: addr3State,
    // });
    async function query() {
      try {
        const res = await axios({
          url: `/api/dashboard/query`,
          headers: {
            'content-Type': 'application/json',
          },
          method: 'POST',
          data: JSON.stringify({
            cat_1: cat1State,
            cat_2: cat2State,
            addr_1: addr1State,
            addr_2: addr2State,
            addr_3: addr3State,
          }),
        });
        console.log(
          JSON.stringify({
            cat_1: cat1State,
            cat_2: cat2State,
            addr_1: addr1State,
            addr_2: addr2State,
            addr_3: addr3State,
          }),
        );
        console.log(res.data);
        setInfo(res.data.results);
        console.log(info);
        enqueueSnackbar(res.data.message, { variant: 'success' });
      } catch (err) {
        console.error(err);
        // snackbar variant 값 default | error | success | warning | info
        enqueueSnackbar(err.message, { variant: 'error' });
      }
    }
    query();
    // return <Home info={info}></Home>;
  }, [cat1State, cat2State, addr1State, addr2State, addr3State, onApply]);

  DialogSelect.propTypes = {
    onApply: PropTypes.func.isRequired,
    cat1: PropTypes.string,
    cat2: PropTypes.string,
    addr1: PropTypes.string,
    addr2: PropTypes.string,
    addr3: PropTypes.string,
  };
  return (
    <div>
      <Button onClick={handleClickOpen}>Open select 업종/지역</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>업종/지역을 선택하세요</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {/* 카테고리 업종 선택 ------------------------------------------------------- */}
            {/* <FormGroup className="MuiFormGroup-options" row> */}
            <FormControl sx={{ m: 1, minWidth: 260 }}>
              <InputLabel htmlFor="grouped-native-select">카테고리</InputLabel>
              <Select
                defaultValue={''}
                onChange={cat1Click}
                value={cat1State !== null ? cat1State : ''}
                id="grouped-native-select"
                label="Grouping"
                input={<OutlinedInput label="info_category" />}
              >
                <ListSubheader>Category 1</ListSubheader>
                {info_category.map((row) => (
                  <MenuItem value={row.cat_1 || ''}>{row.cat_1.toLocaleString()}</MenuItem>
                ))}
                <MenuItem aria-label="None" value="">
                  None
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 260 }}>
              <InputLabel htmlFor="grouped-native-select">업종</InputLabel>
              <Select
                defaultValue={''}
                onChange={cat2Click}
                value={cat2State !== null ? cat2State : ''}
                id="grouped-native-select"
                label="Grouping"
                input={<OutlinedInput label="info_sector" />}
              >
                <ListSubheader>Category 2</ListSubheader>
                <MenuItem aria-label="None" value="">
                  None
                </MenuItem>
                {info_sector.map((row) => (
                  <MenuItem value={row.cat_2 || ''}>{row.cat_2.toLocaleString()}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* 지역구 선택 ------------------------------------------------------- */}
            <FormControl sx={{ m: 1, minWidth: 168 }}>
              <InputLabel htmlFor="grouped-native-select">시/도</InputLabel>
              <Select
                defaultValue={''}
                onChange={addr1Click}
                value={addr1State !== null ? addr1State : ''}
                id="grouped-native-select"
                label="Grouping"
                input={<OutlinedInput label="info_addr1" />}
              >
                <ListSubheader>Address 1</ListSubheader>
                <MenuItem aria-label="None" value="">
                  None
                </MenuItem>
                {info_addr1.map((row) => (
                  <MenuItem value={row.addr_1 || ''}>{row.addr_1.toLocaleString()}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 168 }}>
              <InputLabel id="grouped-native-select">시군구</InputLabel>
              <Select
                defaultValue={''}
                onChange={addr2Click}
                value={addr2State !== null ? addr2State : ''}
                id="grouped-native-select"
                label="Grouping"
                input={<OutlinedInput label="info_addr2" />}
              >
                <ListSubheader>Address 2</ListSubheader>
                <MenuItem aria-label="None" value="">
                  None
                </MenuItem>
                {info_addr2.map((row) => (
                  <MenuItem value={row.addr_2 || ''}>{row.addr_2.toLocaleString()}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 168 }}>
              <InputLabel id="demo-dialog-select-label">읍면동</InputLabel>
              <Select
                defaultValue={''}
                onChange={addr3Click}
                value={addr3State !== null ? addr3State : ''}
                id="grouped-native-select"
                label="Grouping"
                input={<OutlinedInput label="info_addr3" />}
              >
                <ListSubheader>Address 3</ListSubheader>
                <MenuItem aria-label="None" value="">
                  None
                </MenuItem>
                {info_addr3.map((row) => (
                  <MenuItem value={row.addr_3 || ''}>{row.addr_3.toLocaleString()}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button type="button" className="outline">
            Reset
          </Button>
          {/* <SettingsPanel onApply={handleApplyClick} size={size} type={type} theme={getActiveTheme()} /> */}

          <Button onClick={handleApplyChanges}>매장검색</Button>
          <Button onClick={handleClose}>닫기</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
