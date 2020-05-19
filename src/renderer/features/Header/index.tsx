import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

import logo from './logo.jpg';

export default function Header() {
    return (
        <Container>
            <Logo src={logo} />
            <Title>Electron Boilerplate</Title>
            <SubTitle>electron project template based on qingtian-cli</SubTitle>
            <Button
                onClick={() => {
                    window.open('https://github.com/xieqingtian/qingtian-cli', '_blank');
                }}
            >
                Get Started
            </Button>
        </Container>
    );
}

const Container = styled.header`
    padding: 64px;
    color: #fff;
    text-align: center;
    background-color: #000;
`;

const Logo = styled.img`
    width: 100px;
    height: 100px;
`;

const Title = styled.h1`
    color: #fff;
    font-size: 48px;
`;

const SubTitle = styled.p`
    font-size: 24px;
`;
