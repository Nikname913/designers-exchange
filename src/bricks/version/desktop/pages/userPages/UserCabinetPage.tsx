import React, { ReactElement, useState } from 'react'
import { Fade } from '@mui/material'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import EmailIcon from '@mui/icons-material/Email'
import { styled } from '@mui/material/styles'
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { setShow, setShowType } from '../../../../store/slices/right-content-slice'
import CabinetAlarmLine from '../../views/localViews/CabinetAlarmLine'
import InputComponent from '../../comps/input/Input'
import SelectField from '../../comps/select/SelectField'
import ButtonComponent from '../../comps/button/Button'
import CustomerExecutorCardPreview from '../../views/localViews/CustomerExecutorCardPrev'
import Pagintation from '../../services/pagination.service'
import cssContentArea from '../../styles/views/contentArea.css'
import cssProfileHeader from '../../styles/views/profileHeader.css'
import cssProfileAside from '../../styles/pages/execProfilePageAside.css'
import cssProfilePage from '../../styles/pages/execProfilePage.css'
import { CSSProperties } from 'styled-components'

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import avatar from '../../../../img/stock/avatar.svg'
import avatarTwo from '../../../../img/stock/avatarTwo.svg'
import pen from '../../../../img/icons/pen.svg'
import correct from '../../../../img/icons/correctBlue.svg'
import semiMenu from '../../../../img/icons/semiMenu.svg'
import star from '../../../../img/icons/star.svg'
import info from '../../../../img/icons/created/info.svg'
import infoGrey from '../../../../img/icons/infoGrey.svg'
import bag from '../../../../img/icons/created/bag.svg'
import hat from '../../../../img/icons/created/hat.svg'
import puzzle from '../../../../img/icons/created/puzzle.svg'
import wallet from '../../../../img/icons/created/wallet.svg'
import alarm from '../../../../img/icons/created/alarm.svg'
import document from '../../../../img/icons/created/docs.svg'
import settings from '../../../../img/icons/created/settings.svg'
import plus from '../../../../img/icons/plus.svg'

