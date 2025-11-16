export * from './colors';
export * from './fonts';
export * from './spacing';

import { colors } from './colors';
import { fonts, fontSizes, fontWeights, lineHeights } from './fonts';
import { borderRadius, shadows, spacing } from './spacing';

export const theme = {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  spacing,
  borderRadius,
  shadows,
} as const;

export type Theme = typeof theme;