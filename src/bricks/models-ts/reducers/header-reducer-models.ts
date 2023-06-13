export interface IHeaderReducer {
  walletCount: number,
  alertData: Array<any>,
  selectedUsersType?: 'CUST' | 'EXEC'
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')