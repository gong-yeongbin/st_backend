import moment from 'moment-timezone';

export const startDate = (): string => {
  return moment().tz('Asia/Seoul').format('YYYY-MM-DD');
};
export const endDate = (): string => {
  return moment().tz('Asia/Seoul').add(1, 'day').format('YYYY-MM-DD');
};

export const startBeforeDate = (): string => {
  const week: number = moment().day();
  return week == 6
    ? moment().subtract(1, 'day').format('YYYY-MM-DD')
    : week == 0
    ? moment().subtract(2, 'day').format('YYYY-MM-DD')
    : week == 1
    ? moment().subtract(3, 'day').format('YYYY-MM-DD')
    : moment().subtract(1, 'day').format('YYYY-MM-DD');
};
export const endBeforeDate = (): string => {
  return moment().format('YYYY-MM-DD');
};

export const startBeforeMinute = (): string => {
  return moment(
    moment().valueOf() + moment().tz('Asia/Seoul').utcOffset() * 60000
  )
    .subtract(1, 'minute')
    .startOf('minute')
    .toISOString();
};
export const endBeforeMinute = (): string => {
  return moment(
    moment().valueOf() + moment().tz('Asia/Seoul').utcOffset() * 60000
  )
    .startOf('minute')
    .toISOString();
};
