export interface IBussDataReducer {
  shortName: string,
  fullName: string,
  inn: string,
  kpp: string,
  ogrn: string,
  yurAddress: string,
  postAddress: string,
  boss: {
    name: string,
    type: number,
  },
  focused: string
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')