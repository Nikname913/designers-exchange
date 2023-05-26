export interface IUpdatesReducer {
  updatesList: Array<{
    taskID: string,
    forUserType: 'CUSTOMER' | 'EXECUTOR',
    message?: string
  }>
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')