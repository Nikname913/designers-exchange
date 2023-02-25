export interface IRightContentReducer {
  isShow: true | false | 'undefined',
  scrollTop: number
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')