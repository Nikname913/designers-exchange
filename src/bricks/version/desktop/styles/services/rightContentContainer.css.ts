import styled from 'styled-components'

const css = {
  ShadowContainer: styled.section<{ marginTop: number }>`
    display: div;
    position: absolute;
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.4);
    overflow: hidden;
    margin-top: ${props => props.marginTop}px;
  `,
  ShadowContainerInner: styled.section`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-end;
    position: relative;
    box-sizing: border-box;
    width: calc(100% + 30px);
    height: 100%;
    padding-right: 12px;
    top: 0;
    left: 0;
    overflow-y: scroll;
  `,
  ChatFork: {
    ChatContainer: styled.div<{ backgroundColor: string }>`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      position: relative;
      box-sizing: border-box;
      background-color: ${props => props.backgroundColor};
      height: auto;
      width: calc(100% - 500px);
      padding-top: 40px;
      padding-left: 40px;
      padding-right: 200px;
    `,
    CloseIconContainer: styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      width: 100%;
    `,
    CloseIcon: styled.span`
      display: block;
      position: relative;
      height: 30px;
      width: 30px;
      cursor: pointer;
      margin-bottom: 30px;
    `,
    ChatHeader: styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      position: relative;
      width: 100%;
    `,
    ChatBody: styled.div<{ backgroundColor: string, border: string }>`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      position: relative;
      width: 100%;
      min-height: 100px;
      height: 800px;
      background-color: ${props => props.backgroundColor};
      border: ${props => props.border};
      border-radius: 4px;
      margin-top: 2px;
      margin-bottom: 38px;
      overflow: hidden;
    `,
    ChatBodyInner: styled.div<{ backgroundColor: string, border: string }>`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      position: relative;
      box-sizing: border-box;
      width: calc(100% + 28px);
      min-height: 100px;
      height: auto;
      background-color: ${props => props.backgroundColor};
      border: ${props => props.border};
      border-radius: 4px;
      padding-left: 20px;
      padding-right: 30px;
      padding-bottom: 8px;
      overflow-y: scroll;
    `,
    ChatHeaderAvatar: styled.div`
      display: block;
      position: relative;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 18px;
    `,
    ChatHeaderName: styled.div`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      position: relative;
    `,
    ChatHeaderEnableDocs: styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      margin-right: 30px;
    `,
  },
  MasterDocFork: {
    ChatContainer: styled.div<{ backgroundColor: string }>`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      position: relative;
      box-sizing: border-box;
      background-color: ${props => props.backgroundColor};
      height: auto;
      width: calc(100% - 500px);
      padding-top: 40px;
      padding-left: 40px;
      padding-right: 200px;
    `,
    CloseIconContainer: styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      width: 100%;
    `,
    CloseIcon: styled.span`
      display: block;
      position: relative;
      height: 30px;
      width: 30px;
      cursor: pointer;
      margin-bottom: 30px;
    `,
    ContentLine: styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      width: 100%;
    `,
    Delimiter: styled.span<{ background: string }>`
      display: block;
      position: relative;
      width: 100%;
      height: 2px;
      background-color: ${props => props.background};
      margin-top: 60px;
    `,
    WhiteContainer: styled.div<{ width: string }>`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      position: relative;
      width: ${props => props.width};
      background-color: white;
      border-radius: 8px;
      padding: 26px 34px;
      box-sizing: border-box;
    `
  },
  EditProfileFork: {
    Container: styled.div<{ backgroundColor: string }>`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      position: relative;
      box-sizing: border-box;
      background-color: ${props => props.backgroundColor};
      height: auto;
      min-height: 100vh;
      width: calc(100% - 500px);
      padding-top: 40px;
      padding-left: 40px;
      padding-right: 200px;
    `,
    CloseIconContainer: styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      width: 100%;
    `,
    CloseIcon: styled.span`
      display: block;
      position: relative;
      height: 30px;
      width: 30px;
      cursor: pointer;
      margin-bottom: 30px;
    `,
    ContentLine: styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      width: 100%;
    `,
    Delimiter: styled.span<{ background?: string }>`
      display: block;
      position: relative;
      width: 100%;
      height: 2px;
      background-color: ${props => props.background ? props.background : '#D9E7F0'};
    `,
  }
}

export default css