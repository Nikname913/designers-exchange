export interface IRoleTypeReducer {
  activeRole: 'CUSTOMER' | 'EXECUTOR' | 'UNDEFINED',
  roleData: {
    userID: string,
    userName: string
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')