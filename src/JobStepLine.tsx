import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    timelineOppositeContentClasses,
    TimelineSeparator,
} from '@mui/lab';
import { JobRenderProps } from './dict_type.ts';
import { QualityMap } from './consts.ts';
import { Box, Typography } from '@mui/material';
import React from 'react';

const Step = React.memo((props: JobRenderProps) => {
    const quality = QualityMap[props.quality];
    const Icon = quality.icon;
    return (
        <TimelineItem>
            <TimelineOppositeContent
                color={'textSecondary'}
                sx={{
                    alignSelf: 'center',
                }}
            >
                阶段 <b>{props.index}</b>
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color={quality.color}>
                    <Icon />
                </TimelineDot>
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2, display: 'flex' }}>
                <Box
                    sx={{
                        alignSelf: 'center',
                    }}
                >
                    <Typography>{props.name}</Typography>
                    <Typography
                        sx={{
                            color: '#757575',
                        }}
                    >
                        {props.codeName}
                    </Typography>
                </Box>
            </TimelineContent>
        </TimelineItem>
    );
});
export const JobStepLine = React.memo(
    React.forwardRef<HTMLDivElement, { jobs: Array<JobRenderProps> }>(
        (props, ref) => {
            return (
                <div ref={ref}>
                    <Timeline
                        sx={{
                            [`& .${timelineOppositeContentClasses.root}`]: {
                                flex: 0.2,
                            },
                        }}
                    >
                        {props.jobs.map((s, i) => (
                            <Step key={i} {...s} />
                        ))}
                    </Timeline>
                </div>
            );
        },
    ),
);
