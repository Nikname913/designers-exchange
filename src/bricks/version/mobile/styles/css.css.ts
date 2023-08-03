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
      min-height: 100px;
      padding: 0px 16px;
      margin-left: 60px;
      border-left: 1px solid rgba(0, 0, 0, 0.04);
      border-right: 1px solid rgba(0, 0, 0, 0.04);
    `
  }
}

export default css