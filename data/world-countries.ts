/**
 * 完整版世界国家数据
 * 用于替代 world-countries 模块解决构建问题
 */

export interface Country {
  cca3: string;
  name: {
    common: string;
    official: string;
  };
  capital?: string[];
}

const worldCountries: Country[] = [
  {
    cca3: "USA",
    name: {
      common: "United States",
      official: "United States of America"
    },
    capital: ["Washington, D.C."]
  },
  {
    cca3: "CHN",
    name: {
      common: "China",
      official: "People's Republic of China"
    },
    capital: ["Beijing"]
  },
  {
    cca3: "GBR",
    name: {
      common: "United Kingdom",
      official: "United Kingdom of Great Britain and Northern Ireland"
    },
    capital: ["London"]
  },
  {
    cca3: "CAN",
    name: {
      common: "Canada",
      official: "Canada"
    },
    capital: ["Ottawa"]
  },
  {
    cca3: "AUS",
    name: {
      common: "Australia",
      official: "Commonwealth of Australia"
    },
    capital: ["Canberra"]
  },
  {
    cca3: "DEU",
    name: {
      common: "Germany",
      official: "Federal Republic of Germany"
    },
    capital: ["Berlin"]
  },
  {
    cca3: "JPN",
    name: {
      common: "Japan",
      official: "Japan"
    },
    capital: ["Tokyo"]
  },
  {
    cca3: "FRA",
    name: {
      common: "France",
      official: "French Republic"
    },
    capital: ["Paris"]
  },
  {
    cca3: "IND",
    name: {
      common: "India",
      official: "Republic of India"
    },
    capital: ["New Delhi"]
  },
  {
    cca3: "RUS",
    name: {
      common: "Russia",
      official: "Russian Federation"
    },
    capital: ["Moscow"]
  },
  {
    cca3: "ITA",
    name: {
      common: "Italy",
      official: "Italian Republic"
    },
    capital: ["Rome"]
  },
  {
    cca3: "ESP",
    name: {
      common: "Spain",
      official: "Kingdom of Spain"
    },
    capital: ["Madrid"]
  },
  {
    cca3: "MEX",
    name: {
      common: "Mexico",
      official: "United Mexican States"
    },
    capital: ["Mexico City"]
  },
  {
    cca3: "BRA",
    name: {
      common: "Brazil",
      official: "Federative Republic of Brazil"
    },
    capital: ["Brasília"]
  },
  {
    cca3: "KOR",
    name: {
      common: "South Korea",
      official: "Republic of Korea"
    },
    capital: ["Seoul"]
  },
  {
    cca3: "NLD",
    name: {
      common: "Netherlands",
      official: "Kingdom of the Netherlands"
    },
    capital: ["Amsterdam"]
  },
  {
    cca3: "CHE",
    name: {
      common: "Switzerland",
      official: "Swiss Confederation"
    },
    capital: ["Bern"]
  },
  {
    cca3: "SWE",
    name: {
      common: "Sweden",
      official: "Kingdom of Sweden"
    },
    capital: ["Stockholm"]
  },
  {
    cca3: "NOR",
    name: {
      common: "Norway",
      official: "Kingdom of Norway"
    },
    capital: ["Oslo"]
  },
  {
    cca3: "DNK",
    name: {
      common: "Denmark",
      official: "Kingdom of Denmark"
    },
    capital: ["Copenhagen"]
  },
  {
    cca3: "FIN",
    name: {
      common: "Finland",
      official: "Republic of Finland"
    },
    capital: ["Helsinki"]
  },
  {
    cca3: "IRL",
    name: {
      common: "Ireland",
      official: "Republic of Ireland"
    },
    capital: ["Dublin"]
  },
  {
    cca3: "NZL",
    name: {
      common: "New Zealand",
      official: "New Zealand"
    },
    capital: ["Wellington"]
  },
  {
    cca3: "SGP",
    name: {
      common: "Singapore",
      official: "Republic of Singapore"
    },
    capital: ["Singapore"]
  },
  {
    cca3: "BEL",
    name: {
      common: "Belgium",
      official: "Kingdom of Belgium"
    },
    capital: ["Brussels"]
  },
  {
    cca3: "AUT",
    name: {
      common: "Austria",
      official: "Republic of Austria"
    },
    capital: ["Vienna"]
  },
  {
    cca3: "GRC",
    name: {
      common: "Greece",
      official: "Hellenic Republic"
    },
    capital: ["Athens"]
  },
  {
    cca3: "PRT",
    name: {
      common: "Portugal",
      official: "Portuguese Republic"
    },
    capital: ["Lisbon"]
  },
  {
    cca3: "POL",
    name: {
      common: "Poland",
      official: "Republic of Poland"
    },
    capital: ["Warsaw"]
  },
  {
    cca3: "ARG",
    name: {
      common: "Argentina",
      official: "Argentine Republic"
    },
    capital: ["Buenos Aires"]
  },
  {
    cca3: "THA",
    name: {
      common: "Thailand",
      official: "Kingdom of Thailand"
    },
    capital: ["Bangkok"]
  },
  {
    cca3: "ZAF",
    name: {
      common: "South Africa",
      official: "Republic of South Africa"
    },
    capital: ["Pretoria", "Cape Town", "Bloemfontein"]
  },
  {
    cca3: "EGY",
    name: {
      common: "Egypt",
      official: "Arab Republic of Egypt"
    },
    capital: ["Cairo"]
  },
  {
    cca3: "ISR",
    name: {
      common: "Israel",
      official: "State of Israel"
    },
    capital: ["Jerusalem"]
  },
  {
    cca3: "TUR",
    name: {
      common: "Turkey",
      official: "Republic of Turkey"
    },
    capital: ["Ankara"]
  },
  {
    cca3: "SAU",
    name: {
      common: "Saudi Arabia",
      official: "Kingdom of Saudi Arabia"
    },
    capital: ["Riyadh"]
  },
  {
    cca3: "UAE",
    name: {
      common: "United Arab Emirates",
      official: "United Arab Emirates"
    },
    capital: ["Abu Dhabi"]
  },
  {
    cca3: "MYS",
    name: {
      common: "Malaysia",
      official: "Malaysia"
    },
    capital: ["Kuala Lumpur"]
  },
  {
    cca3: "IDN",
    name: {
      common: "Indonesia",
      official: "Republic of Indonesia"
    },
    capital: ["Jakarta"]
  },
  {
    cca3: "PHL",
    name: {
      common: "Philippines",
      official: "Republic of the Philippines"
    },
    capital: ["Manila"]
  },
  {
    cca3: "VNM",
    name: {
      common: "Vietnam",
      official: "Socialist Republic of Vietnam"
    },
    capital: ["Hanoi"]
  },
  {
    cca3: "UKR",
    name: {
      common: "Ukraine",
      official: "Ukraine"
    },
    capital: ["Kyiv"]
  },
  {
    cca3: "HUN",
    name: {
      common: "Hungary",
      official: "Hungary"
    },
    capital: ["Budapest"]
  },
  {
    cca3: "CZE",
    name: {
      common: "Czech Republic",
      official: "Czech Republic"
    },
    capital: ["Prague"]
  },
  {
    cca3: "ROU",
    name: {
      common: "Romania",
      official: "Romania"
    },
    capital: ["Bucharest"]
  },
  {
    cca3: "HRV",
    name: {
      common: "Croatia",
      official: "Republic of Croatia"
    },
    capital: ["Zagreb"]
  },
  {
    cca3: "SVK",
    name: {
      common: "Slovakia",
      official: "Slovak Republic"
    },
    capital: ["Bratislava"]
  },
  {
    cca3: "SVN",
    name: {
      common: "Slovenia",
      official: "Republic of Slovenia"
    },
    capital: ["Ljubljana"]
  },
  {
    cca3: "BGR",
    name: {
      common: "Bulgaria",
      official: "Republic of Bulgaria"
    },
    capital: ["Sofia"]
  },
  {
    cca3: "SRB",
    name: {
      common: "Serbia",
      official: "Republic of Serbia"
    },
    capital: ["Belgrade"]
  },
  {
    cca3: "LTU",
    name: {
      common: "Lithuania",
      official: "Republic of Lithuania"
    },
    capital: ["Vilnius"]
  },
  {
    cca3: "LVA",
    name: {
      common: "Latvia",
      official: "Republic of Latvia"
    },
    capital: ["Riga"]
  },
  {
    cca3: "EST",
    name: {
      common: "Estonia",
      official: "Republic of Estonia"
    },
    capital: ["Tallinn"]
  },
  {
    cca3: "CYP",
    name: {
      common: "Cyprus",
      official: "Republic of Cyprus"
    },
    capital: ["Nicosia"]
  },
  {
    cca3: "MLT",
    name: {
      common: "Malta",
      official: "Republic of Malta"
    },
    capital: ["Valletta"]
  },
  {
    cca3: "LUX",
    name: {
      common: "Luxembourg",
      official: "Grand Duchy of Luxembourg"
    },
    capital: ["Luxembourg"]
  },
  {
    cca3: "ISL",
    name: {
      common: "Iceland",
      official: "Iceland"
    },
    capital: ["Reykjavik"]
  },
  {
    cca3: "AND",
    name: {
      common: "Andorra",
      official: "Principality of Andorra"
    },
    capital: ["Andorra la Vella"]
  },
  {
    cca3: "MCO",
    name: {
      common: "Monaco",
      official: "Principality of Monaco"
    },
    capital: ["Monaco"]
  },
  {
    cca3: "VAT",
    name: {
      common: "Vatican City",
      official: "Vatican City State"
    },
    capital: ["Vatican City"]
  },
  {
    cca3: "LIE",
    name: {
      common: "Liechtenstein",
      official: "Principality of Liechtenstein"
    },
    capital: ["Vaduz"]
  },
  {
    cca3: "SMR",
    name: {
      common: "San Marino",
      official: "Republic of San Marino"
    },
    capital: ["San Marino"]
  },
  {
    cca3: "MNE",
    name: {
      common: "Montenegro",
      official: "Montenegro"
    },
    capital: ["Podgorica"]
  },
  {
    cca3: "ALB",
    name: {
      common: "Albania",
      official: "Republic of Albania"
    },
    capital: ["Tirana"]
  },
  {
    cca3: "MKD",
    name: {
      common: "North Macedonia",
      official: "Republic of North Macedonia"
    },
    capital: ["Skopje"]
  },
  {
    cca3: "BIH",
    name: {
      common: "Bosnia and Herzegovina",
      official: "Bosnia and Herzegovina"
    },
    capital: ["Sarajevo"]
  },
  {
    cca3: "KWT",
    name: {
      common: "Kuwait",
      official: "State of Kuwait"
    },
    capital: ["Kuwait City"]
  },
  {
    cca3: "QAT",
    name: {
      common: "Qatar",
      official: "State of Qatar"
    },
    capital: ["Doha"]
  },
  {
    cca3: "BHR",
    name: {
      common: "Bahrain",
      official: "Kingdom of Bahrain"
    },
    capital: ["Manama"]
  },
  {
    cca3: "OMN",
    name: {
      common: "Oman",
      official: "Sultanate of Oman"
    },
    capital: ["Muscat"]
  },
  {
    cca3: "JOR",
    name: {
      common: "Jordan",
      official: "Hashemite Kingdom of Jordan"
    },
    capital: ["Amman"]
  },
  {
    cca3: "LBN",
    name: {
      common: "Lebanon",
      official: "Lebanese Republic"
    },
    capital: ["Beirut"]
  },
  {
    cca3: "IRQ",
    name: {
      common: "Iraq",
      official: "Republic of Iraq"
    },
    capital: ["Baghdad"]
  },
  {
    cca3: "IRN",
    name: {
      common: "Iran",
      official: "Islamic Republic of Iran"
    },
    capital: ["Tehran"]
  },
  {
    cca3: "YEM",
    name: {
      common: "Yemen",
      official: "Republic of Yemen"
    },
    capital: ["Sana'a"]
  },
  {
    cca3: "SYR",
    name: {
      common: "Syria",
      official: "Syrian Arab Republic"
    },
    capital: ["Damascus"]
  },
  {
    cca3: "PSE",
    name: {
      common: "Palestine",
      official: "State of Palestine"
    },
    capital: ["Ramallah", "Jerusalem"]
  },
  {
    cca3: "KAZ",
    name: {
      common: "Kazakhstan",
      official: "Republic of Kazakhstan"
    },
    capital: ["Astana"]
  },
  {
    cca3: "UZB",
    name: {
      common: "Uzbekistan",
      official: "Republic of Uzbekistan"
    },
    capital: ["Tashkent"]
  },
  {
    cca3: "TKM",
    name: {
      common: "Turkmenistan",
      official: "Turkmenistan"
    },
    capital: ["Ashgabat"]
  },
  {
    cca3: "TJK",
    name: {
      common: "Tajikistan",
      official: "Republic of Tajikistan"
    },
    capital: ["Dushanbe"]
  },
  {
    cca3: "KGZ",
    name: {
      common: "Kyrgyzstan",
      official: "Kyrgyz Republic"
    },
    capital: ["Bishkek"]
  },
  {
    cca3: "AFG",
    name: {
      common: "Afghanistan",
      official: "Islamic Republic of Afghanistan"
    },
    capital: ["Kabul"]
  },
  {
    cca3: "PAK",
    name: {
      common: "Pakistan",
      official: "Islamic Republic of Pakistan"
    },
    capital: ["Islamabad"]
  },
  {
    cca3: "BGD",
    name: {
      common: "Bangladesh",
      official: "People's Republic of Bangladesh"
    },
    capital: ["Dhaka"]
  },
  {
    cca3: "LKA",
    name: {
      common: "Sri Lanka",
      official: "Democratic Socialist Republic of Sri Lanka"
    },
    capital: ["Colombo", "Sri Jayawardenepura Kotte"]
  },
  {
    cca3: "NPL",
    name: {
      common: "Nepal",
      official: "Federal Democratic Republic of Nepal"
    },
    capital: ["Kathmandu"]
  },
  {
    cca3: "BTN",
    name: {
      common: "Bhutan",
      official: "Kingdom of Bhutan"
    },
    capital: ["Thimphu"]
  },
  {
    cca3: "MDV",
    name: {
      common: "Maldives",
      official: "Republic of the Maldives"
    },
    capital: ["Malé"]
  },
  {
    cca3: "MMR",
    name: {
      common: "Myanmar",
      official: "Republic of the Union of Myanmar"
    },
    capital: ["Naypyidaw"]
  },
  {
    cca3: "LAO",
    name: {
      common: "Laos",
      official: "Lao People's Democratic Republic"
    },
    capital: ["Vientiane"]
  },
  {
    cca3: "KHM",
    name: {
      common: "Cambodia",
      official: "Kingdom of Cambodia"
    },
    capital: ["Phnom Penh"]
  },
  {
    cca3: "BRN",
    name: {
      common: "Brunei",
      official: "Nation of Brunei, Abode of Peace"
    },
    capital: ["Bandar Seri Begawan"]
  },
  {
    cca3: "TLS",
    name: {
      common: "Timor-Leste",
      official: "Democratic Republic of Timor-Leste"
    },
    capital: ["Dili"]
  },
  {
    cca3: "MNG",
    name: {
      common: "Mongolia",
      official: "Mongolia"
    },
    capital: ["Ulaanbaatar"]
  },
  {
    cca3: "PRK",
    name: {
      common: "North Korea",
      official: "Democratic People's Republic of Korea"
    },
    capital: ["Pyongyang"]
  },
  {
    cca3: "TWN",
    name: {
      common: "Taiwan",
      official: "Republic of China (Taiwan)"
    },
    capital: ["Taipei"]
  },
  {
    cca3: "HKG",
    name: {
      common: "Hong Kong",
      official: "Hong Kong Special Administrative Region of the People's Republic of China"
    },
    capital: ["City of Victoria"]
  },
  {
    cca3: "MAC",
    name: {
      common: "Macau",
      official: "Macao Special Administrative Region of the People's Republic of China"
    },
    capital: ["Macau"]
  },
  // 非洲国家
  {
    cca3: "DZA",
    name: {
      common: "Algeria",
      official: "People's Democratic Republic of Algeria"
    },
    capital: ["Algiers"]
  },
  {
    cca3: "AGO",
    name: {
      common: "Angola",
      official: "Republic of Angola"
    },
    capital: ["Luanda"]
  },
  {
    cca3: "BEN",
    name: {
      common: "Benin",
      official: "Republic of Benin"
    },
    capital: ["Porto-Novo"]
  },
  {
    cca3: "BWA",
    name: {
      common: "Botswana",
      official: "Republic of Botswana"
    },
    capital: ["Gaborone"]
  },
  {
    cca3: "BFA",
    name: {
      common: "Burkina Faso",
      official: "Burkina Faso"
    },
    capital: ["Ouagadougou"]
  },
  {
    cca3: "BDI",
    name: {
      common: "Burundi",
      official: "Republic of Burundi"
    },
    capital: ["Gitega"]
  },
  {
    cca3: "CPV",
    name: {
      common: "Cape Verde",
      official: "Republic of Cabo Verde"
    },
    capital: ["Praia"]
  },
  {
    cca3: "CMR",
    name: {
      common: "Cameroon",
      official: "Republic of Cameroon"
    },
    capital: ["Yaoundé"]
  },
  {
    cca3: "CAF",
    name: {
      common: "Central African Republic",
      official: "Central African Republic"
    },
    capital: ["Bangui"]
  },
  {
    cca3: "TCD",
    name: {
      common: "Chad",
      official: "Republic of Chad"
    },
    capital: ["N'Djamena"]
  },
  {
    cca3: "COM",
    name: {
      common: "Comoros",
      official: "Union of the Comoros"
    },
    capital: ["Moroni"]
  },
  {
    cca3: "COG",
    name: {
      common: "Republic of the Congo",
      official: "Republic of the Congo"
    },
    capital: ["Brazzaville"]
  },
  {
    cca3: "COD",
    name: {
      common: "Democratic Republic of the Congo",
      official: "Democratic Republic of the Congo"
    },
    capital: ["Kinshasa"]
  },
  {
    cca3: "DJI",
    name: {
      common: "Djibouti",
      official: "Republic of Djibouti"
    },
    capital: ["Djibouti"]
  },
  {
    cca3: "GNQ",
    name: {
      common: "Equatorial Guinea",
      official: "Republic of Equatorial Guinea"
    },
    capital: ["Malabo"]
  },
  {
    cca3: "ERI",
    name: {
      common: "Eritrea",
      official: "State of Eritrea"
    },
    capital: ["Asmara"]
  },
  {
    cca3: "SWZ",
    name: {
      common: "Eswatini",
      official: "Kingdom of Eswatini"
    },
    capital: ["Mbabane"]
  },
  {
    cca3: "ETH",
    name: {
      common: "Ethiopia",
      official: "Federal Democratic Republic of Ethiopia"
    },
    capital: ["Addis Ababa"]
  },
  {
    cca3: "GAB",
    name: {
      common: "Gabon",
      official: "Gabonese Republic"
    },
    capital: ["Libreville"]
  },
  {
    cca3: "GMB",
    name: {
      common: "Gambia",
      official: "Republic of the Gambia"
    },
    capital: ["Banjul"]
  },
  {
    cca3: "GHA",
    name: {
      common: "Ghana",
      official: "Republic of Ghana"
    },
    capital: ["Accra"]
  },
  {
    cca3: "GIN",
    name: {
      common: "Guinea",
      official: "Republic of Guinea"
    },
    capital: ["Conakry"]
  },
  {
    cca3: "GNB",
    name: {
      common: "Guinea-Bissau",
      official: "Republic of Guinea-Bissau"
    },
    capital: ["Bissau"]
  },
  {
    cca3: "CIV",
    name: {
      common: "Ivory Coast",
      official: "Republic of Côte d'Ivoire"
    },
    capital: ["Yamoussoukro"]
  },
  {
    cca3: "KEN",
    name: {
      common: "Kenya",
      official: "Republic of Kenya"
    },
    capital: ["Nairobi"]
  },
  {
    cca3: "LSO",
    name: {
      common: "Lesotho",
      official: "Kingdom of Lesotho"
    },
    capital: ["Maseru"]
  },
  {
    cca3: "LBR",
    name: {
      common: "Liberia",
      official: "Republic of Liberia"
    },
    capital: ["Monrovia"]
  },
  {
    cca3: "LBY",
    name: {
      common: "Libya",
      official: "State of Libya"
    },
    capital: ["Tripoli"]
  },
  {
    cca3: "MDG",
    name: {
      common: "Madagascar",
      official: "Republic of Madagascar"
    },
    capital: ["Antananarivo"]
  },
  {
    cca3: "MWI",
    name: {
      common: "Malawi",
      official: "Republic of Malawi"
    },
    capital: ["Lilongwe"]
  },
  {
    cca3: "MLI",
    name: {
      common: "Mali",
      official: "Republic of Mali"
    },
    capital: ["Bamako"]
  },
  {
    cca3: "MRT",
    name: {
      common: "Mauritania",
      official: "Islamic Republic of Mauritania"
    },
    capital: ["Nouakchott"]
  },
  {
    cca3: "MUS",
    name: {
      common: "Mauritius",
      official: "Republic of Mauritius"
    },
    capital: ["Port Louis"]
  },
  {
    cca3: "MAR",
    name: {
      common: "Morocco",
      official: "Kingdom of Morocco"
    },
    capital: ["Rabat"]
  },
  {
    cca3: "MOZ",
    name: {
      common: "Mozambique",
      official: "Republic of Mozambique"
    },
    capital: ["Maputo"]
  },
  {
    cca3: "NAM",
    name: {
      common: "Namibia",
      official: "Republic of Namibia"
    },
    capital: ["Windhoek"]
  },
  {
    cca3: "NER",
    name: {
      common: "Niger",
      official: "Republic of Niger"
    },
    capital: ["Niamey"]
  },
  {
    cca3: "NGA",
    name: {
      common: "Nigeria",
      official: "Federal Republic of Nigeria"
    },
    capital: ["Abuja"]
  },
  {
    cca3: "RWA",
    name: {
      common: "Rwanda",
      official: "Republic of Rwanda"
    },
    capital: ["Kigali"]
  },
  {
    cca3: "STP",
    name: {
      common: "São Tomé and Príncipe",
      official: "Democratic Republic of São Tomé and Príncipe"
    },
    capital: ["São Tomé"]
  },
  {
    cca3: "SEN",
    name: {
      common: "Senegal",
      official: "Republic of Senegal"
    },
    capital: ["Dakar"]
  },
  {
    cca3: "SYC",
    name: {
      common: "Seychelles",
      official: "Republic of Seychelles"
    },
    capital: ["Victoria"]
  },
  {
    cca3: "SLE",
    name: {
      common: "Sierra Leone",
      official: "Republic of Sierra Leone"
    },
    capital: ["Freetown"]
  },
  {
    cca3: "SOM",
    name: {
      common: "Somalia",
      official: "Federal Republic of Somalia"
    },
    capital: ["Mogadishu"]
  },
  {
    cca3: "SSD",
    name: {
      common: "South Sudan",
      official: "Republic of South Sudan"
    },
    capital: ["Juba"]
  },
  {
    cca3: "SDN",
    name: {
      common: "Sudan",
      official: "Republic of the Sudan"
    },
    capital: ["Khartoum"]
  },
  {
    cca3: "TZA",
    name: {
      common: "Tanzania",
      official: "United Republic of Tanzania"
    },
    capital: ["Dodoma"]
  },
  {
    cca3: "TGO",
    name: {
      common: "Togo",
      official: "Togolese Republic"
    },
    capital: ["Lomé"]
  },
  {
    cca3: "TUN",
    name: {
      common: "Tunisia",
      official: "Tunisian Republic"
    },
    capital: ["Tunis"]
  },
  {
    cca3: "UGA",
    name: {
      common: "Uganda",
      official: "Republic of Uganda"
    },
    capital: ["Kampala"]
  },
  {
    cca3: "ZMB",
    name: {
      common: "Zambia",
      official: "Republic of Zambia"
    },
    capital: ["Lusaka"]
  },
  {
    cca3: "ZWE",
    name: {
      common: "Zimbabwe",
      official: "Republic of Zimbabwe"
    },
    capital: ["Harare"]
  },
  // 美洲国家
  {
    cca3: "ATG",
    name: {
      common: "Antigua and Barbuda",
      official: "Antigua and Barbuda"
    },
    capital: ["Saint John's"]
  },
  {
    cca3: "BHS",
    name: {
      common: "Bahamas",
      official: "Commonwealth of the Bahamas"
    },
    capital: ["Nassau"]
  },
  {
    cca3: "BRB",
    name: {
      common: "Barbados",
      official: "Barbados"
    },
    capital: ["Bridgetown"]
  },
  {
    cca3: "BLZ",
    name: {
      common: "Belize",
      official: "Belize"
    },
    capital: ["Belmopan"]
  },
  {
    cca3: "BOL",
    name: {
      common: "Bolivia",
      official: "Plurinational State of Bolivia"
    },
    capital: ["Sucre"]
  },
  {
    cca3: "CHL",
    name: {
      common: "Chile",
      official: "Republic of Chile"
    },
    capital: ["Santiago"]
  },
  {
    cca3: "COL",
    name: {
      common: "Colombia",
      official: "Republic of Colombia"
    },
    capital: ["Bogotá"]
  },
  {
    cca3: "CRI",
    name: {
      common: "Costa Rica",
      official: "Republic of Costa Rica"
    },
    capital: ["San José"]
  },
  {
    cca3: "CUB",
    name: {
      common: "Cuba",
      official: "Republic of Cuba"
    },
    capital: ["Havana"]
  },
  {
    cca3: "DMA",
    name: {
      common: "Dominica",
      official: "Commonwealth of Dominica"
    },
    capital: ["Roseau"]
  },
  {
    cca3: "DOM",
    name: {
      common: "Dominican Republic",
      official: "Dominican Republic"
    },
    capital: ["Santo Domingo"]
  },
  {
    cca3: "ECU",
    name: {
      common: "Ecuador",
      official: "Republic of Ecuador"
    },
    capital: ["Quito"]
  },
  {
    cca3: "SLV",
    name: {
      common: "El Salvador",
      official: "Republic of El Salvador"
    },
    capital: ["San Salvador"]
  },
  {
    cca3: "GRD",
    name: {
      common: "Grenada",
      official: "Grenada"
    },
    capital: ["St. George's"]
  },
  {
    cca3: "GTM",
    name: {
      common: "Guatemala",
      official: "Republic of Guatemala"
    },
    capital: ["Guatemala City"]
  },
  {
    cca3: "GUY",
    name: {
      common: "Guyana",
      official: "Co-operative Republic of Guyana"
    },
    capital: ["Georgetown"]
  },
  {
    cca3: "HTI",
    name: {
      common: "Haiti",
      official: "Republic of Haiti"
    },
    capital: ["Port-au-Prince"]
  },
  {
    cca3: "HND",
    name: {
      common: "Honduras",
      official: "Republic of Honduras"
    },
    capital: ["Tegucigalpa"]
  },
  {
    cca3: "JAM",
    name: {
      common: "Jamaica",
      official: "Jamaica"
    },
    capital: ["Kingston"]
  },
  {
    cca3: "NIC",
    name: {
      common: "Nicaragua",
      official: "Republic of Nicaragua"
    },
    capital: ["Managua"]
  },
  {
    cca3: "PAN",
    name: {
      common: "Panama",
      official: "Republic of Panama"
    },
    capital: ["Panama City"]
  },
  {
    cca3: "PRY",
    name: {
      common: "Paraguay",
      official: "Republic of Paraguay"
    },
    capital: ["Asunción"]
  },
  {
    cca3: "PER",
    name: {
      common: "Peru",
      official: "Republic of Peru"
    },
    capital: ["Lima"]
  },
  {
    cca3: "KNA",
    name: {
      common: "Saint Kitts and Nevis",
      official: "Federation of Saint Christopher and Nevis"
    },
    capital: ["Basseterre"]
  },
  {
    cca3: "LCA",
    name: {
      common: "Saint Lucia",
      official: "Saint Lucia"
    },
    capital: ["Castries"]
  },
  {
    cca3: "VCT",
    name: {
      common: "Saint Vincent and the Grenadines",
      official: "Saint Vincent and the Grenadines"
    },
    capital: ["Kingstown"]
  },
  {
    cca3: "SUR",
    name: {
      common: "Suriname",
      official: "Republic of Suriname"
    },
    capital: ["Paramaribo"]
  },
  {
    cca3: "TTO",
    name: {
      common: "Trinidad and Tobago",
      official: "Republic of Trinidad and Tobago"
    },
    capital: ["Port of Spain"]
  },
  {
    cca3: "URY",
    name: {
      common: "Uruguay",
      official: "Oriental Republic of Uruguay"
    },
    capital: ["Montevideo"]
  },
  {
    cca3: "VEN",
    name: {
      common: "Venezuela",
      official: "Bolivarian Republic of Venezuela"
    },
    capital: ["Caracas"]
  },
  // 大洋洲国家
  {
    cca3: "FJI",
    name: {
      common: "Fiji",
      official: "Republic of Fiji"
    },
    capital: ["Suva"]
  },
  {
    cca3: "KIR",
    name: {
      common: "Kiribati",
      official: "Republic of Kiribati"
    },
    capital: ["South Tarawa"]
  },
  {
    cca3: "MHL",
    name: {
      common: "Marshall Islands",
      official: "Republic of the Marshall Islands"
    },
    capital: ["Majuro"]
  },
  {
    cca3: "FSM",
    name: {
      common: "Micronesia",
      official: "Federated States of Micronesia"
    },
    capital: ["Palikir"]
  },
  {
    cca3: "NRU",
    name: {
      common: "Nauru",
      official: "Republic of Nauru"
    },
    capital: ["Yaren"]
  },
  {
    cca3: "PLW",
    name: {
      common: "Palau",
      official: "Republic of Palau"
    },
    capital: ["Ngerulmud"]
  },
  {
    cca3: "PNG",
    name: {
      common: "Papua New Guinea",
      official: "Independent State of Papua New Guinea"
    },
    capital: ["Port Moresby"]
  },
  {
    cca3: "WSM",
    name: {
      common: "Samoa",
      official: "Independent State of Samoa"
    },
    capital: ["Apia"]
  },
  {
    cca3: "SLB",
    name: {
      common: "Solomon Islands",
      official: "Solomon Islands"
    },
    capital: ["Honiara"]
  },
  {
    cca3: "TON",
    name: {
      common: "Tonga",
      official: "Kingdom of Tonga"
    },
    capital: ["Nuku'alofa"]
  },
  {
    cca3: "TUV",
    name: {
      common: "Tuvalu",
      official: "Tuvalu"
    },
    capital: ["Funafuti"]
  },
  {
    cca3: "VUT",
    name: {
      common: "Vanuatu",
      official: "Republic of Vanuatu"
    },
    capital: ["Port Vila"]
  },
  // 欧亚过渡地区和特殊地区
  {
    cca3: "ALA",
    name: {
      common: "Åland Islands",
      official: "Åland Islands"
    },
    capital: ["Mariehamn"]
  },
  {
    cca3: "GRL",
    name: {
      common: "Greenland",
      official: "Greenland"
    },
    capital: ["Nuuk"]
  },
  {
    cca3: "FRO",
    name: {
      common: "Faroe Islands",
      official: "Faroe Islands"
    },
    capital: ["Tórshavn"]
  },
  {
    cca3: "GIB",
    name: {
      common: "Gibraltar",
      official: "Gibraltar"
    },
    capital: ["Gibraltar"]
  },
  {
    cca3: "GGY",
    name: {
      common: "Guernsey",
      official: "Bailiwick of Guernsey"
    },
    capital: ["St. Peter Port"]
  },
  {
    cca3: "IMN",
    name: {
      common: "Isle of Man",
      official: "Isle of Man"
    },
    capital: ["Douglas"]
  },
  {
    cca3: "JEY",
    name: {
      common: "Jersey",
      official: "Bailiwick of Jersey"
    },
    capital: ["Saint Helier"]
  }
];

export default worldCountries; 