import styled from 'styled-components'

const css = {
  ShadowContainer: styled.section<{ marginTop: number, background: string }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: ${props => props.background};
    overflow: hidden;
    margin-top: ${props => props.marginTop}px;
  `,
  RespondFromList: {
    FOS: styled.div`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      position: relative;
      background-color: white;
      border-radius: 8px;
      padding: 33px 30px;
      width: 700px;
      height: auto;
      min-height: 100px;
      box-sizing: border-box;
    `,
    ContentLine: styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      position: relative;
      width: 100%;
    `,
    Title: styled.h3`
      display: block;
      position: relative;
      width: 100%;
      margin: 0px;
      font-size: 24px;
      margin-bottom: 20px;
    `,
    SubTitle: styled.h4`
      display: block;
      position: relative;
      width: 100%;
      margin: 0px;
      font-size: 18px;
      margin-bottom: 40px;
    `
  },
  Command: {
    FOS: styled.div`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      position: relative;
      background-color: white;
      border-radius: 8px;
      padding: 33px 30px;
      width: 1010px;
      height: 90vh;
      box-sizing: border-box;
      overflow: hidden;
    `,
    FOSInner: styled.div`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      position: relative;
      background-color: white;
      border-radius: 8px;
      width: 1030px;
      height: 90vh;
      box-sizing: border-box;
      overflow-Y: scroll;
      padding-right: 70px;
    `,
    ContentLine: styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      position: relative;
      width: 100%;
    `,
    Title: styled.h3`
      display: block;
      position: relative;
      width: 100%;
      margin: 0px;
      font-size: 24px;
      margin-bottom: 20px;
    `,
    SubTitle: styled.h4`
      display: block;
      position: relative;
      width: 100%;
      margin: 0px;
      font-size: 18px;
      margin-bottom: 40px;
    `,
    AvatarContainer: styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      position: relative;
      width: 50px;
      height: 50px;
      margin-right: 20px;
    `,
    AvatarContainerIndicator: styled.span<{ background: string }>`
      display: block;
      position: absolute;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      top: 100%;
      left: 100%;
      margin-top: -14px;
      margin-left: -10px;
      background-color: ${props => props.background};
    `,
    NameContainer: styled.div`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      position: relative;
      width: 260px;
    `,
    HorizontalDelimiter: styled.span<{ background: string }>`
      display: block;
      position: relative;
      width: 100%;
      height: 1px;
      background-color: ${props => props.background};
    `
  }
}

export default css