export interface IRespondReducer {
  deadline: string,
  coast: string,
  solution: string,
  prepay: string,
  expert: string,
  expertCost: string,
  comment: string,
  focused: string,
  task: string,
  executor: string,
  dateFinish: any
  dateExpert: any,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')