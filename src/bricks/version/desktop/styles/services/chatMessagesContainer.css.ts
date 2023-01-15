import styled from 'styled-components'

const css = {
  GetMessageContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    position: relative;
  `,
  SendMessageContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    width: 100%;
    position: relative;
  `,
  DateTitle: styled.span`
    display: block;
    position: relative;
    width: 100%;
    color: #8E9DA7;
    text-align: center;
    font-size: 14px;
    margin-bottom: 22px;
    margin-top: 20px;
  `,
  Message: styled.span<{ backgroundColor: string }>`
    display: block;
    position: relative;
    padding: 20px;
    border-radius: 8px;
    max-width: 64%;
    line-height: 22px;
    background-color: ${props => props.backgroundColor};
    margin-bottom: 12px;
  `,
  MessageTime: styled.span<{ color: string, left: string, marginLeft: string }>`
    display: block;
    position: absolute;
    color: ${props => props.color};
    font-size: 13px;
    top: 100%;
    margin-top: -20px;
    left: ${props => props.left};
    margin-left: ${props => props.marginLeft};
  `
}

export default css