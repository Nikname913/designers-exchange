export interface IPortfolioNewReducer {
  name: string,
  start: {
    month: string,
    year: string
  },
  finish: {
    month: string,
    year: string
  },
  actsPayData: Array<string>,
  files: Blob | null,
  params: Array<string>,
  description: string,
  spec: Array<string>
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')