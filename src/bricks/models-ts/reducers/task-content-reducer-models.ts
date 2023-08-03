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
      experDate: string,
      customer: string,
      executor: string,
      region: string,
      tags: Array<string>,
      alertData?: Array<{
        taskID: string,
        message: string,
        initiator: string
      }>,
      description: string,
      status: 'work' | 'complete' | 'searching' | 'backside',
      viewtype: string,
      chapters?: Array<any>,
      coast: {
        value: any,
        issafe: boolean,
        prepay: any,
        prepayDays: string
        exper: any,
      },
      responds: Array<{
        executorID: string,
        deadline: string,
        coast: string,
        preSolution: string,
        prePay: string,
        expert: any,
        expertCoast: string,
        comment: string,
      }>,
      objectData?: {
        constructionType: string,
        region: string,
        type: string,
        spec: string,
      },
      objectParams?: {
        square: string,
        storeys : string,
        height: string,
      },
      focused?: string,
    }>,
    listOrders: Array<{
      id: string,
      name: string,
      date: string,
      deadline: string,
      exper: string,
      experDate: string,
      customer: string,
      executor: string,
      region: string,
      tags: Array<string>,
      alertData?: Array<{
        taskID: string,
        message: string,
        initiator: string
      }>,
      description: string,
      status: 'work' | 'complete' | 'searching' | 'backside',
      viewtype: string,
      chapters?: Array<any>,
      coast: {
        value: any,
        issafe: boolean,
        prepay: any,
        prepayDays: string
        exper: any,
      },
      responds: Array<{
        executorID: string,
        deadline: string,
        coast: string,
        preSolution: string,
        prePay: string,
        expert: any,
        expertCoast: string,
        comment: string,
      }>,
      objectData?: {
        constructionType: string,
        region: string,
        type: string,
        spec: string,
      },
      objectParams?: {
        square: string,
        storeys : string,
        height: string,
      },
      focused?: string,
    }>,
    listDeactive: Array<{
      id: string,
      name: string,
      date: string,
      deadline: string,
      exper: string,
      experDate: string,
      customer: string,
      executor: string,
      region: string,
      tags: Array<string>,
      alertData?: Array<{
        taskID: string,
        message: string,
        initiator: string
      }>,
      description: string,
      status: 'work' | 'complete' | 'searching' | 'backside',
      viewtype: string,
      chapters?: Array<any>,
      coast: {
        value: any,
        issafe: boolean,
        prepay: any,
        prepayDays: string
        exper: any,
      },
      responds: Array<{
        executorID: string,
        deadline: string,
        coast: string,
        preSolution: string,
        prePay: string,
        expert: any,
        expertCoast: string,
        comment: string,
      }>,
      objectData?: {
        constructionType: string,
        region: string,
        type: string,
        spec: string,
      },
      objectParams?: {
        square: string,
        storeys : string,
        height: string,
      },
      focused?: string,
    }>
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')