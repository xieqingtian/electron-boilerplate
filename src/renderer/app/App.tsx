import React, { Fragment } from 'react';
import { hot } from 'react-hot-loader/root';
import { createGlobalStyle } from 'styled-components';

import { Header } from '../features/Header';
import { Counter } from '../features/Counter';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: '微软雅黑'
    }

    html,
    body,
    #root {
        width: 100%;
        height: 100%;
    }
`;

const App = () => (
    <Fragment>
        <GlobalStyle />
        <Header />
        <Counter />
    </Fragment>
);

export default hot(App);
