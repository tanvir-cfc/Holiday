/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';

type HolidayType = 'INTERNATIONAL' | 'NATIONAL' | 'RELIGIOUS' | 'SPECIAL';

interface Holiday {
  id: string;
  name: string;
  date: string;
  day: string;
  type: HolidayType;
  highlighted?: boolean;
  description?: string;
}

interface Article {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  iconType: 'doc' | 'flag' | 'calendar' | 'luggage';
  content: string[];
}

interface FAQItem {
  question: string;
  answer: string;
}

const HOLIDAYS_BY_YEAR: Record<number, Holiday[]> = {
  2026: [
    { id: '01', name: "New Year's Day", date: '1 January 2026', day: 'Thursday', type: 'INTERNATIONAL', description: 'First day of the Gregorian calendar year.' },
    { id: '02', name: "Language Martyrs' Day", date: '21 February 2026', day: 'Saturday', type: 'NATIONAL', description: 'International Mother Language Day & Shaheed Dibosh commemorating the 1952 Bengali Language Movement.' },
    { id: '03', name: 'Shab-e-Barat', date: '4 March 2026', day: 'Wednesday', type: 'RELIGIOUS', description: 'Night of Forgiveness observed on the 15th night of the month of Shaban (subject to moon sighting).' },
    { id: '04', name: 'Independence Day', date: '26 March 2026', day: 'Thursday', type: 'NATIONAL', description: 'Commemorates the declaration of independence of Bangladesh in 1971.' },
    { id: '05', name: 'Bengali New Year (Pahela Baishakh)', date: '14 April 2026', day: 'Tuesday', type: 'NATIONAL', description: 'First day of the traditional Bengali calendar celebrated nationwide.' },
    { id: '06', name: 'Eid-ul-Fitr (Day 1)', date: '21 April 2026', day: 'Tuesday', type: 'RELIGIOUS', description: 'Festival of Breaking the Fast marking the end of Ramadan (subject to moon sighting).' },
    { id: '07', name: 'Eid-ul-Fitr (Day 2)', date: '22 April 2026', day: 'Wednesday', type: 'RELIGIOUS', description: 'Second day of Eid-ul-Fitr public holiday.' },
    { id: '08', name: 'Eid-ul-Fitr (Day 3)', date: '23 April 2026', day: 'Thursday', type: 'RELIGIOUS', description: 'Third day of Eid-ul-Fitr public holiday.' },
    { id: '09', name: 'May Day', date: '1 May 2026', day: 'Friday', type: 'INTERNATIONAL', description: 'International Workers’ Day honoring labor rights and workers across Bangladesh.' },
    { id: '10', name: 'Buddha Purnima', date: '12 May 2026', day: 'Tuesday', type: 'RELIGIOUS', description: 'Celebrates the birth, enlightenment, and passing of Gautama Buddha.' },
    { id: '11', name: 'Eid-ul-Adha (Day 1)', date: '28 June 2026', day: 'Sunday', type: 'RELIGIOUS', description: 'Festival of Sacrifice observed on the 10th of Dhu al-Hijjah (subject to moon sighting).' },
    { id: '12', name: 'Eid-ul-Adha (Day 2)', date: '29 June 2026', day: 'Monday', type: 'RELIGIOUS', description: 'Second day of Eid-ul-Adha public holiday.' },
    { id: '13', name: 'Eid-ul-Adha (Day 3)', date: '30 June 2026', day: 'Tuesday', type: 'RELIGIOUS', description: 'Third day of Eid-ul-Adha public holiday.' },
    { id: '14', name: 'July Uprising Anniversary Day', date: '5 August 2026', day: 'Wednesday', type: 'SPECIAL', highlighted: true, description: 'Special national observance commemorating the historic July-August mass uprising.' },
    { id: '15', name: 'Eid-e-Milad un-Nabi', date: '25 August 2026', day: 'Tuesday', type: 'RELIGIOUS', description: 'Observance of the birth and passing anniversary of Prophet Muhammad (PBUH).' },
    { id: '16', name: 'Durga Puja (Bijoya Dashami)', date: '30 September 2026', day: 'Wednesday', type: 'RELIGIOUS', description: 'Culmination of the annual Durga Puja festival celebrated by the Hindu community.' },
    { id: '17', name: 'Victory Day', date: '16 December 2026', day: 'Wednesday', type: 'NATIONAL', description: 'Bijoy Dibosh commemorating the victory in the Bangladesh Liberation War of 1971.' },
    { id: '18', name: 'Christmas Day', date: '25 December 2026', day: 'Friday', type: 'RELIGIOUS', description: 'Annual Christian holiday celebrating the birth of Jesus Christ.' },
  ],
  2025: [
    { id: '01', name: 'Shab-e-Barat', date: '15 February 2025', day: 'Saturday', type: 'RELIGIOUS' },
    { id: '02', name: "Language Martyrs' Day", date: '21 February 2025', day: 'Friday', type: 'NATIONAL' },
    { id: '03', name: 'Independence Day', date: '26 March 2025', day: 'Wednesday', type: 'NATIONAL' },
    { id: '04', name: 'Jumatul Bidah & Shab-e-Qadr', date: '28 March 2025', day: 'Friday', type: 'RELIGIOUS' },
    { id: '05', name: 'Eid-ul-Fitr (Day 1)', date: '31 March 2025', day: 'Monday', type: 'RELIGIOUS' },
    { id: '06', name: 'Eid-ul-Fitr (Day 2)', date: '1 April 2025', day: 'Tuesday', type: 'RELIGIOUS' },
    { id: '07', name: 'Bengali New Year (Pahela Baishakh)', date: '14 April 2025', day: 'Monday', type: 'NATIONAL' },
    { id: '08', name: 'May Day', date: '1 May 2025', day: 'Thursday', type: 'INTERNATIONAL' },
    { id: '09', name: 'Buddha Purnima', date: '11 May 2025', day: 'Sunday', type: 'RELIGIOUS' },
    { id: '10', name: 'Eid-ul-Adha (Day 1)', date: '7 June 2025', day: 'Saturday', type: 'RELIGIOUS' },
    { id: '11', name: 'Eid-ul-Adha (Day 2)', date: '8 June 2025', day: 'Sunday', type: 'RELIGIOUS' },
    { id: '12', name: 'Ashura', date: '6 July 2025', day: 'Sunday', type: 'RELIGIOUS' },
    { id: '13', name: 'July Uprising Day', date: '5 August 2025', day: 'Tuesday', type: 'SPECIAL', highlighted: true },
    { id: '14', name: 'Janmashtami', date: '16 August 2025', day: 'Saturday', type: 'RELIGIOUS' },
    { id: '15', name: 'Eid-e-Milad un-Nabi', date: '5 September 2025', day: 'Friday', type: 'RELIGIOUS' },
    { id: '16', name: 'Durga Puja (Bijoya Dashami)', date: '2 October 2025', day: 'Thursday', type: 'RELIGIOUS' },
    { id: '17', name: 'Victory Day', date: '16 December 2025', day: 'Tuesday', type: 'NATIONAL' },
    { id: '18', name: 'Christmas Day', date: '25 December 2025', day: 'Thursday', type: 'RELIGIOUS' },
  ],
  2024: [
    { id: '01', name: "Language Martyrs' Day", date: '21 February 2024', day: 'Wednesday', type: 'NATIONAL' },
    { id: '02', name: 'Shab-e-Barat', date: '26 February 2024', day: 'Monday', type: 'RELIGIOUS' },
    { id: '03', name: 'Independence Day', date: '26 March 2024', day: 'Tuesday', type: 'NATIONAL' },
    { id: '04', name: 'Eid-ul-Fitr', date: '11 April 2024', day: 'Thursday', type: 'RELIGIOUS' },
    { id: '05', name: 'Bengali New Year (Pahela Baishakh)', date: '14 April 2024', day: 'Sunday', type: 'NATIONAL' },
    { id: '06', name: 'May Day', date: '1 May 2024', day: 'Wednesday', type: 'INTERNATIONAL' },
    { id: '07', name: 'Buddha Purnima', date: '22 May 2024', day: 'Wednesday', type: 'RELIGIOUS' },
    { id: '08', name: 'Eid-ul-Adha', date: '17 June 2024', day: 'Monday', type: 'RELIGIOUS' },
    { id: '09', name: 'Ashura', date: '17 July 2024', day: 'Wednesday', type: 'RELIGIOUS' },
    { id: '10', name: 'Janmashtami', date: '26 August 2024', day: 'Monday', type: 'RELIGIOUS' },
    { id: '11', name: 'Eid-e-Milad un-Nabi', date: '16 September 2024', day: 'Monday', type: 'RELIGIOUS' },
    { id: '12', name: 'Durga Puja (Bijoya Dashami)', date: '13 October 2024', day: 'Sunday', type: 'RELIGIOUS' },
    { id: '13', name: 'Victory Day', date: '16 December 2024', day: 'Monday', type: 'NATIONAL' },
    { id: '14', name: 'Christmas Day', date: '25 December 2024', day: 'Wednesday', type: 'RELIGIOUS' },
  ],
  2023: [
    { id: '01', name: "Language Martyrs' Day", date: '21 February 2023', day: 'Tuesday', type: 'NATIONAL' },
    { id: '02', name: 'Shab-e-Barat', date: '8 March 2023', day: 'Wednesday', type: 'RELIGIOUS' },
    { id: '03', name: 'Independence Day', date: '26 March 2023', day: 'Sunday', type: 'NATIONAL' },
    { id: '04', name: 'Bengali New Year (Pahela Baishakh)', date: '14 April 2023', day: 'Friday', type: 'NATIONAL' },
    { id: '05', name: 'Eid-ul-Fitr', date: '22 April 2023', day: 'Saturday', type: 'RELIGIOUS' },
    { id: '06', name: 'May Day', date: '1 May 2023', day: 'Monday', type: 'INTERNATIONAL' },
    { id: '07', name: 'Buddha Purnima', date: '4 May 2023', day: 'Thursday', type: 'RELIGIOUS' },
    { id: '08', name: 'Eid-ul-Adha', date: '29 June 2023', day: 'Thursday', type: 'RELIGIOUS' },
    { id: '09', name: 'Ashura', date: '29 July 2023', day: 'Saturday', type: 'RELIGIOUS' },
    { id: '10', name: 'Janmashtami', date: '6 September 2023', day: 'Wednesday', type: 'RELIGIOUS' },
    { id: '11', name: 'Eid-e-Milad un-Nabi', date: '28 September 2023', day: 'Thursday', type: 'RELIGIOUS' },
    { id: '12', name: 'Durga Puja (Bijoya Dashami)', date: '24 October 2023', day: 'Tuesday', type: 'RELIGIOUS' },
    { id: '13', name: 'Victory Day', date: '16 December 2023', day: 'Saturday', type: 'NATIONAL' },
    { id: '14', name: 'Christmas Day', date: '25 December 2023', day: 'Monday', type: 'RELIGIOUS' },
  ],
  2027: [
    { id: '01', name: "New Year's Day", date: '1 January 2027', day: 'Friday', type: 'INTERNATIONAL' },
    { id: '02', name: 'Shab-e-Barat', date: '22 February 2027', day: 'Monday', type: 'RELIGIOUS' },
    { id: '03', name: "Language Martyrs' Day", date: '21 February 2027', day: 'Sunday', type: 'NATIONAL' },
    { id: '04', name: 'Eid-ul-Fitr (Day 1)', date: '10 March 2027', day: 'Wednesday', type: 'RELIGIOUS' },
    { id: '05', name: 'Eid-ul-Fitr (Day 2)', date: '11 March 2027', day: 'Thursday', type: 'RELIGIOUS' },
    { id: '06', name: 'Independence Day', date: '26 March 2027', day: 'Friday', type: 'NATIONAL' },
    { id: '07', name: 'Bengali New Year (Pahela Baishakh)', date: '14 April 2027', day: 'Wednesday', type: 'NATIONAL' },
    { id: '08', name: 'May Day', date: '1 May 2027', day: 'Saturday', type: 'INTERNATIONAL' },
    { id: '09', name: 'Eid-ul-Adha (Day 1)', date: '17 May 2027', day: 'Monday', type: 'RELIGIOUS' },
    { id: '10', name: 'Buddha Purnima', date: '20 May 2027', day: 'Thursday', type: 'RELIGIOUS' },
    { id: '11', name: 'July Uprising Anniversary Day', date: '5 August 2027', day: 'Thursday', type: 'SPECIAL', highlighted: true },
    { id: '12', name: 'Eid-e-Milad un-Nabi', date: '15 August 2027', day: 'Sunday', type: 'RELIGIOUS' },
    { id: '13', name: 'Durga Puja (Bijoya Dashami)', date: '10 October 2027', day: 'Sunday', type: 'RELIGIOUS' },
    { id: '14', name: 'Victory Day', date: '16 December 2027', day: 'Thursday', type: 'NATIONAL' },
    { id: '15', name: 'Christmas Day', date: '25 December 2027', day: 'Saturday', type: 'RELIGIOUS' },
  ],
  2028: [
    { id: '01', name: "New Year's Day", date: '1 January 2028', day: 'Saturday', type: 'INTERNATIONAL' },
    { id: '02', name: "Language Martyrs' Day", date: '21 February 2028', day: 'Monday', type: 'NATIONAL' },
    { id: '03', name: 'Eid-ul-Fitr (Day 1)', date: '27 February 2028', day: 'Sunday', type: 'RELIGIOUS' },
    { id: '04', name: 'Independence Day', date: '26 March 2028', day: 'Sunday', type: 'NATIONAL' },
    { id: '05', name: 'Bengali New Year (Pahela Baishakh)', date: '14 April 2028', day: 'Friday', type: 'NATIONAL' },
    { id: '06', name: 'May Day', date: '1 May 2028', day: 'Monday', type: 'INTERNATIONAL' },
    { id: '07', name: 'Eid-ul-Adha (Day 1)', date: '5 May 2028', day: 'Friday', type: 'RELIGIOUS' },
    { id: '08', name: 'Buddha Purnima', date: '8 May 2028', day: 'Monday', type: 'RELIGIOUS' },
    { id: '09', name: 'July Uprising Anniversary Day', date: '5 August 2028', day: 'Saturday', type: 'SPECIAL', highlighted: true },
    { id: '10', name: 'Eid-e-Milad un-Nabi', date: '3 August 2028', day: 'Thursday', type: 'RELIGIOUS' },
    { id: '11', name: 'Durga Puja (Bijoya Dashami)', date: '27 September 2028', day: 'Wednesday', type: 'RELIGIOUS' },
    { id: '12', name: 'Victory Day', date: '16 December 2028', day: 'Saturday', type: 'NATIONAL' },
    { id: '13', name: 'Christmas Day', date: '25 December 2028', day: 'Monday', type: 'RELIGIOUS' },
  ],
};

