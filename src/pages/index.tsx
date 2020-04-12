import React from 'react';
import styles from './index.less';
import { history } from 'umi';

export default () => {
const run = () => {
  history.push('/register');
}

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <button onClick={run}>注册</button>
    </div>
  );
}
