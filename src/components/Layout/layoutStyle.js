import {scale} from '../../lib/utils';
import palette from '../../theme/palette';

export const layoutPadding = {
  paddingHorizontal: scale(80),
};

export const layoutStyle = {
  flex: 1,
  backgroundColor: palette.background.default,
  ...layoutPadding,
};
