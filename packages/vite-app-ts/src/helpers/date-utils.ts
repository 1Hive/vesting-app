import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import relativeTime from 'dayjs/plugin/relativeTime';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import { round } from './math-utils';

export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

// const KNOWN_FORMATS = {
//   onlyDate: 'DD/MM/YYYY',
//   iso: 'YYYY-MM-DD',
//   custom: 'DD MMMM HH:mm',
// };

export enum KNOWN_FORMATS {
  onlyDate = 'DD/MM/YYYY',
  iso = 'YYYY-MM-DD',
  custom = 'DD MMMM HH:mm',
}

// dayjs plugins
dayjs.extend(duration);
dayjs.extend(isBetween);
dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);

function dateFormat(date: number, format = KNOWN_FORMATS.custom) {
  return dayjs.unix(date).format(format.toString());
}

function durationTime(seconds: number) {
  return dayjs.duration(seconds, 'seconds').humanize();
}
const toMs = (seconds: number) => seconds * 1000;

function durationToHours(
  duration: Partial<{
    milliseconds: number;
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
    months: number;
    years: number;
    weeks: number;
  }>
) {
  return round(dayjs.duration(duration).asHours());
}

export function noop() {}

export function toMilliseconds(seconds: string) {
  return parseInt(seconds) * 1000;
}

// Displays the difference between two dates
function getRelativeTime(
  from: string | number | dayjs.Dayjs | Date | null | undefined,
  to: string | number | dayjs.Dayjs | Date | null | undefined
) {
  return dayjs(to)
    .from(from)
    .replace(/minutes?/, 'min')
    .replace(/seconds?/, 'sec')
    .trim();
}

export { dayjs, dateFormat, durationTime, getRelativeTime, toMs, durationToHours };
