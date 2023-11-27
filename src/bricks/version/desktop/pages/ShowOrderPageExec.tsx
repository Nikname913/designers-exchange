import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { setShow, setShowType } from '../../../store/slices/fos-slice'
import { 
  setShow as setShowRCC, 
  setShowType as setShowTypeRCC } from '../../../store/slices/right-content-slice'
import { setShow as setShowFOS, setShowType as setShowTypeFOS  } from '../../../store/slices/fos-slice'
import CommunicationTable from '../views/localViews/CommunicationTable'
import ButtonComponent from '../comps/button/Button'
import InputComponent from '../comps/input/Input'
import SelectField from '../comps/select/SelectField'
import ChatMessagesContainer from '../services/chatMessagesContainer.service'
import Switch from '@mui/material/Switch'
import TaskTableHeader from '../views/localViews/TaskTableHeaderExec'
import ChapterController from '../views/localViews/СhapterControllerShow'
import cssContentArea from '../styles/views/contentArea.css'
import css from '../styles/pages/showTaskPage.css'
import chatCss from '../styles/services/rightContentContainer.css'
import EmailIcon from '@mui/icons-material/Email'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import backIcon from '../../../img/icons/back.svg'
import infoIcon from '../../../img/icons/created/info.svg'
import chatIcon from '../../../img/icons/created/chat.svg'
import docsIcon from '../../../img/icons/created/docs.svg'
import checkMark from '../../../img/icons/checkMarkColor.svg'
import timeIcon from '../../../img/icons/timeGrey.svg'
import starIcon from '../../../img/icons/star.svg'
import avatarIcon from '../../../img/stock/avatar.svg'
import clipIcon from '../../../img/icons/clip.svg'
import alarmIcon from '../../../img/icons/alarm.svg'

import txt from '../../../img/icons/files/withActionTwo/txt.svg'
import pdf from '../../../img/icons/files/withActionTwo/pdf.svg'
import doc from '../../../img/icons/files/withActionTwo/doc.svg'
import xls from '../../../img/icons/files/withActionTwo/xls.svg'
import comand from '../../../img/icons/comand.svg'

const { ContentArea, BackwardButton } = cssContentArea
const { WhiteContainer, 
  Content, 
  LeftMenuIconButton, 
  LeftMenuLine, 
  SectionsContainer,
  WhiteContainerContentLine,
  WhiteContainerTitle,
  AvatarContainer,
  AvatarStatusIndicator,
  NameContainer,
  FileIconContainer,
  FileIconTitle,
  FileIconSize,
  CommandButton } = css
const { ChatFork } = chatCss

