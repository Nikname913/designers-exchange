export interface ICustExecCardPrevProps {
  userId?: string,
  userName: string,
  userAvatar: string,
  userType?: 'CUSTOMER' | 'EXECUTOR',
  userEmployment: string,
  userLocation: string,
  userReviews: number,
  userRate: number,
  userProjects: Array<number>,
  userTags: Array<string | Array<string>>,
  isDisabledMessage: boolean,
  cardWidth: string | null,
  marginBottom: string | null,
  marginRight: string | null,
  forCabinet?: boolean
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')