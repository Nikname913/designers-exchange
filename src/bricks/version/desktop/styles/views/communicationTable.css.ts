import styled from 'styled-components'

const css = {
  Container: styled.div<{ background: string }>`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 130px;
    border-radius: 8px;
    border-top-left-radius: 65px;
    border-bottom-left-radius: 65px;
    background-color: ${props => props.background};
  `,
  RoundContainer: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
    position: relative;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    box-shadow: 0px 3px 16px 2px rgba(0, 0, 0, 0.12);
    margin-right: 22px
  `,
  RoundContainerInner: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
    position: relative;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    box-shadow: 0px 3px 16px 2px rgba(0, 0, 0, 0.12);
    background-color: white;
    border: 5px solid #F2F4FC;
  `,
  SmallRound: styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    width: 33px;
    height: 33px;
    left: 100%;
    top: 100%;
    margin-top: -36px;
    margin-left: -36px;
  `,
  ContentArea: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
    width: calc(100% - 150px);
    height: auto;
  `,
  Message: styled.span`
    display: block;
    position: relative;
    margin-bottom: 16px;
  `
}

export default css