const ARTICLES: Article[] = [
  {
    id: 'national-days',
    category: 'HISTORY',
    title: 'Important National Days of Bangladesh',
    excerpt: 'A quick reference to Bangladesh national days and their significance.',
    readTime: '4 min read',
    iconType: 'flag',
    content: [
      'Bangladesh observes several pivotal national days every year that reflect the country’s struggle for linguistic identity, self-determination, and liberation.',
      '21 February — Language Martyrs’ Day (Shaheed Dibosh & International Mother Language Day): Honors the students and activists who laid down their lives in 1952 to establish Bengali as a state language.',
      '26 March — Independence Day: Marks the declaration of independence in 1971 and pays tribute to the freedom fighters of the Liberation War.',
      '14 April — Pahela Baishakh (Bengali New Year): Celebrates the first day of the Bengali calendar with Mangal Shobhajatra, traditional music, and festive gatherings across all faiths.',
      '16 December — Victory Day (Bijoy Dibosh): Commemorates the historic victory of the Allied Forces and Mukti Bahini in 1971.'
    ]
  },
  {
    id: 'family-planning',
    category: 'PLANNING',
    title: 'Holiday Planning Tips for Families',
    excerpt: 'Simple ways to plan family time, travel and leave around public holidays.',
    readTime: '4 min read',
    iconType: 'luggage',
    content: [
      'With 18 major public holidays in 2026 and weekly Friday-Saturday weekends, families in Bangladesh can plan extended getaways by combining annual leave with mid-week holidays.',
      'Book transport early for Eid-ul-Fitr (April 21–23) and Eid-ul-Adha (June 28–30), as train, bus, and domestic flight tickets sell out weeks in advance.',
      'Look for Thursday or Sunday holidays—such as Independence Day on Thursday, 26 March 2026—which naturally create a 3-day long weekend alongside Friday and Saturday.'
    ]
  },
  {
    id: 'understanding-holidays',
    category: 'GUIDE',
    title: 'Understanding Public Holidays in Bangladesh',
    excerpt: 'Learn how official holidays are announced, categorized and observed across Bangladesh.',
    readTime: '4 min read',
    iconType: 'flag',
    content: [
      'Each autumn, the Ministry of Public Administration (MoPA) publishes the official gazette listing public holidays for the upcoming calendar year following Cabinet approval.',
      'Holidays in Bangladesh are divided into General Holidays (observed by all government, semi-government, and autonomous offices), Holidays by Executive Order, and Optional Holidays reserved for specific religious communities.',
      'Lunar Islamic holidays such as Shab-e-Barat, Eid-ul-Fitr, Eid-ul-Adha, and Eid-e-Milad un-Nabi remain subject to the sighting of the moon by the National Moon Sighting Committee.'
    ]
  },
  {
    id: 'complete-list-2026',
    category: 'PUBLIC HOLIDAYS',
    title: 'Bangladesh Government Holidays 2026 – Complete List',
    excerpt: 'A complete guide to national, religious and special public holidays in Bangladesh during 2026.',
    readTime: '4 min read',
    iconType: 'doc',
    content: [
      'The 2026 Bangladesh Government Holiday calendar features 18 key public holiday dates spanning national commemorations, multi-day religious festivals, international observances, and special national days.',
      'Major multi-day breaks occur in April for Eid-ul-Fitr (21–23 April 2026) and in late June for Eid-ul-Adha (28–30 June 2026).',
      'Check our verified table above for exact days of the week and category breakdowns to plan your 2026 schedule effectively.'
    ]
  },
  {
    id: 'plan-calendar',
    category: 'PLANNING',
    title: 'How to Plan Your Bangladesh Holiday Calendar',
    excerpt: 'Step-by-step guide to aligning annual leave with official government holidays.',
    readTime: '4 min read',
    iconType: 'calendar',
    content: [
      'Mapping out your calendar at the start of the year helps you maximize rest days while avoiding peak travel bottlenecks.',
      'Identify holidays that fall on Tuesdays, Wednesdays, or Thursdays—taking just one or two bridge leave days can turn a single holiday into a 4- to 5-day break.'
    ]
  }
];

