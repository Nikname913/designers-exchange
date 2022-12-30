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
  `
}

export default css