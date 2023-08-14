import styled from 'styled-components'
import { IHeaderStyleProps } from '../../../../models-ts/styles/head-styles-models'

const css = {
  HeadWrapper: styled.section<IHeaderStyleProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    min-width: 1250px;
    max-width: 1950px;
    height: 105px;
    background-color: ${props => props.backgroundColor};
  `,
  HeadWrapperInner: styled.section<IHeaderStyleProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 105px;
    padding-left: 200px;
    padding-right: 200px;
    background-color: ${props => props.backgroundColor};
  `,
  HeadWrapperShadow: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 105px;
    top: 0;
    left: 0;
    background: rgba(214, 221, 226, 0.6);
    filter: blur(8px);
  `,
  Logo: styled.div`
    display: block;
    position: relative;
    margin-left: 16px;
  `,
  HeadMenu: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: relative;
  `,
  HeadControllers: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: relative;
  `,
  HeadControllersIcon: styled.span<IHeaderStyleProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    position: relative;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background-color: ${props => props.backgroundColor};
  `,
  HeadControllersAvatar: styled.span<IHeaderStyleProps>`
    display: block;
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: ${props => props.backgroundColor};
  `
}

export default css