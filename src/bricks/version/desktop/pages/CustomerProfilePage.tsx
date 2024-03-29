import React, { ReactElement, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Fade } from '@mui/material'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import EmailIcon from '@mui/icons-material/Email'
import { styled } from '@mui/material/styles'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { setShow } from '../../../store/slices/right-content-slice'
import { selectActualTask } from '../../../store/slices/task-content-slice'
import SelectField from '../comps/select/SelectField'
import ButtonComponent from '../comps/button/Button'
import TaskTable from '../views/localViews/TaskTable'
import CustomerExecutorCardPreview from '../views/localViews/CustomerExecutorCardPrev'
import Pagintation from '../services/pagination.service'
import cssContentArea from '../styles/views/contentArea.css'
import cssProfileHeader from '../styles/views/profileHeader.css'
import cssProfileAside from '../styles/pages/execProfilePageAside.css'
import cssProfilePage from '../styles/pages/execProfilePage.css'
import { CSSProperties } from 'styled-components'
import Stack from '@mui/material/Stack'
import LinearProgress from '@mui/material/LinearProgress'

import bearAvatar from '../../../img/avatars/bear.svg'
import enotAvatar from '../../../img/avatars/enot.svg'
import foxAvatar from '../../../img/avatars/fox.svg'
import groupAvatar from '../../../img/avatars/group.svg'
import manAvatar from '../../../img/avatars/man.svg'
import womanAvatar from '../../../img/avatars/woman.svg'

import avatar from '../../../img/stock/avatar.svg'
import avatarTwo from '../../../img/stock/avatarTwo.svg'
import pen from '../../../img/icons/pen.svg'
import correct from '../../../img/icons/correctBlue.svg'
import semiMenu from '../../../img/icons/semiMenu.svg'
import star from '../../../img/icons/star.svg'
import info from '../../../img/icons/created/info.svg'
import blank from '../../../img/icons/created/blank.svg'
import bag from '../../../img/icons/created/bag.svg'
import hat from '../../../img/icons/created/hat.svg'
import puzzle from '../../../img/icons/created/puzzle.svg'
import infoGrey from '../../../img/icons/info.svg'

const { ContentArea, ContentContainer } = cssContentArea
const { HeaderContainer, LeftContainer, AvatarIndicator, RightContainer, ContentLine } = cssProfileHeader
const { MenuContainer, LeftMenuIconButton, PagintationContainer } = cssProfileAside
const { ContentContainerLocal, 
  TagsContent, 
  TagElement, 
  ReviewsContent, 
  ReviewsContentLine, 
  ReviewContainer } = cssProfilePage

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (

  <Tooltip {...props} arrow classes={{ popper: className }} />

))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    top: '-4px',
    left: '-2px',
    boxShadow: '0px 3px 16px 2px rgba(0, 0, 0, 0.12)',
    color: 'black',
    paddingTop: '6px',
    paddingBottom: '7px',
  },
}))

