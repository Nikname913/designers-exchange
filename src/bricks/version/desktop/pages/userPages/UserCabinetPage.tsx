import React, { ReactElement, useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Fade } from '@mui/material'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import EmailIcon from '@mui/icons-material/Email'
import { styled } from '@mui/material/styles'
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { setShow, setShowType } from '../../../../store/slices/right-content-slice'
import { setSeri, 
  setNumber as setNumPas, 
  setFocused as setFocusedPas,
  setWho, 
  setDate,
  setAdress, 
  setSnils, 
  setBorth,
  setInn } from '../../../../store/slices/passport-slice'
import { setPostAddress } from '../../../../store/slices/bussData-slice'
import { setUpdating } from '../../../../store/slices/data-update-slice'
import CabinetAlarmLine from '../../views/localViews/CabinetAlarmLine'
import InputComponent from '../../comps/input/Input'
import SelectField from '../../comps/select/SelectField'
import ButtonComponent from '../../comps/button/Button'
import CustomerExecutorCardPreview from '../../views/localViews/CustomerExecutorCardPrev'
import Pagintation from '../../services/pagination.service'
import RequestActionsComponent from '../../services/request.service'
import cssContentArea from '../../styles/views/contentArea.css'
import cssProfileHeader from '../../styles/views/profileHeader.css'
import cssProfileAside from '../../styles/pages/execProfilePageAside.css'
import cssProfilePage from '../../styles/pages/execProfilePage.css'
import { CSSProperties } from 'styled-components'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { green } from '@mui/material/colors'
import ReportIcon from '@mui/icons-material/Report'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab'
import CheckIcon from '@mui/icons-material/Check'
import SaveIcon from '@mui/icons-material/Save'
import CircularProgress from '@mui/material/CircularProgress'

