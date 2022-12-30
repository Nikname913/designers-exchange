export interface IRequestComponent {
  callbackAction: string,
  requestData: {
    type: string,
    urlstring: string,
    reqbody: BodyInit | null | undefined
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')