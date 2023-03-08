# 감정기록 Project :heart_eyes:

: Frontend-Developer 404

### Description

- 감정을 기록 하고
- 기록 된 감정을 List 로 보여주고
- 기록 된 감정을 Click 시 해당하는 감정기록 상세페이지로 이동하고
- 작성 된 날짜 순으로 filter , 감정점수에 따라 filter 가능하고
- 기록 된 감정을 수정 할 수 있는 나만의 감정기록Diary

## 2023_03_07 : Project 기초 환경 설정

### 1. Font Setting

> #### - Google Web Fonts를 이용 프로젝트에 사용할 폰트를 선택 후 Setting
>
> #### - App.css 에 Google Web Fonts에서 고른 폰트 @import

### 2. Layout Setting

> #### - 모든 페이지에 반영되는 공통 레이아웃 셋팅
>
> #### - body tag css 추가

```javascript
  body {
      background-color: #f6f6f6;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Nanum Pen Script';
      min-height: 100vh;
      margin: 0px;
  }
```

> #### - Media Query 사용

```
  @media (min-width : 650px){
      .App{
          width: 640px;
      }
  }

  @media (max-width : 650px) {
      .App {
          width: 90vw;
      }
  }
```

> #### - Id가 root 인 Div , className이 App 인 Div에 Style 추가

```
  #root {
      background-color: white;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .App {
      min-height: 100vh;
      padding-left: 20px;
      padding-right: 20px;
  }
```

### 3. img assets Setting

> #### - Project에서 사용 할 img public assets폴더 생성 해당폴더 안에 img Setting
>
> #### - 사용 ex)

```
process.env.PUBLIC_URL +`/assets/emotion2.png`
```

### 4. 공통 Component Setting

> #### - 모든 페이지에 공통으로 사용되는 Button, Header Component Setting
>
> #### - src components MyButton.js / MyHeader.js

---
