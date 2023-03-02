import moment from 'moment-timezone';

export const startDate = (): string => {
  return moment().tz('Asia/Seoul').format('YYYY-MM-DD');
};
export const endDate = (): string => {
  return moment().tz('Asia/Seoul').add(1, 'day').format('YYYY-MM-DD');
};

export const startBeforeDate = (): string => {
  const week: number = moment().tz('Asia/Seoul').day();
  return week == 6
    ? moment().tz('Asia/Seoul').subtract(1, 'day').format('YYYY-MM-DD')
    : week == 0
    ? moment().tz('Asia/Seoul').subtract(2, 'day').format('YYYY-MM-DD')
    : week == 1
    ? moment().tz('Asia/Seoul').subtract(3, 'day').format('YYYY-MM-DD')
    : moment().tz('Asia/Seoul').subtract(1, 'day').format('YYYY-MM-DD');
};
export const endBeforeDate = (): string => {
  return moment().tz('Asia/Seoul').format('YYYY-MM-DD');
};

export const startBeforeMinute = (): string => {
  return moment('2023-03-02 09:01:00')
    .tz('Asia/Seoul')
    .subtract(1, 'minute')
    .startOf('minute')
    .format('YYYY-MM-DD HH:mm:ss');
};
export const endBeforeMinute = (): string => {
  return moment('2023-03-02 09:01:00').tz('Asia/Seoul').startOf('minute').format('YYYY-MM-DD HH:mm:ss');
};
