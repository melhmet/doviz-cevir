export const Colors = {
  // Primary (The Pulse)
  primary: '#44e5c2',
  primaryContainer: '#00c9a7',
  onPrimary: '#00382d',
  onPrimaryContainer: '#004e40',
  primaryFixed: '#5ffbd6',
  primaryFixedDim: '#38debb',
  onPrimaryFixed: '#002019',
  onPrimaryFixedVariant: '#005142',
  inversePrimary: '#006b58',

  // Secondary (The Logic)
  secondary: '#4cd6fb',
  secondaryContainer: '#00b2d6',
  onSecondary: '#003642',
  onSecondaryContainer: '#003f4e',
  secondaryFixed: '#b3ebff',
  secondaryFixedDim: '#4cd6fb',
  onSecondaryFixed: '#001f27',
  onSecondaryFixedVariant: '#004e5f',

  // Tertiary
  tertiary: '#ffc0a1',
  tertiaryContainer: '#ff9862',
  onTertiary: '#552000',
  onTertiaryContainer: '#762f00',

  // Error
  error: '#ffb4ab',
  errorContainer: '#93000a',
  onError: '#690005',
  onErrorContainer: '#ffdad6',

  // Surface hierarchy
  surface: '#0f131c',
  surfaceDim: '#0f131c',
  surfaceBright: '#353943',
  surfaceContainer: '#1c1f29',
  surfaceContainerLow: '#181b25',
  surfaceContainerHigh: '#262a34',
  surfaceContainerHighest: '#31353f',
  surfaceContainerLowest: '#0a0e17',
  surfaceVariant: '#31353f',
  surfaceTint: '#38debb',

  // On Surface
  onSurface: '#dfe2ef',
  onSurfaceVariant: '#bacac3',
  onBackground: '#dfe2ef',
  background: '#0f131c',

  // Inverse
  inverseSurface: '#dfe2ef',
  inverseOnSurface: '#2c303a',

  // Outline
  outline: '#85948e',
  outlineVariant: '#3c4a45',
} as const;

export type ColorToken = keyof typeof Colors;