import bearAvatar from '../../../../img/avatars/bear.svg'
import enotAvatar from '../../../../img/avatars/enot.svg'
import foxAvatar from '../../../../img/avatars/fox.svg'
import groupAvatar from '../../../../img/avatars/group.svg'
import manAvatar from '../../../../img/avatars/man.svg'
import womanAvatar from '../../../../img/avatars/woman.svg'

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

  [`& .${tooltipClasses.arrow}`]: { color: theme.palette.common.white },
  
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
  const { viewtype } = useParams()
  const navigate = useNavigate()

  const USER_ROLE = useAppSelector(state => state.roleTypeReducer.activeRole)
  const USER_ID = useAppSelector(state => state.roleTypeReducer.roleData.userID)
  const EXECUTOR = useAppSelector(state => state.userContentReducer.USERS_DATA.listExecutors)
    .filter((executor: any) => executor.clientId === USER_ID)
  const CUSTOMER = useAppSelector(state => state.userContentReducer.USERS_DATA.listCustomers)
    .filter((customer: any) => customer.clientId === USER_ID)
  const TASK_DATA = useAppSelector(state => state.taskContentReducer.TASKS_DATA)

  const alertData = useAppSelector(state => state.headerReducer.alertData)
  const avatarFile = useAppSelector(state => state.avatarReducer.avatarFile)

  const yelloColor = useAppSelector(state => state.theme.yellow)
  const greenColor = useAppSelector(state => state.theme.green)
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

  const passportSeri = useAppSelector(state => state.passportReducer.seri)
  const passportNumber = useAppSelector(state => state.passportReducer.number)
  const passportWho = useAppSelector(state => state.passportReducer.who)
  const passportDate = useAppSelector(state => state.passportReducer.date)
  const passportAdress = useAppSelector(state => state.passportReducer.adress)
  const passportSnils = useAppSelector(state => state.passportReducer.snils)
  const passportBorth = useAppSelector(state => state.passportReducer.borth)
  const passportInn = useAppSelector(state => state.passportReducer.inn)

  const SHORT_NAME = useAppSelector(state => state.bussDataReducer.shortName)
  const FULL_NAME = useAppSelector(state => state.bussDataReducer.fullName)
  const BUSS_INN = useAppSelector(state => state.bussDataReducer.inn)
  const BUSS_KPP = useAppSelector(state => state.bussDataReducer.kpp)
  const BUSS_OGRN = useAppSelector(state => state.bussDataReducer.ogrn)
  const YUR_ADDRESS = useAppSelector(state => state.bussDataReducer.yurAddress)
  const POST_ADDRESS = useAppSelector(state => state.bussDataReducer.postAddress)
  const BOSS_NAME = useAppSelector(state => state.bussDataReducer.boss.name)
  const BOSS_TYPE = useAppSelector(state => state.bussDataReducer.boss.type)

  const [ addressIP, setAddressIP ] = useState<{
    ip: string,
    city: string,
    country_code: string,
    country_name: string,
    postal: string,
    time: string
  }>()

  const [ ,setPassportSeriLocal ] = useState<string>('')
  const [ ,setPassportNumberLocal ] = useState<string>('')
  const [ ,setPassportWhoLocal ] = useState<string>('')
  const [ ,setPassportDateLocal ] = useState<any>('')
  const [ ,setPassportAdressLocal ] = useState<string>('')
  const [ ,setPassportSnilsLocal ] = useState<string>('')
  const [ ,setPassportInnLocal ] = useState<string>('')

  const [ authDataPass, setAuthDataPass ] = useState<string>('Qwerty12345')
  const [ authDataPassError, setAuthDataPassError ] = useState<boolean>(false)
  const [ disablePassportInputs, setDisablePassportInputs ] = useState<boolean>(true)
  const [ tagsSpredLine, setTextSpredLine ] = useState<string>('')

  const [ DOCS_REQUEST, SET_DOCS_REQUEST ] = useState(false)
  const [ COMPANY_REQUEST, SET_COMPANY_REQUEST ] = useState(false)
  const [ BORTH_REQUEST, SET_BORTH_REQUEST ] = useState(false)
  const [ REMOVE_ALARM, SET_REMOVE_ALARM ] = useState(false)

  const [ loadingBio, setLoadingbio ] = React.useState(false)
  const [ successBio, setSuccessBio ] = React.useState(false)
  const [ loading, setLoading ] = React.useState(false)
  const [ success, setSuccess ] = React.useState(false)

  const [ addressCheck, setAddressCheck ] = React.useState<boolean>(false)
  const [ bossTypeOne, setBossTypeOne ] = React.useState<boolean>(false)
  const [ bossTypeTwo, setBossTypeTwo ] = React.useState<boolean>(false)

  const [ alarmOrder, setAlarmOrder ] = React.useState<string>('')

  const timer = useRef<number>()
  const indicatorElement = useRef<any>()

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

  const buttonSx = {
    ...(success ? {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      }
    } : {
      bgcolor: 'rgb(22, 124, 191)',
      '&:hover': {
        bgcolor: 'rgb(22, 124, 191)',
      }
    }),
  };

  function editProfile(): void {
    dispatch(setShow(true))
    dispatch(setShowType('EditProfileCC'))
  }
  function editProjectsCases(): void {
    dispatch(setShow(true))
    dispatch(setShowType('EditProjectsCC'))
  }
  function editEducationCases(): void {
    dispatch(setShow(true))
    dispatch(setShowType('EditEducationCC'))
  }

  const changePass = (param: string): void => {
    setAuthDataPass(param)
    setAuthDataPassError(false)
  }

  const generateFaceType = (param: string): string => {
    if ( param === 'SELF_FACE' ) return 'Самозанятый'
    if ( param === 'PHIS_FACE' ) return 'Физическое лицо'
    if ( param === 'IP_FACE' ) return 'Юридическое лицо'
    if ( param === 'IP_FACER' ) return 'Индивидуальный предприниматель'

    return 'Юридическое лицо'
  }

  const updateDocs = () => {

    if (!loading) {
      setSuccess(false)
      setLoading(true)
      timer.current = window.setTimeout(() => {
        setSuccess(true)
        setLoading(false)
      }, 1300)
    }

    SET_DOCS_REQUEST(true)
    setDisablePassportInputs(true)

    setTimeout(() => {
      SET_DOCS_REQUEST(false)
      false && dispatch(setSeri(''))
      false && dispatch(setNumPas(''))
      false && dispatch(setFocusedPas(''))
      false && dispatch(setWho(''))
      false && dispatch(setDate(''))
      false && dispatch(setAdress(''))
      false && dispatch(setSnils(''))
      false && dispatch(setInn(''))

    }, 1300)

  }

  const updateCompany = () => {

    if (!loading) {
      setSuccess(false)
      setLoading(true)
      timer.current = window.setTimeout(() => {
        setSuccess(true)
        setLoading(false)
      }, 1300)
    }

    SET_COMPANY_REQUEST(true)
    setDisablePassportInputs(true)

    setTimeout(() => {
      SET_COMPANY_REQUEST(false)
    }, 1300)

  }

  const updateBorth = () => {

    if (!loadingBio) {
      setSuccessBio(false)
      setLoadingbio(true)
      timer.current = window.setTimeout(() => {
        setSuccessBio(true)
        setLoadingbio(false)
      }, 1300)
    }

    SET_BORTH_REQUEST(true)

    setTimeout(() => {
      SET_BORTH_REQUEST(false)
      false && dispatch(setSeri(''))
      false && dispatch(setNumPas(''))
      false && dispatch(setFocusedPas(''))
      false && dispatch(setWho(''))
      false && dispatch(setDate(''))
      false && dispatch(setAdress(''))
      false && dispatch(setSnils(''))
      false && dispatch(setInn(''))

    }, 1300)

  }

  const removeInviteAlarm = (param: string): void => {

    setAlarmOrder(param)

    SET_REMOVE_ALARM(true)
    setTimeout(() => {
      SET_REMOVE_ALARM(false)
    }, 1300)

  }

  const getDataIP = async () => {

    fetch('http://ipwho.is/')
      .then(res => res.json())
      .then(
        (data: {
          ip: string,
          city: string,
          country_code: string,
          country: string,
          latitude: number,
          longitude: number,
          postal: string,
          timezone: {
            current_time: string
          }
        }): PromiseLike<never> | void => {

          console.log(data)

          setAddressIP({
            ip: data.ip,
            city: data.city,
            country_code: data.country_code,
            country_name: data.country,
            postal: data.postal,
            time: data.timezone.current_time.split('T')[1].split('+')[0]
          })
        })

  }

  useEffect(() => {

    USER_ROLE === 'EXECUTOR' && false && console.log(EXECUTOR)
    USER_ROLE === 'CUSTOMER' && false && console.log(CUSTOMER)
    false && console.log(USER_ID)

  },[ CUSTOMER, EXECUTOR, USER_ID, USER_ROLE ])

  useEffect(() => {

    USER_ROLE === 'EXECUTOR' && false && setPassportSeriLocal(EXECUTOR[0].docs.passport.series)
    USER_ROLE === 'EXECUTOR' && false && setPassportNumberLocal(EXECUTOR[0].docs.passport.number)
    USER_ROLE === 'EXECUTOR' && false && setPassportDateLocal(EXECUTOR[0].docs.passport.date)
    USER_ROLE === 'EXECUTOR' && false && setPassportAdressLocal(EXECUTOR[0].docs.adress)
    USER_ROLE === 'EXECUTOR' && false && setPassportWhoLocal(EXECUTOR[0].docs.passport.whoGet)
    USER_ROLE === 'EXECUTOR' && false && setPassportSnilsLocal(EXECUTOR[0].docs.snils)
    USER_ROLE === 'EXECUTOR' && false && setPassportInnLocal(EXECUTOR[0].docs.inn)
    USER_ROLE === 'EXECUTOR' && false && setPassportInnLocal(EXECUTOR[0].docs.inn)

  }, [ EXECUTOR, USER_ROLE ])

  // ------------------------------------------------------------------
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => console.log(EXECUTOR[0].faceType), [])
  // ------------------------------------------------------------------

  useEffect(() => {

    false && console.log(passportInn)

    return () => {
      clearTimeout(timer.current)
    }
  }, [ passportInn ])
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { dispatch(setUpdating(true)) }, [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { addressCheck && dispatch(setPostAddress('')) }, [ addressCheck ])

  useEffect(() => { getDataIP() }, [])
  useEffect(() => {

    indicatorElement.current.style.transition = 'all 300ms'

    const indicatorRound = setInterval(() => {
      indicatorElement.current.style.filter === 'grayscale(0)'
        ? indicatorElement.current.style.filter = 'grayscale(0.8)'
        : indicatorElement.current.style.filter = 'grayscale(0)'
    }, 800)

    return () => {
      clearInterval(indicatorRound)
    }

  }, [])

  useEffect(() => {

    viewtype === 'about' && setProfileViewStep('about')
    viewtype === 'about-full' && setProfileViewStep('allAbout')
    viewtype === 'wallet' && setProfileViewStep('wallet')
    viewtype === 'alarms' && setProfileViewStep('alarms')
    viewtype === 'docs' && setProfileViewStep('documents')
    viewtype === 'cases' && setProfileViewStep('portfolio')
    viewtype === 'education' && setProfileViewStep('education')
    viewtype === 'team' && setProfileViewStep('settings')
    viewtype === 'settings' && setProfileViewStep('settings')

  }, [ viewtype ])

  useEffect(() => {

    console.log(profileViewStep)
    console.log(viewtype)

  }, [ profileViewStep, viewtype ])

  return (
    <React.Fragment>

      { DOCS_REQUEST && USER_ROLE && <RequestActionsComponent

        callbackAction={() => {}}
        requestData={{
          type: 'POST',
          urlstring: '/add-user-docs',
          body: {
            clientId: USER_ID,
            series: passportSeri,
            number: passportNumber,
            date: passportDate,
            whoGet: passportWho,
            adress: passportAdress,
            snils: passportSnils,
            inn: passportInn
          }
        }}
      
      /> }

      { COMPANY_REQUEST && USER_ROLE && <RequestActionsComponent

        callbackAction={() => {}}
        requestData={{
          type: 'POST',
          urlstring: '/add-user-company',
          body: {
            clientId: USER_ID,
            shortName: SHORT_NAME,
            fullName: FULL_NAME,
            inn: BUSS_INN,
            kpp: BUSS_KPP,
            ogrn: BUSS_OGRN,
            yurAddress: YUR_ADDRESS,
            postAddress: addressCheck ? YUR_ADDRESS : POST_ADDRESS,
            bossName: BOSS_NAME,
            bossType: BOSS_TYPE
          }
        }}
      
      /> }

      { BORTH_REQUEST && USER_ROLE && <RequestActionsComponent

        callbackAction={() => {}}
        requestData={{
          type: 'POST',
          urlstring: '/add-user-borth',
          body: {
            clientId: USER_ID,
            borth: passportBorth
          }
        }}
      
      /> }

      { REMOVE_ALARM && <RequestActionsComponent

        callbackAction={() => {}}
        requestData={{
          type: 'POST',
          urlstring: '/remove-alarm-system',
          body: {
            userId: USER_ID, 
            order: alarmOrder,
            actions: 'INVITE_ON_ORDER'
          }
        }}
      
      /> }

      { USER_ROLE === 'EXECUTOR' ? <ContentArea
        flexDirection={null}
        alignItems={null}
        justify={null}
      >
        <HeaderContainer>
          <LeftContainer>
            <BootstrapTooltip 
              title="Вы онлайн"
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
                { avatarFile === 404 && <img
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
                    EXECUTOR[0].avatar === '1' ? { width: '100px', marginTop: '9px' } :
                    EXECUTOR[0].avatar === '2' ? { width: '100px' } :
                    EXECUTOR[0].avatar === '3' ? { width: '90px', marginTop: '3px' } :
                    EXECUTOR[0].avatar === '4' ? { width: '140px', marginTop: '44px' } :
                    EXECUTOR[0].avatar === '5' ? { width: '100px', marginTop: '36px' } :
                    EXECUTOR[0].avatar === '6' ? { width: '100px', marginTop: '36px'  } : 
                    { width: '100px', marginTop: '6px' }
                  }
                /> }
                { avatarFile === 200 && <img
                  alt={""}
                  src={`http://localhost:3000/techDocs/${USER_ID}.avatar.jpg`}
                  style={{ height: '100%' }}
                /> }
              </div>
            </BootstrapTooltip>
            <AvatarIndicator ref={indicatorElement} background={true ? greenColor : yelloColor}/>
          </LeftContainer>
          <RightContainer>
            <div style={flexDivCSS}>
              <ContentLine>
                { ( EXECUTOR[0].faceType !== 'PHIS_FACE' && EXECUTOR[0].faceType !== 'SELF_FACE' ) 
                  
                  && <h2 style={{ fontSize: '30px', margin: 0 }}>{ EXECUTOR[0].bio.name }</h2>
                
                }
                { ( EXECUTOR[0].faceType === 'PHIS_FACE' || EXECUTOR[0].faceType === 'SELF_FACE' ) 
                  
                  && <h2 style={{ fontSize: '30px', margin: 0 }}>{ EXECUTOR[0].bio.name + ' ' + EXECUTOR[0].bio.surname }</h2>
                
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
                  { EXECUTOR[0].faceType 
                    ? generateFaceType(EXECUTOR[0].faceType) 
                    : generateFaceType('') }
                </span>
              </ContentLine>
              <ContentLine style={{ marginTop: '10px' }}>
                <span style={{ color: greyColor2 }}>{"Исполнитель на бирже с 2023 года"}</span>
              </ContentLine>
              <ContentLine style={{ marginTop: '10px' }}>
                <span 
                  style={{ 
                    color: greyColor2, 
                    fontSize: '12px', 
                    marginRight: '20px' 
                  }}
                ><i style={{ fontSize: '15px', fontStyle: 'normal', color: greyColor, fontWeight: 'bold', marginRight: '8px' }}>
                  { TASK_DATA.listOrdersComplete.filter(order => order.executor === USER_ID).length }  
                </i>выполнено</span>
                <span 
                  style={{ 
                    color: greyColor2, 
                    fontSize: '12px', 
                    marginRight: '20px' 
                  }}
                ><i style={{ fontSize: '15px', fontStyle: 'normal', color: greyColor, fontWeight: 'bold', marginRight: '8px' }}>
                  { TASK_DATA.listOrders.filter(order => order.executor === USER_ID).length }
                </i>в работе</span>
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
                  style={{ display: 'block', marginLeft: '44px', marginTop: '-18px', cursor: 'pointer' }}
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
                  <span style={{ fontSize: '40px', marginLeft: '5px' }}>{"5.00"}</span>
                </div>
                <span style={{ color: greyColor2, fontSize: '12px', marginTop: '5px' }}>{"0 отзывов"}</span>
              </div>
            </div>
          </RightContainer>
        </HeaderContainer>
        <ContentContainer>
          <MenuContainer>
            <LeftMenuIconButton 
              onClick={() => {
                setProfileViewStep('about')
                navigate('/exec-office/about')
              }}
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
              onClick={() => {
                setProfileViewStep('allAbout')
                navigate('/exec-office/about-full')
              }}
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
              onClick={() => {
                setProfileViewStep('wallet')
                navigate('/exec-office/wallet')
              }}
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
              onClick={() => {
                setProfileViewStep('alarms')
                navigate('/exec-office/alarms')
              }}
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
              onClick={() => {
                setProfileViewStep('documents')
                navigate('/exec-office/docs')
              }}
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
              onClick={() => {
                setProfileViewStep('portfolio')
                navigate('/exec-office/cases')
              }} 
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
              onClick={() => {
                setProfileViewStep('education')
                navigate('/exec-office/education')
              }} 
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
              onClick={() => {
                setProfileViewStep('settings')
                navigate('/exec-office/team')
              }} 
              backgroundColor={ 
                profileViewStep === 'team'
                  ? activeLeftMenuIconColor 
                  : 'transparent' 
                }  
            >
              <img
                alt={""}
                src={bag}
                style={{ width: '40px' }}
              />
              { false && <img
                alt={""}
                src={puzzle}
                style={{ width: '40px' }}
              /> }
              <span style={buttonLabelCSS}>Команда</span>
            </LeftMenuIconButton>
            <LeftMenuIconButton
              onClick={() => {
                setProfileViewStep('settings')
                navigate('/exec-office/settings')
              }} 
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

            { profileViewStep === 'about' && viewtype === 'about' && <TagsContent style={{ flexWrap: 'wrap' }}>
              { EXECUTOR[0].spec && EXECUTOR[0].spec.map(
                ( item: 
                       string                                                             | 
                       number                                                             | 
                       boolean                                                            | 
                       React.ReactElement<any, string | React.JSXElementConstructor<any>> | 
                       React.ReactFragment                                                | 
                       React.ReactPortal                                                  | 
                       null                                                               | 
                       undefined, 
                       index: any ) => {

                return (
                  <TagElement background={tagBackground}>{ item }</TagElement>
                )

              })}
              
              { EXECUTOR[0].spec && EXECUTOR[0].spec.length === 0 && 
              
                <TagElement background={tagBackground}>{ 'Загрузка специализации' + tagsSpredLine }</TagElement> 
                
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
                <span style={{ lineHeight: '20px' }}>
                  { EXECUTOR[0].aboutText && 
                    EXECUTOR[0].aboutText !== '' 
                      ? EXECUTOR[0].aboutText 
                      : "Заполните больше информации о себе и своих навыках, чтобы повысить шанс на решение заказчика в вашу пользу" }
                </span>
              </div>
            </TagsContent> }
            
            { profileViewStep === 'about' && viewtype === 'about' && <ReviewsContent style={{ marginBottom: '36px' }}>
              <ReviewsContentLine style={{ justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}>
                  <span style={{ fontSize: '20px', fontWeight: 'bold', margin: '0', marginRight: '30px' }}>Отзывы</span>
                  <span style={{ fontSize: '20px', fontWeight: 'bold', margin: '0', opacity: 0.4 }}>Оставленные мной</span>
                </div>
                <SelectField 
                  placeholder={"Сначала новые"}
                  params={{ width: 280, height: 50 }}
                  data={[
                    { value: '1', label: 'Сначала новые' }
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
              </ReviewsContentLine>
                  
              { EXECUTOR[0].reviews && EXECUTOR[0].reviews.map((item, index) => {

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
                        <span style={{ lineHeight: '22px' }}>{"Vel molestie turpis placerat platea nulla risus. Donec viverra sem eget sit quam. Mi massa aliquet leo orci eu condimentum vestibulum ante. Erat tortor suspendisse odio vitae mattis. Augue sapien pulvinar dolor cras etiam vitae et eu. Quam risus ornare in adipiscing orci nulla arcu laoreet. Ultrices velit bibendum pretium morbi sem ultrices"}</span>
                      </ReviewsContentLine>
                      <ReviewsContentLine></ReviewsContentLine>
                    </ReviewContainer>
                  </ReviewsContentLine>
                )

              })}

              { EXECUTOR[0].reviews && EXECUTOR[0].reviews.length === 0 && <ReviewsContentLine style={{ marginBottom: '20px' }}>
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

              <PagintationContainer style={{ marginBottom: '12px' }}>
                <span style={showMoreButtonCSS}>Загрузить еще</span>
                <Pagintation count={1}></Pagintation>
              </PagintationContainer>

            </ReviewsContent> }

            {/* ---------------------------------------- */}
            {/* модуль подробной информации о пользователе */}
            {/* ---------------------------------------- */}

            { profileViewStep === 'allAbout' && viewtype === 'about-full' && <React.Fragment>

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
                  label={ EXECUTOR[0].number === '' ? "Номер телефона не добавлен" : "" }
                  isError={false}
                  isDisabled={true}
                  labelShrinkLeft={"0px"}
                  innerLabel={null}
                  store={[ EXECUTOR[0].number, () => null ]}
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
                  isDisabled={true}
                  labelShrinkLeft={"0px"}
                  innerLabel={null}
                  store={[ EXECUTOR[0].mail, () => null ]}
                  css={{
                    fontSize: '12px',
                    position: 'relative',
                    boxSizing: 'border-box',
                    marginBottom: '0px',
                    marginTop: '0px',
                    backgroundColor: 'white'
                  }}
                />
                <img
                  alt={""}
                  src={correct}
                  style={{ 
                    display: 'block',
                    position: 'absolute',
                    left: '50%',
                    width: '26px',
                    marginLeft: '8px'
                  }}
                />
                <span style={{ display: 'block', width: '20px' }} />
                <div style={{ display: 'block', width: '50%' }} />
              </ReviewsContentLine>
              <ReviewsContentLine style={{ marginBottom: '18px', marginTop: '32px' }}>
                <span style={{ fontWeight: 'bold' }}>{"Локация пользователя"}</span>
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
                  store={[ addressIP?.country_name, () => null ]}
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
                  isDisabled={true}
                  labelShrinkLeft={"0px"}
                  innerLabel={null}
                  store={[ addressIP?.city, () => null ]}
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
              <ReviewsContentLine style={{ marginBottom: '20px', marginTop: '30px' }}>
                {( EXECUTOR[0].faceType === 'PHIS_FACE' || EXECUTOR[0].faceType === 'SELF_FACE' ) 
                
                  && <span style={{ fontWeight: 'bold' }}>{"Персональные данные физического лица"}</span> 

                } 
                {( EXECUTOR[0].faceType !== 'PHIS_FACE' && EXECUTOR[0].faceType !== 'SELF_FACE' ) 
                
                  && <span style={{ fontWeight: 'bold' }}>{"Юридическое лицо"}</span> 

                } 
              </ReviewsContentLine>
              {( EXECUTOR[0].faceType === 'PHIS_FACE' || EXECUTOR[0].faceType === 'SELF_FACE' ) && 
                <React.Fragment>
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
                      isDisabled={true}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ EXECUTOR[0].bio.surname, () => null ]}
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
                      isDisabled={true}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ EXECUTOR[0].bio.name, () => null ]}
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
                      isDisabled={true}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ EXECUTOR[0].bio.secondName, () => null ]}
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer 
                        sx={{ width: '50%' }} 
                        components={['DatePicker']}
                      >
                        <DatePicker 
                          sx={{ backgroundColor: 'white', width: '100%' }} 
                          label={"Дата рождения"} 
                          value={passportBorth}
                          onChange={(newValue: any) => dispatch(setBorth(newValue))}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <span style={{ display: 'block', width: '20px' }} />
                    <div style={{ display: 'block', width: '50%' }} />
                  </ReviewsContentLine>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '26px' }}>
                    <Box sx={{ m: 1, position: 'relative' }}>
                      <Fab
                        aria-label="save"
                        color="primary"
                        sx={buttonSx}
                        style={{
                          textTransform: 'none',
                          fontSize: '16px',
                          fontWeight: 'normal',
                        }}
                        onClick={updateBorth}
                      >
                        { successBio ? <CheckIcon /> : <SaveIcon /> }
                      </Fab>
                      { loadingBio && (
                        <CircularProgress
                          size={68}
                          sx={{
                            color: green[500],
                            position: 'absolute',
                            top: -6,
                            left: -6,
                            zIndex: 1,
                          }}
                        />
                      )}
                    </Box>
                    <Box sx={{ m: 1, position: 'relative' }}>
                      <Button
                        variant="contained"
                        sx={buttonSx}
                        style={{
                          width: '270px',
                          height: '43px',
                          textTransform: 'none',
                          fontSize: '16px',
                          fontWeight: 'normal',
                        }}
                        onClick={updateBorth}
                      >
                        { successBio ? "Изменения сохранены" : "Сохранить изменения" }
                      </Button>
                      { loadingBio && (
                        <CircularProgress
                          size={24}
                          sx={{
                            color: green[500],
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                  <ReviewsContentLine 
                    style={{ 
                      marginTop: '16px', 
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <img
                        alt={""}
                        src={correct}
                        style={{ filter: 'grayscale(1)' }}
                      />
                      <span 
                        style={{ 
                          fontWeight: 'bold', 
                          lineHeight: '32px',
                          marginLeft: '14px'
                        }}
                      >
                        {`Дата рождения - ${EXECUTOR[0].bio.borth}`}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <img
                        alt={""}
                        src={correct}
                        style={{ filter: 'grayscale(1)' }}
                      />
                      <span 
                        style={{ 
                          fontWeight: 'bold', 
                          lineHeight: '32px',
                          marginLeft: '14px'
                        }}
                      >
                        {`Паспорт серия - ${EXECUTOR[0].docs.passport.series}`}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <img
                        alt={""}
                        src={correct}
                        style={{ filter: 'grayscale(1)' }}
                      />
                      <span 
                        style={{ 
                          fontWeight: 'bold', 
                          lineHeight: '32px',
                          marginLeft: '14px'
                        }}
                      >
                        {`Паспорт номер - ${EXECUTOR[0].docs.passport.number}`}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <img
                        alt={""}
                        src={correct}
                        style={{ filter: 'grayscale(1)' }}
                      />
                      <span 
                        style={{ 
                          fontWeight: 'bold', 
                          lineHeight: '32px',
                          marginLeft: '14px'
                        }}
                      >
                        {`Паспорт дата выдачи - ${EXECUTOR[0].docs.passport.date}`}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <img
                        alt={""}
                        src={correct}
                        style={{ filter: 'grayscale(1)' }}
                      />
                      <span 
                        style={{ 
                          fontWeight: 'bold', 
                          lineHeight: '32px',
                          marginLeft: '14px'
                        }}
                      >
                        {`Кем выдан паспорт - ${EXECUTOR[0].docs.passport.whoGet}`}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <img
                        alt={""}
                        src={correct}
                        style={{ filter: 'grayscale(1)' }}
                      />
                      <span 
                        style={{ 
                          fontWeight: 'bold', 
                          lineHeight: '32px',
                          marginLeft: '14px'
                        }}
                      >
                        {`Адрес регистрации - ${EXECUTOR[0].docs.adress}`}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <img
                        alt={""}
                        src={correct}
                        style={{ filter: 'grayscale(1)' }}
                      />
                      <span 
                        style={{ 
                          fontWeight: 'bold', 
                          lineHeight: '32px',
                          marginLeft: '14px'
                        }}
                      >
                        {`Дополнительно СНИЛС - ${EXECUTOR[0].docs.snils}`}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <img
                        alt={""}
                        src={correct}
                        style={{ filter: 'grayscale(1)' }}
                      />
                      <span 
                        style={{ 
                          fontWeight: 'bold', 
                          lineHeight: '32px',
                          marginLeft: '14px'
                        }}
                      >
                        {`Дополнительно ИНН - ${EXECUTOR[0].docs.inn}`}
                      </span>
                      { EXECUTOR[0].docs.inn.indexOf('*') !== (-1) && <React.Fragment>
                        <ReportIcon style={{ color: '#d32f2f', marginLeft: '14px' }}/>
                        <span 
                          style={{ 
                            fontWeight: 'bold', 
                            lineHeight: '32px',
                            marginLeft: '6px',
                            color: '#d32f2f'
                          }}
                        >
                          {"Не соответствует паспорту"}
                        </span>
                      </React.Fragment> }
                    </div>
                    
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
                    >{"Ваши паспортные данные не подтверждены. Для подтверждения заполните все поля и прикрепите фотографии документов"}</span>
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
                    >{"Важно! Для корректной верификации вашего ИНН через базу данных ФНС вам необходимо заполнить настоящую дату рождения, а также полное ФИО"}</span>
                  
                  </ReviewsContentLine>
                  <ReviewsContentLine style={{ marginBottom: '20px', marginTop: '33px' }}>
                    <span 
                      style={{ fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => setDisablePassportInputs(false)}
                    >
                      {"Персональные данные - паспорт и документы | Разблокировать поля и перейти к заполнению"}
                    </span>
                  </ReviewsContentLine>
                  <ReviewsContentLine>
                    <InputComponent
                      type={'TEXT_INPUT_OUTLINE_DOCS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={50}
                      heightValue={'50px'}
                      label={"Паспорт серия"}
                      isError={false}
                      isDisabled={disablePassportInputs}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'PASSPORT_SERI', () => EXECUTOR[0].docs.passport.series ]}
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
                      type={'TEXT_INPUT_OUTLINE_DOCS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={50}
                      heightValue={'50px'}
                      label={"Паспорт номер"}
                      isError={false}
                      isDisabled={disablePassportInputs}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'PASSPORT_NUMBER', () => EXECUTOR[0].docs.passport.number ]}
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer 
                        sx={{ width: '50%' }} 
                        components={['DatePicker']}
                      >
                        <DatePicker 
                          sx={{ backgroundColor: 'white', width: '100%' }} 
                          label={"Дата выдачи документа"} 
                          value={passportDate}
                          onChange={newValue => dispatch(setDate(newValue))}
                          disabled={disablePassportInputs}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <span style={{ display: 'block', width: '20px' }} />
                    <div style={{ display: 'block', width: '50%' }} />
                  </ReviewsContentLine>
                  <ReviewsContentLine style={{ marginTop: '20px' }}>
                    <InputComponent
                      type={'TEXT_INPUT_OUTLINE_DOCS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={100}
                      heightValue={'50px'}
                      label={"Кем выдан"}
                      isError={false}
                      isDisabled={disablePassportInputs}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'PASSPORT_WHO_GET', () => EXECUTOR[0].docs.passport.whoGet ]}
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
                      type={'TEXT_INPUT_OUTLINE_DOCS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={100}
                      heightValue={'50px'}
                      label={"Адрес регистрации"}
                      isError={false}
                      isDisabled={disablePassportInputs}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'PASSPORT_ADRESS', () => null ]}
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
                      type={'TEXT_INPUT_OUTLINE_DOCS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={50}
                      heightValue={'50px'}
                      label={"СНИЛС"}
                      isError={false}
                      isDisabled={disablePassportInputs}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'PASSPORT_SNILS', () => EXECUTOR[0].docs.snils ]}
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
                      type={'TEXT_INPUT_OUTLINE_DOCS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={50}
                      heightValue={'50px'}
                      label={"ИНН"}
                      isError={false}
                      isDisabled={disablePassportInputs}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'PASSPORT_INN', () => EXECUTOR[0].docs.inn ]}
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
                </React.Fragment> }
                {( EXECUTOR[0].faceType !== 'PHIS_FACE' && EXECUTOR[0].faceType !== 'SELF_FACE' ) && 
                <React.Fragment>
                  <ReviewsContentLine>
                    <InputComponent
                      type={'TEXT_INPUT_OUTLINE_DOCS_BUSS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={100}
                      heightValue={'50px'}
                      label={ EXECUTOR[0].docs.shortName ? EXECUTOR[0].docs.shortName : "Краткое наименование организации"}
                      isError={false}
                      isDisabled={false}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'SHORT_NAME', () => {} ]}
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
                      type={'TEXT_INPUT_OUTLINE_DOCS_BUSS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={100}
                      heightValue={'50px'}
                      label={ EXECUTOR[0].docs.fullName ? EXECUTOR[0].docs.fullName : "Полное наименование организации"}
                      isError={false}
                      isDisabled={false}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'FULL_NAME', () => {} ]}
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
                      type={'TEXT_INPUT_OUTLINE_DOCS_BUSS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={33.33333}
                      heightValue={'50px'}
                      label={ EXECUTOR[0].docs.inn ? EXECUTOR[0].docs.inn : "ИНН"}
                      isError={false}
                      isDisabled={false}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'BUSS_INN', () => null ]}
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
                      type={'TEXT_INPUT_OUTLINE_DOCS_BUSS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={33.33333}
                      heightValue={'50px'}
                      label={ EXECUTOR[0].docs.kpp ? EXECUTOR[0].docs.kpp : "КПП"}
                      isError={false}
                      isDisabled={false}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'BUSS_KPP', () => null ]}
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
                      type={'TEXT_INPUT_OUTLINE_DOCS_BUSS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={33.33333}
                      heightValue={'50px'}
                      label={ EXECUTOR[0].docs.ogrn ? EXECUTOR[0].docs.ogrn : "ОГРН"}
                      isError={false}
                      isDisabled={false}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'BUSS_OGRN', () => null ]}
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
                      type={'TEXT_INPUT_OUTLINE_DOCS_BUSS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={100}
                      heightValue={'50px'}
                      label={ EXECUTOR[0].docs.yurAddress ? EXECUTOR[0].docs.yurAddress : "Юридический адрес"}
                      isError={false}
                      isDisabled={false}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'YUR_ADDRESS', () => {} ]}
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
                      type={'TEXT_INPUT_OUTLINE_DOCS_BUSS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={50}
                      heightValue={'50px'}
                      label={ EXECUTOR[0].docs.postAddress ? EXECUTOR[0].docs.postAddress : "Почтовый адрес"}
                      isError={false}
                      isDisabled={addressCheck}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'POST_ADDRESS', () => {} ]}
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
                    <FormGroup style={{ width: '50%' }}>
                      <FormControlLabel 
                        control={
                          <Checkbox 
                            checked={addressCheck} 
                            onChange={() => setAddressCheck(!addressCheck)} 
                          />
                        } 
                        label="Совпадает с юридическим"
                      />
                    </FormGroup>
                  </ReviewsContentLine>
                  <ReviewsContentLine style={{ marginTop: '20px' }}>
                    <InputComponent
                      type={'TEXT_INPUT_OUTLINE_DOCS_BUSS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={50}
                      heightValue={'50px'}
                      label={ EXECUTOR[0].docs.bossName ? EXECUTOR[0].docs.bossName : "ФИО генеральнрого директора"}
                      isError={false}
                      isDisabled={false}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'BOSS_NAME', () => {} ]}
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
                    <FormGroup style={{ width: '50%' }}>
                      <FormControlLabel 
                        control={
                          <Checkbox 
                            checked={bossTypeOne} 
                            onChange={() => { 
                              setBossTypeOne(!bossTypeOne)
                              setBossTypeTwo(false)
                            }}
                          />
                        } 
                        label="Действует на основании устава"
                      />
                      <FormControlLabel 
                        style={{ marginTop: '-6px' }} 
                        control={
                          <Checkbox
                            disabled
                            checked={bossTypeTwo} 
                            onChange={() => {
                              setBossTypeTwo(!bossTypeTwo)
                              setBossTypeOne(false)
                            }}
                          />
                        } 
                        label="Действует на основании приказа"
                      />
                    </FormGroup>
                  </ReviewsContentLine>
                </React.Fragment> }
              <ReviewsContentLine style={{ marginTop: '19px', marginBottom: '36px', justifyContent: 'space-between' }}>
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
                { ( EXECUTOR[0].faceType === 'PHIS_FACE' || EXECUTOR[0].faceType === 'SELF_FACE' ) && 
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ m: 1, position: 'relative' }}>
                      <Fab
                        aria-label="save"
                        color="primary"
                        sx={buttonSx}
                        style={{
                          textTransform: 'none',
                          fontSize: '16px',
                          fontWeight: 'normal',
                        }}
                        onClick={updateDocs}
                        disabled={disablePassportInputs}
                      >
                        { success ? <CheckIcon /> : <SaveIcon /> }
                      </Fab>
                      { loading && (
                        <CircularProgress
                          size={68}
                          sx={{
                            color: green[500],
                            position: 'absolute',
                            top: -6,
                            left: -6,
                            zIndex: 1,
                          }}
                        />
                      )}
                    </Box>
                    <Box sx={{ m: 1, position: 'relative' }}>
                      <Button
                        variant="contained"
                        sx={buttonSx}
                        style={{
                          width: '270px',
                          height: '43px',
                          textTransform: 'none',
                          fontSize: '16px',
                          fontWeight: 'normal',
                        }}
                        disabled={disablePassportInputs}
                        onClick={updateDocs}
                      >
                        { success ? "Изменения сохранены" : "Сохранить изменения" }
                      </Button>
                      { loading && (
                        <CircularProgress
                          size={24}
                          sx={{
                            color: green[500],
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                          }}
                        />
                      )}
                    </Box>
                  </Box> }
                  { ( EXECUTOR[0].faceType !== 'PHIS_FACE' && EXECUTOR[0].faceType !== 'SELF_FACE' ) && 
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ m: 1, position: 'relative' }}>
                      <Fab
                        aria-label="save"
                        color="primary"
                        sx={buttonSx}
                        style={{
                          textTransform: 'none',
                          fontSize: '16px',
                          fontWeight: 'normal',
                        }}
                        onClick={updateCompany}
                        disabled={false}
                      >
                        { success ? <CheckIcon /> : <SaveIcon /> }
                      </Fab>
                      { loading && (
                        <CircularProgress
                          size={68}
                          sx={{
                            color: green[500],
                            position: 'absolute',
                            top: -6,
                            left: -6,
                            zIndex: 1,
                          }}
                        />
                      )}
                    </Box>
                    <Box sx={{ m: 1, position: 'relative' }}>
                      <Button
                        variant="contained"
                        sx={buttonSx}
                        style={{
                          width: '270px',
                          height: '43px',
                          textTransform: 'none',
                          fontSize: '16px',
                          fontWeight: 'normal',
                        }}
                        disabled={false}
                        onClick={updateCompany}
                      >
                        { success ? "Изменения сохранены" : "Сохранить изменения" }
                      </Button>
                      { loading && (
                        <CircularProgress
                          size={24}
                          sx={{
                            color: green[500],
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                          }}
                        />
                      )}
                    </Box>
                  </Box> }
              </ReviewsContentLine>
            </React.Fragment> }

            {/* ---------------------------------------- */}
            {/* модуль платежных данных */}
            {/* ---------------------------------------- */}

            { profileViewStep === 'wallet' && viewtype === 'wallet' && <React.Fragment>

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
                  marginBottom: '20px'
                }}
              >{"Внимание! Функция работы кошелька напрямую связана с корректной работой системы с API платежной системы cloud payments"}</span>

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
                    <span style={{ fontSize: '28px', fontWeight: 'bold', color: blueColor }}>13 000₽</span>
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
                    <span style={{ color: greyColor2, fontSize: '28px', fontWeight: 'bold' }}>25 000₽</span>
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
                    isDisabled={true}
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
                    <span style={{ fontSize: '28px', fontWeight: 'bold', color: blueColor }}>13 000₽</span>
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
                    <span style={{ color: greyColor2, fontSize: '28px', fontWeight: 'bold' }}>25 000₽</span>
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
                    isDisabled
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
                  label={"Начало периода"}
                  isError={false}
                  isDisabled={true}
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
                  label={"Конец периода"}
                  isError={false}
                  isDisabled={true}
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
                  marginBottom: '38px', 
                  flexDirection: 'row', 
                  alignItems: 'flex-start',
                  justifyContent: 'space-between' 
                }}
              >
                <ReviewsContentLine>
                  <span style={{ width: '50%' }}>Пополнение кошелька</span>
                  <span style={{ width: '25%', color: greyColor2 }}>01.01.2023</span>
                  <span style={{ width: '25%', textAlign: 'right', fontWeight: 'bold' }}>+ 20 000 ₽</span>
                </ReviewsContentLine>
              </ReviewsContent>
            </React.Fragment> }

            {/* ---------------------------------------- */}
            {/* модуль уведомлений пользователя */}
            {/* ---------------------------------------- */}

            { profileViewStep === 'alarms' && viewtype === 'alarms' && <React.Fragment>

              { EXECUTOR[0].alertData?.map((item, index) => {

                return (
                  <React.Fragment key={index}>
                    <ReviewsContentLine>
                      <CabinetAlarmLine
                        // ----------------------------------------------------------------
                        // background={index === 0 ? "#FADCDC" : "#D9E7F0"}
                        // ----------------------------------------------------------------
                        background={index === 0 ? "#E8F0F6" : "#E8F0F6"}
                        isNew={true}
                        buttons={ item.actions === 'INVITE_ON_ORDER' ? [
                          <ButtonComponent
                            inner={"Принять"} 
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
                              marginRight: '12px'
                            }}
                          />,
                          <ButtonComponent
                            inner={"Отказаться"} 
                            type='CONTAINED_DEFAULT' 
                            action={() => {
                              removeInviteAlarm(item.order)
                            }}
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
                              height: '43px'
                            }}
                          />
                        ] : [
                          <span
                            style={{
                              position: 'relative',
                              boxSizing: 'border-box',
                              padding: '10px 16px 12px',
                              backgroundColor: 'transparent',
                              color: 'black',
                              width: '200px',
                              lineHeight: '18px',
                              border: '1px dashed grey',
                              opacity: 0.6,
                              fontSize: '13px',
                              textAlign: 'center',
                              borderRadius: '6px'
                            }}
                          >
                            Область под кнопки - но не кнопка
                          </span>
                        ]}
                        content={{
                          date: '[ Формат времени не совпадает ]',
                          text: item.message + '||' + ( item.fee ? item.fee : '---' ) + '||' + ( item.comment ? item.comment : '---' )
                        }}
                      />
                    </ReviewsContentLine>
                  </React.Fragment>
                )

              }) }

              { alertData.map((item, index) => {

                return (
                  <React.Fragment key={index}>
                    <ReviewsContentLine style={{ display: 'none' }}>
                      <CabinetAlarmLine
                        // ----------------------------------------------------------------
                        // background={index === 0 ? "#FADCDC" : "#D9E7F0"}
                        // ----------------------------------------------------------------
                        background={index === 0 ? "#E8F0F6" : "#E8F0F6"}
                        isNew={true}
                        buttons={[
                          <ButtonComponent
                            inner={"[ no action ]"} 
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
                          date: 'Загрузка данных...',
                          text: item.split('>>>>')[1].split('>>')[1].split('::')[1]
                        }}
                      />
                    </ReviewsContentLine>
                  </React.Fragment>
                )

              })}

              { alertData.map((item, index) => {

                return (
                  <React.Fragment key={index}>
                    <ReviewsContentLine style={{ display: 'none' }}>
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

              <ReviewsContentLine 
                style={{ 
                  justifyContent: 'space-around', 
                  color: greyColor, 
                  marginTop: '30px', 
                  marginBottom: '44px',
                  cursor: 'pointer' 
                }}
              >
                <span>{"Показать все"}</span>
              </ReviewsContentLine>

            </React.Fragment> }

            {/* ---------------------------------------- */}
            {/* модуль документов пользователя */}
            {/* ---------------------------------------- */}

            { profileViewStep === 'documents' && viewtype === 'docs' && <React.Fragment>

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
                  marginBottom: '20px'
                }}
              >{"Внимание! Вкладка документов будет содержать только раздел с формированием выписки, раздел электронной подписи будет скрыт"}</span>

              <ReviewsContent 
                style={{ 
                  marginTop: '0px',  
                  flexDirection: 'row', 
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '24px',
                  opacity: '0.6'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <img
                    alt={""}
                    src={pen}
                  />
                  <span style={{ fontWeight: 'bold', marginLeft: '20px' }}>Электронная подпись [ неактуальный элемент ]</span>
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
                      isDisabled
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
                    isDisabled={true}
                    labelShrinkLeft={"0px"}
                    innerLabel={null}
                    store={[ "2022", () => null ]}
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

            { profileViewStep === 'portfolio' && viewtype === 'cases' && <React.Fragment>

              { USER_ROLE === 'EXECUTOR' && EXECUTOR[0].portfolio?.length === 0 && 

                <span 
                  style={{ 
                    lineHeight: '23px', 
                    width: '100%',
                    marginTop: '18px',
                    marginBottom: '14px', 
                  }}
                >
                  Вы не добавили пока еще ни одного проекта в портфолио.<br/>
                  Расскажите о ваших завершенных проектах, приложите акты.
                </span>
              
              }  

              <div
                onClick={editProjectsCases} 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  marginTop: '14px',
                  marginBottom: '22px',
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
                    backgroundColor: blueColor3,
                    marginRight: '10px',
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
              { ( EXECUTOR[0].portfolio && EXECUTOR[0].portfolio?.length > 0 ) && EXECUTOR[0].portfolio.map(item => {

                return <ReviewsContent style={{ padding: '24px', alignItems: 'flex-start', marginTop: '0px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{ item.title }</span>
                  <img
                    alt={"Изображение для проекта"}
                    src={`http://localhost:3000/techPortfolio/${USER_ID}.case.jpg`}
                    style={{
                      display: 'block',
                      position: 'relative',
                      width: '80%',
                      marginBottom: '8px',
                      marginTop: '28px',
                      borderRadius: '4px'
                    }}
                  />
                  <ReviewsContentLine style={{ marginTop: '24px', alignItems: 'flex-start' }}>
                    <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 'bold', marginBottom: '10px' }}>Сроки выполнения</span>
                      <span>{ item.startMonth } { item.startYear } - { item.finishMonth } { item.finishYear }</span>
                    </div>
                    <div style={{ width: '50%' }}>
                      <span style={{ fontWeight: 'bold' }}>Акты и оплата</span>
                      <div style={{ marginTop: '10px' }}>
                        <span style={{ fontWeight: 'bold', marginRight: '24px' }}>{ item.coast }₽</span>
                        <span>Вложение с актом отсутствует</span>
                      </div>
                    </div>
                  </ReviewsContentLine>
                  <ReviewsContentLine style={{ marginTop: '24px', alignItems: 'flex-start' }}>
                    <div style={{ width: '50%' }}>
                      <span style={{ fontWeight: 'bold' }}>Параметры объекта</span>
                      <div style={{ marginTop: '10px' }}>
                        <span style={{ marginRight: '24px', color: '#8E9DA7' }}>Площадь, кв.м</span>
                        <span>{ item.param1 }</span>
                      </div>
                      <div style={{ marginTop: '10px' }}>
                        <span style={{ marginRight: '24px', color: '#8E9DA7' }}>Высота объекта, м</span>
                        <span>{ item.param2 }</span>
                      </div>
                    </div>
                    <div style={{ width: '50%' }}>
                      <span style={{ fontWeight: 'bold', color: 'transparent' }}>---</span>
                      <div style={{ marginTop: '10px' }}>
                        <span style={{ marginRight: '24px', color: '#8E9DA7' }}>Этажность наземная</span>
                        <span>{ item.param3 }</span>
                      </div>
                      <div style={{ marginTop: '10px' }}>
                        <span style={{ marginRight: '24px', color: '#8E9DA7' }}>Регион</span>
                        <span>{ item.param4 }</span>
                      </div>
                    </div>
                  </ReviewsContentLine>
                  <ReviewsContentLine>
                    <span style={{ fontWeight: 'bold', marginBottom: '0px', marginTop: '24px' }}>Описание проекта</span>
                  </ReviewsContentLine>
                  <ReviewsContentLine style={{ marginTop: '16px' }}>
                    <span style={{ marginBottom: '0px', marginTop: '0px', lineHeight: '20px' }}>{ item.text }</span>
                  </ReviewsContentLine>
                  <ReviewsContentLine style={{ marginTop: '26px' }}>
                    { item.tags.map((spec: string) => <TagElement background={tagBackground}>{ spec }</TagElement>)}
                  </ReviewsContentLine>
                </ReviewsContent>

              })}

            </React.Fragment> }

            {/* ---------------------------------------- */}
            {/* модуль опыта и образования пользователя */}
            {/* ---------------------------------------- */}

            { profileViewStep === 'education' && viewtype === 'education' && <React.Fragment>

              <ReviewsContentLine style={{ marginBottom: '20px', marginTop: '14px', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold' }}>{"Образование"}</span>
                <span
                  onClick={editEducationCases} 
                  style={{ 
                    color: '#516674', 
                    cursor: 'pointer' 
                  }}
                >
                  {"Редактировать"}
                </span>
              </ReviewsContentLine>

              { USER_ROLE === 'EXECUTOR' && EXECUTOR[0].educationAndSkills?.length === 0 && 

                <span 
                  style={{ 
                    lineHeight: '23px', 
                    width: '100%',
                    marginTop: '0px',
                    marginBottom: '14px', 
                  }}
                >
                  Вы не добавили пока еще ни одного места обучения<br/>
                  Добавьте сюда оконченные учебные заведения и пройденные курсы
                </span>
              
              } 

              <div
                onClick={editEducationCases} 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  marginTop: '14px',
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
                    backgroundColor: blueColor3,
                    marginRight: '10px',
                  }}
                >
                  <img
                    alt={""}
                    src={plus}
                    style={{ display: 'block', width: '14px' }}
                  />
                </span>
                <span>Добавить новое место учебы</span>
              </div>

              { EXECUTOR[0].educationAndSkills?.filter(item => item.type === 'education')
                .map((item: any, index: number) => {

                return (
                  <ReviewsContent 
                    style={{ 
                      marginTop: index === 0 ? '26px' : '14px', 
                      flexDirection: 'row', 
                      alignItems: 'flex-start', 
                      justifyContent: 'space-between',
                    }}
                  >
                    <span style={{ width: '15%' }}>{ item.finish }</span>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
                      <span style={{ fontWeight: 'bold', marginBottom: '16px' }}>{ item.title }</span>
                      <span>{ item.special }</span>
                    </div>
                  </ReviewsContent>
                )

              })}

              <ReviewsContentLine style={{ marginBottom: '20px', marginTop: '50px', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold' }}>{"Опыт работы"}</span>
                <span
                  onClick={editEducationCases} 
                  style={{ 
                    color: '#516674', 
                    cursor: 'pointer' 
                  }}
                >
                  {"Редактировать"}
                </span>
              </ReviewsContentLine>

              { USER_ROLE === 'EXECUTOR' && EXECUTOR[0].educationAndSkills?.length === 0 && 

                <span 
                  style={{ 
                    lineHeight: '23px', 
                    width: '100%',
                    marginTop: '0px',
                    marginBottom: '14px', 
                  }}
                >
                  Вы не добавили пока еще ни одного места работы
                </span>
              
              }

              <div
                onClick={editEducationCases} 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  marginTop: '14px',
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
                    backgroundColor: blueColor3,
                    marginRight: '10px',
                  }}
                >
                  <img
                    alt={""}
                    src={plus}
                    style={{ display: 'block', width: '14px' }}
                  />
                </span>
                <span>Добавить новое место работы</span>
              </div>

              { EXECUTOR[0].educationAndSkills?.filter(item => item.type === 'skill')
                .map((item: any, index: number) => {

                return (
                  <ReviewsContent 
                    style={{ 
                      marginTop: index === 0 ? '26px' : '14px',  
                      flexDirection: 'row', 
                      alignItems: 'flex-start', 
                      justifyContent: 'space-between',
                    }}
                  >
                    <span style={{ lineHeight: '22px', width: '15%' }}>{ item.sy } - { item.fy }</span>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
                      <span style={{ fontWeight: 'bold', marginBottom: '10px' }}>{ item.title }</span>
                      <span style={{ fontWeight: 'bold', marginBottom: '16px', color: 'gray' }}>{ item.jobName }</span>
                      <span style={{ lineHeight: '22px' }}>{item.jobTasks}</span>
                    </div>
                  </ReviewsContent>
                )

              })}

            </React.Fragment> }

            {/* ---------------------------------------- */}
            {/* модуль команды пользователя */}
            {/* ---------------------------------------- */}

            { profileViewStep === 'team' && viewtype === 'team' && <React.Fragment>

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

              { EXECUTOR.map((item: {
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

              { EXECUTOR.map((item: {
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

            {/* ---------------------------------------- */}
            {/* модуль команды пользователя */}
            {/* ---------------------------------------- */}

            { profileViewStep === 'settings' && viewtype === 'settings' && <React.Fragment>

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
                    isDisabled={true}
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
                    type={'TEXT_INPUT_OUTLINE_PASSWORD_VISIBILITY'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={50}
                    heightValue={'50px'}
                    label={"Введите новый пароль"}
                    isError={false}
                    isDisabled={true}
                    labelShrinkLeft={"0px"}
                    innerLabel={null}
                    store={[ "", () => null ]}
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
                    type={'TEXT_INPUT_OUTLINE_PASSWORD_VISIBILITY'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={50}
                    heightValue={'50px'}
                    label={"Повторите новый пароль"}
                    isError={false}
                    isDisabled={true}
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

        {/* ---------------------------------------- */}
        {/* кабинет заказчика */}
        {/* ---------------------------------------- */}

      </ContentArea> : <ContentArea
        flexDirection={null}
        alignItems={null}
        justify={null}
      >
        <HeaderContainer>
          <LeftContainer>
            <BootstrapTooltip 
              title="Вы онлайн"
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
                { avatarFile === 404 && <img
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
                    CUSTOMER[0].avatar === '2' ? { width: '100px' } :
                    CUSTOMER[0].avatar === '3' ? { width: '90px', marginTop: '3px' } :
                    CUSTOMER[0].avatar === '4' ? { width: '140px', marginTop: '44px' } :
                    CUSTOMER[0].avatar === '5' ? { width: '100px', marginTop: '36px' } :
                    CUSTOMER[0].avatar === '6' ? { width: '100px', marginTop: '36px'  } : 
                    { width: '100px', marginTop: '6px' }
                  }
                /> }
                { avatarFile === 200 && <img
                  alt={""}
                  src={`http://localhost:3000/techDocs/${USER_ID}.avatar.jpg`}
                  style={{ height: '100%' }}
                /> }
              </div>
            </BootstrapTooltip>
            <AvatarIndicator ref={indicatorElement} background={true ? greenColor : yelloColor}/>
          </LeftContainer>
          <RightContainer>
            <div style={flexDivCSS}>
              <ContentLine>
                <h2 style={{ fontSize: '30px', margin: 0 }}>{ CUSTOMER[0].bio.name }</h2>
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
                  { CUSTOMER[0].faceType 
                    ? generateFaceType(CUSTOMER[0].faceType) 
                    : generateFaceType('') }
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
                ><i style={{ fontSize: '15px', fontStyle: 'normal', color: greyColor, fontWeight: 'bold', marginRight: '8px' }}>
                  { TASK_DATA.listOrdersComplete.filter(order => order.customer === USER_ID).length }    
                </i>выполнено</span>
                <span 
                  style={{ 
                    color: greyColor2, 
                    fontSize: '12px', 
                    marginRight: '20px' 
                  }}
                ><i style={{ fontSize: '15px', fontStyle: 'normal', color: greyColor, fontWeight: 'bold', marginRight: '8px' }}>
                  { TASK_DATA.listOrders.filter(order => order.customer === USER_ID).length }  
                </i>в работе</span>
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
              onClick={() => {
                setProfileViewStep('about')
                navigate('/cust-office/about')
              }}
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
              onClick={() => {
                setProfileViewStep('allAbout')
                navigate('/cust-office/about-full')
              }}
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
              onClick={() => {
                setProfileViewStep('wallet')
                navigate('/cust-office/wallet')
              }}
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
              onClick={() => {
                setProfileViewStep('alarms')
                navigate('/cust-office/alarms')
              }}
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
              onClick={() => {
                setProfileViewStep('documents')
                navigate('/cust-office/docs')
              }}
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
              onClick={() => {
                setProfileViewStep('portfolio')
                navigate('/cust-office/cases')
              }} 
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
              onClick={() => {
                setProfileViewStep('education')
                navigate('/cust-office/education')
              }} 
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
              onClick={() => {
                setProfileViewStep('settings')
                navigate('/cust-office/team')
              }} 
              backgroundColor={ 
                profileViewStep === 'team'
                  ? activeLeftMenuIconColor 
                  : 'transparent' 
                }  
            >
              <img
                alt={""}
                src={bag}
                style={{ width: '40px' }}
              />
              { false && <img
                alt={""}
                src={puzzle}
                style={{ width: '40px' }}
              /> }
              <span style={buttonLabelCSS}>Команда</span>
            </LeftMenuIconButton>
            <LeftMenuIconButton
              onClick={() => {
                setProfileViewStep('settings')
                navigate('/cust-office/settings')
              }} 
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

            { profileViewStep === 'about' && viewtype === 'about' && <TagsContent style={{ flexWrap: 'wrap' }}>
              { CUSTOMER[0].spec && CUSTOMER[0].spec.map(
                ( item: 
                       string                                                             | 
                       number                                                             | 
                       boolean                                                            | 
                       React.ReactElement<any, string | React.JSXElementConstructor<any>> | 
                       React.ReactFragment                                                | 
                       React.ReactPortal                                                  | 
                       null                                                               | 
                       undefined, 
                       index: any ) => {

                return (
                  <TagElement background={tagBackground}>{ item }</TagElement>
                )

              })}
              
              { CUSTOMER[0].spec && CUSTOMER[0].spec.length === 0 && 
              
                <TagElement background={tagBackground}>{ 'Загрузка специализации' + tagsSpredLine }</TagElement> 
                
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
                <span style={{ lineHeight: '20px' }}>
                  { CUSTOMER[0].aboutText && 
                    CUSTOMER[0].aboutText !== '' 
                      ? CUSTOMER[0].aboutText 
                      : "Заполните больше информации о себе или вашей компании" }
                </span>
              </div>
            </TagsContent> }
            
            { profileViewStep === 'about' && viewtype === 'about' && <ReviewsContent style={{ marginBottom: '36px' }}>
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
                  
              { CUSTOMER[0].reviews && CUSTOMER[0].reviews.map((item, index) => {

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
                        <span style={{ lineHeight: '22px' }}>{"Vel molestie turpis placerat platea nulla risus. Donec viverra sem eget sit quam. Mi massa aliquet leo orci eu condimentum vestibulum ante. Erat tortor suspendisse odio vitae mattis. Augue sapien pulvinar dolor cras etiam vitae et eu. Quam risus ornare in adipiscing orci nulla arcu laoreet. Ultrices velit bibendum pretium morbi sem ultrices"}</span>
                      </ReviewsContentLine>
                      <ReviewsContentLine></ReviewsContentLine>
                    </ReviewContainer>
                  </ReviewsContentLine>
                )

              })}

              { CUSTOMER[0].reviews && CUSTOMER[0].reviews.length === 0 && <ReviewsContentLine style={{ marginBottom: '20px' }}>
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

              <PagintationContainer style={{ marginBottom: '12px' }}>
                <span style={showMoreButtonCSS}>Загрузить еще</span>
                <Pagintation count={1}></Pagintation>
              </PagintationContainer>

            </ReviewsContent> }

            {/* ---------------------------------------- */}
            {/* модуль подробной информации о пользователе */}
            {/* ---------------------------------------- */}

            { profileViewStep === 'allAbout' && viewtype === 'about-full' && <React.Fragment>

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
                  label={ CUSTOMER[0].number === '' ? "Номер телефона не добавлен" : "" }
                  isError={false}
                  isDisabled={true}
                  labelShrinkLeft={"0px"}
                  innerLabel={null}
                  store={[ CUSTOMER[0].number, () => null ]}
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
                  isDisabled={true}
                  labelShrinkLeft={"0px"}
                  innerLabel={null}
                  store={[ CUSTOMER[0].mail, () => null ]}
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
              <ReviewsContentLine style={{ marginBottom: '18px', marginTop: '32px' }}>
                <span style={{ fontWeight: 'bold' }}>{"Локация пользователя"}</span>
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
                  store={[ addressIP?.country_name, () => null ]}
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
                  isDisabled={true}
                  labelShrinkLeft={"0px"}
                  innerLabel={null}
                  store={[ addressIP?.city, () => null ]}
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
              <ReviewsContentLine style={{ marginBottom: '20px', marginTop: '30px' }}>
                {( CUSTOMER[0].faceType === 'PHIS_FACE' || CUSTOMER[0].faceType === 'SELF_FACE' ) 
                
                  && <span style={{ fontWeight: 'bold' }}>{"Персональные данные физического лица"}</span> 

                } 
                {( CUSTOMER[0].faceType !== 'PHIS_FACE' && CUSTOMER[0].faceType !== 'SELF_FACE' ) 
                
                  && <span style={{ fontWeight: 'bold' }}>{"Юридическое лицо"}</span> 

                } 
              </ReviewsContentLine>
              {( CUSTOMER[0].faceType === 'PHIS_FACE' || CUSTOMER[0].faceType === 'SELF_FACE' ) && 
                <React.Fragment>
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
                      isDisabled={true}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ CUSTOMER[0].bio.surname, () => null ]}
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
                      isDisabled={true}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ CUSTOMER[0].bio.name, () => null ]}
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
                      isDisabled={true}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ CUSTOMER[0].bio.secondName, () => null ]}
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer 
                        sx={{ width: '50%' }} 
                        components={['DatePicker']}
                      >
                        <DatePicker 
                          sx={{ backgroundColor: 'white', width: '100%' }} 
                          label={"Дата рождения"} 
                          value={passportBorth}
                          onChange={(newValue: any) => dispatch(setBorth(newValue))}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <span style={{ display: 'block', width: '20px' }} />
                    <div style={{ display: 'block', width: '50%' }} />
                  </ReviewsContentLine>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '26px' }}>
                    <Box sx={{ m: 1, position: 'relative' }}>
                      <Fab
                        aria-label="save"
                        color="primary"
                        sx={buttonSx}
                        style={{
                          textTransform: 'none',
                          fontSize: '16px',
                          fontWeight: 'normal',
                        }}
                        onClick={updateBorth}
                      >
                        { successBio ? <CheckIcon /> : <SaveIcon /> }
                      </Fab>
                      { loadingBio && (
                        <CircularProgress
                          size={68}
                          sx={{
                            color: green[500],
                            position: 'absolute',
                            top: -6,
                            left: -6,
                            zIndex: 1,
                          }}
                        />
                      )}
                    </Box>
                    <Box sx={{ m: 1, position: 'relative' }}>
                      <Button
                        variant="contained"
                        sx={buttonSx}
                        style={{
                          width: '270px',
                          height: '43px',
                          textTransform: 'none',
                          fontSize: '16px',
                          fontWeight: 'normal',
                        }}
                        onClick={updateBorth}
                      >
                        { successBio ? "Изменения сохранены" : "Сохранить изменения" }
                      </Button>
                      { loadingBio && (
                        <CircularProgress
                          size={24}
                          sx={{
                            color: green[500],
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                  <ReviewsContentLine 
                    style={{ 
                      marginTop: '16px', 
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <img
                        alt={""}
                        src={correct}
                        style={{ filter: 'grayscale(1)' }}
                      />
                      <span 
                        style={{ 
                          fontWeight: 'bold', 
                          lineHeight: '32px',
                          marginLeft: '14px'
                        }}
                      >
                        {`Дата рождения - ${CUSTOMER[0].bio.borth}`}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <img
                        alt={""}
                        src={correct}
                        style={{ filter: 'grayscale(1)' }}
                      />
                      <span 
                        style={{ 
                          fontWeight: 'bold', 
                          lineHeight: '32px',
                          marginLeft: '14px'
                        }}
                      >
                        {`Паспорт серия - ${CUSTOMER[0].docs.passport.series}`}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <img
                        alt={""}
                        src={correct}
                        style={{ filter: 'grayscale(1)' }}
                      />
                      <span 
                        style={{ 
                          fontWeight: 'bold', 
                          lineHeight: '32px',
                          marginLeft: '14px'
                        }}
                      >
                        {`Паспорт номер - ${CUSTOMER[0].docs.passport.number}`}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <img
                        alt={""}
                        src={correct}
                        style={{ filter: 'grayscale(1)' }}
                      />
                      <span 
                        style={{ 
                          fontWeight: 'bold', 
                          lineHeight: '32px',
                          marginLeft: '14px'
                        }}
                      >
                        {`Паспорт дата выдачи - ${CUSTOMER[0].docs.passport.date}`}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <img
                        alt={""}
                        src={correct}
                        style={{ filter: 'grayscale(1)' }}
                      />
                      <span 
                        style={{ 
                          fontWeight: 'bold', 
                          lineHeight: '32px',
                          marginLeft: '14px'
                        }}
                      >
                        {`Кем выдан паспорт - ${CUSTOMER[0].docs.passport.whoGet}`}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <img
                        alt={""}
                        src={correct}
                        style={{ filter: 'grayscale(1)' }}
                      />
                      <span 
                        style={{ 
                          fontWeight: 'bold', 
                          lineHeight: '32px',
                          marginLeft: '14px'
                        }}
                      >
                        {`Адрес регистрации - ${CUSTOMER[0].docs.adress}`}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <img
                        alt={""}
                        src={correct}
                        style={{ filter: 'grayscale(1)' }}
                      />
                      <span 
                        style={{ 
                          fontWeight: 'bold', 
                          lineHeight: '32px',
                          marginLeft: '14px'
                        }}
                      >
                        {`Дополнительно СНИЛС - ${CUSTOMER[0].docs.snils}`}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <img
                        alt={""}
                        src={correct}
                        style={{ filter: 'grayscale(1)' }}
                      />
                      <span 
                        style={{ 
                          fontWeight: 'bold', 
                          lineHeight: '32px',
                          marginLeft: '14px'
                        }}
                      >
                        {`Дополнительно ИНН - ${CUSTOMER[0].docs.inn}`}
                      </span>
                      { CUSTOMER[0].docs.inn.indexOf('*') !== (-1) && <React.Fragment>
                        <ReportIcon style={{ color: '#d32f2f', marginLeft: '14px' }}/>
                        <span 
                          style={{ 
                            fontWeight: 'bold', 
                            lineHeight: '32px',
                            marginLeft: '6px',
                            color: '#d32f2f'
                          }}
                        >
                          {"Не соответствует паспорту"}
                        </span>
                      </React.Fragment> }
                    </div>
                    
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
                    >{"Ваши паспортные данные не подтверждены. Для подтверждения заполните все поля и прикрепите фотографии документов"}</span>
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
                    >{"Важно! Для корректной верификации вашего ИНН через базу данных ФНС вам необходимо заполнить настоящую дату рождения, а также полное ФИО"}</span>
                  
                  </ReviewsContentLine>
                  <ReviewsContentLine style={{ marginBottom: '20px', marginTop: '33px' }}>
                    <span 
                      style={{ fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => setDisablePassportInputs(false)}
                    >
                      {"Персональные данные - паспорт и документы | Разблокировать поля и перейти к заполнению"}
                    </span>
                  </ReviewsContentLine>
                  <ReviewsContentLine>
                    <InputComponent
                      type={'TEXT_INPUT_OUTLINE_DOCS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={50}
                      heightValue={'50px'}
                      label={"Паспорт серия"}
                      isError={false}
                      isDisabled={disablePassportInputs}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'PASSPORT_SERI', () => CUSTOMER[0].docs.passport.series ]}
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
                      type={'TEXT_INPUT_OUTLINE_DOCS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={50}
                      heightValue={'50px'}
                      label={"Паспорт номер"}
                      isError={false}
                      isDisabled={disablePassportInputs}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'PASSPORT_NUMBER', () => CUSTOMER[0].docs.passport.number ]}
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer 
                        sx={{ width: '50%' }} 
                        components={['DatePicker']}
                      >
                        <DatePicker 
                          sx={{ backgroundColor: 'white', width: '100%' }} 
                          label={"Дата выдачи документа"} 
                          value={passportDate}
                          onChange={newValue => dispatch(setDate(newValue))}
                          disabled={disablePassportInputs}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <span style={{ display: 'block', width: '20px' }} />
                    <div style={{ display: 'block', width: '50%' }} />
                  </ReviewsContentLine>
                  <ReviewsContentLine style={{ marginTop: '20px' }}>
                    <InputComponent
                      type={'TEXT_INPUT_OUTLINE_DOCS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={100}
                      heightValue={'50px'}
                      label={"Кем выдан"}
                      isError={false}
                      isDisabled={disablePassportInputs}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'PASSPORT_WHO_GET', () => CUSTOMER[0].docs.passport.whoGet ]}
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
                      type={'TEXT_INPUT_OUTLINE_DOCS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={100}
                      heightValue={'50px'}
                      label={"Адрес регистрации"}
                      isError={false}
                      isDisabled={disablePassportInputs}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'PASSPORT_ADRESS', () => null ]}
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
                      type={'TEXT_INPUT_OUTLINE_DOCS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={50}
                      heightValue={'50px'}
                      label={"СНИЛС"}
                      isError={false}
                      isDisabled={disablePassportInputs}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'PASSPORT_SNILS', () => CUSTOMER[0].docs.snils ]}
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
                      type={'TEXT_INPUT_OUTLINE_DOCS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={50}
                      heightValue={'50px'}
                      label={"ИНН"}
                      isError={false}
                      isDisabled={disablePassportInputs}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'PASSPORT_INN', () => CUSTOMER[0].docs.inn ]}
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
                </React.Fragment> }
                {( CUSTOMER[0].faceType !== 'PHIS_FACE' && CUSTOMER[0].faceType !== 'SELF_FACE' ) && 
                <React.Fragment>
                  <ReviewsContentLine>
                    <InputComponent
                      type={'TEXT_INPUT_OUTLINE_DOCS_BUSS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={100}
                      heightValue={'50px'}
                      label={"Краткое наименование организации"}
                      isError={false}
                      isDisabled={false}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'SHORT_NAME', () => {} ]}
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
                      type={'TEXT_INPUT_OUTLINE_DOCS_BUSS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={100}
                      heightValue={'50px'}
                      label={"Полное наименование организации"}
                      isError={false}
                      isDisabled={false}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'FULL_NAME', () => {} ]}
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
                      type={'TEXT_INPUT_OUTLINE_DOCS_BUSS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={33.33333}
                      heightValue={'50px'}
                      label={"ИНН"}
                      isError={false}
                      isDisabled={false}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'BUSS_INN', () => null ]}
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
                      type={'TEXT_INPUT_OUTLINE_DOCS_BUSS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={33.33333}
                      heightValue={'50px'}
                      label={"КПП"}
                      isError={false}
                      isDisabled={false}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'BUSS_KPP', () => null ]}
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
                      type={'TEXT_INPUT_OUTLINE_DOCS_BUSS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={33.33333}
                      heightValue={'50px'}
                      label={"ОГРН"}
                      isError={false}
                      isDisabled={false}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'BUSS_OGRN', () => null ]}
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
                      type={'TEXT_INPUT_OUTLINE_DOCS_BUSS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={100}
                      heightValue={'50px'}
                      label={"Юридический адрес"}
                      isError={false}
                      isDisabled={false}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'YUR_ADDRESS', () => {} ]}
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
                      type={'TEXT_INPUT_OUTLINE_DOCS_BUSS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={50}
                      heightValue={'50px'}
                      label={"Почтовый адрес"}
                      isError={false}
                      isDisabled={false}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'POST_ADDRESS', () => {} ]}
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
                    <FormGroup style={{ width: '50%' }}>
                      <FormControlLabel control={<Checkbox />} label="Совпадает с юридическим"/>
                    </FormGroup>
                  </ReviewsContentLine>
                  <ReviewsContentLine style={{ marginTop: '20px' }}>
                    <InputComponent
                      type={'TEXT_INPUT_OUTLINE_DOCS_BUSS'}
                      valueType='text'
                      required={false}
                      widthType={'%'}
                      widthValue={50}
                      heightValue={'50px'}
                      label={"ФИО генерального директора"}
                      isError={false}
                      isDisabled={false}
                      labelShrinkLeft={"0px"}
                      innerLabel={null}
                      store={[ 'BOSS_NAME', () => {} ]}
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
                    <FormGroup style={{ width: '50%' }}>
                      <FormControlLabel control={<Checkbox />} label="Действует на основании устава"/>
                      <FormControlLabel style={{ marginTop: '-6px' }} control={<Checkbox disabled/>} label="Действует на основании приказа"/>
                    </FormGroup>
                  </ReviewsContentLine>
                </React.Fragment> }
              <ReviewsContentLine style={{ marginTop: '19px', marginBottom: '36px', justifyContent: 'space-between' }}>
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
                { ( CUSTOMER[0].faceType === 'PHIS_FACE' || CUSTOMER[0].faceType === 'SELF_FACE' ) && 
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ m: 1, position: 'relative' }}>
                      <Fab
                        aria-label="save"
                        color="primary"
                        sx={buttonSx}
                        style={{
                          textTransform: 'none',
                          fontSize: '16px',
                          fontWeight: 'normal',
                        }}
                        onClick={updateDocs}
                        disabled={disablePassportInputs}
                      >
                        { success ? <CheckIcon /> : <SaveIcon /> }
                      </Fab>
                      { loading && (
                        <CircularProgress
                          size={68}
                          sx={{
                            color: green[500],
                            position: 'absolute',
                            top: -6,
                            left: -6,
                            zIndex: 1,
                          }}
                        />
                      )}
                    </Box>
                    <Box sx={{ m: 1, position: 'relative' }}>
                      <Button
                        variant="contained"
                        sx={buttonSx}
                        style={{
                          width: '270px',
                          height: '43px',
                          textTransform: 'none',
                          fontSize: '16px',
                          fontWeight: 'normal',
                        }}
                        disabled={disablePassportInputs}
                        onClick={updateDocs}
                      >
                        { success ? "Изменения сохранены" : "Сохранить изменения" }
                      </Button>
                      { loading && (
                        <CircularProgress
                          size={24}
                          sx={{
                            color: green[500],
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                          }}
                        />
                      )}
                    </Box>
                  </Box> }
                  { ( CUSTOMER[0].faceType !== 'PHIS_FACE' && CUSTOMER[0].faceType !== 'SELF_FACE' ) && 
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ m: 1, position: 'relative' }}>
                      <Fab
                        aria-label="save"
                        color="primary"
                        sx={buttonSx}
                        style={{
                          textTransform: 'none',
                          fontSize: '16px',
                          fontWeight: 'normal',
                        }}
                        onClick={updateCompany}
                        disabled={false}
                      >
                        { success ? <CheckIcon /> : <SaveIcon /> }
                      </Fab>
                      { loading && (
                        <CircularProgress
                          size={68}
                          sx={{
                            color: green[500],
                            position: 'absolute',
                            top: -6,
                            left: -6,
                            zIndex: 1,
                          }}
                        />
                      )}
                    </Box>
                    <Box sx={{ m: 1, position: 'relative' }}>
                      <Button
                        variant="contained"
                        sx={buttonSx}
                        style={{
                          width: '270px',
                          height: '43px',
                          textTransform: 'none',
                          fontSize: '16px',
                          fontWeight: 'normal',
                        }}
                        disabled={false}
                        onClick={updateCompany}
                      >
                        { success ? "Изменения сохранены" : "Сохранить изменения" }
                      </Button>
                      { loading && (
                        <CircularProgress
                          size={24}
                          sx={{
                            color: green[500],
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                          }}
                        />
                      )}
                    </Box>
                  </Box> }
              </ReviewsContentLine>

            </React.Fragment> }

            {/* ---------------------------------------- */}
            {/* модуль платежных данных */}
            {/* ---------------------------------------- */}

            { profileViewStep === 'wallet' && viewtype === 'wallet' && <React.Fragment>

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
                marginBottom: '20px'
              }}
            >{"Внимание! Функция работы кошелька напрямую связана с корректной работой системы с API платежной системы cloud payments"}</span>

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
                  marginBottom: '38px', 
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
            </React.Fragment> }

            {/* ---------------------------------------- */}
            {/* модуль уведомлений пользователя */}
            {/* ---------------------------------------- */}

            { profileViewStep === 'alarms' && viewtype === 'alarms' && <React.Fragment>

              <span
                style={{
                  display: 'block',
                  position: 'relative',
                  width: '600px',
                  lineHeight: '22px',
                  backgroundColor: 'rgb(253, 237, 237)',
                  padding: '14px',
                  paddingLeft: '20px',
                  borderRadius: '8px',
                  marginBottom: '20px'
                }}
              >{"Внимание! Первые четыре шаблона визуального блока уведомления на этапе тестирования будут отображаться в кабинете заказчика, они нужны для сохранения изначального работающего варианта модуля"}</span>

              { Array(2).fill(null).map((item, index) => {

                return (
                  <React.Fragment key={index}>
                    <ReviewsContentLine style={{ opacity: 0.6 }}>
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

              { Array(2).fill(null).map((item, index) => {

                return (
                  <React.Fragment key={index}>
                    <ReviewsContentLine style={{ opacity: 0.6 }}>
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

              { alertData && alertData.length > 0 && alertData.map((item: Array<any>, index: number): ReactElement => {

                return (
                  <React.Fragment key={index}>
                    { item && item.map((itemDown: { initiator: string, message: string }, indexDown: number): ReactElement => {

                      return (
                        <React.Fragment>
                          <ReviewsContentLine>
                            <CabinetAlarmLine
                              background={'#D9E7F0'}
                              isNew={true}
                              buttons={[
                                <span
                                  style={{
                                    position: 'relative',
                                    boxSizing: 'border-box',
                                    padding: '10px 16px 12px',
                                    backgroundColor: 'transparent',
                                    color: 'black',
                                    width: '200px',
                                    lineHeight: '18px',
                                    border: '1px dashed grey',
                                    opacity: 0.6,
                                    fontSize: '13px',
                                    textAlign: 'center',
                                    borderRadius: '6px'
                                  }}
                                >
                                  Область под кнопки - но не кнопка
                                </span>
                              ]}
                              content={{
                                date: '[ Формат времени не совпадает ]',
                                text: 'Новое уведомление. ' + itemDown.message.split('::')[1]
                              }}
                            />
                          </ReviewsContentLine>
                        </React.Fragment>
                      )

                    }) }
                  </React.Fragment>
                )

              }) }

              <ReviewsContentLine 
                style={{ 
                  justifyContent: 'space-around', 
                  color: greyColor, 
                  marginTop: '30px', 
                  marginBottom: '44px',
                  cursor: 'pointer' 
                }}
              >
                <span style={{ cursor: 'pointer' }}>{"Показать все"}</span>
              </ReviewsContentLine>

            </React.Fragment> }

            {/* ---------------------------------------- */}
            {/* модуль документов пользователя */}
            {/* ---------------------------------------- */}

            { profileViewStep === 'documents' && viewtype === 'docs' && <React.Fragment>

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
                  marginBottom: '20px'
                }}
              >{"Внимание! Вкладка документов будет содержать только раздел с формированием выписки, раздел электронной подписи будет скрыт"}</span>

              <ReviewsContent 
                style={{ 
                  marginTop: '0px',  
                  flexDirection: 'row', 
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '24px',
                  opacity: 0.6
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <img
                    alt={""}
                    src={pen}
                  />
                  <span style={{ fontWeight: 'bold', marginLeft: '20px' }}>Электронная подпись [ неактуальный элемент ]</span>
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

            { profileViewStep === 'portfolio' && viewtype === 'cases' && <React.Fragment>

              { USER_ROLE === 'CUSTOMER' && CUSTOMER[0].portfolio?.length === 0 && 

                <span 
                  style={{ 
                    lineHeight: '23px', 
                    width: '100%',
                    marginTop: '18px',
                    marginBottom: '14px', 
                  }}
                >
                  Вы не добавили пока еще ни одного проекта в портфолио.<br/>
                  Расскажите о ваших завершенных проектах, приложите акты.
                </span>
              
              }    

              <div
                onClick={editProjectsCases} 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  marginTop: '14px',
                  marginBottom: '22px',
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
                    backgroundColor: blueColor3,
                    marginRight: '10px',
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
              { ( CUSTOMER[0].portfolio && CUSTOMER[0].portfolio?.length > 0 ) && CUSTOMER[0].portfolio.map(item => {

                return <ReviewsContent style={{ padding: '24px', alignItems: 'flex-start', marginTop: '0px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{ item.title }</span>
                  <img
                    alt={"Изображение для проекта"}
                    src={`http://localhost:3000/techPortfolio/${USER_ID}.case.jpg`}
                    style={{
                      display: 'block',
                      position: 'relative',
                      width: '80%',
                      marginBottom: '8px',
                      marginTop: '28px',
                      borderRadius: '4px'
                    }}
                  />
                  <ReviewsContentLine style={{ marginTop: '24px', alignItems: 'flex-start' }}>
                    <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 'bold', marginBottom: '10px' }}>Сроки выполнения</span>
                      <span>{ item.startMonth } { item.startYear } - { item.finishMonth } { item.finishYear }</span>
                    </div>
                    <div style={{ width: '50%' }}>
                      <span style={{ fontWeight: 'bold' }}>Акты и оплата</span>
                      <div style={{ marginTop: '10px' }}>
                        <span style={{ fontWeight: 'bold', marginRight: '24px' }}>{ item.coast }₽</span>
                        <span>Вложение с актом отсутствует</span>
                      </div>
                    </div>
                  </ReviewsContentLine>
                  <ReviewsContentLine style={{ marginTop: '24px', alignItems: 'flex-start' }}>
                    <div style={{ width: '50%' }}>
                      <span style={{ fontWeight: 'bold' }}>Параметры объекта</span>
                      <div style={{ marginTop: '10px' }}>
                        <span style={{ marginRight: '24px', color: '#8E9DA7' }}>Площадь, кв.м</span>
                        <span>{ item.param1 }</span>
                      </div>
                      <div style={{ marginTop: '10px' }}>
                        <span style={{ marginRight: '24px', color: '#8E9DA7' }}>Высота объекта, м</span>
                        <span>{ item.param2 }</span>
                      </div>
                    </div>
                    <div style={{ width: '50%' }}>
                      <span style={{ fontWeight: 'bold', color: 'transparent' }}>---</span>
                      <div style={{ marginTop: '10px' }}>
                        <span style={{ marginRight: '24px', color: '#8E9DA7' }}>Этажность наземная</span>
                        <span>{ item.param3 }</span>
                      </div>
                      <div style={{ marginTop: '10px' }}>
                        <span style={{ marginRight: '24px', color: '#8E9DA7' }}>Регион</span>
                        <span>{ item.param4 }</span>
                      </div>
                    </div>
                  </ReviewsContentLine>
                  <ReviewsContentLine>
                    <span style={{ fontWeight: 'bold', marginBottom: '0px', marginTop: '24px' }}>Описание проекта</span>
                  </ReviewsContentLine>
                  <ReviewsContentLine style={{ marginTop: '16px' }}>
                    <span style={{ marginBottom: '0px', marginTop: '0px', lineHeight: '20px' }}>{ item.text }</span>
                  </ReviewsContentLine>
                  <ReviewsContentLine style={{ marginTop: '26px' }}>
                    { item.tags.map((spec: string) => <TagElement background={tagBackground}>{ spec }</TagElement>)}
                  </ReviewsContentLine>
                </ReviewsContent>

              })}

            </React.Fragment> }

            {/* ---------------------------------------- */}
            {/* модуль опыта и образования пользователя */}
            {/* ---------------------------------------- */}

            { profileViewStep === 'education' && viewtype === 'education' && <React.Fragment>

              <ReviewsContentLine style={{ marginBottom: '20px', marginTop: '14px', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold' }}>{"Образование"}</span>
                <span
                  onClick={editEducationCases} 
                  style={{ 
                    color: '#516674', 
                    cursor: 'pointer' 
                  }}
                >
                  {"Редактировать"}
                </span>
              </ReviewsContentLine>

              { USER_ROLE === 'CUSTOMER' && CUSTOMER[0].educationAndSkills?.length === 0 && 

                <span 
                  style={{ 
                    lineHeight: '23px', 
                    width: '100%',
                    marginTop: '0px',
                    marginBottom: '14px', 
                  }}
                >
                  Вы не добавили пока еще ни одного места обучения<br/>
                  Добавьте сюда оконченные учебные заведения и пройденные курсы
                </span>
              
              }    

              <div
                onClick={editEducationCases} 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  marginTop: '14px',
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
                    backgroundColor: blueColor3,
                    marginRight: '10px',
                  }}
                >
                  <img
                    alt={""}
                    src={plus}
                    style={{ display: 'block', width: '14px' }}
                  />
                </span>
                <span>Добавить новое место учебы</span>
              </div>

              { CUSTOMER[0].educationAndSkills?.filter(item => item.type === 'education')
                .map((item: any, index: number) => {

                return (
                  <ReviewsContent 
                    style={{ 
                      marginTop: index === 0 ? '26px' : '14px', 
                      flexDirection: 'row', 
                      alignItems: 'flex-start', 
                      justifyContent: 'space-between',
                    }}
                  >
                    <span style={{ width: '15%' }}>{ item.finish }</span>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
                      <span style={{ fontWeight: 'bold', marginBottom: '16px' }}>{ item.title }</span>
                      <span>{ item.special }</span>
                    </div>
                  </ReviewsContent>
                )

              })}

              <ReviewsContentLine style={{ marginBottom: '20px', marginTop: '50px', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold' }}>{"Опыт работы"}</span>
                <span
                  onClick={editEducationCases} 
                  style={{ 
                    color: '#516674', 
                    cursor: 'pointer' 
                  }}
                >
                  {"Редактировать"}
                </span>
              </ReviewsContentLine>

              { USER_ROLE === 'CUSTOMER' && CUSTOMER[0].educationAndSkills?.length === 0 && 

                <span 
                  style={{ 
                    lineHeight: '23px', 
                    width: '100%',
                    marginTop: '0px',
                    marginBottom: '14px', 
                  }}
                >
                  Вы не добавили пока еще ни одного места работы
                </span>
              
              }    

              <div
                onClick={editEducationCases} 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  marginTop: '14px',
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
                    backgroundColor: blueColor3,
                    marginRight: '10px',
                  }}
                >
                  <img
                    alt={""}
                    src={plus}
                    style={{ display: 'block', width: '14px' }}
                  />
                </span>
                <span>Добавить новое место работы</span>
              </div>

              { CUSTOMER[0].educationAndSkills?.filter(item => item.type === 'skill')
                .map((item: any, index: number) => {

                return (
                  <ReviewsContent 
                    style={{ 
                      marginTop: index === 0 ? '26px' : '14px',  
                      flexDirection: 'row', 
                      alignItems: 'flex-start', 
                      justifyContent: 'space-between',
                    }}
                  >
                    <span style={{ lineHeight: '22px', width: '15%' }}>{ item.sy } - { item.fy }</span>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
                      <span style={{ fontWeight: 'bold', marginBottom: '10px' }}>{ item.title }</span>
                      <span style={{ fontWeight: 'bold', marginBottom: '16px', color: 'gray' }}>{ item.jobName }</span>
                      <span style={{ lineHeight: '24px' }}>{item.jobTasks}</span>
                    </div>
                  </ReviewsContent>
                )

              })}

            </React.Fragment> }

            {/* ---------------------------------------- */}
            {/* модуль команды пользователя */}
            {/* ---------------------------------------- */}

            { profileViewStep === 'team' && viewtype === 'team' && <React.Fragment>

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

              { CUSTOMER.map((item: {
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

              { CUSTOMER.map((item: {
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

            {/* ---------------------------------------- */}
            {/* модуль команды пользователя */}
            {/* ---------------------------------------- */}

            { profileViewStep === 'settings' && viewtype === 'settings' && <React.Fragment>

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
                    isDisabled={true}
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
                    type={'TEXT_INPUT_OUTLINE_PASSWORD_VISIBILITY'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={50}
                    heightValue={'50px'}
                    label={"Введите новый пароль"}
                    isError={false}
                    isDisabled={true}
                    labelShrinkLeft={"0px"}
                    innerLabel={null}
                    store={[ "", () => null ]}
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
                    type={'TEXT_INPUT_OUTLINE_PASSWORD_VISIBILITY'}
                    valueType='text'
                    required={false}
                    widthType={'%'}
                    widthValue={50}
                    heightValue={'50px'}
                    label={"Повторите новый пароль"}
                    isError={false}
                    isDisabled={true}
                    labelShrinkLeft={"0px"}
                    innerLabel={null}
                    store={[ "", () => null ]}
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
      </ContentArea> }
    </React.Fragment>
  )

}

export default ExecutorProfilePage