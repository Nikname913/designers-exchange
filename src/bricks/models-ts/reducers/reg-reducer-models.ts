export interface IRegReducer {
  surname: string,
  name: string,
  secondName: string,
  email: string,
  number: string,
  spec: string,
  password: string,
  faceType: string,
  focused: string,
  code: string,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')