const SIDEBAR_BLOGS = [
  {
    id: 'complete-list-2026',
    title: 'Bangladesh Government Holidays 2026 – Complete List',
    meta: 'Public Holidays · 4 min read',
    iconType: 'doc' as const,
  },
  {
    id: 'understanding-holidays',
    title: 'Understanding Public Holidays in Bangladesh',
    meta: 'Guide · 4 min read',
    iconType: 'flag' as const,
  },
  {
    id: 'plan-calendar',
    title: 'How to Plan Your Bangladesh Holiday Calendar',
    meta: 'Planning · 4 min read',
    iconType: 'calendar' as const,
  },
  {
    id: 'national-days',
    title: 'Important National Days of Bangladesh',
    meta: 'History · 4 min read',
    iconType: 'flag' as const,
  },
  {
    id: 'family-planning',
    title: 'Holiday Planning Tips for Families',
    meta: 'Planning · 4 min read',
    iconType: 'luggage' as const,
  },
];

const FAQS: FAQItem[] = [
  {
    question: 'Is today a public holiday in Bangladesh?',
    answer: 'No, today (23 August 2026) is a regular working day in Bangladesh. All government, semi-government, and banking offices are open. The next upcoming public holiday is Eid-e-Milad un-Nabi on Tuesday, 25 August 2026.',
  },
  {
    question: 'How many government holidays are there in Bangladesh?',
    answer: 'In 2026, there are 18 listed public holiday dates in our main schedule (comprising 11 religious holiday dates, 4 national days, 2 international days, and 1 special day), alongside weekly Friday–Saturday weekends totaling 68 days off per year.',
  },
  {
    question: 'Are religious holidays fixed every year?',
    answer: 'No. Islamic holidays in Bangladesh follow the Hijri lunar calendar and shift earlier by approximately 10 to 11 days each Gregorian year. Their exact observance dates depend on moon sighting announcements by the National Moon Sighting Committee. Hindu and Buddhist holidays also follow lunisolar calendars.',
  },
  {
    question: 'Where are official holiday dates announced?',
    answer: 'Official government holiday dates are announced by the Ministry of Public Administration (MoPA) of the Government of the People’s Republic of Bangladesh and published in the Bangladesh Gazette.',
  },
  {
    question: 'How can I check holidays for a past year?',
    answer: 'You can browse past years using the "Browse Holidays by Year" section above (including 2023, 2024, and 2025) or click the "← Previous Year" button below the holiday table.',
  },
];

