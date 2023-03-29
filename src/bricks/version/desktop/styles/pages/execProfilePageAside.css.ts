import styled from 'styled-components'

const css = {
  MenuContainer: styled.aside`
    display: block;
    position: relative;
    width: 300px;
    height: auto;
    box-sizing: border-box;
    padding-bottom: 20px;
    padding-right: 20px;
  `,
  LeftMenuIconButton: styled.div<{ backgroundColor: string }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    border-radius: 8px;
    padding-left: 20px;
    background-color: ${props => props.backgroundColor};
    margin-bottom: 10px;
    cursor: pointer;
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