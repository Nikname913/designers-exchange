export interface IDataUpdateReducer {
  updating: boolean,
  customerFilterName: string,
  executorFilterName: string,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')