export interface ITaskContent {
  TASKS_DATA: {
    actualOne: string,
    showOne: string,
    list: Array<{
      id: string,
      name: string,
      date: string,
      deadline: string,
      exper: string,
      customer: string,
      executor: string,
      region: string,
      tags: Array<string>,
      description: string,
      status: 'work' | 'complete' | 'searching' | 'backside',
      viewtype: string,
      coast: {
        value: any,
        issafe: boolean,
        prepay: any,
        exper: any,
      },
      responds: Array<{
        user: string,
      }>
    }>
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')