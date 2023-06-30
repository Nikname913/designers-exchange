/* eslint-disable array-callback-return */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmailIcon from '@mui/icons-material/Email'
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { setShow } from '../../../../store/slices/right-content-slice'
import { ICustExecCardPrevProps } from '../../../../models-ts/views/cust-exec-card-prev-models'
import ButtonComponent from '../../comps/button/Button'
import css from '../../styles/views/customerExecutorCardPrev.css'
import star from '../../../../img/icons/star.svg'
import semiMenu from '../../../../img/icons/semiMenu.svg'

const { CardWrapper, 
  CardWrapperContentLine,
  CardWrapperContentLineTags,
  UserTextInfo,
  UserAvatar,
  UserName,
  UserEmployment,
  RatingContainer,
  StatContainer,
  StatContainerContent,
  StatContainerDelimiter,
  SpecializationTag } = css

const CustomerExecutorCardPreviewLoading: React.FC<ICustExecCardPrevProps> = (
  props: ICustExecCardPrevProps
) => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    userId,
    userAvatar, 
    userType,
    userReviews,
    userProjects,
    userTags,
    isDisabledMessage,
    cardWidth,
    marginBottom,
    marginRight,
    forCabinet } = props

  const whiteColor = useAppSelector(state => state.theme.white)
  const greyColor2 = useAppSelector(state => state.theme.grey2)
  const blueColor3 = useAppSelector(state => state.theme.blue3)
  const greyColor3 = useAppSelector(state => state.theme.grey3)
  const userEmploymentColor = useAppSelector(state => state.theme.grey2)
  const whiteBlueBackground = useAppSelector(state => state.theme.bg)
  const delimiterBackground = useAppSelector(state => state.theme.grey3)
  const tagBackground = useAppSelector(state => state.theme.blue4)

  const [ tagsLimit, setTagsLimit ] = useState<number>(4)

  const avatarCSS: React.CSSProperties = {
    display: 'flex',
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box',
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
          <UserAvatar style={{ filter: 'grayscale(0.6)' }}>
            <img
              alt={""}
              src={userAvatar}
              style={avatarCSS}
            />
          </UserAvatar>
          <UserTextInfo>
            <UserName></UserName>
            <UserEmployment color={userEmploymentColor}></UserEmployment>
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
            <RatingContainer style={{ opacity: 0.5 }}>
              <span style={ratingStarCSS}>
                <img
                  alt={""}
                  src={star}
                />
              </span>
              <span style={ratingNumberCSS}>0.00</span>
            </RatingContainer>
            <span style={userReviewsCSS}>{ userReviews } отзывов</span>
          </div>
          <StatContainer>
            <StatContainerContent>
              <span style={{ ...greySpanCSS, fontSize: '16px', fontWeight: 'bold' }}>{ userProjects[0] }</span>
            </StatContainerContent>
            <StatContainerDelimiter backgroundColor={delimiterBackground}/>
            <StatContainerContent>
              <span style={{ ...greySpanCSS, fontSize: '16px', fontWeight: 'bold' }}>{ userProjects[1] }</span>
            </StatContainerContent>
            <StatContainerDelimiter backgroundColor={delimiterBackground}/>
            <StatContainerContent>
              <span style={{ ...greySpanCSS, fontSize: '16px', fontWeight: 'bold' }}>{ userProjects[2] }</span>
            </StatContainerContent>
          </StatContainer>
        </CardWrapperContentLine>
        <CardWrapperContentLineTags marginTop={"34px"}>

          { userTags && userTags.map((item, index) => {

            if ( index < tagsLimit ) {

              return (
                <React.Fragment key={index}>
                  <SpecializationTag style={{ width: '30%' }} backgroundColor={tagBackground}>{ item }</SpecializationTag>
                </React.Fragment>
              )

            }

          })}

          { tagsLimit === 4 && 
            <React.Fragment>
              { userTags && userTags.length > 4 && <SpecializationTag onClick={fullTagslimit} backgroundColor={blueColor3}>
                
                {"+"}{ userTags.length - 4 }
              
              </SpecializationTag> }
            </React.Fragment> 
          }

        </CardWrapperContentLineTags>
        <CardWrapperContentLineTags marginTop={"32px"}>
          <ButtonComponent
            inner={""} 
            type="CONTAINED_DISABLED" 
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
              backgroundColor: 'rgb(242, 244, 252)',
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

export default CustomerExecutorCardPreviewLoading