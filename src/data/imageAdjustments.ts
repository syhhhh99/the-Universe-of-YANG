export type ImageAdjustmentContext = 'timeline' | 'detail';

export interface ImageAdjustment {
  offsetX: number;
  offsetY: number;
  scale: number;
}

export const IMAGE_OFFSET_LIMIT = 100;

type ImageAdjustmentEntry = Partial<Record<ImageAdjustmentContext, ImageAdjustment>>;
export type ImageAdjustmentStore = Record<string, ImageAdjustmentEntry>;

const STORAGE_KEY = 'yang-archive-image-adjustments-v6';
const OBSOLETE_STORAGE_KEYS = [
  'yang-archive-image-adjustments-v2',
  'yang-archive-image-adjustments-v3',
  'yang-archive-image-adjustments-v4',
  'yang-archive-image-adjustments-v5',
];
const finalImageAdjustments = savedImageAdjustments as ImageAdjustmentStore;

function storageAvailable() {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function normalized(adjustment: ImageAdjustment): ImageAdjustment {
  return {
    offsetX: clamp(Number(adjustment.offsetX) || 0, -IMAGE_OFFSET_LIMIT, IMAGE_OFFSET_LIMIT),
    offsetY: clamp(Number(adjustment.offsetY) || 0, -IMAGE_OFFSET_LIMIT, IMAGE_OFFSET_LIMIT),
    scale: clamp(Number(adjustment.scale) || 1, 1, 1.5),
  };
}

function adjustmentKey(workId: string, imageIndex: number) {
  return `${workId}:${imageIndex}`;
}

function readImageAdjustmentOverrides(): ImageAdjustmentStore {
  if (!storageAvailable()) return {};
  try {
    for (const key of OBSOLETE_STORAGE_KEYS) window.localStorage.removeItem(key);
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}') as ImageAdjustmentStore;
  } catch {
    return {};
  }
}

export function readImageAdjustments(): ImageAdjustmentStore {
  const overrides = readImageAdjustmentOverrides();
  const keys = new Set([...Object.keys(finalImageAdjustments), ...Object.keys(overrides)]);
  return Object.fromEntries(
    [...keys].map((key) => [
      key,
      { ...finalImageAdjustments[key], ...overrides[key] },
    ]),
  );
}

export function getImageAdjustment(
  workId: string,
  imageIndex: number,
  context: ImageAdjustmentContext,
): ImageAdjustment {
  const saved = readImageAdjustments()[adjustmentKey(workId, imageIndex)]?.[context];
  return saved ? normalized(saved) : { offsetX: 0, offsetY: 0, scale: 1 };
}

export function saveImageAdjustment(
  workId: string,
  imageIndex: number,
  context: ImageAdjustmentContext,
  adjustment: ImageAdjustment,
) {
  if (!storageAvailable()) return;
  const store = readImageAdjustmentOverrides();
  const key = adjustmentKey(workId, imageIndex);
  store[key] = { ...store[key], [context]: normalized(adjustment) };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function resetImageAdjustment(
  workId: string,
  imageIndex: number,
  context: ImageAdjustmentContext,
) {
  if (!storageAvailable()) return;
  const store = readImageAdjustmentOverrides();
  const key = adjustmentKey(workId, imageIndex);
  if (!store[key]) return;
  delete store[key][context];
  if (!store[key].timeline && !store[key].detail) delete store[key];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function resetAllImageAdjustments() {
  if (storageAvailable()) window.localStorage.removeItem(STORAGE_KEY);
}
import savedImageAdjustments from '@/data/imageAdjustments.saved.json';