/* --- Custom Crisp Vector Icons matching the screenshot --- */

function BdFlagIcon({ className = 'w-3.5 h-2.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={`inline-block shrink-0 rounded-[1.5px] ${className}`} aria-hidden="true">
      <rect width="20" height="14" fill="#006a4e" />
      <circle cx="9" cy="7" r="4.2" fill="#f42a41" />
    </svg>
  );
}

function WavingBdFlagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden="true">
      <path d="M4 4v17" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M5 5c3.5-1.2 6.5 1.2 10 0s4.5-1 4.5-1v9.5s-1 1.2-4.5 1-6.5-1.2-10 0V5z" fill="#006a4e" />
      <circle cx="11.5" cy="9.7" r="2.8" fill="#f42a41" />
    </svg>
  );
}

function CalendarSmallIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden="true">
      <rect x="3" y="4" width="18" height="17" rx="2.5" fill="#ffffff" stroke="#0d6839" strokeWidth="1.5" />
      <path d="M3 6.5C3 5.12 4.12 4 5.5 4h13C19.88 4 21 5.12 21 6.5V9H3V6.5z" fill="#e11d48" />
      <line x1="8" y1="2.5" x2="8" y2="5.5" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="2.5" x2="16" y2="5.5" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      <rect x="6.5" y="11.5" width="2.5" height="2" rx="0.4" fill="#0d6839" />
      <rect x="10.75" y="11.5" width="2.5" height="2" rx="0.4" fill="#0d6839" />
      <rect x="15" y="11.5" width="2.5" height="2" rx="0.4" fill="#0d6839" />
      <rect x="6.5" y="15.2" width="2.5" height="2" rx="0.4" fill="#0d6839" />
      <rect x="10.75" y="15.2" width="2.5" height="2" rx="0.4" fill="#0d6839" />
      <rect x="15" y="15.2" width="2.5" height="2" rx="0.4" fill="#94a3b8" />
    </svg>
  );
}

function Calendar17Icon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden="true">
      <rect x="3" y="4" width="18" height="17" rx="2.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      <path d="M3 6.5C3 5.12 4.12 4 5.5 4h13C19.88 4 21 5.12 21 6.5V9H3V6.5z" fill="#e11d48" />
      <text x="12" y="17.5" textAnchor="middle" fill="#1e293b" fontSize="8.5" fontWeight="800" fontFamily="sans-serif">
        17
      </text>
    </svg>
  );
}

function DocMemoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="8" y1="8" x2="16" y2="8" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="11.5" x2="16" y2="11.5" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="15" x2="13" y2="15" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15.5 14.5l3.5 3.5-1.5 1.5-3.5-3.5z" fill="#ef4444" />
    </svg>
  );
}

function LuggageIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden="true">
      <path d="M9 6V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V6" fill="none" stroke="#78350f" strokeWidth="1.8" />
      <rect x="6" y="6" width="12" height="14" rx="2" fill="#b45309" stroke="#78350f" strokeWidth="1.2" />
      <line x1="9.5" y1="6" x2="9.5" y2="20" stroke="#fcd34d" strokeWidth="1.2" />
      <line x1="14.5" y1="6" x2="14.5" y2="20" stroke="#fcd34d" strokeWidth="1.2" />
    </svg>
  );
}

/* Ornate Bengali Alpana / Mandala SVG for Hero Banner */
function MandalaWheel({ className = '' }: { className?: string }) {
  const angles = Array.from({ length: 16 }, (_, i) => i * 22.5);
  const innerAngles = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
      <g transform="translate(200,200)" fill="none" stroke="currentColor">
        {/* Outer scalloped ring */}
        <circle r="192" strokeWidth="1" strokeDasharray="4 4" opacity="0.55" />
        <circle r="184" strokeWidth="1.8" opacity="0.7" />
        <circle r="172" strokeWidth="1" opacity="0.5" />
        {angles.map((a) => (
          <g key={`outer-${a}`} transform={`rotate(${a})`}>
            <path d="M 0 -172 Q 16 -188 32 -172" strokeWidth="1.4" opacity="0.65" />
            <circle cx="0" cy="-162" r="2.5" fill="currentColor" opacity="0.5" />
            <path d="M 0 -128 C 18 -148, 18 -162, 0 -170 C -18 -162, -18 -148, 0 -128 Z" strokeWidth="1.3" opacity="0.6" />
          </g>
        ))}

        {/* Middle geometric rings */}
        <circle r="128" strokeWidth="2" opacity="0.75" />
        <circle r="120" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        <circle r="94" strokeWidth="1.8" opacity="0.7" />

        {/* 8-fold lotus petals & star */}
        {innerAngles.map((a) => (
          <g key={`mid-${a}`} transform={`rotate(${a})`}>
            <path d="M 0 -94 C 24 -108, 24 -122, 0 -128 C -24 -122, -24 -108, 0 -94 Z" strokeWidth="1.6" opacity="0.7" />
            <path d="M 0 -52 C 22 -68, 22 -84, 0 -94 C -22 -84, -22 -68, 0 -52 Z" strokeWidth="1.8" opacity="0.8" />
            <line x1="0" y1="-52" x2="0" y2="-128" strokeWidth="0.9" opacity="0.45" />
            <circle cx="0" cy="-74" r="3" fill="currentColor" opacity="0.55" />
          </g>
        ))}

        {/* Inner core medallion */}
        <circle r="52" strokeWidth="2" opacity="0.8" />
        <circle r="42" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.65" />
        <circle r="24" strokeWidth="1.8" opacity="0.8" />
        <circle r="8" fill="currentColor" opacity="0.6" />
      </g>
    </svg>
  );
}

