// ----------------------------------------------------------------
/* eslint-disable react-hooks/exhaustive-deps */
// ----------------------------------------------------------------
import React, { ReactElement, useState, useEffect } from 'react'
import { CSSProperties } from 'styled-components'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { setShow, setShowType } from '../../../store/slices/right-content-slice'
import { setShow as setShowFOS, 
  setShowType as setShowTypeFOS } from '../../../store/slices/fos-slice'
import { setContractFile, resetContractFile, setCompleteFile, resetCompleteFile } from '../../../store/slices/create-task-slice'
import { setAboutText } from '../../../store/slices/about-text-slice'
import { setCaseName,
  setCaseSY,
  setCaseSM,
  setCaseFY,
  setCaseFM,
  setCasePay,
  setCaseFiles,
  setCaseParams1,
  setCaseParams2,
  setCaseParams3,
  setCaseParams4,
  setCaseText,
  setCaseTags } from '../../../store/slices/new-case-slice'
import { setShow as setShowAlert , setType, setMessage } from '../../../store/slices/alert-content-slice'
import { addInEducation1Title, 
  addInEducation1Finish,
  addInEducation1Special,
  addInSkills1Title,
  addInSkills1Site,
  addInSkills1Sm,
  addInSkills1Sy,
  addInSkills1Fm,
  addInSkills1Fy,
  addInSkills1Job,
  addInSkills1JobTasks
}  from '../../../store/slices/new-skills-slice'

import DocumentLine from '../views/localViews/DocumentLine'
import Switch from '@mui/material/Switch'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox'
import ButtonComponent from '../comps/button/Button'
import InputComponent from '../comps/input/Input'
import SelectField from '../comps/select/SelectField'
import SelectFieldPercent from '../comps/select/SelectFieldPercentWidth'
import ChatMessagesContainer from './chatMessagesContainer.service'
import CommunicationTable from '../views/localViews/CommunicationTable'
import ChapterController from '../views/localViews/СhapterController'
import { IRightContentContainer } from '../../../models-ts/services/right-content-container-models'
import RequestActionsComponent from './request.service'
import css from '../styles/services/rightContentContainer.css'
import Fab from '@mui/material/Fab'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import CloseIcon from '@mui/icons-material/Clear'

import bearAvatar from '../../../img/avatars/bear.svg'
import enotAvatar from '../../../img/avatars/enot.svg'
import foxAvatar from '../../../img/avatars/fox.svg'
import groupAvatar from '../../../img/avatars/group.svg'
import manAvatar from '../../../img/avatars/man.svg'
import womanAvatar from '../../../img/avatars/woman.svg'

import closeIcon from '../../../img/icons/close.svg'
import defaulrAvatar from '../../../img/stock/avatar.svg'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import EmailIcon from '@mui/icons-material/Email'
import clipIcon from '../../../img/icons/clip.svg'
import tillIcon from '../../../img/icons/till.svg'
import linesIcon from '../../../img/icons/lines.svg'
import arraySortIcon from '../../../img/icons/sortArray.svg'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import document from '../../../img/icons/chatActions/blankRound.svg'
import semiMenu from '../../../img/icons/semiMenu.svg'
import correctIcon from '../../../img/icons/correct.svg'
import docCorrect from '../../../img/icons/docCorrect.svg'
import docWait from '../../../img/icons/docTime.svg'
import doc from '../../../img/icons/files/withActionTwo/doc.svg'
import txt from '../../../img/icons/files/withActionTwo/txt.svg'
import pdf from '../../../img/icons/files/withActionTwo/pdf.svg'
import correct from '../../../img/icons/correct.svg'
import wait from '../../../img/icons/wait.svg'
import plus from '../../../img/icons/plus.svg'
import infoGrey from '../../../img/icons/infoGrey.svg'

const { ShadowContainer, 
  ShadowContainerInner, 
  ChatFork, 
  MasterDocFork, 
  EditProfileFork,
  EditProjectsEducationFork } = css

