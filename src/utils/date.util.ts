import dayjs from 'dayjs'

export type DateType = string | number | dayjs.Dayjs | Date | null | undefined

export const formatFullDate = (
  date: DateType,
  format = 'YYYY/MM/DD HH:mm:ss'
) => {
  return dayjs(date).format(format)
}
