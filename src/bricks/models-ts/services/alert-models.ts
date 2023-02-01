import { CSSProperties } from "styled-components"

export interface IAlert {
  messageType: 'success' | 'warning' | 'info' | 'error',
  message: string,
  styles: CSSProperties
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')