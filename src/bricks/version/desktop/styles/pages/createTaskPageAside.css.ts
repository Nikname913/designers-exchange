import styled from 'styled-components'

const css = {
  MenuContainer: styled.aside`
    display: block;
    position: relative;
    width: 300px;
    height: auto;
    box-sizing: border-box;
  `,
  TextFieldTitle: styled.h6`
    display: block;
    position: relative;
    width: 100%;
    height: auto;
    margin: 0;
    margin-top: 14px;
    margin-bottom: 14px;
    font-weight: bold;
    font-size: 16px;
  `,
  TextFieldSubTitle: styled.h6<{ mt: string, mb: string }>`
    display: block;
    position: relative;
    width: 100%;
    height: auto;
    margin: 0;
    margin-top: ${props => props.mt};
    margin-bottom: ${props => props.mb};
    font-size: 16px;
    font-weight: normal;
  `,
  TextFieldContainerLine: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: relative;
    width: 100%;
  `,
  StepsContainer: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    width: 100%;
    padding-top: 18px;
    padding-left: 8px;
  `,
  StepsContainerVertical: styled.div<{ backgroundColor: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
    box-sizing: border-box;
    width: 10px;
    height: 244px;
    background-color: ${props => props.backgroundColor};
    border-radius: 5px;
  `,
  StepsContainerVerticalForRound: styled.div<{ backgroundColor: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    box-sizing: border-box;
    width: 10px;
    height: 244px;
    background-color: ${props => props.backgroundColor};
    border-radius: 5px;
  `,
  StepsContainerVerticalStep: styled.span<{ backgroundColor: string }>`
    display: block;
    position: relative;
    width: 10px;
    height: 51px;
    background-color: ${props => props.backgroundColor};
    box-sizing: border-box;
    border-radius: 5px;
  `,
  StepsContainerVerticalStepRound: styled.span<{ backgroundColor: string }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    width: 30px;
    height: 30px;
    background-color: ${props => props.backgroundColor};
    box-sizing: border-box;
    border-radius: 15px;
    border: 2px solid white;
    cursor: pointer;
  `,
  StepsContainerVerticalStepRoundLabel: styled.span<{ color: string }>`
    display: block;
    position: absolute;
    color: ${props => props.color};
    width: 200px;
    margin-left: 44px;
  `

}

export default css