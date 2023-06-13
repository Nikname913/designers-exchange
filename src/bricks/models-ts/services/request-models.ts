export interface IRequest {
  callbackAction: Function,
  requestData: {
    type: 'GET' | 'POST' | 'POSTFILE_TTDF',
    urlstring: string,
    body: any
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')