export interface IUserContent {
  USERS_DATA: {
    showOne: string,
    listExecutors: Array<{
      docs: any | Array<any>,
      spec?: Array<string>,
      reviews?: Array<any>,
      aboutText?: string,
      faceType?: string,
      mail?: string | number | boolean | undefined,
      number?: string | number | boolean | undefined,
      bio?: any,
      id: string,
      name: string,
      rate: number,
      stat: Array<number>,
      tags: Array<string>,
      jobType: string,
      role: string
    }>,
    listCustomers: Array<{
      docs: any,
      mail?: string | number | boolean | undefined,
      number?: string | number | boolean | undefined,
      bio?: any,
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