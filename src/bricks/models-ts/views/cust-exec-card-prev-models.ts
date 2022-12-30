export interface ICustExecCardPrevProps {
  userName: string,
  userAvatar: string,
  userEmployment: string,
  userLocation: string,
  userReviews: number,
  userRate: number,
  userProjects: Array<number>,
  userTags: Array<string>,
  isDisabledMessage: boolean,
  cardWidth: string | null,
  marginBottom: string | null,
  marginRight: string | null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')