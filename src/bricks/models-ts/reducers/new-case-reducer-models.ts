export interface INewCaseReducer {
  caseName: string,
  caseStartYear: string,
  caseStartMonth: string,
  caseFinishYear: string,
  caseFinishMonth: string, 
  casePay: string,
  caseFiles: Array<File>,
  caseParams: {
    one: string,
    two: string,
    three: string,
    four: string,
  },
  caseText: string,
  caseTags: Array<string>,
  focused: string
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')