/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import EmailIcon from '@mui/icons-material/Email'
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { setShow } from '../../../../store/slices/right-content-slice'
import { ICustExecCardPrevProps } from '../../../../models-ts/views/cust-exec-card-prev-models'
import ButtonComponent from '../../comps/button/Button'
import css from '../../styles/views/customerExecutorCardPrev.css'
import location from '../../../../img/icons/location.svg'
import star from '../../../../img/icons/star.svg'
import semiMenu from '../../../../img/icons/semiMenu.svg'

import bearAvatar from '../../../../img/avatars/bear.svg'
import enotAvatar from '../../../../img/avatars/enot.svg'
import foxAvatar from '../../../../img/avatars/fox.svg'
import groupAvatar from '../../../../img/avatars/group.svg'
import manAvatar from '../../../../img/avatars/man.svg'
import womanAvatar from '../../../../img/avatars/woman.svg'

const { CardWrapper, 
  CardWrapperContentLine,
  CardWrapperContentLineTags,
  UserTextInfo,
  UserAvatar,
  UserName,
  UserEmployment,
  UserAvatarIsOnlineIndicator,
  RatingContainer,
  StatContainer,
  StatContainerContent,
  StatContainerDelimiter,
  SpecializationTag } = css

const CustomerExecutorCardPreview: React.FC<ICustExecCardPrevProps> = (
  props: ICustExecCardPrevProps
) => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    userId,
    userName, 
    userAvatar, 
    userType,
    userEmployment, 
    userLocation,
    userReviews,
    userRate,
    userProjects,
    userTags,
    isDisabledMessage,
    cardWidth,
    marginBottom,
    marginRight,
    forCabinet } = props

  const orderActive = useAppSelector(state => state.taskContentReducer.TASKS_DATA.listOrders)
  const orderComplete = useAppSelector(state => state.taskContentReducer.TASKS_DATA.listOrdersComplete)

  const whiteColor = useAppSelector(state => state.theme.white)
  const greyColor = useAppSelector(state => state.theme.grey)
  const greyColor2 = useAppSelector(state => state.theme.grey2)
  const blueColor2 = useAppSelector(state => state.theme.blue2)
  const blueColor3 = useAppSelector(state => state.theme.blue3)
  const greyColor3 = useAppSelector(state => state.theme.grey3)
  const userEmploymentColor = useAppSelector(state => state.theme.grey2)
  const onlineIndicatorColor = useAppSelector(state => state.theme.green)
  const offlineIndicatorColor = useAppSelector(state => state.theme.yellow)
  const whiteBlueBackground = useAppSelector(state => state.theme.bg)
  const delimiterBackground = useAppSelector(state => state.theme.grey3)
  const tagBackground = useAppSelector(state => state.theme.blue4)

  const [ tagsLimit, setTagsLimit ] = useState<number>(4)
  const [ tagsSpredLine, setTextSpredLine ] = useState<string>('')
  const [ checkAvatarStatus, setCheckAvatarStatus ] = useState<number>(404)

  const spanCSS2: React.CSSProperties = {
    display: 'block',
    position: 'relative', 
    color: greyColor,
    fontSize: '14px'
  }
  const iconLocationContainerCSS: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
  const iconLocationCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative',
    height: '13.333px',
    marginRight: '6px'
  }
  const ratingNumberCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative',
    fontSize: '40px'
  }
  const ratingStarCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '20px',
    marginRight: '10px',
  }
  const userReviewsCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative',
    fontSize: '14px',
    color: greyColor2,
    textAlign: 'center',
    marginTop: '3px'
  }
  const greySpanCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative',
    fontSize: '12px',
    color: greyColor2,
    lineHeight: '18px',
    textAlign: 'center',
  }
  const messageButtonContainerCSS: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    left: '100%',
    marginLeft: '-38px',
    top: '0%',
    marginTop: '-10px'
  }

  function fullTagslimit(): void {
    setTagsLimit(100)
  }

  function showRightContent(): void {
    dispatch(setShow(true))
  }

  function openProfile(): void {
    userType === 'EXECUTOR' && navigate(`/exec-profile/${userId}`)
    userType === 'CUSTOMER' && navigate(`/cust-profile/${userId}`)
  }

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
    <React.Fragment>
      <CardWrapper
        width={cardWidth ? cardWidth : "440px"}
        height={""}
        backgroundColor={whiteColor}
        mb={marginBottom}
        mar={marginRight}
      >
        <CardWrapperContentLine>
          <UserAvatar 
            style={{
              width: '84px',
              height: '84px', 
              borderRadius: '50%', 
              backgroundColor: 'rgb(217, 231, 240)',
            }}>
              <div 
                style={{
                  width: '84px',
                  height: '84px', 
                  borderRadius: '50%',
                  overflow: 'hidden', 
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
                }}
              >
                { checkAvatarStatus === 404 && <img
                  alt={""}
                  src={userAvatar}
                  style={
                    userAvatar === bearAvatar ? {
                      display: 'block',
                      position: 'relative',
                      width: '58px',
                      height: '58px', 
                      boxSizing: 'border-box',
                      marginTop: '6px'
                    } : userAvatar === enotAvatar ? {
                      display: 'block',
                      position: 'relative',
                      width: '58px',
                      height: '58px', 
                      boxSizing: 'border-box',
                      marginTop: '2px'
                    } : userAvatar === foxAvatar ? {
                      display: 'block',
                      position: 'relative',
                      width: '55px',
                      height: '55px', 
                      boxSizing: 'border-box',
                      marginTop: '2px'
                    } : userAvatar === groupAvatar ? {
                      display: 'block',
                      position: 'relative',
                      width: '75px',
                      height: '75px', 
                      boxSizing: 'border-box',
                      marginTop: '20px'
                    } : userAvatar === manAvatar ? {
                      display: 'block',
                      position: 'relative',
                      width: '75px',
                      height: '75px', 
                      boxSizing: 'border-box',
                      marginTop: '20px'
                    } : userAvatar === womanAvatar ? {
                      display: 'block',
                      position: 'relative',
                      width: '75px',
                      height: '75px', 
                      boxSizing: 'border-box',
                      marginTop: '20px'
                    } : {}
                  }
                /> }
                { checkAvatarStatus === 200 && <img
                  alt={""}
                  src={`http://localhost:3000/techDocs/${userId}.avatar.jpg`} 
                  style={{ height: '100%', cursor: 'pointer' }}
                /> }
              </div>
            <UserAvatarIsOnlineIndicator 
              backgroundColor={ false ? onlineIndicatorColor : offlineIndicatorColor }
              style={{
                marginTop: '-17px',
                marginLeft: '-22px',
              }}
            />
          </UserAvatar>
          <UserTextInfo>
            <UserName>{ userName }</UserName>
            <UserEmployment color={userEmploymentColor}>{ userEmployment }</UserEmployment>
            <div style={iconLocationContainerCSS}>
              <img
                alt={""}
                src={location}
                style={iconLocationCSS}
              />
              <span style={spanCSS2}>{ userLocation }</span>
            </div>
          </UserTextInfo>
          <div style={messageButtonContainerCSS}>
            
            { !forCabinet ? <React.Fragment>
              { isDisabledMessage ? <ButtonComponent
                inner={""} 
                type='ICON_BUTTON_DISABLED' 
                action={() => console.log('this is button')}
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
                  backgroundColor: greyColor3,
                }}
              /> : <ButtonComponent
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
              />}
            </React.Fragment> : <img alt={""} src={semiMenu} /> }

        </div>
        </CardWrapperContentLine>
        <CardWrapperContentLine>
          <div>
            <RatingContainer>
              <span style={ratingStarCSS}>
                <img
                  alt={""}
                  src={star}
                />
              </span>
              <span style={ratingNumberCSS}>{ userRate.toFixed(2) }</span>
            </RatingContainer>
            <span style={userReviewsCSS}>{ userReviews } отзывов</span>
          </div>
          <StatContainer>
            <StatContainerContent>
              { userType === 'EXECUTOR' && <span style={{ ...greySpanCSS, fontSize: '16px', fontWeight: 'bold' }}>
                { orderComplete.filter(item => item.executor === userId).length }
              </span> }
              { userType === 'CUSTOMER' && <span style={{ ...greySpanCSS, fontSize: '16px', fontWeight: 'bold' }}>
                { orderComplete.filter(item => item.customer === userId).length }
              </span> }
              <span style={greySpanCSS}>выполнено</span>
            </StatContainerContent>
            <StatContainerDelimiter backgroundColor={delimiterBackground}/>
            <StatContainerContent>
              { userType === 'EXECUTOR' && <span style={{ ...greySpanCSS, fontSize: '16px', fontWeight: 'bold' }}>
                { orderActive.filter(item => item.executor === userId).length }
              </span> }
              { userType === 'CUSTOMER' && <span style={{ ...greySpanCSS, fontSize: '16px', fontWeight: 'bold' }}>
                { orderActive.filter(item => item.customer === userId).length }
              </span> }
              <span style={greySpanCSS}>активные</span>
            </StatContainerContent>
            <StatContainerDelimiter backgroundColor={delimiterBackground}/>
            <StatContainerContent>
              <span style={{ ...greySpanCSS, fontSize: '16px', fontWeight: 'bold' }}>{ userProjects[2] }</span>
              <span style={greySpanCSS}>провалено</span>
            </StatContainerContent>
          </StatContainer>
        </CardWrapperContentLine>
        <CardWrapperContentLineTags marginTop={"34px"}>

          { typeof(userTags[0]) === 'string' && userTags.map((item, index) => {

            if ( index < tagsLimit ) {

              return (
                <React.Fragment key={index}>
                  <SpecializationTag backgroundColor={tagBackground}>
                    { item !== '' ? item : 'Загрузка специализации' + tagsSpredLine }
                  </SpecializationTag>
                </React.Fragment>
              )

            }

          })}

          { typeof(userTags[0]) !== 'string' && userTags[0].map((item, index) => {

            if ( index < tagsLimit ) {

              return (
                <React.Fragment key={index}>
                  <SpecializationTag backgroundColor={tagBackground}>
                    { item !== '' ? item : 'Загрузка специализации' + tagsSpredLine }
                  </SpecializationTag>
                </React.Fragment>
              )

            }

          })}

          { userTags.length === 0 && <SpecializationTag backgroundColor={tagBackground}>
            
            { 'Загрузка специализации' + tagsSpredLine }
          
          </SpecializationTag> }

          { tagsLimit === 4 && 
            <React.Fragment>
              { userTags.length > 4 && <SpecializationTag onClick={fullTagslimit} backgroundColor={blueColor3}>
                
                {"+"}{ userTags.length - 4 }
              
              </SpecializationTag> }
            </React.Fragment> 
          }

        </CardWrapperContentLineTags>
        <CardWrapperContentLineTags marginTop={"20px"}>
          <ButtonComponent
            inner={"В профиль"} 
            type="CONTAINED_DEFAULT" 
            action={openProfile}
            actionData={null}
            widthType={"%"}
            widthValue={100}
            children={""}
            childrenCss={{}}
            iconSrc={null}
            iconCss={undefined}
            muiIconSize={null}
            MuiIconChildren={EmailIcon}
            css={{
              backgroundColor: blueColor2,
              fontSize: '12px',
              height: '40px',
              borderRadius: '6px',
              position: 'relative',
              boxSizing: 'border-box',
            }}
          />
        </CardWrapperContentLineTags>
      </CardWrapper>
    </React.Fragment>
  )

}

export default CustomerExecutorCardPreview