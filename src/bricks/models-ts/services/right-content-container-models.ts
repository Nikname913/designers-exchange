export interface IRightContentContainer {
  contentType?: 
    'ECC' | 'ExecutorChatContainer' | 'ChapterCC' | 'ExpertCC' | 'AgreementCC' | 'EditProfileCC' | string,
  chatData: {
    chatID: string,
  },
  scroll: number,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')