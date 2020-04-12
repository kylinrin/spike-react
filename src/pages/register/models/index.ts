import { Model } from 'dva';
import { getInfo as GETINFO } from '@/api/register';

export interface RegisterModelInterface {
    /**
     * 注册信息
     */
    userInfo: any[]
}

const registerModel: Model = {
    namespace: 'registerModel',
    state: {
        userInfo: {}
    },
    // 同步
    reducers: {
        save(state, { payload }: any) {
            return { ...state, ...payload };
        }
    },
    // 异步
    effects: {
        getInfo: function* ({ payload }, { call, put }) {
            const userInfo = yield call(GETINFO, payload);
            if (typeof(userInfo.uuid) !== 'undefined') {
                console.log('信息获取成功：uuid = ', userInfo.uuid);
            }
        }
    }
}

export default registerModel;