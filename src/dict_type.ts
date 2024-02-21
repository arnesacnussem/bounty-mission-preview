export interface Job {
    name?: string;
}

export interface JobRenderProps extends Job {
    codeName: JobStageNames | string;
    index: number;
    quality: JobQuality;
}

export type JobQuality = 'good' | 'middle' | 'bad' | 'unknown';
export enum JobStageNames {
    DynamicCapture = 'DynamicCapture',
    DynamicExterminate = 'DynamicExterminate',
    DynamicResourceTheft = 'DynamicResourceTheft',
    DynamicCaveExterminate = 'DynamicCaveExterminate',
    DynamicSabotage = 'DynamicSabotage',
    DynamicRescue = 'DynamicRescue',
    DynamicAssassinate = 'DynamicAssassinate',
    HiddenResourceCaches = 'HiddenResourceCaches',
    DynamicHijack = 'DynamicHijack',
    HiddenResourceCachesCave = 'HiddenResourceCachesCave',
    DynamicDefend = 'DynamicDefend',
}
