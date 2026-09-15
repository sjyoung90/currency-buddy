export type Currency = {
  code: string;
  name: string;
  nameKo: string;
  flag: string;
};

export const CURRENCIES: readonly Currency[] = [
  { code: "USD", name: "US Dollar", nameKo: "미국 달러", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", nameKo: "유로", flag: "🇪🇺" },
  { code: "KRW", name: "South Korean Won", nameKo: "한국 원", flag: "🇰🇷" },
  { code: "JPY", name: "Japanese Yen", nameKo: "일본 엔", flag: "🇯🇵" },
  { code: "CNY", name: "Chinese Yuan", nameKo: "중국 위안", flag: "🇨🇳" },
  { code: "GBP", name: "British Pound", nameKo: "영국 파운드", flag: "🇬🇧" },
  { code: "AUD", name: "Australian Dollar", nameKo: "호주 달러", flag: "🇦🇺" },
  { code: "CAD", name: "Canadian Dollar", nameKo: "캐나다 달러", flag: "🇨🇦" },
  { code: "CHF", name: "Swiss Franc", nameKo: "스위스 프랑", flag: "🇨🇭" },
  { code: "HKD", name: "Hong Kong Dollar", nameKo: "홍콩 달러", flag: "🇭🇰" },
  { code: "SGD", name: "Singapore Dollar", nameKo: "싱가포르 달러", flag: "🇸🇬" },
  { code: "NZD", name: "New Zealand Dollar", nameKo: "뉴질랜드 달러", flag: "🇳🇿" },
  { code: "INR", name: "Indian Rupee", nameKo: "인도 루피", flag: "🇮🇳" },
  { code: "IDR", name: "Indonesian Rupiah", nameKo: "인도네시아 루피아", flag: "🇮🇩" },
  { code: "THB", name: "Thai Baht", nameKo: "태국 바트", flag: "🇹🇭" },
  { code: "MYR", name: "Malaysian Ringgit", nameKo: "말레이시아 링깃", flag: "🇲🇾" },
  { code: "PHP", name: "Philippine Peso", nameKo: "필리핀 페소", flag: "🇵🇭" },
  { code: "TRY", name: "Turkish Lira", nameKo: "터키 리라", flag: "🇹🇷" },
  { code: "MXN", name: "Mexican Peso", nameKo: "멕시코 페소", flag: "🇲🇽" },
  { code: "BRL", name: "Brazilian Real", nameKo: "브라질 헤알", flag: "🇧🇷" },
  { code: "ZAR", name: "South African Rand", nameKo: "남아공 랜드", flag: "🇿🇦" },
  { code: "SEK", name: "Swedish Krona", nameKo: "스웨덴 크로나", flag: "🇸🇪" },
  { code: "NOK", name: "Norwegian Krone", nameKo: "노르웨이 크로네", flag: "🇳🇴" },
  { code: "DKK", name: "Danish Krone", nameKo: "덴마크 크로네", flag: "🇩🇰" },
  { code: "PLN", name: "Polish Zloty", nameKo: "폴란드 즈워티", flag: "🇵🇱" },
  { code: "CZK", name: "Czech Koruna", nameKo: "체코 코루나", flag: "🇨🇿" },
  { code: "HUF", name: "Hungarian Forint", nameKo: "헝가리 포린트", flag: "🇭🇺" },
  { code: "RON", name: "Romanian Leu", nameKo: "루마니아 레우", flag: "🇷🇴" },
  { code: "BGN", name: "Bulgarian Lev", nameKo: "불가리아 레프", flag: "🇧🇬" },
  { code: "ILS", name: "Israeli Shekel", nameKo: "이스라엘 셰켈", flag: "🇮🇱" },
  { code: "ISK", name: "Icelandic Krona", nameKo: "아이슬란드 크로나", flag: "🇮🇸" },
] as const;

export const CURRENCY_BY_CODE: Record<string, Currency> = Object.fromEntries(
  CURRENCIES.map((c) => [c.code, c]),
);
