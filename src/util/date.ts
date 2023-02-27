import moment from 'moment-timezone';

export const startDate = (): string => {
  return moment().tz('Asia/Seoul').format('YYYY-MM-DD');
};
export const endDate = (): string => {
  return moment().tz('Asia/Seoul').add(1, 'day').format('YYYY-MM-DD');
};

export const startBeforeDate = (): string => {
  const week: number = moment('2023-02-22').day();
  return week == 6
    ? moment('2023-02-22').subtract(1, 'day').format('YYYY-MM-DD')
    : week == 0
    ? moment('2023-02-22').subtract(2, 'day').format('YYYY-MM-DD')
    : week == 1
    ? moment('2023-02-22').subtract(3, 'day').format('YYYY-MM-DD')
    : moment('2023-02-22').subtract(1, 'day').format('YYYY-MM-DD');
};
export const endBeforeDate = (): string => {
  return moment('2023-02-22').format('YYYY-MM-DD');
};

export const startBeforeMinute = (): string => {
  return moment(moment().valueOf() + moment().tz('Asia/Seoul').utcOffset() * 60000)
    .subtract(1, 'minute')
    .startOf('minute')
    .toISOString();
};
export const endBeforeMinute = (): string => {
  return moment(moment().valueOf() + moment().tz('Asia/Seoul').utcOffset() * 60000)
    .startOf('minute')
    .toISOString();
};
