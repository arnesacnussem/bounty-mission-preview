import { Job, JobStageNames } from './dict_type';

export const zh: {
    [key in JobStageNames]?: Job;
} = {
    DynamicCapture: {
        name: '捕获，但是注意别打错人了',
    },
    DynamicExterminate: {
        name: '地面歼灭(25-100名敌人)',
    },
    DynamicResourceTheft: {
        name: '找到重甲金库',
    },
    DynamicCaveExterminate: {
        name: '洞穴歼灭',
    },
    DynamicSabotage: {
        name: '召唤补给x3',
    },
    DynamicRescue: {
        name: '救援',
    },
    DynamicAssassinate: {
        name: '一分钟之内找到刺杀目标',
    },
    HiddenResourceCaches: {
        name: '找箱子x3',
    },
    DynamicHijack: {
        name: '定位坠落的无人机',
    },
    HiddenResourceCachesCave: {
        name: '下地洞找箱子x3',
    },
    DynamicDefend: {
        name: '解放该营地，但是守两分半',
    },
};
