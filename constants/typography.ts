import { Platform } from 'react-native';

export const Fonts = {
  spaceGrotesk: Platform.select({
    ios: 'SpaceGrotesk',
    android: 'SpaceGrotesk',
    default: 'SpaceGrotesk',
  }) as string,
  jetBrainsMono: Platform.select({
    ios: 'JetBrainsMono',
    android: 'JetBrainsMono',
    default: 'JetBrainsMono',
  }) as string,
};

export const FontSize = {
  // Display
  displayLg: 56, // 3.5rem
  displayMd: 45,
  displaySm: 36,

  // Headline
  headlineLg: 32,
  headlineMd: 28, // 1.75rem
  headlineSm: 24,

  // Title
  titleLg: 22,
  titleMd: 16,
  titleSm: 14,

  // Body
  bodyLg: 16,
  bodyMd: 14,
  bodySm: 12,

  // Label
  labelLg: 14,
  labelMd: 12,
  labelSm: 11, // 0.6875rem
  labelXs: 9,
} as const;

export const LetterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1.5,
  widest: 2.5,
  terminal: 2, // 0.15em equivalent for terminal labels
} as const;
