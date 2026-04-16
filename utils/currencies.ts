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
  // Popüler para birimleri
  { code: 'INR', nameTR: 'Hint Rupisi', nameEN: 'Indian Rupee', flag: '🇮🇳', symbol: '₹' },
  { code: 'BRL', nameTR: 'Brezilya Reali', nameEN: 'Brazilian Real', flag: '🇧🇷', symbol: 'R$' },
  { code: 'MXN', nameTR: 'Meksika Pesosu', nameEN: 'Mexican Peso', flag: '🇲🇽', symbol: 'MX$' },
  { code: 'ZAR', nameTR: 'Güney Afrika Randı', nameEN: 'South African Rand', flag: '🇿🇦', symbol: 'R' },
  { code: 'PLN', nameTR: 'Polonya Zlotisi', nameEN: 'Polish Zloty', flag: '🇵🇱', symbol: 'zł' },
  { code: 'CZK', nameTR: 'Çek Korunası', nameEN: 'Czech Koruna', flag: '🇨🇿', symbol: 'Kč' },
  { code: 'HUF', nameTR: 'Macar Forinti', nameEN: 'Hungarian Forint', flag: '🇭🇺', symbol: 'Ft' },
  { code: 'THB', nameTR: 'Tayland Bahtı', nameEN: 'Thai Baht', flag: '🇹🇭', symbol: '฿' },
  { code: 'IDR', nameTR: 'Endonezya Rupisi', nameEN: 'Indonesian Rupiah', flag: '🇮🇩', symbol: 'Rp' },
  { code: 'MYR', nameTR: 'Malezya Ringgiti', nameEN: 'Malaysian Ringgit', flag: '🇲🇾', symbol: 'RM' },
  { code: 'SGD', nameTR: 'Singapur Doları', nameEN: 'Singapore Dollar', flag: '🇸🇬', symbol: 'S$' },
  { code: 'HKD', nameTR: 'Hong Kong Doları', nameEN: 'Hong Kong Dollar', flag: '🇭🇰', symbol: 'HK$' },
  { code: 'NZD', nameTR: 'Yeni Zelanda Doları', nameEN: 'New Zealand Dollar', flag: '🇳🇿', symbol: 'NZ$' },
  { code: 'ILS', nameTR: 'İsrail Şekeli', nameEN: 'Israeli Shekel', flag: '🇮🇱', symbol: '₪' },
  { code: 'EGP', nameTR: 'Mısır Lirası', nameEN: 'Egyptian Pound', flag: '🇪🇬', symbol: 'E£' },
  { code: 'PHP', nameTR: 'Filipin Pesosu', nameEN: 'Philippine Peso', flag: '🇵🇭', symbol: '₱' },
  { code: 'VND', nameTR: 'Vietnam Dongu', nameEN: 'Vietnamese Dong', flag: '🇻🇳', symbol: '₫' },
  { code: 'TWD', nameTR: 'Tayvan Doları', nameEN: 'Taiwan Dollar', flag: '🇹🇼', symbol: 'NT$' },
  // Bölgesel para birimleri (Balkan / Orta Doğu / Kafkasya)
  { code: 'RON', nameTR: 'Romen Leyi', nameEN: 'Romanian Leu', flag: '🇷🇴', symbol: 'lei' },
  { code: 'RSD', nameTR: 'Sırp Dinarı', nameEN: 'Serbian Dinar', flag: '🇷🇸', symbol: 'din' },
  { code: 'BAM', nameTR: 'Bosna Markı', nameEN: 'Bosnia Mark', flag: '🇧🇦', symbol: 'KM' },
  { code: 'AZN', nameTR: 'Azerbaycan Manatı', nameEN: 'Azerbaijani Manat', flag: '🇦🇿', symbol: '₼' },
  { code: 'IQD', nameTR: 'Irak Dinarı', nameEN: 'Iraqi Dinar', flag: '🇮🇶', symbol: 'ع.د' },
  { code: 'JOD', nameTR: 'Ürdün Dinarı', nameEN: 'Jordanian Dinar', flag: '🇯🇴', symbol: 'د.ا' },
  { code: 'BHD', nameTR: 'Bahreyn Dinarı', nameEN: 'Bahraini Dinar', flag: '🇧🇭', symbol: 'BD' },
  { code: 'OMR', nameTR: 'Umman Riyali', nameEN: 'Omani Rial', flag: '🇴🇲', symbol: 'ر.ع' },
  { code: 'UAH', nameTR: 'Ukrayna Grivnası', nameEN: 'Ukrainian Hryvnia', flag: '🇺🇦', symbol: '₴' },
  { code: 'PKR', nameTR: 'Pakistan Rupisi', nameEN: 'Pakistani Rupee', flag: '🇵🇰', symbol: 'Rs' },
  { code: 'AMD', nameTR: 'Ermeni Dramı', nameEN: 'Armenian Dram', flag: '🇦🇲', symbol: '֏' },
  { code: 'MDL', nameTR: 'Moldova Leyi', nameEN: 'Moldovan Leu', flag: '🇲🇩', symbol: 'L' },
  { code: 'ALL', nameTR: 'Arnavut Leki', nameEN: 'Albanian Lek', flag: '🇦🇱', symbol: 'L' },
  { code: 'MKD', nameTR: 'Makedon Dinarı', nameEN: 'Macedonian Denar', flag: '🇲🇰', symbol: 'ден' },
  { code: 'LBP', nameTR: 'Lübnan Lirası', nameEN: 'Lebanese Pound', flag: '🇱🇧', symbol: 'ل.ل' },
];

export const currencyMap = new Map(currencies.map((c) => [c.code, c]));

export function getCurrency(code: string): Currency | undefined {
  return currencyMap.get(code);
}

export const popularPairs = ['EUR', 'GBP', 'CHF', 'JPY'] as const;
