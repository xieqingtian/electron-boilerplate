import React, { Fragment } from 'react';
import { Button, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { changeCount, changeCountAsync, selectCount } from '@/store/counterSlice';

export default function Counter() {
    const dispatch = useDispatch();
    const count = useSelector(selectCount);

    return (
        <Fragment>
            <CountDisplay>{count}</CountDisplay>
            <ButtonWrapper>
                <Space>
                    <Button
                        onClick={() => {
                            dispatch(changeCount(1));
                        }}
                    >
                        plus one
                    </Button>
                    <Button
                        onClick={() => {
                            dispatch(changeCount(-1));
                        }}
                    >
                        minus one
                    </Button>
                    <Button
                        onClick={() => {
                            dispatch(changeCountAsync(1));
                        }}
                    >
                        plus async
                    </Button>
                </Space>
            </ButtonWrapper>
        </Fragment>
    );
}

const CountDisplay = styled.h1`
    font-size: 48px;
    text-align: center;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
`;