const LinearProgressWithPercent = (props: LinearProgressProps & { value: number }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const ShowTaskPage: React.FC = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const selectTask = useAppSelector(state => state.taskContentReducer.TASKS_DATA.actualOne)
  const taskList = useAppSelector(state => state.taskContentReducer.TASKS_DATA.listOrders)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userId = useAppSelector(state => state.roleTypeReducer.roleData.userID)
  const showRCC = useAppSelector(state => state.rightContentReducer.isShow)

  const backwardButtonColor = useAppSelector(state => state.theme.grey)
  const activeLeftMenuIconColor = useAppSelector(state => state.theme.blue3)
  const leftMenuLineColor = useAppSelector(state => state.theme.blue3)
  const deactiveButtonColor = useAppSelector(state => state.theme.grey)
  const nameGreyColor = useAppSelector(state => state.theme.grey2)
  const attachColor = useAppSelector(state => state.theme.blue3)
  const downloadButtonColor = useAppSelector(state => state.theme.blue3)

  const [ progress, setProgress ] = useState<number>(10)
  const [ counter, setCounter ] = useState<number>(0)

  const [ techTaskFile, setTechTaskFile ] = useState<{ name: string, size: number, text: string, type?: string }>({

    name: '',
    size: 0,
    text: ''

  })

  const chatBorderColor = useAppSelector(state => state.theme.blue3)
  const chatBackground = useAppSelector(state => state.theme.white)
  const inputBackground = useAppSelector(state => state.theme.white)
  const chatSubmitColor = useAppSelector(state => state.theme.blue2)

  const greenColor = useAppSelector(state => state.theme.green)
  const greyColor = useAppSelector(state => state.theme.grey)
  const greyColor2 = useAppSelector(state => state.theme.grey2)

  const [ orderViewStep, setOrderViewStep ] = useState<
    'details'       | 
    'communication' | 
    'documents'     |
    'expert'        |
    'chapter'       |
    'agreement'     |
    'lawyer'        |
    'arguement'>('details')

  const headBlockCSS: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box',
    paddingRight: '120px'
  }
  const leftMenuContainerCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '280px',
    height: 'auto',
    zIndex: 20,
    backgroundColor: '#F7FAFC',
    borderRadius: '8px',
    marginBottom: '46px'
  }
  const contentContainerCSS: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    boxSizing: 'border-box',
    paddingLeft: '20px',
    height: 'auto',
    width: 'calc(100% - 280px)',
  }
  const contentContainerLineCSS: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    width: '100%',
    height: 'auto',
  }
  const buttonLabelCSS: React.CSSProperties = {
    marginLeft: '14px',
    fontWeight: 600,
    color: deactiveButtonColor
  }
  const buttonLabelDeactiveCSS: React.CSSProperties = {
    marginLeft: '14px',
    fontWeight: 600,
    color: deactiveButtonColor
  }
  const spanDelimiterCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '20px',
  }
  const rateDivCSS: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
  }
  const rateSpanCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative',
    fontSize: '40px',
    marginLeft: '5px'
  }
  const avatarCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '50px'
  }
  const searchStatusCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative',
    color: nameGreyColor,
    fontSize: '14px'
  }
  const divAttachmentsCSS: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    position: 'relative',
  }
  const fileIconCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '100%'
  }
  const comandButtonIconCSS: React.CSSProperties = {
    display: 'block',
    position: 'absolute',
    top: '50%',
    left: 0,
    height: '25px',
    marginTop: '-12.5px',
    marginLeft: '11px'
  }
  const commTitleCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative',
    fontWeight: 'bold',
    marginRight: '40px'
  }
  const divCSS: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  }
  const lastActiveSpanCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative',
    color: greyColor2,
    fontSize: '13px'
  }
  const bottomDivCSS: React.CSSProperties = {
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
  const bottomDivInnerCSS: React.CSSProperties = {
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
  const clipDivCSS: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'relative',
    width: '50px',
    height: '50px',
    marginRight: '6px'
  }
  const avatarContainerCSS: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  }
  const countSpanCSS: React.CSSProperties = {
    display: 'block',
    position: 'absolute',
    width: '36px',
    height: '24px',
    borderRadius: '10px',
    backgroundColor: chatSubmitColor,
    color: chatBackground,
    left: '100%',
    marginLeft: '-48px',
    textAlign: 'center',
    fontSize: '11px',
    lineHeight: '23px'
  }

  const inviteAction = (): void => {
    dispatch(setShowRCC('undefined'))
    dispatch(setShow(true))
    dispatch(setShowType("inviteOnTeam"))
  }
  const commandAction = (): void => {
    dispatch(setShowRCC('undefined'))
    dispatch(setShow(true))
    dispatch(setShowType("commandRoot"))
  }

  const step1 = (): void => setOrderViewStep('details')
  const step2 = (): void => setOrderViewStep('communication')
  const step3 = (): void => {
    setOrderViewStep('documents')
    dispatch(setShowRCC(true))
    dispatch(setShowTypeRCC('MDCC'))
  }

  const showChapters = (): void => {
    setOrderViewStep('chapter')
    dispatch(setShowRCC(true))
    dispatch(setShowTypeRCC('ChapterCC'))
  }

  const showExpert = (): void => {
    setOrderViewStep('expert')
    dispatch(setShowRCC(true))
    dispatch(setShowTypeRCC('ExpertCC'))
  }

  const showAgreement = (): void => {
    setOrderViewStep('agreement')
    dispatch(setShowRCC(true))
    dispatch(setShowTypeRCC('AgreementCC'))
  }

  const showLawyer = (): void => {
    setOrderViewStep('lawyer')
    dispatch(setShowRCC(true))
    dispatch(setShowTypeRCC('LawyerCC'))
  }
  
  const showArguement = (): void => {
    setOrderViewStep('arguement')
    dispatch(setShowRCC(true))
    dispatch(setShowTypeRCC('ArguementCC'))
  }

  useEffect(() => console.log(selectTask), [ selectTask ])
  useEffect(() => {

    showRCC === false && setOrderViewStep('details')

  }, [ showRCC ])
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10))
      setCounter(prev => prev + 1)
    }, 1300)
    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {

    ( async () => {

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const fileName: string = selectTask + '.techtask.pdf'

      const raw = JSON.stringify({
        "fileName": fileName
      });

      var requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const downloadFile = await fetch("http://localhost:3000/send-file-techtask", requestOptions)
        .then(response => response.blob())

      const downloadFileText: string = await downloadFile.text()
      const downloadFileSize: number = await downloadFile.size
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const downloadFileType: string = await downloadFile.type
      
      downloadFileText.indexOf('no such file or directory') === -1 && setTechTaskFile({
        name: fileName,
        size: downloadFileSize,
        text: downloadFileText,
        type: 'pdf'
      })

      downloadFileText.indexOf('no such file or directory') === -1 && console.log({
        name: fileName,
        size: downloadFileSize,
        text: downloadFileText,
        type: 'pdf'
      })

      // ----------------------------------------------------------------
      // ----------------------------------------------------------------

      const fileNameTxt: string = selectTask + '.techtask.txt'

      const rawTxt = JSON.stringify({
        "fileName": fileNameTxt
      });

      var requestOptionsTxt: any = {
        method: 'POST',
        headers: myHeaders,
        body: rawTxt,
        redirect: 'follow'
      };

      const downloadFileTxt = await fetch("http://localhost:3000/send-file-techtask", requestOptionsTxt)
        .then(response => response.blob())

      const downloadFileTextTxt: string = await downloadFileTxt.text()
      const downloadFileSizeTxt: number = await downloadFileTxt.size
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const downloadFileTypeTxt: string = await downloadFileTxt.type
      
      if ( downloadFileText.indexOf('no such file or directory') !== -1 ) {

        downloadFileTextTxt.indexOf('no such file or directory') === -1 && setTechTaskFile({
          name: fileNameTxt,
          size: downloadFileSizeTxt,
          text: downloadFileTextTxt,
          type: 'txt'
        })

      }

      downloadFileTextTxt.indexOf('no such file or directory') === -1 && console.log({
        name: fileNameTxt,
        size: downloadFileSizeTxt,
        text: downloadFileTextTxt,
        type: 'txt'
      })

    })()

  }, [ selectTask ])

  return (
    <React.Fragment>
      <ContentArea
        flexDirection={null}
        alignItems={null}
        justify={null}
      >
        <div style={{ ...headBlockCSS, justifyContent: 'flex-start', marginTop: '35px' }}>
          <img
            alt={""}
            src={backIcon}
            style={{
              display: 'block',
              position: 'relative',
              width: '10px',
              marginRight: '12px',
              marginLeft: '2px',
              cursor: 'pointer'
            }}
          />
          <BackwardButton 
            color={backwardButtonColor} 
            onClick={() => navigate('/active-orders-exec')}
          >Ко всем моим заказам</BackwardButton>
          { false && <BackwardButton 
            color={backwardButtonColor} 
            onClick={() => navigate('/create-new-task')}
            style={{ marginLeft: '20px' }}
          >Новое задание [ техническая ссылка ]</BackwardButton> }
        </div>
        { taskList.length > 0 ? taskList.filter(item => item.id === selectTask).map((item, index: number) => { return ( 
          <React.Fragment key={index}>
            <TaskTableHeader
              taskId={item.id}
              taskInitDate={item.date}
              taskTitle={item.name}
              taskDeadline={item.deadline}
              taskExpertType={item.exper}
              taskExpertDate={item.experDate}
              taskCustomer={item.customer}
              taskExecutor={item.executor}
              taskLocation={item.region}
              taskSpecializationTags={item.tags}
              taskDescription={item.description}
              dealStatus={item.status}
              cardWidth={null}
              marbo={"20px"}
              actions={[ inviteAction ]}
              actionsParams={undefined}
              deal={{
                type: item.coast.issafe === true ? 'safe' : 'simple',
                coast: item.coast.value,
                prepaid: item.coast.issafe === true ? item.coast.prepay : 0,
                expert: item.coast.issafe === true ? item.coast.exper : 0,
              }}
            />
            <WhiteContainer
              flexParams={{
                direction: 'row',
                align: 'flex-start',
                justify:'space-around'
              }}
              width={"calc(100% - 120px)"}
              height={"160px"}
              style={{ paddingLeft: '40px', paddingRight: '40px', paddingTop: '50px' }}
            >
              <ChapterController 
                isBottomButton={false}
                marginBott={"0px"}
                forPageType={'order'}
              />
            </WhiteContainer>
            <Content>
              <div style={leftMenuContainerCSS}>
                <LeftMenuIconButton 
                  backgroundColor={ 
                    orderViewStep === 'details' 
                      ? activeLeftMenuIconColor 
                      : 'transparent' 
                    } 
                  onClick={step1}
                >
                  <img
                    alt={""}
                    src={infoIcon}
                  />
                  <span style={buttonLabelCSS}>Детали заказа</span>
                </LeftMenuIconButton>
                <LeftMenuIconButton 
                  backgroundColor={ 
                    orderViewStep === 'communication' 
                      ? activeLeftMenuIconColor 
                      : 'transparent' 
                    }  
                  onClick={step2}
                >
                  <img
                    alt={""}
                    src={chatIcon}
                  />
                  <span style={buttonLabelDeactiveCSS}>Общение</span>
                  <span style={countSpanCSS}>
                    { taskList.filter(item => item.id === selectTask)[0].progress > 50 
                      ? 1 + taskList.filter(item => item.id === selectTask)[0].communication.length 
                      : 0 + taskList.filter(item => item.id === selectTask)[0].communication.length 
                    }
                  </span>
                </LeftMenuIconButton>
                <LeftMenuIconButton 
                  backgroundColor={ 
                    orderViewStep === 'documents' 
                      ? activeLeftMenuIconColor 
                      : 'transparent' 
                    } 
                  style={{ marginBottom: '40px' }}
                  onClick={step3}
                >
                  <img
                    alt={""}
                    src={docsIcon}
                  />
                  <span style={buttonLabelDeactiveCSS}>Мастер документы</span>
                </LeftMenuIconButton>
                <LeftMenuLine backgroundColor={leftMenuLineColor}/>
                <LeftMenuIconButton 
                  backgroundColor={ 
                    orderViewStep === 'agreement' 
                      ? activeLeftMenuIconColor 
                      : 'transparent' 
                    }   
                  style={{ paddingLeft: '0px', marginBottom: '0px', borderRadius: '0px' }}
                  onClick={showAgreement}
                >
                  <span style={{ ...buttonLabelDeactiveCSS, fontWeight: 500, paddingBottom: '2px' }}>Предложить доп. соглашение</span>
                </LeftMenuIconButton>
                <LeftMenuLine backgroundColor={leftMenuLineColor}/>
                <LeftMenuIconButton 
                  backgroundColor={ 
                    orderViewStep === 'lawyer' 
                      ? activeLeftMenuIconColor 
                      : 'transparent' 
                    }   
                  style={{ paddingLeft: '0px', marginBottom: '0px', borderRadius: '0px' }}
                  onClick={showLawyer}
                >
                  <span style={{ ...buttonLabelDeactiveCSS, fontWeight: 500, paddingBottom: '2px' }}>Консультация юриста</span>
                </LeftMenuIconButton>
                <LeftMenuIconButton 
                  backgroundColor={ 
                    orderViewStep === 'arguement' 
                      ? activeLeftMenuIconColor 
                      : 'transparent' 
                    }   
                  style={{ paddingLeft: '0px', marginBottom: '0px', borderRadius: '0px', height: '50px' }}
                  onClick={showArguement}
                > 
                  <img
                    alt={""}
                    src={alarmIcon}
                    style={{ width: '24px', marginLeft: '18px' }}
                  />
                  <span style={{ ...buttonLabelDeactiveCSS, fontWeight: 500, paddingBottom: '1px', marginLeft: '6px' }}>Карточка спора</span>
                </LeftMenuIconButton>
                <LeftMenuLine backgroundColor={leftMenuLineColor}/>
                <LeftMenuIconButton 
                  backgroundColor={ 
                    orderViewStep === 'expert' 
                      ? activeLeftMenuIconColor 
                      : 'transparent' 
                    }   
                  style={{ 
                    paddingLeft: '0px', 
                    flexDirection: 'column', 
                    alignItems: 'flex-start', 
                    justifyContent: 'space-around',
                    paddingTop: '40px',
                    paddingBottom: '40px',
                    height: '80px',
                    borderRadius: 0,
                    marginTop: '24px',
                    marginBottom: '24px'
                  }}
                  onClick={showExpert}
                >
                  <span style={{ ...buttonLabelDeactiveCSS, marginBottom: '10px' }}>Экспертиза</span>
                  <span style={{ ...buttonLabelDeactiveCSS, fontWeight: 500 }}>Государственная</span>
                  <span style={countSpanCSS}>
                    { taskList.filter(item => item.id === selectTask)[0].progress > 50 ? '1' : '0' }
                  </span>
                </LeftMenuIconButton>
                <LeftMenuLine backgroundColor={leftMenuLineColor}/>
                <LeftMenuIconButton 
                  backgroundColor={"transparent"} 
                  style={{ 
                    paddingLeft: '0px', 
                    marginBottom: '0px', 
                    flexDirection: 'row', 
                    alignItems: 'center',  
                    justifyContent: 'flex-start', 
                    paddingTop: '40px',
                    paddingBottom: '40px',
                    height: 'auto'
                  }}
                >
                  <span style={{ ...buttonLabelDeactiveCSS }}>Разделы</span>
                </LeftMenuIconButton>
                <SectionsContainer>
                  { taskList.length > 0 ? taskList.filter(item => item.id === selectTask).map((item, index: number) => {

                    return <React.Fragment>
                      { item.chapters && item.chapters.map((chapter, index: number) => {

                        return (
                          <React.Fragment>
                            <LeftMenuIconButton 
                              backgroundColor={"transparent"} 
                              style={{ 
                                minHeight: '64px', 
                                height: 'auto', 
                                marginBottom: '0px', 
                                padding: '18px 0px 22px',
                                lineHeight: '20px',
                              }}
                              onClick={showChapters}
                            >
                              <img
                                alt={""}
                                src={checkMark}
                              />
                              <span 
                                style={{ 
                                  ...buttonLabelDeactiveCSS, 
                                  fontWeight: 500,
                                  display: 'block',
                                  width: '88%',
                                  overflow: 'hidden'
                                }}
                              >
                                { chapter.title }
                              </span>
                            </LeftMenuIconButton>
                            { item.chapters && index < item.chapters?.length - 1 && <LeftMenuLine backgroundColor={leftMenuLineColor}/> }
                          </React.Fragment>
                        )

                      })}

                      { item.chapters && item.chapters.length === 0 && <LeftMenuIconButton backgroundColor={"transparent"} style={{ height: '64px', marginBottom: '0px', padding: '0px', paddingLeft: orderViewStep === 'chapter' ? '20px' : '0px' }}>
                        <img
                          alt={""}
                          src={timeIcon}
                        />
                        <span style={{ ...buttonLabelDeactiveCSS, fontWeight: 500 }}>Разделы не добавлены</span>
                      </LeftMenuIconButton> }
                    </React.Fragment>

                  }) : <React.Fragment></React.Fragment> }
                </SectionsContainer>
              </div>
              { orderViewStep === 'details' && <div style={contentContainerCSS}>
                <div style={contentContainerLineCSS}>
                  <WhiteContainer
                    flexParams={{
                      direction: 'column',
                      align: 'flex-start',
                      justify:'flex-start',
                    }}
                    width={"50%"}
                    height={"164px"}
                    style={{ paddingLeft: '36px', paddingRight: '36px', paddingTop: '30px' }}
                  >
                    <WhiteContainerContentLine justify={"space-between"} style={{ alignItems: 'flex-start' }}>
                      <WhiteContainerTitle>Заказчик</WhiteContainerTitle>
                      <div style={rateDivCSS}>
                        <img
                          alt={""}
                          src={starIcon}
                        />
                        <span style={rateSpanCSS}>5.00</span>
                      </div>
                    </WhiteContainerContentLine>
                    <WhiteContainerContentLine justify={"flex-start"}>
                      <AvatarContainer>
                        <img
                          alt={""}
                          src={avatarIcon}
                          style={avatarCSS}
                        />
                        <AvatarStatusIndicator background={greenColor}/>
                      </AvatarContainer>
                      <div>
                        <NameContainer>

                          { taskList.length > 0 ? taskList.filter(item => item.id === selectTask)[0].customer.slice(0, 20) + '...' : '' }

                        </NameContainer>
                        <NameContainer style={{ fontSize: '12px', color: nameGreyColor, marginTop: '5px' }}>

                          { taskList.length > 0 ? taskList.filter(item => item.id === selectTask)[0].customer.slice(0, 20) + '...' : '' }

                        </NameContainer>  
                      </div>
                    </WhiteContainerContentLine>
                  </WhiteContainer>
                  <span style={spanDelimiterCSS}></span>
                  <WhiteContainer
                    flexParams={{
                      direction: 'column',
                      align: 'flex-start',
                      justify:'flex-start',
                    }}
                    width={"50%"}
                    height={"164px"}
                    style={{ paddingLeft: '36px', paddingRight: '36px', paddingTop: '30px' }}
                  >
                    <WhiteContainerContentLine justify={"space-between"} style={{ alignItems: 'flex-start' }}>
                      <WhiteContainerTitle>
                        Исполнитель
                        <CommandButton background={downloadButtonColor} onClick={commandAction}>
                          Команда
                          <img
                            alt={""}
                            src={comand}
                            style={comandButtonIconCSS}
                          />
                        </CommandButton>
                      </WhiteContainerTitle>
                      <div style={{ ...rateDivCSS, opacity: 0 }}>
                        <img
                          alt={""}
                          src={starIcon}
                        />
                        <span style={rateSpanCSS}>5.00</span>
                      </div>
                    </WhiteContainerContentLine>
                    <WhiteContainerContentLine justify={"flex-start"}>
                      <AvatarContainer>
                        <img
                          alt={""}
                          src={avatarIcon}
                          style={avatarCSS}
                        />
                        <AvatarStatusIndicator background={greenColor}/>
                      </AvatarContainer>
                      <div>
                        <NameContainer>{ taskList.length > 0 ? taskList.filter(item => item.id === selectTask)[0].executor.slice(0, 20) + '...' : '' }</NameContainer>
                        <NameContainer style={{ fontSize: '12px', color: nameGreyColor, marginTop: '5px' }}>Самозанятый</NameContainer>
                      </div>
                    </WhiteContainerContentLine>
                  </WhiteContainer>
                </div>
                <div style={{ ...contentContainerLineCSS, marginTop: '20px' }}>
                  <WhiteContainer
                    flexParams={{
                      direction: 'column',
                      align: 'flex-start',
                      justify:'flex-start',
                    }}
                    width={"50%"}
                    height={"220px"}
                    style={{ paddingLeft: '36px', paddingRight: '36px', paddingTop: '30px' }}
                  >
                    <WhiteContainerContentLine justify={"space-between"} style={{ marginBottom: '20px' }}>
                      <WhiteContainerTitle>Объект</WhiteContainerTitle>
                    </WhiteContainerContentLine>
                    <WhiteContainerContentLine justify={"flex-start"} style={{ marginBottom: '15px' }}>
                      <span style={{ ...searchStatusCSS, width: '94px', marginRight: '20px' }}>Вид</span>
                      <span style={{ ...searchStatusCSS, color: 'inherit' }}>
                        { taskList.length === 0 ? '' : 
                          taskList.filter(item => item.id === selectTask)[0].objectData?.constructionType ? 
                          taskList.filter(item => item.id === selectTask)[0].objectData?.constructionType : 'Не указано' }
                      </span>
                    </WhiteContainerContentLine>
                    <WhiteContainerContentLine justify={"flex-start"} style={{ marginBottom: '15px' }}>
                      <span style={{ ...searchStatusCSS, width: '94px', marginRight: '20px' }}>Регион</span>
                      <span style={{ ...searchStatusCSS, color: 'inherit' }}>
                        { taskList.length === 0 ? '' : 
                          taskList.filter(item => item.id === selectTask)[0].objectData?.region ?
                          taskList.filter(item => item.id === selectTask)[0].objectData?.region : 'Не указано' }
                      </span>
                    </WhiteContainerContentLine>
                    <WhiteContainerContentLine justify={"flex-start"} style={{ marginBottom: '15px' }}>
                      <span style={{ ...searchStatusCSS, width: '94px', marginRight: '20px' }}>Тип</span>
                      <span style={{ ...searchStatusCSS, color: 'inherit' }}>
                        { taskList.length === 0 ? '' :
                          taskList.filter(item => item.id === selectTask)[0].objectData?.type ?
                          taskList.filter(item => item.id === selectTask)[0].objectData?.type : 'Не указано' }
                      </span>
                    </WhiteContainerContentLine>
                    <WhiteContainerContentLine justify={"flex-start"} style={{ marginBottom: '15px' }}>
                      <span style={{ ...searchStatusCSS, width: '94px', marginRight: '20px' }}>Назначение</span>
                      <span style={{ ...searchStatusCSS, color: 'inherit' }}>
                        { taskList.length === 0 ? '' : 
                          taskList.filter(item => item.id === selectTask)[0].objectData?.spec ?
                          taskList.filter(item => item.id === selectTask)[0].objectData?.spec : 'Не указано' }
                      </span>
                    </WhiteContainerContentLine>
                  </WhiteContainer>
                  <span style={spanDelimiterCSS}></span>
                  <WhiteContainer
                    flexParams={{
                      direction: 'column',
                      align: 'flex-start',
                      justify:'flex-start',
                    }}
                    width={"50%"}
                    height={"220px"}
                    style={{ paddingLeft: '36px', paddingRight: '36px', paddingTop: '30px' }}
                  >
                    <WhiteContainerContentLine justify={"space-between"}>
                      <WhiteContainerTitle>Параметры объекта</WhiteContainerTitle>
                    </WhiteContainerContentLine>
                    <WhiteContainerContentLine justify={"space-between"} style={{ alignItems: 'flex-end', marginTop: '20px' }}>
                      <div style={{
                        display: 'block',
                        position: 'relative',
                        width: '60%',
                      }}>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          position: 'relative',
                          marginBottom: '15px',
                        }}>
                          <span style={{ ...searchStatusCSS, width: '170px', marginRight: '20px' }}>Этажность наземная</span>
                          <span style={{ ...searchStatusCSS, color: 'inherit' }}>
                            { taskList.length > 0 ? 
                              taskList.filter(item => item.id === selectTask)[0].objectParams?.storeys : '' }
                          </span>
                        </div>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          position: 'relative',
                        }}>
                          <span style={{ ...searchStatusCSS, width: '170px', marginRight: '20px' }}>Высота объекта, м</span>
                          <span style={{ ...searchStatusCSS, color: 'inherit' }}>
                            { taskList.length > 0 ? 
                              taskList.filter(item => item.id === selectTask)[0].objectParams?.height : '' }
                          </span>
                        </div>
                      </div>
                      <div style={{
                        display: 'block',
                        position: 'relative',
                        width: '40%',
                      }}>
                        <span style={{ ...searchStatusCSS, color: 'inherit', fontSize: '40px', paddingLeft: '20px' }}>
                          { taskList.length > 0 ? 
                              taskList.filter(item => item.id === selectTask)[0].objectParams?.square : '' }
                        </span>
                        <span style={{ ...searchStatusCSS, width: '170px', marginTop: '5px', paddingLeft: '20px', boxSizing: 'border-box' }}>Площадь, кв.м</span>
                      </div>
                    </WhiteContainerContentLine>
                  </WhiteContainer>
                </div>
                <div style={{ ...contentContainerLineCSS, marginTop: '20px' }}>
                  <WhiteContainer
                    flexParams={{
                      direction: 'column',
                      align: 'flex-start',
                      justify:'flex-start',
                    }}
                    width={"100%"}
                    height={"250px"}
                    style={{ paddingLeft: '36px', paddingRight: '36px', paddingTop: '30px' }}
                  >
                    <WhiteContainerContentLine justify={"space-between"}>
                      <WhiteContainerTitle>Описание</WhiteContainerTitle>
                    </WhiteContainerContentLine>
                    <WhiteContainerContentLine justify={"space-between"}>
                      <span style={{ ...searchStatusCSS, color: 'inherit', marginTop: '20px', lineHeight: '22px' }}>
                        { taskList.length > 0 ? 
                          taskList.filter(item => item.id === selectTask)[0].description : '' }
                      </span>
                    </WhiteContainerContentLine>
                  </WhiteContainer>
                </div>
                <div style={{ ...contentContainerLineCSS, marginTop: '20px', marginBottom: '124px' }}>
                  <WhiteContainer
                    flexParams={{
                      direction: 'row',
                      align: 'flex-start',
                      justify:'flex-start',
                    }}
                    width={"100%"}
                    height={"auto"}
                    style={{ paddingLeft: '36px', paddingRight: '36px', paddingTop: '30px', flexWrap: 'wrap' }}
                  > 
                    <div style={{ ...divAttachmentsCSS, width: '70%' }}>
                      <WhiteContainerContentLine justify={"space-between"}>
                        <WhiteContainerTitle>Файлы вложения</WhiteContainerTitle>
                      </WhiteContainerContentLine>

                      {/* ---------------------------------------------------- */}
                      {/* заглушка на время нестабильной работы апи */}
                      {/* ---------------------------------------------------- */}

                        <Box sx={{ width: '100%', marginTop: '30px' }}>
                          <LinearProgressWithPercent style={{ borderRadius: '4px' }} value={progress}/>
                        </Box>
                        { counter > 4 && <span 
                          style={{ 
                            color: 'gray', 
                            width: '100%', 
                            lineHeight: '24px',
                            marginTop: '9px',
                            cursor: 'pointer'
                          }}
                          onClick={() => navigate('/task-list-cust')}
                        >
                          {"Загрузка занимает больше времени.."}
                        </span> }

                      {/* ---------------------------------------------------- */}
                      {/* заглушка на время нестабильной работы апи */}
                      {/* ---------------------------------------------------- */}

                      { false && <WhiteContainerContentLine 
                        justify={"space-between"} 
                        style={{ 
                          marginTop: '30px', 
                          borderRight: `1px solid ${attachColor}`,
                          paddingRight: '30px' 
                        }}
                      >
                        <FileIconContainer>
                          <img
                            alt={""}
                            src={pdf}
                            style={fileIconCSS}
                          />
                          <FileIconTitle color={greyColor}>{"План-Склада"}</FileIconTitle>
                          <FileIconSize color={greyColor2}>{"220 Kb"}</FileIconSize>
                        </FileIconContainer>
                        <FileIconContainer>
                          <img
                            alt={""}
                            src={pdf}
                            style={fileIconCSS}
                          />
                          <FileIconTitle color={greyColor}>{"План-Склада"}</FileIconTitle>
                          <FileIconSize color={greyColor2}>{"220 Kb"}</FileIconSize>
                        </FileIconContainer>
                        <FileIconContainer>
                          <img
                            alt={""}
                            src={doc}
                            style={fileIconCSS}
                          />
                          <FileIconTitle color={greyColor}>{"План-Склада"}</FileIconTitle>
                          <FileIconSize color={greyColor2}>{"220 Kb"}</FileIconSize>
                        </FileIconContainer>
                        <FileIconContainer>
                          <img
                            alt={""}
                            src={xls}
                            style={fileIconCSS}
                          />
                          <FileIconTitle color={greyColor}>{"План-Склада"}</FileIconTitle>
                          <FileIconSize color={greyColor2}>{"220 Kb"}</FileIconSize>
                        </FileIconContainer>
                        <FileIconContainer>
                          <img
                            alt={""}
                            src={xls}
                            style={fileIconCSS}
                          />
                          <FileIconTitle color={greyColor}>{"План-Склада"}</FileIconTitle>
                          <FileIconSize color={greyColor2}>{"220 Kb"}</FileIconSize>
                        </FileIconContainer>
                      </WhiteContainerContentLine> }
                    </div>
                    <div style={{ ...divAttachmentsCSS, width: '30%' }}>
                      { techTaskFile.size > 0 && <React.Fragment>
                        <WhiteContainerContentLine justify={"space-between"}>
                          <WhiteContainerTitle style={{ paddingLeft: '26px' }}>Техническое задание</WhiteContainerTitle>
                        </WhiteContainerContentLine>
                        <WhiteContainerContentLine justify={"space-around"} style={{ marginTop: '20px' }}>
                          <FileIconContainer style={{ width: '80%', alignItems: 'flex-start', paddingLeft: '60px', boxSizing: 'border-box' }}>
                            <img
                              alt={""}
                              src={ techTaskFile.type === 'txt' ? txt : pdf }
                              style={{ ...fileIconCSS, width: '70%' }}
                              onClick={() => {
                                dispatch(setShowFOS(true))
                                dispatch(setShowTypeFOS('showFile'))
                                dispatch(setShowRCC('undefined'))
                              }}
                            />
                            <FileIconTitle color={greyColor} style={{ lineHeight: '18px' }}>{ techTaskFile.name }</FileIconTitle>
                            <FileIconSize color={greyColor2}>{ techTaskFile.size + ' байт' }</FileIconSize>
                          </FileIconContainer>
                        </WhiteContainerContentLine>
                      </React.Fragment> }
                    </div>
                    <div style={{ ...divAttachmentsCSS, width: '100%' }}>
                    <ButtonComponent
                      inner={"Скачать архивом"} 
                      type="CONTAINED_DEFAULT"
                      action={() => {}}
                      actionData={null}
                      widthType={"px"}
                      widthValue={184}
                      children={""}
                      childrenCss={{}}
                      iconSrc={null}
                      iconCss={undefined}
                      muiIconSize={null}
                      MuiIconChildren={EmailIcon}
                      css={{
                        backgroundColor: downloadButtonColor,
                        color: greyColor,
                        fontSize: '12px',
                        height: '40px',
                        borderRadius: '6px',
                        position: 'relative',
                        boxSizing: 'border-box',
                        marginTop: '22px',
                        marginBottom: '6px',
                        boxShadow: 'none'
                      }}
                    />
                    </div>
                  </WhiteContainer>
                </div>
              </div> }
              { orderViewStep === 'communication' && <div style={contentContainerCSS}>
                <div style={contentContainerLineCSS}>
                  <WhiteContainer
                    flexParams={{
                      direction: 'column',
                      align: 'flex-start',
                      justify:'flex-start',
                    }}
                    width={"100%"}
                    height={""}
                    style={{ paddingLeft: '60px', paddingRight: '60px', paddingTop: '30px' }}
                  >
                    <WhiteContainerContentLine justify={"flex-start"}>
                      <span style={commTitleCSS}>Выберите действие</span>
                      <SelectField 
                        placeholder={"Действие"}
                        params={{ width: 300, height: 50 }}
                        data={[
                          { value: '1', label: 'Прервать заказ' },
                          { value: '2', label: 'Пожаловаться' },
                          { value: '3', label: 'Покинуть заказ' },
                          { value: '4', label: 'Покинуть раздел' },
                        ]}
                        isDisabled
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
                    </WhiteContainerContentLine>
                    <WhiteContainerContentLine justify={"flex-start"} style={{ marginTop: '20px', marginBottom: '10px' }}>
                      { taskList.filter(item => item.id === selectTask)[0].progress > 50 && <CommunicationTable
                        content={"Исполнитель сдает проект на проверку"}
                        status={"wait"}
                        oneButtonParams={{
                          isset: false,
                          color: 'white',
                          background: 'blue2',
                          inner: 'Принять',
                          width: 180,
                        }}
                        twoButtonParams={{
                          isset: false,
                          color: 'grey',
                          background: 'white',
                          inner: 'Доработка',
                          width: 180,
                        }}
                        threeButtonParams={{
                          isset: true,
                          color: 'grey',
                          background: 'white',
                          inner: 'SAVE_COMPLETE',
                          width: 180,
                        }}
                        image={"subs"}
                        imageMt={4}
                      /> }
                    </WhiteContainerContentLine>
                    { taskList.filter(item => item.id === selectTask)[0].progress < 50 && <WhiteContainerContentLine justify={"flex-start"} style={{ marginBottom: '10px' }}>
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
                      />
                    </WhiteContainerContentLine> }
                    { taskList.filter(item => item.id === selectTask)[0].communication.map(item => {

                      return (
                        <React.Fragment>
                          <CommunicationTable
                          content={item.message}
                            status={"correct"}
                            oneButtonParams={{
                              isset: true,
                              color: 'white',
                              background: 'blue2',
                              inner: 'Попозже кнопка',
                              width: 220,
                            }}
                            twoButtonParams={{
                              isset: true,
                              color: 'grey',
                              background: 'white',
                              inner: 'Попозже кнопка',
                              width: 220,
                            }}
                            image={"pror"}
                            mb={"10px"}
                            imageMt={1}
                          />
                        </React.Fragment>
                      )

                    })}
                    { false && <WhiteContainerContentLine justify={"flex-start"} style={{ marginBottom: '10px' }}>
                      <CommunicationTable
                        status={"correct"}
                        oneButtonParams={{
                          isset: false,
                          color: 'white',
                          background: 'blue2',
                          inner: 'В мастер-документы',
                          width: 220,
                        }}
                        twoButtonParams={{
                          isset: true,
                          color: 'grey',
                          background: 'white',
                          inner: 'Понятно',
                          width: 120,
                        }}
                        image={"pdf"}
                      />
                    </WhiteContainerContentLine> }
                    { false && <WhiteContainerContentLine justify={"flex-start"} style={{ marginBottom: '10px' }}>
                      <CommunicationTable
                        status={"wait"}
                        oneButtonParams={{
                          isset: true,
                          color: 'white',
                          background: 'blue2',
                          inner: 'Принять и продолжить',
                          width: 230,
                        }}
                        twoButtonParams={{
                          isset: true,
                          color: 'grey',
                          background: 'white',
                          inner: 'Отправить в доработку',
                          width: 230,
                        }}
                        image={"subs"}
                        imageMt={3}
                      />
                    </WhiteContainerContentLine> }
                    { false && <WhiteContainerContentLine justify={"flex-start"} style={{ marginBottom: '10px' }}>
                      <CommunicationTable
                        status={"correct"}
                        oneButtonParams={{
                          isset: false,
                          color: 'white',
                          background: 'blue2',
                          inner: 'В мастер-документы',
                          width: 220,
                        }}
                        twoButtonParams={{
                          isset: true,
                          color: 'grey',
                          background: 'white',
                          inner: 'Понятно',
                          width: 120,
                        }}
                        image={"subs"}
                        imageMt={3}
                      />
                    </WhiteContainerContentLine> }
                    { false && <WhiteContainerContentLine justify={"flex-start"} style={{ marginBottom: '10px' }}>
                      <CommunicationTable
                        status={"alarm"}
                        oneButtonParams={{
                          isset: true,
                          color: 'white',
                          background: 'blue2',
                          inner: 'Открыть карточку спора',
                          width: 244,
                        }}
                        twoButtonParams={{
                          isset: false,
                          color: 'grey',
                          background: 'white',
                          inner: 'Отправить в доработку',
                          width: 230,
                        }}
                        image={"humm"}
                        imageMt={-4}
                      />
                    </WhiteContainerContentLine> }
                  </WhiteContainer>
                </div>
                <div style={{ ...contentContainerLineCSS, marginTop: '20px', marginBottom: '20px' }}>
                  <WhiteContainer
                    flexParams={{
                      direction: 'column',
                      align: 'flex-start',
                      justify:'flex-start',
                    }}
                    width={"100%"}
                    height={""}
                    style={{ paddingLeft: '40px', paddingRight: '40px', paddingTop: '20px' }}
                  >
                    <ChatFork.ChatHeader>
                      <div style={divCSS}>
                        <ChatFork.ChatHeaderAvatar style={avatarContainerCSS}>
                          <img
                            alt={""}
                            src={avatarIcon}
                            style={avatarCSS}
                          />
                          <img
                            alt={""}
                            src={avatarIcon}
                            style={{ ...avatarCSS, marginLeft: '-14px' }}
                          />
                          <img
                            alt={""}
                            src={avatarIcon}
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
                  </WhiteContainer>
                </div>
              </div> }
            </Content>
          </React.Fragment> )}) : <React.Fragment></React.Fragment> }
      </ContentArea> 
    </React.Fragment>
  )

}

export default ShowTaskPage