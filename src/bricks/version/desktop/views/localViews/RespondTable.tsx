import React, { ReactElement } from 'react'
import ButtonComponent from '../../comps/button/Button'
import EmailIcon from '@mui/icons-material/Email'
import { useAppSelector } from '../../../../store/hooks'
import { CSSProperties } from 'styled-components'
import { IRespondeTableProps } from '../../../../models-ts/views/responde-table-models'
import css from '../../styles/views/respondTable.css'
import avatar from '../../../../img/stock/avatar.svg'
import star from '../../../../img/icons/star.svg'
import location from '../../../../img/icons/location.svg'

const { RespondContainer, 
  ContentLine, 
  AvatarContainer, 
  UserName,
  UserJobType,
  StatDelimeter,
  TagsContainer,
  SpecializationTag } = css

const RespondTable: React.FC<IRespondeTableProps> = (props: IRespondeTableProps) => {

  const { containerCSS, 
    userName, 
    userJob, 
    userRate, 
    userStat,
    userPrice,
    userDeadline,
    userLocation,
    userTags,
    userMorePrice,
    respondDate,
    discription } = props

  const greyColor2 = useAppSelector(state => state.theme.grey2)
  const blueColor2 = useAppSelector(state => state.theme.blue2)
  const blueColor4 = useAppSelector(state => state.theme.blue4)
  const coastColor = useAppSelector(state => state.theme.blue1)
  const locationColor = useAppSelector(state => state.theme.grey)
  const tagBackgroundColor = useAppSelector(state => state.theme.blue4)
  const whiteBlueBackground = useAppSelector(state => state.theme.bg)

  const userContainerCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  }
  const userRateContainerCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    position: 'relative',
  }
  const userRateContainerLineCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  }
  const rateSpanCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    fontSize: '40px',
    fontWeight: '200',
    marginLeft: '6px'
  }
  const statContainerCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    position: 'relative',
  }
  const statContainerNumberCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    color: greyColor2,
    fontSize: '12px'
  }

  const coastContainerCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    position: 'relative',
    fontWeight: 'bold',
  }
  const priceSpanCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    fontSize: '32px',
    color: coastColor,
    fontWeight: 'bold',
    lineHeight: '38px',
    marginBottom: '5px'
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
  const locationSpanCSS: React.CSSProperties = {
    display: 'block',
    position: 'relative',
    color: locationColor,
    fontSize: '14px'
  }
  const buttonsContainerCSS: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  }

  return (
    <React.Fragment>
      <RespondContainer
        width={containerCSS.w}
        height={containerCSS.h}
        marginBottom={containerCSS.mb}
        backgroundColor={containerCSS.bg}
      >
        <ContentLine justify='space-between'>
          <div style={userContainerCSS}>
            <AvatarContainer>
              <img
                alt={""}
                src={avatar}
              />
            </AvatarContainer>
            <div>
              <UserName>{ userName }</UserName>
              <UserJobType color={greyColor2}>{ userJob }</UserJobType>
            </div>
          </div>
          <div style={userRateContainerCSS}>
            <div style={{ ...userRateContainerLineCSS, marginBottom: '15px' }}>
              <img
                alt={""}
                src={star}
              />
              <span style={rateSpanCSS}>{ userRate }</span>
            </div>
            <div style={userRateContainerLineCSS}>
              <div style={statContainerCSS}>
                <span style={{ ...statContainerNumberCSS, fontSize: '16px', fontWeight: 'bold', lineHeight: '20px', marginBottom: '5px' }}>{ userStat.completed }</span>
                <span style={{ ...statContainerNumberCSS }}>выполнено</span>
              </div>
              <StatDelimeter/>
              <div style={statContainerCSS}>
                <span style={{ ...statContainerNumberCSS, fontSize: '16px', fontWeight: 'bold', lineHeight: '20px', marginBottom: '5px' }}>{ userStat.worked }</span>
                <span style={{ ...statContainerNumberCSS }}>работаю</span>
              </div>
              <StatDelimeter/>
              <div style={statContainerCSS}>
                <span style={{ ...statContainerNumberCSS, fontSize: '16px', fontWeight: 'bold', lineHeight: '20px', marginBottom: '5px' }}>{ userStat.failed }</span>
                <span style={{ ...statContainerNumberCSS }}>провалено</span>
              </div>
            </div>
          </div>
          <div style={coastContainerCSS}>
            <span style={priceSpanCSS}>{userPrice}</span>
            <span>До: {userDeadline}</span>
          </div>
        </ContentLine>
        <ContentLine style={{ marginTop: '20px', marginBottom: '20px' }}>
          <div style={iconLocationContainerCSS}>
            <img
              alt={""}
              src={location}
              style={iconLocationCSS}
            />
            <span style={locationSpanCSS}>{ userLocation }</span>
          </div>
        </ContentLine>
        <ContentLine>
          <span style={{ fontWeight: 'bold', marginBottom: '10px' }}>Специализация: </span>
          <TagsContainer>
            { userTags.map((item: string, index: number): ReactElement => {

              return (
                <React.Fragment>
                  <SpecializationTag style={{ marginBottom: '10px' }} backgroundColor={tagBackgroundColor}>{ item }</SpecializationTag>
                </React.Fragment>
              )

            })}
          </TagsContainer>
        </ContentLine>
        <ContentLine style={{ marginTop: '20px', marginBottom: '20px' }}>
          <div style={{ marginRight: '40px' }}>
            <span style={{ fontWeight: 'bold' }}>{ `Аванс ${userMorePrice[0]} ₽, ` }</span>
            <span>через </span>
            <span style={{ fontWeight: 'bold' }}>{ `${userMorePrice[1]} дней` }</span>
          </div>
          <div>
            <span style={{ fontWeight: 'bold' }}>{ `Экспертиза ${userMorePrice[2]} ₽, ` }</span>
            <span>до </span>
            <span style={{ fontWeight: 'bold' }}>{ `${userMorePrice[3]}` }</span>
          </div>
        </ContentLine>
        <ContentLine>
          <span style={{ letterSpacing: '1px', color: greyColor2 }}>{ `${respondDate.split('&&')[0]} в ${respondDate.split('&&')[1]}` }</span>
        </ContentLine>
        <ContentLine style={{ marginTop: '10px' }}>
          <span style={{ lineHeight: '24px' }}><i style={{ fontStyle: 'normal', fontWeight: 'bold' }}>Комментарий: </i>{ `${ discription }` }</span>
        </ContentLine>
        <ContentLine style={{ marginTop: '14px', justifyContent: 'flex-end' }}>
          <div style={buttonsContainerCSS}>
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
              }}
            />
            <ButtonComponent
              inner={"Отказать"} 
              type="CONTAINED_DEFAULT"
              action={() => {}}
              actionData={null}
              widthType={"px"}
              widthValue={120}
              children={""}
              childrenCss={{}}
              iconSrc={null}
              iconCss={undefined}
              muiIconSize={null}
              MuiIconChildren={EmailIcon}
              css={{
                backgroundColor: blueColor4,
                color: 'inherit',
                fontSize: '12px',
                height: '40px',
                borderRadius: '6px',
                position: 'relative',
                boxSizing: 'border-box',
                marginLeft: '12px',
              }}
            />
            <ButtonComponent
              inner={"Нанять"} 
              type="CONTAINED_DEFAULT" 
              action={() => {}}
              actionData={null}
              widthType={"px"}
              widthValue={120}
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
                marginLeft: '12px',
              }}
            />
          </div>
        </ContentLine>
      </RespondContainer>
    </React.Fragment>
  )

}

export default RespondTable