export interface ICreateTaskReducer {
  title: string,
  dateStart: any,
  dateFinish: any,
  tags: Array<string>,
  coast: string | 'contracted',
  prepay: string,
  prepayDays: string,
  expertise: string,
  expertiseDays: any,
  expertiseCoast: string,
  objectData: {
    constructionType: string,
    region: string,
    type: string,
    spec: string
  },
  objectParams: {
    square: string,
    storeys: string,
    height: string,
  },
  objectParamsSquare: string,
  objectParamsStoreys: string,
  objectParamsHeight: string,
  description: string,
  chapters: Array<{ title?: string, tags: Array<string>, description?: string }>,
  chapterLocalName?: string,
  chapterLocalDescription?: string, 
  focused: string,
  techTaskFile: Array<File>,
  contractFile?: Array<File>,
  completeFile?: Array<File>,
  showChaptersEditForms?: {
    show: boolean,
    num: number,
  },
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')