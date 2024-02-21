import { useCallback, useState } from 'react';
import { JobRenderProps, JobStageNames } from './dict_type.ts';
import { zh } from './dict.ts';
import { Qualities } from './consts.ts';

const getContentAfterLastSlash = (str: string) => {
    const parts = str.split('/');
    return parts[parts.length - 1]; // Returns the last element
};

const chunkSize = 1024 * 1024;
const regex = /^\d+\.\d+\sNet\s\[Info]:\sSet\ssquad\smission:\s(.*)/;
export const useFileHandler = () => {
    const [stages, setStages] = useState<Array<RawJobStages>>([]);
    const [err, setErrMsg] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);

    const fileHandler = useCallback((file: File) => {
        console.log('Start Process File', file);
        setStages([]);
        setErrMsg(null);

        let offset = 0;
        let lastLine = '';
        const fr = new FileReader();

        const seek = () => {
            if (offset >= file.size) {
                setProgress(100);
                return;
            }
            const slice = file.slice(offset, offset + chunkSize);
            fr.readAsText(slice);
            setProgress(Math.floor((offset / file.size) * 100));
        };

        fr.onerror = e => {
            console.error('Error reading file', file, e);
            setErrMsg('读取文件时出错，请重试');
        };

        fr.onload = () => {
            const text = fr.result as string;
            console.log(`Read File length=${text.length}`);

            let lines = (lastLine + text).split('\n');
            if (offset < file.size) {
                lastLine = lines[lines.length - 1];
                lines = lines.slice(0, -1);
            }

            for (const line of lines) {
                const match = line.match(regex);
                if (match && match[1]) {
                    try {
                        const json = JSON.parse(match[1]);
                        if (json['jobStages']) {
                            const stages = json['jobStages'] as string[];
                            setStages(p => [
                                ...p,
                                {
                                    raw: json['jobStages'] as string[],
                                    jobs: stages
                                        .map(getContentAfterLastSlash)
                                        .map(getJobRenderPropsFor),
                                } as RawJobStages,
                            ]);
                        }
                    } catch (e) {
                        console.log('error parse json', match, e);
                    }
                }
            }

            // continue next chunk
            offset += chunkSize;
            seek();
        };

        // start process
        seek();
    }, []);

    return {
        stages,
        err,
        progress,
        fileHandler,
    };
};

const getJobRenderPropsFor = (name: string, index: number) => {
    const isKnownName = name in JobStageNames;
    const codeName = name as JobStageNames;
    return {
        codeName,
        index: index + 1,
        quality: isKnownName ? Qualities[codeName] || 'bad' : 'unknown',
        ...(isKnownName ? zh[codeName] : {}),
    } as JobRenderProps;
};

interface RawJobStages {
    raw: string[];
    jobs: Array<JobRenderProps>;
}