const ExecutorProfilePage: React.FC = () => {

  const [ profileViewStep, setProfileViewStep ] = useState<
    'about'       | 
    'orders'      | 
    'portfolio'   |
    'education'   |
    'team'>('about')

  const dispatch = useAppDispatch()
  const { userId } = useParams()
  
  const TASKS_LIST = useAppSelector(state => state.taskContentReducer.TASKS_DATA)
  const CUSTOMERS_LIST = useAppSelector(state => state.userContentReducer.USERS_DATA.listCustomers)
  const CUSTOMER = CUSTOMERS_LIST.filter((customer: any) => customer.clientId === userId)

  const [ tagsSpredLine, setTextSpredLine ] = useState<string>('')
  const [ checkAvatarStatus, setCheckAvatarStatus ] = useState<number>(404)

  const yelloColor = useAppSelector(state => state.theme.yellow)
  const greyColor = useAppSelector(state => state.theme.grey)
  const greyColor2 = useAppSelector(state => state.theme.grey2)
  const blueColor = useAppSelector(state => state.theme.blue1)
  const activeLeftMenuIconColor = useAppSelector(state => state.theme.blue3)
  const whiteBlueBackground = useAppSelector(state => state.theme.bg)
  const deactiveButtonColor = useAppSelector(state => state.theme.grey)
  const tagBackground = useAppSelector(state => state.theme.bg)
  const reviewBackground = useAppSelector(state => state.theme.blue4)

  const flexDivCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    position: 'relative'
  }
  const buttonLabelCSS: React.CSSProperties = {
    marginLeft: '18px',
    fontWeight: 600,
    color: deactiveButtonColor,
  }
  const showMoreButtonCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative',
    color: greyColor,
    textDecoration: 'underline',
    marginBottom: '18px',
    cursor: 'pointer',
  }

  function showRightContent(): void {
    false && dispatch(setShow(true))
  }

  const actualTask = (param: string) => {
    dispatch(selectActualTask(param))
  }

  useEffect(() => {

    console.log(userId)
    console.log(CUSTOMER)

  }, [ userId, CUSTOMER ])
  useEffect(() => {
    const timer = setInterval(() => {
      setTextSpredLine((prev: string): any => {
        let value: string = ''

        // ------------------------------------------------------------------
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        prev === '' ? value = '.'
          : prev === '.' ? value = '..'
          : prev === '..' ? value = '...'
          // ----------------------------------------------------------------
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          : prev === '...' ? value = '' : null

        return value
      })
    }, 1300)
    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => { 
   
    ( async () => {

      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")
  
      const fileName: any = userId ? userId + '.avatar.jpg' : 'undefined.avatar.jpg'
  
      const raw = JSON.stringify({
        "fileName": fileName
      });
  
      var requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
  
      await fetch("http://localhost:3000/send-file-techtask", requestOptions)
        .then(response => setCheckAvatarStatus(response.status))
  
    })()

  }, [ userId ])

  return (
    <ContentArea
      flexDirection={null}
      alignItems={null}
      justify={null}
    >
      <HeaderContainer>
        <LeftContainer>
          <BootstrapTooltip 
            title="Server's error - code 500"
            TransitionComponent={Fade} 
            followCursor 
            arrow
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                width: '150px', 
                height: '150px',
                backgroundColor: 'rgb(217, 231, 240)',
                borderRadius: '50%',
                overflow: 'hidden'
              }}
            >
              { checkAvatarStatus === 404 && <img
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
                  CUSTOMER[0].avatar === '1' ? { width: '100px', marginTop: '9px' } :
                  CUSTOMER[0].avatar === '2' ? { width: '100px',  } :
                  CUSTOMER[0].avatar === '3' ? { width: '90px', marginTop: '3px' } :
                  CUSTOMER[0].avatar === '4' ? { width: '140px', marginTop: '44px' } :
                  CUSTOMER[0].avatar === '5' ? { width: '100px', marginTop: '36px' } :
                  CUSTOMER[0].avatar === '6' ? { width: '100px', marginTop: '36px'  } : 
                  { width: '100px', marginTop: '6px' }
                }
              /> }
              { checkAvatarStatus === 200 && <img
                alt={""}
                src={`http://localhost:3000/techDocs/${userId}.avatar.jpg`} 
                style={{ height: '100%', cursor: 'pointer' }}
              /> }
            </div>
          </BootstrapTooltip>
          <AvatarIndicator background={yelloColor}/>
        </LeftContainer>
        <RightContainer>
          <div style={flexDivCSS}>
            <ContentLine>
              { ( CUSTOMER[0].faceType !== 'PHIS_FACE' && CUSTOMER[0].faceType !== 'SELF_FACE' ) 
                  
                && <h2 style={{ fontSize: '30px', margin: 0 }}>{ CUSTOMER[0].bio.name }</h2>
              
              }
              { ( CUSTOMER[0].faceType === 'PHIS_FACE' || CUSTOMER[0].faceType === 'SELF_FACE' ) 
                
                && <h2 style={{ fontSize: '30px', margin: 0 }}>{ CUSTOMER[0].bio.name + ' ' + CUSTOMER[0].bio.surname }</h2>
              
              }
              <span style={{ marginLeft: '20px', marginRight: '12px', marginTop: '5px' }}>
                <img
                  alt={""}
                  src={correct}
                />
              </span>
              <span style={{ marginTop: '5px' }}>
                <img
                  alt={""}
                  src={pen}
                />
              </span>
            </ContentLine>
            <ContentLine style={{ marginTop: '20px' }}>
              <span style={{ color: greyColor2 }}>
                { CUSTOMER[0].faceType === 'SELF_FACE' 
                  ? 'Самозанятый'
                  : CUSTOMER[0].faceType === 'PHIS_FACE'
                  ? 'Физическое лицо' 
                  : CUSTOMER[0].faceType === 'IP_FACE'
                  ? 'Юридическое лицо' : ''
                 }
              </span>
            </ContentLine>
            <ContentLine style={{ marginTop: '10px' }}>
              <span style={{ color: greyColor2 }}>{"Заказчик на бирже с 2023 года"}</span>
            </ContentLine>
            <ContentLine style={{ marginTop: '10px' }}>
              <span 
                style={{ 
                  color: greyColor2, 
                  fontSize: '12px', 
                  marginRight: '20px' 
                }}
              ><i style={{ fontSize: '15px', fontStyle: 'normal', color: greyColor, fontWeight: 'bold', marginRight: '8px' }}>0</i>выполнено</span>
              <span 
                style={{ 
                  color: greyColor2, 
                  fontSize: '12px', 
                  marginRight: '20px' 
                }}
              ><i style={{ fontSize: '15px', fontStyle: 'normal', color: greyColor, fontWeight: 'bold', marginRight: '8px' }}>0</i>в работе</span>
              <span 
                style={{ 
                  color: greyColor2, 
                  fontSize: '12px', 
                  marginRight: '20px' 
                }}
              ><i style={{ fontSize: '15px', fontStyle: 'normal', color: greyColor, fontWeight: 'bold', marginRight: '8px' }}>0</i>провалено</span>
            </ContentLine>
          </div>
          <div style={flexDivCSS}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
              <ButtonComponent
                inner={""} 
                type='ICON_BUTTON' 
                action={showRightContent}
                actionData={null}
                widthType={'px'}
                widthValue={48}
                children={null}
                childrenCss={undefined}
                iconSrc={null}
                iconCss={undefined}
                muiIconSize={30}
                MuiIconChildren={EmailIcon}
                css={{
                  position: 'relative',
                  boxSizing: 'border-box',
                  backgroundColor: whiteBlueBackground,
                }}
              />
              <img
                alt={""}
                src={semiMenu}
                style={{ display: 'block', marginLeft: '12px', cursor: 'pointer' }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '30px'
              }}
            >
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <img
                  alt={""}
                  src={star}
                />
                <span style={{ fontSize: '40px', marginLeft: '5px' }}>5.0</span>
              </div>
              <span style={{ color: greyColor2, fontSize: '12px', marginTop: '5px' }}>{"0 отзывов"}</span>
            </div>
          </div>
        </RightContainer>
      </HeaderContainer>
      <ContentContainer>
        <MenuContainer>
          <LeftMenuIconButton 
            onClick={() => setProfileViewStep('about')}
            backgroundColor={ 
              profileViewStep === 'about' 
                ? activeLeftMenuIconColor 
                : 'transparent' 
              }  
          >
            <img
              alt={""}
              src={info}
              style={{ width: '40px' }}
            />
            <span style={buttonLabelCSS}>О пользователе</span>
          </LeftMenuIconButton>
          <LeftMenuIconButton
            onClick={() => setProfileViewStep('orders')} 
            backgroundColor={ 
              profileViewStep === 'orders'
                ? activeLeftMenuIconColor 
                : 'transparent' 
              }  
          >
            { false && <img
              alt={""}
              src={blank}
              style={{ width: '40px' }}
            /> }
            <img
              alt={""}
              src={bag}
              style={{ width: '40px' }}
            />
            <span style={buttonLabelCSS}>Заказы в системе</span>
          </LeftMenuIconButton>
          <LeftMenuIconButton
            onClick={() => setProfileViewStep('portfolio')} 
            backgroundColor={ 
              profileViewStep === 'portfolio' 
                ? activeLeftMenuIconColor 
                : 'transparent' 
              }  
          >
            <img
              alt={""}
              src={bag}
              style={{ width: '40px' }}
            />
            <span style={buttonLabelCSS}>Портфолио</span>
          </LeftMenuIconButton>
          { ( CUSTOMER[0].faceType === 'SELF_FACE' || CUSTOMER[0].faceType === 'PHIS_FACE' ) && <LeftMenuIconButton
            onClick={() => setProfileViewStep('education')} 
            backgroundColor={ 
              profileViewStep === 'education'
                ? activeLeftMenuIconColor 
                : 'transparent' 
              }  
          >
            <img
              alt={""}
              src={hat}
              style={{ width: '40px' }}
            />
            <span style={buttonLabelCSS}>Образование и опыт</span>
          </LeftMenuIconButton> }
          { false && <LeftMenuIconButton
            onClick={() => setProfileViewStep('education')} 
            backgroundColor={ 
              profileViewStep === 'team'
                ? activeLeftMenuIconColor 
                : 'transparent' 
              }  
          >
            <img
              alt={""}
              src={puzzle}
              style={{ width: '40px' }}
            />
            <span style={buttonLabelCSS}>Команда</span>
          </LeftMenuIconButton> }
        </MenuContainer>
        <ContentContainerLocal style={{ justifyContent: 'space-between' }}>
          
          { profileViewStep === 'about' && <TagsContent style={{ flexWrap: 'wrap' }}>
            { CUSTOMER[0].spec?.map((item, index) => {

              return (
                <TagElement background={tagBackground}>{ item }</TagElement>
              )

            })}
            { CUSTOMER[0].spec?.length === 0 && 
            
              <TagElement background={tagBackground}>
                { 'Загрузка специализации' + tagsSpredLine }
              </TagElement> 
              
            }
            <span 
              style={{ 
                display: 'block', 
                lineHeight: '36px', 
                marginBottom: '10px', 
                fontSize: '24px',
                color: blueColor,
                position: 'absolute',
                left: '100%',
                top: '0%',
                marginLeft: '-80px',
                marginTop: '36px'
              }}
            >{"BIM"}</span>
            <div style={{ width: '100%', marginTop: '20px' }}>
              <span style={{ fontSize: '20px', fontWeight: 'bold', margin: '0' }}>О себе</span>
            </div>
            <div style={{ width: '100%', marginTop: '24px' }}>
              <span style={{ lineHeight: '20px' }}>{ CUSTOMER[0].aboutText ? CUSTOMER[0].aboutText : "Пользователь не написал о себе подробную информацию" }</span>
            </div>
          </TagsContent> }
          
          { profileViewStep === 'about' && <ReviewsContent style={{ marginBottom: '36px' }}>
            <ReviewsContentLine style={{ justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '20px', fontWeight: 'bold', margin: '0' }}>Отзывы о пользователе</span>
              <SelectField 
                placeholder={"Сначала новые"}
                params={{ width: 280, height: 50 }}
                data={[]}
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
            </ReviewsContentLine>
                
            { CUSTOMER[0].reviews?.length === 0 && <ReviewsContentLine style={{ marginBottom: '20px' }}>
              <ReviewContainer background={reviewBackground} style={{ borderRadius: '4px' }}>
                <ReviewsContentLine style={{ justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <img
                      alt={""}
                      src={avatarTwo}
                      style={{ width: '30px', marginRight: '14px', filter: 'grayscale(0.8)' }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 'bold', marginBottom: '5px' }}>{ 'Подождите, идет загрузка отзывов' + tagsSpredLine }</span>
                      <span style={{ color: greyColor2, fontSize: '12px' }}>01.01.2023</span>
                    </div>
                  </div>
                  <div style={{ marginTop: '-14px' }}>
                    <img
                      alt={""}
                      src={star}
                    />
                    <img
                      alt={""}
                      src={star}
                    />
                    <img
                      alt={""}
                      src={star}
                    />
                    <img
                      alt={""}
                      src={star}
                    />
                    <img
                      alt={""}
                      src={star}
                    />
                  </div>
                </ReviewsContentLine>
                <ReviewsContentLine style={{ marginBottom: '10px', marginTop: '14px' }}>
                  <span style={{ fontWeight: 'bold' }}>{"Заголовок отзыва на пользователя"}</span>
                </ReviewsContentLine>
                <ReviewsContentLine>
                  <span style={{ lineHeight: '22px' }}>
                    {"Вы видите данную заглушку, потому что список отзывов прогружается слишком долго, либо потому что у этого пользователя еще нет отзывов на нашей платформе"}
                  </span>
                </ReviewsContentLine>
                <ReviewsContentLine></ReviewsContentLine>
              </ReviewContainer>
            </ReviewsContentLine> }
                
            { CUSTOMER[0].reviews?.map((item, index) => {

              return (
                <ReviewsContentLine style={{ marginBottom: '20px' }} key={index}>
                  <ReviewContainer background={reviewBackground} style={{ borderRadius: '4px' }}>
                    <ReviewsContentLine style={{ justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <img
                          alt={""}
                          src={avatarTwo}
                          style={{ width: '30px', marginRight: '14px' }}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: 'bold', marginBottom: '5px' }}>Константин</span>
                          <span style={{ color: greyColor2, fontSize: '12px' }}>18.03.2023</span>
                        </div>
                      </div>
                      <div style={{ marginTop: '-14px' }}>
                        <img
                          alt={""}
                          src={star}
                        />
                        <img
                          alt={""}
                          src={star}
                        />
                        <img
                          alt={""}
                          src={star}
                        />
                        <img
                          alt={""}
                          src={star}
                        />
                        <img
                          alt={""}
                          src={star}
                        />
                      </div>
                    </ReviewsContentLine>
                    <ReviewsContentLine style={{ marginBottom: '10px', marginTop: '14px' }}>
                      <span style={{ fontWeight: 'bold' }}>{"Конструктивные решения"}</span>
                    </ReviewsContentLine>
                    <ReviewsContentLine>
                      <span style={{ lineHeight: '20px' }}>{"Vel molestie turpis placerat platea nulla risus. Donec viverra sem eget sit quam. Mi massa aliquet leo orci eu condimentum vestibulum ante. Erat tortor suspendisse odio vitae mattis. Augue sapien pulvinar dolor cras etiam vitae et eu. Quam risus ornare in adipiscing orci nulla arcu laoreet. Ultrices velit bibendum pretium morbi sem ultrices"}</span>
                    </ReviewsContentLine>
                    <ReviewsContentLine></ReviewsContentLine>
                  </ReviewContainer>
                </ReviewsContentLine>
              )

            })}

            <PagintationContainer style={{ marginBottom: '12px' }}>
              <span style={showMoreButtonCSS}>Загрузить еще</span>
              <Pagintation count={1}></Pagintation>
            </PagintationContainer>

          </ReviewsContent> }

          { profileViewStep === 'portfolio' && <TagsContent style={{ flexWrap: 'wrap', marginBottom: '36px' }}>
            { Array(2).fill('Загрузка специализации..').map((item, index) => {

              return (
                <TagElement background={tagBackground}>{ item }</TagElement>
              )

            })}
            <span 
              style={{ 
                display: 'block', 
                lineHeight: '36px', 
                marginBottom: '10px', 
                fontSize: '24px',
                color: blueColor,
                position: 'absolute',
                left: '100%',
                top: '0%',
                marginLeft: '-80px',
                marginTop: '36px'
              }}
            >{"BIM"}</span>
            <div style={{ width: '100%', marginTop: '20px' }}>
              <span style={{ fontSize: '20px', fontWeight: 'bold', margin: '0' }}>Получение информации с сервера...</span>
            </div>
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
          </TagsContent> }

          { profileViewStep === 'education' && <TagsContent style={{ flexWrap: 'wrap' }}>
            { Array(2).fill('Загрузка специализации..').map((item, index) => {

              return (
                <TagElement background={tagBackground}>{ item }</TagElement>
              )

            })}
            <span 
              style={{ 
                display: 'block', 
                lineHeight: '36px', 
                marginBottom: '10px', 
                fontSize: '24px',
                color: blueColor,
                position: 'absolute',
                left: '100%',
                top: '0%',
                marginLeft: '-80px',
                marginTop: '36px'
              }}
            >{"BIM"}</span>
            <div style={{ width: '100%', marginTop: '20px' }}>
              <span style={{ fontSize: '20px', fontWeight: 'bold', margin: '0' }}>Получение информации с сервера...</span>
            </div>
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
          </TagsContent> }

          { profileViewStep === 'orders' && <React.Fragment>
            { TASKS_LIST.list
              .filter(item => item.status === 'searching')
              .filter(item => item.customer === CUSTOMER[0].clientId).map((item, index): ReactElement => {
              return (
                <TaskTable key={index}
                  viewType={'mainView'}
                  taskInitDate={item.date}
                  taskTitle={item.name}
                  taskDeadline={item.deadline}
                  taskExpertType={item.exper}
                  taskCustomer={item.customer}
                  taskExecutor={item.executor}
                  taskLocation={item.region}
                  taskSpecializationTags={item.tags}
                  taskDescription={item.description}
                  dealStatus={item.status}
                  cardWidth={'100%'}
                  marbo={"16px"}
                  actions={[actualTask]}
                  actionsParams={[item.id, item.responds]}
                  deal={{
                    type: item.coast.issafe === true ? 'safe' : 'simple',
                    coast: item.coast.value,
                    prepaid: item.coast.issafe === true ? item.coast.prepay : 0,
                    expert: item.coast.issafe === true ? item.coast.exper : 0,
                  }}
                />
              )
            })}

            { TASKS_LIST.list
              .filter(item => item.status === 'searching')
              .filter(item => item.customer === CUSTOMER[0].clientId).length === 0 && 
              
              <span 
                style={{ 
                  display: 'block', 
                  width: '100%', 
                  textAlign: 'center',
                  marginTop: '60px',
                  marginBottom: '30px' 
                }}
              >Пользователь не имеет активных заказов</span>
              
            }

            <PagintationContainer>
              <span style={showMoreButtonCSS}>Загрузить еще</span>
              <Pagintation count={1}></Pagintation>
            </PagintationContainer>
          </React.Fragment> }

          { profileViewStep === 'team' && <React.Fragment>

            <ReviewsContentLine style={{ marginTop: '16px', marginBottom: '24px' }}>
              <span style={{ fontSize: '20px', fontWeight: 'bold', margin: '0', marginRight: '18px' }}>Команда пользователя</span>
              <img
                alt={""}
                src={infoGrey}
              />
            </ReviewsContentLine>

            { CUSTOMERS_LIST.map((item: {
              docs: any | Array<any>,
              spec?: Array<string>,
              reviews?: Array<any>,
              aboutText?: string,
              faceType?: string,
              mail?: string | number | boolean | undefined,
              number?: string | number | boolean | undefined,
              bio?: any,
              clientId: string,
              name: string,
              rate: number,
              stat: Array<number>,
              tags: Array<string>,
              jobType: string,
              role: string,
              avatar?: string,
              personalAvatar?: string,
              alertData?: Array<any>,
              portfolio?: Array<any>,
              educationAndSkills?: Array<any>
            }, index: number): ReactElement => {
              return (
                <CustomerExecutorCardPreview
                  key={index}
                  isDisabledMessage={false}
                  userName={item.name}
                  userAvatar={avatar}
                  userType={"EXECUTOR"}
                  userEmployment={item.jobType}
                  userLocation={"Екатеринбург"}
                  userReviews={24}
                  userRate={item.rate}
                  userProjects={item.stat}
                  cardWidth={"calc(50% - 8px)"}
                  marginBottom={'16px'}
                  marginRight={'0px'}
                  userTags={item.tags}
                />
              )
            })}

            <ReviewsContentLine style={{ marginTop: '16px', marginBottom: '24px' }}>
              <span style={{ fontSize: '20px', fontWeight: 'bold', margin: '0', marginRight: '18px' }}>Состоит в команде</span>
              <img
                alt={""}
                src={infoGrey}
              />
            </ReviewsContentLine>

            { CUSTOMERS_LIST.map((item: {
              docs: any | Array<any>,
              spec?: Array<string>,
              reviews?: Array<any>,
              aboutText?: string,
              faceType?: string,
              mail?: string | number | boolean | undefined,
              number?: string | number | boolean | undefined,
              bio?: any,
              clientId: string,
              name: string,
              rate: number,
              stat: Array<number>,
              tags: Array<string>,
              jobType: string,
              role: string,
              avatar?: string,
              personalAvatar?: string,
              alertData?: Array<any>,
              portfolio?: Array<any>,
              educationAndSkills?: Array<any>
            }, index: number): ReactElement => {
              if ( index < 2 ) { return (
                <CustomerExecutorCardPreview
                  key={index}
                  isDisabledMessage={false}
                  userName={item.name}
                  userAvatar={avatar}
                  userType={"EXECUTOR"}
                  userEmployment={item.jobType}
                  userLocation={"Екатеринбург"}
                  userReviews={24}
                  userRate={item.rate}
                  userProjects={item.stat}
                  cardWidth={"calc(50% - 8px)"}
                  marginBottom={'16px'}
                  marginRight={'0px'}
                  userTags={item.tags}
                />
              )} else return <React.Fragment></React.Fragment>
            })}

            <PagintationContainer>
              <span style={showMoreButtonCSS}>Загрузить еще</span>
              <Pagintation count={1}></Pagintation>
            </PagintationContainer>
          </React.Fragment> }

        </ContentContainerLocal>
      </ContentContainer>
    </ContentArea>
  )

}

export default ExecutorProfilePage