const { ContentArea, ContentContainer } = cssContentArea
const { HeaderContainer, LeftContainer, AvatarIndicator, RightContainer, ContentLine } = cssProfileHeader
const { MenuContainer, LeftMenuIconButton, PagintationContainer } = cssProfileAside
const { ContentContainerLocal, 
  TagsContent, 
  TagElement, 
  ReviewsContent, 
  ReviewsContentLine, 
  ReviewContainer,
  Delimiter } = cssProfilePage

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
    'allAbout'    | 
    'wallet'      |
    'alarms'      |
    'documents'   |
    'portfolio'   |
    'education'   |
    'team'        |
    'settings'>('about')

  const dispatch = useAppDispatch()
  const EXECUTORS_LIST = useAppSelector(state => state.userContentReducer.USERS_DATA.listExecutors)

  const yelloColor = useAppSelector(state => state.theme.yellow)
  const greyColor = useAppSelector(state => state.theme.grey)
  const greyColor2 = useAppSelector(state => state.theme.grey2)
  const blueColor = useAppSelector(state => state.theme.blue1)
  const blueColor2 = useAppSelector(state => state.theme.blue2)
  const blueColor3 = useAppSelector(state => state.theme.blue3)
  const activeLeftMenuIconColor = useAppSelector(state => state.theme.blue3)
  const whiteBlueBackground = useAppSelector(state => state.theme.bg)
  const deactiveButtonColor = useAppSelector(state => state.theme.grey)
  const tagBackground = useAppSelector(state => state.theme.bg)
  const reviewBackground = useAppSelector(state => state.theme.blue4)

  const [ authDataPass, setAuthDataPass ] = useState('Qwerty12345')
  const [ authDataPassError, setAuthDataPassError ] = useState(false)

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

  function editProfile(): void {
    dispatch(setShow(true))
    dispatch(setShowType('EditProfileCC'))
  }
  const changePass = (param: string): void => {
    setAuthDataPass(param)
    setAuthDataPassError(false)
  } 

  return (
    <ContentArea
      flexDirection={null}
      alignItems={null}
      justify={null}
    >
      <HeaderContainer>
        <LeftContainer>
          <BootstrapTooltip 
            title="Был в сети 13 марта в 16:00"
            TransitionComponent={Fade} 
            followCursor 
            arrow
          >
            <img
              alt={""}
              src={avatar}
              style={{ width: '150px' }}
            />
          </BootstrapTooltip>
          <AvatarIndicator background={yelloColor}/>
        </LeftContainer>
        <RightContainer>
          <div style={flexDivCSS}>
            <ContentLine>
              <h2 style={{ fontSize: '30px', margin: 0 }}>{"Сидоров Аркадий Сергеевич"}</h2>
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
              <span style={{ color: greyColor2 }}>{"Самозанятый"}</span>
            </ContentLine>
            <ContentLine style={{ marginTop: '10px' }}>
              <span style={{ color: greyColor2 }}>{"Исполнитель на бирже с 2022 года"}</span>
            </ContentLine>
            <ContentLine style={{ marginTop: '10px' }}>
              <span 
                style={{ 
                  color: greyColor2, 
                  fontSize: '12px', 
                  marginRight: '20px' 
                }}
              ><i style={{ fontSize: '15px', fontStyle: 'normal', color: greyColor, fontWeight: 'bold' }}>3</i> выполнено</span>
              <span 
                style={{ 
                  color: greyColor2, 
                  fontSize: '12px', 
                  marginRight: '20px' 
                }}
              ><i style={{ fontSize: '15px', fontStyle: 'normal', color: greyColor, fontWeight: 'bold' }}>3</i> в работе</span>
              <span 
                style={{ 
                  color: greyColor2, 
                  fontSize: '12px', 
                  marginRight: '20px' 
                }}
              ><i style={{ fontSize: '15px', fontStyle: 'normal', color: greyColor, fontWeight: 'bold' }}>3</i> провалено</span>
            </ContentLine>
          </div>
          <div style={flexDivCSS}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
              <ButtonComponent
                inner={""} 
                type='ICON_BUTTON' 
                action={() => {}}
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
                  opacity: 0
                }}
              />
              <img
                alt={""}
                src={semiMenu}
                style={{ display: 'block', marginLeft: '12px', cursor: 'pointer' }}
                onClick={editProfile}
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
                <span style={{ fontSize: '40px', marginLeft: '5px' }}>4.8</span>
              </div>
              <span style={{ color: greyColor2, fontSize: '12px', marginTop: '5px' }}>{"25 отзывов"}</span>
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
            onClick={() => setProfileViewStep('allAbout')}
            backgroundColor={ 
              profileViewStep === 'allAbout' 
                ? activeLeftMenuIconColor 
                : 'transparent' 
              }  
          >
            <img
              alt={""}
              src={info}
              style={{ width: '40px' }}
            />
            <span style={buttonLabelCSS}>Полные данные</span>
          </LeftMenuIconButton>
          <LeftMenuIconButton 
            onClick={() => setProfileViewStep('wallet')}
            backgroundColor={ 
              profileViewStep === 'wallet' 
                ? activeLeftMenuIconColor 
                : 'transparent' 
              }  
          >
            <img
              alt={""}
              src={wallet}
              style={{ width: '40px' }}
            />
            <span style={buttonLabelCSS}>Кошелек</span>
          </LeftMenuIconButton>
          <LeftMenuIconButton 
            onClick={() => setProfileViewStep('alarms')}
            backgroundColor={ 
              profileViewStep === 'alarms' 
                ? activeLeftMenuIconColor 
                : 'transparent' 
              }  
          >
            <img
              alt={""}
              src={alarm}
              style={{ width: '40px' }}
            />
            <span style={buttonLabelCSS}>Уведомления</span>
          </LeftMenuIconButton>
          <LeftMenuIconButton 
            onClick={() => setProfileViewStep('documents')}
            backgroundColor={ 
              profileViewStep === 'documents' 
                ? activeLeftMenuIconColor 
                : 'transparent' 
              }  
          >
            <img
              alt={""}
              src={document}
              style={{ width: '40px' }}
            />
            <span style={buttonLabelCSS}>Документы</span>
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
          <LeftMenuIconButton
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
          </LeftMenuIconButton>
          <LeftMenuIconButton
            onClick={() => setProfileViewStep('team')} 
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
          </LeftMenuIconButton>
          <LeftMenuIconButton
            onClick={() => setProfileViewStep('settings')} 
            backgroundColor={ 
              profileViewStep === 'settings'
                ? activeLeftMenuIconColor 
                : 'transparent' 
              }  
          >
            <img
              alt={""}
              src={settings}
              style={{ width: '40px' }}
            />
            <span style={buttonLabelCSS}>Настройки</span>
          </LeftMenuIconButton>
        </MenuContainer>
        <ContentContainerLocal style={{ justifyContent: 'space-between' }}>
          
          {/* ---------------------------------------- */}
          {/* модуль общей информации о пользователе */}
          {/* ---------------------------------------- */}

          { profileViewStep === 'about' && <TagsContent style={{ flexWrap: 'wrap' }}>
            { Array(4).fill('Сигнализация').map((item, index) => {

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
              <span style={{ fontSize: '20px', fontWeight: 'bold', margin: '0' }}>О себе</span>
            </div>
            <div style={{ width: '100%', marginTop: '24px' }}>
              <span style={{ lineHeight: '20px' }}>{"Vitae cum in imperdiet bibendum porttitor orci tellus eu. Morbi ut vitae tincidunt nullam sit lobortis. Bibendum vel elementum nisi est sed. Nec commodo cursus adipiscing amet et gravida lectus. Amet elit sit diam nunc a etiam. Pharetra lacus purus tellus auctor cras integer porttitor tellus tristique. Mus quis arcu commodo convallis. Vestibulum arcu in facilisi interdum accumsan eros. Imperdiet pulvinar massa dictum aenean aliquam diam aenean velit tempor. Dui morbi dui vitae tempus ut elementum placerat libero tristique"}</span>
            </div>
          </TagsContent> }
          
          { profileViewStep === 'about' && <ReviewsContent style={{ marginBottom: '36px' }}>
            <ReviewsContentLine style={{ justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold', margin: '0', marginRight: '30px' }}>Отзывы</span>
                <span style={{ fontSize: '20px', fontWeight: 'bold', margin: '0', opacity: 0.4 }}>Оставленные мной</span>
              </div>
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
                
            { Array(4).fill(undefined).map((item, index) => {

              return (
                <ReviewsContentLine style={{ marginBottom: '20px' }} key={index}>
                  <ReviewContainer background={reviewBackground}>
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
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '-14px' }}>
                        <div style={{ marginRight: '8px' }}>
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
                        <div>
                          <img
                            alt={""}
                            src={semiMenu}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
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

          {/* ---------------------------------------- */}
          {/* модуль подробной информации о пользователе */}
          {/* ---------------------------------------- */}

          { profileViewStep === 'allAbout' && <React.Fragment>

            <ReviewsContentLine style={{ marginBottom: '20px', marginTop: '14px' }}>
              <span style={{ fontWeight: 'bold' }}>{"Контакты"}</span>
            </ReviewsContentLine>
            <ReviewsContentLine>
              <InputComponent
                type={'TEXT_INPUT_OUTLINE'}
                valueType='text'
                required={false}
                widthType={'%'}
                widthValue={50}
                heightValue={'50px'}
                label={"Номер телефона"}
                isError={false}
                isDisabled={false}
                labelShrinkLeft={"0px"}
                innerLabel={null}
                store={[ "89068085023", () => null ]}
                css={{
                  fontSize: '12px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  marginBottom: '0px',
                  marginTop: '0px',
                  backgroundColor: 'white'
                }}
              />
              <span style={{ display: 'block', width: '20px' }} />
              <div style={{ display: 'block', width: '50%' }}>
                <ButtonComponent
                  inner={"Отправить код подтверждения"} 
                  type='CONTAINED_DEFAULT' 
                  action={() => {}}
                  actionData={null}
                  widthType={'px'}
                  widthValue={320}
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
                    backgroundColor: blueColor3,
                    color: 'black',
                    width: '56px',
                    height: '43px',
                  }}
                />
              </div>
            </ReviewsContentLine>
            <ReviewsContentLine style={{ marginTop: '20px' }}>
              <InputComponent
                type={'TEXT_INPUT_OUTLINE'}
                valueType='text'
                required={false}
                widthType={'%'}
                widthValue={50}
                heightValue={'50px'}
                label={"Email"}
                isError={false}
                isDisabled={false}
                labelShrinkLeft={"0px"}
                innerLabel={null}
                store={[ "nik.shipov@gmail.com", () => null ]}
                css={{
                  fontSize: '12px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  marginBottom: '0px',
                  marginTop: '0px',
                  backgroundColor: 'white'
                }}
              />
              <span style={{ display: 'block', width: '20px' }} />
              <div style={{ display: 'block', width: '50%' }} />
            </ReviewsContentLine>
            <ReviewsContentLine style={{ marginBottom: '20px', marginTop: '32px' }}>
              <span style={{ fontWeight: 'bold' }}>{"Локация"}</span>
            </ReviewsContentLine>
            <ReviewsContentLine style={{ marginTop: '20px' }}>
              <InputComponent
                type={'TEXT_INPUT_OUTLINE'}
                valueType='text'
                required={false}
                widthType={'%'}
                widthValue={50}
                heightValue={'50px'}
                label={"Местонахождение страна"}
                isError={false}
                isDisabled={true}
                labelShrinkLeft={"0px"}
                innerLabel={null}
                store={[ "Российская Федерация", () => null ]}
                css={{
                  fontSize: '12px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  marginBottom: '0px',
                  marginTop: '0px',
                  backgroundColor: 'white'
                }}
              />
              <span style={{ display: 'block', width: '20px' }} />
              <InputComponent
                type={'TEXT_INPUT_OUTLINE'}
                valueType='text'
                required={false}
                widthType={'%'}
                widthValue={50}
                heightValue={'50px'}
                label={"Местонахождение город"}
                isError={false}
                isDisabled={false}
                labelShrinkLeft={"0px"}
                innerLabel={null}
                store={[ "+3:00 Москва", () => null ]}
                css={{
                  fontSize: '12px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  marginBottom: '0px',
                  marginTop: '0px',
                  backgroundColor: 'white'
                }}
              />
            </ReviewsContentLine>
            <Delimiter style={{ marginTop: '40px' }} background={blueColor3}/>
            <ReviewsContentLine style={{ marginBottom: '20px', marginTop: '33px' }}>
              <span style={{ fontWeight: 'bold' }}>{"Персональные данные"}</span>
            </ReviewsContentLine>
            <ReviewsContentLine>
              <InputComponent
                type={'TEXT_INPUT_OUTLINE'}
                valueType='text'
                required={false}
                widthType={'%'}
                widthValue={33.33333}
                heightValue={'50px'}
                label={"Фамилия пользователя"}
                isError={false}
                isDisabled={false}
                labelShrinkLeft={"0px"}
                innerLabel={null}
                store={[ "Сидоров", () => null ]}
                css={{
                  fontSize: '12px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  marginBottom: '0px',
                  marginTop: '0px',
                  backgroundColor: 'white'
                }}
              />
              <span style={{ display: 'block', width: '20px' }} />
              <InputComponent
                type={'TEXT_INPUT_OUTLINE'}
                valueType='text'
                required={false}
                widthType={'%'}
                widthValue={33.33333}
                heightValue={'50px'}
                label={"Имя пользователя"}
                isError={false}
                isDisabled={false}
                labelShrinkLeft={"0px"}
                innerLabel={null}
                store={[ "Аркадий", () => null ]}
                css={{
                  fontSize: '12px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  marginBottom: '0px',
                  marginTop: '0px',
                  backgroundColor: 'white'
                }}
              />
              <span style={{ display: 'block', width: '20px' }} />
              <InputComponent
                type={'TEXT_INPUT_OUTLINE'}
                valueType='text'
                required={false}
                widthType={'%'}
                widthValue={33.33333}
                heightValue={'50px'}
                label={"Отчество"}
                isError={false}
                isDisabled={false}
                labelShrinkLeft={"0px"}
                innerLabel={null}
                store={[ "Сергеевич", () => null ]}
                css={{
                  fontSize: '12px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  marginBottom: '0px',
                  marginTop: '0px',
                  backgroundColor: 'white'
                }}
              />
            </ReviewsContentLine>
            <ReviewsContentLine style={{ marginTop: '12px' }}>
              <InputComponent
                type={'TEXT_INPUT_OUTLINE_DATEPICK'}
                valueType='text'
                required={false}
                widthType={'%'}
                widthValue={50}
                heightValue={'50px'}
                label={"Дата рождения"}
                isError={false}
                isDisabled={false}
                labelShrinkLeft={"0px"}
                innerLabel={null}
                store={[ "Сидоров", () => null ]}
                css={{
                  fontSize: '12px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  marginBottom: '0px',
                  marginTop: '0px',
                  backgroundColor: 'white'
                }}
              />
              <span style={{ display: 'block', width: '20px' }} />
              <div style={{ display: 'block', width: '50%' }} />
            </ReviewsContentLine>
            <ReviewsContentLine style={{ marginBottom: '20px', marginTop: '33px' }}>
              <span style={{ fontWeight: 'bold' }}>{"Персональные данные"}</span>
            </ReviewsContentLine>
            <ReviewsContentLine>
              <InputComponent
                type={'TEXT_INPUT_OUTLINE'}
                valueType='text'
                required={false}
                widthType={'%'}
                widthValue={50}
                heightValue={'50px'}
                label={"Паспорт серия"}
                isError={false}
                isDisabled={false}
                labelShrinkLeft={"0px"}
                innerLabel={null}
                store={[ "", () => null ]}
                css={{
                  fontSize: '12px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  marginBottom: '0px',
                  marginTop: '0px',
                  backgroundColor: 'white'
                }}
              />
              <span style={{ display: 'block', width: '20px' }} />
              <InputComponent
                type={'TEXT_INPUT_OUTLINE'}
                valueType='text'
                required={false}
                widthType={'%'}
                widthValue={50}
                heightValue={'50px'}
                label={"Паспорт номер"}
                isError={false}
                isDisabled={false}
                labelShrinkLeft={"0px"}
                innerLabel={null}
                store={[ "", () => null ]}
                css={{
                  fontSize: '12px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  marginBottom: '0px',
                  marginTop: '0px',
                  backgroundColor: 'white'
                }}
              />
            </ReviewsContentLine>
            <ReviewsContentLine style={{ marginTop: '12px' }}>
              <InputComponent
                type={'TEXT_INPUT_OUTLINE_DATEPICK'}
                valueType='text'
                required={false}
                widthType={'%'}
                widthValue={50}
                heightValue={'50px'}
                label={"Дата выдачи"}
                isError={false}
                isDisabled={false}
                labelShrinkLeft={"0px"}
                innerLabel={null}
                store={[ "Сидоров", () => null ]}
                css={{
                  fontSize: '12px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  marginBottom: '0px',
                  marginTop: '0px',
                  backgroundColor: 'white'
                }}
              />
              <span style={{ display: 'block', width: '20px' }} />
              <div style={{ display: 'block', width: '50%' }} />
            </ReviewsContentLine>
            <ReviewsContentLine style={{ marginTop: '20px' }}>
              <InputComponent
                type={'TEXT_INPUT_OUTLINE'}
                valueType='text'
                required={false}
                widthType={'%'}
                widthValue={100}
                heightValue={'50px'}
                label={"Кем выдан"}
                isError={false}
                isDisabled={false}
                labelShrinkLeft={"0px"}
                innerLabel={null}
                store={[ "", () => null ]}
                css={{
                  fontSize: '12px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  marginBottom: '0px',
                  marginTop: '0px',
                  backgroundColor: 'white'
                }}
              />
            </ReviewsContentLine>
            <ReviewsContentLine style={{ marginTop: '20px' }}>
              <InputComponent
                type={'TEXT_INPUT_OUTLINE'}
                valueType='text'
                required={false}
                widthType={'%'}
                widthValue={100}
                heightValue={'50px'}
                label={"Адрес регистрации"}
                isError={false}
                isDisabled={false}
                labelShrinkLeft={"0px"}
                innerLabel={null}
                store={[ "", () => null ]}
                css={{
                  fontSize: '12px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  marginBottom: '0px',
                  marginTop: '0px',
                  backgroundColor: 'white'
                }}
              />
            </ReviewsContentLine>
            <ReviewsContentLine style={{ marginTop: '20px' }}>
              <InputComponent
                type={'TEXT_INPUT_OUTLINE'}
                valueType='text'
                required={false}
                widthType={'%'}
                widthValue={50}
                heightValue={'50px'}
                label={"СНИЛС"}
                isError={false}
                isDisabled={false}
                labelShrinkLeft={"0px"}
                innerLabel={null}
                store={[ "", () => null ]}
                css={{
                  fontSize: '12px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  marginBottom: '0px',
                  marginTop: '0px',
                  backgroundColor: 'white'
                }}
              />
              <span style={{ display: 'block', width: '20px' }} />
              <InputComponent
                type={'TEXT_INPUT_OUTLINE'}
                valueType='text'
                required={false}
                widthType={'%'}
                widthValue={50}
                heightValue={'50px'}
                label={"ИНН"}
                isError={false}
                isDisabled={false}
                labelShrinkLeft={"0px"}
                innerLabel={null}
                store={[ "", () => null ]}
                css={{
                  fontSize: '12px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  marginBottom: '0px',
                  marginTop: '0px',
                  backgroundColor: 'white'
                }}
              />
            </ReviewsContentLine>
            <ReviewsContentLine style={{ marginTop: '40px', marginBottom: '36px', justifyContent: 'space-between' }}>
              <ButtonComponent
                inner={"Пройти проверку данных"} 
                type='CONTAINED_DEFAULT' 
                action={() => {}}
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
                  backgroundColor: blueColor3,
                  color: 'black',
                  width: '56px',
                  height: '43px',
                }}
              />
              <ButtonComponent
                inner={"Сохранить изменения"} 
                type='CONTAINED_DEFAULT' 
                action={() => {}}
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
                  backgroundColor: blueColor2,
                  color: 'white',
                  width: '56px',
                  height: '43px',
                }}
              />
            </ReviewsContentLine>

          </React.Fragment> }

          {/* ---------------------------------------- */}
          {/* модуль платежных данных */}
          {/* ---------------------------------------- */}

          { profileViewStep === 'wallet' && <React.Fragment>

            <ReviewsContent 
              style={{ 
                marginTop: '0px', 
                height: '180px', 
                flexDirection: 'row', 
                alignItems: 'flex-start',
                justifyContent: 'space-between' 
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', width: '50%' }}>
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
                    backgroundColor: blueColor3,
                    marginRight: '10px',
                    cursor: 'pointer'
                  }}
                >
                  <img
                    alt={""}
                    src={plus}
                    style={{ display: 'block', width: '14px' }}
                  />
                </span>
                <span>Добавить карту</span>
                <span style={{ lineHeight: '20px', paddingRight: '20px', marginTop: '30px' }}>{"Добавить карту и совершать транзакции вы сможете после подтверждения ваших полных данных"}</span>
              </div>
              <span style={{ display: 'block', width: '1px', height: '100%', backgroundColor: blueColor3 }} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%', paddingLeft: '30px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                  <span style={{ width: '50%' }}>Доступно</span>
                  <span style={{ fontSize: '32px', fontWeight: 'bold', color: blueColor }}>0 ₽</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', position: 'relative', marginTop: '14px' }}>
                  <span style={{ color: greyColor2, lineHeight: '18px', width: '50%' }}>Ожидаемое<br/>поступление</span>
                  <BootstrapTooltip 
                    title="Подсказка при наведении"
                    TransitionComponent={Fade} 
                    followCursor 
                    arrow
                  >
                    <img
                      alt={""}
                      src={infoGrey}
                      style={{ 
                        display: 'block',
                        position: 'absolute',
                        left: '50%',
                        marginLeft: '-38px'
                      }}
                    />
                  </BootstrapTooltip>
                  <span style={{ color: greyColor2, fontSize: '32px', fontWeight: 'bold' }}>0 ₽</span>
                </div>
              </div>
            </ReviewsContent> 
            <ReviewsContent 
              style={{ 
                marginTop: '0px', 
                height: '250px', 
                flexDirection: 'row', 
                alignItems: 'flex-start',
                justifyContent: 'space-between' 
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%', paddingRight: '30px', boxSizing: 'border-box' }}>
                <InputComponent
                  type={'TEXT_INPUT_OUTLINE'}
                  valueType='text'
                  required={false}
                  widthType={'%'}
                  widthValue={100}
                  heightValue={'50px'}
                  label={"Mastercard"}
                  isError={false}
                  isDisabled={true}
                  labelShrinkLeft={"0px"}
                  innerLabel={null}
                  store={[ "**** **** **** ****", () => null ]}
                  css={{
                    fontSize: '12px',
                    position: 'relative',
                    boxSizing: 'border-box',
                    marginBottom: '0px',
                    marginTop: '0px',
                    backgroundColor: 'white',
                  }}
                />  
                <InputComponent
                  type={'TEXT_INPUT_OUTLINE'}
                  valueType='text'
                  required={false}
                  widthType={'%'}
                  widthValue={100}
                  heightValue={'50px'}
                  label={"Введите сумму вывода"}
                  isError={false}
                  isDisabled={false}
                  labelShrinkLeft={"0px"}
                  innerLabel={null}
                  store={[ "", () => null ]}
                  css={{
                    fontSize: '12px',
                    position: 'relative',
                    boxSizing: 'border-box',
                    marginBottom: '0px',
                    marginTop: '14px',
                    backgroundColor: 'white',
                  }}
                />  
                <div 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    justifyContent: 'flex-start', 
                    position: 'relative', 
                    width: '100%',
                    marginTop: '14px',
                  }}
                >
                  <ButtonComponent
                    inner={"Пополнить"} 
                    type='CONTAINED_DEFAULT' 
                    action={() => {}}
                    actionData={null}
                    widthType={'%'}
                    widthValue={40}
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
                  <ButtonComponent
                    inner={"Вывести"} 
                    type='CONTAINED_DEFAULT' 
                    action={() => {}}
                    actionData={null}
                    widthType={'%'}
                    widthValue={40}
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
                      backgroundColor: blueColor3,
                      color: 'black',
                      width: '56px',
                      height: '43px',
                      marginLeft: '14px'
                    }}
                  />
                </div>
              </div>
              <span style={{ display: 'block', width: '1px', height: '100%', backgroundColor: blueColor3 }} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%', paddingLeft: '30px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                  <span style={{ width: '50%' }}>Доступно</span>
                  <span style={{ fontSize: '32px', fontWeight: 'bold', color: blueColor }}>13 000 ₽</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', position: 'relative', marginTop: '14px' }}>
                  <span style={{ color: greyColor2, lineHeight: '18px', width: '50%' }}>Ожидаемое<br/>поступление</span>
                  <BootstrapTooltip 
                    title="Подсказка при наведении"
                    TransitionComponent={Fade} 
                    followCursor 
                    arrow
                  >
                    <img
                      alt={""}
                      src={infoGrey}
                      style={{ 
                        display: 'block',
                        position: 'absolute',
                        left: '50%',
                        marginLeft: '-38px'
                      }}
                    />
                  </BootstrapTooltip>
                  <span style={{ color: greyColor2, fontSize: '32px', fontWeight: 'bold' }}>25 000 ₽</span>
                </div>
              </div>
            </ReviewsContent> 
            <ReviewsContentLine style={{ marginTop: '14px' }}>
              <span style={{ fontSize: '20px', fontWeight: 'bold', margin: '0' }}>История операций</span>
            </ReviewsContentLine>
            <ReviewsContentLine style={{ marginTop: '16px' }}>
              <div style={{ width: '30%', marginTop: '8px' }}>
                <SelectField 
                  placeholder={"Все операции"}
                  params={{ height: 50 }}
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
              </div>
              <span style={{ display: 'block', width: '16px' }} />
              <InputComponent
                type={'TEXT_INPUT_OUTLINE_DATEPICK'}
                valueType='text'
                required={false}
                widthType={'%'}
                widthValue={25}
                heightValue={'50px'}
                label={"Начало"}
                isError={false}
                isDisabled={false}
                labelShrinkLeft={"0px"}
                innerLabel={null}
                store={[ "Сидоров", () => null ]}
                css={{
                  fontSize: '12px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  marginBottom: '20px',
                  marginTop: '0px',
                  backgroundColor: 'white',
                  height: '30px',
                }}
              />
              <span style={{ display: 'block', width: '16px' }} />
              <InputComponent
                type={'TEXT_INPUT_OUTLINE_DATEPICK'}
                valueType='text'
                required={false}
                widthType={'%'}
                widthValue={25}
                heightValue={'50px'}
                label={"Конец"}
                isError={false}
                isDisabled={false}
                labelShrinkLeft={"0px"}
                innerLabel={null}
                store={[ "Сидоров", () => null ]}
                css={{
                  fontSize: '12px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  marginBottom: '0px',
                  marginTop: '0px',
                  backgroundColor: 'white'
                }}
              />
              <span style={{ display: 'block', width: '16px' }} />
              <div style={{ width: '20%', marginTop: '8px' }}>
                <ButtonComponent
                  inner={"Показать"} 
                  type='CONTAINED_DEFAULT' 
                  action={() => {}}
                  actionData={null}
                  widthType={'%'}
                  widthValue={100}
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
                    backgroundColor: blueColor3,
                    color: 'black',
                    width: '56px',
                    height: '43px',
                  }}
                />
              </div>
            </ReviewsContentLine>
            <ReviewsContent 
              style={{ 
                marginTop: '16px', 
                marginBottom: '10px', 
                flexDirection: 'row', 
                alignItems: 'flex-start',
                justifyContent: 'space-between' 
              }}
            >
              <ReviewsContentLine>
                <span style={{ width: '50%' }}>Пополнение кошелька</span>
                <span style={{ width: '25%', color: greyColor2 }}>23.03.2023</span>
                <span style={{ width: '25%', textAlign: 'right', fontWeight: 'bold' }}>+ 20 000 ₽</span>
              </ReviewsContentLine>
            </ReviewsContent>
            <PagintationContainer>
              <span style={showMoreButtonCSS}>Загрузить еще</span>
              <Pagintation count={1}></Pagintation>
            </PagintationContainer>

          </React.Fragment> }

          {/* ---------------------------------------- */}
          {/* модуль уведомлений пользователя */}
          {/* ---------------------------------------- */}

          { profileViewStep === 'alarms' && <React.Fragment>

            { Array(2).fill(null).map((item, index) => {

              return (
                <React.Fragment key={index}>
                  <ReviewsContentLine>
                    <CabinetAlarmLine
                      background={index === 0 ? "#FADCDC" : "#D9E7F0"}
                      isNew={true}
                      buttons={[
                        <ButtonComponent
                          inner={"К заказу"} 
                          type='CONTAINED_DEFAULT' 
                          action={() => {}}
                          actionData={null}
                          widthType={'%'}
                          widthValue={40}
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
                            backgroundColor: 'white',
                            color: 'black',
                            width: '56px',
                            height: '43px',
                          }}
                        />
                      ]}
                      content={{
                        date: '22 ноября в 11:30',
                        text: 'ИП Захарова О.Ю. предлагает вам стать участником команды. [ вторая строка для проверки переноса ]'
                      }}
                    />
                  </ReviewsContentLine>
                </React.Fragment>
              )

            })}

            { Array(3).fill(null).map((item, index) => {

              return (
                <React.Fragment key={index}>
                  <ReviewsContentLine>
                    <CabinetAlarmLine
                      background={"#E8F0F6"}
                      isNew={false}
                      buttons={[
                        <ButtonComponent
                          inner={"К заказу"} 
                          type='CONTAINED_DEFAULT' 
                          action={() => {}}
                          actionData={null}
                          widthType={'%'}
                          widthValue={40}
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
                            backgroundColor: 'white',
                            color: 'black',
                            width: '56px',
                            height: '43px',
                          }}
                        />
                      ]}
                      content={{
                        date: '22 ноября в 11:30',
                        text: 'ИП Захарова О.Ю. предлагает вам стать участником команды. [ вторая строка для проверки переноса ]'
                      }}
                    />
                  </ReviewsContentLine>
                </React.Fragment>
              )

            })}

            <ReviewsContentLine style={{ justifyContent: 'space-around', color: greyColor, marginTop: '30px' }}>
              <span>{"Показать все"}</span>
            </ReviewsContentLine>

          </React.Fragment> }

          {/* ---------------------------------------- */}
          {/* модуль документов пользователя */}
          {/* ---------------------------------------- */}

          { profileViewStep === 'documents' && <React.Fragment>

            <ReviewsContent 
              style={{ 
                marginTop: '0px',  
                flexDirection: 'row', 
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '24px'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <img
                  alt={""}
                  src={pen}
                />
                <span style={{ fontWeight: 'bold', marginLeft: '20px' }}>Электронная подпись</span>
              </div>
              <ButtonComponent
                inner={"Загрузить"} 
                type='UPLOAD' 
                action={() => {}}
                actionData={null}
                widthType={'px'}
                widthValue={140}
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
                  backgroundColor: blueColor3,
                  color: 'black',
                  width: '56px',
                  height: '43px',
                  marginLeft: '14px'
                }}
              />
            </ReviewsContent>
            <ReviewsContentLine style={{ justifyContent: 'space-between', marginTop: '14px' }}>
              <span style={{ fontWeight: 'bold' }}>Операции по счету</span>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div style={{ width: '200px', marginRight: '20px' }}>
                  <SelectField 
                    placeholder={"Выбрать месяц"}
                    params={{ height: 50 }}
                    data={[
                      { value: 1, label: 'Январь' },
                      { value: 1, label: 'Февраль' },
                      { value: 1, label: 'Март' },
                      { value: 1, label: 'Апрель' },
                      { value: 1, label: 'Май' },
                      { value: 1, label: 'Июнь' },
                      { value: 1, label: '...' },
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
                </div>
                <InputComponent
                  type={'TEXT_INPUT_OUTLINE'}
                  valueType='text'
                  required={false}
                  widthType={'px'}
                  widthValue={120}
                  heightValue={'50px'}
                  label={"Выбор года"}
                  isError={false}
                  isDisabled={false}
                  labelShrinkLeft={"0px"}
                  innerLabel={null}
                  store={[ "2023", () => null ]}
                  css={{
                    fontSize: '12px',
                    position: 'relative',
                    boxSizing: 'border-box',
                    marginBottom: '0px',
                    backgroundColor: 'white',
                  }}
                />  
                <ButtonComponent
                  inner={"Сформировать"} 
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
                    marginLeft: '20px',
                    backgroundColor: blueColor2,
                    color: 'white',
                    width: '56px',
                    height: '43px',
                  }}
                />
              </div>
            </ReviewsContentLine>
            <ReviewsContent 
              style={{ 
                marginTop: '16px', 
                marginBottom: '10px', 
                flexDirection: 'row', 
                alignItems: 'flex-start',
                justifyContent: 'space-between' 
              }}
            >
              <ReviewsContentLine>
                <span style={{ width: '50%' }}>Пополнение кошелька</span>
                <span style={{ width: '25%', color: greyColor2 }}>23.03.2023</span>
                <span style={{ width: '25%', textAlign: 'right', fontWeight: 'bold' }}>+ 20 000 ₽</span>
              </ReviewsContentLine>
            </ReviewsContent>
            <ReviewsContentLine style={{ justifyContent: 'flex-end', marginTop: '20px' }}>
              <ButtonComponent
                inner={"Скачать выписку"} 
                type='UPLOAD' 
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
                  backgroundColor: blueColor3,
                  color: 'black',
                  width: '56px',
                  height: '43px',
                }}
              />
            </ReviewsContentLine>

          </React.Fragment> }

          {/* ---------------------------------------- */}
          {/* модуль портфолио пользователя */}
          {/* ---------------------------------------- */}

          { profileViewStep === 'portfolio' && <React.Fragment>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '14px' }}>
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
                  backgroundColor: blueColor3,
                  marginRight: '10px',
                  cursor: 'pointer'
                }}
              >
                <img
                  alt={""}
                  src={plus}
                  style={{ display: 'block', width: '14px' }}
                />
              </span>
              <span>Добавить новый проект</span>
            </div>
            <ReviewsContent style={{ padding: '24px', alignItems: 'flex-start' }}>
              <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Проектирование вентиляции малоэтажного дома в Москве</span>
              <ReviewsContentLine style={{ marginTop: '34px', alignItems: 'flex-start' }}>
                <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 'bold', marginBottom: '10px' }}>Сроки</span>
                  <span>{"февраль 2021 - март 2023"}</span>
                </div>
                <div style={{ width: '50%' }}>
                  <span style={{ fontWeight: 'bold' }}>Акты</span>
                  <div style={{ marginTop: '10px' }}>
                    <span style={{ fontWeight: 'bold', marginRight: '24px' }}>220 000₽</span>
                    <span>Акт_выполненные.doc</span>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <span style={{ fontWeight: 'bold', marginRight: '24px' }}>220 000₽</span>
                    <span>Акт_выполненные.doc</span>
                  </div>
                </div>
              </ReviewsContentLine>
              <ReviewsContentLine style={{ marginTop: '24px', alignItems: 'flex-start' }}>
                <div style={{ width: '50%' }}>
                  <span style={{ fontWeight: 'bold' }}>Параметры объекта</span>
                  <div style={{ marginTop: '10px' }}>
                    <span style={{ marginRight: '24px', color: '#8E9DA7' }}>Общая площадь, кв.м</span>
                    <span>360</span>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <span style={{ marginRight: '24px', color: '#8E9DA7' }}>Высота объекта, м</span>
                    <span>13</span>
                  </div>
                </div>
                <div style={{ width: '50%' }}>
                  <span style={{ fontWeight: 'bold', color: 'transparent' }}>---</span>
                  <div style={{ marginTop: '10px' }}>
                    <span style={{ marginRight: '24px', color: '#8E9DA7' }}>Этажность наземная</span>
                    <span>4</span>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <span style={{ marginRight: '24px', color: '#8E9DA7' }}>Регион</span>
                    <span>Москва, Россия</span>
                  </div>
                </div>
              </ReviewsContentLine>
              <ReviewsContentLine>
                <span style={{ fontWeight: 'bold', marginBottom: '0px', marginTop: '30px' }}>Описание проекта</span>
              </ReviewsContentLine>
              <ReviewsContentLine style={{ marginTop: '16px' }}>
                <span style={{ marginBottom: '0px', marginTop: '0px', lineHeight: '20px' }}>{"Consectetur pharetra elit rhoncus convallis molestie sit auctor. Eget enim convallis nisl iaculis donec. Nulla porttitor orci tristique mattis mi faucibus phasellus. Quisque sagittis risus id orci at proin faucibus sodales leo. Arcu integer sed senectus et lacinia diam. Urna a vulputate bibendum in nulla malesuada lectus. Neque vestibulum imperdiet elit maecenas mattis sagittis"}</span>
              </ReviewsContentLine>
              <ReviewsContentLine style={{ marginTop: '26px' }}>
                { Array(4).fill('Сигнализация').map((item, index) => <TagElement background={tagBackground}>{ item }</TagElement>)}
              </ReviewsContentLine>
            </ReviewsContent>
            <ReviewsContent style={{ padding: '24px', alignItems: 'flex-start', marginTop: '0px', marginBottom: '36px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Проектирование вентиляции малоэтажного дома в Москве</span>
              <ReviewsContentLine style={{ marginTop: '34px', alignItems: 'flex-start' }}>
                <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 'bold', marginBottom: '10px' }}>Сроки</span>
                  <span>{"февраль 2021 - март 2023"}</span>
                </div>
                <div style={{ width: '50%' }}>
                  <span style={{ fontWeight: 'bold' }}>Акты</span>
                  <div style={{ marginTop: '10px' }}>
                    <span style={{ fontWeight: 'bold', marginRight: '24px' }}>220 000₽</span>
                    <span>Акт_выполненные.doc</span>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <span style={{ fontWeight: 'bold', marginRight: '24px' }}>220 000₽</span>
                    <span>Акт_выполненные.doc</span>
                  </div>
                </div>
              </ReviewsContentLine>
              <ReviewsContentLine style={{ marginTop: '24px', alignItems: 'flex-start' }}>
                <div style={{ width: '50%' }}>
                  <span style={{ fontWeight: 'bold' }}>Параметры объекта</span>
                  <div style={{ marginTop: '10px' }}>
                    <span style={{ marginRight: '24px', color: '#8E9DA7' }}>Общая площадь, кв.м</span>
                    <span>360</span>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <span style={{ marginRight: '24px', color: '#8E9DA7' }}>Высота объекта, м</span>
                    <span>13</span>
                  </div>
                </div>
                <div style={{ width: '50%' }}>
                  <span style={{ fontWeight: 'bold', color: 'transparent' }}>---</span>
                  <div style={{ marginTop: '10px' }}>
                    <span style={{ marginRight: '24px', color: '#8E9DA7' }}>Этажность наземная</span>
                    <span>4</span>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <span style={{ marginRight: '24px', color: '#8E9DA7' }}>Регион</span>
                    <span>Москва, Россия</span>
                  </div>
                </div>
              </ReviewsContentLine>
              <ReviewsContentLine>
                <span style={{ fontWeight: 'bold', marginBottom: '0px', marginTop: '30px' }}>Описание проекта</span>
              </ReviewsContentLine>
              <ReviewsContentLine style={{ marginTop: '16px' }}>
                <span style={{ marginBottom: '0px', marginTop: '0px', lineHeight: '20px' }}>{"Consectetur pharetra elit rhoncus convallis molestie sit auctor. Eget enim convallis nisl iaculis donec. Nulla porttitor orci tristique mattis mi faucibus phasellus. Quisque sagittis risus id orci at proin faucibus sodales leo. Arcu integer sed senectus et lacinia diam. Urna a vulputate bibendum in nulla malesuada lectus. Neque vestibulum imperdiet elit maecenas mattis sagittis"}</span>
              </ReviewsContentLine>
              <ReviewsContentLine style={{ marginTop: '26px' }}>
                { Array(4).fill('Сигнализация').map((item, index) => <TagElement background={tagBackground}>{ item }</TagElement>)}
              </ReviewsContentLine>
            </ReviewsContent>

          </React.Fragment> }

          {/* ---------------------------------------- */}
          {/* модуль опыта и образования пользователя */}
          {/* ---------------------------------------- */}

          { profileViewStep === 'education' && <React.Fragment>

            <ReviewsContentLine style={{ marginBottom: '20px', marginTop: '14px', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 'bold' }}>{"Образование"}</span>
              <span style={{ color: '#516674' }}>{"Редактировать"}</span>
            </ReviewsContentLine>

            <ReviewsContent 
              style={{ 
                marginTop: '0px', 
                flexDirection: 'row', 
                alignItems: 'flex-start', 
                justifyContent: 'space-between',
              }}
            >
              <span style={{ width: '15%' }}>{"2009"}</span>
              <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
                <span style={{ fontWeight: 'bold', marginBottom: '16px' }}>{"Курсы повышения квалификации"}</span>
                <span>{"Строительство и эксплуатация зданий и сооружений"}</span>
              </div>
            </ReviewsContent>
            <ReviewsContent 
              style={{ 
                marginTop: '0px', 
                flexDirection: 'row', 
                alignItems: 'flex-start', 
                justifyContent: 'space-between',
              }}
            >
              <span style={{ width: '15%' }}>{"2011"}</span>
              <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
                <span style={{ fontWeight: 'bold', marginBottom: '16px' }}>{"Санкт-Петербургский государственный архитектурно-строительный университет"}</span>
                <span>{"Строительство и эксплуатация зданий и сооружений"}</span>
              </div>
            </ReviewsContent>

            <ReviewsContentLine style={{ marginBottom: '20px', marginTop: '14px', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 'bold' }}>{"Опыт работы"}</span>
              <span style={{ color: '#516674' }}>{"Редактировать"}</span>
            </ReviewsContentLine>

            <ReviewsContent 
              style={{ 
                marginTop: '0px', 
                flexDirection: 'row', 
                alignItems: 'flex-start', 
                justifyContent: 'space-between',
              }}
            >
              <span style={{ lineHeight: '20px', width: '15%' }}>{"декабрь 2011 - ноябрь 2015"}</span>
              <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
                <span style={{ fontWeight: 'bold', marginBottom: '16px' }}>{"ООО Технические Системы"}</span>
                <span style={{ lineHeight: '20px' }}>{"Viverra eu vitae quis sed in ut diam. Elit nunc pulvinar montes et morbi morbi duis leo est. Iaculis eget leo amet sit. Egestas viverra arcu et amet ut diam quis. Nisl leo in lectus eget commodo mauris sed. Et ut aliquam sed nisl nisl ultricies. Massa leo viverra massa quis. Adipiscing quam maecenas a aliquam. Nisl in facilisis sed tellus. Vulputate augue integer mauris tortor"}</span>
              </div>
            </ReviewsContent>
            <ReviewsContent 
              style={{ 
                marginTop: '0px', 
                flexDirection: 'row', 
                alignItems: 'flex-start', 
                justifyContent: 'space-between',
                marginBottom: '36px',
              }}
            >
              <span style={{ lineHeight: '20px', width: '15%' }}>{"октябрь 2009 - ноябрь 2011"}</span>
              <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
                <span style={{ fontWeight: 'bold', marginBottom: '16px' }}>{"ИП Иванов К.Ю."}</span>
                <span style={{ lineHeight: '20px' }}>{"Viverra eu vitae quis sed in ut diam. Elit nunc pulvinar montes et morbi morbi duis leo est. Iaculis eget leo amet sit. Egestas viverra arcu et amet ut diam quis. Nisl leo in lectus eget commodo mauris sed. Et ut aliquam sed nisl nisl ultricies. Massa leo viverra massa quis. Adipiscing quam maecenas a aliquam. Nisl in facilisis sed tellus. Vulputate augue integer mauris tortor"}</span>
              </div>
            </ReviewsContent>

          </React.Fragment> }

          {/* ---------------------------------------- */}
          {/* модуль команды пользователя */}
          {/* ---------------------------------------- */}

          { profileViewStep === 'team' && <React.Fragment>

            { false && <ReviewsContentLine style={{ marginTop: '16px', marginBottom: '24px' }}>
              <span style={{ fontSize: '20px', fontWeight: 'bold', margin: '0', marginRight: '18px' }}>Вас пригласили</span>
            </ReviewsContentLine> }
            { false && <ReviewsContent 
              style={{ 
                marginTop: '0px', 
                flexDirection: 'row', 
                alignItems: 'flex-start', 
                justifyContent: 'space-between',
                marginBottom: '10px',
                padding: '20px 30px'
              }}
            >
              <ReviewsContentLine>
                <div 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    position: 'relative',
                    justifyContent: 'space-around',
                    width: '84px',
                    height: '84px' 
                  }}
                >
                  <img
                    alt={""}
                    src={avatarTwo}
                    style={{ width: '84px' }}
                  />
                  <span
                    style={{
                      display: 'block',
                      position: 'absolute',
                      top: '100%',
                      left: '100%',
                      marginTop: '-17px',
                      marginLeft: '-17px',
                      width: '15px',
                      height: '15px',
                      borderRadius: '50%',
                      backgroundColor: 'rgb(0, 191, 168)',
                    }}
                  />
                </div>
              </ReviewsContentLine>
            </ReviewsContent> }
            <ReviewsContentLine style={{ marginTop: '16px', marginBottom: '24px' }}>
              <span style={{ fontSize: '20px', fontWeight: 'bold', margin: '0', marginRight: '18px' }}>Ваша команда</span>
              <img
                alt={""}
                src={infoGrey}
              />
            </ReviewsContentLine>

            { EXECUTORS_LIST.map((item: { 
              id: string,
              name: string,
              rate: number,
              stat: Array<number>,
              tags: Array<string>,
              jobType: string,
              role: string }, index: number): ReactElement => {
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
                  forCabinet={true}
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

            { EXECUTORS_LIST.map((item: { 
              id: string,
              name: string,
              rate: number,
              stat: Array<number>,
              tags: Array<string>,
              jobType: string,
              role: string }, index: number): ReactElement => {
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

          {/* ---------------------------------------- */}
          {/* модуль команды пользователя */}
          {/* ---------------------------------------- */}

          { profileViewStep === 'settings' && <React.Fragment>

            <ReviewsContent 
              style={{ 
                marginTop: '0px',  
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '24px'
              }}
            >
              <ReviewsContentLine>
                <span style={{ fontWeight: 'bold' }}>Сменить пароль</span>
              </ReviewsContentLine>
              <ReviewsContentLine style={{ marginTop: '20px' }}>
                <InputComponent
                  type={'TEXT_INPUT_OUTLINE_PASSWORD_VISIBILITY'}
                  valueType='text'
                  defaultValue='Qwerty12345!!'
                  required={false}
                  widthType={'%'}
                  widthValue={50}
                  heightValue={'50px'}
                  label={"Введите ваш пароль"}
                  isError={authDataPassError}
                  isDisabled={false}
                  labelShrinkLeft={"0px"}
                  innerLabel={null}
                  store={[ authDataPass, changePass ]}
                  css={{
                    fontSize: '12px',
                    position: 'relative',
                    boxSizing: 'border-box',
                  }}
                />
                <span style={{ width: '20px' }}/>
                <span style={{ width: '50%' }}/>
              </ReviewsContentLine>
              <ReviewsContentLine style={{ marginTop: '20px' }}>
                <InputComponent
                  type={'TEXT_INPUT_OUTLINE'}
                  valueType='text'
                  required={false}
                  widthType={'%'}
                  widthValue={50}
                  heightValue={'50px'}
                  label={"Выбор года"}
                  isError={false}
                  isDisabled={false}
                  labelShrinkLeft={"0px"}
                  innerLabel={null}
                  store={[ "2023", () => null ]}
                  css={{
                    fontSize: '12px',
                    position: 'relative',
                    boxSizing: 'border-box',
                    marginBottom: '0px',
                    backgroundColor: 'white',
                  }}
                />  
                <span style={{ width: '20px' }}/>
                <InputComponent
                  type={'TEXT_INPUT_OUTLINE'}
                  valueType='text'
                  required={false}
                  widthType={'%'}
                  widthValue={50}
                  heightValue={'50px'}
                  label={"Выбор года"}
                  isError={false}
                  isDisabled={false}
                  labelShrinkLeft={"0px"}
                  innerLabel={null}
                  store={[ "2023", () => null ]}
                  css={{
                    fontSize: '12px',
                    position: 'relative',
                    boxSizing: 'border-box',
                    marginBottom: '0px',
                    backgroundColor: 'white',
                  }}
                />  
              </ReviewsContentLine>
              <ReviewsContentLine style={{ justifyContent: 'space-around', marginTop: '36px', marginBottom: '16px' }}>
                <ButtonComponent
                  inner={"Сохранить изменения"} 
                  type='CONTAINED_DEFAULT' 
                  action={() => {}}
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
              </ReviewsContentLine>
            </ReviewsContent>
            <ReviewsContent 
              style={{ 
                marginTop: '0px',  
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '24px'
              }}
            >
              <ReviewsContentLine>
                <span style={{ fontWeight: 'bold' }}>Удаление профиля</span>
              </ReviewsContentLine>
              <ReviewsContentLine style={{ marginTop: '18px' }}>
                <span style={{ lineHeight: '20px' }}>{"Это действие отменить нельзя. Удалить профиль можно, если у вас нет активных заказов, вы не являетесь участником спора и на вашм счету нет замороженных и доступных денежных средств"}</span>
              </ReviewsContentLine>
              <ReviewsContentLine style={{ justifyContent: 'space-around', marginTop: '34px', marginBottom: '16px' }}>
                <ButtonComponent
                  inner={"Удалить профиль"} 
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
                    backgroundColor: blueColor2,
                    color: 'white',
                    width: '56px',
                    height: '43px',
                  }}
                />
              </ReviewsContentLine>
            </ReviewsContent>
            <ReviewsContent 
              style={{ 
                marginTop: '0px',  
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '24px'
              }}
            >
              <ReviewsContentLine>
                <span style={{ fontWeight: 'bold' }}>Настройка уведомлений</span>
              </ReviewsContentLine>
            </ReviewsContent>

          </React.Fragment> }

        </ContentContainerLocal>
      </ContentContainer>
    </ContentArea>
  )

}

export default ExecutorProfilePage