import { JobQuality, JobStageNames } from './dict_type.ts';
import {
    Check,
    Clear,
    QuestionMark,
    Remove,
    SvgIconComponent,
} from '@mui/icons-material';

export const QualityMap: {
    [key in JobQuality]: {
        icon: SvgIconComponent;
        color: 'success' | 'warning' | 'error';
    };
} = {
    good: { icon: Check, color: 'success' },
    middle: { icon: Remove, color: 'warning' },
    bad: { icon: Clear, color: 'error' },
    unknown: { icon: QuestionMark, color: 'warning' },
};
export const Qualities: {
    [key in JobStageNames]?: JobQuality;
} = {
    DynamicCapture: 'good',
    DynamicExterminate: 'middle',
    DynamicRescue: 'good',
    DynamicAssassinate: 'good',
    HiddenResourceCaches: 'good',
    DynamicHijack: 'good',
};

export const mainColor = '#39C5BB';
