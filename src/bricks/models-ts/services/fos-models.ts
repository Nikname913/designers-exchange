import { CSSProperties } from "styled-components"

export interface IFos {
  showType: 'respondFromList' | 
  'respondFromTask'           | 
  'inviteOnTeam'              | 
  'commandRoot'               | 
  'command'                   | 
  'commandShort'              | 
  'authLogin'                 |
  'authCreate'                |
  'authRestore'               |
  'authSupport'               |
  'changeAvatar'              |
  'showFile'                  |
  'showFileContract'
  showShadow: boolean,
  scroll: number,
  css?: Array<CSSProperties>
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')