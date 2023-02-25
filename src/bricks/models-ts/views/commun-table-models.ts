export interface ICommunicationTableProps {
  status: "wait" | "correct" | "alarm",
  oneButtonParams: {
    isset: boolean,
    color: string,
    background: string,
    inner: string,
    width: number,
  },
  twoButtonParams: {
    isset: boolean,
    color: string,
    background: string,
    inner: string,
    width: number,
  },
  image: string,
  imageMt?: number | undefined,
  mb?: string | undefined,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')