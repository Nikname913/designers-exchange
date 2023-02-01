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
  `
}

export default css