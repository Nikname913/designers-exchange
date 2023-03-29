export interface IFos {
  showType: 'respondFromList' | 
  'respondFromTask'           | 
  'inviteOnTeam'              | 
  'commandRoot'               | 
  'command'                   | 
  'commandShort'              | 
  'authLogin'                 |
  'authRestore'               |
  'authSupport'               |
  'changeAvatar',
  showShadow: boolean,
  scroll: number
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')