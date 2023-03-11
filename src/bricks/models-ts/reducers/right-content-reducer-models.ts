export interface IRightContentReducer {
  isShow: true | false | 'undefined',
  showType?: 'ECC'    |
     'MDCC'           | 
     'ChapterCC'      | 
     'ExpertCC'       | 
     'AgreementCC'    | 
     'AgreementNewCC' | 
     'LawyerCC'       |
     'ArguementCC',
  scrollTop: number
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => false && console.log('интерфейсы проэкспортированы')