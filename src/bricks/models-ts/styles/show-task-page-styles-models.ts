export interface IWhiteContainer {
  flexParams: {
    direction: string,
    align: string,
    justify: string,
  },
  width: string,
  height?: string,
  backgroundColor?: string
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')