export interface IRequest {
  callbackAction: Function,
  requestData: {
    type: 'GET'           | 
      'POST'              | 
      'POSTFILE_TTDF'     | 
      'POSTFILE_CONTRACT' | 
      'POSTFILE_COMPLETE' |
      'POSTFILE_CASE',
    urlstring: string,
    body: any
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')