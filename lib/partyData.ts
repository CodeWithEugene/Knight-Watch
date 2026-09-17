export interface PartyData {
  slug: string;
  name: string;
  acronym: string;
  symbol: string;
  leader: string;
  chairperson: string;
  secretaryGeneral: string;
  founded: number;
  orppRegNumber: string;
  headquarters: string;
  ppfAllocationKes: number;
  ppfAllocationDisplay: string;
  mchangoGoalKes: number;
  mchangoRaisedKes: number;
  reportsCount: number;
  verifiedViolationsCount: number;
  transparencyScore: number; // 0-100
  accentColor: string;
  secondaryColor: string;
  logo: string;
  bio: string;
  parliamentarySeats: {
    nationalAssembly: number;
    senate: number;
    governors: number;
  };
  breakdown: {
    label: string;
    value: string;
    weight: number;
    status: 'clean' | 'partial' | 'pending';
  }[];
  ppfHistory: {
    year: string;
    ppfMillions: number;
  }[];
}

export const KENYAN_PARTIES: PartyData[] = [
  {
    slug: 'uda',
    name: 'United Democratic Alliance',
    acronym: 'UDA',
    symbol: 'Wheelbarrow',
    leader: 'William Samoei Ruto',
    chairperson: 'Cecily Mbarire',
    secretaryGeneral: 'Hassan Omar Hassan',
    founded: 2020,
    orppRegNumber: 'ORPP/PP/078',
    headquarters: 'Hustler Centre, Makindi Rd, Off Riara Rd, Kilimani, Nairobi',
    ppfAllocationKes: 345_862_000,
    ppfAllocationDisplay: 'KSh 345.9M',
    mchangoGoalKes: 500_000_000,
    mchangoRaisedKes: 142_800_000,
    reportsCount: 48,
    verifiedViolationsCount: 14,
    transparencyScore: 78,
    accentColor: '#FACC15',
    secondaryColor: '#15803D',
    logo: '/images/parties/uda.png',
    bio: 'The ruling political party in Kenya. Formed ahead of the 2022 General Election on the platform of the bottom-up economic transformation agenda.',
    parliamentarySeats: {
      nationalAssembly: 145,
      senate: 32,
      governors: 25,
    },
    breakdown: [
      { label: 'Audited Accounts Disclosure', value: 'Submitted to ORPP and Auditor General', weight: 30, status: 'clean' },
      { label: 'PPF Statutory Compliance', value: 'Compliant with Political Parties Act Sec 26', weight: 25, status: 'clean' },
      { label: 'Public Mchango Transparency', value: 'Voluntary quarterly disclosure', weight: 20, status: 'partial' },
      { label: 'Citizen Incident Resolution', value: '29% verified response rate', weight: 25, status: 'partial' },
    ],
    ppfHistory: [
      { year: '2021/22', ppfMillions: 0 },
      { year: '2022/23', ppfMillions: 288.4 },
      { year: '2023/24', ppfMillions: 345.9 },
      { year: '2024/25', ppfMillions: 362.1 },
    ],
  },
  {
    slug: 'odm',
    name: 'Orange Democratic Movement',
    acronym: 'ODM',
    symbol: 'Orange',
    leader: 'Raila Amolo Odinga',
    chairperson: 'Gladys Wanga',
    secretaryGeneral: 'Edwin Sifuna',
    founded: 2005,
    orppRegNumber: 'ORPP/PP/004',
    headquarters: 'Chungwa House, Loyangalani Dr, Lavington, Nairobi',
    ppfAllocationKes: 184_720_000,
    ppfAllocationDisplay: 'KSh 184.7M',
    mchangoGoalKes: 450_000_000,
    mchangoRaisedKes: 118_400_000,
    reportsCount: 42,
    verifiedViolationsCount: 11,
    transparencyScore: 84,
    accentColor: '#EA580C',
    secondaryColor: '#1E3A8A',
    logo: '/images/parties/odm.png',
    bio: 'Kenya’s premier social democratic party with nationwide grassroots presence. Part of the Azimio la Umoja coalition with a robust parliamentary caucus.',
    parliamentarySeats: {
      nationalAssembly: 86,
      senate: 20,
      governors: 16,
    },
    breakdown: [
      { label: 'Audited Accounts Disclosure', value: 'Published on party website and gazetted', weight: 30, status: 'clean' },
      { label: 'PPF Statutory Compliance', value: 'Regular quarterly expenditure audits filed', weight: 25, status: 'clean' },
      { label: 'Public Mchango Transparency', value: 'Live tracking portal linked', weight: 20, status: 'clean' },
      { label: 'Citizen Incident Resolution', value: '38% verified response rate', weight: 25, status: 'partial' },
    ],
    ppfHistory: [
      { year: '2021/22', ppfMillions: 145.2 },
      { year: '2022/23', ppfMillions: 168.0 },
      { year: '2023/24', ppfMillions: 184.7 },
      { year: '2024/25', ppfMillions: 191.5 },
    ],
  },
  {
    slug: 'jubilee',
    name: 'Jubilee Party',
    acronym: 'JP',
    symbol: 'Dove / Clasped Hands',
    leader: 'Uhuru Muigai Kenyatta',
    chairperson: 'Nelson Dzuya',
    secretaryGeneral: 'Jeremiah Kioni',
    founded: 2016,
    orppRegNumber: 'ORPP/PP/048',
    headquarters: 'Pangani / Kileleshwa, Nairobi',
    ppfAllocationKes: 81_040_000,
    ppfAllocationDisplay: 'KSh 81.0M',
    mchangoGoalKes: 200_000_000,
    mchangoRaisedKes: 38_500_000,
    reportsCount: 26,
    verifiedViolationsCount: 7,
    transparencyScore: 66,
    accentColor: '#DC2626',
    secondaryColor: '#FACC15',
    logo: '/images/parties/jubilee-official.svg',
    bio: 'Former governing party (2013-2022) with enduring parliamentary presence and regional influence across Mt. Kenya and urban constituencies.',
    parliamentarySeats: {
      nationalAssembly: 28,
      senate: 5,
      governors: 3,
    },
    breakdown: [
      { label: 'Audited Accounts Disclosure', value: 'Accounts filed pending faction reconciliation', weight: 30, status: 'partial' },
      { label: 'PPF Statutory Compliance', value: 'Statutory minimum compliance verified', weight: 25, status: 'clean' },
      { label: 'Public Mchango Transparency', value: 'Manual receipt verification', weight: 20, status: 'pending' },
      { label: 'Citizen Incident Resolution', value: '21% response rate', weight: 25, status: 'partial' },
    ],
    ppfHistory: [
      { year: '2021/22', ppfMillions: 353.8 },
      { year: '2022/23', ppfMillions: 135.0 },
      { year: '2023/24', ppfMillions: 81.0 },
      { year: '2024/25', ppfMillions: 74.2 },
    ],
  },
  {
    slug: 'wdm-k',
    name: 'Wiper Democratic Movement - Kenya',
    acronym: 'WDM-K',
    symbol: 'Umbrella',
    leader: 'Stephen Kalonzo Musyoka',
    chairperson: 'Chirau Ali Mwakwere',
    secretaryGeneral: 'Shakila Abdalla',
    founded: 2006,
    orppRegNumber: 'ORPP/PP/010',
    headquarters: 'Wiper House, Southern Bypass, Off Mombasa Rd, Nairobi',
    ppfAllocationKes: 45_300_000,
    ppfAllocationDisplay: 'KSh 45.3M',
    mchangoGoalKes: 150_000_000,
    mchangoRaisedKes: 29_100_000,
    reportsCount: 20,
    verifiedViolationsCount: 4,
    transparencyScore: 76,
    accentColor: '#2563EB',
    secondaryColor: '#1E40AF',
    logo: '/images/parties/wiper.jpeg',
    bio: 'Key constituent party of the opposition coalition with strong representation in Lower Eastern and coastal counties.',
    parliamentarySeats: {
      nationalAssembly: 26,
      senate: 3,
      governors: 3,
    },
    breakdown: [
      { label: 'Audited Accounts Disclosure', value: 'Timely submission to ORPP verified', weight: 30, status: 'clean' },
      { label: 'PPF Statutory Compliance', value: 'Civic education allocations accounted for', weight: 25, status: 'clean' },
      { label: 'Public Mchango Transparency', value: 'Audited statements available upon request', weight: 20, status: 'clean' },
      { label: 'Citizen Incident Resolution', value: '31% response rate', weight: 25, status: 'partial' },
    ],
    ppfHistory: [
      { year: '2021/22', ppfMillions: 28.5 },
      { year: '2022/23', ppfMillions: 39.2 },
      { year: '2023/24', ppfMillions: 45.3 },
      { year: '2024/25', ppfMillions: 47.0 },
    ],
  },
  {
    slug: 'anc',
    name: 'Amani National Congress',
    acronym: 'ANC',
    symbol: 'Peace Lamp (Taa ya Amani)',
    leader: 'Musalia Mudavadi (Founder), Issa Timamy',
    chairperson: 'Kelvin Lunani',
    secretaryGeneral: 'Omboko Milemba',
    founded: 2015,
    orppRegNumber: 'ORPP/PP/042',
    headquarters: 'Amani House, Loyangalani Dr, Nairobi',
    ppfAllocationKes: 18_200_000,
    ppfAllocationDisplay: 'KSh 18.2M',
    mchangoGoalKes: 100_000_000,
    mchangoRaisedKes: 14_600_000,
    reportsCount: 12,
    verifiedViolationsCount: 2,
    transparencyScore: 72,
    accentColor: '#16A34A',
    secondaryColor: '#EAB308',
    logo: '/images/parties/anc.png',
    bio: 'Constituent party in the Kenya Kwanza coalition championing national economic revival, devolution and institutional integrity.',
    parliamentarySeats: {
      nationalAssembly: 8,
      senate: 1,
      governors: 1,
    },
    breakdown: [
      { label: 'Audited Accounts Disclosure', value: 'Certified submissions on record', weight: 30, status: 'clean' },
      { label: 'PPF Statutory Compliance', value: 'Full administrative expenditure disclosure', weight: 25, status: 'clean' },
      { label: 'Public Mchango Transparency', value: 'Published party bank accounts', weight: 20, status: 'partial' },
      { label: 'Citizen Incident Resolution', value: '25% response rate', weight: 25, status: 'partial' },
    ],
    ppfHistory: [
      { year: '2021/22', ppfMillions: 14.1 },
      { year: '2022/23', ppfMillions: 16.5 },
      { year: '2023/24', ppfMillions: 18.2 },
      { year: '2024/25', ppfMillions: 18.8 },
    ],
  },
  {
    slug: 'ford-kenya',
    name: 'Forum for the Restoration of Democracy - Kenya',
    acronym: 'FORD-K',
    symbol: 'Lion (Simba)',
    leader: 'Moses Masika Wetangula',
    chairperson: 'Chris Wamalwa',
    secretaryGeneral: 'John Chikati',
    founded: 1992,
    orppRegNumber: 'ORPP/PP/002',
    headquarters: 'Simba House, Argwings Kodhek Rd, Hurlingham, Nairobi',
    ppfAllocationKes: 16_900_000,
    ppfAllocationDisplay: 'KSh 16.9M',
    mchangoGoalKes: 80_000_000,
    mchangoRaisedKes: 11_300_000,
    reportsCount: 15,
    verifiedViolationsCount: 3,
    transparencyScore: 70,
    accentColor: '#047857',
    secondaryColor: '#F59E0B',
    logo: '/images/parties/ford-kenya.png',
    bio: 'One of the founding movements of Kenyan multi-party democracy, currently holding key leadership in the 13th Parliament.',
    parliamentarySeats: {
      nationalAssembly: 6,
      senate: 1,
      governors: 1,
    },
    breakdown: [
      { label: 'Audited Accounts Disclosure', value: 'Audited returns lodged with ORPP', weight: 30, status: 'clean' },
      { label: 'PPF Statutory Compliance', value: 'In line with statutory funding limits', weight: 25, status: 'clean' },
      { label: 'Public Mchango Transparency', value: 'Branch ledger reconciliation ongoing', weight: 20, status: 'partial' },
      { label: 'Citizen Incident Resolution', value: '22% response rate', weight: 25, status: 'partial' },
    ],
    ppfHistory: [
      { year: '2021/22', ppfMillions: 12.0 },
      { year: '2022/23', ppfMillions: 15.1 },
      { year: '2023/24', ppfMillions: 16.9 },
      { year: '2024/25', ppfMillions: 17.4 },
    ],
  },
  {
    slug: 'kanu',
    name: 'Kenya African National Union',
    acronym: 'KANU',
    symbol: 'Cockerel (Jogoo)',
    leader: 'Gideon Moi',
    chairperson: 'Gideon Moi',
    secretaryGeneral: 'George Wainaina',
    founded: 1960,
    orppRegNumber: 'ORPP/PP/001',
    headquarters: 'Kenyatta International Convention Centre (KICC) / Chania Ave, Nairobi',
    ppfAllocationKes: 14_500_000,
    ppfAllocationDisplay: 'KSh 14.5M',
    mchangoGoalKes: 75_000_000,
    mchangoRaisedKes: 8_700_000,
    reportsCount: 9,
    verifiedViolationsCount: 1,
    transparencyScore: 68,
    accentColor: '#B91C1C',
    secondaryColor: '#15803D',
    logo: '/images/parties/kanu.png',
    bio: 'Historic independence party that governed Kenya from 1963 to 2002. Retains dedicated representation and institutional property holdings.',
    parliamentarySeats: {
      nationalAssembly: 5,
      senate: 0,
      governors: 0,
    },
    breakdown: [
      { label: 'Audited Accounts Disclosure', value: 'Annual audit completed and filed', weight: 30, status: 'clean' },
      { label: 'PPF Statutory Compliance', value: 'Audited by Kenya National Audit Office', weight: 25, status: 'clean' },
      { label: 'Public Mchango Transparency', value: 'Legacy donation tracking system', weight: 20, status: 'pending' },
      { label: 'Citizen Incident Resolution', value: '20% response rate', weight: 25, status: 'partial' },
    ],
    ppfHistory: [
      { year: '2021/22', ppfMillions: 18.2 },
      { year: '2022/23', ppfMillions: 15.8 },
      { year: '2023/24', ppfMillions: 14.5 },
      { year: '2024/25', ppfMillions: 13.9 },
    ],
  },
  {
    slug: 'dap-k',
    name: 'Democratic Action Party - Kenya',
    acronym: 'DAP-K',
    symbol: 'Leopard (Chui)',
    leader: 'Eugene Wamalwa (Patron), Wafula Wamunyinyi',
    chairperson: 'Bernard Masanja',
    secretaryGeneral: 'Eseli Simiyu',
    founded: 2021,
    orppRegNumber: 'ORPP/PP/082',
    headquarters: 'Chui House, Nairobi',
    ppfAllocationKes: 12_100_000,
    ppfAllocationDisplay: 'KSh 12.1M',
    mchangoGoalKes: 60_000_000,
    mchangoRaisedKes: 7_400_000,
    reportsCount: 8,
    verifiedViolationsCount: 2,
    transparencyScore: 65,
    accentColor: '#15803D',
    secondaryColor: '#7E22CE',
    logo: '/images/parties/dap-k.png',
    bio: 'Progressive democratic party formed in 2021 with strong representation in Western Kenya and urban hubs.',
    parliamentarySeats: {
      nationalAssembly: 5,
      senate: 0,
      governors: 0,
    },
    breakdown: [
      { label: 'Audited Accounts Disclosure', value: 'Initial cycle accounts gazetted', weight: 30, status: 'clean' },
      { label: 'PPF Statutory Compliance', value: 'Allocation received under Azimio threshold', weight: 25, status: 'clean' },
      { label: 'Public Mchango Transparency', value: 'Donation records verified', weight: 20, status: 'partial' },
      { label: 'Citizen Incident Resolution', value: '18% response rate', weight: 25, status: 'pending' },
    ],
    ppfHistory: [
      { year: '2021/22', ppfMillions: 0 },
      { year: '2022/23', ppfMillions: 9.8 },
      { year: '2023/24', ppfMillions: 12.1 },
      { year: '2024/25', ppfMillions: 12.7 },
    ],
  },
];

export function getPartyBySlug(slug: string): PartyData | undefined {
  return KENYAN_PARTIES.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}

export const ALL_PARTIES = KENYAN_PARTIES.map((p) => ({
  ...p,
  registrationNo: p.orppRegNumber,
  partyLeader: p.leader,
  allocation2024: p.ppfAllocationKes,
}));

