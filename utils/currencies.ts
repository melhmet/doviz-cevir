export interface Currency {
  code: string;
  nameTR: string;
  nameEN: string;
  flag: string;
  symbol: string;
}

export const currencies: Currency[] = [
  { code: 'TRY', nameTR: 'Türk Lirası', nameEN: 'Turkish Lira', flag: '🇹🇷', symbol: '₺' },
  { code: 'USD', nameTR: 'Amerikan Doları', nameEN: 'US Dollar', flag: '🇺🇸', symbol: '$' },
  { code: 'EUR', nameTR: 'Euro', nameEN: 'Euro', flag: '🇪🇺', symbol: '€' },
  { code: 'GBP', nameTR: 'İngiliz Sterlini', nameEN: 'British Pound', flag: '🇬🇧', symbol: '£' },
  { code: 'CHF', nameTR: 'İsviçre Frangı', nameEN: 'Swiss Franc', flag: '🇨🇭', symbol: 'Fr' },
  { code: 'JPY', nameTR: 'Japon Yeni', nameEN: 'Japanese Yen', flag: '🇯🇵', symbol: '¥' },
  { code: 'SAR', nameTR: 'Suudi Riyali', nameEN: 'Saudi Riyal', flag: '🇸🇦', symbol: '﷼' },
  { code: 'AED', nameTR: 'BAE Dirhemi', nameEN: 'UAE Dirham', flag: '🇦🇪', symbol: 'د.إ' },
  { code: 'CAD', nameTR: 'Kanada Doları', nameEN: 'Canadian Dollar', flag: '🇨🇦', symbol: 'C$' },
  { code: 'AUD', nameTR: 'Avustralya Doları', nameEN: 'Australian Dollar', flag: '🇦🇺', symbol: 'A$' },
  { code: 'RUB', nameTR: 'Rus Rublesi', nameEN: 'Russian Ruble', flag: '🇷🇺', symbol: '₽' },
  { code: 'CNY', nameTR: 'Çin Yuanı', nameEN: 'Chinese Yuan', flag: '🇨🇳', symbol: '¥' },
  { code: 'KWD', nameTR: 'Kuveyt Dinarı', nameEN: 'Kuwaiti Dinar', flag: '🇰🇼', symbol: 'د.ك' },
  { code: 'NOK', nameTR: 'Norveç Kronu', nameEN: 'Norwegian Krone', flag: '🇳🇴', symbol: 'kr' },
  { code: 'SEK', nameTR: 'İsveç Kronu', nameEN: 'Swedish Krona', flag: '🇸🇪', symbol: 'kr' },
  { code: 'DKK', nameTR: 'Danimarka Kronu', nameEN: 'Danish Krone', flag: '🇩🇰', symbol: 'kr' },
  { code: 'BGN', nameTR: 'Bulgar Levası', nameEN: 'Bulgarian Lev', flag: '🇧🇬', symbol: 'лв' },
  { code: 'GEL', nameTR: 'Gürcü Larisi', nameEN: 'Georgian Lari', flag: '🇬🇪', symbol: '₾' },
  { code: 'QAR', nameTR: 'Katar Riyali', nameEN: 'Qatari Riyal', flag: '🇶🇦', symbol: 'ر.ق' },
  { code: 'KRW', nameTR: 'Güney Kore Wonu', nameEN: 'South Korean Won', flag: '🇰🇷', symbol: '₩' },
];

export const currencyMap = new Map(currencies.map((c) => [c.code, c]));

export function getCurrency(code: string): Currency | undefined {
  return currencyMap.get(code);
}

export const popularPairs = ['EUR', 'GBP', 'CHF', 'JPY'] as const;
