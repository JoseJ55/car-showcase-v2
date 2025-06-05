import { proxy } from 'valtio';

const state = proxy({
    loaded: {}
});

export default state;
