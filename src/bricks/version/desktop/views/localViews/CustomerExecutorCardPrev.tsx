/* eslint-disable array-callback-return */
import React, { useState } from 'react'
import EmailIcon from '@mui/icons-material/Email'
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { setShow } from '../../../../store/slices/right-content-slice'
import { ICustExecCardPrevProps } from '../../../../models-ts/views/cust-exec-card-prev-models'
import ButtonComponent from '../../comps/button/Button'
import css from '../../styles/views/customerExecutorCardPrev.css'
import location from '../../../../img/icons/location.svg'
import star from '../../../../img/icons/star.svg'

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

  const { userName, 
    userAvatar, 
    userEmployment, 
    userLocation,
    userReviews,
    userRate,
    userProjects,
    userTags,
    isDisabledMessage,
    cardWidth,
    marginBottom,
    marginRight } = props

  const whiteColor = useAppSelector(state => state.theme.white)
  const greyColor = useAppSelector(state => state.theme.grey)
  const greyColor2 = useAppSelector(state => state.theme.grey2)
  const blueColor2 = useAppSelector(state => state.theme.blue2)
  const blueColor3 = useAppSelector(state => state.theme.blue3)
  const greyColor3 = useAppSelector(state => state.theme.grey3)
  const userEmploymentColor = useAppSelector(state => state.theme.grey2)
  const onlineIndicatorColor = useAppSelector(state => state.theme.green)
  const whiteBlueBackground = useAppSelector(state => state.theme.bg)
  const delimiterBackground = useAppSelector(state => state.theme.grey3)
  const tagBackground = useAppSelector(state => state.theme.blue4)

  const [ tagsLimit, setTagsLimit ] = useState<number>(4)

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
    display: 'block',
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
          <UserAvatar>
            <img
              alt={""}
              src={userAvatar}
              style={avatarCSS}
            />
            <UserAvatarIsOnlineIndicator backgroundColor={onlineIndicatorColor}/>
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
              <span style={ratingNumberCSS}>{ userRate }</span>
            </RatingContainer>
            <span style={userReviewsCSS}>{ userReviews } отзывов</span>
          </div>
          <StatContainer>
            <StatContainerContent>
              <span style={{ ...greySpanCSS, fontSize: '16px', fontWeight: 'bold' }}>{ userProjects[0] }</span>
              <span style={greySpanCSS}>выполнено</span>
            </StatContainerContent>
            <StatContainerDelimiter backgroundColor={delimiterBackground}/>
            <StatContainerContent>
              <span style={{ ...greySpanCSS, fontSize: '16px', fontWeight: 'bold' }}>{ userProjects[1] }</span>
              <span style={greySpanCSS}>работаю</span>
            </StatContainerContent>
            <StatContainerDelimiter backgroundColor={delimiterBackground}/>
            <StatContainerContent>
              <span style={{ ...greySpanCSS, fontSize: '16px', fontWeight: 'bold' }}>{ userProjects[2] }</span>
              <span style={greySpanCSS}>провалено</span>
            </StatContainerContent>
          </StatContainer>
        </CardWrapperContentLine>
        <CardWrapperContentLineTags marginTop={"34px"}>

          { userTags.map((item, index) => {

            if ( index < tagsLimit ) {

              return (
                <React.Fragment key={index}>
                  <SpecializationTag backgroundColor={tagBackground}>{ item }</SpecializationTag>
                </React.Fragment>
              )

            }

          })}

          { tagsLimit === 4 && 
            <React.Fragment>
              { userTags.length > 4 && <SpecializationTag onClick={fullTagslimit} backgroundColor={blueColor3}>
                
                {"+"}{ userTags.length - 4 }
              
              </SpecializationTag> }
            </React.Fragment> 
          }

        </CardWrapperContentLineTags>
        <CardWrapperContentLineTags marginTop={"32px"}>
          <ButtonComponent
            inner={"В профиль"} 
            type="CONTAINED_DEFAULT" 
            action={() => {}}
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