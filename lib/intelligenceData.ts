/**
 * Prefilled intelligence data for Kenyan parties and politicians.
 * Uses official, verified photos and party logos stored locally in /images/...
 */

export type ActivityCategory = 'rally' | 'financial' | 'news' | 'other';

export interface IntelligenceActivity {
  title: string;
  description: string;
  date: string;
  category: ActivityCategory;
  tags: string[];
  location: string;
  amount?: string;
  sourceUrl?: string;
}

export interface IntelligenceEntity {
  id: string;
  name: string;
  type: 'party' | 'politician';
  /** Main photo or logo URL (local high-res asset) */
  imageUrl: string;
  /** Short bio or party description */
  bio?: string;
  /** Alternative names for search matching */
  searchTerms: string[];
  /** Activities keyed by campaign period (2017, 2022, 2027) */
  activitiesByPeriod: Record<string, IntelligenceActivity[]>;
}

const PARTIES: IntelligenceEntity[] = [
  {
    id: 'uda',
    name: 'UDA',
    type: 'party',
    imageUrl: '/images/parties/uda.png',
    bio: 'United Democratic Alliance. Kenya\'s governing party under President William Ruto. Absorbed ANC leadership at State House in Jan 2025 (later voided by the High Court) and tops the 2026/27 Political Parties Fund roll with KSh 550M.',
    searchTerms: ['UDA', 'United Democratic Alliance', 'Wheelbarrow Party'],
    activitiesByPeriod: {
      '2022': [
        {
          title: 'Questions raised over sources of funds for hustler movement and harambee donations',
          description: 'DP Ruto\'s harambee donations and funding for the "hustler movement" and UDA campaigns drew scrutiny from oversight bodies and civil society over sources of funds.',
          date: '2021-08-01',
          category: 'financial',
          tags: ['Public Records', 'reported', 'donations'],
          location: 'Various counties, Kenya',
          sourceUrl: 'https://tikenya.org/',
        },
        {
          title: 'Questions raised over funding for UDA party headquarters in Nairobi',
          description: 'Funding for UDA\'s lavish party headquarters in Nairobi attracted media and public interest regarding compliance with campaign finance rules.',
          date: '2022-01-01',
          category: 'financial',
          tags: ['funding', 'reported'],
          location: 'Nairobi',
          amount: 'KSh 300.0M',
          sourceUrl: 'https://www.standardmedia.co.ke',
        },
        {
          title: 'UDA campaigns and vote-buying allegations',
          description: 'UDA campaigns were plagued by vote-buying allegations through cash handouts and goods distribution in several counties.',
          date: '2022-06-01',
          category: 'news',
          tags: ['vote-buying', 'reported'],
          location: 'Across Kenya',
          sourceUrl: 'https://campaignwatch.tikenya.org/',
        },
      ],
      '2027': [
        {
          title: 'UDA tops 2026/27 Political Parties Fund roll with KSh 550M gazettement',
          description: 'The Registrar of Political Parties gazetted KSh 1.36B for 48 parties in Aug 2026: UDA draws KSh 549.97M and ODM KSh 293.78M, disbursed quarterly by the National Treasury. Gachagua\'s DCP and Roots Party missed out on eligibility.',
          date: '2026-08-23',
          category: 'financial',
          tags: ['PPF', 'ORPP', 'Gazette Notice'],
          location: 'Nairobi',
          amount: 'KSh 550.0M',
          sourceUrl: 'https://eastleighvoice.co.ke/headlines/392920/rutos-uda-gets-largest-share-of-political-parties-fund-with-sh549-97-million-allocation',
        },
        {
          title: 'UDA–ODM broad-based pact moves to joint manifesto and zoning talks',
          description: 'Joint UDA–ODM technical teams began crafting a shared manifesto in Aug 2026, with ODM demanding regional zoning and joint tickets as an irreducible minimum while UDA publicly opposes zoning. President Ruto declared the two parties "partners, not rivals".',
          date: '2026-08-24',
          category: 'news',
          tags: ['Broad-Based Government', 'Coalition', 'Manifesto'],
          location: 'Nairobi',
          sourceUrl: 'https://nation.africa/kenya/news/politics/details-of-uda-odm-pact-as-teams-begin-to-craft-manifesto-5569702',
        },
        {
          title: 'Ruto single-party push stalls as FORD-Kenya and Maendeleo Chap Chap refuse to fold',
          description: 'UDA pressure for Kenya Kwanza affiliates to dissolve ahead of 2027 met defiance: FORD-Kenya\'s Elementaita NEC resolved never to fold, MCC declared independence, and PAA\'s folding into UDA isolated holdouts. The ANC–UDA merger was separately nullified by the High Court.',
          date: '2026-05-15',
          category: 'news',
          tags: ['Merger', 'FORD-Kenya', 'Multiparty Democracy'],
          location: 'Nairobi',
          sourceUrl: 'https://eastleighvoice.co.ke/news/351005/rutos-unity-push-stalls-as-key-kenya-kwanza-parties-defy-pressure-to-fold-into-uda',
        },
      ],
    },
  },
  {
    id: 'odm',
    name: 'ODM',
    type: 'party',
    imageUrl: '/images/parties/odm.png',
    bio: 'Orange Democratic Movement. Led by Oburu Oginga since Raila Odinga\'s death in Oct 2025; split between the pro-pact Linda Ground camp and Sifuna\'s Linda Mwananchi rebels. Draws KSh 293.8M in the 2026/27 PPF roll.',
    searchTerms: ['ODM', 'Orange Democratic Movement', 'Orange Democratic', 'Chungwa'],
    activitiesByPeriod: {
      '2017': [
        {
          title: 'ODM PPF allocation and campaign spending (2017)',
          description: 'ODM received Political Parties Fund allocations and reported campaign expenditure during the 2017 general election cycle.',
          date: '2017-08-01',
          category: 'financial',
          tags: ['Public Records', 'PPF', 'funding'],
          location: 'Nairobi',
          amount: 'KSh 184.7M',
          sourceUrl: 'https://orpp.or.ke/document/political-parties-fund-ppf-distribution-2023/',
        },
        {
          title: 'Coalition building and campaign activities',
          description: 'ODM participated in NASA coalition activities and campaign rallies ahead of the August 2017 polls.',
          date: '2017-06-01',
          category: 'rally',
          tags: ['coalition', 'campaign'],
          location: 'Various counties, Kenya',
          sourceUrl: 'https://www.iebc.or.ke/index.php/election-results',
        },
      ],
      '2022': [
        {
          title: 'ODM PPF funding and Azimio coalition',
          description: 'ODM as part of Azimio La Umoja received PPF disbursements. Questions raised over funding for coalition campaign activities and party operations.',
          date: '2022-07-01',
          category: 'financial',
          tags: ['PPF', 'Azimio', 'reported'],
          location: 'Nairobi',
          amount: 'KSh 184.7M',
          sourceUrl: 'https://www.oagkenya.go.ke/political-parties-audit-reports/',
        },
        {
          title: 'Campaign rallies and voter outreach',
          description: 'ODM conducted rallies and voter registration drives across its stronghold regions during the 2022 campaign period.',
          date: '2022-05-01',
          category: 'rally',
          tags: ['campaign', 'rallies'],
          location: 'Nyanza, Coast, Kenya',
          sourceUrl: 'https://www.iebc.or.ke/',
        },
      ],
      '2027': [
        {
          title: 'ODM succession: Oburu elected leader as Sifuna faction purged',
          description: 'After Raila Odinga\'s death on 15 Oct 2025, Oburu Oginga became acting leader and was elected at the Mar 2026 Special Delegates Convention. SG Edwin Sifuna was ousted at the Feb 2026 Mombasa NDC, stripped of the Deputy Minority Whip post and committee seats as the Linda Mwananchi breakaway crystallised.',
          date: '2026-03-27',
          category: 'news',
          tags: ['Succession', 'NDC', 'Linda Mwananchi'],
          location: 'Jamhuri Grounds, Nairobi',
          sourceUrl: 'https://nation.africa/kenya/news/politics/winnie-odinga-to-oburu-this-is-my-vision-for-a-new-odm--5405334',
        },
        {
          title: 'ODM draws KSh 293.8M in 2026/27 PPF allocation, second to UDA',
          description: 'The ORPP gazetted 48 eligible parties sharing KSh 1.36B: ODM\'s KSh 293.78M reflects its 2022 vote share and elected-leader count under the 70/15/10 distribution formula. DCP failed the elected-representative threshold and missed out entirely.',
          date: '2026-08-23',
          category: 'financial',
          tags: ['PPF', 'ORPP', 'Gazette Notice'],
          location: 'Nairobi',
          amount: 'KSh 293.8M',
          sourceUrl: 'https://eastleighvoice.co.ke/headlines/392920/rutos-uda-gets-largest-share-of-political-parties-fund-with-sh549-97-million-allocation',
        },
        {
          title: 'Sifuna purge completed: Osotsi targeted as Oburu camp consolidates',
          description: 'Following Sifuna\'s removal as Deputy Minority Whip, ODM moved against Vihiga Senator Godfrey Osotsi\'s CPIC chairmanship in July 2026. Analysts say the purge stops short-term bleeding for the Oburu camp while boosting Sifuna\'s national sympathy profile.',
          date: '2026-07-24',
          category: 'news',
          tags: ['Discipline', 'Senate', 'Factionalism'],
          location: 'Parliament Buildings, Nairobi',
          sourceUrl: 'https://nation.africa/kenya/news/politics/after-sifuna-oburu-now-goes-for-osotsi--5535898',
        },
      ],
    },
  },
  {
    id: 'jubilee',
    name: 'Jubilee Party',
    type: 'party',
    imageUrl: '/images/parties/jubilee-official.svg',
    bio: 'Jubilee Party. Former governing party (2013–2022) under Uhuru Kenyatta; now the vehicle for Fred Matiang\'i\'s 2027 presidential bid. Ranked third in the 2026/27 PPF roll.',
    searchTerms: ['Jubilee', 'Jubilee Party', 'JP', 'Tuko Pamoja'],
    activitiesByPeriod: {
      '2017': [
        {
          title: 'Jubilee PPF and state resources during 2017 campaigns',
          description: 'Jubilee as the ruling party received significant PPF allocation. Allegations of use of state resources for campaign advantage were reported by observers.',
          date: '2017-07-01',
          category: 'financial',
          tags: ['PPF', 'reported', 'state resources'],
          location: 'Nairobi',
          amount: 'KSh 81.0M',
          sourceUrl: 'https://orpp.or.ke/administration-of-the-political-parties-fund/',
        },
      ],
      '2022': [
        {
          title: 'Jubilee split and funding disputes',
          description: 'Internal splits within Jubilee led to disputes over party funds and assets. OAG and registrar reports highlighted governance issues.',
          date: '2022-03-01',
          category: 'financial',
          tags: ['governance', 'reported'],
          location: 'Nairobi',
          sourceUrl: 'https://www.oagkenya.go.ke/political-parties-audit-reports/',
        },
      ],
      '2027': [
        {
          title: 'Jubilee fronts Matiang\'i as presidential hopeful amid polling wars',
          description: 'Jubilee backs ex-Interior CS Fred Matiang\'i for 2027, citing internal polls showing him leading in Mt Kenya and nationally outside Ukambani. Matiang\'i warns the United Opposition against hypocrisy after Jubilee\'s Ol Kalou candidate was abandoned despite its Mbeere North sacrifice for the Democratic Party.',
          date: '2026-08-10',
          category: 'news',
          tags: ['Flagbearer', 'Matiang\'i', 'By-elections'],
          location: 'Nairobi',
          sourceUrl: 'https://nation.africa/kenya/news/politics/kalonzo-matiang-i-expose-hard-road-to-one-opposition-candidate--5553518',
        },
        {
          title: 'Jubilee retains top-three PPF ranking in 2026/27 gazette',
          description: 'Jubilee placed third behind UDA and ODM among 48 parties sharing the KSh 1.36B Political Parties Fund for FY 2026/27, preserving a war chest for the August 2027 campaigns.',
          date: '2026-08-23',
          category: 'financial',
          tags: ['PPF', 'ORPP'],
          location: 'Nairobi',
          sourceUrl: 'https://thekenyatimes.com/politics/orpp-approves-48-parties-to-receive-political-parties-fund-highest-to-lowest',
        },
      ],
    },
  },
  {
    id: 'wiper',
    name: 'Wiper',
    type: 'party',
    imageUrl: '/images/parties/wiper.jpeg',
    bio: 'Wiper Patriotic Front led by Stephen Kalonzo Musyoka — now Azimio coalition leader and United Alternative Government co-principal. Launched its 2027 presidential platform in June 2026.',
    searchTerms: ['Wiper', 'Wiper Democratic Movement', 'WDM-K', 'Wiper Patriotic Front'],
    activitiesByPeriod: {
      '2017': [
        {
          title: 'NASA coalition campaign funding',
          description: 'Wiper participated in NASA joint ticket financing and eastern Kenya regional civic mobilization.',
          date: '2017-07-15',
          category: 'financial',
          tags: ['NASA', 'Coalition'],
          location: 'Machakos, Kitui',
          sourceUrl: 'https://iebc.or.ke',
        },
      ],
      '2022': [
        {
          title: 'Wiper PPF and Azimio coalition participation',
          description: 'Wiper received PPF allocations and participated in Azimio coalition campaign activities.',
          date: '2022-05-01',
          category: 'financial',
          tags: ['PPF', 'Azimio'],
          location: 'Nairobi',
          amount: 'KSh 45.3M',
          sourceUrl: 'https://orpp.or.ke/document/political-parties-fund-ppf-distribution-2023/',
        },
      ],
      '2027': [
        {
          title: 'Gachagua pushes early DCP–Wiper pact at Wamunyoro unity talks',
          description: 'Gachagua hosted Wiper leaders at Wamunyoro in Aug 2026, urging DCP and Wiper to unite first as "cousins and family" before wider opposition talks — even floating a shared Mombasa gubernatorial line-up and the Council of Governors chair for the pair.',
          date: '2026-08-19',
          category: 'rally',
          tags: ['DCP', 'Coalition Talks', 'Wamunyoro'],
          location: 'Wamunyoro, Nyeri',
          sourceUrl: 'https://www.the-star.co.ke/news/2026-08-19-gachagua-pushes-for-an-early-dcp-wiper-deal',
        },
        {
          title: 'Kalonzo launches 2027 flagship agenda, declares Ruto "one-term"',
          description: 'Kalonzo unveiled his presidential platform in June 2026 without inviting co-principals Gachagua, Matiang\'i and Karua — a deliberate sequencing he defended as strategy, insisting the United Alternative Government "will stand together until we liberate this country".',
          date: '2026-06-07',
          category: 'rally',
          tags: ['Flagbearer', 'Manifesto', 'UAG'],
          location: 'Nairobi',
          sourceUrl: 'https://www.the-star.co.ke/news/2026-06-07-kalonzo-why-i-didnt-invite-gachagua-karua-at-my-event',
        },
      ],
    },
  },
  {
    id: 'azimio',
    name: 'Azimio La Umoja',
    type: 'party',
    imageUrl: '/images/parties/azimio.jpg',
    bio: 'Azimio La Umoja One Kenya Coalition. Now led by Kalonzo Musyoka with Uhuru Kenyatta chairing its council; pursuing a Narc-style super-coalition rebrand for the 10 Aug 2027 election.',
    searchTerms: ['Azimio', 'Azimio La Umoja', 'Azimio coalition', 'One Kenya'],
    activitiesByPeriod: {
      '2022': [
        {
          title: 'Azimio coalition funding and campaign spending',
          description: 'The Azimio coalition brought together multiple parties. Reporting on combined campaign spending and donor transparency was scrutinized during the campaign.',
          date: '2022-06-01',
          category: 'financial',
          tags: ['coalition', 'funding'],
          location: 'Nairobi',
          sourceUrl: 'https://www.oagkenya.go.ke/public-funded-political-parties/',
        },
        {
          title: 'Coalition rallies and nationwide campaign activities',
          description: 'Azimio held major rallies across the country in the run-up to the August 2022 election.',
          date: '2022-07-01',
          category: 'rally',
          tags: ['campaign', 'rallies'],
          location: 'Various counties, Kenya',
          sourceUrl: 'https://www.iebc.or.ke/index.php/election-results',
        },
      ],
      '2027': [
        {
          title: 'Uhuru chairs Azimio council on Narc-style super-coalition rebrand',
          description: 'Uhuru Kenyatta convened the Azimio Coalition Council in Aug 2026 to reorganise the outfit into a broader opposition coalition that lets parties keep their identities. Kalonzo, mandated to lead outreach, was authorised to engage DCP, PLP, UGM and Linda Mwananchi.',
          date: '2026-08-04',
          category: 'news',
          tags: ['Rebrand', 'Super-Coalition', 'Uhuru Kenyatta'],
          location: 'Nairobi',
          sourceUrl: 'https://nation.africa/kenya/news/politics/uhuru-kenyatta-super-coalition-plan-against-president-ruto-5543884',
        },
        {
          title: 'Azimio among three registered coalitions as party count hits 90',
          description: 'ORPP Registrar John Cox Lorionokou told MPs in Jan 2026 that Kenya has 90 fully registered parties, 33 provisionally registered and three coalitions — Azimio, Kenya Kwanza and the Taifa Democratic Coalition — with 32 more outfits awaiting clearance before 2027.',
          date: '2026-01-28',
          category: 'financial',
          tags: ['ORPP', 'Registration', 'Coalitions'],
          location: 'Naivasha',
          sourceUrl: 'https://nation.africa/kenya/news/32-new-parties-apply-for-registration-ahead-of-2027-elections-5341634',
        },
      ],
    },
  },
  {
    id: 'anc',
    name: 'ANC',
    type: 'party',
    imageUrl: '/images/parties/anc.png',
    bio: 'Amani National Congress. Merged into UDA at State House in Jan 2025 — then dramatically resurrected when the High Court nullified the dissolution gazette in 2026. Fully registered and operational again.',
    searchTerms: ['ANC', 'Amani National Congress', 'Amani'],
    activitiesByPeriod: {
      '2022': [
        {
          title: 'Kenya Kwanza Alliance coalition agreement and campaign pooling',
          description: 'ANC signed formal coalition financing and power-sharing agreements within Kenya Kwanza.',
          date: '2022-04-10',
          category: 'financial',
          tags: ['Coalition', 'Kenya Kwanza'],
          location: 'Nairobi',
          amount: 'KSh 26.5M',
          sourceUrl: 'https://orpp.or.ke',
        },
      ],
      '2027': [
        {
          title: 'State House ANC–UDA merger unravels as court restores ANC',
          description: 'The Jan 2025 merger that made Issa Timamy a UDA deputy party leader collapsed when Justice Bahati Mwamuye quashed Gazette Notice No. 3449, ruling members were excluded from the decision. Registrar Lorionokou confirmed ANC "is a fully registered political party" with offices and assets restored.',
          date: '2026-04-01',
          category: 'news',
          tags: ['Merger', 'High Court', 'ORPP'],
          location: 'Milimani Law Courts, Nairobi',
          sourceUrl: 'https://nation.africa/kenya/news/politics/merger-mirage-why-kenya-kwanza-parties-are-reluctant-to-close-shop-5410622',
        },
        {
          title: 'ANC statutory accounts disclosure to Auditor General',
          description: 'Party filed audited financial books with the Registrar of Political Parties in full statutory compliance.',
          date: '2024-02-18',
          category: 'financial',
          tags: ['Audited Accounts', 'ORPP'],
          location: 'Nairobi',
          sourceUrl: 'https://orpp.or.ke',
        },
      ],
    },
  },
  {
    id: 'dcp',
    name: 'DCP',
    type: 'party',
    imageUrl: '/images/parties/dcp.png',
    bio: 'Democracy for the Citizens Party. Rigathi Gachagua\'s outfit — registered 3 Feb 2025 (Cert. No. 103), symbol the listening ear, slogan "Skiza Wakenya". Won the Ol Kalou parliamentary by-election and holds an MP plus MCAs, but missed 2026/27 PPF eligibility.',
    searchTerms: ['DCP', 'Democracy for the Citizens Party', 'Democracy for Citizens Party', 'Skiza Wakenya', 'Listening Ear Party'],
    activitiesByPeriod: {
      '2027': [
        {
          title: 'Gachagua unveils DCP with listening-ear symbol and neon green colours',
          description: 'Gachagua launched the Democracy for the Citizens Party on 15 May 2025 with Cleophas Malala as interim deputy leader — his public divorce from UDA. Colours green, brown, white and black symbolise renewal and peace; motto "Justice, Unity and Progress".',
          date: '2025-05-15',
          category: 'rally',
          tags: ['Launch', 'Skiza Wakenya', 'Mt Kenya'],
          location: 'Nairobi',
          sourceUrl: 'https://www.theeastafrican.co.ke/tea/news/east-africa/gachagua-unveils-party-to-take-on-ruto-come-2027-5044748',
        },
        {
          title: 'DCP storms parliament with Ol Kalou by-election victory',
          description: 'DCP\'s Sammy Kamau won the Ol Kalou parliamentary by-election, handing Gachagua his first MP and three MCAs nationwide. The party celebrated with a thanksgiving rally and declared targets of majority status in both Houses in 2027 — but allies cried foul after Jubilee\'s candidate was abandoned there.',
          date: '2026-07-26',
          category: 'news',
          tags: ['By-election', 'Ol Kalou', 'Parliament'],
          location: 'Ol Kalou, Nyandarua',
          sourceUrl: 'https://nation.africa/kenya/news/politics/gachagua-unveils-2027-mt-kenya-strategy-after-ol-kalou-victory-5538122',
        },
        {
          title: 'Kang\'ata and Yusuf Hassan defect to DCP as Mt Kenya machine grows',
          description: 'Murang\'a Governor Irungu Kang\'ata (July 2026) and Kamukunji MP Yusuf Hassan (Aug 2026) quit UDA and Jubilee respectively for DCP, terming it "the party of the moment". Gachagua multi-county tours through Kiambu, Kajiado, Narok and Nakuru cemented the ground operation.',
          date: '2026-08-25',
          category: 'rally',
          tags: ['Defections', 'Grassroots', '2027'],
          location: 'Wamunyoro, Nyeri',
          sourceUrl: 'https://capitalfm.africa/yussuf-hassan-quits-uhurus-jubilee-for-dcp-as-gachagua-camp-expands-2027-base',
        },
      ],
    },
  },
  {
    id: 'plp',
    name: 'PLP',
    type: 'party',
    imageUrl: '/images/parties/plp.png',
    bio: 'People\'s Liberation Party. Martha Karua\'s rebrand of NARC-Kenya (Feb 2025) — purple rose, "Unite • Liberate". Karua will contest the 2027 presidency on a PLP ticket inside the United Opposition.',
    searchTerms: ['PLP', 'People\'s Liberation Party', 'Peoples Liberation Party', 'NARC-Kenya', 'Narc Kenya'],
    activitiesByPeriod: {
      '2027': [
        {
          title: 'Karua rebrands NARC-Kenya into PLP alongside united opposition bigwigs',
          description: 'The 27 Feb 2025 unveiling united Karua with Gachagua, Kalonzo, Wamalwa and Jimmy Wanjigi behind the 2027 one-term bid. President Ruto dismissed the launch as personality-driven, challenging PLP to table policies on housing, UHC and jobs.',
          date: '2025-02-27',
          category: 'rally',
          tags: ['Launch', 'Rebrand', 'United Opposition'],
          location: 'Nairobi',
          sourceUrl: 'https://citizen.digital/article/they-are-conmen-ruto-responds-to-leaders-at-martha-karuas-peoples-liberation-party-launch-n358429',
        },
        {
          title: 'Karua vows PLP presidential ticket, rejects one-party drift',
          description: 'Touring Murang\'a in July 2026, Karua opened PLP offices in Mathioya and Kangema, vowed never to dissolve the party and insisted she would face Ruto on the ballot: "I have what it takes to return this country to the path of rule of law." Deputy leader Peter Kagwanja endorsed her as the coalition\'s most suitable flagbearer.',
          date: '2026-07-31',
          category: 'rally',
          tags: ['Flagbearer', 'Murang\'a', 'Multiparty'],
          location: 'Murang\'a',
          sourceUrl: 'https://nation.africa/kenya/news/politics/karua-nothing-short-of-the-presidency-for-me-5543082',
        },
        {
          title: 'Karua announces Oct 9 People\'s Forum on electoral preparedness',
          description: 'Flanked by Kalonzo, Matiang\'i, Wamalwa, Orengo and Maraga at Hermosa Hotel, Karua announced a citizens\' forum bringing parties, churches, civil society and youth together to prevent violence: "a contest of ballots, not bullets." Coordination sits with Maraga, Justin Muturi and Caroli Omondi.',
          date: '2026-08-19',
          category: 'news',
          tags: ['Peace', 'Electoral Integrity', 'Civil Society'],
          location: 'Hermosa Hotel, Nairobi',
          sourceUrl: 'https://nation.africa/kenya/news/politics/opposition-sets-october-9-date-for-people-s-forum-to-guard-2027-election-5564052',
        },
      ],
    },
  },
  {
    id: 'ford-kenya',
    name: 'FORD-Kenya',
    type: 'party',
    imageUrl: '/images/parties/ford-kenya.png',
    bio: 'Forum for the Restoration of Democracy – Kenya. The country\'s second-oldest party under Speaker Moses Wetang’ula; refused to fold into UDA and is rebranding youth-friendly for 2027.',
    searchTerms: ['FORD-Kenya', 'Ford Kenya', 'Simba Party', 'Wetangula Party'],
    activitiesByPeriod: {
      '2022': [
        {
          title: 'FORD-Kenya statutory campaign disclosures',
          description: 'Party declared regional expenditure across Western Kenya and parliamentary nomination revenues.',
          date: '2022-05-25',
          category: 'financial',
          tags: ['Nomination Fees', 'Expenditure'],
          location: 'Bungoma, Trans Nzoia',
          amount: 'KSh 25.8M',
          sourceUrl: 'https://orpp.or.ke',
        },
      ],
      '2027': [
        {
          title: 'FORD-Kenya Elementaita NEC: "will not fold or merge with any party"',
          description: 'Speaker Wetang’ula\'s NEC resolved the second-oldest party will never dissolve into UDA, ordered a three-month youth-friendly rebrand to raid ex-ANC Western strongholds, and directed candidates for all by-elections including Malava, Ugunja and Banissa.',
          date: '2025-04-12',
          category: 'news',
          tags: ['Defiance', 'Rebrand', 'Western Kenya'],
          location: 'Elementaita, Nakuru',
          sourceUrl: 'https://nation.africa/kenya/news/politics/ruto-s-narrowing-path-to-re-election-in-2027-5005656',
        },
      ],
    },
  },
  {
    id: 'kanu',
    name: 'KANU',
    type: 'party',
    imageUrl: '/images/parties/kanu.png',
    bio: 'Kenya African National Union. Historic independence party under Gideon Moi, still fully registered as ORPP counts 90 parties and vets 32 more ahead of 2027.',
    searchTerms: ['KANU', 'Kenya African National Union', 'Jogoo'],
    activitiesByPeriod: {
      '2017': [        {
          title: 'KANU statutory property and investment portfolio audit',
          description: 'Auditor General review of KANU real estate investments and statutory allocations.',
          date: '2017-09-12',
          category: 'financial',
          tags: ['Audit', 'Assets'],
          location: 'Nairobi',
          sourceUrl: 'https://oagkenya.go.ke',
        },
      ],
      '2022': [
        {
          title: 'KANU coalition campaign spending in One Kenya Alliance',
          description: 'Expenditure filings and voter outreach programs documented in the 2022 election cycle.',
          date: '2022-06-18',
          category: 'rally',
          tags: ['Rally', 'OKA'],
          location: 'Baringo, Rift Valley',
          amount: 'KSh 14.5M',
          sourceUrl: 'https://orpp.or.ke',
        },
      ],
      '2027': [
        {
          title: 'KANU survives registration cull as ORPP deregisters two parties',
          description: 'While the Registrar struck Ukweli Party and Vibrant Democratic Party off the roll in Jan 2026 — before reinstating Ukweli for Boniface Mwangi\'s bid — independence-era KANU retained full registration among the 90 parties cleared toward the Aug 2027 polls.',
          date: '2026-01-28',
          category: 'news',
          tags: ['ORPP', 'Registration', 'Compliance'],
          location: 'Naivasha',
          sourceUrl: 'https://nation.africa/kenya/news/32-new-parties-apply-for-registration-ahead-of-2027-elections-5341634',
        },
      ],
    },
  },
  {
    id: 'dap-k',
    name: 'DAP-K',
    type: 'party',
    imageUrl: '/images/parties/dap-k.png',
    bio: 'Democratic Action Party – Kenya. Eugene Wamalwa\'s outfit and United Alternative Government pillar with a strong Western Kenya footprint.',
    searchTerms: ['DAP-K', 'Democratic Action Party', 'Chui Party', 'Wamalwa Party'],
    activitiesByPeriod: {
      '2022': [
        {
          title: 'DAP-K initial statutory audit and registration filings',
          description: 'Office of the Registrar of Political Parties approved initial statutory compliance accounts.',
          date: '2022-03-30',
          category: 'financial',
          tags: ['ORPP', 'Compliance'],
          location: 'Nairobi',
          amount: 'KSh 12.1M',
          sourceUrl: 'https://orpp.or.ke',
        },
      ],
      '2027': [
        {
          title: 'Wamalwa anchors United Opposition talks as DAP-K principal',
          description: 'Wamalwa joined Kalonzo and Gachagua in the Aug 2026 unity consultations and the Mombasa Tononoka rally, declaring the alliance "a deliberate covenant" while DAP-K positions for Western Kenya seats left vacant by the ANC saga.',
          date: '2026-08-04',
          category: 'rally',
          tags: ['UAG', 'Western Kenya', 'Unity Talks'],
          location: 'Nairobi',
          sourceUrl: 'https://capitalfm.africa/kalonzo-hosts-gachagua-wamalwa-in-latest-bid-to-build-united-opposition',
        },
      ],
    },
  },
];