const RightContentContainer: React.FC<IRightContentContainer> = (props: IRightContentContainer) => {

  const dispatch = useAppDispatch()
  const [ docviewFormat, setDocviewFormat ] = useState<'lines' | 'tiles'>('tiles')
  const [ spec, setSpec ] = useState<string>('')
  const [ masterDocsShadowContent, setMasterDocsShadowContent ] = useState<boolean>(false)
  const [ localImage, setLocalImage ] = useState<any>()

  const [ SPEC_REQUEST, SET_SPEC_REQUEST ] = useState(false)
  const [ ABOUT_TEXT_REQUEST, SET_ABOUT_TEXT_REQUEST ] = useState(false)
  const [ SEND_CONTRACT_REQUEST, SET_SEND_CONTRACT_REQUEST ] = useState(false)
  const [ SEND_COMPLETE_REQUEST, SET_SEND_COMPLETE_REQUEST ] = useState(false)
  const [ ADD_CASE_REQUEST, SET_ADD_CASE_REQUEST ] = useState(false)
  const [ ADD_EDUCATION_REQUEST, SET_ADD_EDUCATION_REQUEST ] = useState(false)
  const [ ADD_JOB_REQUEST, SET_ADD_JOB_REQUEST ] = useState(false)
  const [ SEND_CASE_REQUEST, SET_SEND_CASE_REQUEST ] = useState(false)

  const [ educationCounter, setEducationCounter ] = useState<number>(1)
  const [ skillCounter, setSkillCounter] = useState<number>(1)
  const [ actsCounter, setActsCounter] = useState<number>(1)
  const [ chapterStep, setChapterStep ] = useState<number>(0)
  const [ chapters, setChapters ] = useState<Array<{ 
    
    title: string, 
    tags: Array<any>, 
    description: string 

  }>>([{ title: '', tags: [], description: '' }])
  const [ contractFileServer, setContractFileServer ] = useState<{ name: string, size: number, text: string }>({

    name: '',
    size: 0,
    text: ''

  })
  const [ contractFileServerPDF, setContractFileServerPDF ] = useState<{ name: string, size: number, text: string }>({

    name: '',
    size: 0,
    text: ''

  })
  const [ completeFileServer, setCompleteFileServer ] = useState<{ name: string, size: number, text: string }>({

    name: '',
    size: 0,
    text: ''

  })

  const selectTask = useAppSelector(state => state.taskContentReducer.TASKS_DATA.actualOne)
  const taskList = useAppSelector(state => state.taskContentReducer.TASKS_DATA.list)
  const ordersList = useAppSelector(state => state.taskContentReducer.TASKS_DATA.listOrders)

  const localText = 'Nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et. Posuere fringilla erat consectetur mi commodo congue erat sed pellentesque. Adipiscing in eget lacinia amet dui eu sit facilisi. Neque id tortor ut egestas nunc in blandit. Sed elit nulla nibh dolor massa facilisis in urna. Ac morbi lobortis nulla justo. Nisl leo a lobortis et. Fusce habitasse id blandit non felis tortor eget turpis. Diam eleifend varius luctus leo. Suspendisse ornare enim egestas in velit feugiat purus vulputate. Egestas odio vitae cras in. Auctor consectetur feugiat molestie adipiscing non tortor parturient et. Sed leo orci vitae adipiscing. Sit posuere massa vel vestibulum sollicitudin'

  const { contentType,
    scroll, 
    chatData: { 
      userID, 
      userName, 
      userLastctive 
    }
  } = props

  const backgroundColor = useAppSelector(state => state.theme.bg)
  const greyColor = useAppSelector(state => state.theme.grey)
  const greyColor2 = useAppSelector(state => state.theme.grey2)
  const greyColor3 = useAppSelector(state => state.theme.grey3)
  const chatBorderColor = useAppSelector(state => state.theme.blue3)
  const chatBackground = useAppSelector(state => state.theme.white)
  const inputBackground = useAppSelector(state => state.theme.white)
  const chatSubmitColor = useAppSelector(state => state.theme.blue2)
  const blueColor2 = useAppSelector(state => state.theme.blue2)
  const blankCorrectColor = useAppSelector(state => state.theme.blue4)

  const USER_ROLE = useAppSelector(state => state.roleTypeReducer.activeRole)
  const USER_ID = useAppSelector(state => state.roleTypeReducer.roleData.userID)
  const EXECUTOR = useAppSelector(state => state.userContentReducer.USERS_DATA.listExecutors)
    .filter((executor: any) => executor.clientId === USER_ID)
  const CUSTOMER = useAppSelector(state => state.userContentReducer.USERS_DATA.listCustomers)
    .filter((customer: any) => customer.clientId === USER_ID)
  const ABOUT_TEXT = useAppSelector(state => state.aboutTextReducer.aboutText)

  const NEW_AGREE_COAST = useAppSelector(state => state.changeAgreeReducer.newCoast)
  const NEW_AGREE_PREPAY = useAppSelector(state => state.changeAgreeReducer.newPrepay)
  const NEW_AGREE_EXPERT = useAppSelector(state => state.changeAgreeReducer.newExpert)
  const NEW_AGREE_TEXT = useAppSelector(state => state.changeAgreeReducer.newText)

  const avatarFile = useAppSelector(state => state.avatarReducer.avatarFile)
  const CONTRACT_FILE = useAppSelector(state => state.createTaskReducer.contractFile)
  const COMPLETE_FILE = useAppSelector(state => state.createTaskReducer.completeFile)

  const CASE_NAME = useAppSelector(state => state.newCaseReducer.caseName)
  const CASE_SY = useAppSelector(state => state.newCaseReducer.caseStartYear)
  const CASE_SM = useAppSelector(state => state.newCaseReducer.caseStartMonth)
  const CASE_FY = useAppSelector(state => state.newCaseReducer.caseFinishYear)
  const CASE_FM = useAppSelector(state => state.newCaseReducer.caseFinishMonth)
  const CASE_PAY = useAppSelector(state => state.newCaseReducer.casePay)
  const CASE_FILE = useAppSelector(state => state.newCaseReducer.caseFiles)
  const CASE_P1 = useAppSelector(state => state.newCaseReducer.caseParams.one)
  const CASE_P2 = useAppSelector(state => state.newCaseReducer.caseParams.two)
  const CASE_P3 = useAppSelector(state => state.newCaseReducer.caseParams.three)
  const CASE_P4 = useAppSelector(state => state.newCaseReducer.caseParams.four)
  const CASE_TEXT = useAppSelector(state => state.newCaseReducer.caseText)
  const CASE_TAGS = useAppSelector(state => state.newCaseReducer.caseTags)

  const EDUCATION_BLOCK_1 = useAppSelector(state => state.newSkillsReducer.education[0])
  const JOB_BLOCK_1 = useAppSelector(state => state.newSkillsReducer.skills[0])

  const avatarCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '50px',
    height: '50px',
  }
  const nameSpanCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    fontWeight: 'bold',
    marginBottom: '4px'
  }
  const lastActiveSpanCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    color: greyColor2,
    fontSize: '13px'
  }
  const divCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  }
  const bottomDivCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position:'relative',
    width: '100%',
    height: 'auto',
    paddingLeft: '20px',
    paddingRight: '20px',
    boxSizing: 'border-box'
  }
  const bottomDivInnerCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position:'relative',
    width: '100%',
    height: 'auto',
    borderTop: '1px solid #D9E7F0',
    boxSizing: 'border-box',
    paddingTop: '20px',
    paddingBottom: '22px',
  }
  const clipDivCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'relative',
    width: '50px',
    height: '50px',
    marginRight: '6px'
  }
  const fileSorterCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative'
  }
  const semiIconsCSS: CSSProperties = {
    display: 'block',
    position: 'absolute',
    top: '0%',
    left: '100%',
    marginTop: '0px',
    cursor: 'pointer',
  }
  const blankButtonCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    backgroundColor: blankCorrectColor,
    height: '38px',
    width: '164px',
    borderRadius: '4px',
    paddingBottom: '2px',
    paddingLeft: '16px',
    cursor: 'pointer',
  }
  const doctileCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    position: 'relative',
    width: '16.666%',
    marginBottom: '13px'
  }
  const whiteContainerCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    width: '100%',
    height: 'auto',
    minHeight: '40px',
    padding: '26px 34px',
    borderRadius: '8px',
    backgroundColor: 'white',
    marginTop: '20px'
  }
  const avatarContainerCSS: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  }

  function showrightContent(): void {
    dispatch(setShow(false))
  }
  function showNewAgreement(): void {
    dispatch(setShowType('AgreementNewCC'))
  }
  function changeAvatar(): void {
    dispatch(setShowFOS(true))
    dispatch(setShowTypeFOS('changeAvatar'))
  }
  function changeAboutText(): void {
    SET_ABOUT_TEXT_REQUEST(true)
    setTimeout(() => { SET_ABOUT_TEXT_REQUEST(false) }, 1300)
  }
  function changeContract(): void {
    SET_SEND_CONTRACT_REQUEST(true)
    setTimeout(() => {
      dispatch(setShow(false)) 
      dispatch(resetContractFile(''))
      SET_SEND_CONTRACT_REQUEST(false) 
    }, 1300)
  }
  function changeComplete(): void {
    SET_SEND_COMPLETE_REQUEST(true)
    setTimeout(() => {
      dispatch(setShow(false)) 
      dispatch(resetCompleteFile(''))
      SET_SEND_COMPLETE_REQUEST(false) 
    }, 1300)
  }
  const changeTechTaskFile = (param: File) => {
    dispatch(resetContractFile(''))
    dispatch(setContractFile(param))
  }
  const changeCompleteFile = (param: File) => {
    dispatch(resetCompleteFile(''))
    dispatch(setCompleteFile(param))
  }

  const changeSM = (param: string) => {
    dispatch(setCaseSM(param))
  }
  const changeFM = (param: string) => {
    dispatch(setCaseFM(param))
  }
  const changeCaseRegion = (param: string) => {
    dispatch(setCaseParams4(param))
  }
  const changeCaseTags = (param: string) => {
    dispatch(setCaseTags(param))
  }

  const newCaseFile = (param: File) => {

    dispatch(setCaseFiles(param))

  }

  const sendEducation = () => {

    if ( EDUCATION_BLOCK_1.title !== '' && EDUCATION_BLOCK_1.finish !== '' && EDUCATION_BLOCK_1.special !== '' ) {

      console.log({
        clientId: USER_ID,
        addInEducation1Title: EDUCATION_BLOCK_1.title,
        addInEducation1Finish: EDUCATION_BLOCK_1.finish,
        addInEducation1Special: EDUCATION_BLOCK_1.special
      })

      SET_ADD_EDUCATION_REQUEST(true)

      dispatch(setShowAlert(true))
      dispatch(setType('success'))
      dispatch(setMessage('Данные об образовании успешно добавлены'))

      setTimeout(() => {

        SET_ADD_EDUCATION_REQUEST(false)

        dispatch(addInEducation1Title(''))
        dispatch(addInEducation1Finish(''))
        dispatch(addInEducation1Special(''))

        dispatch(setShowAlert(false))
        dispatch(setType('success'))

      }, 2000)

    } else {

      dispatch(setShowAlert(true))
      dispatch(setType('error'))
      dispatch(setMessage('Нужно заполнить все поля ввода для того, чтобы добавить новые данные об образовании'))

    }

  }

  const sendSkill = () => {

    if ( JOB_BLOCK_1.title !== '' 
      && JOB_BLOCK_1.site !== ''
      && JOB_BLOCK_1.sm !== ''
      && JOB_BLOCK_1.sy !== ''
      && JOB_BLOCK_1.fm !== '' 
      && JOB_BLOCK_1.fy !== ''
      && JOB_BLOCK_1.job !== ''
      && JOB_BLOCK_1.jobTasks !== '' ) {

      console.log({
        clientId: USER_ID,
        addInSkills1Title: JOB_BLOCK_1.title,
        addInSkills1Site: JOB_BLOCK_1.site,
        addInSkills1Sm: JOB_BLOCK_1.sm,
        addInSkills1Sy: JOB_BLOCK_1.sy,
        addInSkills1Fm: JOB_BLOCK_1.fm,
        addInSkills1Fy: JOB_BLOCK_1.fy,
        addInSkills1NowTime: JOB_BLOCK_1.nowTime,
        addInSkills1Job: JOB_BLOCK_1.job,
        addInSkills1JobTasks: JOB_BLOCK_1.jobTasks 
      })

      SET_ADD_JOB_REQUEST(true)

      dispatch(setShowAlert(true))
      dispatch(setType('success'))
      dispatch(setMessage('Данные о месте работы успешно добавлены'))

      setTimeout(() => {

        SET_ADD_JOB_REQUEST(false)

        dispatch(addInSkills1Title(''))
        dispatch(addInSkills1Site('Не указано'))
        dispatch(addInSkills1Sm('Не указано'))
        dispatch(addInSkills1Sy('Не указано'))
        dispatch(addInSkills1Fm('Не указано'))
        dispatch(addInSkills1Fy('Не указано'))
        dispatch(addInSkills1Job(''))
        dispatch(addInSkills1JobTasks(''))

        dispatch(setShowAlert(false))
        dispatch(setType('success'))

      }, 2000)

    } else {

      dispatch(setShowAlert(true))
      dispatch(setType('error'))
      dispatch(setMessage('Нужно заполнить все поля ввода для того, чтобы добавить новые данные о месте работе'))

    }

  }

  const sendCase = () => {

    console.log({
      CASE_NAME,
      CASE_SY,
      CASE_SM,
      CASE_FY,
      CASE_FM,
      CASE_PAY,
      CASE_P1,
      CASE_P2,
      CASE_P3,
      CASE_P4,
      CASE_TEXT,
      CASE_TAGS,
      CASE_FILE
    })

    if ( USER_ROLE === 'CUSTOMER' && CUSTOMER[0].portfolio && CUSTOMER[0].portfolio?.length < 1 ) {

      SET_SEND_CASE_REQUEST(true)

      if ( CASE_NAME          && 
        CASE_SY               && 
        CASE_SM               && 
        CASE_FY               && 
        CASE_FM               && 
        CASE_PAY              && 
        CASE_FILE.length > 0  &&
        CASE_P1               && 
        CASE_P2               && 
        CASE_P3               && 
        CASE_P4               &&
        CASE_TEXT             &&
        CASE_TAGS ) {

          SET_ADD_CASE_REQUEST(true)
          setTimeout(() => { SET_ADD_CASE_REQUEST(false) }, 1300)

          setTimeout(() => {

            SET_SEND_CASE_REQUEST(true)

          }, 1300)

          dispatch(setShowAlert(true))
          dispatch(setType('success'))
          dispatch(setMessage('Проект был успешно добавлен в список ваших работ'))

          setTimeout(() => {

            dispatch(setShowAlert(false))
            dispatch(setType('success'))
      
          }, 2000)

        } else {

          dispatch(setShowAlert(true))
          dispatch(setType('error'))
          dispatch(setMessage('Нужно заполнить все поля ввода и добавить файл вложения для того, чтобы добавить новый проект в базу портфолио'))

          setTimeout(() => {

            dispatch(setShowAlert(false))
            dispatch(setType('success'))
      
          }, 2000)
        
        }} else {

          dispatch(setShowAlert(true))
          dispatch(setType('warning'))
          dispatch(setMessage('В настоящее время количество проектов, которые вы можете добавить в систему, ограничено 1 штукой'))

          setTimeout(() => {

            dispatch(setShowAlert(false))
            dispatch(setType('success'))
      
          }, 2000)
        
        }

    if ( USER_ROLE === 'EXECUTOR' && EXECUTOR[0].portfolio && EXECUTOR[0].portfolio?.length < 1 ) {

      SET_SEND_CASE_REQUEST(true)

      if ( CASE_NAME          && 
        CASE_SY               && 
        CASE_SM               && 
        CASE_FY               && 
        CASE_FM               && 
        CASE_PAY              && 
        CASE_FILE.length > 0  &&
        CASE_P1               && 
        CASE_P2               && 
        CASE_P3               && 
        CASE_P4               &&
        CASE_TEXT             &&
        CASE_TAGS ) {

          SET_ADD_CASE_REQUEST(true)
          setTimeout(() => { SET_ADD_CASE_REQUEST(false) }, 1300)

          setTimeout(() => {

            SET_SEND_CASE_REQUEST(true)

          }, 1300)

          dispatch(setShowAlert(true))
          dispatch(setType('success'))
          dispatch(setMessage('Проект был успешно добавлен в список ваших работ'))

        } else {

          dispatch(setShowAlert(true))
          dispatch(setType('error'))
          dispatch(setMessage('Нужно заполнить все поля ввода и добавить файл вложения для того, чтобы добавить новый проект в базу портфолио'))

        }} else {

          dispatch(setShowAlert(true))
          dispatch(setType('warning'))
          dispatch(setMessage('В настоящее время количество проектов, которые вы можете добавить в систему, ограничено 1 штукой'))

        }

  }

  function readIMG() {
    if (CASE_FILE && CASE_FILE[0]) {
      var reader = new FileReader()
  
      reader.onload = function(e) {
        e.target && setLocalImage(e.target.result)
      }
  
      reader.readAsDataURL(CASE_FILE[0])
    }
  }

  useEffect(() => {

    readIMG()

  }, [ CASE_FILE ])
  
  useEffect(() => {

    false && console.log(USER_ROLE)
    false && console.log(USER_ID)
    false && console.log(EXECUTOR)
    false && console.log(CUSTOMER)

  }, [ CUSTOMER, EXECUTOR, USER_ID, USER_ROLE ])

  useEffect(() => {

    if ( spec ) {

      SET_SPEC_REQUEST(true)
      setTimeout(() => { SET_SPEC_REQUEST(false) }, 1300)

    }

  }, [ spec ])

  useEffect(() => {

    EXECUTOR.length > 0 && EXECUTOR[0].aboutText && dispatch(setAboutText(EXECUTOR[0].aboutText))
    CUSTOMER.length > 0 && CUSTOMER[0].aboutText && dispatch(setAboutText(CUSTOMER[0].aboutText))

  }, [])

  useEffect(() => {

    let chapterData: any = []

    if ( taskList.filter(item => item.id === selectTask).length > 0 ) {

      chapterData = taskList.filter(item => item.id === selectTask)[0].chapters

    } 

    if ( ordersList.filter(item => item.id === selectTask).length > 0 ) {

      chapterData = ordersList.filter(item => item.id === selectTask)[0].chapters

    }
    
    chapterData && setChapters(chapterData)

  }, [])

  useEffect(() => { console.log(CONTRACT_FILE) }, [ CONTRACT_FILE ])

  useEffect(() => {

    ( async () => {

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const fileName: string = selectTask + '.contract.txt'
      const fileNameExecutor: string = selectTask + '.contract.txt'

      const raw = JSON.stringify({
        "fileName": fileNameExecutor
      });

      var requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const downloadFile = await fetch("http://85.193.88.125:3000/send-file-contract", requestOptions)
        .then(response => response.blob())

      const downloadFileText: string = await downloadFile.text()
      const downloadFileSize: number = await downloadFile.size

      setContractFileServer({
        name: fileNameExecutor,
        size: downloadFileSize,
        text: downloadFileText
      })

      console.log({
        name: fileNameExecutor,
        size: downloadFileSize,
        text: downloadFileText
      })

      // ----------------------------------------------------------------
      // ----------------------------------------------------------------

      const fileNameExecutorPDF: string = selectTask + '.contract.pdf'

      const rawPDF = JSON.stringify({
        "fileName": fileNameExecutorPDF
      });

      var requestOptionsPDF: any = {
        method: 'POST',
        headers: myHeaders,
        body: rawPDF,
        redirect: 'follow'
      };

      const downloadFilePDF = await fetch("http://85.193.88.125:3000/send-file-contract", requestOptionsPDF)
        .then(response => response.blob())

      const downloadFileTextPDF: string = await downloadFilePDF.text()
      const downloadFileSizePDF: number = await downloadFilePDF.size

      setContractFileServerPDF({
        name: fileNameExecutorPDF,
        size: downloadFileSizePDF,
        text: downloadFileTextPDF
      })

      console.log({
        name: fileNameExecutorPDF,
        size: downloadFileSizePDF,
        text: downloadFileTextPDF
      })

    })()

  }, [ selectTask ])

  useEffect(() => {

    ( async () => {

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const fileName: string = selectTask + '.complete.pdf'
      const fileNameExecutor: string = selectTask + '.complete.pdf'

      const raw = JSON.stringify({
        "fileName": fileNameExecutor
      });

      var requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const downloadFile = await fetch("http://85.193.88.125:3000/send-file-complete", requestOptions)
        .then(response => response.blob())

      const downloadFileText: string = await downloadFile.text()
      const downloadFileSize: number = await downloadFile.size

      console.log({
        name: fileNameExecutor,
        size: downloadFileSize,
        text: downloadFileText
      })

      setCompleteFileServer({
        name: fileNameExecutor,
        size: downloadFileSize,
        text: downloadFileText
      })

    })()

  }, [ selectTask ])

  useEffect(() => {

    return () => {

      false && dispatch(setCaseName(''))
      false && dispatch(setCaseSY(''))
      false && dispatch(setCaseSM(''))
      false && dispatch(setCaseFY(''))
      false && dispatch(setCaseFM(''))
      false && dispatch(setCasePay(''))
      false && dispatch(setCaseParams1(''))
      false && dispatch(setCaseParams2(''))
      false && dispatch(setCaseParams3(''))
      false && dispatch(setCaseParams4(''))
      false && dispatch(setCaseText(''))
      false && dispatch(setCaseTags(''))

      dispatch(resetCompleteFile(''))
      dispatch(resetContractFile(''))

    }

  }, [])

  return (
    <React.Fragment>

      { SPEC_REQUEST && <RequestActionsComponent

        callbackAction={() => {}}
        requestData={{
          type: 'POST',
          urlstring: '/change-user-spec',
          body: {
            clientId: USER_ID,
            spec: spec,
          }
        }}
      
      /> }

      { ( ABOUT_TEXT_REQUEST && ABOUT_TEXT !== '' ) && <RequestActionsComponent

        callbackAction={() => {}}
        requestData={{
          type: 'POST',
          urlstring: '/change-user-about',
          body: {
            clientId: USER_ID,
            text: ABOUT_TEXT,
          }
        }}
      
      /> }

      { SEND_CONTRACT_REQUEST && <RequestActionsComponent

        callbackAction={() => {}}
        requestData={{
          type: 'POSTFILE_CONTRACT',
          urlstring: '/add-file-contract',
          body: [ 
            selectTask, 
            CONTRACT_FILE ? CONTRACT_FILE[0] : [] ]
        }}
      
      /> }

      { SEND_COMPLETE_REQUEST && <RequestActionsComponent

        callbackAction={() => {}}
        requestData={{
          type: 'POSTFILE_COMPLETE',
          urlstring: '/add-file-complete',
          body: [ 
            selectTask,
            selectTask, 
            COMPLETE_FILE ? COMPLETE_FILE[0] : [] ]
        }}
      
      /> }

      { ADD_CASE_REQUEST && <RequestActionsComponent

        callbackAction={() => {}}
        requestData={{
          type: 'POST',
          urlstring: '/add-user-case',
          body: {
            clientId: USER_ID,
            CASE_NAME,
            CASE_SY,
            CASE_SM,
            CASE_FY,
            CASE_FM,
            CASE_PAY,
            CASE_P1,
            CASE_P2,
            CASE_P3,
            CASE_P4,
            CASE_TEXT,
            CASE_TAGS,
            CASE_FILE
          }
        }}
      
      /> }

      { ADD_EDUCATION_REQUEST && <RequestActionsComponent

        callbackAction={() => {}}
        requestData={{
          type: 'POST',
          urlstring: '/add-user-education',
          body: {
            clientId: USER_ID,
            addInEducation1Title: EDUCATION_BLOCK_1.title,
            addInEducation1Finish: EDUCATION_BLOCK_1.finish,
            addInEducation1Special: EDUCATION_BLOCK_1.special
          }
        }}
      
      /> }

      { ADD_JOB_REQUEST && <RequestActionsComponent

        callbackAction={() => {}}
        requestData={{
          type: 'POST',
          urlstring: '/add-user-skill',
          body: {
            clientId: USER_ID,
            addInSkills1Title: JOB_BLOCK_1.title,
            addInSkills1Site: JOB_BLOCK_1.site,
            addInSkills1Sm: JOB_BLOCK_1.sm,
            addInSkills1Sy: JOB_BLOCK_1.sy,
            addInSkills1Fm: JOB_BLOCK_1.fm,
            addInSkills1Fy: JOB_BLOCK_1.fy,
            addInSkills1NowTime: JOB_BLOCK_1.nowTime,
            addInSkills1Job: JOB_BLOCK_1.job,
            addInSkills1JobTasks: JOB_BLOCK_1.jobTasks 
          }
        }}
      
      /> }

      { SEND_CASE_REQUEST && <RequestActionsComponent

        callbackAction={() => {}}
        requestData={{
          type: 'POSTFILE_CASE',
          urlstring: '/add-file-case',
          body: [ 
            USER_ID,
            CASE_FILE ? CASE_FILE[0] : [] ]
        }}
      
      /> }

      <ShadowContainer style={{ zIndex: 105 }}marginTop={scroll}>
        <ShadowContainerInner>

          { contentType === 'ECC' 

          /* ---------------------------------------- */
          /* базовое окно с чатом
          /* ---------------------------------------- */

            ? <ChatFork.ChatContainer style={{ paddingTop: '40px' }} backgroundColor={backgroundColor} id={userID}>
                <ChatFork.CloseIconContainer>
                  <ChatFork.CloseIcon onClick={showrightContent}>
                    <img
                      alt={""} 
                      src={closeIcon}  
                    />
                  </ChatFork.CloseIcon>
                </ChatFork.CloseIconContainer>
                <ChatFork.ChatHeader>
                  <div style={divCSS}>
                    <ChatFork.ChatHeaderAvatar>
                      <img
                        alt={""}
                        src={defaulrAvatar}
                        style={avatarCSS}
                      />
                    </ChatFork.ChatHeaderAvatar>
                    <ChatFork.ChatHeaderName>
                      <span style={nameSpanCSS}>{ userName }</span>
                      <span style={lastActiveSpanCSS}>{ userLastctive }</span>
                    </ChatFork.ChatHeaderName>
                  </div>
                  <div style={divCSS}>
                    <ChatFork.ChatHeaderEnableDocs>
                      <span style={{ ...lastActiveSpanCSS, fontSize: '15px' }}>Документы</span>
                      <Switch color={"primary"} defaultChecked />
                    </ChatFork.ChatHeaderEnableDocs>
                    <InputComponent
                      type={'TEXT_INPUT_OUTLINE_SEARCH'}
                      valueType='text'
                      required={false}
                      widthType={'px'}
                      widthValue={300}
                      heightValue={'56px'}
                      label={"Поиск по сообщениям"}
                      isError={false}
                      isDisabled={false}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      css={{
                        fontSize: '12px',
                        position: 'relative',
                        boxSizing: 'border-box',
                        marginBottom: '8px',
                        backgroundColor: 'white'
                      }}
                    />
                  </div>
                </ChatFork.ChatHeader>
                <ChatFork.ChatBody
                  border={`1px solid ${chatBorderColor}`}
                  backgroundColor={chatBackground}
                >
                  <ChatFork.ChatBodyInner
                    border={`1px solid transparent`}
                    backgroundColor={chatBackground}
                  >
                    <ChatMessagesContainer
                      data={[
                        { 
                          date: '05.01.2022', 
                          messages: [
                            { 
                              type: 'me', 
                              content: [
                                { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', time: '20:05' },
                                { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', time: '20:05' }
                              ]
                            },
                            { 
                              type: 'you', 
                              content: [
                                { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', time: '20:06' },
                              ]
                            },
                            { 
                              type: 'me', 
                              content: [
                                { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', time: '20:08' },
                              ]
                            },
                            { 
                              type: 'you', 
                              content: [
                                { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', time: '20:10' },
                                { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', time: '20:10' },
                                { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', time: '20:10' },
                              ]
                            },
                            { 
                              type: 'me', 
                              content: [
                                { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', time: '20:08' },
                              ]
                            },
                            { 
                              type: 'you', 
                              content: [
                                { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', time: '20:10' },
                                { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', time: '20:10' },
                                { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', time: '20:10' },
                              ]
                            }
                          ]
                        }
                      ]}
                    />
                  </ChatFork.ChatBodyInner>
                  <div style={bottomDivCSS}>
                    <div style={bottomDivInnerCSS}>
                      <div style={clipDivCSS}>
                        <img
                          alt={""}
                          src={clipIcon}
                        />
                      </div>
                      <InputComponent
                        type={'TEXT_INPUT_OUTLINE'}
                        valueType='text'
                        required={false}
                        widthType={'%'}
                        widthValue={100}
                        heightValue={'50px'}
                        label={"Lorem ipsum dolor sit amet consectetur adipisicing elit"}
                        isError={false}
                        isDisabled={true}
                        labelShrinkLeft={"0px"}
                        innerLabel={null}
                        css={{
                          fontSize: '12px',
                          position: 'relative',
                          boxSizing: 'border-box',
                          marginTop: '0px',
                          backgroundColor: inputBackground,
                          marginRight: '12px'
                        }}
                      />
                      <ButtonComponent
                        inner={""} 
                        type='ICON_BUTTON_CHAT_SUBMIT' 
                        action={() => console.log('this is button')}
                        actionData={null}
                        widthType={'px'}
                        widthValue={56}
                        children={""}
                        childrenCss={undefined}
                        iconSrc={null}
                        iconCss={undefined}
                        muiIconSize={30}
                        MuiIconChildren={ArrowUpwardIcon}
                        css={{
                          position: 'relative',
                          boxSizing: 'border-box',
                          padding: '4px',
                          backgroundColor: chatSubmitColor,
                          width: '56px',
                          height: '56px',
                        }}
                      />
                    </div>
                  </div>
                </ChatFork.ChatBody>
              </ChatFork.ChatContainer>
            : contentType === 'MDCC'

            /* ---------------------------------------- */
            /* окно раздела мастер документы
            /* ---------------------------------------- */

            ? <React.Fragment>
                <MasterDocFork.ChatContainer style={{ paddingTop: '40px', height: 'auto', minHeight: '100vh' }} backgroundColor={backgroundColor}>
                  <MasterDocFork.CloseIconContainer>
                    <MasterDocFork.CloseIcon onClick={showrightContent}>
                      <img
                        alt={""} 
                        src={closeIcon}  
                      />
                    </MasterDocFork.CloseIcon>
                  </MasterDocFork.CloseIconContainer>
                  <MasterDocFork.ContentLine>
                    <h3 style={{ fontSize: '28px', margin: 0, marginBottom: '38px' }}>Мастер документы</h3>
                  </MasterDocFork.ContentLine>
                  { contractFileServer.text && <MasterDocFork.ContentLine style={{ marginTop: '-6px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', fontSize: '15px' }}>Основные документы проекта</span>
                  </MasterDocFork.ContentLine> }
                  { contractFileServer.text && <ButtonComponent
                    inner={'Добавить договор'} 
                    type='UPLOAD' 
                    action={() => {}}
                    actionData={[ changeTechTaskFile ]}
                    widthType={'px'}
                    widthValue={200}
                    children={''}
                    childrenCss={undefined}
                    iconSrc={null}
                    iconCss={undefined}
                    muiIconSize={null}
                    MuiIconChildren={EmailIcon}
                    css={{
                      backgroundColor: 'rgb(22, 124, 191)',
                      fontSize: '12px',
                      height: '46px',
                      borderRadius: '6px',
                      position: 'relative',
                      boxSizing: 'border-box',
                      marginTop: '23px',
                    }}
                  /> }

                  { contractFileServer.text && <React.Fragment>
                    { ( CONTRACT_FILE && CONTRACT_FILE?.length > 0 ) && CONTRACT_FILE.filter(
                
                      fileData => (
                        fileData.name.indexOf('.txt') !== -1 ||
                        fileData.name.indexOf('.pdf') !== -1 )).map(fileData => {

                      return (
                        <div 
                          style={{ 
                            display: 'flex', 
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            marginTop: '17px',
                            marginBottom: '-2px'
                          }}
                        >
                          <span 
                            style={{ 
                              display: 'block', 
                              position: 'relative', 
                              lineHeight: '28px', 
                              fontWeight: 'bold',
                              color: 'rgb(81, 102, 116)',
                              cursor: 'pointer',
                              marginRight: '8px'
                            }}
                          >{`Добавлен договор для заказа: ${fileData.name}`}</span>
                          <CloseIcon 
                            style={{ width: '16px', cursor: 'pointer' }}
                            onClick={() => dispatch(resetContractFile(''))}
                          />
                        </div>
                      )

                    })}
                    { ( CONTRACT_FILE && CONTRACT_FILE?.length > 0 ) && CONTRACT_FILE.filter(fileData => (

                      fileData.name.indexOf('.txt') !== -1 ||
                      fileData.name.indexOf('.pdf') !== -1 )).length === 0 && <div 
                        style={{ 
                          display: 'flex', 
                          flexDirection: 'row', 
                          alignItems: 'center', 
                          justifyContent: 'space-between',
                          marginTop: '14px'
                        }}
                      >
                        <span 
                          style={{ 
                            display: 'block', 
                            position: 'relative', 
                            lineHeight: '28px', 
                            fontWeight: 'bold',
                            color: 'rgb(81, 102, 116)',
                            cursor: 'pointer',
                            marginRight: '8px'
                          }}
                        >{`Неверный формат файла`}</span>
                        <CloseIcon 
                          style={{ width: '16px', cursor: 'pointer' }}
                          onClick={() => dispatch(resetContractFile(''))}
                        />
                      </div> }
                  </React.Fragment> }
                  { contractFileServer.text && <span
                    onClick={() => setMasterDocsShadowContent(prev => !prev)}
                    style={{
                      display: 'block',
                      position: 'relative',
                      width: '600px',
                      lineHeight: '22px',
                      backgroundColor: 'rgb(253, 237, 237)',
                      padding: '14px',
                      paddingLeft: '20px',
                      borderRadius: '4px',
                      marginTop: '30px',
                      marginBottom: '2px',
                      cursor: 'pointer'
                    }}
                  >{"Допустимые форматы файлов - текстовый (txt) или pdf"}</span> }
                  { contractFileServer.text && <MasterDocFork.ContentLine style={{ marginTop: '22px' }}>
                    <span 
                      onClick={changeContract}
                      style={{ 
                        fontWeight: 'bold', 
                        display: 'block', 
                        fontSize: '15px',
                        cursor: 'pointer',
                        border: '1px dashed grey',
                        padding: '14px 18px 16px',
                        marginBottom: '24.4px',
                        borderRadius: '6px'
                      }}
                    >
                      Загрузить договор [ нажмите, чтобы сохранить - временная кнопка ]
                    </span>
                  </MasterDocFork.ContentLine> }
                  { ( contractFileServer.text.indexOf('no such file or directory') < 0 || contractFileServerPDF.text.indexOf('no such file or directory') < 0 ) && <MasterDocFork.ContentLine style={{ marginTop: '-6px' }}>
                    <img
                      alt={""}
                      src={correctIcon}
                      style={{ width: '24px', marginRight: '10px' }}
                    />
                    <span style={{ fontWeight: 'bold', display: 'block', fontSize: '15px' }}>Договор загружен в проект</span>
                  </MasterDocFork.ContentLine> }
                  { contractFileServer.text.indexOf('no such file or directory') < 0 && <MasterDocFork.ContentLine style={{ marginTop: '24px', marginBottom: '20px' }}>
                    <div style={{ display: 'none', flexDirection: 'row' }}>
                      <div style={{ display: 'block', position: 'relative', width: '100px' }}>
                        <img
                          alt={""}
                          src={txt}
                          style={{ width: '90px', cursor: 'pointer' }}
                        />
                        { false && <img
                          alt={""}
                          src={semiMenu}
                          style={semiIconsCSS}
                        /> }
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', marginLeft: '16px' }}>
                        <span style={{ color: greyColor, marginBottom: '5px' }}>Договор основной</span>
                        <span style={{ color: greyColor, marginBottom: '5px', fontSize: '12px' }}>Договор загружен</span>
                        <span style={{ color: greyColor, marginBottom: '15px', fontSize: '12px' }}>Время загрузки не получено</span>
                        <div style={blankButtonCSS}>
                          <span>Договор подписан</span>
                          <img
                            alt={""}
                            src={docCorrect}
                            style={{ marginLeft: '6px', marginTop: '2px', width: '16px' }}
                          />
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: false ? '80px' : '0px' }}>
                      <div style={{ display: 'block', position: 'relative', width: '100px' }}>
                        <img
                          alt={""}
                          src={txt}
                          style={{ width: '90px', filter: 'grayscale(80%)', cursor: 'pointer' }}
                          onClick={() => {
                            dispatch(setShowFOS(true))
                            dispatch(setShowTypeFOS('showFileContract'))
                            dispatch(setShow('undefined'))
                          }}
                        />
                        { false && <img
                          alt={""}
                          src={semiMenu}
                          style={semiIconsCSS}
                        /> }
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', marginLeft: '16px' }}>
                        <span style={{ color: greyColor, marginBottom: '5px' }}>{ contractFileServer.name }</span>
                        <span style={{ color: greyColor, marginBottom: '5px', fontSize: '12px' }}>Договор загружен</span>
                        <span style={{ color: greyColor, marginBottom: '15px', fontSize: '12px' }}>Время загрузки не получено</span>
                        <div style={{ ...blankButtonCSS, backgroundColor: greyColor3 }}>
                          <span>Ждет подписания</span>
                          <img
                            alt={""}
                            src={docWait}
                            style={{ marginLeft: '6px', marginTop: '2px', width: '16px' }}
                          />
                        </div>
                        <div 
                          style={{ 
                            ...blankButtonCSS, 
                            marginTop: '13px', 
                            paddingLeft: '0px',
                            width: '180px'
                          }}
                        >
                          <a 
                            href={`http://85.193.88.125:3000/techContracts/${contractFileServer.name}`}
                            target="_blank"
                            style={{ 
                              textAlign: 'center', 
                              width: '100%',
                              color: 'inherit',
                              textDecoration: 'none'
                            }} rel="noreferrer"
                          >
                            Сохранить договор
                          </a>
                        </div>
                      </div>
                    </div>
                  </MasterDocFork.ContentLine> }
                  { contractFileServerPDF.text.indexOf('no such file or directory') < 0 && <MasterDocFork.ContentLine style={{ marginTop: '24px', marginBottom: '20px' }}>
                    <div style={{ display: 'none', flexDirection: 'row' }}>
                      <div style={{ display: 'block', position: 'relative', width: '100px' }}>
                        <img
                          alt={""}
                          src={txt}
                          style={{ width: '90px', cursor: 'pointer' }}
                        />
                        { false && <img
                          alt={""}
                          src={semiMenu}
                          style={semiIconsCSS}
                        /> }
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', marginLeft: '16px' }}>
                        <span style={{ color: greyColor, marginBottom: '5px' }}>Договор основной</span>
                        <span style={{ color: greyColor, marginBottom: '5px', fontSize: '12px' }}>Договор загружен</span>
                        <span style={{ color: greyColor, marginBottom: '15px', fontSize: '12px' }}>Время загрузки не получено</span>
                        <div style={blankButtonCSS}>
                          <span>Договор подписан</span>
                          <img
                            alt={""}
                            src={docCorrect}
                            style={{ marginLeft: '6px', marginTop: '2px', width: '16px' }}
                          />
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: false ? '80px' : '0px' }}>
                      <div style={{ display: 'block', position: 'relative', width: '100px' }}>
                        <img
                          alt={""}
                          src={pdf}
                          style={{ width: '90px', filter: 'grayscale(80%)', cursor: 'pointer' }}
                          onClick={() => {
                            dispatch(setShowFOS(true))
                            dispatch(setShowTypeFOS('showFileContract'))
                            dispatch(setShow('undefined'))
                          }}
                        />
                        { false && <img
                          alt={""}
                          src={semiMenu}
                          style={semiIconsCSS}
                        /> }
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', marginLeft: '16px' }}>
                        <span style={{ color: greyColor, marginBottom: '5px' }}>{ contractFileServerPDF.name }</span>
                        <span style={{ color: greyColor, marginBottom: '5px', fontSize: '12px' }}>Договор загружен</span>
                        <span style={{ color: greyColor, marginBottom: '15px', fontSize: '12px' }}>Время загрузки не получено</span>
                        <div style={{ ...blankButtonCSS, backgroundColor: greyColor3 }}>
                          <span>Ждет подписания</span>
                          <img
                            alt={""}
                            src={docWait}
                            style={{ marginLeft: '6px', marginTop: '2px', width: '16px' }}
                          />
                        </div>
                        <div 
                          style={{ 
                            ...blankButtonCSS, 
                            marginTop: '13px', 
                            paddingLeft: '0px',
                            width: '180px'
                          }}
                        >
                          <a 
                            href={`http://85.193.88.125:3000/techContracts/${contractFileServerPDF.name}`}
                            target="_blank"
                            style={{ 
                              textAlign: 'center', 
                              width: '100%',
                              color: 'inherit',
                              textDecoration: 'none'
                            }} rel="noreferrer"
                          >
                            Сохранить договор
                          </a>
                        </div>
                      </div>
                    </div>
                  </MasterDocFork.ContentLine> }
                  <span
                    onDoubleClick={() => setMasterDocsShadowContent(prev => !prev)}
                    style={{
                      display: 'block',
                      position: 'relative',
                      width: '600px',
                      lineHeight: '22px',
                      backgroundColor: 'rgb(253, 237, 237)',
                      padding: '14px',
                      paddingLeft: '20px',
                      borderRadius: '4px',
                      marginTop: '0px',
                      marginBottom: '29px',
                      cursor: 'pointer'
                    }}
                  >{"Дальнейший контент в настоящее время является статичным. Нажмите один раз на данное сообщение, чтобы скрыть или показать эту часть контента"}</span>
                  { masterDocsShadowContent && <React.Fragment>
                    <MasterDocFork.Delimiter background={chatBorderColor} style={{ marginTop: '18px' }}/>
                    <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginTop: '27px', marginBottom: '30px' }}>
                      <span style={{ fontWeight: 'bold', display: 'block', fontSize: '15px' }}>Акты выполненных работ</span>
                      <ButtonComponent
                        inner={"Загрузить новый акт"} 
                        type='CONTAINED_DEFAULT' 
                        action={() => console.log('this is button')}
                        actionData={null}
                        widthType={'px'}
                        widthValue={200}
                        children={""}
                        childrenCss={undefined}
                        iconSrc={null}
                        iconCss={undefined}
                        muiIconSize={30}
                        MuiIconChildren={ArrowUpwardIcon}
                        css={{
                          position: 'relative',
                          boxSizing: 'border-box',
                          padding: '4px',
                          backgroundColor: chatSubmitColor,
                          width: '56px',
                          height: '43px',
                        }}
                      />
                    </MasterDocFork.ContentLine>
                    <span
                      style={{
                        display: 'block',
                        position: 'relative',
                        width: '600px',
                        lineHeight: '22px',
                        backgroundColor: 'rgb(253, 237, 237)',
                        padding: '14px',
                        paddingLeft: '20px',
                        borderRadius: '4px',
                        marginTop: '0px',
                        marginBottom: '16px'
                      }}
                    >{"Статичные элементы отображаются мне для напоминания, чтоб ничего не забыть"}</span>

                    { Array(2)
                      .fill({ 
                        status: 'GREEN', 
                        data: { 
                          name: 'элемент-документ-статичный.pdf', 
                          date: '29.02.2023', 
                          statusName: 'Подписан' 
                        }
                      }).map((item, index) => {

                      return (
                        <MasterDocFork.ContentLine key={index} style={{ opacity: 0.8 }}>
                          <DocumentLine
                            status={item.status}
                            data={item.data}
                          />
                        </MasterDocFork.ContentLine>
                      )

                    })}

                    <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginTop: '40px', marginBottom: '20px' }}>
                      <span style={{ fontWeight: 'bold', display: 'block', fontSize: '15px' }}>Мастер документы</span>
                      <div>
                        <img
                          alt={""}
                          src={tillIcon}
                          style={{ 
                            width: '24px', 
                            marginRight: '16px', 
                            cursor: 'pointer',
                            opacity: docviewFormat === 'tiles' ? '1' : '0.5' 
                          }}
                          onClick={() => setDocviewFormat('tiles')}
                        />
                        <img
                          alt={""}
                          src={linesIcon}
                          style={{ 
                            width: '24px', 
                            cursor: 'pointer',
                            opacity: docviewFormat === 'lines' ? '1' : '0.5' 
                          }}
                          onClick={() => setDocviewFormat('lines')}
                        />
                      </div>
                    </MasterDocFork.ContentLine>
                    <MasterDocFork.Delimiter background={chatBorderColor} style={{ marginTop: '0px', marginBottom: '36px' }}/>
                    <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginBottom: '33px', alignItems: 'flex-end' }}>
                      <span style={{ fontWeight: '600', fontSize: '15px' }}>Файлы в заказе</span>
                      <div style={fileSorterCSS}>
                        <SelectField 
                          placeholder={"Сортировать по дате"}
                          params={{ width: 280, mb: '0px', height: 50 }}
                          data={[
                            { value: '1', label: 'Вчера' },
                            { value: '2', label: 'Позавчера' },
                            { value: '3', label: 'Последний месяц' },
                          ]}
                          multy={false}
                          action={() => {}}
                          actionType={""}
                          actionParams={[]}
                          showIcon={true}
                          icon={null}
                          iconStyles={{
                            marginTop: '-12px',
                            marginLeft: '6px',
                            width: '34px',
                          }}
                        />
                        <img
                          alt={""}
                          src={arraySortIcon}
                          style={{ marginLeft: '20px', marginRight: '16px' }}
                        />
                      </div>
                    </MasterDocFork.ContentLine>
                    { docviewFormat === 'lines' && <React.Fragment>
                      { Array(2)
                        .fill({ 
                          status: 'GREEN', 
                          data: { 
                            name: 'элемент-документ-статичный.pdf', 
                            date: '29.02.2023', 
                            statusName: 'Подписан',
                            size: 220
                          }
                        }).map((item, index) => {

                        return (
                          <MasterDocFork.ContentLine key={index} style={{ opacity: 0.8 }}>
                            <DocumentLine
                              status={item.status}
                              data={item.data}
                            />
                          </MasterDocFork.ContentLine>
                        )

                      })}
                      { Array(1)
                        .fill({ 
                          status: 'WHITE', 
                          data: { 
                            name: 'элемент-документ-статичный.pdf', 
                            date: '29.02.2023', 
                            statusName: 'Ожидает',
                            size: 220
                          }
                        }).map((item, index) => {

                        return (
                          <MasterDocFork.ContentLine key={index} style={{ opacity: 0.8 }}>
                            <DocumentLine
                              status={item.status}
                              data={item.data}
                            />
                          </MasterDocFork.ContentLine>
                        )

                      })}
                      <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginBottom: '33px', marginTop: '20px', alignItems: 'flex-end' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '15px' }}>Раздел Пожарная безопасность</span>
                      </MasterDocFork.ContentLine>
                      { Array(2)
                        .fill({ 
                          status: 'GREEN', 
                          data: { 
                            name: 'элемент-документ-статичный.pdf', 
                            date: '29.02.2023', 
                            statusName: 'Подписан',
                            size: 220
                          }
                        }).map((item, index) => {

                        return (
                          <MasterDocFork.ContentLine key={index} style={{ opacity: 0.8 }}>
                            <DocumentLine
                              status={item.status}
                              data={item.data}
                            />
                          </MasterDocFork.ContentLine>
                        )

                      })}
                      { Array(1)
                        .fill({ 
                          status: 'WHITE', 
                          data: { 
                            name: 'элемент-документ-статичный.pdf', 
                            date: '29.02.2023', 
                            statusName: 'Ожидает',
                            size: 220
                          }
                        }).map((item, index) => {

                        return (
                          <MasterDocFork.ContentLine key={index} style={{ opacity: 0.8 }}>
                            <DocumentLine
                              status={item.status}
                              data={item.data}
                            />
                          </MasterDocFork.ContentLine>
                        )

                      })}
                    </React.Fragment> }
                    { docviewFormat === 'tiles' && <MasterDocFork.ContentLine style={{ flexWrap: 'wrap' }}>
                      { Array(2)
                        .fill({ 
                          status: 'GREEN', 
                          data: { 
                            name: 'элемент-документ-статичный.pdf', 
                            date: '29.02.2023', 
                            statusName: 'Подписан',
                            size: 220
                          }
                        }).map((item, index) => {

                          return (
                            <div style={doctileCSS} key={index}>
                              <div style={{ position: 'relative' }}>
                                <img
                                  alt={""}
                                  src={doc}
                                />

                                { item.status === 'GREEN' && 
                                  <span 
                                    style={{ 
                                      width: '24px',  
                                      display: 'block', 
                                      position: 'absolute',
                                      borderRadius: '50%',
                                      overflow: 'hidden',
                                      top: '100%',
                                      left: '100%',
                                      marginTop: '-30px',
                                      marginLeft: '-28px' 
                                    }}
                                  >
                                    <img 
                                      alt={""} 
                                      src={correct}
                                      style={{
                                        backgroundColor: 'white',
                                        display: 'block',
                                        width: '24px',
                                      }} 
                                    /> 
                                  </span>
                                }
                                { item.status === 'WHITE' && 
                                  <span 
                                    style={{ 
                                      width: '24px',  
                                      display: 'block', 
                                      position: 'absolute',
                                      borderRadius: '50%',
                                      overflow: 'hidden',
                                      top: '100%',
                                      left: '100%',
                                      marginTop: '-30px',
                                      marginLeft: '-28px' 
                                    }}
                                  >
                                    <img 
                                      alt={""} 
                                      src={wait}
                                      style={{
                                        backgroundColor: 'white',
                                        display: 'block',
                                        width: '24px',
                                      }} 
                                    /> 
                                  </span>
                                }
                              
                              </div>
                              <div
                                style={{
                                  display: 'block',
                                  position: 'relative',
                                  width: '100%',
                                  height: '26px',
                                  overflow: 'hidden',
                                  marginTop: '-8px'
                                }}
                              >
                                <span style={{ color: greyColor, display: 'block', width: '100%', lineHeight: '26px', fontSize: '12px' }}>{ item.data.name }</span>
                              </div>
                              <span style={{ color: greyColor2, marginBottom: '4.4px', fontSize: '12px' }}>{ item.data.date }</span>
                              <span style={{ color: greyColor2, fontSize: '12px' }}>{ item.data.size } Mb</span>
                            </div>
                          )

                      })}
                      { Array(8)
                        .fill({ 
                          status: 'WHITE', 
                          data: { 
                            name: 'элемент-документ-статичный.pdf', 
                            date: '29.02.2023', 
                            statusName: 'Ожидает',
                            size: 220
                          }
                        }).map((item, index) => {

                          return (
                            <div style={doctileCSS} key={index}>
                              <div style={{ position: 'relative' }}>
                                <img
                                  alt={""}
                                  src={doc}
                                />

                                { item.status === 'GREEN' && 
                                  <span 
                                    style={{ 
                                      width: '24px',  
                                      display: 'block', 
                                      position: 'absolute',
                                      borderRadius: '50%',
                                      overflow: 'hidden',
                                      top: '100%',
                                      left: '100%',
                                      marginTop: '-30px',
                                      marginLeft: '-28px' 
                                    }}
                                  >
                                    <img 
                                      alt={""} 
                                      src={correct}
                                      style={{
                                        backgroundColor: 'white',
                                        display: 'block',
                                        width: '24px',
                                      }} 
                                    /> 
                                  </span>
                                }
                                { item.status === 'WHITE' && 
                                  <span 
                                    style={{ 
                                      width: '24px',  
                                      display: 'block', 
                                      position: 'absolute',
                                      borderRadius: '50%',
                                      overflow: 'hidden',
                                      top: '100%',
                                      left: '100%',
                                      marginTop: '-30px',
                                      marginLeft: '-28px' 
                                    }}
                                  >
                                    <img 
                                      alt={""} 
                                      src={wait}
                                      style={{
                                        backgroundColor: 'white',
                                        display: 'block',
                                        width: '24px',
                                      }} 
                                    /> 
                                  </span>
                                }

                              </div>
                              <div
                                style={{
                                  display: 'block',
                                  position: 'relative',
                                  width: '100%',
                                  height: '26px',
                                  overflow: 'hidden',
                                  marginTop: '-8px'
                                }}
                              >
                                <span style={{ color: greyColor, display: 'block', width: '100%', lineHeight: '26px', fontSize: '12px' }}>{ item.data.name }</span>
                              </div>
                              <span style={{ color: greyColor2, marginBottom: '4.4px', fontSize: '12px' }}>{ item.data.date }</span>
                              <span style={{ color: greyColor2, fontSize: '12px' }}>{ item.data.size } Mb</span>
                            </div>
                          )

                      })}
                      <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginBottom: '33px', marginTop: '30px', alignItems: 'flex-end' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '15px' }}>Раздел Пожарная безопасность</span>
                      </MasterDocFork.ContentLine>
                      { Array(2)
                        .fill({ 
                          status: 'GREEN', 
                          data: { 
                            name: 'элемент-документ-статичный.pdf', 
                            date: '29.02.2023', 
                            statusName: 'Подписан',
                            size: 220
                          }
                        }).map((item, index) => {

                          return (
                            <div style={doctileCSS} key={index}>
                              <div style={{ position: 'relative' }}>
                                <img
                                  alt={""}
                                  src={doc}
                                />

                                { item.status === 'GREEN' && 
                                  <span 
                                    style={{ 
                                      width: '24px',  
                                      display: 'block', 
                                      position: 'absolute',
                                      borderRadius: '50%',
                                      overflow: 'hidden',
                                      top: '100%',
                                      left: '100%',
                                      marginTop: '-30px',
                                      marginLeft: '-28px' 
                                    }}
                                  >
                                    <img 
                                      alt={""} 
                                      src={correct}
                                      style={{
                                        backgroundColor: 'white',
                                        display: 'block',
                                        width: '24px',
                                      }} 
                                    /> 
                                  </span>
                                }
                                { item.status === 'WHITE' && 
                                  <span 
                                    style={{ 
                                      width: '24px',  
                                      display: 'block', 
                                      position: 'absolute',
                                      borderRadius: '50%',
                                      overflow: 'hidden',
                                      top: '100%',
                                      left: '100%',
                                      marginTop: '-30px',
                                      marginLeft: '-28px' 
                                    }}
                                  >
                                    <img 
                                      alt={""} 
                                      src={wait}
                                      style={{
                                        backgroundColor: 'white',
                                        display: 'block',
                                        width: '24px',
                                      }} 
                                    /> 
                                  </span>
                                }

                              </div>
                              <div
                                style={{
                                  display: 'block',
                                  position: 'relative',
                                  width: '100%',
                                  height: '26px',
                                  overflow: 'hidden',
                                  marginTop: '-8px'
                                }}
                              >
                                <span style={{ color: greyColor, display: 'block', width: '100%', lineHeight: '26px', fontSize: '12px' }}>{ item.data.name }</span>
                              </div>
                              <span style={{ color: greyColor2, marginBottom: '4.4px', fontSize: '12px' }}>{ item.data.date }</span>
                              <span style={{ color: greyColor2, fontSize: '12px' }}>{ item.data.size } Mb</span>
                            </div>
                          )

                      })}
                      { Array(1)
                        .fill({ 
                          status: 'WHITE', 
                          data: { 
                            name: 'элемент-документ-статичный.pdf', 
                            date: '29.02.2023', 
                            statusName: 'Ожидает',
                            size: 220
                          }
                        }).map((item, index) => {

                          return (
                            <div style={doctileCSS} key={index}>
                              <div style={{ position: 'relative' }}>
                                <img
                                  alt={""}
                                  src={doc}
                                />

                                { item.status === 'GREEN' && 
                                  <span 
                                    style={{ 
                                      width: '24px',  
                                      display: 'block', 
                                      position: 'absolute',
                                      borderRadius: '50%',
                                      overflow: 'hidden',
                                      top: '100%',
                                      left: '100%',
                                      marginTop: '-30px',
                                      marginLeft: '-28px' 
                                    }}
                                  >
                                    <img 
                                      alt={""} 
                                      src={correct}
                                      style={{
                                        backgroundColor: 'white',
                                        display: 'block',
                                        width: '24px',
                                      }} 
                                    /> 
                                  </span>
                                }
                                { item.status === 'WHITE' && 
                                  <span 
                                    style={{ 
                                      width: '24px',  
                                      display: 'block', 
                                      position: 'absolute',
                                      borderRadius: '50%',
                                      overflow: 'hidden',
                                      top: '100%',
                                      left: '100%',
                                      marginTop: '-30px',
                                      marginLeft: '-28px' 
                                    }}
                                  >
                                    <img 
                                      alt={""} 
                                      src={wait}
                                      style={{
                                        backgroundColor: 'white',
                                        display: 'block',
                                        width: '24px',
                                      }} 
                                    /> 
                                  </span>
                                }

                              </div>
                              <div
                                style={{
                                  display: 'block',
                                  position: 'relative',
                                  width: '100%',
                                  height: '26px',
                                  overflow: 'hidden',
                                  marginTop: '-8px'
                                }}
                              >
                                <span style={{ color: greyColor, display: 'block', width: '100%', lineHeight: '26px', fontSize: '12px' }}>{ item.data.name }</span>
                              </div>
                              <span style={{ color: greyColor2, marginBottom: '4.4px', fontSize: '12px' }}>{ item.data.date }</span>
                              <span style={{ color: greyColor2, fontSize: '12px' }}>{ item.data.size } Mb</span>
                            </div>
                          )

                      })}
                    </MasterDocFork.ContentLine> }
                    <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginTop: '33px', marginBottom: '100px' }}>
                      
                      { docviewFormat === 'lines' && <div/> }
                      
                      <ButtonComponent
                        inner={"Скачать архивом"} 
                        type='CONTAINED_DEFAULT' 
                        action={() => console.log('this is button')}
                        actionData={null}
                        widthType={'px'}
                        widthValue={160}
                        children={""}
                        childrenCss={undefined}
                        iconSrc={null}
                        iconCss={undefined}
                        muiIconSize={30}
                        MuiIconChildren={ArrowUpwardIcon}
                        css={{
                          position: 'relative',
                          boxSizing: 'border-box',
                          padding: '4px',
                          backgroundColor: chatBorderColor,
                          color: greyColor,
                          width: '56px',
                          height: '43px',
                        }}
                      />
                    </MasterDocFork.ContentLine>
                  </React.Fragment> }

                </MasterDocFork.ChatContainer>
            </React.Fragment>
            : contentType === 'ChapterCC'

            /* ---------------------------------------- */
            /* базовое окно для раздела
            /* ---------------------------------------- */

            ? <React.Fragment>
                <MasterDocFork.ChatContainer style={{ paddingTop: '40px', height: 'auto', minHeight: '100vh' }} backgroundColor={backgroundColor}>
                  <MasterDocFork.CloseIconContainer style={{ zIndex: '10' }}>
                    <MasterDocFork.CloseIcon 
                      style={{ zIndex: '10' }} 
                      onClick={showrightContent}
                    >
                      <img
                        alt={""} 
                        src={closeIcon}  
                      />
                    </MasterDocFork.CloseIcon>
                    <div 
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        width: '100%',
                        boxSizing: 'border-box',
                      }}
                    >
                      <Fab 
                        onClick={() => {
                          chapterStep > 0 && setChapterStep(prev => prev - 1)
                        }}
                        aria-label="add"
                        style={{
                          display: 'block',
                          position: 'relative',
                          width: '50px',
                          height: '50px',
                          backgroundColor: 'rgb(217, 231, 240)',
                          marginRight: '20px'
                        }}
                      >
                        <ArrowBackIosNewIcon 
                          sx={{ 
                            marginBottom: '-7px', 
                            marginLeft: '-5px', 
                            fontSize: '28px', 
                            color: 'grey' 
                          }} 
                        />
                      </Fab>
                      <Fab 
                        onClick={() => {
                          chapterStep < chapters.length - 1 && setChapterStep(prev => prev + 1)
                        }}
                        aria-label="add"
                        style={{
                          display: 'block',
                          position: 'relative',
                          width: '50px',
                          height: '50px',
                          backgroundColor: 'rgb(217, 231, 240)',
                        }}
                      >
                        <ArrowBackIosNewIcon 
                          sx={{ 
                            marginBottom: '-7px', 
                            marginLeft: '5px', 
                            fontSize: '28px', 
                            color: 'grey',
                            transform: 'rotate(180deg)'
                          }} 
                        />
                      </Fab>
                    </div>
                  </MasterDocFork.CloseIconContainer>
                  <MasterDocFork.ContentLine>
                    <h3 style={{ fontSize: '28px', margin: 0, marginBottom: '22px' }}>
                      { chapters[chapterStep].title }
                    </h3>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine>
                    <span style={{ lineHeight: '24px' }}>{ chapters[chapterStep].description }</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '30px' }}>
                    <ButtonComponent
                      inner={"Сдать раздел на проверку"} 
                      type='CONTAINED_DISABLED' 
                      action={() => console.log('this is button')}
                      actionData={null}
                      widthType={'px'}
                      widthValue={238}
                      children={""}
                      childrenCss={undefined}
                      iconSrc={null}
                      iconCss={undefined}
                      muiIconSize={30}
                      MuiIconChildren={ArrowUpwardIcon}
                      css={{
                        position: 'relative',
                        boxSizing: 'border-box',
                        padding: '4px',
                        backgroundColor: 'rgb(217, 231, 240)',
                        width: '56px',
                        height: '43px',
                      }}
                    />
                  </MasterDocFork.ContentLine>
                  <span
                    style={{
                      display: 'block',
                      position: 'relative',
                      width: '600px',
                      lineHeight: '22px',
                      backgroundColor: 'rgb(253, 237, 237)',
                      padding: '14px',
                      paddingLeft: '20px',
                      borderRadius: '4px',
                      marginTop: '22px'
                    }}
                  >{"Внимание! Следующие представления на данном этапе являются статичными, нужны чтобы не забыть где лежит верстка этих компонентов"}</span>
                  <MasterDocFork.ContentLine style={{ marginTop: '33px', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', marginRight: '80px', fontSize: '15px' }}>Ответственный</span>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        position: 'relative'
                      }}
                    >
                      <img
                        alt={""}
                        src={defaulrAvatar}
                        style={{
                          display: 'block',
                          position: 'relative',
                          width: '56px',
                          marginRight: '20px'
                        }}
                      />
                      <div 
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          justifyContent: 'flex-start',
                          position: 'relative',
                          marginTop: '-6px'
                        }}
                      >
                        <span style={{ fontSize: '13px', width: '230px', marginBottom: '3px', lineHeight: '22px', fontWeight: 'bold' }}>
                          { ordersList.filter(item => item.id === selectTask).length > 0 
                          
                            ? ordersList.filter(item => item.id === selectTask)[0].executor
                            : 'Исполнитель не выбран' }
                        </span>
                        <span style={{ fontSize: '14px' }}>{"Вид занятости не получен"}</span>
                      </div>
                    </div>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '44px', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div 
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                      }}
                    >
                      <span style={{ fontWeight: 'bold', display: 'block', marginRight: '15px', fontSize: '15px' }}>Мастер документы</span>
                      <img
                        alt={""}
                        src={infoGrey}
                      />
                      <span style={{ fontWeight: 'bold', display: 'block', marginLeft: '30px', opacity: 0.5, fontSize: '15px' }}>Дополнительные вложения</span>
                    </div>
                    <ButtonComponent
                      inner={"Скачать архивом"} 
                      type='CONTAINED_DEFAULT' 
                      action={() => console.log('this is button')}
                      actionData={null}
                      widthType={'px'}
                      widthValue={160}
                      children={""}
                      childrenCss={undefined}
                      iconSrc={null}
                      iconCss={undefined}
                      muiIconSize={30}
                      MuiIconChildren={ArrowUpwardIcon}
                      css={{
                        position: 'relative',
                        boxSizing: 'border-box',
                        padding: '4px',
                        backgroundColor: chatBorderColor,
                        color: greyColor,
                        width: '56px',
                        height: '43px',
                      }}
                    />
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine>
                    <div style={whiteContainerCSS}>
                    { contractFileServer.text.indexOf('no such file or directory') < 0 && <MasterDocFork.ContentLine style={{ marginTop: '10px' }}>
                        <div style={{ display: 'none', flexDirection: 'row' }}>
                          <div style={{ display: 'block', position: 'relative', width: '100px' }}>
                            <img
                              alt={""}
                              src={txt}
                              style={{ width: '90px', cursor: 'pointer' }}
                            />
                            { false && <img
                              alt={""}
                              src={semiMenu}
                              style={semiIconsCSS}
                            /> }
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', marginLeft: '16px' }}>
                            <span style={{ color: greyColor, marginBottom: '5px' }}>Договор основной</span>
                            <span style={{ color: greyColor, marginBottom: '5px', fontSize: '12px' }}>Договор загружен</span>
                            <span style={{ color: greyColor, marginBottom: '15px', fontSize: '12px' }}>Время загрузки не получено</span>
                            <div style={blankButtonCSS}>
                              <span>Договор подписан</span>
                              <img
                                alt={""}
                                src={docCorrect}
                                style={{ marginLeft: '6px', marginTop: '2px', width: '16px' }}
                              />
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', marginLeft: false ? '80px' : '0px' }}>
                          <div style={{ display: 'block', position: 'relative', width: '100px' }}>
                            <img
                              alt={""}
                              src={txt}
                              style={{ width: '90px', filter: 'grayscale(80%)', cursor: 'pointer' }}
                              onClick={() => {
                                dispatch(setShowFOS(true))
                                dispatch(setShowTypeFOS('showFileContract'))
                                dispatch(setShow('undefined'))
                              }}
                            />
                            { false && <img
                              alt={""}
                              src={semiMenu}
                              style={semiIconsCSS}
                            /> }
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', marginLeft: '16px' }}>
                            <span style={{ color: greyColor, marginBottom: '5px' }}>{ contractFileServer.name }</span>
                            <span style={{ color: greyColor, marginBottom: '5px', fontSize: '12px' }}>Договор загружен</span>
                            <span style={{ color: greyColor, marginBottom: '15px', fontSize: '12px' }}>Время загрузки не получено</span>
                            <div style={{ ...blankButtonCSS, backgroundColor: greyColor3 }}>
                              <span>Ждет подписания</span>
                              <img
                                alt={""}
                                src={docWait}
                                style={{ marginLeft: '6px', marginTop: '2px', width: '16px' }}
                              />
                            </div>
                          </div>
                        </div>
                      </MasterDocFork.ContentLine> }
                      { contractFileServer.text.indexOf('no such file or directory') >= 0 
                      
                        && <span style={{ color: 'grey', fontSize: '14px', marginTop: '-3px' }}>Договор не загружен в проект</span> 
                      
                      }
                      { Array(4).fill(0).map((item, index) => {

                        return (
                          <div 
                            style={{
                              display: 'none',
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              justifyContent: 'flex-start',
                              position: 'relative',
                              marginRight: '16px',
                              cursor: 'pointer',
                            }}
                          >
                            <img
                              alt={""}
                              src={doc}
                            />
                            <span style={{ fontSize: '12px', color: greyColor, marginTop: '6px' }}>{"План_Склада"}</span>
                            <span style={{ fontSize: '12px', color: greyColor2, marginTop: '4px' }}>{"140 Kb"}</span>
                          </div>
                        )

                      })}
                    </div>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.Delimiter background={chatBorderColor} style={{ marginTop: '40px', marginBottom: '40px' }}/>
                  { Array(1).fill(0).map((item, index): ReactElement => {

                    return (
                      <MasterDocFork.ContentLine style={{ marginBottom: '8px' }}>
                        <CommunicationTable
                            status={"wait"}
                            oneButtonParams={{
                              isset: true,
                              color: 'white',
                              background: 'blue2',
                              inner: 'В мастер-документы',
                              width: 220,
                            }}
                            twoButtonParams={{
                              isset: true,
                              color: 'grey',
                              background: 'white',
                              inner: 'Отказать',
                              width: 120,
                            }}
                            image={"pdf"}
                            mb={"12px"}
                          />
                      </MasterDocFork.ContentLine>
                    )

                  })}
                  <MasterDocFork.ContentLine style={{ marginTop: '40px', marginBottom: '20px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', marginRight: '80px', fontSize: '15px' }}>Общение по разделу</span>
                  </MasterDocFork.ContentLine>
                  <ChatFork.ChatHeader>
                    <div style={divCSS}>
                      <ChatFork.ChatHeaderAvatar style={avatarContainerCSS}>
                        <img
                          alt={""}
                          src={defaulrAvatar}
                          style={avatarCSS}
                        />
                        <img
                          alt={""}
                          src={defaulrAvatar}
                          style={{ ...avatarCSS, marginLeft: '-14px' }}
                        />
                        <img
                          alt={""}
                          src={defaulrAvatar}
                          style={{ ...avatarCSS, marginLeft: '-14px' }}
                        />
                      </ChatFork.ChatHeaderAvatar>
                    </div>
                    <div style={divCSS}>
                      <ChatFork.ChatHeaderEnableDocs>
                        <span style={{ ...lastActiveSpanCSS, fontSize: '14px' }}>Документы разрешены</span>
                        <Switch color={"primary"} defaultChecked />
                      </ChatFork.ChatHeaderEnableDocs>
                      <InputComponent
                        type={'TEXT_INPUT_OUTLINE_SEARCH'}
                        valueType='text'
                        required={false}
                        widthType={'px'}
                        widthValue={300}
                        heightValue={'56px'}
                        label={"Поиск по сообщениям"}
                        isError={false}
                        isDisabled={false}
                        labelShrinkLeft={"0px"}
                        innerLabel={null}
                        css={{
                          fontSize: '12px',
                          position: 'relative',
                          boxSizing: 'border-box',
                          marginBottom: '8px',
                          backgroundColor: 'white'
                        }}
                      />
                    </div>
                  </ChatFork.ChatHeader>
                  <ChatFork.ChatBody
                    border={`1px solid ${chatBorderColor}`}
                    backgroundColor={chatBackground}
                    style={{ marginTop: '12px', height: 'auto' }}
                  >
                    <ChatFork.ChatBodyInner
                      border={`1px solid transparent`}
                      backgroundColor={chatBackground}
                    >
                      <ChatMessagesContainer
                        data={[
                          { 
                            date: '05.01.2022', 
                            messages: [
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:05',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:05',
                                    likes: 0  }
                                ]
                              },
                              { 
                                type: 'you', 
                                content: [
                                  { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', 
                                    time: '20:06',
                                    name: 'Виолетта',
                                    likes: 0,
                                    files: {
                                      id: 'undefined',
                                      ext: 'doc',
                                      name: 'План_Склада.doc'
                                    }},
                                ]
                              },
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:08',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'you', 
                                content: [
                                  { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:08',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'you', 
                                content: [
                                  { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'action', 
                                content: [
                                  { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:08',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:08',
                                    likes: 0 },
                                ]
                              },
                            ]
                          }
                        ]}
                      />
                    </ChatFork.ChatBodyInner>
                    <div style={bottomDivCSS}>
                      <div style={bottomDivInnerCSS}>
                        <div style={clipDivCSS}>
                          <img
                            alt={""}
                            src={clipIcon}
                          />
                        </div>
                        <InputComponent
                          type={'TEXT_INPUT_OUTLINE'}
                          valueType='text'
                          required={false}
                          widthType={'%'}
                          widthValue={100}
                          heightValue={'50px'}
                          label={"Lorem ipsum dolor sit amet consectetur adipisicing elit"}
                          isError={false}
                          isDisabled={true}
                          labelShrinkLeft={"0px"}
                          innerLabel={null}
                          css={{
                            fontSize: '12px',
                            position: 'relative',
                            boxSizing: 'border-box',
                            marginTop: '0px',
                            backgroundColor: inputBackground,
                            marginRight: '12px'
                          }}
                        />
                        <ButtonComponent
                          inner={""} 
                          type='ICON_BUTTON_CHAT_SUBMIT' 
                          action={() => console.log('this is button')}
                          actionData={null}
                          widthType={'px'}
                          widthValue={56}
                          children={""}
                          childrenCss={undefined}
                          iconSrc={null}
                          iconCss={undefined}
                          muiIconSize={30}
                          MuiIconChildren={ArrowUpwardIcon}
                          css={{
                            position: 'relative',
                            boxSizing: 'border-box',
                            padding: '4px',
                            backgroundColor: chatSubmitColor,
                            width: '56px',
                            height: '56px',
                          }}
                        />
                      </div>
                    </div>
                  </ChatFork.ChatBody>
                </MasterDocFork.ChatContainer>
            </React.Fragment>
            : contentType === 'ExpertCC'

            /* ---------------------------------------- */
            /* базовое окно под раздел экспертизы
            /* ---------------------------------------- */

            ? <React.Fragment>
                <MasterDocFork.ChatContainer style={{ paddingTop: '40px', height: 'auto', minHeight: '100vh' }} backgroundColor={backgroundColor}>
                  <MasterDocFork.CloseIconContainer>
                    <MasterDocFork.CloseIcon onClick={showrightContent}>
                      <img
                        alt={""} 
                        src={closeIcon}  
                      />
                    </MasterDocFork.CloseIcon>
                  </MasterDocFork.CloseIconContainer>
                  <MasterDocFork.ContentLine>
                    <h3 style={{ fontSize: '28px', margin: 0, marginBottom: '28px' }}>Экспертиза - завершение проекта</h3>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine>
                      <span 
                        style={{ 
                          color: 'gray',
                          lineHeight: '24px',
                          width: '77%',
                          marginBottom: '22px',
                          marginTop: '3px'
                        }}
                      >
                        В этом окне вы можете отправить выполненный проект на проверку заказчику. Проекты принимаются в формате PDF, позже будет добавлена возможность прикладывать специализованные проектные файлы и тд
                      </span>
                    </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between' }}>
                    <div 
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        fontSize: '15px'
                      }}
                    >
                      <span style={{ fontWeight: 'bold', display: 'block', marginRight: '80px' }}>Государственная</span>
                      <span style={{ fontWeight: 'bold', display: 'block', marginRight: '80px' }}>
                        Период сдачи : { ordersList.filter(item => item.id === selectTask)[0].experDate }
                      </span>
                    </div>
                    { ( completeFileServer.text.indexOf('no such file or directory') >= 0 && USER_ROLE === 'EXECUTOR' ) && <ButtonComponent
                      inner={'Завершить проект'} 
                      type='UPLOAD' 
                      action={() => {}}
                      actionData={[ changeCompleteFile ]}
                      widthType={'px'}
                      widthValue={200}
                      children={''}
                      childrenCss={undefined}
                      iconSrc={null}
                      iconCss={undefined}
                      muiIconSize={null}
                      MuiIconChildren={EmailIcon}
                      css={{
                        backgroundColor: 'rgb(22, 124, 191)',
                        fontSize: '12px',
                        height: '46px',
                        borderRadius: '6px',
                        position: 'relative',
                        boxSizing: 'border-box',
                      }}
                    /> }
                    { completeFileServer.text.indexOf('no such file or directory') < 0 && <ButtonComponent
                      inner={'Проект на проверке'} 
                      type='CONTAINED_DISABLED' 
                      action={() => {}}
                      actionData={() => {}}
                      widthType={'px'}
                      widthValue={200}
                      children={''}
                      childrenCss={undefined}
                      iconSrc={null}
                      iconCss={undefined}
                      muiIconSize={null}
                      MuiIconChildren={EmailIcon}
                      css={{
                        backgroundColor: 'rgb(217, 231, 240)',
                        fontSize: '12px',
                        height: '46px',
                        borderRadius: '6px',
                        position: 'relative',
                        boxSizing: 'border-box',
                      }}
                    /> }
                  </MasterDocFork.ContentLine>
                  { ( COMPLETE_FILE && COMPLETE_FILE?.length > 0 && COMPLETE_FILE[0].type === 'application/pdf' ) && <React.Fragment>
                    <MasterDocFork.ContentLine style={{ justifyContent: 'space-around' }}>
                      <h3 style={{ marginTop: '46px', marginBottom: '33px' }}>Отправить работу на проверку заказчику?</h3>
                    </MasterDocFork.ContentLine>
                    <MasterDocFork.ContentLine style={{ justifyContent: 'space-around' }}>
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <ButtonComponent
                          inner={"Подтвердить"} 
                          type='CONTAINED_DEFAULT' 
                          action={changeComplete}
                          actionData={null}
                          widthType={'px'}
                          widthValue={160}
                          children={""}
                          childrenCss={undefined}
                          iconSrc={null}
                          iconCss={undefined}
                          muiIconSize={30}
                          MuiIconChildren={ArrowUpwardIcon}
                          css={{
                            position: 'relative',
                            boxSizing: 'border-box',
                            padding: '4px',
                            backgroundColor: '#4caf50',
                            color: 'white',
                            width: '56px',
                            height: '43px',
                          }}
                        />
                        <span style={{ width: '22px' }}/>
                        <ButtonComponent
                          inner={"Отменить"} 
                          type='CONTAINED_DEFAULT' 
                          action={() => {
                            dispatch(resetCompleteFile(''))
                            dispatch(setShow(false))
                          }}
                          actionData={null}
                          widthType={'px'}
                          widthValue={160}
                          children={""}
                          childrenCss={undefined}
                          iconSrc={null}
                          iconCss={undefined}
                          muiIconSize={30}
                          MuiIconChildren={ArrowUpwardIcon}
                          css={{
                            position: 'relative',
                            boxSizing: 'border-box',
                            padding: '4px',
                            backgroundColor: chatBorderColor,
                            color: greyColor,
                            width: '56px',
                            height: '43px',
                          }}
                        />
                      </div>
                    </MasterDocFork.ContentLine>
                  </React.Fragment> }
                  { ( COMPLETE_FILE && COMPLETE_FILE?.length > 0 && COMPLETE_FILE[0].type !== 'application/pdf' ) && <React.Fragment>
                    <MasterDocFork.ContentLine style={{ justifyContent: 'space-around' }}>
                      <h3 style={{ marginTop: '46px', marginBottom: '33px' }}>Приложен неверный формат проектного документа</h3>
                    </MasterDocFork.ContentLine>
                    <MasterDocFork.ContentLine style={{ justifyContent: 'space-around' }}>
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <ButtonComponent
                          inner={"Подтвердить"} 
                          type='CONTAINED_DISABLED' 
                          action={changeComplete}
                          actionData={null}
                          widthType={'px'}
                          widthValue={160}
                          children={""}
                          childrenCss={undefined}
                          iconSrc={null}
                          iconCss={undefined}
                          muiIconSize={30}
                          MuiIconChildren={ArrowUpwardIcon}
                          css={{
                            position: 'relative',
                            boxSizing: 'border-box',
                            padding: '4px',
                            backgroundColor: '#4caf50',
                            color: 'white',
                            width: '56px',
                            height: '43px',
                            boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
                          }}
                        />
                        <span style={{ width: '22px' }}/>
                        <ButtonComponent
                          inner={"Отменить"} 
                          type='CONTAINED_DEFAULT' 
                          action={() => {
                            dispatch(resetCompleteFile(''))
                            dispatch(setShow(false))
                          }}
                          actionData={null}
                          widthType={'px'}
                          widthValue={160}
                          children={""}
                          childrenCss={undefined}
                          iconSrc={null}
                          iconCss={undefined}
                          muiIconSize={30}
                          MuiIconChildren={ArrowUpwardIcon}
                          css={{
                            position: 'relative',
                            boxSizing: 'border-box',
                            padding: '4px',
                            backgroundColor: chatBorderColor,
                            color: greyColor,
                            width: '56px',
                            height: '43px',
                          }}
                        />
                      </div>
                    </MasterDocFork.ContentLine>
                  </React.Fragment> }
                  <MasterDocFork.Delimiter background={chatBorderColor} style={{ marginTop: '50px', marginBottom: '50px' }}/>
                  <MasterDocFork.ContentLine>
                    <InputComponent
                      type={'TEXT_INPUT_OUTLINE'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={100}
                      heightValue={'50px'}
                      label={"Комментарий по экспертизе"}
                      isError={false}
                      isDisabled={true}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      css={{
                        fontSize: '12px',
                        position: 'relative',
                        boxSizing: 'border-box',
                        marginTop: '0px',
                        backgroundColor: inputBackground,
                      }}
                    />
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '44px', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div 
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                      }}
                    >
                      <span style={{ fontWeight: 'bold', display: 'block', marginRight: '15px', fontSize: '15px' }}>Мастер документы</span>
                      <img
                        alt={""}
                        src={infoGrey}
                      />
                      <span style={{ fontWeight: 'bold', display: 'block', marginLeft: '30px', opacity: 0.5 }}>Вложения</span>
                    </div>
                    <ButtonComponent
                      inner={"Скачать архивом"} 
                      type='CONTAINED_DEFAULT' 
                      action={() => console.log('this is button')}
                      actionData={null}
                      widthType={'px'}
                      widthValue={160}
                      children={""}
                      childrenCss={undefined}
                      iconSrc={null}
                      iconCss={undefined}
                      muiIconSize={30}
                      MuiIconChildren={ArrowUpwardIcon}
                      css={{
                        position: 'relative',
                        boxSizing: 'border-box',
                        padding: '4px',
                        backgroundColor: chatBorderColor,
                        color: greyColor,
                        width: '56px',
                        height: '43px',
                      }}
                    />
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine>
                    <div style={whiteContainerCSS}>
                      { contractFileServer.text.indexOf('no such file or directory') < 0 && <MasterDocFork.ContentLine style={{ marginTop: '10px' }}>
                        <div style={{ display: 'none', flexDirection: 'row' }}>
                          <div style={{ display: 'block', position: 'relative', width: '100px' }}>
                            <img
                              alt={""}
                              src={txt}
                              style={{ width: '90px', cursor: 'pointer' }}
                            />
                            { false && <img
                              alt={""}
                              src={semiMenu}
                              style={semiIconsCSS}
                            /> }
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', marginLeft: '16px' }}>
                            <span style={{ color: greyColor, marginBottom: '5px' }}>Договор основной</span>
                            <span style={{ color: greyColor, marginBottom: '5px', fontSize: '12px' }}>Договор загружен</span>
                            <span style={{ color: greyColor, marginBottom: '15px', fontSize: '12px' }}>Время загрузки не получено</span>
                            <div style={blankButtonCSS}>
                              <span>Договор подписан</span>
                              <img
                                alt={""}
                                src={docCorrect}
                                style={{ marginLeft: '6px', marginTop: '2px', width: '16px' }}
                              />
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', marginLeft: false ? '80px' : '0px' }}>
                          <div style={{ display: 'block', position: 'relative', width: '100px' }}>
                            <img
                              alt={""}
                              src={txt}
                              style={{ width: '90px', filter: 'grayscale(80%)', cursor: 'pointer' }}
                              onClick={() => {
                                dispatch(setShowFOS(true))
                                dispatch(setShowTypeFOS('showFileContract'))
                                dispatch(setShow('undefined'))
                              }}
                            />
                            { false && <img
                              alt={""}
                              src={semiMenu}
                              style={semiIconsCSS}
                            /> }
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', marginLeft: '16px' }}>
                            <span style={{ color: greyColor, marginBottom: '5px' }}>{ contractFileServer.name }</span>
                            <span style={{ color: greyColor, marginBottom: '5px', fontSize: '12px' }}>Договор загружен</span>
                            <span style={{ color: greyColor, marginBottom: '15px', fontSize: '12px' }}>Время загрузки не получено</span>
                            <div style={{ ...blankButtonCSS, backgroundColor: greyColor3 }}>
                              <span>Ждет подписания</span>
                              <img
                                alt={""}
                                src={docWait}
                                style={{ marginLeft: '6px', marginTop: '2px', width: '16px' }}
                              />
                            </div>
                          </div>
                        </div>
                      </MasterDocFork.ContentLine> }
                      { contractFileServer.text.indexOf('no such file or directory') >= 0 
                      
                        && <span style={{ color: 'grey', fontSize: '14px', marginTop: '-3px' }}>Договор не загружен в проект</span> 
                      
                      }
                      { Array(4).fill(0).map((item, index) => {

                        return (
                          <div 
                            style={{
                              display: 'none',
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              justifyContent: 'flex-start',
                              position: 'relative',
                              marginRight: '16px',
                              cursor: 'pointer',
                            }}
                          >
                            <img
                              alt={""}
                              src={doc}
                            />
                            <span style={{ fontSize: '12px', color: greyColor, marginTop: '6px' }}>{"План_Склада"}</span>
                            <span style={{ fontSize: '12px', color: greyColor2, marginTop: '4px' }}>{"140 Kb"}</span>
                          </div>
                        )

                      })}
                    </div>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '43px', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', marginRight: '80px', fontSize: '15px' }}>Ответственный</span>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        position: 'relative'
                      }}
                    >
                      <img
                        alt={""}
                        src={defaulrAvatar}
                        style={{
                          display: 'block',
                          position: 'relative',
                          width: '56px',
                          marginRight: '20px'
                        }}
                      />
                      <div 
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          justifyContent: 'flex-start',
                          position: 'relative',
                          marginTop: '-6px'
                        }}
                      >
                        <span style={{ fontSize: '13px', width: '140px', marginBottom: '6px', lineHeight: '22px', fontWeight: 'bold' }}>
                          { ordersList.filter(item => item.id === selectTask)[0].executor }  
                        </span>
                        <span style={{ fontSize: '14px' }}>{"Вид занятости не получен"}</span>
                      </div>
                    </div>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.Delimiter background={chatBorderColor} style={{ marginTop: '40px', marginBottom: '46px' }}/>
                  { Array(3).fill(0).map((item, index): ReactElement => {

                    return (
                      <MasterDocFork.ContentLine style={{ marginBottom: '8px' }}>
                        <CommunicationTable
                            status={"wait"}
                            oneButtonParams={{
                              isset: true,
                              color: 'white',
                              background: 'blue2',
                              inner: 'В мастер-документы',
                              width: 220,
                            }}
                            twoButtonParams={{
                              isset: true,
                              color: 'grey',
                              background: 'white',
                              inner: 'Отказать',
                              width: 120,
                            }}
                            image={"pdf"}
                            mb={"12px"}
                          />
                      </MasterDocFork.ContentLine>
                    )

                  })}
                  <MasterDocFork.ContentLine style={{ marginTop: '10px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', marginRight: '80px' }}>Общение</span>
                    <InputComponent
                      type={'TEXT_INPUT_OUTLINE_SEARCH'}
                      valueType='text'
                      required={false}
                      widthType={'px'}
                      widthValue={300}
                      heightValue={'56px'}
                      label={"Поиск по сообщениям"}
                      isError={false}
                      isDisabled={false}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      css={{
                        fontSize: '12px',
                        position: 'relative',
                        boxSizing: 'border-box',
                        marginBottom: '8px',
                        backgroundColor: 'white'
                      }}
                    />
                  </MasterDocFork.ContentLine>
                  <ChatFork.ChatBody
                    border={`1px solid ${chatBorderColor}`}
                    backgroundColor={chatBackground}
                    style={{ marginTop: '18px', height: 'auto' }}
                  >
                    <ChatFork.ChatBodyInner
                      border={`1px solid transparent`}
                      backgroundColor={chatBackground}
                    >
                      <ChatMessagesContainer
                        data={[
                          { 
                            date: '05.01.2022', 
                            messages: [
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:05',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:05',
                                    likes: 0  }
                                ]
                              },
                              { 
                                type: 'you', 
                                content: [
                                  { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', 
                                    time: '20:06',
                                    name: 'Виолетта',
                                    likes: 0,
                                    files: {
                                      id: 'undefined',
                                      ext: 'doc',
                                      name: 'План_Склада.doc'
                                    }},
                                ]
                              },
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:08',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'you', 
                                content: [
                                  { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:08',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'you', 
                                content: [
                                  { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'action', 
                                content: [
                                  { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:08',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:08',
                                    likes: 0 },
                                ]
                              },
                            ]
                          }
                        ]}
                      />
                    </ChatFork.ChatBodyInner>
                    <div style={bottomDivCSS}>
                      <div style={bottomDivInnerCSS}>
                        <div style={clipDivCSS}>
                          <img
                            alt={""}
                            src={clipIcon}
                          />
                        </div>
                        <InputComponent
                          type={'TEXT_INPUT_OUTLINE'}
                          valueType='text'
                          required={false}
                          widthType={'%'}
                          widthValue={100}
                          heightValue={'50px'}
                          label={"Lorem ipsum dolor sit amet consectetur adipisicing elit"}
                          isError={false}
                          isDisabled={true}
                          labelShrinkLeft={"0px"}
                          innerLabel={null}
                          css={{
                            fontSize: '12px',
                            position: 'relative',
                            boxSizing: 'border-box',
                            marginTop: '0px',
                            backgroundColor: inputBackground,
                            marginRight: '12px'
                          }}
                        />
                        <ButtonComponent
                          inner={""} 
                          type='ICON_BUTTON_CHAT_SUBMIT' 
                          action={() => console.log('this is button')}
                          actionData={null}
                          widthType={'px'}
                          widthValue={56}
                          children={""}
                          childrenCss={undefined}
                          iconSrc={null}
                          iconCss={undefined}
                          muiIconSize={30}
                          MuiIconChildren={ArrowUpwardIcon}
                          css={{
                            position: 'relative',
                            boxSizing: 'border-box',
                            padding: '4px',
                            backgroundColor: chatSubmitColor,
                            width: '56px',
                            height: '56px',
                          }}
                        />
                      </div>
                    </div>
                  </ChatFork.ChatBody>
                </MasterDocFork.ChatContainer>
            </React.Fragment> 
            : contentType === 'AgreementCC'

            /* ---------------------------------------- */
            /* базовое окно для доп соглашения
            /* ---------------------------------------- */

            ? <React.Fragment>
                <MasterDocFork.ChatContainer style={{ paddingTop: '40px', height: 'auto', minHeight: '100vh' }} backgroundColor={backgroundColor}>
                  <MasterDocFork.CloseIconContainer>
                    <MasterDocFork.CloseIcon onClick={showrightContent}>
                      <img
                        alt={""} 
                        src={closeIcon}  
                      />
                    </MasterDocFork.CloseIcon>
                  </MasterDocFork.CloseIconContainer>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '28px', margin: 0, marginBottom: 0 }}>Дополнительное соглашение</h3>
                    <ButtonComponent
                      inner={"Редактировать"} 
                      type='CONTAINED_DEFAULT' 
                      action={() => console.log('this is button')}
                      actionData={null}
                      widthType={'px'}
                      widthValue={160}
                      children={""}
                      childrenCss={undefined}
                      iconSrc={null}
                      iconCss={undefined}
                      muiIconSize={30}
                      MuiIconChildren={ArrowUpwardIcon}
                      css={{
                        position: 'absolute',
                        boxSizing: 'border-box',
                        padding: '4px',
                        backgroundColor: chatBorderColor,
                        color: greyColor,
                        width: '56px',
                        height: '43px',
                      }}
                    />
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '44px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', fontSize: '18px' }}>Изменить стоимость и сроки</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginTop: '34px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '200px', lineHeight: '22px' }}>Текущая стоимость заказа</span>
                    <span style={{ fontWeight: '700', display: 'block', fontSize: '18px' }}>
                      { ordersList.length > 0 ? ordersList.filter(item => item.id === selectTask)[0].coast.value : 'Нет данных' }  
                    </span>
                    <div 
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        position: 'relative',
                        width: '55%'
                      }}
                    >
                      <InputComponent
                        type={'TEXT_INPUT_OUTLINE_CHANGE_AGREE'}
                        valueType='text'
                        required={false}
                        widthType={'%'}
                        widthValue={50}
                        heightValue={'56px'}
                        label={"Изменить на"}
                        isError={false}
                        isDisabled={false}
                        labelShrinkLeft={"0px"}
                        innerLabel={null}
                        store={[ "NEW_COAST", () => null ]}
                        css={{
                          fontSize: '12px',
                          position: 'relative',
                          boxSizing: 'border-box',
                          backgroundColor: 'white',
                          marginLeft: '20px'
                        }}
                      />
                      <InputComponent
                        type={'TEXT_INPUT_OUTLINE_DATE'}
                        valueType='text'
                        required={false}
                        widthType={'%'}
                        widthValue={50}
                        heightValue={'56px'}
                        label={"Дата окончания"}
                        isError={false}
                        isDisabled={true}
                        labelShrinkLeft={"0px"}
                        innerLabel={null}
                        css={{
                          fontSize: '12px',
                          position: 'relative',
                          boxSizing: 'border-box',
                          backgroundColor: inputBackground,
                          marginLeft: '20px'
                        }}
                      />
                    </div>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginTop: '34px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '200px', lineHeight: '22px' }}>Текущая стоимость аванса</span>
                    <span style={{ fontWeight: '700', display: 'block', fontSize: '18px' }}>
                      { ordersList.length > 0 ? ordersList.filter(item => item.id === selectTask)[0].coast.prepay : 'Нет данных' } 
                    </span>
                    <div 
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        position: 'relative',
                        width: '55%'
                      }}
                    >
                      <InputComponent
                        type={'TEXT_INPUT_OUTLINE_CHANGE_AGREE'}
                        valueType='text'
                        required={false}
                        widthType={'%'}
                        widthValue={50}
                        heightValue={'56px'}
                        label={"Изменить на"}
                        isError={false}
                        isDisabled={false}
                        labelShrinkLeft={"0px"}
                        innerLabel={null}
                        store={[ "NEW_PREPAY", () => null ]}
                        css={{
                          fontSize: '12px',
                          position: 'relative',
                          boxSizing: 'border-box',
                          backgroundColor: 'white',
                          marginLeft: '20px'
                        }}
                      />
                      <InputComponent
                        type={'TEXT_INPUT_OUTLINE'}
                        valueType='text'
                        required={false}
                        widthType={'%'}
                        widthValue={50}
                        heightValue={'56px'}
                        label={"Срок принятия решения"}
                        isError={false}
                        isDisabled={true}
                        labelShrinkLeft={"0px"}
                        innerLabel={null}
                        css={{
                          fontSize: '12px',
                          position: 'relative',
                          boxSizing: 'border-box',
                          backgroundColor: inputBackground,
                          marginLeft: '20px'
                        }}
                      />
                    </div>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginTop: '34px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '200px', lineHeight: '22px' }}>Текущая стоимость экспертизы</span>
                    <span style={{ fontWeight: '700', display: 'block', fontSize: '18px' }}>
                      { ordersList.length > 0 ? ordersList.filter(item => item.id === selectTask)[0].coast.exper : 'Нет данных' } 
                    </span>
                    <div 
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        position: 'relative',
                        width: '55%'
                      }}
                    >
                      <InputComponent
                        type={'TEXT_INPUT_OUTLINE_CHANGE_AGREE'}
                        valueType='text'
                        required={false}
                        widthType={'%'}
                        widthValue={50}
                        heightValue={'56px'}
                        label={"Изменить на"}
                        isError={false}
                        isDisabled={false}
                        labelShrinkLeft={"0px"}
                        innerLabel={null}
                        store={[ "NEW_EXPERT", () => null ]}
                        css={{
                          fontSize: '12px',
                          position: 'relative',
                          boxSizing: 'border-box',
                          backgroundColor: 'white',
                          marginLeft: '20px'
                        }}
                      />
                      <InputComponent
                        type={'TEXT_INPUT_OUTLINE_DATE'}
                        valueType='text'
                        required={false}
                        widthType={'%'}
                        widthValue={50}
                        heightValue={'56px'}
                        label={"Дата экспертизы"}
                        isError={false}
                        isDisabled={true}
                        labelShrinkLeft={"0px"}
                        innerLabel={null}
                        css={{
                          fontSize: '12px',
                          position: 'relative',
                          boxSizing: 'border-box',
                          backgroundColor: inputBackground,
                          marginLeft: '20px'
                        }}
                      />
                    </div>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.Delimiter background={chatBorderColor} style={{ marginTop: '40px', marginBottom: '0px' }}/>
                  <MasterDocFork.ContentLine style={{ marginTop: '43px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', fontSize: '18px' }}>Добавить или удалить раздел</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '110px' }}>
                    <ChapterController 
                      isBottomButton={false}
                      marginBott={"0px"}
                    />
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '90px', marginBottom: '11px' }}>
                    <span
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        position: 'relative',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        padding: '3px',
                        backgroundColor: chatBorderColor,
                        cursor: 'pointer',
                        marginRight: '10px',
                      }}
                    >
                      <img
                        alt={""}
                        src={plus}
                      />
                    </span>
                    <span style={{ display: 'block', marginRight: '80px' }}>Добавить раздел</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.Delimiter background={chatBorderColor} style={{ marginTop: '40px', marginBottom: '0px' }}/>
                  <MasterDocFork.ContentLine style={{ marginTop: '44px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', fontSize: '18px' }}>Описание задачи</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '20px' }}>
                    <InputComponent
                      type={'TEXT_INPUT_OUTLINE_CHANGE_AGREE'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={100}
                      heightValue={'50px'}
                      label={"Вы можете изменить описание задачи"}
                      isError={false}
                      isDisabled={false}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ "NEW_TEXT", () => null ]}
                      css={{
                        fontSize: '12px',
                        position: 'relative',
                        boxSizing: 'border-box',
                        marginTop: '0px',
                        backgroundColor: inputBackground,
                      }}
                    />
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-around', marginTop: '60px', marginBottom: '60px' }}>
                    <ButtonComponent
                      inner={"Предложить изменения"} 
                      type='CONTAINED_DEFAULT' 
                      action={showNewAgreement}
                      actionData={null}
                      widthType={'px'}
                      widthValue={228}
                      children={""}
                      childrenCss={undefined}
                      iconSrc={null}
                      iconCss={undefined}
                      muiIconSize={30}
                      MuiIconChildren={ArrowUpwardIcon}
                      css={{
                        position: 'relative',
                        boxSizing: 'border-box',
                        padding: '4px',
                        backgroundColor: chatSubmitColor,
                        width: '56px',
                        height: '43px',
                      }}
                    />
                  </MasterDocFork.ContentLine>
                </MasterDocFork.ChatContainer>
            </React.Fragment>
            : contentType === 'AgreementNewCC'

            /* ---------------------------------------- */
            /* базовое окно для доп соглашения - new
            /* ---------------------------------------- */

            ? <React.Fragment>
                <MasterDocFork.ChatContainer style={{ paddingTop: '40px', height: 'auto', minHeight: '100vh' }} backgroundColor={backgroundColor}>
                  <MasterDocFork.CloseIconContainer>
                    <MasterDocFork.CloseIcon onClick={showrightContent}>
                      <img
                        alt={""} 
                        src={closeIcon}  
                      />
                    </MasterDocFork.CloseIcon>
                  </MasterDocFork.CloseIconContainer>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '28px', margin: 0, marginBottom: 0 }}>Дополнительное соглашение</h3>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '30px' }}>
                    <span style={{ display: 'block', marginRight: '80px', fontSize: '15px' }}>Предлагается внести следующие изменения</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '44px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', fontSize: '18px' }}>Изменить стоимость и сроки</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginTop: '34px', boxSizing: 'border-box', paddingRight: '40px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '30%', lineHeight: '22px' }}>Текущая стоимость заказа</span>
                    <div style={{ width: '15%' }}>
                      <span style={{ fontWeight: '700', display: 'block', fontSize: '18px', textAlign: 'left' }}>
                        { ordersList.length > 0 ? ordersList.filter(item => item.id === selectTask)[0].coast.value : 'Нет данных' } 
                      </span>
                      <span style={{ fontSize: '12px', marginTop: '5px', display: 'block' }}>{"до 10.03.2023"}</span>
                    </div>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '35%', lineHeight: '22px' }}>Новая стоимость заказа</span>
                    <div style={{ width: '10%' }}>
                      <span style={{ fontWeight: '700', display: 'block', fontSize: '18px', color: chatSubmitColor }}>
                        { NEW_AGREE_COAST ? NEW_AGREE_COAST : 0 }
                      </span>
                      <span style={{ fontSize: '12px', marginTop: '5px', display: 'block' }}>{"до 10.03.2023"}</span>
                    </div>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginTop: '34px', boxSizing: 'border-box', paddingRight: '40px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '30%', lineHeight: '22px' }}>Текущая стоимость аванса</span>
                    <div style={{ width: '15%' }}>
                      <span style={{ fontWeight: '700', display: 'block', fontSize: '18px', textAlign: 'left' }}>
                        { ordersList.length > 0 ? ordersList.filter(item => item.id === selectTask)[0].coast.prepay : 'Нет данных' }
                      </span>
                      <span style={{ fontSize: '12px', marginTop: '5px', display: 'block' }}>{"до 10.03.2023"}</span>
                    </div>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '35%', lineHeight: '22px' }}>Новая стоимость аванса</span>
                    <div style={{ width: '10%' }}>
                      <span style={{ fontWeight: '700', display: 'block', fontSize: '18px', color: chatSubmitColor }}>
                        { NEW_AGREE_PREPAY ? NEW_AGREE_PREPAY : 0 }
                      </span>
                      <span style={{ fontSize: '12px', marginTop: '5px', display: 'block' }}>{"до 10.03.2023"}</span>
                    </div>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginTop: '34px', boxSizing: 'border-box', paddingRight: '40px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '30%', lineHeight: '22px' }}>Текущая стоимость экспертизы</span>
                    <div style={{ width: '15%' }}>
                      <span style={{ fontWeight: '700', display: 'block', fontSize: '18px', textAlign: 'left' }}>
                        { ordersList.length > 0 ? ordersList.filter(item => item.id === selectTask)[0].coast.exper : 'Нет данных' }
                      </span>
                      <span style={{ fontSize: '12px', marginTop: '5px', display: 'block' }}>{"до 10.03.2023"}</span>
                    </div>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '35%', lineHeight: '22px' }}>Новая стоимость экспертизы</span>
                    <div style={{ width: '10%' }}>
                      <span style={{ fontWeight: '700', display: 'block', fontSize: '18px', color: chatSubmitColor }}>
                        { NEW_AGREE_EXPERT ? NEW_AGREE_EXPERT : 0 }
                      </span>
                      <span style={{ fontSize: '12px', marginTop: '5px', display: 'block' }}>{"до 10.03.2023"}</span>
                    </div>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.Delimiter background={chatBorderColor} style={{ marginTop: '40px', marginBottom: '0px' }}/>
                  { false && <React.Fragment>
                    <MasterDocFork.ContentLine style={{ marginTop: '44px' }}>
                      <span style={{ fontWeight: 'bold', display: 'block', fontSize: '18px' }}>Добавить или удалить раздел</span>
                    </MasterDocFork.ContentLine>
                    <MasterDocFork.ContentLine style={{ marginTop: '30px' }}>
                      <span style={{ display: 'block', marginRight: '80px' }}>{"Раздел удален"}</span>
                    </MasterDocFork.ContentLine>
                    <MasterDocFork.ContentLine style={{ marginTop: '10px' }}>
                      <span style={{ display: 'block', marginRight: '80px', fontWeight: 'bold', color: chatSubmitColor }}>{"Пожарная безопасность"}</span>
                    </MasterDocFork.ContentLine>
                    <MasterDocFork.ContentLine style={{ marginTop: '104px' }}>
                      <ChapterController 
                        isBottomButton={false}
                        marginBott={"0px"}
                      />
                    </MasterDocFork.ContentLine>
                    <MasterDocFork.ContentLine style={{ marginTop: '110px' }}>
                      <span style={{ display: 'block', marginRight: '80px' }}>{"Раздел добавлен"}</span>
                    </MasterDocFork.ContentLine>
                    <MasterDocFork.ContentLine style={{ marginTop: '10px' }}>
                      <span style={{ display: 'block', marginRight: '80px', fontWeight: 'bold', color: chatSubmitColor }}>{"Вентиляция"}</span>
                    </MasterDocFork.ContentLine>
                    <MasterDocFork.ContentLine style={{ marginTop: '104px' }}>
                      <ChapterController 
                        isBottomButton={false}
                        marginBott={"0px"}
                      />
                    </MasterDocFork.ContentLine>
                    <MasterDocFork.ContentLine style={{ marginTop: '100px' }}>
                      <span style={{ fontWeight: 'bold', display: 'block', fontSize: '18px' }}>Название нового раздела</span>
                    </MasterDocFork.ContentLine>
                    <MasterDocFork.ContentLine style={{ marginTop: '20px' }}>
                      <span style={{ lineHeight: '22px' }}>{ localText }</span>
                    </MasterDocFork.ContentLine>
                    <MasterDocFork.ContentLine style={{ marginTop: '30px', marginBottom: '24px' }}>
                      <span style={{ fontWeight: 'bold', display: 'block' }}>Вложения</span>
                    </MasterDocFork.ContentLine>
                    { Array(2)
                      .fill({ 
                        status: 'WHITE', 
                        data: { 
                          name: 'Акт_выполненных работ.pdf', 
                          date: '29.02.2023', 
                          statusName: 'Предложен' 
                        }
                      }).map((item, index) => {

                      return (
                        <MasterDocFork.ContentLine key={index}>
                          <DocumentLine
                            status={item.status}
                            data={item.data}
                          />
                        </MasterDocFork.ContentLine>
                      )

                    })}
                    <MasterDocFork.Delimiter background={chatBorderColor} style={{ marginTop: '34px', marginBottom: '35px' }}/>
                  </React.Fragment> }
                  <MasterDocFork.ContentLine style={{ marginTop: !false && '42px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', fontSize: '18px' }}>Описание задачи</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '30px', marginBottom: '14px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block' }}>Прежнее описание</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine>
                    <span style={{ lineHeight: '24px' }}>
                      { ordersList.length > 0 ? ordersList.filter(item => item.id === selectTask)[0].description : '' }
                    </span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '30px', marginBottom: '14px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block' }}>Предлагаемое описание</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine>
                    <span style={{ lineHeight: '24px', color: chatSubmitColor }}>
                      { NEW_AGREE_TEXT ? NEW_AGREE_TEXT : 'Нового описания не предлагается' }
                    </span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-around', marginTop: '60px', marginBottom: '60px' }}>
                    <ButtonComponent
                      inner={"Принять изменения"} 
                      type='CONTAINED_DEFAULT' 
                      action={() => console.log('this is button')}
                      actionData={null}
                      widthType={'px'}
                      widthValue={228}
                      children={""}
                      childrenCss={undefined}
                      iconSrc={null}
                      iconCss={undefined}
                      muiIconSize={30}
                      MuiIconChildren={ArrowUpwardIcon}
                      css={{
                        position: 'relative',
                        boxSizing: 'border-box',
                        padding: '4px',
                        backgroundColor: chatSubmitColor,
                        width: '56px',
                        height: '43px',
                      }}
                    />
                  </MasterDocFork.ContentLine>
                </MasterDocFork.ChatContainer>
            </React.Fragment>
            : contentType === 'LawyerCC' 
            
            /* ---------------------------------------- */
            /* базовое окно для помощи юриста
            /* ---------------------------------------- */

            ? <React.Fragment>
                <MasterDocFork.ChatContainer style={{ paddingTop: '40px', height: 'auto', minHeight: '100vh' }} backgroundColor={backgroundColor}>
                  <MasterDocFork.CloseIconContainer>
                    <MasterDocFork.CloseIcon onClick={showrightContent}>
                      <img
                        alt={""} 
                        src={closeIcon}  
                      />
                    </MasterDocFork.CloseIcon>
                  </MasterDocFork.CloseIconContainer>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginBottom: '22px' }}>
                    <h3 style={{ fontSize: '28px', margin: 0, marginBottom: 0 }}>Консультация юриста</h3>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginBottom: '32px' }}>
                    <span style={{ lineHeight: '24px' }}>{"Чтобы открыть спор или получить консультацию юриста, заполните форму ниже"}</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine>
                    <SelectField 
                      placeholder={"Получить консультацию"}
                      params={{ width: 420, mb: '0px', height: 50 }}
                      data={[
                        { value: '1', label: 'Получить консультацию' },
                        { value: '2', label: 'Открыть спор' },
                      ]}
                      multy={false}
                      action={() => {}}
                      actionType={""}
                      actionParams={[]}
                      showIcon={true}
                      icon={null}
                      iconStyles={{
                        marginTop: '-12px',
                        marginLeft: '6px',
                        width: '34px',
                      }}
                    />
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '20px' }}>
                    <InputComponent
                      type={'TEXT_INPUT_OUTLINE'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={100}
                      heightValue={'50px'}
                      label={"Опишите, пожалуйста, вашу проблему или спорный вопрос по проекту"}
                      isError={false}
                      isDisabled={true}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      css={{
                        fontSize: '12px',
                        position: 'relative',
                        boxSizing: 'border-box',
                        marginTop: '0px',
                        backgroundColor: inputBackground,
                      }}
                    />
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-around', marginTop: '50px', marginBottom: '60px' }}>
                    <ButtonComponent
                      inner={"Отправить данные"} 
                      type='CONTAINED_DEFAULT' 
                      action={showNewAgreement}
                      actionData={null}
                      widthType={'px'}
                      widthValue={228}
                      children={""}
                      childrenCss={undefined}
                      iconSrc={null}
                      iconCss={undefined}
                      muiIconSize={30}
                      MuiIconChildren={ArrowUpwardIcon}
                      css={{
                        position: 'relative',
                        boxSizing: 'border-box',
                        padding: '4px',
                        backgroundColor: chatSubmitColor,
                        width: '56px',
                        height: '43px',
                      }}
                    />
                  </MasterDocFork.ContentLine>
                </MasterDocFork.ChatContainer>
            </React.Fragment>
            : contentType === 'ArguementCC'

            /* ---------------------------------------- */
            /* базовое окно для открытого спора
            /* ---------------------------------------- */

            ? <React.Fragment>
                <MasterDocFork.ChatContainer style={{ paddingTop: '40px', height: 'auto', minHeight: '100vh' }} backgroundColor={backgroundColor}>
                  <MasterDocFork.CloseIconContainer>
                    <MasterDocFork.CloseIcon onClick={showrightContent}>
                      <img
                        alt={""} 
                        src={closeIcon}  
                      />
                    </MasterDocFork.CloseIcon>
                  </MasterDocFork.CloseIconContainer>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginBottom: '0px' }}>
                    <h3 style={{ fontSize: '28px', margin: 0, marginBottom: 0 }}>Карточка спора</h3>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <span style={{ fontWeight: 'bold', display: 'block', marginRight: '30px' }}>Ответственный юрист</span>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          position: 'relative'
                        }}
                      >
                        <img
                          alt={""}
                          src={defaulrAvatar}
                          style={{
                            display: 'block',
                            position: 'relative',
                            width: '56px',
                            marginRight: '20px'
                          }}
                        />
                        <div 
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            position: 'relative',
                            marginTop: '0px'
                          }}
                        >
                          <span style={{ fontSize: '15px', width: '240px', marginBottom: '0px', lineHeight: '22px', fontWeight: '500' }}>Юридическая поддержка</span>
                        </div>
                      </div>
                    </div>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '12px', marginBottom: '24px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', fontSize: '18px' }}>Содержание претензии</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginBottom: '0px' }}>
                    <span style={{ lineHeight: '24px' }}>{ localText }</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginTop: '40px', marginBottom: '0px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '50%' }}>Общая сумма заказа</span>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '50%', marginLeft: '20px' }}>Заморожено</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ justifyContent: 'space-between', marginTop: '10px', marginBottom: '40px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '50%', fontSize: '20px' }}>{"200 000"}₽</span>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '50%', fontSize: '20px', marginLeft: '20px' }}>{"30 000"}₽</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine>
                    <MasterDocFork.WhiteContainer width={"50%"}>
                      <span style={{ fontWeight: 'bold', display: 'block', marginBottom: '20px' }}>Истец</span>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          position: 'relative'
                        }}
                      >
                        <img
                          alt={""}
                          src={defaulrAvatar}
                          style={{
                            display: 'block',
                            position: 'relative',
                            width: '56px',
                            marginRight: '20px'
                          }}
                        />
                        <div 
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            position: 'relative',
                            marginTop: '-6px'
                          }}
                        >
                          <span style={{ fontSize: '16px', width: '200px', marginBottom: '6px', lineHeight: '22px', fontWeight: '500' }}>Петров Иван Владимирович</span>
                          <span style={{ fontSize: '14px', color: greyColor2 }}>ООО Технические Системы</span>
                        </div>
                      </div>
                    </MasterDocFork.WhiteContainer>
                    <span style={{ width: '20px' }}/>
                    <MasterDocFork.WhiteContainer width={"50%"}>
                      <span style={{ fontWeight: 'bold', display: 'block', marginBottom: '20px' }}>Ответчик</span>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          position: 'relative'
                        }}
                      >
                        <img
                          alt={""}
                          src={defaulrAvatar}
                          style={{
                            display: 'block',
                            position: 'relative',
                            width: '56px',
                            marginRight: '20px'
                          }}
                        />
                        <div 
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            position: 'relative',
                            marginTop: '-6px'
                          }}
                        >
                          <span style={{ fontSize: '16px', width: '200px', marginBottom: '6px', lineHeight: '22px', fontWeight: '500' }}>Захарова Виолетта Владимировна</span>
                          <span style={{ fontSize: '14px', color: greyColor2 }}>Самозанятый</span>
                        </div>
                      </div>
                    </MasterDocFork.WhiteContainer>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.Delimiter background={chatBorderColor} style={{ marginTop: '60px', marginBottom: '0px' }}/>
                  <MasterDocFork.ContentLine style={{ marginTop: '46px', marginBottom: '24px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', fontSize: '18px' }}>Решение юриста</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine>
                    <MasterDocFork.WhiteContainer width={"50%"} style={{ height: '150px' }}>
                      <span style={{ fontWeight: 'bold', display: 'block', marginBottom: '20px' }}>Решение в пользу</span>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          position: 'relative'
                        }}
                      >
                        <img
                          alt={""}
                          src={defaulrAvatar}
                          style={{
                            display: 'block',
                            position: 'relative',
                            width: '56px',
                            marginRight: '20px'
                          }}
                        />
                        <div 
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            position: 'relative',
                            marginTop: '-6px'
                          }}
                        >
                          <span style={{ fontSize: '16px', width: '200px', marginBottom: '6px', lineHeight: '22px', fontWeight: '500' }}>Петров Иван Владимирович</span>
                          <span style={{ fontSize: '14px', color: greyColor2 }}>ООО Технические Системы</span>
                        </div>
                      </div>
                    </MasterDocFork.WhiteContainer>
                    <span style={{ width: '20px' }}/>
                    <MasterDocFork.WhiteContainer width={"50%"} style={{ height: '150px' }}>
                      <span style={{ fontWeight: 'bold', display: 'block', marginBottom: '20px' }}>Распределение средств</span>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          position: 'relative',
                          width: '100%'
                        }}
                      >
                        <span style={{ fontWeight: 'bold', display: 'block', width: '50%', fontSize: '20px' }}>{"200 000"}₽</span>
                        <span style={{ fontWeight: 'bold', display: 'block', width: '50%', fontSize: '20px' }}>{"50 000"}₽</span>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          position: 'relative',
                          width: '100%',
                          marginTop: '5px'
                        }}
                      >
                        <span style={{ display: 'block', width: '50%' }}>Заявитель</span>
                        <span style={{ display: 'block', width: '50%' }}>Ответчик</span>
                      </div>
                    </MasterDocFork.WhiteContainer>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginTop: '30px', marginBottom: '16px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', width: '50%', fontSize: '15px' }}>Комментарий юриста</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginBottom: '30px' }}>
                    <span style={{ lineHeight: '24px' }}>{ localText }</span>
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.ContentLine style={{ marginBottom: '48px' }}>
                    <ButtonComponent
                      inner={"Принимаю решение"} 
                      type='CONTAINED_DEFAULT' 
                      action={() => {}}
                      actionData={null}
                      widthType={'px'}
                      widthValue={200}
                      children={""}
                      childrenCss={undefined}
                      iconSrc={null}
                      iconCss={undefined}
                      muiIconSize={30}
                      MuiIconChildren={ArrowUpwardIcon}
                      css={{
                        position: 'relative',
                        boxSizing: 'border-box',
                        padding: '4px',
                        backgroundColor: chatSubmitColor,
                        width: '56px',
                        height: '43px',
                      }}
                    />
                    <ButtonComponent
                      inner={"Оспорить решение"} 
                      type='CONTAINED_DEFAULT' 
                      action={() => {}}
                      actionData={null}
                      widthType={'px'}
                      widthValue={220}
                      children={""}
                      childrenCss={undefined}
                      iconSrc={null}
                      iconCss={undefined}
                      muiIconSize={30}
                      MuiIconChildren={ArrowUpwardIcon}
                      css={{
                        position: 'relative',
                        boxSizing: 'border-box',
                        padding: '4px',
                        backgroundColor: inputBackground,
                        color: greyColor,
                        width: '56px',
                        height: '43px',
                        marginLeft: '20px'
                      }}
                    />
                  </MasterDocFork.ContentLine>
                  <MasterDocFork.Delimiter background={chatBorderColor} style={{ marginTop: '0px', marginBottom: '10px' }}/>
                  <MasterDocFork.ContentLine style={{ marginTop: '12px', marginBottom: '20px' }}>
                    <span style={{ fontWeight: 'bold', display: 'block', marginRight: '80px', fontSize: '15px' }}>Общение по карточке спора</span>
                  </MasterDocFork.ContentLine>
                  <ChatFork.ChatHeader>
                    <div style={divCSS}>
                      <ChatFork.ChatHeaderAvatar style={avatarContainerCSS}>
                        <img
                          alt={""}
                          src={defaulrAvatar}
                          style={avatarCSS}
                        />
                        <img
                          alt={""}
                          src={defaulrAvatar}
                          style={{ ...avatarCSS, marginLeft: '-14px' }}
                        />
                        <img
                          alt={""}
                          src={defaulrAvatar}
                          style={{ ...avatarCSS, marginLeft: '-14px' }}
                        />
                      </ChatFork.ChatHeaderAvatar>
                    </div>
                    <div style={divCSS}>
                      <ChatFork.ChatHeaderEnableDocs>
                        <span style={{ ...lastActiveSpanCSS, fontSize: '15px' }}>Документы</span>
                        <Switch color={"primary"} defaultChecked />
                      </ChatFork.ChatHeaderEnableDocs>
                      <InputComponent
                        type={'TEXT_INPUT_OUTLINE_SEARCH'}
                        valueType='text'
                        required={false}
                        widthType={'px'}
                        widthValue={300}
                        heightValue={'56px'}
                        label={"Поиск по сообщениям"}
                        isError={false}
                        isDisabled={false}
                        labelShrinkLeft={"0px"}
                        innerLabel={null}
                        css={{
                          fontSize: '12px',
                          position: 'relative',
                          boxSizing: 'border-box',
                          marginBottom: '8px',
                          backgroundColor: 'white'
                        }}
                      />
                    </div>
                  </ChatFork.ChatHeader>
                  <ChatFork.ChatBody
                    border={`1px solid ${chatBorderColor}`}
                    backgroundColor={chatBackground}
                    style={{ marginTop: '12px', height: 'auto' }}
                  >
                    <ChatFork.ChatBodyInner
                      border={`1px solid transparent`}
                      backgroundColor={chatBackground}
                    >
                      <ChatMessagesContainer
                        data={[
                          { 
                            date: '05.01.2022', 
                            messages: [
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:05',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:05',
                                    likes: 0  }
                                ]
                              },
                              { 
                                type: 'you', 
                                content: [
                                  { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', 
                                    time: '20:06',
                                    name: 'Виолетта',
                                    likes: 0,
                                    files: {
                                      id: 'undefined',
                                      ext: 'doc',
                                      name: 'План_Склада.doc'
                                    }},
                                ]
                              },
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:08',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'you', 
                                content: [
                                  { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:08',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'you', 
                                content: [
                                  { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'action', 
                                content: [
                                  { text: 'Ipsum nunc amet sit faucibus sed. Pellentesque aliquam fermentum eleifend tellus gravida ultricies vitae senectus et', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:10',
                                    name: 'Виолетта',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:08',
                                    likes: 0 },
                                ]
                              },
                              { 
                                type: 'me', 
                                content: [
                                  { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', 
                                    time: '20:08',
                                    likes: 0 },
                                ]
                              },
                            ]
                          }
                        ]}
                      />
                    </ChatFork.ChatBodyInner>
                    <div style={bottomDivCSS}>
                      <div style={bottomDivInnerCSS}>
                        <div style={clipDivCSS}>
                          <img
                            alt={""}
                            src={clipIcon}
                          />
                        </div>
                        <InputComponent
                          type={'TEXT_INPUT_OUTLINE'}
                          valueType='text'
                          required={false}
                          widthType={'%'}
                          widthValue={100}
                          heightValue={'50px'}
                          label={"Lorem ipsum dolor sit amet consectetur adipisicing elit"}
                          isError={false}
                          isDisabled={true}
                          labelShrinkLeft={"0px"}
                          innerLabel={null}
                          css={{
                            fontSize: '12px',
                            position: 'relative',
                            boxSizing: 'border-box',
                            marginTop: '0px',
                            backgroundColor: inputBackground,
                            marginRight: '12px'
                          }}
                        />
                        <ButtonComponent
                          inner={""} 
                          type='ICON_BUTTON_CHAT_SUBMIT' 
                          action={() => console.log('this is button')}
                          actionData={null}
                          widthType={'px'}
                          widthValue={56}
                          children={""}
                          childrenCss={undefined}
                          iconSrc={null}
                          iconCss={undefined}
                          muiIconSize={30}
                          MuiIconChildren={ArrowUpwardIcon}
                          css={{
                            position: 'relative',
                            boxSizing: 'border-box',
                            padding: '4px',
                            backgroundColor: chatSubmitColor,
                            width: '56px',
                            height: '56px',
                          }}
                        />
                      </div>
                    </div>
                  </ChatFork.ChatBody>
                </MasterDocFork.ChatContainer>
            </React.Fragment> 
            : contentType === 'EditProfileCC'

            /* ---------------------------------------- */
            /* базовое окно для редактирования профиля
            /* ---------------------------------------- */

            ? <React.Fragment>
                <EditProfileFork.Container backgroundColor={backgroundColor} style={{ paddingBottom: '28px' }}>
                  <EditProfileFork.CloseIconContainer>
                    <EditProfileFork.CloseIcon onClick={showrightContent}>
                      <img
                        alt={""} 
                        src={closeIcon}  
                      />
                    </EditProfileFork.CloseIcon>
                  </EditProfileFork.CloseIconContainer>
                  <EditProfileFork.ContentLine>
                    <div
                      style={{
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        marginRight: '44px',
                        justifyContent: 'space-around',
                        width: '150px', 
                        height: '150px',
                        backgroundColor: 'rgb(217, 231, 240)',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        cursor: 'pointer',
                      }}
                    > 
                      { avatarFile === 404 && <React.Fragment>
                        { USER_ROLE === 'EXECUTOR' &&
                          <img
                            alt={""}
                            src={
                              EXECUTOR[0].avatar === '1' ? bearAvatar :
                              EXECUTOR[0].avatar === '2' ? enotAvatar :
                              EXECUTOR[0].avatar === '3' ? foxAvatar :
                              EXECUTOR[0].avatar === '4' ? groupAvatar :
                              EXECUTOR[0].avatar === '5' ? manAvatar :
                              EXECUTOR[0].avatar === '6' ? womanAvatar : bearAvatar
                            }
                            style={
                              EXECUTOR[0].avatar === '1' ? { width: '100px', marginTop: '14px' } :
                              EXECUTOR[0].avatar === '2' ? { width: '100px', marginTop: '8px'  } :
                              EXECUTOR[0].avatar === '3' ? { width: '90px', marginTop: '10px' } :
                              EXECUTOR[0].avatar === '4' ? { width: '140px', marginTop: '44px' } :
                              EXECUTOR[0].avatar === '5' ? { width: '100px', marginTop: '40px' } :
                              EXECUTOR[0].avatar === '6' ? { width: '100px', marginTop: '40px'  } : 
                              { width: '100px', marginTop: '6px' }
                            }
                            onClick={changeAvatar}
                          /> 
                        }
                        { USER_ROLE === 'CUSTOMER' &&
                          <img
                            alt={""}
                            src={
                              CUSTOMER[0].avatar === '1' ? bearAvatar :
                              CUSTOMER[0].avatar === '2' ? enotAvatar :
                              CUSTOMER[0].avatar === '3' ? foxAvatar :
                              CUSTOMER[0].avatar === '4' ? groupAvatar :
                              CUSTOMER[0].avatar === '5' ? manAvatar :
                              CUSTOMER[0].avatar === '6' ? womanAvatar : bearAvatar
                            }
                            style={
                              CUSTOMER[0].avatar === '1' ? { width: '100px', marginTop: '14px' } :
                              CUSTOMER[0].avatar === '2' ? { width: '100px', marginTop: '8px'  } :
                              CUSTOMER[0].avatar === '3' ? { width: '90px', marginTop: '10px' } :
                              CUSTOMER[0].avatar === '4' ? { width: '140px', marginTop: '44px' } :
                              CUSTOMER[0].avatar === '5' ? { width: '100px', marginTop: '40px' } :
                              CUSTOMER[0].avatar === '6' ? { width: '100px', marginTop: '40px'  } : 
                              { width: '100px', marginTop: '6px' }
                            }
                            onClick={changeAvatar}
                          /> 
                        }
                      </React.Fragment> }
                      { avatarFile === 200 && <img
                      
                        alt={""}
                        src={`http://85.193.88.125:3000/techDocs/${USER_ID}.avatar.jpg`}
                        style={{ height: '100%' }}
                        onClick={changeAvatar}
                        
                      /> }
                    </div>
                    <span 
                      style={{
                        display: 'block',
                        position: 'absolute', 
                        color: chatSubmitColor, 
                        marginLeft: '48px',
                        marginTop: '190px',
                        cursor: 'pointer', 
                      }}
                      onClick={changeAvatar}
                    >Сменить</span>
                    <div>
                      <EditProfileFork.ContentLine>
                        <span style={{ fontWeight: 'bold', marginLeft: '20px', letterSpacing: '3px' }}>
                          { EXECUTOR.length > 0  ?
                            EXECUTOR[0].faceType : 
                            CUSTOMER.length > 0  ?
                            CUSTOMER[0].faceType : '' }
                        </span>
                      </EditProfileFork.ContentLine>
                      <EditProfileFork.ContentLine style={{ marginTop: '20px' }}>

                        { EXECUTOR.length > 0 && 
                        ( EXECUTOR[0].faceType === 'SELF_FACE' || EXECUTOR[0].faceType === 'PHIS_FACE' ) && 

                          <React.Fragment>
                            <InputComponent
                              type={'TEXT_INPUT_OUTLINE'}
                              valueType='text'
                              required={false}
                              widthType={'%'}
                              widthValue={33}
                              heightValue={'50px'}
                              label={"Фамилия"}
                              isError={false}
                              isDisabled={false}
                              labelShrinkLeft={"0px"}
                              innerLabel={null}
                              store={[ 
                                EXECUTOR.length > 0     ?
                                EXECUTOR[0].bio.surname : 
                                CUSTOMER.length > 0     ?
                                CUSTOMER[0].bio.surname : '', () => null ]}
                              css={{
                                fontSize: '12px',
                                position: 'relative',
                                boxSizing: 'border-box',
                                marginBottom: '0px',
                                marginTop: '0px',
                                backgroundColor: 'white',
                                marginRight: '20px'
                              }}
                            />
                            <InputComponent
                              type={'TEXT_INPUT_OUTLINE'}
                              valueType='text'
                              required={false}
                              widthType={'%'}
                              widthValue={33}
                              heightValue={'50px'}
                              label={"Имя"}
                              isError={false}
                              isDisabled={false}
                              labelShrinkLeft={"0px"}
                              innerLabel={null}
                              store={[ 
                                EXECUTOR.length > 0     ?
                                EXECUTOR[0].bio.name : 
                                CUSTOMER.length > 0     ?
                                CUSTOMER[0].bio.name : '', () => null ]}
                              css={{
                                fontSize: '12px',
                                position: 'relative',
                                boxSizing: 'border-box',
                                marginBottom: '0px',
                                marginTop: '0px',
                                backgroundColor: 'white',
                                marginRight: '20px'
                              }}
                            />
                            <InputComponent
                              type={'TEXT_INPUT_OUTLINE'}
                              valueType='text'
                              required={false}
                              widthType={'%'}
                              widthValue={33}
                              heightValue={'50px'}
                              label={"Отчество"}
                              isError={false}
                              isDisabled={false}
                              labelShrinkLeft={"0px"}
                              innerLabel={null}
                              store={[ 
                                EXECUTOR.length > 0     ?
                                EXECUTOR[0].bio.secondName : '', () => null ]}
                              css={{
                                fontSize: '12px',
                                position: 'relative',
                                boxSizing: 'border-box',
                                marginBottom: '0px',
                                marginTop: '0px',
                                backgroundColor: 'white'
                              }}
                            />
                          </React.Fragment> }
                        { EXECUTOR.length > 0 && 
                        ( EXECUTOR[0].faceType !== 'SELF_FACE' && EXECUTOR[0].faceType !== 'PHIS_FACE' ) && 

                          <React.Fragment>
                            <InputComponent
                              type={'TEXT_INPUT_OUTLINE'}
                              valueType='text'
                              required={false}
                              widthType={'px'}
                              widthValue={550}
                              heightValue={'50px'}
                              label={"Название организации или ИП"}
                              isError={false}
                              isDisabled={false}
                              labelShrinkLeft={"0px"}
                              innerLabel={null}
                              store={[ 
                                EXECUTOR.length > 0     ?
                                EXECUTOR[0].bio.name : 
                                CUSTOMER.length > 0     ?
                                CUSTOMER[0].bio.name : '', () => null ]}
                              css={{
                                fontSize: '12px',
                                position: 'relative',
                                boxSizing: 'border-box',
                                marginBottom: '0px',
                                marginTop: '0px',
                                backgroundColor: 'white',
                                marginRight: '20px'
                              }}
                            />
                          </React.Fragment> }

                        { CUSTOMER.length > 0 && 
                        ( CUSTOMER[0].faceType === 'SELF_FACE' || CUSTOMER[0].faceType === 'PHIS_FACE' ) && 

                          <React.Fragment>
                            <InputComponent
                              type={'TEXT_INPUT_OUTLINE'}
                              valueType='text'
                              required={false}
                              widthType={'%'}
                              widthValue={33}
                              heightValue={'50px'}
                              label={"Фамилия"}
                              isError={false}
                              isDisabled={false}
                              labelShrinkLeft={"0px"}
                              innerLabel={null}
                              store={[ 
                                EXECUTOR.length > 0     ?
                                EXECUTOR[0].bio.surname : 
                                CUSTOMER.length > 0     ?
                                CUSTOMER[0].bio.surname : '', () => null ]}
                              css={{
                                fontSize: '12px',
                                position: 'relative',
                                boxSizing: 'border-box',
                                marginBottom: '0px',
                                marginTop: '0px',
                                backgroundColor: 'white',
                                marginRight: '20px'
                              }}
                            />
                            <InputComponent
                              type={'TEXT_INPUT_OUTLINE'}
                              valueType='text'
                              required={false}
                              widthType={'%'}
                              widthValue={33}
                              heightValue={'50px'}
                              label={"Имя"}
                              isError={false}
                              isDisabled={false}
                              labelShrinkLeft={"0px"}
                              innerLabel={null}
                              store={[ 
                                EXECUTOR.length > 0     ?
                                EXECUTOR[0].bio.name : 
                                CUSTOMER.length > 0     ?
                                CUSTOMER[0].bio.name : '', () => null ]}
                              css={{
                                fontSize: '12px',
                                position: 'relative',
                                boxSizing: 'border-box',
                                marginBottom: '0px',
                                marginTop: '0px',
                                backgroundColor: 'white',
                                marginRight: '20px'
                              }}
                            />
                            <InputComponent
                              type={'TEXT_INPUT_OUTLINE'}
                              valueType='text'
                              required={false}
                              widthType={'%'}
                              widthValue={33}
                              heightValue={'50px'}
                              label={"Отчество"}
                              isError={false}
                              isDisabled={false}
                              labelShrinkLeft={"0px"}
                              innerLabel={null}
                              store={[ 
                                EXECUTOR.length > 0     ?
                                EXECUTOR[0].bio.secondName : '', () => null ]}
                              css={{
                                fontSize: '12px',
                                position: 'relative',
                                boxSizing: 'border-box',
                                marginBottom: '0px',
                                marginTop: '0px',
                                backgroundColor: 'white'
                              }}
                            />
                          </React.Fragment> }
                        { CUSTOMER.length > 0 && 
                        ( CUSTOMER[0].faceType !== 'SELF_FACE' && CUSTOMER[0].faceType !== 'PHIS_FACE' ) && 

                          <React.Fragment>
                            <InputComponent
                              type={'TEXT_INPUT_OUTLINE'}
                              valueType='text'
                              required={false}
                              widthType={'px'}
                              widthValue={550}
                              heightValue={'50px'}
                              label={"Название организации или ИП"}
                              isError={false}
                              isDisabled={false}
                              labelShrinkLeft={"0px"}
                              innerLabel={null}
                              store={[ 
                                EXECUTOR.length > 0     ?
                                EXECUTOR[0].bio.name : 
                                CUSTOMER.length > 0     ?
                                CUSTOMER[0].bio.name : '', () => null ]}
                              css={{
                                fontSize: '12px',
                                position: 'relative',
                                boxSizing: 'border-box',
                                marginBottom: '0px',
                                marginTop: '0px',
                                backgroundColor: 'white',
                                marginRight: '20px'
                              }}
                            />
                          </React.Fragment> }
                      </EditProfileFork.ContentLine>
                      <span
                        style={{
                          display: 'block',
                          position: 'relative',
                          width: '600px',
                          lineHeight: '22px',
                          backgroundColor: 'rgb(253, 237, 237)',
                          padding: '14px',
                          paddingLeft: '20px',
                          borderRadius: '4px',
                          marginTop: '16px'
                        }}
                      >{"Внимание! Некоторые функции, такие, как изменение ФИО, навыка или квалификации, вызывают ошибки в дальнейшем отображении данных. Данные фукнции скрыты до момента, когда будут решены критические вопросы"}</span>
                    </div>
                  </EditProfileFork.ContentLine>
                  <EditProfileFork.Delimiter style={{ marginTop: '50px', marginBottom: '44px' }} />
                  <EditProfileFork.ContentLine>
                    <span style={{ fontWeight: 'bold', marginLeft: '0px' }}>Специализация</span>
                  </EditProfileFork.ContentLine>
                  <EditProfileFork.ContentLine style={{ marginTop: '16px' }}>
                    <SelectField 
                      placeholder={"Выберите новую специализацию [ временно одна ]"}
                      params={{ width: 1400, mb: '0px', height: 50 }}
                      data={[
                        { value: 'Инженерно-геодезические изыскания', label: 'Геодезические изыскания' },
                        { value: 'Инженерно-геологические изыскания', label: 'Геологические изыскания' },
                        { value: 'Инженерно-гидрометеорологические изыскания', label: 'Гидрометеорология' },
                        { value: 'Инженерно-экологические изыскания', label: 'Экологические изыскания' },
                        { value: 'Историко-культурные изыскания', label: 'Исторические изыскания' },
                        { value: 'Обследование строительных конструкций', label: 'Обследование конструкций' },
                        { value: 'Генеральный план', label: 'Генеральный план' },
                        { value: 'Автомобильные дороги', label: 'Автомобильные дороги' },
                        { value: 'Архитектурные решения', label: 'Архитектурные решения' },
                        { value: 'Конструкции железобетонные', label: 'Конструкции железобетонные' },
                        { value: 'Конструкции металлические', label: 'Конструкции металлические' },
                        { value: 'Гидротехнические решения ', label: 'Гидротехнические решения' },
                        { value: 'Электроснабжение', label: 'Электроснабжение' },
                        { value: 'Электрическое освещение', label: 'Электрическое освещение' },
                        { value: 'Силовое электрооборудование', label: 'Силовое электрооборудование' },
                        { value: 'Водоснабжение и канализация', label: 'Водоснабжение и канализация' },
                        { value: 'Отопление, вентиляция, кондиционирование', label: 'Отопление и вентиляция' },
                        { value: 'Воздухоснабжение', label: 'Воздухоснабжение' },
                        { value: 'Холодоснабжение', label: 'Холодоснабжение' },
                        { value: 'Тепломеханические решения', label: 'Тепломеханические решения' },
                        { value: 'Сети связи', label: 'Сети связи' },
                        { value: 'Пожарная безопасность', label: 'Пожарная безопасность' },
                        { value: 'Газоснабжение', label: 'Газоснабжение' },
                        { value: 'Технология производства', label: 'Технология производства' },
                        { value: 'Автоматизация', label: 'Автоматизация' },
                        { value: 'Проект организации строительства / сносу / демонтажу', label: 'Проект строительства и сноса' },
                        { value: 'Охрана окружающей среды', label: 'Охрана окружающей среды' },
                        { value: 'Безопасная эксплуатация объекта', label: 'Безопасная эксплуатация объекта' },
                        { value: 'Энергетическая эффективность', label: 'Энергетическая эффективность' },
                        { value: 'Обеспечение доступа инвалидов', label: 'Обеспечение доступа инвалидов' },
                        { value: 'Мероприятия по гражданской обороне и предупреждению чрезвычайных ситуаций', label: 'Гражданская оборона' },
                        { value: 'Сметная документация', label: 'Сметная документация' },
                        { value: 'Иная документация', label: 'Иная документация' }
                      ]}
                      multy={false}
                      action={setSpec}
                      actionType={"AUTH_SPEC_TYPE"}
                      actionParams={[]}
                      showIcon={true}
                      icon={null}
                      iconStyles={{
                        marginTop: '-12px',
                        marginLeft: '6px',
                        width: '34px',
                      }}
                    />
                  </EditProfileFork.ContentLine>
                  <EditProfileFork.ContentLine style={{ marginTop: '30px' }}>
                    <span style={{ fontWeight: 'bold', marginLeft: '0px' }}>Мои навыки</span>
                  </EditProfileFork.ContentLine>
                  <EditProfileFork.ContentLine style={{ marginTop: '16px' }}>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="female" control={<Radio disabled />} label="2D" />
                      <FormControlLabel value="male" control={<Radio disabled />} label="3D" />
                      <FormControlLabel value="other" control={<Radio checked disabled />} label="BIM" />
                    </RadioGroup>
                  </EditProfileFork.ContentLine>
                  <EditProfileFork.ContentLine style={{ marginTop: '16px' }}>
                    <span style={{ fontWeight: 'bold', marginLeft: '0px' }}>Информация о себе</span>
                  </EditProfileFork.ContentLine>
                  <EditProfileFork.ContentLine style={{ marginTop: '16px' }}>
                    <InputComponent
                      type={'TEXT_INPUT_OUTLINE_ABOUT_TEXT'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={100}
                      heightValue={'50px'}
                      label={"Введите описание"}
                      isError={false}
                      isDisabled={false}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ "ABOUT_TEXT", () => null ]}
                      css={{
                        fontSize: '12px',
                        position: 'relative',
                        boxSizing: 'border-box',
                        marginBottom: '0px',
                        marginTop: '0px',
                        backgroundColor: 'white'
                      }}
                    />
                  </EditProfileFork.ContentLine>
                  <EditProfileFork.ContentLine style={{ marginTop: '23px' }}>
                    <ButtonComponent
                      inner={"Обновить информацию"} 
                      type='CONTAINED_DEFAULT' 
                      action={changeAboutText}
                      actionData={null}
                      widthType={'px'}
                      widthValue={270}
                      children={""}
                      childrenCss={undefined}
                      iconSrc={null}
                      iconCss={undefined}
                      muiIconSize={30}
                      MuiIconChildren={ArrowUpwardIcon}
                      css={{
                        position: 'relative',
                        boxSizing: 'border-box',
                        padding: '4px',
                        backgroundColor: 'rgb(217, 231, 240)',
                        color: 'black',
                        width: '56px',
                        height: '43px',
                      }}
                    />
                  </EditProfileFork.ContentLine>
                  <EditProfileFork.Delimiter style={{ marginTop: '50px', marginBottom: '42px' }} />
                  <EditProfileFork.ContentLine style={{ marginTop: '0px' }}>
                    <span style={{ fontWeight: 'bold', marginLeft: '0px' }}>Пройти проверку квалификации</span>
                  </EditProfileFork.ContentLine>
                  <EditProfileFork.ContentLine style={{ marginTop: '16px', marginBottom: '11px' }}>
                    <SelectField 
                      placeholder={"Выберите из списка"}
                      params={{ width: 420, mb: '0px', height: 50 }}
                      data={[
                        { value: '1', label: 'Загрузка списка квалификаций...' },
                      ]}
                      multy={true}
                      action={() => {}}
                      actionType={""}
                      actionParams={[]}
                      showIcon={true}
                      icon={null}
                      isDisabled
                      iconStyles={{
                        marginTop: '-12px',
                        marginLeft: '6px',
                        width: '34px',
                      }}
                    />
                  </EditProfileFork.ContentLine>
                  { Array(0)
                    .fill({ 
                      status: 'WHITE', 
                      data: { 
                        name: 'Ошибка сервера - список документов пуст..', 
                        date: 'Время загрузки не получено', 
                        statusName: 'Ожидание' 
                      }
                    }).map((item, index) => {

                    return (
                      <MasterDocFork.ContentLine key={index}>
                        <DocumentLine
                          status={item.status}
                          data={item.data}
                        />
                      </MasterDocFork.ContentLine>
                    )

                  })}
                </EditProfileFork.Container>
            </React.Fragment> 
            : contentType === 'EditProjectsCC'
            
            /* ---------------------------------------- */
            /* базовое окно для добавления портфолио
            /* ---------------------------------------- */

            ? <React.Fragment>
                <EditProjectsEducationFork.Container style={{ paddingTop: '40px', height: 'auto', minHeight: '100vh' }} backgroundColor={backgroundColor}>
                  <EditProjectsEducationFork.CloseIconContainer>
                    <EditProjectsEducationFork.CloseIcon onClick={showrightContent}>
                      <img
                        alt={""} 
                        src={closeIcon}  
                      />
                    </EditProjectsEducationFork.CloseIcon>
                  </EditProjectsEducationFork.CloseIconContainer>
                  <EditProjectsEducationFork.ContentLine style={{ justifyContent: 'space-between', marginBottom: '0px' }}>
                    <h3 style={{ fontSize: '25px', margin: 0, marginBottom: 0 }}>Добавление выполненного проекта</h3>
                  </EditProjectsEducationFork.ContentLine>
                  <EditProjectsEducationFork.ContentLine style={{ marginTop: '22px' }}>
                    <InputComponent
                      type={'TEXT_INPUT_OUTLINE_NEW_CASE'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={100}
                      heightValue={'50px'}
                      label={"Введите название проекта"}
                      isError={false}
                      isDisabled={false}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ "CASE_NAME", () => null ]}
                      css={{
                        fontSize: '12px',
                        position: 'relative',
                        boxSizing: 'border-box',
                        marginBottom: '0px',
                        marginTop: '0px',
                        backgroundColor: 'white'
                      }}
                    />
                  </EditProjectsEducationFork.ContentLine>
                  <EditProjectsEducationFork.ContentLine style={{ marginTop: '20px' }}>
                    <div style={{ display: 'block', width: '27%' }}>
                      <span style={{ color: 'rgb(81, 102, 116)' }}>Начало проекта</span>
                    </div>
                    <div style={{ display: 'block', width: '23%' }} />
                    <span style={{ display: 'block', width: '16px' }}/>
                    <div style={{ display: 'block', width: '27%' }}>
                      <span style={{ color: 'rgb(81, 102, 116)' }}>Окончание проекта</span>
                    </div>
                    <div style={{ display: 'block', width: '23%' }} />
                  </EditProjectsEducationFork.ContentLine>
                  <EditProjectsEducationFork.ContentLine style={{ marginTop: '16px' }}>
                    <div style={{ display: 'block', width: '27%', paddingRight: '16px' }}>
                      <SelectFieldPercent 
                        placeholder={"Начало проекта"}
                        params={{ width: 100, mb: '0px', height: 50 }}
                        data={[
                          { value: '1', label: 'Месяц - Январь' },
                        ]}
                        multy={false}
                        action={changeSM}
                        actionType={"NEW_CASE"}
                        actionParams={[]}
                        showIcon={true}
                        icon={null}
                        iconStyles={{
                          marginTop: '-12px',
                          marginLeft: '6px',
                          width: '34px',
                        }}
                      />
                    </div>
                    <div style={{ display: 'block', width: '23%' }}>
                      <InputComponent
                        type={'TEXT_INPUT_OUTLINE_NEW_CASE'}
                        valueType='text'
                        required={false}
                        widthType={'%'}
                        widthValue={100}
                        heightValue={'50px'}
                        label={"Введите год"}
                        isError={false}
                        isDisabled={false}
                        labelShrinkLeft={"0px"}
                        innerLabel={null}
                        store={[ "CASE_SY", () => null ]}
                        css={{
                          fontSize: '12px',
                          position: 'relative',
                          boxSizing: 'border-box',
                          marginBottom: '0px',
                          marginTop: '0px',
                          backgroundColor: 'white'
                        }}
                      />
                    </div>
                    <span style={{ display: 'block', width: '16px' }}/>
                    <div style={{ display: 'block', width: '27%', paddingRight: '16px' }}>
                      <SelectFieldPercent 
                        placeholder={"Окончание проекта"}
                        params={{ width: 100, mb: '0px', height: 50 }}
                        data={[
                          { value: '1', label: 'Месяц - Январь' },
                        ]}
                        multy={false}
                        action={changeFM}
                        actionType={"NEW_CASE"}
                        actionParams={[]}
                        showIcon={true}
                        icon={null}
                        iconStyles={{
                          marginTop: '-12px',
                          marginLeft: '6px',
                          width: '34px',
                        }}
                      />
                    </div>
                    <div style={{ display: 'block', width: '23%' }}>
                      <InputComponent
                        type={'TEXT_INPUT_OUTLINE_NEW_CASE'}
                        valueType='text'
                        required={false}
                        widthType={'%'}
                        widthValue={100}
                        heightValue={'50px'}
                        label={"Введите год"}
                        isError={false}
                        isDisabled={false}
                        labelShrinkLeft={"0px"}
                        innerLabel={null}
                        store={[ "CASE_FY", () => null ]}
                        css={{
                          fontSize: '12px',
                          position: 'relative',
                          boxSizing: 'border-box',
                          marginBottom: '0px',
                          marginTop: '0px',
                          backgroundColor: 'white'
                        }}
                      />
                    </div>
                  </EditProjectsEducationFork.ContentLine>
                  { Array(actsCounter).fill(null).map((item, index) => <EditProjectsEducationFork.ContentLine style={{ marginTop: '30px' }}>
                    <InputComponent
                      type={'TEXT_INPUT_OUTLINE_NEW_CASE'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={50}
                      heightValue={'50px'}
                      label={"Сумма оплаты по акту"}
                      isError={false}
                      isDisabled={false}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ "CASE_PAY", () => null ]}
                      css={{
                        fontSize: '12px',
                        position: 'relative',
                        boxSizing: 'border-box',
                        marginBottom: '0px',
                        marginTop: '0px',
                        backgroundColor: 'white'
                      }}
                    />
                    <span style={{ display: 'block', width: '16px' }}/>
                    <div style={{ display: 'block', width: '50%' }}/>
                    { index === actsCounter - 1 && actsCounter > 1 && <span
                      onClick={() => setActsCounter(prev => prev - 1)}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        position: 'absolute',
                        left: '50%',
                        marginLeft: '8px',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: 'rgb(217, 231, 240)',
                        marginRight: '10px',
                        cursor: 'pointer'
                      }}
                    >
                      <img
                        alt={""}
                        src={plus}
                        style={{ display: 'block', width: '14px', transform: 'rotate(45deg)' }}
                      />
                    </span> }
                  </EditProjectsEducationFork.ContentLine> )}
                  <EditProjectsEducationFork.ContentLine>
                    <div 
                      onClick={() => setActsCounter(prev => prev < 3 ? prev + 1 : prev)}
                      style={{ 
                        display: 'flex', 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        marginTop: '20px',
                        marginBottom: '20px', 
                        cursor: 'pointer'
                      }}
                    >
                      <span
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-around',
                          position: 'relative',
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: 'rgb(217, 231, 240)',
                          marginRight: '10px',
                          cursor: 'pointer',
                          filter: actsCounter < 3 ? 'grayscale(0)' : 'grayscale(1)'
                        }}
                      >
                        <img
                          alt={""}
                          src={plus}
                          style={{ display: 'block', width: '14px' }}
                        />
                      </span>
                      <span>Добавить еще один акт</span>
                    </div>
                  </EditProjectsEducationFork.ContentLine>
                  <span
                    style={{
                      display: 'block',
                      position: 'relative',
                      width: '600px',
                      lineHeight: '22px',
                      backgroundColor: 'rgb(253, 237, 237)',
                      padding: '14px',
                      paddingLeft: '20px',
                      borderRadius: '4px',
                      marginTop: '3px',
                      marginBottom: '29px'
                    }}
                  >{"Внимание! Действует временное ограничение на добавление файлов - можно добавить не более 1 одного файла, рекомендуемые форматы txt и jpg"}</span>
                  <EditProjectsEducationFork.ContentLine style={{ marginBottom: '8px' }}>
                    <span style={{ color: '#516674' }}>
                      <i style={{ fontWeight: 'bold', fontStyle: 'normal' }}>Вложения к проекту</i> ( необязательно )
                    </span>
                  </EditProjectsEducationFork.ContentLine>
                  <EditProjectsEducationFork.ContentLine>
                    <span style={{ color: '#516674', lineHeight: '22px' }}>
                      Добавьте файлы по проекту в формате .pdf или .jpg<br/>
                      Максимально 3 файла, до 100 Мб<br/>
                      Превью добавится из первого загруженного файла
                    </span>
                  </EditProjectsEducationFork.ContentLine>
                  <EditProjectsEducationFork.ContentLine style={{ marginTop: '20px' }}>
                    <ButtonComponent
                      inner={'Добавить вложение'} 
                      type='UPLOAD' 
                      action={() => {}}
                      actionData={[ newCaseFile ]}
                      widthType={'px'}
                      widthValue={280}
                      children={''}
                      childrenCss={undefined}
                      iconSrc={null}
                      iconCss={undefined}
                      muiIconSize={null}
                      MuiIconChildren={EmailIcon}
                      css={{
                        backgroundColor: 'rgb(217, 231, 240)',
                        color: 'rgb(81, 102, 116)',
                        fontSize: '12px',
                        height: '46px',
                        borderRadius: '6px',
                        position: 'relative',
                        boxSizing: 'border-box',
                      }}
                    />
                  </EditProjectsEducationFork.ContentLine>
                  { localImage && <img
                    alt={""}
                    src={localImage}
                    style={{
                      display: 'block',
                      position: 'relative',
                      width: '50%',
                      marginTop: '29px',
                      borderRadius: '6px',
                      boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
                    }}
                  /> }
                  <EditProjectsEducationFork.ContentLine style={{ marginTop: '30px', marginBottom: '8px' }}>
                    <span 
                      style={{ color: '#516674' }}>
                        <i style={{ fontWeight: 'bold', fontStyle: 'normal' }}>Вложения и превью</i> ( необязательно )
                      </span>
                  </EditProjectsEducationFork.ContentLine>
                  <EditProjectsEducationFork.ContentLine>
                    <span style={{ color: '#516674', lineHeight: '22px' }}>
                      Добавьте файлы по проекту в формате .pdf или .jpg<br/>
                      Максимально 3 файла, до 100 Мб<br/>
                      Превью добавится из первого загруженного файла
                    </span>
                  </EditProjectsEducationFork.ContentLine>
                  <EditProjectsEducationFork.ContentLine style={{ marginTop: '20px' }}>
                    <ButtonComponent
                      inner={"Добавить файлы"} 
                      type='CONTAINED_DISABLED' 
                      action={changeAboutText}
                      actionData={null}
                      widthType={'px'}
                      widthValue={280}
                      children={""}
                      childrenCss={undefined}
                      iconSrc={null}
                      iconCss={undefined}
                      muiIconSize={30}
                      MuiIconChildren={ArrowUpwardIcon}
                      css={{
                        position: 'relative',
                        boxSizing: 'border-box',
                        padding: '4px',
                        backgroundColor: 'rgb(217, 231, 240)',
                        color: 'black',
                        width: '56px',
                        height: '46px',
                      }}
                    />
                  </EditProjectsEducationFork.ContentLine>
                  <EditProjectsEducationFork.ContentLine style={{ marginTop: '28px' }}>
                    <span style={{ fontWeight: 'bold' }}>Заполните параметры объекта</span>
                  </EditProjectsEducationFork.ContentLine>
                  <EditProjectsEducationFork.ContentLine style={{ marginTop: '18px' }}>
                    <InputComponent
                      type={'TEXT_INPUT_OUTLINE_NEW_CASE'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={50}
                      heightValue={'50px'}
                      label={"Площадь, кв.м."}
                      isError={false}
                      isDisabled={false}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ "CASE_P1", () => null ]}
                      css={{
                        fontSize: '12px',
                        position: 'relative',
                        boxSizing: 'border-box',
                        marginBottom: '0px',
                        marginTop: '0px',
                        backgroundColor: 'white'
                      }}
                    />
                    <span style={{ display: 'block', width: '16px' }}/>
                    <InputComponent
                      type={'TEXT_INPUT_OUTLINE_NEW_CASE'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={50}
                      heightValue={'50px'}
                      label={"Высота объекта, м."}
                      isError={false}
                      isDisabled={false}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ "CASE_P2", () => null ]}
                      css={{
                        fontSize: '12px',
                        position: 'relative',
                        boxSizing: 'border-box',
                        marginBottom: '0px',
                        marginTop: '0px',
                        backgroundColor: 'white'
                      }}
                    />
                  </EditProjectsEducationFork.ContentLine>
                  <EditProjectsEducationFork.ContentLine style={{ marginTop: '16px' }}>
                    <InputComponent
                      type={'TEXT_INPUT_OUTLINE_NEW_CASE'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={50}
                      heightValue={'50px'}
                      label={"Площадь, кв.м."}
                      isError={false}
                      isDisabled={false}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ "CASE_P3", () => null ]}
                      css={{
                        fontSize: '12px',
                        position: 'relative',
                        boxSizing: 'border-box',
                        marginBottom: '0px',
                        marginTop: '0px',
                        backgroundColor: 'white'
                      }}
                    />
                    <span style={{ display: 'block', width: '16px' }}/>
                    <SelectFieldPercent 
                      placeholder={"Регион проекта"}
                      params={{ width: 50, mb: '0px', height: 50 }}
                      data={[
                        { value: '1', label: 'Любой произвольный город' },
                      ]}
                      multy={false}
                      action={changeCaseRegion}
                      actionType={"NEW_CASE"}
                      actionParams={[]}
                      showIcon={true}
                      icon={null}
                      iconStyles={{
                        marginTop: '-12px',
                        marginLeft: '6px',
                        width: '34px',
                      }}
                    />
                  </EditProjectsEducationFork.ContentLine>
                  <EditProjectsEducationFork.ContentLine style={{ marginTop: '26px' }}>
                    <span style={{ fontWeight: 'bold' }}>Заполните описание объекта</span>
                  </EditProjectsEducationFork.ContentLine>
                  <EditProjectsEducationFork.ContentLine style={{ marginTop: '18px' }}>
                    <InputComponent
                      type={'TEXT_INPUT_OUTLINE_NEW_CASE'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={100}
                      heightValue={'50px'}
                      label={"Подробно опишите ваши задачи и обязанности на проекте"}
                      isError={false}
                      isDisabled={false}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ "CASE_TEXT", () => null ]}
                      css={{
                        fontSize: '12px',
                        position: 'relative',
                        boxSizing: 'border-box',
                        marginBottom: '0px',
                        marginTop: '0px',
                        backgroundColor: 'white'
                      }}
                    />
                  </EditProjectsEducationFork.ContentLine>
                  <EditProjectsEducationFork.ContentLine style={{ marginTop: '16px' }}>
                    <SelectFieldPercent 
                      placeholder={"Специализации вашего проекта"}
                      params={{ width: 100, mb: '0px', height: 50 }}
                      data={[
                        { value: 'Инженерно-геодезические изыскания', label: 'Геодезические изыскания' },
                        { value: 'Инженерно-геологические изыскания', label: 'Геологические изыскания' },
                        { value: 'Инженерно-гидрометеорологические изыскания', label: 'Гидрометеорология' },
                        { value: 'Инженерно-экологические изыскания', label: 'Экологические изыскания' },
                        { value: 'Историко-культурные изыскания', label: 'Исторические изыскания' },
                        { value: 'Обследование строительных конструкций', label: 'Обследование конструкций' },
                        { value: 'Генеральный план', label: 'Генеральный план' },
                        { value: 'Автомобильные дороги', label: 'Автомобильные дороги' },
                        { value: 'Архитектурные решения', label: 'Архитектурные решения' },
                        { value: 'Конструкции железобетонные', label: 'Конструкции железобетонные' },
                        { value: 'Конструкции металлические', label: 'Конструкции металлические' },
                        { value: 'Гидротехнические решения ', label: 'Гидротехнические решения' },
                        { value: 'Электроснабжение', label: 'Электроснабжение' },
                        { value: 'Электрическое освещение', label: 'Электрическое освещение' },
                        { value: 'Силовое электрооборудование', label: 'Силовое электрооборудование' },
                        { value: 'Водоснабжение и канализация', label: 'Водоснабжение и канализация' },
                        { value: 'Отопление, вентиляция, кондиционирование', label: 'Отопление и вентиляция' },
                        { value: 'Воздухоснабжение', label: 'Воздухоснабжение' },
                        { value: 'Холодоснабжение', label: 'Холодоснабжение' },
                        { value: 'Тепломеханические решения', label: 'Тепломеханические решения' },
                        { value: 'Сети связи', label: 'Сети связи' },
                        { value: 'Пожарная безопасность', label: 'Пожарная безопасность' },
                        { value: 'Газоснабжение', label: 'Газоснабжение' },
                        { value: 'Технология производства', label: 'Технология производства' },
                        { value: 'Автоматизация', label: 'Автоматизация' },
                        { value: 'Проект организации строительства / сносу / демонтажу', label: 'Проект строительства и сноса' },
                        { value: 'Охрана окружающей среды', label: 'Охрана окружающей среды' },
                        { value: 'Безопасная эксплуатация объекта', label: 'Безопасная эксплуатация объекта' },
                        { value: 'Энергетическая эффективность', label: 'Энергетическая эффективность' },
                        { value: 'Обеспечение доступа инвалидов', label: 'Обеспечение доступа инвалидов' },
                        { value: 'Мероприятия по гражданской обороне и предупреждению чрезвычайных ситуаций', label: 'Гражданская оборона' },
                        { value: 'Сметная документация', label: 'Сметная документация' },
                        { value: 'Иная документация', label: 'Иная документация' }
                      ]}
                      multy={false}
                      action={changeCaseTags}
                      actionType={"NEW_CASE"}
                      actionParams={[]}
                      showIcon={true}
                      icon={null}
                      iconStyles={{
                        marginTop: '-12px',
                        marginLeft: '6px',
                        width: '34px',
                      }}
                    />
                  </EditProjectsEducationFork.ContentLine>
                  <EditProjectsEducationFork.ContentLine style={{ justifyContent: 'space-around', margin: '30px 0px 40px' }}>
                    <ButtonComponent
                      inner={"Сохранить новый проект"} 
                      type='CONTAINED_DEFAULT' 
                      action={sendCase}
                      actionData={null}
                      widthType={'px'}
                      widthValue={240}
                      children={""}
                      childrenCss={undefined}
                      iconSrc={null}
                      iconCss={undefined}
                      muiIconSize={30}
                      MuiIconChildren={ArrowUpwardIcon}
                      css={{
                        position: 'relative',
                        boxSizing: 'border-box',
                        padding: '4px',
                        backgroundColor: blueColor2,
                        color: 'white',
                        width: '56px',
                        height: '43px',
                      }}
                    />
                  </EditProjectsEducationFork.ContentLine>
                </EditProjectsEducationFork.Container>
              </React.Fragment>
              : contentType === 'EditEducationCC'
            
              /* ---------------------------------------- */
              /* базовое окно для добавления опыа работы
              /* ---------------------------------------- */
  
              ? <React.Fragment>
                  <EditProjectsEducationFork.Container style={{ paddingTop: '40px', height: 'auto', minHeight: '100vh' }} backgroundColor={backgroundColor}>
                    <EditProjectsEducationFork.CloseIconContainer>
                      <EditProjectsEducationFork.CloseIcon onClick={showrightContent}>
                        <img
                          alt={""} 
                          src={closeIcon}  
                        />
                      </EditProjectsEducationFork.CloseIcon>
                    </EditProjectsEducationFork.CloseIconContainer>
                    <EditProjectsEducationFork.ContentLine style={{ justifyContent: 'space-between', marginBottom: '0px' }}>
                      <h3 style={{ fontSize: '25px', margin: 0, marginBottom: 0 }}>Данные об образовании</h3>
                    </EditProjectsEducationFork.ContentLine>

                    { Array(educationCounter).fill(null).map((item, index) => <React.Fragment>  
                      <EditProjectsEducationFork.ContentLine style={{ marginTop: '22px' }}>
                        <InputComponent
                          type={'TEXT_INPUT_OUTLINE_NEW_EDUCATION_SKILLS'}
                          valueType='text'
                          required={false}
                          widthType={'%'}
                          widthValue={77}
                          heightValue={'50px'}
                          label={"Название курса или учебного заведения"}
                          isError={false}
                          isDisabled={false}
                          labelShrinkLeft={"0px"}
                          innerLabel={null}
                          store={[ "EDUCATION_BLOCK_1_TITLE", () => null ]}
                          css={{
                            fontSize: '12px',
                            position: 'relative',
                            boxSizing: 'border-box',
                            marginBottom: '0px',
                            marginTop: '0px',
                            backgroundColor: 'white'
                          }}
                        />
                        <span style={{ display: 'block', width: '16px' }}/>
                        <div style={{ display: 'block', width: '23%' }}>
                          <InputComponent
                            type={'TEXT_INPUT_OUTLINE_NEW_EDUCATION_SKILLS'}
                            valueType='text'
                            required={false}
                            widthType={'%'}
                            widthValue={100}
                            heightValue={'50px'}
                            label={"Год окончания"}
                            isError={false}
                            isDisabled={false}
                            labelShrinkLeft={"0px"}
                            innerLabel={null}
                            store={[ "EDUCATION_BLOCK_1_FINISH", () => null ]}
                            css={{
                              fontSize: '12px',
                              position: 'relative',
                              boxSizing: 'border-box',
                              marginBottom: '0px',
                              marginTop: '0px',
                              backgroundColor: 'white'
                            }}
                          />
                        </div>
                        { index === educationCounter - 1 && educationCounter > 1 && <span
                          onClick={() => setEducationCounter(prev => prev - 1)}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            position: 'absolute',
                            left: '100%',
                            marginLeft: '14px',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: 'rgb(217, 231, 240)',
                            marginRight: '10px',
                            cursor: 'pointer'
                          }}
                        >
                          <img
                            alt={""}
                            src={plus}
                            style={{ display: 'block', width: '14px', transform: 'rotate(45deg)' }}
                          />
                        </span> }
                      </EditProjectsEducationFork.ContentLine>
                      <EditProjectsEducationFork.ContentLine style={{ marginTop: '16px' }}>
                        <InputComponent
                          type={'TEXT_INPUT_OUTLINE_NEW_EDUCATION_SKILLS'}
                          valueType='text'
                          required={false}
                          widthType={'%'}
                          widthValue={100}
                          heightValue={'50px'}
                          label={"Специальность или повышение квалификации"}
                          isError={false}
                          isDisabled={false}
                          labelShrinkLeft={"0px"}
                          innerLabel={null}
                          store={[ "EDUCATION_BLOCK_1_SPECIAL", () => null ]}
                          css={{
                            fontSize: '12px',
                            position: 'relative',
                            boxSizing: 'border-box',
                            marginBottom: '0px',
                            marginTop: '0px',
                            backgroundColor: 'white'
                          }}
                        />
                      </EditProjectsEducationFork.ContentLine>
                    </React.Fragment> )}

                    <EditProjectsEducationFork.ContentLine>
                      <div 
                        onClick={() => { false && setEducationCounter(prev => prev < 3 ? prev + 1 : prev) }}
                        style={{ 
                          display: 'flex', 
                          flexDirection: 'row', 
                          alignItems: 'center', 
                          marginTop: '20px',
                          marginBottom: '20px', 
                          cursor: 'pointer'
                        }}
                      >
                        <span
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            position: 'relative',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: 'rgb(217, 231, 240)',
                            marginRight: '10px',
                            cursor: 'pointer',
                            filter: educationCounter < 3 ? 'grayscale(0)' : 'grayscale(1)'
                          }}
                        >
                          <img
                            alt={""}
                            src={plus}
                            style={{ display: 'block', width: '14px' }}
                          />
                        </span>
                        <span>Добавить место обучения ( Временно заблокированно 20.08 )</span>
                      </div>
                    </EditProjectsEducationFork.ContentLine>
                    <EditProjectsEducationFork.ContentLine style={{ justifyContent: 'space-around', margin: '19px 0px 30px' }}>
                      <ButtonComponent
                        inner={"Сохранить образование"} 
                        type='CONTAINED_DEFAULT' 
                        action={sendEducation}
                        actionData={null}
                        widthType={'px'}
                        widthValue={240}
                        children={""}
                        childrenCss={undefined}
                        iconSrc={null}
                        iconCss={undefined}
                        muiIconSize={30}
                        MuiIconChildren={ArrowUpwardIcon}
                        css={{
                          position: 'relative',
                          boxSizing: 'border-box',
                          padding: '4px',
                          backgroundColor: blueColor2,
                          color: 'white',
                          width: '56px',
                          height: '43px',
                        }}
                      />
                    </EditProjectsEducationFork.ContentLine>
                    <EditProjectsEducationFork.ContentLine style={{ justifyContent: 'space-between', marginBottom: '0px', marginTop: '8px' }}>
                      <h3 style={{ fontSize: '25px', margin: 0, marginBottom: 0 }}>Опыт работы пользователя</h3>
                    </EditProjectsEducationFork.ContentLine>

                    { Array(skillCounter).fill(null).map((item, index) => <React.Fragment>
                      
                      { index > 0 && 
                        
                        <span
                          style={{
                            display: 'block',
                            position: 'relative',
                            width: '100%',
                            textAlign: 'center',
                            marginTop: '19px',
                            opacity: 0.8
                          }}
                        >
                          Новое место работы
                        </span> 
                        
                      }

                      <EditProjectsEducationFork.ContentLine style={{ marginTop: '22px' }}>
                        <InputComponent
                          type={'TEXT_INPUT_OUTLINE_NEW_EDUCATION_SKILLS'}
                          valueType='text'
                          required={false}
                          widthType={'%'}
                          widthValue={100}
                          heightValue={'50px'}
                          label={"Название организации"}
                          isError={false}
                          isDisabled={false}
                          labelShrinkLeft={"0px"}
                          innerLabel={null}
                          store={[ "JOB_BLOCK_1_TITLE", () => null ]}
                          css={{
                            fontSize: '12px',
                            position: 'relative',
                            boxSizing: 'border-box',
                            marginBottom: '0px',
                            marginTop: '0px',
                            backgroundColor: 'white'
                          }}
                        />
                        { index === skillCounter - 1 && skillCounter > 1 && <span
                          onClick={() => setSkillCounter(prev => prev - 1)}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            position: 'absolute',
                            left: '100%',
                            marginLeft: '14px',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: 'rgb(217, 231, 240)',
                            marginRight: '10px',
                            cursor: 'pointer'
                          }}
                        >
                          <img
                            alt={""}
                            src={plus}
                            style={{ display: 'block', width: '14px', transform: 'rotate(45deg)' }}
                          />
                        </span> }
                      </EditProjectsEducationFork.ContentLine>
                      <EditProjectsEducationFork.ContentLine style={{ marginTop: '16px' }}>
                        <InputComponent
                          type={'TEXT_INPUT_OUTLINE_NEW_EDUCATION_SKILLS'}
                          valueType='text'
                          required={false}
                          widthType={'%'}
                          widthValue={100}
                          heightValue={'50px'}
                          label={"Сайт организации"}
                          isError={false}
                          isDisabled={false}
                          labelShrinkLeft={"0px"}
                          innerLabel={null}
                          store={[ "JOB_BLOCK_1_SITE", () => null ]}
                          css={{
                            fontSize: '12px',
                            position: 'relative',
                            boxSizing: 'border-box',
                            marginBottom: '0px',
                            marginTop: '0px',
                            backgroundColor: 'white'
                          }}
                        />
                      </EditProjectsEducationFork.ContentLine>
                      <EditProjectsEducationFork.ContentLine style={{ marginTop: '16px' }}>
                        <div style={{ display: 'block', width: '27%', paddingRight: '16px' }}>
                          <SelectFieldPercent 
                            placeholder={"Начало работы"}
                            params={{ width: 100, mb: '0px', height: 50 }}
                            data={[
                              { value: '1', label: 'Месяц - Январь' },
                            ]}
                            multy={false}
                            action={setSpec}
                            actionType={"AUTH_SPEC_TYPE"}
                            actionParams={[]}
                            showIcon={true}
                            icon={null}
                            iconStyles={{
                              marginTop: '-12px',
                              marginLeft: '6px',
                              width: '34px',
                            }}
                          />
                        </div>
                        <div style={{ display: 'block', width: '23%' }}>
                          <InputComponent
                            type={'TEXT_INPUT_OUTLINE_NEW_EDUCATION_SKILLS'}
                            valueType='text'
                            required={false}
                            widthType={'%'}
                            widthValue={100}
                            heightValue={'50px'}
                            label={"Введите год"}
                            isError={false}
                            isDisabled={false}
                            labelShrinkLeft={"0px"}
                            innerLabel={null}
                            store={[ "JOB_BLOCK_1_SY", () => null ]}
                            css={{
                              fontSize: '12px',
                              position: 'relative',
                              boxSizing: 'border-box',
                              marginBottom: '0px',
                              marginTop: '0px',
                              backgroundColor: 'white'
                            }}
                          />
                        </div>
                        <span style={{ display: 'block', width: '16px' }}/>
                        <div style={{ display: 'block', width: '27%', paddingRight: '16px' }}>
                          <SelectFieldPercent 
                            placeholder={"Окончание работы"}
                            params={{ width: 100, mb: '0px', height: 50 }}
                            data={[
                              { value: '1', label: 'Месяц - Январь' },
                            ]}
                            multy={false}
                            action={setSpec}
                            actionType={"AUTH_SPEC_TYPE"}
                            actionParams={[]}
                            showIcon={true}
                            icon={null}
                            iconStyles={{
                              marginTop: '-12px',
                              marginLeft: '6px',
                              width: '34px',
                            }}
                          />
                        </div>
                        <div style={{ display: 'block', width: '23%' }}>
                          <InputComponent
                            type={'TEXT_INPUT_OUTLINE_NEW_EDUCATION_SKILLS'}
                            valueType='text'
                            required={false}
                            widthType={'%'}
                            widthValue={100}
                            heightValue={'50px'}
                            label={"Введите год"}
                            isError={false}
                            isDisabled={false}
                            labelShrinkLeft={"0px"}
                            innerLabel={null}
                            store={[ "JOB_BLOCK_1_FY", () => null ]}
                            css={{
                              fontSize: '12px',
                              position: 'relative',
                              boxSizing: 'border-box',
                              marginBottom: '0px',
                              marginTop: '0px',
                              backgroundColor: 'white'
                            }}
                          />
                        </div>
                      </EditProjectsEducationFork.ContentLine>
                      <EditProjectsEducationFork.ContentLine style={{ marginTop: '6px' }}>
                        <div style={{ display: 'block', width: '27%' }} />
                        <div style={{ display: 'block', width: '23%' }} />
                        <span style={{ display: 'block', width: '16px' }}/>
                        <div style={{ display: 'block', width: '27%' }}>
                          <FormGroup style={{ width: '100%', fontSize: '13px' }}>
                            <FormControlLabel 
                              control={
                                <Checkbox 
                                  disabled
                                  checked={false} 
                                  onChange={() => {}} 
                                />
                              } 
                              label="По настоящее время"
                            />
                          </FormGroup>
                        </div>
                        <div style={{ display: 'block', width: '23%' }} />
                      </EditProjectsEducationFork.ContentLine>
                      <EditProjectsEducationFork.ContentLine style={{ marginTop: '18px' }}>
                        <InputComponent
                          type={'TEXT_INPUT_OUTLINE_NEW_EDUCATION_SKILLS'}
                          valueType='text'
                          required={false}
                          widthType={'%'}
                          widthValue={100}
                          heightValue={'50px'}
                          label={"Ваша должность в организации"}
                          isError={false}
                          isDisabled={false}
                          labelShrinkLeft={"0px"}
                          innerLabel={null}
                          store={[ "JOB_BLOCK_1_JOB", () => null ]}
                          css={{
                            fontSize: '12px',
                            position: 'relative',
                            boxSizing: 'border-box',
                            marginBottom: '0px',
                            marginTop: '0px',
                            backgroundColor: 'white'
                          }}
                        />
                      </EditProjectsEducationFork.ContentLine>
                      <EditProjectsEducationFork.ContentLine style={{ marginTop: '16px' }}>
                        <InputComponent
                          type={'TEXT_INPUT_OUTLINE_NEW_EDUCATION_SKILLS'}
                          valueType='text'
                          required={false}
                          widthType={'%'}
                          widthValue={100}
                          heightValue={'50px'}
                          label={"Опишите подробно ваши обязанности на этой должнности"}
                          isError={false}
                          isDisabled={false}
                          labelShrinkLeft={"0px"}
                          innerLabel={null}
                          store={[ "JOB_BLOCK_1_JOB_TASKS", () => null ]}
                          css={{
                            fontSize: '12px',
                            position: 'relative',
                            boxSizing: 'border-box',
                            marginBottom: '0px',
                            marginTop: '0px',
                            backgroundColor: 'white'
                          }}
                        />
                      </EditProjectsEducationFork.ContentLine>
                    </React.Fragment> )}

                    <EditProjectsEducationFork.ContentLine>
                      <div 
                        onClick={() => { false && setSkillCounter(prev => prev < 6 ? prev + 1 : prev) }}
                        style={{ 
                          display: 'flex', 
                          flexDirection: 'row', 
                          alignItems: 'center', 
                          marginTop: '20px',
                          marginBottom: '20px', 
                          cursor: 'pointer'
                        }}
                      >
                        <span
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            position: 'relative',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: 'rgb(217, 231, 240)',
                            marginRight: '10px',
                            cursor: 'pointer',
                            filter: skillCounter < 6 ? 'grayscale(0)' : 'grayscale(1)'
                          }}
                        >
                        <img
                          alt={""}
                          src={plus}
                          style={{ display: 'block', width: '14px' }}
                        />
                      </span>
                        <span>Добавить место работы ( Временно заблокированно 20.08 )</span>
                      </div>
                    </EditProjectsEducationFork.ContentLine>
                    <EditProjectsEducationFork.ContentLine style={{ justifyContent: 'space-around', margin: '19px 0px 48px' }}>
                      <ButtonComponent
                        inner={"Сохранить опыт работы"} 
                        type='CONTAINED_DEFAULT' 
                        action={sendSkill}
                        actionData={null}
                        widthType={'px'}
                        widthValue={240}
                        children={""}
                        childrenCss={undefined}
                        iconSrc={null}
                        iconCss={undefined}
                        muiIconSize={30}
                        MuiIconChildren={ArrowUpwardIcon}
                        css={{
                          position: 'relative',
                          boxSizing: 'border-box',
                          padding: '4px',
                          backgroundColor: blueColor2,
                          color: 'white',
                          width: '56px',
                          height: '43px',
                        }}
                      />
                    </EditProjectsEducationFork.ContentLine>
                    
                  </EditProjectsEducationFork.Container>
                </React.Fragment> : <React.Fragment></React.Fragment> }

        </ShadowContainerInner>
      </ShadowContainer>
    </React.Fragment>
  )

}

export default RightContentContainer