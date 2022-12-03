import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 실제로 결과물이 될 제일 부모. page 들을 따로 만들어놓고 여기서 보여준다.
// react 앱에는 일반적으로 하나의 root 노드가 있다. 기존 프로젝트에 통합하는 경우 root가 여러개일 수 있다.
// 랜더링 하고싶다면 아래처럼 ReactDOM.createRoot()로 노드를 만든 후, root.render() 한다.
const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render( // 
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