const POLITICIANS: IntelligenceEntity[] = [
  {
    id: 'william-ruto',
    name: 'William Ruto',
    type: 'politician',
    imageUrl: '/images/politicians/william-ruto.jpg',
    bio: 'Fifth President of Kenya (since Sept 2022) and UDA party leader. Governing through a broad-based pact with ODM toward the 10 Aug 2027 election, with IEBC reconstituted under Erastus Ethekon.',
    searchTerms: ['William Ruto', 'Ruto', 'President Ruto', 'William Samoei Ruto', 'Samoei'],
    activitiesByPeriod: {
      '2017': [
        {
          title: 'Jubilee campaign and harambee donations',
          description: 'As Deputy President, William Ruto was active in Jubilee campaigns. His harambee donations and fundraising activities attracted intense civic and media coverage.',
          date: '2017-05-01',
          category: 'financial',
          tags: ['Jubilee', 'harambee', 'reported'],
          location: 'Various counties, Kenya',
          sourceUrl: 'https://www.standardmedia.co.ke',
        },
      ],
      '2022': [
        {
          title: 'Questions raised over sources of funds for hustler movement and harambee donations by DP Ruto',
          description: 'Civil society organizations questioned the sources of private funds mobilized for the hustler nation campaign network and nationwide church donations.',
          date: '2021-08-01',
          category: 'financial',
          tags: ['Public Records', 'reported'],
          location: 'Various counties, Kenya',
          sourceUrl: 'https://tikenya.org/',
        },
        {
          title: 'Weston Hotel land ownership dispute resurfaces as integrity criticism',
          description: 'Weston Hotel land ownership dispute resurfaced as a key point of integrity scrutiny against DP Ruto regarding historical land acquisition.',
          date: '2021-03-01',
          category: 'news',
          tags: ['reported', 'integrity'],
          location: 'Nairobi',
          amount: 'KSh 300.0M',
          sourceUrl: 'https://www.nation.co.ke',
        },
        {
          title: 'DP Ruto accused of using state vehicles and resources for early campaigns',
          description: 'Watchdog coalitions reported concerns regarding official government transport logistics and state security details during early political tours.',
          date: '2021-01-01',
          category: 'news',
          tags: ['reported', 'state resources'],
          location: 'Across Kenya',
          sourceUrl: 'https://campaignwatch.tikenya.org/',
        },
        {
          title: 'UDA campaigns and vote-buying allegations',
          description: 'Civil society observers documented alleged voter inducement and cash disbursements during competitive parliamentary by-elections.',
          date: '2022-06-01',
          category: 'news',
          tags: ['vote-buying', 'reported'],
          location: 'Across Kenya',
          sourceUrl: 'https://campaignwatch.tikenya.org/',
        },
      ],
      '2027': [
        {
          title: 'Ethekon IEBC sworn in to run 24 by-elections and 2027 polls',
          description: 'President Ruto gazetted lawyer Erastus Edung Ethekon as IEBC chair with six commissioners on 10 July 2025 after a court-ordered re-gazettement. The team ran 24 by-elections on 27 Nov 2025 and now prepares the 10 Aug 2027 General Election amid a Sh1B funding shortfall.',
          date: '2025-07-11',
          category: 'news',
          tags: ['IEBC', 'Ethekon', 'By-elections'],
          location: 'Supreme Court Buildings, Nairobi',
          sourceUrl: 'https://www.the-star.co.ke/news/2025-07-11-iebc-chair-ethekon-six-commissioners-sworn-in',
        },
        {
          title: 'IEBC proposes mandatory campaign bank accounts and spending ceilings',
          description: 'Draft Election Campaign Financing Regulations 2026 compel every candidate and party to appoint finance managers, open designated campaign accounts and declare all donations — the strictest attempt yet to enforce spending limits after Parliament scuttled the 2017 regulations.',
          date: '2026-07-30',
          category: 'financial',
          tags: ['IEBC', 'Spending Limits', 'Disclosure'],
          location: 'Nairobi',
          sourceUrl: 'https://eastleighvoice.co.ke/news/385088/iebc-proposes-stricter-campaign-finance-rules-ahead-of-2027-polls',
        },
        {
          title: '"UDA and ODM are partners, not rivals" — Ruto cements broad-based pact',
          description: 'With joint UDA–ODM manifesto teams mapping zoning and joint tickets, Ruto publicly framed the former rivals as transformation partners under the Broad-Based Government, even as ODM factions war over the deal and Sifuna calls the MoU "dead".',
          date: '2026-09-13',
          category: 'news',
          tags: ['Broad-Based Government', 'ODM', '2027'],
          location: 'Nairobi',
          sourceUrl: 'https://capitalfm.africa/ruto-uda-and-odm-are-partners-not-rivals',
        },
        {
          title: 'State House administration expenditure audit and campaign finance compliance',
          description: 'Auditor General and parliamentary scrutiny of executive travel budgets and statutory asset disclosures under the Leadership and Integrity Act.',
          date: '2024-03-15',
          category: 'financial',
          tags: ['Executive Audit', 'Integrity Act'],
          location: 'State House, Nairobi',
          sourceUrl: 'https://oagkenya.go.ke',
        },
      ],
    },
  },
  {
    id: 'rigathi-gachagua',
    name: 'Rigathi Gachagua',
    type: 'politician',
    imageUrl: '/images/politicians/rigathi-gachagua.jpg',
    bio: 'Former Deputy President (2022–Oct 2024), impeached by Parliament and barred from office for 10 years — a ban he is challenging in the Court of Appeal. Now DCP party leader and United Opposition kingpin plotting a one-term Ruto presidency.',
    searchTerms: ['Rigathi Gachagua', 'Gachagua', 'Rigathi', 'Riggy G'],
    activitiesByPeriod: {
      '2022': [
        {
          title: 'Court orders forfeiture of Gachagua funds in corruption case',
          description: 'The High Court ordered the forfeiture of funds linked to Rigathi Gachagua in an unexplained wealth probe, drawing national attention to campaign-era financial disclosures.',
          date: '2022-07-28',
          category: 'financial',
          tags: ['Public Records', 'reported', 'court'],
          location: 'Nairobi',
          amount: 'KSh 202M',
          sourceUrl: 'https://www.standardmedia.co.ke',
        },
        {
          title: 'Campaign fundraising role and UDA Mt. Kenya mobilization',
          description: 'Rigathi Gachagua was the central coordinator for UDA grassroots logistics, transport convoys, and rally financing across Mt. Kenya region.',
          date: '2022-05-01',
          category: 'rally',
          tags: ['UDA', 'campaign'],
          location: 'Central Kenya',
        },
      ],
      '2027': [
        {
          title: 'Gachagua launches DCP, vows August 2027 date with Ruto',
          description: 'Unveiling the Democracy for the Citizens Party on 15 May 2025, Gachagua told Ruto "we have a date with you in August 2027", invoking the June 2024 protests. Though law bars him for 10 years from his Oct 2024 impeachment, LSK voices argue he stays eligible while appeals run.',
          date: '2025-05-15',
          category: 'rally',
          tags: ['DCP Launch', 'Impeachment', 'Eligibility'],
          location: 'Nairobi',
          sourceUrl: 'https://www.theeastafrican.co.ke/tea/news/east-africa/gachagua-unveils-party-to-take-on-ruto-come-2027-5044748',
        },
        {
          title: 'Impeachment proceedings and asset declaration review',
          description: 'National Assembly and Senate proceedings examined declared property holdings, commercial companies, and public procurement disclosures.',
          date: '2024-10-08',
          category: 'financial',
          tags: ['Hansard', 'Parliament', 'Asset Audit'],
          location: 'Parliament Buildings, Nairobi',
          amount: 'KSh 5.2B',
          sourceUrl: 'https://parliament.go.ke',
        },
        {
          title: 'Embu offensive: Gachagua endorses Mukunji for governor on DCP ticket',
          description: 'In Manyatta in Aug 2026 Gachagua accused Ruto of funding briefcase parties to split Mt Kenya votes, endorsed MP Gitonga Mukunji to unseat Governor Cecily Mbarire, and warned "all traitors will be shown the exit" — as Kindiki vowed to floor him in the region.',
          date: '2026-08-22',
          category: 'rally',
          tags: ['Mt Kenya', 'Embu', 'DCP'],
          location: 'Manyatta, Embu',
          sourceUrl: 'https://nation.africa/kenya/news/politics/gachagua-i-will-block-ruto-s-plans-to-split-mt-kenya-5567420',
        },
      ],
    },
  },
  {
    id: 'kalonzo-musyoka',
    name: 'Kalonzo Musyoka',
    type: 'politician',
    imageUrl: '/images/politicians/kalonzo-musyoka.jpg',
    bio: 'Wiper leader, Azimio coalition leader and United Alternative Government co-principal. Launched his 2027 presidential platform in June 2026 and leads opposition unity talks toward a single flagbearer.',
    searchTerms: ['Kalonzo Musyoka', 'Kalonzo', 'Musyoka', 'Stephen Kalonzo Musyoka', 'SKM'],
    activitiesByPeriod: {
      '2017': [
        {
          title: 'NASA presidential running mate campaign accounts filing',
          description: 'Kalonzo Musyoka ran as deputy presidential candidate on the NASA ticket; coalition expenditure declarations were submitted to IEBC.',
          date: '2017-08-05',
          category: 'financial',
          tags: ['NASA', 'IEBC', 'Campaign Expenditure'],
          location: 'Nairobi',
          sourceUrl: 'https://iebc.or.ke',
        },
      ],
      '2022': [
        {
          title: 'One Kenya Alliance resource pooling and Azimio coalition pact',
          description: 'Kalonzo navigated OKA coalition talks and later joined Azimio La Umoja, agreeing on regional campaign finance and rally distribution.',
          date: '2022-04-20',
          category: 'financial',
          tags: ['OKA', 'Azimio', 'Coalition Agreement'],
          location: 'Nairobi',
          sourceUrl: 'https://orpp.or.ke',
        },
        {
          title: 'Yatta land ownership inquiry cleared by National Land Commission',
          description: 'Longstanding allegations regarding ownership of the Yatta farm were reviewed and deliberated upon in public integrity forums.',
          date: '2021-01-22',
          category: 'news',
          tags: ['Integrity', 'Land Commission'],
          location: 'Machakos',
          sourceUrl: 'https://nation.africa',
        },
      ],
      '2027': [
        {
          title: 'Kalonzo warns rigged polls could pick the opposition ticket',
          description: 'Rejecting surveys that ranked a Kalonzo–Sifuna ticket at 23%, Kalonzo warned "intelligence community" numbers could manipulate the flagbearer race — but said he could back Sifuna, Gachagua, Wamalwa, Karua or Matiang\'i: "If we hold together, it matters not who is flagbearer."',
          date: '2026-08-10',
          category: 'news',
          tags: ['Opinion Polls', 'Flagbearer', 'Unity'],
          location: 'Nairobi',
          sourceUrl: 'https://capitalfm.africa/kalonzo-i-can-back-sifuna-but-polls-must-not-pick-opposition-ticket',
        },
        {
          title: 'Opposition alleges Ruto moles and ODM raid at Tononoka rally',
          description: 'At the Apr 2026 Mombasa rally Kalonzo, Gachagua, Muturi and Wamalwa claimed State moles infest the opposition and accused Ruto of plotting to "obliterate" ODM after Raila\'s death — demanding a public inquest into the rapid 72-hour burial and missing postmortem.',
          date: '2026-04-25',
          category: 'rally',
          tags: ['Moles', 'ODM', 'Inquest'],
          location: 'Tononoka Grounds, Mombasa',
          sourceUrl: 'https://nation.africa/kenya/news/politics/ruto-has-moles-within-united-opposition-kalonzo-gachagua-camp-now-claim-5436292',
        },
        {
          title: 'Opposition coalition transparency initiative and 2027 strategy',
          description: 'Kalonzo Musyoka announced public auditing protocols for opposition campaigns and spearheaded civic voter registration rallies.',
          date: '2024-06-11',
          category: 'rally',
          tags: ['Voter Mobilization', 'Audit'],
          location: 'Machakos, Nairobi',
          sourceUrl: 'https://wiper.co.ke',
        },
      ],
    },
  },
  {
    id: 'musalia-mudavadi',
    name: 'Musalia Mudavadi',
    type: 'politician',
    imageUrl: '/images/politicians/musalia-mudavadi.jpg',
    bio: 'Prime Cabinet Secretary and Foreign Affairs CS. Folded ANC into UDA in Jan 2025, then watched the High Court resurrect the party in 2026 — a saga Luhya leaders call a betrayal of community bargaining power.',
    searchTerms: ['Musalia Mudavadi', 'Mudavadi', 'Musalia', 'Wycliffe Musalia Mudavadi'],
    activitiesByPeriod: {
      '2017': [
        {
          title: 'NASA campaign chief strategist and coordination financing',
          description: 'Mudavadi chaired the NASA campaign coordinating committee responsible for fundraising and rally scheduling.',
          date: '2017-06-15',
          category: 'rally',
          tags: ['NASA', 'Strategy'],
          location: 'Nairobi',
          sourceUrl: 'https://iebc.or.ke',
        },
      ],
      '2022': [
        {
          title: 'ANC and Kenya Kwanza coalition funding pact',
          description: 'Musalia Mudavadi led ANC into the Kenya Kwanza coalition following the "Earthquake" convention. Party and coalition funding sources were subjected to statutory oversight.',
          date: '2022-01-23',
          category: 'financial',
          tags: ['ANC', 'Kenya Kwanza', 'coalition'],
          location: 'Bomas of Kenya, Nairobi',
          sourceUrl: 'https://www.oagkenya.go.ke/public-funded-political-parties/',
        },
      ],
      '2027': [
        {
          title: 'Mudavadi under fire as ANC dissolution collapses in court',
          description: 'Luhya leaders at Cyrus Jirongo\'s burial accused Mudavadi of surrendering community leverage by dissolving ANC, while ex-allies launched the Democratic National Alliance (DNA) to inherit Western backing. Analysts say retaining a party structure would have preserved 2027 bargaining chips.',
          date: '2026-04-01',
          category: 'news',
          tags: ['ANC', 'Western Kenya', 'Backlash'],
          location: 'Lugari, Kakamega',
          sourceUrl: 'https://nation.africa/kenya/news/politics/merger-mirage-why-kenya-kwanza-parties-are-reluctant-to-close-shop-5410622',
        },
        {
          title: 'Prime Cabinet Secretary office expenditure audit',
          description: 'Statutory audit of ministerial disbursements and foreign diaspora mission engagements reviewed by Auditor General.',
          date: '2024-04-05',
          category: 'financial',
          tags: ['Auditor General', 'Public Expenditure'],
          location: 'Nairobi',
          sourceUrl: 'https://oagkenya.go.ke',
        },
      ],
    },
  },
  {
    id: 'kithure-kindiki',
    name: 'Kithure Kindiki',
    type: 'politician',
    imageUrl: '/images/politicians/kithure-kindiki.jpg',
    bio: 'Deputy President of Kenya (since Nov 2024) and UDA deputy party leader. Brokered the ANC merger, rallies Mt Kenya grassroots for Ruto\'s 2027 re-election and vows to "floor Gachagua" in the region.',
    searchTerms: ['Kithure Kindiki', 'Kindiki', 'Deputy President Kindiki', 'Prof Kindiki'],
    activitiesByPeriod: {
      '2022': [
        {
          title: 'Kenya Kwanza Chief Legal Agent in 2022 presidential election',
          description: 'Prof. Kindiki managed the presidential legal team, supreme court defense filings, and tallying verification center logistics.',
          date: '2022-08-20',
          category: 'news',
          tags: ['Legal Agent', 'Supreme Court', 'IEBC'],
          location: 'Supreme Court of Kenya, Nairobi',
          sourceUrl: 'https://judiciary.go.ke',
        },
      ],
      '2027': [
        {
          title: 'Kindiki vows to floor Gachagua in Mt Kenya supremacy battle',
          description: 'As UDA deputy party leader, Kindiki leads grassroots mobilisation to defend Ruto\'s Mt Kenya backyard against DCP\'s wave — trading barbs with Gachagua over the Gen-Z crackdown, illicit brews and multi-county opposition tours through Kiambu, Kajiado, Narok and Nakuru.',
          date: '2026-08-22',
          category: 'rally',
          tags: ['Mt Kenya', 'UDA', 'DCP Rivalry'],
          location: 'Central Kenya',
          sourceUrl: 'https://nation.africa/kenya/news/politics/gachagua-i-will-block-ruto-s-plans-to-split-mt-kenya-5567420',
        },
        {
          title: 'Statutory wealth declaration and deputy presidential ethics filing',
          description: 'Declared assets and financial interests submitted to the Ethics and Anti-Corruption Commission upon assumption of Deputy President office.',
          date: '2024-11-01',
          category: 'financial',
          tags: ['EACC', 'Asset Declaration', 'Integrity'],
          location: 'EACC Integrity Centre, Nairobi',
          sourceUrl: 'https://eacc.go.ke',
        },
      ],
    },
  },
  {
    id: 'martha-karua',
    name: 'Martha Karua',
    type: 'politician',
    imageUrl: '/images/politicians/martha-karua.jpg',
    bio: 'People\'s Liberation Party leader (NARC-Kenya rebranded Feb 2025) and United Opposition co-convenor. Vows to contest the 2027 presidency on a PLP ticket on a rule-of-law platform.',
    searchTerms: ['Martha Karua', 'Karua', 'Martha Wangari Karua', 'Iron Lady'],
    activitiesByPeriod: {
      '2017': [
        {
          title: 'Kirinyaga gubernatorial election transparency petition',
          description: 'Karua challenged gubernatorial results, highlighting campaign bribery allegations and tallying anomalies in court filings.',
          date: '2017-09-01',
          category: 'financial',
          tags: ['Election Petition', 'Bribery Allegations'],
          location: 'Kerugoya Law Courts, Kirinyaga',
          sourceUrl: 'https://judiciary.go.ke',
        },
      ],
      '2022': [
        {
          title: 'Azimio vice presidential campaign integrity declaration',
          description: 'As presidential running mate, Karua campaigned on an explicit zero-tolerance anti-corruption agenda and published campaign donation guidelines.',
          date: '2022-05-16',
          category: 'news',
          tags: ['Integrity', 'Anti-Corruption', 'Campaign Finance'],
          location: 'KICC, Nairobi',
          sourceUrl: 'https://nation.africa',
        },
      ],
      '2027': [
        {
          title: '"Nothing short of the presidency" — Karua opens PLP offices in Murang\'a',
          description: 'Karua toured Mathioya and Kangema opening PLP offices, swore she would never dissolve the party, and framed the race as constitutionalism vs impunity. PLP deputy leader Peter Kagwanja endorsed her as the opposition\'s most suitable flagbearer.',
          date: '2026-07-31',
          category: 'rally',
          tags: ['PLP', 'Flagbearer', 'Murang\'a'],
          location: 'Murang\'a',
          sourceUrl: 'https://nation.africa/kenya/news/politics/karua-nothing-short-of-the-presidency-for-me-5543082',
        },
        {
          title: 'Civic constitutional vigilance and public debt litigation',
          description: 'Participated in civic interest litigation challenging unconstitutional levies and advocating for open procurement contracting.',
          date: '2024-02-14',
          category: 'news',
          tags: ['Public Interest', 'High Court', 'Watchdog'],
          location: 'Milimani Law Courts, Nairobi',
          sourceUrl: 'https://kenyalaw.org',
        },
      ],
    },
  },
  {
    id: 'fred-matiangi',
    name: "Fred Matiang'i",
    type: 'politician',
    imageUrl: '/images/politicians/fred-matiangi.jpg',
    bio: 'Former Interior Cabinet Secretary and Jubilee Party\'s 2027 presidential hopeful. United Opposition co-principal polling strongly in Mt Kenya; insists the alliance must build the team before picking its captain.',
    searchTerms: ["Fred Matiang'i", 'Matiangi', 'Matiang’i', 'Fred Okengo Matiangi'],
    activitiesByPeriod: {
      '2027': [
        {
          title: 'Matiang\'i exposes "hypocrisy" in united opposition over by-election deals',
          description: 'Matiang\'i revealed Jubilee withdrew its Mbeere North candidate for the Democratic Party under a reciprocity pact that was not honoured in Ol Kalou, warning: "If we do not do away with that hypocrisy, we risk bungling 2027." He demanded team-first discipline over dominant-figure politics.',
          date: '2026-08-10',
          category: 'news',
          tags: ['Jubilee', 'By-elections', 'Unity'],
          location: 'Nairobi',
          sourceUrl: 'https://nation.africa/kenya/news/politics/kalonzo-matiang-i-expose-hard-road-to-one-opposition-candidate--5553518',
        },
        {
          title: 'Internal polls place Matiang\'i ahead in Mt Kenya, second only in Ukambani',
          description: 'Jubilee deputy SG Zack Kinuthia claimed alliance polling showed "seven of ten in Mt Kenya" preferring Matiang\'i and nine of ten outside it — numbers Kalonzo\'s camp dismisses as State-manipulated perception management.',
          date: '2026-05-22',
          category: 'news',
          tags: ['Opinion Polls', 'Jubilee', 'Flagbearer'],
          location: 'Nairobi',
          sourceUrl: 'https://nation.africa/kenya/news/politics/2027-irony-president-with-falling-approval-facing-disunited-opposition--5468760',
        },
      ],
    },
  },
  {
    id: 'edwin-sifuna',
    name: 'Edwin Sifuna',
    type: 'politician',
    imageUrl: '/images/politicians/edwin-sifuna.jpg',
    bio: 'Nairobi Senator and face of the Linda Mwananchi rebellion. Ousted as ODM Secretary-General in Feb 2026 for calling the UDA pact "dead"; now courted as a 2027 presidential prospect with Orengo and Natembeya.',
    searchTerms: ['Edwin Sifuna', 'Sifuna', 'Nairobi Senator Sifuna'],
    activitiesByPeriod: {
      '2027': [
        {
          title: 'ODM expels Sifuna as SG and strips Senate leadership roles',
          description: 'Sifuna was removed in absentia at the Feb 2026 Mombasa NDC, then axed as Deputy Minority Whip and from the Oburu-chaired Energy Committee for "gross misconduct" over his attacks on the UDA pact and the Nyota Fund. TIFA found his Linda Mwananchi commanding 74% against Oburu\'s 20%.',
          date: '2026-06-17',
          category: 'news',
          tags: ['ODM Purge', 'Senate', 'Linda Mwananchi'],
          location: 'Parliament Buildings, Nairobi',
          sourceUrl: 'https://www.the-star.co.ke/news/2026-06-17-sifuna-kicked-out-of-oburu-led-senate-committee',
        },
        {
          title: 'Sifuna mocks Oburu\'s presidential talk at Kitui voter drive',
          description: '"Someone telling us his eyes are failing him mid-speech, yet he wants to be President?" Sifuna asked in Kitui in Aug 2026, urging youth registration: "show the old people that we too are capable of leadership." Western Linda Mwananchi leaders resolved to front him for president.',
          date: '2026-08-10',
          category: 'rally',
          tags: ['Youth Vote', 'Linda Mwananchi', 'Kitui'],
          location: 'Kitui',
          sourceUrl: 'https://www.the-star.co.ke/news/2026-08-10-sifuna-to-oburu-your-eyes-are-failing-you-yet-you-want-pawa',
        },
      ],
    },
  },
  {
    id: 'eugene-wamalwa',
    name: 'Eugene Wamalwa',
    type: 'politician',
    imageUrl: '/images/politicians/eugene-wamalwa.png',
    bio: 'DAP-Kenya party leader and United Alternative Government principal. Former Defence CS rallying Western Kenya behind the one-term opposition push.',
    searchTerms: ['Eugene Wamalwa', 'Wamalwa', 'Eugene Ludovic Wamalwa'],
    activitiesByPeriod: {
      '2027': [
        {
          title: 'Wamalwa joins Kalonzo–Gachagua unity consultations',
          description: 'Wamalwa\'s back-to-back engagements with Kalonzo and Gachagua in Aug 2026 framed opposition unity as "a deliberate covenant, not circumstance", as DAP-K eyes Western seats shaken loose by the ANC collapse.',
          date: '2026-08-04',
          category: 'rally',
          tags: ['UAG', 'DAP-K', 'Unity Talks'],
          location: 'Nairobi',
          sourceUrl: 'https://capitalfm.africa/kalonzo-hosts-gachagua-wamalwa-in-latest-bid-to-build-united-opposition',
        },
      ],
    },
  },
  {
    id: 'david-maraga',
    name: 'David Maraga',
    type: 'politician',
    imageUrl: '/images/politicians/david-maraga.jpg',
    bio: 'Retired Chief Justice running for president in 2027 on a "Reset. Restore. Rebuild." platform. Leads the United Green Movement and co-coordinates the Oct 9 People\'s Forum on electoral preparedness.',
    searchTerms: ['David Maraga', 'Maraga', 'Chief Justice Maraga', 'Justice Maraga'],
    activitiesByPeriod: {
      '2027': [
        {
          title: 'Maraga presidential campaign opens with integrity manifesto',
          description: 'The former CJ\'s davidmaraga.com platform pledges constitutional restoration, open government and inclusive development — pitching judicial credibility against career politicians in a crowded opposition field.',
          date: '2026-06-16',
          category: 'news',
          tags: ['Manifesto', 'UGM', 'Integrity'],
          location: 'Nairobi',
          sourceUrl: 'https://www.davidmaraga.com/',
        },
        {
          title: 'Maraga to coordinate Oct 9 People\'s Forum with Muturi and Omondi',
          description: 'The United Opposition tasked Maraga, ex-AG Justin Muturi and Linda Mwananchi\'s Caroli Omondi with convening parties, churches, civil society and youth to guard the 2027 vote: "a contest of ballots, not bullets."',
          date: '2026-08-19',
          category: 'news',
          tags: ['People\'s Forum', 'Peace', 'Civil Society'],
          location: 'Hermosa Hotel, Nairobi',
          sourceUrl: 'https://nation.africa/kenya/news/politics/opposition-sets-october-9-date-for-people-s-forum-to-guard-2027-election-5564052',
        },
      ],
    },
  },
  {
    id: 'james-orengo',
    name: 'James Orengo',
    type: 'politician',
    imageUrl: '/images/politicians/james-orengo.jpg',
    bio: 'Siaya Governor and Raila Odinga\'s oldest ally, now co-leading the Linda Mwananchi rebellion with Sifuna. Blames ODM\'s decline on the UDA pact and rallies Nyanza behind a hardline opposition stance.',
    searchTerms: ['James Orengo', 'Orengo', 'Siaya Governor Orengo'],
    activitiesByPeriod: {
      '2027': [
        {
          title: 'Orengo fronts Linda Mwananchi breakaway rallies with Sifuna',
          description: 'Orengo, Sifuna and Babu Owino\'s Ufungamano rallies and People\'s Delegate Convention fused ODM dissidents into Linda Mwananchi, with Trans Nzoia Governor Natembeya hosting the Western launch that resolved to front Sifuna for president.',
          date: '2026-03-27',
          category: 'rally',
          tags: ['Linda Mwananchi', 'Ufungamano', 'Nyanza'],
          location: 'Ufungamano House, Nairobi',
          sourceUrl: 'https://nation.africa/kenya/news/politics/after-sifuna-oburu-now-goes-for-osotsi--5535898',
        },
      ],
    },
  },
  {
    id: 'justin-muturi',
    name: 'Justin Muturi',
    type: 'politician',
    imageUrl: '/images/politicians/justin-muturi.jpg',
    bio: 'Former Attorney-General and Democratic Party leader. Triggered Kenya Kwanza\'s exit clauses, demands an early opposition flagbearer, and co-coordinates the Oct 9 People\'s Forum.',
    searchTerms: ['Justin Muturi', 'Muturi', 'JB Muturi', 'Attorney General Muturi'],
    activitiesByPeriod: {
      '2027': [
        {
          title: 'Muturi\'s DP bolts Kenya Kwanza, demands early flagbearer vote',
          description: 'Muturi\'s Democratic Party activated coalition exit clauses and — after honouring the Mbeere North reciprocity pact — pressed for an early 2027 nominee, clashing with Karua\'s "structures first" sequencing. "Let\'s stop beating around the bush," he said in Machakos.',
          date: '2026-07-11',
          category: 'news',
          tags: ['Democratic Party', 'Flagbearer', 'Coalition Exit'],
          location: 'Machakos',
          sourceUrl: 'https://nation.africa/kenya/news/politics/opposition-not-so-united-matiang-i-exposes-power-struggles-amid-gachagua-camp-tensions--5523872',
        },
      ],
    },
  },
];

const ALL_ENTITIES: IntelligenceEntity[] = [...PARTIES, ...POLITICIANS];

function normalizeQuery(q: string): string {
  return q.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Find a prefilled entity by search query and type */
export function findIntelligenceEntity(
  query: string,
  type: 'party' | 'politician'
): IntelligenceEntity | null {
  const normalized = normalizeQuery(query);
  if (!normalized) return null;
  const list = type === 'party' ? PARTIES : POLITICIANS;
  return (
    list.find(
      (e) =>
        e.name.toLowerCase() === normalized ||
        e.searchTerms.some(
          (t) => t.toLowerCase() === normalized || t.toLowerCase().includes(normalized) || normalized.includes(t.toLowerCase())
        ) ||
        normalized.includes(e.name.toLowerCase())
    ) ?? null
  );
}

/** Get activities for an entity filtered by campaign period */
export function getActivitiesForPeriod(
  entity: IntelligenceEntity,
  period: string
): IntelligenceActivity[] {
  const activities = entity.activitiesByPeriod[period];
  return Array.isArray(activities) ? activities : [];
}

/** All prefilled entities (for listing/autocomplete) */
export function getAllIntelligenceEntities(): IntelligenceEntity[] {
  return ALL_ENTITIES;
}
