# 16팀 윤민호 오인규

<h2 align="center">
  <a href="https://banksalad.ssu.life">LIVE DEMO</a>
</h2>

<div align="center">
  <img width="400" alt="qr-code" src="https://user-images.githubusercontent.com/13645032/128349430-c865610e-9f3d-4a51-bd1e-7446f55d3479.png">
</div>

<div align="center">
  네이버, 카카오톡 APP안에서 QR 코드로 스캔하면 웹뷰안에서 볼 수 있어요.
</div>

### Database 설계(EER)

![EER](https://cashbook-16.s3.ap-northeast-2.amazonaws.com/projects/eer.png)

---

### 프로젝트 구조

```
client
├─src
│ └─index.ts
├─package.json
├─tsconfig.json
├─jest.config.js
├─babel.config.js
├─webpack.common.js
├─webpack.dev.js
└─webpack.prod.js
server
├─public
│ ├─bundle.js
│ └─index.html
├─src
│ ├─app.ts
│ └─index.ts
├─package.json
├─tsconfig.json
└─jest.config.js
package.json
```

---

## install

root, client, server 각 폴더에서 yarn install 을 해야합니다. (yarn 은 npm 으로 대체 가능합니다.)

```
yarn install
```

```
cd client
yarn install
```

```
cd server
yarn install
```

---

## 개발 모드 실행

### client, server 동시 실행

```
yarn run start
```

### client 단독 실행

```
cd client
yarn run dev
```

### server 단독 실행

```
cd server
yarn run dev
```

---

## 배포 모드 실행

### 배포

```
cd client
yarn run build
```

```
cd server
yarn run build
yarn run start
```

### 배포 종료

```
npx pm2 kill
```
