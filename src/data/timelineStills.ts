const stillModules = import.meta.glob('../assets/images/timeline/YY*-still-*.*', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>;

const stillEntries = Object.entries(stillModules)
  .map(([path, url]) => {
    const match = path.match(/(YY\d{3})-still-(\d+)\.[^.]+$/i);
    return match ? { id: match[1], order: Number(match[2]), url } : null;
  })
  .filter((entry): entry is { id: string; order: number; url: string } => Boolean(entry))
  .sort((a, b) => a.id.localeCompare(b.id) || a.order - b.order);

export const timelineStillGalleries: Partial<Record<string, string[]>> = {};

for (const entry of stillEntries) {
  (timelineStillGalleries[entry.id] ??= []).push(entry.url);
}

export const timelineStills: Partial<Record<string, string>> = Object.fromEntries(
  Object.entries(timelineStillGalleries).map(([id, images]) => [id, images?.[0]]),
);

export const timelineStillPositions: Partial<Record<string, string>> = {
  YY001: '50% 34%',
  YY004: '50% 24%',
  YY016: '50% 28%',
  YY017: '50% 28%',
  YY021: '50% 32%',
  YY025: '50% 34%',
  YY027: '50% 26%',
  YY030: '50% 25%',
  YY038: '50% 18%',
};
