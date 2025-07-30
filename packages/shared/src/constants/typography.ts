import { FONT_FAMILIES, FONT_WEIGHTS } from './themes';

// Typography scale (based on 8px grid)
export const TYPOGRAPHY_SCALE = {
  XS: 12,
  SM: 14,
  BASE: 16,
  LG: 18,
  XL: 20,
  '2XL': 24,
  '3XL': 30,
  '4XL': 36,
  '5XL': 48,
  '6XL': 60,
  '7XL': 72,
  '8XL': 96,
  '9XL': 128,
} as const;

// Line heights
export const LINE_HEIGHTS = {
  TIGHT: 1.25,
  NORMAL: 1.5,
  RELAXED: 1.75,
  LOOSE: 2,
} as const;

// Letter spacing
export const LETTER_SPACING = {
  TIGHT: '-0.025em',
  NORMAL: '0em',
  WIDE: '0.025em',
  WIDER: '0.05em',
  WIDEST: '0.1em',
} as const;

// Typography variants
export const TYPOGRAPHY_VARIANTS = {
  // Display styles
  display1: {
    fontSize: TYPOGRAPHY_SCALE['6XL'],
    lineHeight: LINE_HEIGHTS.TIGHT,
    fontWeight: FONT_WEIGHTS.BOLD,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.TIGHT,
  },
  display2: {
    fontSize: TYPOGRAPHY_SCALE['5XL'],
    lineHeight: LINE_HEIGHTS.TIGHT,
    fontWeight: FONT_WEIGHTS.BOLD,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.TIGHT,
  },
  display3: {
    fontSize: TYPOGRAPHY_SCALE['4XL'],
    lineHeight: LINE_HEIGHTS.TIGHT,
    fontWeight: FONT_WEIGHTS.BOLD,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },

  // Heading styles
  h1: {
    fontSize: TYPOGRAPHY_SCALE['3XL'],
    lineHeight: LINE_HEIGHTS.TIGHT,
    fontWeight: FONT_WEIGHTS.BOLD,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  h2: {
    fontSize: TYPOGRAPHY_SCALE['2XL'],
    lineHeight: LINE_HEIGHTS.TIGHT,
    fontWeight: FONT_WEIGHTS.SEMI_BOLD,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  h3: {
    fontSize: TYPOGRAPHY_SCALE.XL,
    lineHeight: LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.SEMI_BOLD,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  h4: {
    fontSize: TYPOGRAPHY_SCALE.LG,
    lineHeight: LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  h5: {
    fontSize: TYPOGRAPHY_SCALE.BASE,
    lineHeight: LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  h6: {
    fontSize: TYPOGRAPHY_SCALE.SM,
    lineHeight: LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },

  // Body text styles
  body1: {
    fontSize: TYPOGRAPHY_SCALE.BASE,
    lineHeight: LINE_HEIGHTS.RELAXED,
    fontWeight: FONT_WEIGHTS.REGULAR,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  body2: {
    fontSize: TYPOGRAPHY_SCALE.SM,
    lineHeight: LINE_HEIGHTS.RELAXED,
    fontWeight: FONT_WEIGHTS.REGULAR,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  body3: {
    fontSize: TYPOGRAPHY_SCALE.XS,
    lineHeight: LINE_HEIGHTS.RELAXED,
    fontWeight: FONT_WEIGHTS.REGULAR,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },

  // Button styles
  button: {
    fontSize: TYPOGRAPHY_SCALE.BASE,
    lineHeight: LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.SEMI_BOLD,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  buttonSmall: {
    fontSize: TYPOGRAPHY_SCALE.SM,
    lineHeight: LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  buttonLarge: {
    fontSize: TYPOGRAPHY_SCALE.LG,
    lineHeight: LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.SEMI_BOLD,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },

  // Input styles
  input: {
    fontSize: TYPOGRAPHY_SCALE.BASE,
    lineHeight: LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.REGULAR,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  inputLarge: {
    fontSize: TYPOGRAPHY_SCALE.LG,
    lineHeight: LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.REGULAR,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  inputSmall: {
    fontSize: TYPOGRAPHY_SCALE.SM,
    lineHeight: LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.REGULAR,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },

  // Caption styles
  caption: {
    fontSize: TYPOGRAPHY_SCALE.XS,
    lineHeight: LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.REGULAR,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  captionBold: {
    fontSize: TYPOGRAPHY_SCALE.XS,
    lineHeight: LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },

  // Overline styles
  overline: {
    fontSize: TYPOGRAPHY_SCALE.XS,
    lineHeight: LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.WIDEST,
    textTransform: 'uppercase' as const,
  },

  // Code styles
  code: {
    fontSize: TYPOGRAPHY_SCALE.SM,
    lineHeight: LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.REGULAR,
    fontFamily: FONT_FAMILIES.MONOSPACE,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  codeLarge: {
    fontSize: TYPOGRAPHY_SCALE.BASE,
    lineHeight: LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.REGULAR,
    fontFamily: FONT_FAMILIES.MONOSPACE,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
} as const;

// Typography type
export type TypographyVariant = keyof typeof TYPOGRAPHY_VARIANTS;

// Helper function to get typography styles
export function getTypographyStyles(variant: TypographyVariant) {
  return TYPOGRAPHY_VARIANTS[variant];
}

// Helper function to get font size
export function getFontSize(variant: TypographyVariant): number {
  return TYPOGRAPHY_VARIANTS[variant].fontSize;
}

// Helper function to get line height
export function getLineHeight(variant: TypographyVariant): number {
  return TYPOGRAPHY_VARIANTS[variant].lineHeight;
}

// Helper function to get font weight
export function getFontWeight(variant: TypographyVariant): number {
  return TYPOGRAPHY_VARIANTS[variant].fontWeight;
}
