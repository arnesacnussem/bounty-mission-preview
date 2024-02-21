import React, { useState } from 'react';
import { Box } from '@mui/material';

const DragAndDropBox = (props: {
    children: React.ReactNode;
    setFile: (file: File) => void;
}) => {
    const [dragOver, setDragOver] = useState(false);
    return (
        <Box
            sx={{
                p: 2,
                flexGrow: 1,
                bgcolor: dragOver ? 'action.hover' : 'unset',
                '&:hover': {
                    borderColor: 'primary.main',
                },
            }}
            onDragOver={e => {
                e.preventDefault(); // Prevent default behavior (Prevent file from being opened)
                setDragOver(true);
            }}
            onDragEnter={e => {
                e.preventDefault();
                setDragOver(true);
            }}
            onDragLeave={e => {
                e.preventDefault();
                setDragOver(false);
            }}
            onDrop={e => {
                e.preventDefault();
                setDragOver(false);

                const [file] = e.dataTransfer.files;
                if (file) props.setFile(file);
            }}
        >
            {props.children}
        </Box>
    );
};

export default DragAndDropBox;
