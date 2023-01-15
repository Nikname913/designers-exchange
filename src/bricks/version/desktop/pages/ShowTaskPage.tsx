import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../store/hooks'
import TaskTableHeader from '../views/localViews/TaskTableHeader'
import ChapterController from '../views/localViews/СhapterControllerShow'
import cssContentArea from '../styles/views/contentArea.css'
import css from '../styles/pages/showTaskPage.css'
import backIcon from '../../../img/icons/back.svg'
import infoIcon from '../../../img/icons/created/info.svg'
import chatIcon from '../../../img/icons/created/chat.svg'
import docsIcon from '../../../img/icons/created/docs.svg'
import checkMark from '../../../img/icons/checkMarkColor.svg'
import timeIcon from '../../../img/icons/timeGrey.svg'

const { ContentArea, BackwardButton } = cssContentArea
const { WhiteContainer, Content, LeftMenuIconButton, LeftMenuLine, SectionsContainer } = css

const ShowTaskPage: React.FC = () => {

  const navigate = useNavigate()

  const backwardButtonColor = useAppSelector(state => state.theme.grey)
  const activeLeftMenuIconColor = useAppSelector(state => state.theme.blue3)
  const leftMenuLineColor = useAppSelector(state => state.theme.blue3)
  const deactiveButtonColor = useAppSelector(state => state.theme.grey)

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
            onClick={() => navigate('/birzha')}
          >Ко всем заданиям</BackwardButton>
          <BackwardButton 
            color={backwardButtonColor} 
            onClick={() => navigate('/novoe-zadanie')}
            style={{ marginLeft: '20px' }}
          >Новое задание [ техническая ссылка ]</BackwardButton>
        </div>
        <TaskTableHeader
          taskInitDate={"Позавчера в 18:33"}
          taskTitle={"Конструктивные решения"}
          taskDeadline={"18.11.2022-28.11.2022"}
          taskExpertType={"государственная"}
          taskCustomer={"ООО \"Технические Системы\""}
          taskExecutor={"ИП Макаров А.Ю."}
          taskLocation={"Екатеринбург"}
          taskSpecializationTags={["Сигнализация","Вентиляция","Пожарная безопасность"]}
          taskDescription={"lorem ipsum dolor sit amet, consectetur adipiscing"}
          dealStatus={"searching"}
          cardWidth={null}
          marbo={"20px"}
          deal={{
            type: 'safe',
            prepaid: 30000,
            expert: 84000
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
            <LeftMenuIconButton backgroundColor={"transparent"}>
              <img
                alt={""}
                src={chatIcon}
              />
              <span style={buttonLabelDeactiveCSS}>Общение</span>
            </LeftMenuIconButton>
            <LeftMenuIconButton backgroundColor={"transparent"} style={{ marginBottom: '40px' }}>
              <img
                alt={""}
                src={docsIcon}
              />
              <span style={buttonLabelDeactiveCSS}>Мастер документы</span>
            </LeftMenuIconButton>
            <LeftMenuLine backgroundColor={leftMenuLineColor}/>
            <LeftMenuIconButton backgroundColor={"transparent"} style={{ paddingLeft: '0px', marginBottom: '0px' }}>
              <span style={{ ...buttonLabelDeactiveCSS, fontWeight: 500, paddingBottom: '2px' }}>Предложить доп. соглашение</span>
            </LeftMenuIconButton>
            <LeftMenuLine backgroundColor={leftMenuLineColor}/>
            <LeftMenuIconButton backgroundColor={"transparent"} style={{ paddingLeft: '0px', marginBottom: '0px' }}>
              <span style={{ ...buttonLabelDeactiveCSS, fontWeight: 500, paddingBottom: '2px' }}>Консультация юриста</span>
            </LeftMenuIconButton>
            <LeftMenuLine backgroundColor={leftMenuLineColor}/>
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
              <LeftMenuIconButton backgroundColor={"transparent"} style={{ height: '64px', marginBottom: '0px', padding: '0px' }}>
                <img
                  alt={""}
                  src={checkMark}
                />
                <span style={{ ...buttonLabelDeactiveCSS, fontWeight: 500 }}>Пожарная безопасность</span>
              </LeftMenuIconButton>
              <LeftMenuLine backgroundColor={leftMenuLineColor}/>
              <LeftMenuIconButton backgroundColor={"transparent"} style={{ height: '64px', marginBottom: '0px', padding: '0px' }}>
                <img
                  alt={""}
                  src={timeIcon}
                />
                <span style={{ ...buttonLabelDeactiveCSS, fontWeight: 500 }}>Вентиляция</span>
              </LeftMenuIconButton>
              <LeftMenuLine backgroundColor={leftMenuLineColor}/>
              <LeftMenuIconButton backgroundColor={"transparent"} style={{ height: '64px', marginBottom: '0px', padding: '0px' }}>
                <img
                  alt={""}
                  src={timeIcon}
                />
                <span style={{ ...buttonLabelDeactiveCSS, fontWeight: 500 }}>Сигнализация</span>
              </LeftMenuIconButton>
            </SectionsContainer>
          </div>
          <div style={contentContainerCSS}>
            <div style={contentContainerLineCSS}>
              <WhiteContainer
                flexParams={{
                  direction: 'row',
                  align: 'flex-start',
                  justify:'space-around'
                }}
                width={"50%"}
                height={"164px"}
                style={{ paddingLeft: '40px', paddingRight: '40px', paddingTop: '34px' }}
              ></WhiteContainer>
              <span style={spanDelimiterCSS}></span>
              <WhiteContainer
                flexParams={{
                  direction: 'row',
                  align: 'flex-start',
                  justify:'space-around'
                }}
                width={"50%"}
                height={"164px"}
                style={{ paddingLeft: '40px', paddingRight: '40px', paddingTop: '34px' }}
              ></WhiteContainer>
            </div>
            <div style={{ ...contentContainerLineCSS, marginTop: '20px' }}>
              <WhiteContainer
                flexParams={{
                  direction: 'row',
                  align: 'flex-start',
                  justify:'space-around'
                }}
                width={"50%"}
                height={"220px"}
                style={{ paddingLeft: '40px', paddingRight: '40px', paddingTop: '34px' }}
              ></WhiteContainer>
              <span style={spanDelimiterCSS}></span>
              <WhiteContainer
                flexParams={{
                  direction: 'row',
                  align: 'flex-start',
                  justify:'space-around'
                }}
                width={"50%"}
                height={"220px"}
                style={{ paddingLeft: '40px', paddingRight: '40px', paddingTop: '34px' }}
              ></WhiteContainer>
            </div>
            <div style={{ ...contentContainerLineCSS, marginTop: '20px' }}>
              <WhiteContainer
                flexParams={{
                  direction: 'row',
                  align: 'flex-start',
                  justify:'space-around'
                }}
                width={"100%"}
                height={"250px"}
                style={{ paddingLeft: '40px', paddingRight: '40px', paddingTop: '34px' }}
              ></WhiteContainer>
            </div>
            <div style={{ ...contentContainerLineCSS, marginTop: '20px', marginBottom: '124px' }}>
              <WhiteContainer
                flexParams={{
                  direction: 'row',
                  align: 'flex-start',
                  justify:'space-around'
                }}
                width={"100%"}
                height={"350px"}
                style={{ paddingLeft: '40px', paddingRight: '40px', paddingTop: '34px' }}
              ></WhiteContainer>
            </div>
          </div>
        </Content>
      </ContentArea> 
    </React.Fragment>
  )

}

export default ShowTaskPage