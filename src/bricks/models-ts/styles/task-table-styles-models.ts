import { CSSProperties } from "react"

export interface ITaskTableDelimiterStyleProps {
  backgroundColor: string
}
export interface ITaskTableContainer {
  width: string | null,
  height: string | null,
  backgroundColor: string,
  marginBottom: string | null
}
export interface ITaskTableContainerInner {
  width: string | null,
  height: string | null,
  backgroundColor: string,
}
export interface ITaskTextSpan {
  style: CSSProperties
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')