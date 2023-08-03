import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { setShow, setShowType } from '../../../store/slices/fos-slice'
import { setShow as setShowRCC, setShowType as setShowTypeRCC } from '../../../store/slices/right-content-slice'
import { setShow as setShowFOS, setShowType as setShowTypeFOS  } from '../../../store/slices/fos-slice'
import ButtonComponent from '../comps/button/Button'
import TaskTableHeader from '../views/localViews/TaskTableHeader'
import ChapterController from '../views/localViews/СhapterControllerShow'
import cssContentArea from '../styles/views/contentArea.css'
import css from '../styles/pages/showTaskPage.css'
import EmailIcon from '@mui/icons-material/Email'
import Stack from '@mui/material/Stack'
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

import txt from '../../../img/icons/files/withActionTwo/txt.svg'
import pdf from '../../../img/icons/files/withActionTwo/pdf.svg'
import doc from '../../../img/icons/files/withActionTwo/doc.svg'
import xls from '../../../img/icons/files/withActionTwo/xls.svg'

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
  SearchStatusIndicator,
  FileIconContainer,
  FileIconTitle,
  FileIconSize } = css

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

  const selectTask = useAppSelector(state => state.taskContentReducer.TASKS_DATA.showOne)
  const taskList = useAppSelector(state => state.taskContentReducer.TASKS_DATA.list)

  const backwardButtonColor = useAppSelector(state => state.theme.grey)
  const activeLeftMenuIconColor = useAppSelector(state => state.theme.blue3)
  const leftMenuLineColor = useAppSelector(state => state.theme.blue3)
  const deactiveButtonColor = useAppSelector(state => state.theme.grey)
  const nameGreyColor = useAppSelector(state => state.theme.grey2)
  const attachColor = useAppSelector(state => state.theme.blue3)
  const downloadButtonColor = useAppSelector(state => state.theme.blue3)

  const yellowColor = useAppSelector(state => state.theme.yellow)
  const greyColor = useAppSelector(state => state.theme.grey)
  const greyColor2 = useAppSelector(state => state.theme.grey2)

  const [ ,setOrderViewStep ] = useState<
    'details'       | 
    'communication' | 
    'documents'     |
    'expert'        |
    'chapter'       |
    'agreement'     |
    'lawyer'        |
    'arguement'>('details')

  const [ progress, setProgress ] = useState<number>(10)
  const [ counter, setCounter ] = useState<number>(0)

  const [ techTaskFile, setTechTaskFile ] = useState<{ name: string, size: number, text: string }>({

    name: '',
    size: 0,
    text: ''

  })

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
    fontWeight: 600
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

  const respondAction = (): void => {
    dispatch(setShowRCC('undefined'))
    dispatch(setShow(true))
    dispatch(setShowType("respondFromTask"))
  }

  const showChapters = (): void => {
    setOrderViewStep('chapter')
    dispatch(setShowRCC(true))
    dispatch(setShowTypeRCC('ChapterCC'))
  }

  useEffect(() => console.log(selectTask), [ selectTask ])
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

      const fileName: string = selectTask.split('NTID-')[1] + '.techtask.txt'

      const raw = JSON.stringify({
        "fileName": fileName
      });

      var requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const downloadFile = await fetch("http://85.193.88.125:3000/send-file-techtask", requestOptions)
        .then(response => response.blob())

      const downloadFileText: string = await downloadFile.text()
      const downloadFileSize: number = await downloadFile.size

      setTechTaskFile({
        name: fileName,
        size: downloadFileSize,
        text: downloadFileText
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
            onClick={() => navigate('/task-list-cust')}
          >Ко всем моим заданиям</BackwardButton>
          { false && <BackwardButton 
            color={backwardButtonColor} 
            onClick={() => navigate('/create-new-task')}
            style={{ marginLeft: '20px' }}
          >Новое задание [ техническая ссылка ]</BackwardButton> }
        </div>
        { taskList.length > 0 ? taskList.filter(item => item.id === selectTask).map((item, index: number) => { 

          return ( 
            <React.Fragment key={index}>
              <TaskTableHeader
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
                actions={[ respondAction ]}
                actionsParams={[ item.id, item.responds ]}
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
                />
              </WhiteContainer>
              <Content>
                <div style={leftMenuContainerCSS}>
                  <LeftMenuIconButton backgroundColor={activeLeftMenuIconColor}>
                    <img
                      alt={""}
                      src={infoIcon}
                    />
                    <span style={buttonLabelCSS}>Детали заказа</span>
                  </LeftMenuIconButton>
                  <LeftMenuIconButton backgroundColor={"transparent"} style={{ filter: 'grayscale(0.8)' }}>
                    <img
                      alt={""}
                      src={chatIcon}
                    />
                    <span style={buttonLabelDeactiveCSS}>Общение</span>
                  </LeftMenuIconButton>
                  <LeftMenuIconButton backgroundColor={"transparent"} style={{ marginBottom: '40px', filter: 'grayscale(0.8)' }}>
                    <img
                      alt={""}
                      src={docsIcon}
                    />
                    <span style={buttonLabelDeactiveCSS}>Мастер документы</span>
                  </LeftMenuIconButton>
                  <LeftMenuLine backgroundColor={leftMenuLineColor}/>
                  { false && <LeftMenuIconButton backgroundColor={"transparent"} style={{ paddingLeft: '0px', marginBottom: '0px' }}>
                    <span style={{ ...buttonLabelDeactiveCSS, fontWeight: 500, paddingBottom: '2px' }}>Предложить доп. соглашение</span>
                  </LeftMenuIconButton> }
                  { false && <LeftMenuLine backgroundColor={leftMenuLineColor}/> }
                  { false && <LeftMenuIconButton backgroundColor={"transparent"} style={{ paddingLeft: '0px', marginBottom: '0px' }}>
                    <span style={{ ...buttonLabelDeactiveCSS, fontWeight: 500, paddingBottom: '2px' }}>Консультация юриста</span>
                  </LeftMenuIconButton> }
                  { false && <LeftMenuLine backgroundColor={leftMenuLineColor}/> }
                  <LeftMenuIconButton 
                    backgroundColor={"transparent"} 
                    style={{ 
                      paddingLeft: '0px', 
                      marginBottom: '0px', 
                      flexDirection: 'column', 
                      alignItems: 'flex-start', 
                      justifyContent: 'space-around',
                      paddingTop: '40px',
                      paddingBottom: '40px',
                      height: 'auto'
                    }}
                  >
                    <span style={{ ...buttonLabelDeactiveCSS, marginBottom: '10px' }}>Экспертиза</span>
                    <span style={{ ...buttonLabelDeactiveCSS, fontWeight: 500 }}>негосударственная</span>
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

                        { item.chapters && item.chapters.length === 0 && <LeftMenuIconButton backgroundColor={"transparent"} style={{ height: '64px', marginBottom: '0px', padding: '0px' }}>
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
                <div style={contentContainerCSS}>
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
                          <span style={rateSpanCSS}>0.00</span>
                        </div>
                      </WhiteContainerContentLine>
                      <WhiteContainerContentLine justify={"flex-start"}>
                        <AvatarContainer>
                          <img
                            alt={""}
                            src={avatarIcon}
                            style={avatarCSS}
                          />
                          <AvatarStatusIndicator background={yellowColor}/>
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
                      <WhiteContainerContentLine justify={"space-between"}>
                        <WhiteContainerTitle>Исполнитель</WhiteContainerTitle>
                      </WhiteContainerContentLine>
                      <WhiteContainerContentLine justify={"flex-start"} style={{ marginTop: '20px' }}>
                        <SearchStatusIndicator background={yellowColor}/>
                        <span style={searchStatusCSS}>Поиск исполнителей</span>
                      </WhiteContainerContentLine>
                      <WhiteContainerContentLine justify={"flex-start"} style={{ marginTop: '18px' }}>
                        <ButtonComponent
                          inner={ taskList.length > 0 ? 
                            taskList.filter(item => item.id === selectTask)[0].responds.length
                              .toString() + ' откликов' : '' } 
                          type="CONTAINED_DEFAULT"
                          action={() => {}}
                          actionData={null}
                          widthType={"px"}
                          widthValue={130}
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
                            boxShadow: 'none'
                          }}
                        />
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
                          width: '50%',
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
                          width: '50%',
                        }}>
                          <span style={{ ...searchStatusCSS, color: 'inherit', fontSize: '40px', paddingLeft: '20px' }}>
                            { taskList.length > 0 ? 
                              taskList.filter(item => item.id === selectTask)[0].objectParams?.square : '' }
                          </span>
                          <span style={{ ...searchStatusCSS, width: '170px', marginTop: '5px', paddingLeft: '20px', boxSizing: 'border-box' }}>Общая площадь, кв.м</span>
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

                          <Box sx={{ width: '90%', marginTop: '30px' }}>
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
                                src={txt}
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
                        type="CONTAINED_DISABLED"
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
                </div>
              </Content>
            </React.Fragment> )}) : <React.Fragment></React.Fragment> }
            { taskList.length > 0 && taskList.filter(item => item.id === selectTask).length === 0 && <React.Fragment>
              <Content style={{ flexDirection: 'column', alignItems: 'center'}}>
                <span 
                  style={{ 
                    color: 'gray', 
                    width: '100%', 
                    textAlign: 'center', 
                    lineHeight: '24px',
                    marginTop: '40px',
                    cursor: 'pointer'
                  }}
                  onClick={() => navigate('/task-list-cust')}
                >
                  {"Задание успешно снято, нажмите для возврата к списку заданий"}
                </span>
                <Stack
                  spacing={2} 
                  sx={{ 
                    width: '100%', 
                    color: 'rgb(22, 124, 191)', 
                    borderRadius: '4px',
                    marginTop: '30px',
                    marginBottom: '80px' 
                  }} >
                  <LinearProgress style={{ borderRadius: '4px' }} color="inherit" />
                </Stack>
              </Content>
            </React.Fragment> }
      </ContentArea> 
    </React.Fragment>
  )

}

export default ShowTaskPage