import { DateTime } from 'luxon';

export function now() {
  return DateTime.now().toJSDate();
}
