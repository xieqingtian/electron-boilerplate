import React from 'react';
import { hot } from 'react-hot-loader/root';
import { useSelector } from 'react-redux';

import './App.scss';
import { RootState } from '@/store/rootReducer';
import Hello from '../features/Hello';

function App() {
    const count = useSelector((state: RootState) => state.count.count);

    return (
        <div>
            <h1 className="h1">{count}</h1>
            <Hello name="哈哈" />
        </div>
    );
}

export default hot(App);
