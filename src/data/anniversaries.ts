import { timelineWorks } from '@/data/timelineWorks';

const DAY_IN_MS = 86_400_000;
const BIRTH_DATE = '1991-09-09';

export interface UpcomingAnniversary {
  id: string;
  kind: 'birthday' | 'role' | 'variety';
  medium: 'birthday' | 'film' | 'television' | 'variety';
  title: string;
  role: string | null;
  originalDate: string;
  targetYear: number;
  anniversaryYear: number;
  days: number;
  month: number;
  day: number;
}

function datePartsInShanghai(date: Date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);

  return { year: value('year'), month: value('month'), day: value('day') };
}

function toUpcomingAnniversary(
  item: Omit<UpcomingAnniversary, 'targetYear' | 'anniversaryYear' | 'days' | 'month' | 'day'>,
  today: { year: number; month: number; day: number },
): UpcomingAnniversary {
  const [originalYear, month, day] = item.originalDate.split('-').map(Number);
  const todayValue = Date.UTC(today.year, today.month - 1, today.day);
  let targetYear = today.year;
  let targetValue = Date.UTC(targetYear, month - 1, day);

  if (targetValue < todayValue) {
    targetYear += 1;
    targetValue = Date.UTC(targetYear, month - 1, day);
  }

  return {
    ...item,
    targetYear,
    anniversaryYear: targetYear - originalYear,
    days: Math.round((targetValue - todayValue) / DAY_IN_MS),
    month,
    day,
  };
}

export function getUpcomingAnniversaries(now = new Date()): UpcomingAnniversary[] {
  const today = datePartsInShanghai(now);
  const birthday = toUpcomingAnniversary(
    {
      id: 'birthday',
      kind: 'birthday',
      medium: 'birthday',
      title: '杨洋生日',
      role: null,
      originalDate: BIRTH_DATE,
    },
    today,
  );
  const workAnniversaries = timelineWorks
    .filter((work): work is typeof work & { releaseDate: string } =>
      Boolean(work.releaseDate && (work.role || work.medium === 'variety')),
    )
    .map((work) =>
      toUpcomingAnniversary(
        {
          id: work.id,
          kind: work.medium === 'variety' ? 'variety' : 'role',
          medium:
            work.medium === 'film'
              ? 'film'
              : work.medium === 'variety'
                ? 'variety'
                : 'television',
          title: work.title,
          role: work.role,
          originalDate: work.releaseDate,
        },
        today,
      ),
    );

  return [birthday, ...workAnniversaries].sort(
    (a, b) => a.days - b.days || a.month - b.month || a.day - b.day || a.id.localeCompare(b.id),
  );
}

export function anniversaryCountdownCopy(event: UpcomingAnniversary) {
  if (event.kind === 'birthday') {
    if (event.days === 0) return '今天是杨洋生日';
    if (event.days === 1) return '明天见';
    return `距离杨洋生日还有 ${event.days} 天`;
  }

  if (event.kind === 'variety') {
    const subject = `《${event.title}》播出 ${event.anniversaryYear} 周年`;
    if (event.days === 0) return `今天是${subject}纪念日`;
    return `距离${subject}还有 ${event.days} 天`;
  }

  return `距离与${event.role}初见 ${event.anniversaryYear} 周年还有 ${event.days} 天`;
}

export function anniversaryDateLabel(event: UpcomingAnniversary) {
  const date = new Date(Date.UTC(event.targetYear, event.month - 1, event.day));
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    month: 'long',
    day: '2-digit',
  })
    .format(date)
    .toUpperCase();
}
