import { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import './timeline.css';
import { useFileHandler } from './use-file-handler.tsx';
import { Box, Button, IconButton, Slide, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight, Replay } from '@mui/icons-material';
import { JobStepLine } from './JobStepLine.tsx';

const App = () => {
    const { stages, progress, err, fileHandler } = useFileHandler();
    const [file, setFile] = useState<File | null>(null);
    const [currentSelected, setCurrentSelected] = useState(0);
    const [previousSelected, setPreviousSelected] = useState(0);
    const [displaying, setDisplaying] = useState(0);

    useEffect(() => {
        if (file != null) fileHandler(file);
    }, [file, fileHandler]);

    return (
        <div
            style={{
                height: '100%',
                width: '100%',
            }}
        >
            <div
                style={{
                    display: 'flex',
                }}
            >
                <div
                    id={'fu'}
                    style={{
                        flexGrow: 1,
                        marginLeft: '8px',
                    }}
                >
                    <FileUploader
                        multiple={false}
                        handleChange={(f: File) => setFile(f)}
                        name="file"
                        types={['LOG']}
                    >
                        <div
                            style={{
                                border: '2px dashed #39C5BB',
                                background: '#39C5BB1f',
                                borderRadius: '16px',
                                display: 'flex',
                                justifyContent: 'start',
                                alignItems: 'start',
                                paddingLeft: '64px',
                            }}
                        >
                            <p
                                style={{
                                    color: '#aeaeae',
                                }}
                            >
                                {err ? (
                                    <Typography color={'error'}>
                                        {err}
                                    </Typography>
                                ) : progress == 0 ? (
                                    '选择一个日志文件(EE.log)来查看'
                                ) : progress < 100 ? (
                                    `读取文件: 进度${progress}%`
                                ) : (
                                    `文件读取完毕，共计找到${stages.length}个符合要求的项目`
                                )}
                            </p>
                        </div>
                    </FileUploader>
                </div>
            </div>
            <Box
                sx={{
                    display: 'flex',
                    // justifyContent: 'center',
                    alignItems: 'center',
                    m: 2,
                    '& > :not(:first-child)': {
                        mr: 1,
                    },
                }}
            >
                <Button
                    disabled={progress !== 100}
                    onClick={() => file && fileHandler(file)}
                >
                    <Replay
                        style={{
                            width: '24px',
                            height: '24px',
                        }}
                    />
                    重新加载文件
                </Button>

                <IconButton
                    color={'primary'}
                    disabled={
                        stages.length <= 1 || currentSelected == stages.length
                    }
                    onClick={() =>
                        setCurrentSelected(p => {
                            setPreviousSelected(p);
                            return p + 1;
                        })
                    }
                >
                    <ChevronLeft sx={{ height: '32px', width: '32px' }} />
                </IconButton>
                <Typography
                    variant={'h5'}
                    color={theme =>
                        stages.length == 0
                            ? theme.palette.action.disabled
                            : theme.palette.primary.main
                    }
                    sx={{
                        width: '32px',
                        textAlign: 'center',
                    }}
                >
                    {stages.length - currentSelected}
                </Typography>
                <IconButton
                    color={'primary'}
                    disabled={stages.length <= 1 || currentSelected == 0}
                    onClick={() =>
                        setCurrentSelected(p => {
                            setPreviousSelected(p);
                            return p - 1;
                        })
                    }
                >
                    <ChevronRight sx={{ height: '32px', width: '32px' }} />
                </IconButton>
            </Box>
            <div
                style={{
                    width: '100%',
                    overflow: 'hidden',
                }}
            >
                {progress === 100 && stages.length == 0 && (
                    <Typography>'没找见啊，要不过会再试试啥的'</Typography>
                )}
                {stages.length > 0 && (
                    <Slide
                        in={currentSelected == displaying}
                        mountOnEnter
                        unmountOnExit
                        timeout={300}
                        key={displaying}
                        direction={
                            currentSelected != displaying
                                ? previousSelected < currentSelected
                                    ? 'left'
                                    : 'right'
                                : previousSelected < currentSelected
                                  ? 'right'
                                  : 'left'
                        }
                        onExited={() => setDisplaying(currentSelected)}
                    >
                        <JobStepLine
                            jobs={stages[stages.length - 1 - displaying].jobs}
                        />
                    </Slide>
                )}
            </div>
        </div>
    );
};

export default App;
