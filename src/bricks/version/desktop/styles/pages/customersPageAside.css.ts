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
    margin-top: 20px;
    margin-bottom: 14px;
    font-weight: bold;
    font-size: 18px;
  `,
  PagintationContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
    margin: 24px auto 40px;
  `,
  ExchangePageTaskCSS: {
    MenuDelimeter: styled.span<{ backgroundColor: string }>`
      display: block;
      position: relative;
      width: 100%;
      height: 1px;
      background-color: ${props => props.backgroundColor};
      margin-bottom: 30px;
    `,
    TaskSpan: styled.span<{ color: string }>`
      display: block;
      position: relative;
      color: ${props => props.color};
      line-height: 20px;
      margin-bottom: 30px;
      cursor: pointer;
    `,
  }
}

export default css