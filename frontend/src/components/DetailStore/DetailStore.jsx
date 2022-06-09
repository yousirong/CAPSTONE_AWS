import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { GridActionsCellItem } from '@mui/x-data-grid';
import React, { useState, useEffect, useCallback } from 'react';
import { faker } from '@faker-js/faker';
import { Grid, Card, Container, Typography, Stack } from '@mui/material';
import DetailOrderline from './Detailsection/DetailOrderline';
import DetailMenu from './Detailsection/DetailMenu';
import axios from 'axios';
import PropTypes from 'prop-types';

import { useSnackbar } from 'notistack';
const StyledBox = styled(Card)(({ theme }) => ({
  position: 'absolute',
  top: '45%',
  left: '50%',
  flexDirection: 'colunm',
  justifyContent: 'center',
  transform: 'translate(-50%, -50%)',
  width: '75%',

  bgcolor: 'background.paper',
  border: '2px solid #000',

  boxShadow: 24,
  p: 4,
}));
DetailStore.propTypes = {
  info: PropTypes.object,
};
export default function DetailStore({ detailData }) {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false); // 모달창
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [infoDetail, setinfoDetail] = useState([]);
  let result = [];
  const detailCompany = React.useCallback(
    (store_no) => () => {
      setTimeout(() => {
        handleOpen();
        //setinfoDetail((prevRows) => prevRows.filter((row) => row.store_no === store_no));
        console.log(JSON.stringify({ store_no: store_no }));
        async function detailData() {
          setLoading(true);
          try {
            const res = await axios({
              url: `/api/detail`,
              headers: {
                'content-Type': 'application/json',
              },
              method: 'POST',
              data: JSON.stringify({ store_no: store_no }),
            });
            console.log(res.data.results[0]);
            setinfoDetail(res.data.results[0]);
            result = res.data.results[0];
            console.log(result.map((row) => row.store_name));
            enqueueSnackbar('매장 데이터 전송 성공', { variant: 'success' });
          } catch (err) {
            console.error(err);
            enqueueSnackbar(err.message, { variant: 'error' });
          }
          setLoading(false);
        }
        detailData();
        setinfoDetail(result);
        console.log(infoDetail);
      });
    },
    [],
  );

  //   useEffect(() => {
  //     console.log(result.store_name);
  //   }, []);
  return (
    <div>
      <GridActionsCellItem
        icon={<FileOpenIcon />}
        label="Detail"
        onClick={detailCompany(detailData.id)}
        // onClick={(handleOpen, detailCompany(detailData.id))}
      />
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        closebutton="true"
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Container>
          {infoDetail.map((row) => (
            <StyledBox>
              <Box sx={{ my: 3 }}>
                <Stack direction="row" alignItems="center">
                  <Typography lang="ko" variant="h4" gutterBottom>
                    매장이름 :
                  </Typography>
                  <Typography lang="ko" variant="h4" gutterBottom>
                    &nbsp;{row.store_name} &nbsp;
                  </Typography>

                  <Button variant="outlined" color="primary" onClick={handleClose}>
                    닫기
                  </Button>
                </Stack>

                {/* {infoDetail.map((row) => ( */}
                <Stack direction="row" alignItems="center">
                  <Typography variant="h6" id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                    업종 :
                  </Typography>
                  <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                    &nbsp;
                    {row.cat_3} &nbsp;
                  </Typography>
                  <Typography variant="h6" id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                    별점 :
                  </Typography>
                  <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                    &nbsp;
                    {row.rating} &nbsp;
                  </Typography>
                  <Typography variant="h6" id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                    리뷰 :
                  </Typography>
                  <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                    &nbsp;
                    {row.review_count} &nbsp;
                  </Typography>
                </Stack>
                {/* ))} */}
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={5}>
                  <DetailMenu
                    title="매장 사진"
                    list={infoDetail.map((row, index) => ({
                      store_code: row.store_no,
                      title: row.store_name,
                      description: row.description,
                      image0: row.img_url1,
                      image1: row.img_url2,
                      image2: row.img_url3,
                      postedAt: faker.date.recent(),
                    }))}
                  />
                  {/* <DetailMenu
                    title="매장 사진"
                    list={[...Array(3)].map((_, index) => ({
                    //   store_code: faker.datatype.uuid(),
                    //   title: faker.name.jobTitle(),
                    //   description: faker.name.jobTitle(),
                    //   image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                    //   postedAt: faker.date.recent(),
                    }))}
                  /> */}
                </Grid>
                {/* <Grid item xs={12} md={6} lg={5}>
                  <DetailOrderline
                    title="매장 상세정보"
                    list={infoDetail.map((row, index) => ({
                      store_code: row.store_no,
                      title: [row.rb_addr, row.addr_3, row.business_hour, row.telephone, row.homepage][index],
                      type: `order${index + 1}`,
                      subdetail: ['도로명 주소', '지번', '영업시간', '매장 전화번호', '매장 URL'][index],
                    }))}
                  /> */}
                {/* </Grid> */}
                <DetailOrderline
                  title="매장 상세정보"
                  list={[...Array(5)].map((_, index) => ({
                    store_code: faker.datatype.uuid(),
                    title: [
                      <Typography>{row.rb_addr}</Typography>,
                      <Typography>{row.addr_3}</Typography>,
                      <Typography>{row.business_hour}</Typography>,
                      <Typography>{row.telephone}</Typography>,
                      <Typography>{row.homepage}</Typography>,
                    ][index],
                    type: `order${index + 1}`,
                    subdetail: ['도로명 주소', '지번', '영업시간', '매장 전화번호', '매장 URL'][index],
                  }))}
                />
              </Grid>
            </StyledBox>
          ))}
        </Container>
      </Modal>
    </div>
  );
}
