import React from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import styles from './index.module.scss';
import { changeCount } from '@/store/countSlice';
import { RootState } from '@/store/rootReducer';

type Props = {
    name: string;
};

export default function Hello({ name }: Props) {
    const dispatch = useDispatch();
    const count = useSelector((state: RootState) => state.count.count);

    const increase = () => {
        dispatch(changeCount(1));
    };

    const reduce = () => {
        dispatch(changeCount(-1));
    };

    return (
        <React.Fragment>
            <h2 className={styles.h2}>
                {count}
                {name}
            </h2>
            <Button type="primary" onClick={increase}>
                加1
            </Button>
            <Button type="primary" onClick={reduce}>
                减1
            </Button>
        </React.Fragment>
    );
}
