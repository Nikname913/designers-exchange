import React, { useState } from 'react'
import { useAppSelector } from '../../../../store/hooks'
import { CSSProperties } from 'styled-components'
import css from '../../styles/views/documentLine.css'
import { IDocumentLineProps } from '../../../../models-ts/views/document-line-models'
import semiMenu from '../../../../img/icons/semiMenu.svg'
import docCorrect from '../../../../img/icons/docCorrect.svg'
import docTime from '../../../../img/icons/docTime.svg'

const { Container, MenuListItem } = css

const DocumentLine: React.FC<IDocumentLineProps> = (props: IDocumentLineProps) => {

  const [ showMenu, setShowMenu ] = useState<boolean>(false)
  const greenStatus = '#D3EEEB'
  const greyColor = useAppSelector(state => state.theme.grey)
  const greyColor2 = useAppSelector(state => state.theme.grey2)

  const { status, 
    data: { 
      name, 
      date,
      statusName,
      size
    }
  } = props

  const titleCSS: CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '80%',
    color: greyColor
  }
  const containerCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    width: '130px'
  }
  const menuContainerCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    position: 'absolute',
    backgroundColor: 'white',
    width: '208px',
    top: 0,
    left: '100%',
    marginLeft: '-214px',
    marginTop: '6px',
    borderRadius: '4px',
    zIndex: 5,
    overflow: 'hidden',
  }

  return (
    <React.Fragment>
      { status === 'GREEN' ? <Container background={greenStatus}>

        <span style={titleCSS}>{ name }</span>
        <span style={{ width: '164px', color: greyColor2 }}>{ date }</span>
        { size && <span style={{ color: greyColor2, width: '126px' }}>{`${ size } Mb`}</span> }
        <div style={containerCSS}>
          <img
            alt={""}
            src={docCorrect}
            style={{ marginRight: '10px' }}
          />
          <span style={{ color: greyColor }}>{ statusName }</span>
        </div>
        <img
          alt={""}
          src={semiMenu}
          style={{ cursor: 'pointer', marginLeft: '38px' }}
          onClick={() => setShowMenu(false)}
        />

        { showMenu && <div style={menuContainerCSS}>
          <MenuListItem>Просмотреть</MenuListItem>
          <MenuListItem>Скачать</MenuListItem>
          <MenuListItem>Удалить</MenuListItem>
          <MenuListItem>Подписать</MenuListItem>
          <MenuListItem>Электронная подпись</MenuListItem>
          <MenuListItem onClick={() => setShowMenu(false)}>Закрыть [ временно ]</MenuListItem>
        </div> }

      </Container>
        : status === 'WHITE' ? <Container>

          <span style={titleCSS}>{ name }</span>
          <span style={{ width: '164px', color: greyColor2 }}>{ date }</span>
          { size && <span style={{ color: greyColor2, width: '126px' }}>{`${ size } Mb`}</span> }
          <div style={containerCSS}>
            <img
              alt={""}
              src={docTime}
              style={{ marginRight: '10px' }}
            />
            <span style={{ color: greyColor }}>{ statusName }</span>
          </div>
          <img
            alt={""}
            src={semiMenu}
            style={{ cursor: 'pointer', marginLeft: '38px' }}
            onClick={() => setShowMenu(false)}
          />

          { showMenu && <div style={menuContainerCSS}>
            <MenuListItem>Просмотреть</MenuListItem>
            <MenuListItem>Скачать</MenuListItem>
            <MenuListItem>Удалить</MenuListItem>
            <MenuListItem>Подписать</MenuListItem>
            <MenuListItem>Электронная подпись</MenuListItem>
            <MenuListItem onClick={() => setShowMenu(false)}>Закрыть [ временно ]</MenuListItem>
          </div> }

        </Container>
        : <React.Fragment></React.Fragment> }
    </React.Fragment>
  )
}

export default DocumentLine