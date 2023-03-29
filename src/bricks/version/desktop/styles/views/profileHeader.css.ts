import styled from "styled-components"

const css = {
  HeaderContainer: styled.section`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
    box-sizing: border-box;
    width: calc(100% - 120px);
    min-height: 60px;
    background-color: white;
    border-radius: 8px;
    margin-top: 50px;
    margin-bottom: 20px;
    padding: 40px;
  `,
  LeftContainer: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    position: relative;
    width: 150px;
    height: 150px;
    margin-right: 40px;
  `,
  AvatarIndicator: styled.span<{ background: string }>`
    display: block;
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: ${props => props.background};
    left: 100%;
    top: 100%;
    margin-top: -32px;
    margin-left: -32px;
  `,
  RightContainer: styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
    width: calc(100% - 150px);
  `,
  ContentLine: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    width: 100%;
  `
}

export default css