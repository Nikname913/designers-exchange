export interface ITaskTableProps {
  viewType?: string,
  dealStatus: string,
  deal: {
    type: string,
    coast?: number,
    prepaid?: number,
    expert?: number,
  },
  taskInitDate: string,
  taskTitle: string,
  taskDeadline: string,
  taskExpertType: string,
  taskExpertDate?: string,
  taskCustomer: string,
  taskExecutor: string,
  taskLocation: string,
  taskSpecializationTags: Array<string>,
  taskDescription: string,
  cardWidth: string | null,
  marbo: string | null,
  actions?: Array<any>,
  actionsParams?: Array<any>,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')