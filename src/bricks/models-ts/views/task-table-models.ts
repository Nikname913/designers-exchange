export interface ITaskTableProps {
  dealStatus: string,
  deal: {
    type: string,
    prepaid?: number,
    expert?: number,
  },
  taskInitDate: string,
  taskTitle: string,
  taskDeadline: string,
  taskExpertType: string,
  taskCustomer: string,
  taskExecutor: string,
  taskLocation: string,
  taskSpecializationTags: Array<string>,
  taskDescription: string,
  cardWidth: string | null,
  marbo: string | null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')