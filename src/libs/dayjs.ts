import * as dayJs from 'dayjs';
import { PublishedDate } from './types';

// NOTE: date -> YYYY-MM-DD 형식으로 변한
export function DateToPublishedDate(date: Date | string): PublishedDate {
  return dayJs(date).format('YYYY-MM-DD');
}
