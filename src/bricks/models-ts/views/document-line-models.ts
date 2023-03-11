export interface IDocumentLineProps {
  status: string,
  data: {
    name: string,
    date: string,
    statusName: string,
    size?: number
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')