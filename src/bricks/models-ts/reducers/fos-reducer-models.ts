export interface IFOSReducer {
  isShow: boolean,
  scrollTop: number,
  showType: 'respondFromList' | 
    'respondFromTask'         | 
    'inviteOnTeam'            | 
    'commandRoot'             | 
    'command'                 | 
    'commandShort'            | 
    'authLogin'               |
    'authCreate'              |
    'authRestore'             |
    'authSupport'             |
    'changeAvatar'            |
    'showFile'                |
    'showFileContract'
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')