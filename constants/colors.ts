export const DarkColors = {
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

export const LightColors = {
  // Primary (The Pulse) - same accent DNA, adapted for light
  primary: '#006b58',
  primaryContainer: '#44e5c2',
  onPrimary: '#ffffff',
  onPrimaryContainer: '#002019',
  primaryFixed: '#5ffbd6',
  primaryFixedDim: '#38debb',
  onPrimaryFixed: '#002019',
  onPrimaryFixedVariant: '#005142',
  inversePrimary: '#44e5c2',

  // Secondary (The Logic)
  secondary: '#006780',
  secondaryContainer: '#b3ebff',
  onSecondary: '#ffffff',
  onSecondaryContainer: '#001f27',
  secondaryFixed: '#b3ebff',
  secondaryFixedDim: '#4cd6fb',
  onSecondaryFixed: '#001f27',
  onSecondaryFixedVariant: '#004e5f',

  // Tertiary
  tertiary: '#8b4513',
  tertiaryContainer: '#ffdbc8',
  onTertiary: '#ffffff',
  onTertiaryContainer: '#341000',

  // Error
  error: '#ba1a1a',
  errorContainer: '#ffdad6',
  onError: '#ffffff',
  onErrorContainer: '#410002',

  // Surface hierarchy
  surface: '#f8faf7',
  surfaceDim: '#d8dad7',
  surfaceBright: '#f8faf7',
  surfaceContainer: '#eceeed',
  surfaceContainerLow: '#f2f4f1',
  surfaceContainerHigh: '#e6e8e5',
  surfaceContainerHighest: '#e0e2df',
  surfaceContainerLowest: '#ffffff',
  surfaceVariant: '#dbe5df',
  surfaceTint: '#006b58',

  // On Surface
  onSurface: '#191c1b',
  onSurfaceVariant: '#3f4945',
  onBackground: '#191c1b',
  background: '#f8faf7',

  // Inverse
  inverseSurface: '#2e312f',
  inverseOnSurface: '#eff1ee',

  // Outline
  outline: '#6f7975',
  outlineVariant: '#bec9c3',
} as const;

// Backward-compatible alias
export const Colors = DarkColors;

export type AppColors = { readonly [K in keyof typeof DarkColors]: string };
export type ColorToken = keyof typeof DarkColors;
