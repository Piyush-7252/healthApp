import React, { useCallback } from 'react';
import { mobileWidth } from 'src/lib/constants';
import CustomButton from '../CustomButton';
import BackIcon from '../../assets/images/svg/back.svg';
import { View } from 'react-native';
import Typography from '../Typography';
import CloseButton from '../CustomButton/closeIButton';

const ModalHeader = (props) => {
  const { header, modalCloseAction } = props || {};
  const { title, logo, showCloseIcon, warningIcon = false } = header || {};
  const isMobile = useMediaQuery(mobileWidth);
  const WarningIcon = useCallback(
    ({ ml, mr }) => (
      <img
        alt="alt"
        src="/assets/icons/warning.svg"
        style={{
          height: 25,
          width: 25,
          marginRight: mr,
          marginLeft: ml,
        }}
      />
    ),
    []
  );
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          margin: isMobile ? ' 0px 18px' : '0px 24px',
        }}
      >
        <View>
          {isMobile && (
            <CustomButton
              variant="secondary"
              sx={{
                boxShadow: 'none',
                padding: 0,
                minWidth: 'unset',
                backgroundColor: 'transparent',
                borderRadius: '50%',
              }}
              onClick={modalCloseAction}
              startIcon={
                <img
                  src={BackIcon}
                  alt="login"
                  style={{
                    cursor: 'pointer',
                    padding: '6px',
                    width: 30,
                    height: 30,
                  }}
                />
              }
            />
          )}
          {logo && (
            <img
              style={{ width: 40, height: 40 }}
              src={logo}
              alt=""
              loading="lazy"
            />
          )}
          {showCloseIcon && !isMobile && (
            <CloseButton
              onClick={modalCloseAction}
             />
          )}
        </View>
        <View
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {warningIcon && !isMobile && <WarningIcon mr="5px" />}
          <Typography
            variant="h6"
            id="modal-modal-description"
            sx={{
              color: '#18395E',
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '28px',
            }}
          >
            {title}
          </Typography>
          {warningIcon && isMobile && <WarningIcon ml="5px" />}
        </View>
      </View>
    </View>
  );
};

export default React.memo(ModalHeader);
