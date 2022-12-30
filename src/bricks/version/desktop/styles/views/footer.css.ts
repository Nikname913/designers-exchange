import styled from 'styled-components'

const css = {
  FooterWrapper: styled.section<{ backgroundColor: string }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    min-width: 1250px;
    max-width: 1950px;
    height: auto;
    padding-left: 100px;
    padding-right: 120px;
    padding-top: 36px;
    padding-bottom: 34px;
    background-color: ${props => props.backgroundColor};
  `,
  Logo: styled.div`
    display: block;
    position: relative;
  `,
  MemuItemsContainer: styled.div`
    display: block;
    position: relative;
    margin-left: 120px;
  `,
  MenuItem: styled.span<{ color: string }>`
    display: block;
    position: relative;
    color: ${props => props.color};
    line-height: 23px;
  `,
  GorizontalLine: styled.span<{ backgroundColor: string }>`
    display: block;
    position: relative;
    width: calc(100% - 110px);
    height: 1px;
    background-color: ${props => props.backgroundColor};
    transform: matrix(1, 0, 0, -1, 0, 0);
    margin-top: 34px;
    margin-bottom: 22px;
    opacity: 0.6;
  `
}

export default css