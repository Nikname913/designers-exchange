import styled from "styled-components"

const css = {
  Header: {
    Container: styled.section`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      position: relative;
      box-sizing: border-box;
      width: 350px;
      height: 50px;
      background-color: white;
      box-shadow: 0px 3px 16px 2px rgba(0, 0, 0, 0.12);
      padding: 0px 16px;
      margin-left: 60px;
      margin-top: 16px;
      border-top-right-radius: 4px;
      border-top-left-radius: 4px;
    `
  },
  Foooter: {
    Container: styled.section`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      position: relative;
      box-sizing: border-box;
      width: 350px;
      height: 60px;
      background-color: white;
      box-shadow: 0px 3px 16px 2px rgba(0, 0, 0, 0.12);
      padding: 0px 16px;
      margin-left: 60px;
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;
    `,
    MenuItem: styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      width: 18%;
      cursor: pointer;
    `,
  },
  Content: {
    Container: styled.section`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      box-sizing: border-box;
      width: 350px;
      min-height: 500px;
      padding: 0px 16px;
      margin-left: 60px;
      border-left: 1px solid rgba(0, 0, 0, 0.04);
      border-right: 1px solid rgba(0, 0, 0, 0.04);
    `
  },
  RMe: {
    Container: styled.aside`
      display: block;
      position: absolute;
      height: 100%;
      width: 76.5%;
      margin-left: 60px;
      left: 23.5%;
      z-index: 10;
      background-color: #3A4B56;
      padding: 23px 25px;
      box-sizing: border-box;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    `,
    ContentLine: styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    `
  }
}

export default css