import { ReactElement } from "react"

export interface ICabinetAlarmLineProps {
  background: string,
  buttons: Array<ReactElement>,
  isNew: boolean,
  content: {
    date: string,
    text: string
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')