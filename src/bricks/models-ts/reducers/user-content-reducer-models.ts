export interface IUserContent {
  USERS_DATA: {
    showOne: string,
    listExecutors: Array<{
      id: string,
      name: string,
      rate: number,
      stat: Array<number>,
      tags: Array<string>,
      jobType: string,
      role: string
    }>,
    listCustomers: Array<{
      id: string,
      name: string,
      rate: number,
      stat: Array<number>,
      tags: Array<string>,
      jobType: string,
      role: string
    }>
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')