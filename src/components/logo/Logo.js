import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link } from '@mui/material';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <img
        src="/assets/images/dopelogo.png"
        alt="Cinque Terre"
        height="50"
        color="#fff"
      />
    </Box>
  );

  if (disabledLink) {
    return <Box>{logo}</Box>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.defaultProps = {
  sx: {},
  disabledLink: false,
};

Logo.propTypes = {
  sx: PropTypes.instanceOf(Object),
  disabledLink: PropTypes.bool,
};

export default Logo;
