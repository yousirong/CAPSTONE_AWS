// @mui
import PropTypes from 'prop-types';
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../Home/Dashboard/Iconify';
// 전에 했던 프로젝트 가져옴. 팀원들에게 이런것들도 있다 설명용
import Scrollbar from '../../Home/Dashboard/Scrollbar';
// ----------------------------------------------------------------------

DetailMenu.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function DetailMenu({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      {/* <Scrollbar> */}
      <Stack spacing={9.6} sx={{ p: 3, pr: 0 }}>
        {list.map((news) => (
          <MenuItem key={news.id} news={news} />
        ))}
      </Stack>
      {/* </Scrollbar> */}

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
          카카오맵으로 보기
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

MenuItem.propTypes = {
  news: PropTypes.shape({
    description: PropTypes.string,
    image0: PropTypes.string,
    image1: PropTypes.string,
    image2: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date),
    title: PropTypes.string,
  }),
};

function MenuItem({ news }) {
  const { image, title, description, postedAt } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box component="img" alt={title} src={image} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />
      <Box component="img" alt={title} src={image} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />
      <Box component="img" alt={title} src={image} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />

      <Box sx={{ minWidth: 150, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" noWrap>
          {title}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {fToNow(postedAt)}
      </Typography>
    </Stack>
  );
}