export default function App() {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [appliedSearch, setAppliedSearch] = useState<string>('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [activeNav, setActiveNav] = useState<'home' | 'holidays2026' | 'past' | 'faq' | 'contact'>('home');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [infoModal, setInfoModal] = useState<'privacy' | 'contact' | 'about' | 'terms' | null>(null);

  const currentHolidays = useMemo(() => {
    const list = HOLIDAYS_BY_YEAR[selectedYear] || HOLIDAYS_BY_YEAR[2026];
    const q = appliedSearch.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.date.toLowerCase().includes(q) ||
        h.day.toLowerCase().includes(q) ||
        h.type.toLowerCase().includes(q)
    );
  }, [selectedYear, appliedSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSearch(searchQuery);
    const tableEl = document.getElementById('holidays-table-section');
    if (tableEl) {
      tableEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderBadge = (type: HolidayType) => {
    switch (type) {
      case 'INTERNATIONAL':
        return (
          <span className="inline-block bg-[#e6f4ec] text-[#0a5c36] text-[9.5px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full">
            INTERNATIONAL
          </span>
        );
      case 'NATIONAL':
        return (
          <span className="inline-block bg-[#e8f0fe] text-[#1d4ed8] text-[9.5px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full">
            NATIONAL
          </span>
        );
      case 'RELIGIOUS':
        return (
          <span className="inline-block bg-[#f3e8ff] text-[#7e22ce] text-[9.5px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full">
            RELIGIOUS
          </span>
        );
      case 'SPECIAL':
        return (
          <span className="inline-block bg-[#ffedd5] text-[#c2410c] text-[9.5px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full">
            SPECIAL
          </span>
        );
    }
  };

  const renderSidebarIcon = (type: Article['iconType']) => {
    switch (type) {
      case 'doc':
        return <DocMemoIcon />;
      case 'flag':
        return <WavingBdFlagIcon />;
      case 'calendar':
        return <Calendar17Icon />;
      case 'luggage':
        return <LuggageIcon />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f6f8] text-[#111827] font-sans antialiased selection:bg-[#0a5c36] selection:text-white">
      {/* 1. Top Utility Bar */}
      <div className="bg-[#0a5c36] text-white text-[11px]">
        <div className="max-w-[1120px] mx-auto px-4 h-7 flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-medium text-white/95">
            <BdFlagIcon className="w-3 h-2.5" />
            <span>Bangladesh&apos;s Official Holiday Resource</span>
          </div>
          <div className="flex items-center gap-4 text-white/90">
            <button
              type="button"
              onClick={() => setInfoModal('privacy')}
              className="hover:text-white hover:underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setInfoModal('contact')}
              className="hover:text-white hover:underline cursor-pointer"
            >
              Contact Us
            </button>
            <button
              type="button"
              onClick={() => setInfoModal('about')}
              className="hover:text-white hover:underline cursor-pointer"
            >
              About Us
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-[1120px] mx-auto px-4 h-[62px] flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setSelectedYear(2026);
              setSearchQuery('');
              setAppliedSearch('');
              setActiveNav('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 shrink-0"
          >
            <div className="w-9 h-9 rounded-lg bg-[#0d6839] flex items-center justify-center shadow-2xs">
              <CalendarSmallIcon />
            </div>
            <div>
              <div className="text-[15.5px] font-extrabold text-[#0a5c36] leading-tight tracking-tight">
                GovtHolidays BD
              </div>
              <div className="text-[10.5px] text-gray-400 leading-tight font-normal">
                Bangladesh Public Holidays
              </div>
            </div>
          </a>

          {/* Center Nav Links */}
          <nav className="hidden md:flex items-center gap-1 text-[13px] font-medium text-gray-700">
            <button
              type="button"
              onClick={() => {
                setActiveNav('home');
                setSelectedYear(2026);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeNav === 'home'
                  ? 'bg-[#e6f4ec] text-[#0a5c36] font-semibold'
                  : 'hover:text-[#0a5c36]'
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveNav('holidays2026');
                setSelectedYear(2026);
                scrollToSection('holidays-table-section');
              }}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeNav === 'holidays2026'
                  ? 'bg-[#e6f4ec] text-[#0a5c36] font-semibold'
                  : 'hover:text-[#0a5c36]'
              }`}
            >
              Holidays 2026
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveNav('past');
                scrollToSection('browse-years-section');
              }}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeNav === 'past'
                  ? 'bg-[#e6f4ec] text-[#0a5c36] font-semibold'
                  : 'hover:text-[#0a5c36]'
              }`}
            >
              Past Holidays
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveNav('faq');
                scrollToSection('faq-section');
              }}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeNav === 'faq'
                  ? 'bg-[#e6f4ec] text-[#0a5c36] font-semibold'
                  : 'hover:text-[#0a5c36]'
              }`}
            >
              FAQ
            </button>
            <button
              type="button"
              onClick={() => setInfoModal('contact')}
              className="px-3 py-1.5 rounded-md hover:text-[#0a5c36] transition-colors cursor-pointer whitespace-nowrap"
            >
              Contact
            </button>
          </nav>

          {/* Right Search Input */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-1.5 shrink-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value === '') setAppliedSearch('');
              }}
              placeholder="Search holidays..."
              aria-label="Search holidays"
              className="w-36 sm:w-44 h-[33px] px-3 text-[12px] bg-[#f8f9fa] border border-gray-200 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0a5c36] focus:bg-white transition-colors"
            />
            <button
              type="submit"
              className="h-[33px] px-3.5 bg-[#0d6839] hover:bg-[#09532d] text-white text-[12px] font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              Search
            </button>
          </form>
        </div>
      </header>

      {/* 3. Hero Banner with Traditional Bengali Mandala / Alpana Artwork */}
      <section
        className="relative overflow-hidden py-12 px-4 text-center text-white select-none"
        style={{
          background:
            'radial-gradient(circle at 6% 12%, rgba(185, 48, 38, 0.48) 0%, transparent 28%), radial-gradient(circle at 94% 12%, rgba(185, 48, 38, 0.48) 0%, transparent 28%), radial-gradient(circle at 48% 8%, rgba(165, 42, 32, 0.35) 0%, transparent 34%), linear-gradient(135deg, #06381e 0%, #0b5d33 50%, #06381e 100%)',
        }}
      >
        {/* Left Large Mandala Medallion */}
        <div className="pointer-events-none absolute -left-16 -bottom-24 w-[370px] h-[370px] text-[#d9a05b]/25">
          <MandalaWheel className="w-full h-full" />
        </div>
        {/* Left Upper Faint Accent Ring */}
        <div className="pointer-events-none absolute left-4 -top-16 w-[160px] h-[160px] text-[#e07a5f]/20">
          <MandalaWheel className="w-full h-full" />
        </div>

        {/* Right Large Mandala Medallion */}
        <div className="pointer-events-none absolute -right-16 -bottom-24 w-[370px] h-[370px] text-[#d9a05b]/25">
          <MandalaWheel className="w-full h-full" />
        </div>
        {/* Right Upper Faint Accent Ring */}
        <div className="pointer-events-none absolute right-4 -top-16 w-[160px] h-[160px] text-[#e07a5f]/20">
          <MandalaWheel className="w-full h-full" />
        </div>

        {/* Subtle Star Dots in Background */}
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <div className="absolute left-[27%] top-[28%] w-1.5 h-1.5 rounded-full bg-amber-200" />
          <div className="absolute left-[22%] top-[74%] w-1 h-1 rounded-full bg-amber-200" />
          <div className="absolute right-[26%] top-[30%] w-1.5 h-1.5 rounded-full bg-amber-200" />
          <div className="absolute right-[21%] top-[72%] w-1 h-1 rounded-full bg-amber-200" />
        </div>

        <div className="relative z-10 max-w-[780px] mx-auto">
          <div className="text-[10.5px] font-semibold tracking-[0.18em] uppercase text-white/80 mb-2">
            OFFICIAL RESOURCE
          </div>
          <h1 className="text-[26px] sm:text-[32px] font-extrabold text-white tracking-tight leading-tight mb-2.5">
            Bangladesh Government Holidays {selectedYear}
          </h1>
          <p className="text-[13.5px] text-white/85 font-normal mb-6 max-w-[560px] mx-auto">
            Complete calendar of national, religious &amp; special public holidays — updated and verified.
          </p>

          {/* 4 Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <div className="bg-white/12 border border-white/25 rounded-full px-3.5 py-1.5 text-[11.5px] font-medium text-white flex items-center gap-1.5 backdrop-blur-xs">
              <CalendarSmallIcon />
              <span>25+ Holidays</span>
            </div>
            <div className="bg-white/12 border border-white/25 rounded-full px-3.5 py-1.5 text-[11.5px] font-medium text-white flex items-center gap-1.5 backdrop-blur-xs">
              <span className="w-3.5 h-3.5 rounded-[3px] bg-[#22c55e] text-white flex items-center justify-center text-[10px] font-bold leading-none">
                ✓
              </span>
              <span>Govt Verified</span>
            </div>
            <div className="bg-white/12 border border-white/25 rounded-full px-3.5 py-1.5 text-[11.5px] font-medium text-white flex items-center gap-1.5 backdrop-blur-xs">
              <span className="text-[12px] leading-none" aria-hidden="true">
                🕌
              </span>
              <span>All Religions</span>
            </div>
            <div className="bg-white/12 border border-white/25 rounded-full px-3.5 py-1.5 text-[11.5px] font-medium text-white flex items-center gap-1.5 backdrop-blur-xs">
              <BdFlagIcon className="w-3.5 h-2.5" />
              <span>Bangladesh Only</span>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Right Orange Action Icon (matches screenshot right edge widget) */}
      <button
        type="button"
        onClick={() => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen?.().catch(() => {});
          } else {
            document.exitFullscreen?.().catch(() => {});
          }
        }}
        title="Toggle Fullscreen View"
        className="fixed right-3 top-[380px] z-40 w-8 h-8 rounded-md bg-[#f47920] hover:bg-[#e06912] text-white shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          <path d="M14 10l-4 4m0-4l4 4" strokeWidth="1.5" opacity="0.4" />
        </svg>
      </button>

      {/* 4. Top Horizontal Advertisement Banner */}
      <div className="max-w-[1120px] w-full mx-auto px-4 pt-5 pb-4">
        <div className="bg-white border border-dashed border-gray-300 rounded-lg h-[90px] flex items-center justify-center">
          <span className="text-[10px] tracking-[0.08em] uppercase text-gray-400 font-medium">
            ADVERTISEMENT (336 × 280)
          </span>
        </div>
      </div>

      {/* 5. Main Two-Column Content Area */}
      <main className="max-w-[1120px] w-full mx-auto px-4 pb-16 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_310px] gap-6 items-start">
          {/* LEFT MAIN COLUMN */}
          <div>
            {/* A. Three Status Highlight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4">
              {/* Past Holiday Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold tracking-wider uppercase text-gray-400 mb-1.5">
                    PAST HOLIDAY
                  </div>
                  <div className="text-[15px] font-bold text-gray-900 mb-2">
                    July Uprising Day
                  </div>
                </div>
                <div className="flex items-center flex-wrap gap-1.5 mt-1">
                  <span className="text-[11.5px] text-gray-500">5 August 2026</span>
                  <span className="bg-[#e6f4ec] text-[#0a5c36] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    17 days ago
                  </span>
                </div>
              </div>

              {/* Today Card */}
              <div className="bg-[#fffdf9] border border-[#f5b841] rounded-xl p-4 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold tracking-wider uppercase text-gray-400 mb-1.5">
                    TODAY — 23 AUGUST 2026
                  </div>
                  <div className="text-[15px] font-bold text-[#d97706] mb-0.5">
                    No Holiday Today
                  </div>
                  <div className="text-[11.5px] text-gray-500 mb-2.5">
                    Regular working day
                  </div>
                </div>
                <div>
                  <span className="inline-block bg-[#e6f4ec] text-[#0a5c36] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    Office Open
                  </span>
                </div>
              </div>

              {/* Upcoming Holiday Card */}
              <div className="bg-white border border-[#1b7a43] rounded-xl p-4 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold tracking-wider uppercase text-gray-400 mb-1.5">
                    UPCOMING HOLIDAY
                  </div>
                  <div className="text-[15px] font-bold text-gray-900 mb-2">
                    Eid-e-Milad un-Nabi
                  </div>
                </div>
                <div className="flex items-center flex-wrap gap-1.5 mt-1">
                  <span className="text-[11.5px] text-gray-500">25 August 2026</span>
                  <span className="bg-[#e6f4ec] text-[#0a5c36] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    2 days left
                  </span>
                </div>
              </div>
            </div>

            {/* B. 4-Metric Summary Counter Bar */}
            <div className="bg-white border border-gray-200 rounded-xl grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 mb-7 shadow-2xs">
              <div className="py-4 px-3 text-center">
                <div className="text-[23px] font-extrabold text-[#0a5c36] leading-tight tabular-nums">
                  {HOLIDAYS_BY_YEAR[selectedYear]?.length || 18}
                </div>
                <div className="text-[11px] text-gray-400 mt-0.5">
                  Total Holidays {selectedYear}
                </div>
              </div>
              <div className="py-4 px-3 text-center">
                <div className="text-[23px] font-extrabold text-[#0a5c36] leading-tight tabular-nums">
                  68
                </div>
                <div className="text-[11px] text-gray-400 mt-0.5">
                  Days Off Per Year
                </div>
              </div>
              <div className="py-4 px-3 text-center">
                <div className="text-[23px] font-extrabold text-[#0a5c36] leading-tight tabular-nums">
                  11
                </div>
                <div className="text-[11px] text-gray-400 mt-0.5">
                  Religious Holidays
                </div>
              </div>
              <div className="py-4 px-3 text-center">
                <div className="text-[23px] font-extrabold text-[#0a5c36] leading-tight tabular-nums">
                  4
                </div>
                <div className="text-[11px] text-gray-400 mt-0.5">
                  National Days
                </div>
              </div>
            </div>

            {/* C. Main Public Holidays Table Section */}
            <div id="holidays-table-section" className="mb-3.5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[16.5px] font-bold text-gray-900">
                  Bangladesh Public Holidays {selectedYear}
                </h2>
                {appliedSearch ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setAppliedSearch('');
                    }}
                    className="text-[12px] font-medium text-[#0a5c36] hover:underline cursor-pointer"
                  >
                    Clear Search ({currentHolidays.length}) →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => scrollToSection('holidays-table-section')}
                    className="text-[12px] font-medium text-[#0a5c36] hover:underline cursor-pointer"
                  >
                    View Full List →
                  </button>
                )}
              </div>

              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#0d6839] text-white text-[11.5px] font-bold">
                        <th className="py-2.5 pl-4 pr-2 w-10">#</th>
                        <th className="py-2.5 px-3">Holiday Name</th>
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Day</th>
                        <th className="py-2.5 pl-3 pr-4">Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-[12px]">
                      {currentHolidays.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-gray-500">
                            No holidays found matching &ldquo;{appliedSearch}&rdquo;.{' '}
                            <button
                              type="button"
                              onClick={() => {
                                setSearchQuery('');
                                setAppliedSearch('');
                              }}
                              className="text-[#0a5c36] font-semibold underline ml-1 cursor-pointer"
                            >
                              Reset filter
                            </button>
                          </td>
                        </tr>
                      ) : (
                        currentHolidays.map((item) => (
                          <tr
                            key={item.id}
                            className={`transition-colors ${
                              item.highlighted
                                ? 'bg-[#fef9ee] hover:bg-[#fdf3de]'
                                : 'hover:bg-gray-50/70'
                            }`}
                          >
                            <td className="py-3 pl-4 pr-2 font-bold text-[#0a5c36] tabular-nums">
                              {item.id}
                            </td>
                            <td className="py-3 px-3 font-medium text-gray-800">
                              {item.name}
                            </td>
                            <td className="py-3 px-3 text-gray-700 whitespace-nowrap">
                              {item.date}
                            </td>
                            <td className="py-3 px-3 text-gray-700 whitespace-nowrap">
                              {item.day}
                            </td>
                            <td className="py-3 pl-3 pr-4 whitespace-nowrap">
                              {renderBadge(item.type)}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* D. Previous / Next Year Buttons */}
            <div className="flex items-center justify-between mb-5">
              <button
                type="button"
                onClick={() => {
                  const prev = selectedYear > 2023 ? selectedYear - 1 : 2023;
                  setSelectedYear(prev);
                }}
                className="bg-white border border-gray-200 hover:border-[#0a5c36] rounded-lg px-3.5 py-2 text-[11.5px] flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              >
                <span className="font-bold text-[#0a5c36]">← Previous Year</span>
                <span className="text-gray-400 tabular-nums">
                  {selectedYear > 2023 ? selectedYear - 1 : 2023}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const next = selectedYear < 2028 ? selectedYear + 1 : 2028;
                  setSelectedYear(next);
                }}
                className="bg-white border border-gray-200 hover:border-[#0a5c36] rounded-lg px-3.5 py-2 text-[11.5px] flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              >
                <span className="text-gray-400 tabular-nums">
                  {selectedYear < 2028 ? selectedYear + 1 : 2028}
                </span>
                <span className="font-bold text-[#0a5c36]">Next Year →</span>
              </button>
            </div>

            {/* E. Mid-Page Advertisement Box */}
            <div className="bg-white border border-dashed border-gray-300 rounded-lg h-[90px] flex items-center justify-center mb-7">
              <span className="text-[10px] tracking-[0.08em] uppercase text-gray-400 font-medium">
                ADVERTISEMENT (336 × 280)
              </span>
            </div>

            {/* F. Browse Holidays by Year */}
            <section id="browse-years-section" className="mb-8">
              <h2 className="text-[16.5px] font-bold text-gray-900 mb-3.5">
                Browse Holidays by Year
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {[
                  { year: 2023, label: 'Past Holidays' },
                  { year: 2024, label: 'Past Holidays' },
                  { year: 2025, label: 'Past Holidays' },
                  { year: 2026, label: 'Current Year' },
                  { year: 2027, label: 'Upcoming' },
                  { year: 2028, label: 'Upcoming' },
                ].map((item) => {
                  const isSelected = selectedYear === item.year;
                  return (
                    <button
                      key={item.year}
                      type="button"
                      onClick={() => {
                        setSelectedYear(item.year);
                        scrollToSection('holidays-table-section');
                      }}
                      className={`bg-white border rounded-xl p-3.5 flex items-center gap-3 text-left transition-all cursor-pointer shadow-2xs ${
                        isSelected
                          ? 'border-gray-300 ring-1 ring-[#0a5c36]/20'
                          : 'border-gray-200 hover:border-[#0a5c36]'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#e6f4ec] flex items-center justify-center shrink-0">
                        <CalendarSmallIcon />
                      </div>
                      <div>
                        <div className="text-[14px] font-bold text-gray-900 leading-tight tabular-nums">
                          {item.year}
                        </div>
                        <div className="text-[11px] text-gray-400 mt-0.5">
                          {item.label}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* G. Latest Articles Section */}
            <section id="articles-section" className="mb-8">
              <div className="flex items-center justify-between mb-3.5">
                <h2 className="text-[16.5px] font-bold text-gray-900">
                  Latest Articles
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveArticle(ARTICLES[0])}
                  className="text-[12px] font-medium text-[#0a5c36] hover:underline cursor-pointer"
                >
                  View All Articles →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ARTICLES.slice(0, 4).map((article) => (
                  <article
                    key={article.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs flex flex-col justify-between hover:border-gray-300 transition-colors"
                  >
                    <div>
                      <div className="text-[9.5px] font-bold tracking-wider uppercase text-[#0a5c36] mb-1.5">
                        {article.category}
                      </div>
                      <h3 className="text-[14px] font-bold text-gray-900 leading-snug mb-1.5">
                        {article.title}
                      </h3>
                      <p className="text-[11.5px] text-gray-500 leading-relaxed mb-3.5">
                        {article.excerpt}
                      </p>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => setActiveArticle(article)}
                        className="text-[11.5px] font-bold text-[#0a5c36] hover:underline cursor-pointer inline-flex items-center gap-1"
                      >
                        <span>Read article</span>
                        <span>→</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* H. Frequently Asked Questions Section */}
            <section id="faq-section">
              <div className="flex items-center justify-between mb-3.5">
                <h2 className="text-[16.5px] font-bold text-gray-900">
                  Frequently Asked Questions
                </h2>
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === null ? 0 : null)}
                  className="text-[12px] font-medium text-[#0a5c36] hover:underline cursor-pointer"
                >
                  View All FAQs →
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 overflow-hidden shadow-2xs">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={faq.question}>
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full py-3.5 px-4 text-left flex items-center gap-2 hover:bg-gray-50/70 transition-colors cursor-pointer"
                      >
                        <span
                          className={`text-[11px] text-gray-800 transition-transform duration-150 ${
                            isOpen ? 'rotate-90' : ''
                          }`}
                        >
                          ▸
                        </span>
                        <span className="text-[13px] font-bold text-gray-900">
                          {faq.question}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-8 pb-4 pt-0.5 text-[12px] text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR COLUMN */}
          <aside className="space-y-5">
            {/* 1. Recent Blogs Card */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="bg-[#0d6839] px-4 py-2.5 flex items-center gap-2 text-white font-bold text-[13px]">
                <DocMemoIcon />
                <span>Recent Blogs</span>
              </div>
              <div className="divide-y divide-gray-100 px-3.5">
                {SIDEBAR_BLOGS.map((blog) => (
                  <button
                    key={blog.id}
                    type="button"
                    onClick={() => {
                      const found = ARTICLES.find((a) => a.id === blog.id);
                      if (found) setActiveArticle(found);
                    }}
                    className="w-full py-3 flex items-start gap-3 text-left hover:bg-gray-50/60 transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#e6f4ec] flex items-center justify-center shrink-0 mt-0.5">
                      {renderSidebarIcon(blog.iconType)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[12px] font-bold text-gray-900 leading-snug mb-0.5 hover:text-[#0a5c36] transition-colors">
                        {blog.title}
                      </div>
                      <div className="text-[10.5px] text-gray-400">
                        {blog.meta}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Sidebar Ad 1 */}
            <div className="bg-white border border-dashed border-gray-300 rounded-xl h-[92px] flex items-center justify-center">
              <span className="text-[10px] tracking-[0.08em] uppercase text-gray-400 font-medium">
                ADVERTISEMENT (336 × 280)
              </span>
            </div>

            {/* 3. Quick Links Card */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="bg-[#0d6839] px-4 py-2.5 flex items-center gap-2 text-white font-bold text-[13px]">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white/90" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <span>Quick Links</span>
              </div>
              <div className="divide-y divide-gray-100 px-4">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedYear(2026);
                    scrollToSection('holidays-table-section');
                  }}
                  className="w-full py-2.5 text-left text-[12px] text-gray-700 hover:text-[#0a5c36] flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-gray-400">›</span>
                  <span>Holidays 2026</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('browse-years-section')}
                  className="w-full py-2.5 text-left text-[12px] text-gray-700 hover:text-[#0a5c36] flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-gray-400">›</span>
                  <span>Past Holidays</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('faq-section')}
                  className="w-full py-2.5 text-left text-[12px] text-gray-700 hover:text-[#0a5c36] flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-gray-400">›</span>
                  <span>FAQ</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInfoModal('contact')}
                  className="w-full py-2.5 text-left text-[12px] text-gray-700 hover:text-[#0a5c36] flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-gray-400">›</span>
                  <span>Contact Us</span>
                </button>
              </div>
            </div>

            {/* 4. Sidebar Ad 2 */}
            <div className="bg-white border border-dashed border-gray-300 rounded-xl h-[92px] flex items-center justify-center">
              <span className="text-[10px] tracking-[0.08em] uppercase text-gray-400 font-medium">
                ADVERTISEMENT (336 × 280)
              </span>
            </div>
          </aside>
        </div>
      </main>

      {/* 6. Footer */}
      <footer className="bg-[#052916] text-white">
        <div className="max-w-[1120px] mx-auto px-4 pt-10 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-white/10">
            {/* Col 1: Brand */}
            <div>
              <div className="flex items-center gap-2 font-bold text-[14.5px] text-white mb-2.5">
                <BdFlagIcon className="w-4 h-3" />
                <span>GovtHolidays.com.bd</span>
              </div>
              <p className="text-[11.5px] text-white/65 leading-relaxed max-w-[230px]">
                Bangladesh&apos;s trusted source for government public holidays.
              </p>
            </div>

            {/* Col 2: Explore */}
            <div>
              <h3 className="text-[12.5px] font-bold text-white mb-3">Explore</h3>
              <ul className="space-y-2 text-[11.5px] text-white/70">
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('articles-section')}
                    className="hover:text-white cursor-pointer"
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedYear(2026);
                      scrollToSection('holidays-table-section');
                    }}
                    className="hover:text-white cursor-pointer"
                  >
                    2026 Holidays
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Company */}
            <div>
              <h3 className="text-[12.5px] font-bold text-white mb-3">Company</h3>
              <ul className="space-y-2 text-[11.5px] text-white/70">
                <li>
                  <button
                    type="button"
                    onClick={() => setInfoModal('about')}
                    className="hover:text-white cursor-pointer"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setInfoModal('contact')}
                    className="hover:text-white cursor-pointer"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Legal */}
            <div>
              <h3 className="text-[12.5px] font-bold text-white mb-3">Legal</h3>
              <ul className="space-y-2 text-[11.5px] text-white/70">
                <li>
                  <button
                    type="button"
                    onClick={() => setInfoModal('privacy')}
                    className="hover:text-white cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setInfoModal('terms')}
                    className="hover:text-white cursor-pointer"
                  >
                    Terms &amp; Conditions
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-5 text-[11px] text-white/50">
            © 2026 GovtHolidays.com.bd — All Rights Reserved
          </div>
        </div>
      </footer>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0a5c36]">
                {activeArticle.category} · {activeArticle.readTime}
              </span>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="text-gray-400 hover:text-gray-700 text-sm font-bold px-2 py-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              {activeArticle.title}
            </h3>
            <div className="space-y-3 text-[13px] text-gray-600 leading-relaxed">
              {activeArticle.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="bg-[#0d6839] hover:bg-[#0a5c36] text-white text-xs font-semibold px-4 py-2 rounded-md cursor-pointer"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Modal (Privacy / Contact / About / Terms) */}
      {infoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setInfoModal(null)}
        >
          <div
            className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-gray-900">
                {infoModal === 'privacy' && 'Privacy Policy'}
                {infoModal === 'contact' && 'Contact Us'}
                {infoModal === 'about' && 'About GovtHolidays BD'}
                {infoModal === 'terms' && 'Terms & Conditions'}
              </h3>
              <button
                type="button"
                onClick={() => setInfoModal(null)}
                className="text-gray-400 hover:text-gray-700 text-sm font-bold px-2 py-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="text-[13px] text-gray-600 leading-relaxed space-y-2.5">
              {infoModal === 'privacy' && (
                <p>
                  GovtHolidays BD respects your privacy. We provide public holiday schedules and official gazette references for informational purposes without collecting personal user data.
                </p>
              )}
              {infoModal === 'contact' && (
                <>
                  <p>
                    Have a question or correction regarding Bangladesh Government Holidays 2026?
                  </p>
                  <p className="font-medium text-gray-800">
                    Email: info@govtholidays.com.bd
                  </p>
                  <p className="text-xs text-gray-500">
                    Dhaka, Bangladesh
                  </p>
                </>
              )}
              {infoModal === 'about' && (
                <p>
                  GovtHolidays BD is Bangladesh&apos;s dedicated resource for verified national, religious, and special government public holidays based on Ministry of Public Administration notifications.
                </p>
              )}
              {infoModal === 'terms' && (
                <p>
                  All holiday dates are verified against official announcements. Lunar religious holidays remain subject to official moon sighting declarations by the National Moon Sighting Committee.
                </p>
              )}
            </div>
            <div className="mt-5 pt-3 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => setInfoModal(null)}
                className="bg-[#0d6839] hover:bg-[#0a5c36] text-white text-xs font-semibold px-4 py-2 rounded-md cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
