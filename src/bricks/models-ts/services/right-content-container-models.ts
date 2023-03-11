export interface IRightContentContainer {
  contentType?: 
    'ECC' | 'ExecutorChatCpntainer' | 'ChapterCC' | 'ExpertCC' | 'AgreementCC' | string,
  chatData: {
    userID: string,
    userName: string,
    userLastctive: string,
  },
  scroll: number,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')