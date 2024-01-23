import { Surface, Divider, Modal } from 'react-native-paper';
import React, { useCallback, useMemo } from 'react';
import { mobileWidth } from 'src/lib/constants';
import ModalHeader from './header';
import ModalFooter from './footer';
import { View } from 'react-native';

const topGradientStyle = () => ({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '40px',
  width: '100px',
  opacity: 0.8,
  zIndex: -1,
  background: 'linear-gradient(#36B3FA 0%, #2AE5DA 100%)',
  filter: 'blur(30px)',
});

const bottomGradientStyle = () => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  height: '40px',
  width: '80px',
  opacity: 0.4,
  zIndex: -1,
  background: 'linear-gradient(#36B3FA 0%, #2AE5DA 100%)',
  filter: 'blur(30px)',
});

const ModalComponent = (props) => {
  const {
    header = {},
    footer = {},
    headerComponent: HeaderComponent,
    footerComponent: FooterComponent,
    children,
    onClose = () => {},
    open = false,
    isSelectRole,
    isDivider = false,
    isBottomDivider = false,
    modalStyle,
    className,
    isSmall,
    isNotScrollable,
    containerStyle = {},
  } = props || {};

  const { closeIconAction } = header;

  const isMobile = useMediaQuery(mobileWidth);

  const style = useMemo(
    () => ({
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: 'background.paper',
      SurfaceShadow: 24,
      pt: '24px',
      pb: '10px',
      overflow: 'auto',
      maxHeight: '100%',
      maxWidth: isSmall ? 'sm' : 'md',
      outline: 'none',
      ...(isMobile && {
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        transform: 'none',
      }),
      display: 'flex',
      flexDirection: 'column',
      ...(isNotScrollable && { width: '100%' }),
      ...containerStyle,
    }),
    [isMobile, isNotScrollable]
  );

  const modalCloseAction = useCallback(
    (event, reason) => {
      onClose(event, reason);
      if (closeIconAction) closeIconAction();
    },
    [closeIconAction, onClose]
  );

  if (!open) return null;

  return (
    <Modal
      open
      onClose={modalCloseAction}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus
      disableEnforceFocus
      className={className}
    >
      {!isNotScrollable ? (
        <Surface sx={style}>
          {!isMobile && isSelectRole ? <Surface sx={topGradientStyle} /> : null}
            <View>
              {HeaderComponent ? (
                <HeaderComponent />
              ) : (
                <ModalHeader
                  header={header}
                  modalCloseAction={modalCloseAction}
                />
              )}
            </View>
          <Surface style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
              <View>{children}</View>
            </Surface>
            <View mt={2}>
              {FooterComponent ? (
                <FooterComponent />
              ) : (
                <ModalFooter footer={footer} />
              )}
            </View>
            {!isMobile && isSelectRole ? (
              <Surface sx={bottomGradientStyle} />
            ) : null}
        </Surface>
      ) : (
        <Surface sx={{ ...style, ...modalStyle }}>
          {HeaderComponent ? (
            <Surface>
              <HeaderComponent />
            </Surface>
          ) : (
            <ModalHeader header={header} modalCloseAction={modalCloseAction} />
          )}
          {isDivider ? <Divider /> : null}
          <Surface style={{ flexGrow: !isMobile ? 1 : 0, overflow: 'auto' }}>
            {children}
          </Surface>
          {isBottomDivider ? <Divider /> : null}
          {FooterComponent && (
            <Surface>
              <FooterComponent />
            </Surface>
          )}
        </Surface>
      )}
    </Modal>
  );
};

export default React.memo(ModalComponent);
