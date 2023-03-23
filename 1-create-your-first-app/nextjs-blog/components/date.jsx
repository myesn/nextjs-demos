import { parseISO, format } from 'date-fns';

/**
 * 格式化日期的组件
 *
 * format() 选项：https://date-fns.org/v2.16.1/docs/format
 */
export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'yyyy-MM-dd')}</time>;
}
