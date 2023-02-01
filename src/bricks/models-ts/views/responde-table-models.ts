export interface IRespondeTableProps {
  containerCSS: {
    w: string,
    h: string,
    mb: string,
    bg: string,
  },
  userName: string,
  userJob: string,
  userRate: number,
  userStat: { completed?: number, failed?: number, worked?: number },
  userPrice: number,
  userDeadline: string,
  userLocation: string,
  userTags: Array<string>,
  userMorePrice: Array<string>,
  respondDate: string,
  discription: string,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')