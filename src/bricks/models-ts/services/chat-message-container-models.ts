export interface IChatMessageContainer {
  data: Array<{
    date: string,
    messages: Array<{
      type: string, 
      content: Array<{ 
        text: string, 
        time: string,
        name?: string,
        files?: {
          id: string,
          ext: string,
          name?: string
        },
        likes?: number  
      }>,
    }>
  } | null>
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')