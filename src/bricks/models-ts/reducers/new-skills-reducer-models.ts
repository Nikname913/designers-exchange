export interface INewSkillsReducer {
  education: [
    {
      title: string,
      finish: string,
      special: string
    },
    {
      title: string,
      finish: string,
      special: string
    },
    {
      title: string,
      finish: string,
      special: string
    }
  ],
  skills: [
    {
      title: string,
      site?: string,
      sm: string,
      sy: string,
      fm: string,
      fy: string,
      nowTime: boolean,
      job?: string,
      jobTasks?: string,
    },
    {
      title: string,
      site?: string,
      sm: string,
      sy: string,
      fm: string,
      fy: string,
      nowTime: boolean,
      job?: string,
      jobTasks?: string,
    },
    {
      title: string,
      site?: string,
      sm: string,
      sy: string,
      fm: string,
      fy: string,
      nowTime: boolean,
      job?: string,
      jobTasks?: string,
    },
    {
      title: string,
      site?: string,
      sm: string,
      sy: string,
      fm: string,
      fy: string,
      nowTime: boolean,
      job?: string,
      jobTasks?: string,
    },
    {
      title: string,
      site?: string,
      sm: string,
      sy: string,
      fm: string,
      fy: string,
      nowTime: boolean,
      job?: string,
      jobTasks?: string,
    },
    {
      title: string,
      site?: string,
      sm: string,
      sy: string,
      fm: string,
      fy: string,
      nowTime: boolean,
      job?: string,
      jobTasks?: string,
    }
  ],
  focused: string
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')