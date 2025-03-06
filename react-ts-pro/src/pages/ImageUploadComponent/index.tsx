import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Checkbox,
    List,
    ListItem
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

const ImageUploadComponent: React.FC = () => {
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imageGallery, setImageGallery] = useState<File[]>([]);
    const [openUploadDialog, setOpenUploadDialog] = useState(false);
    const [openChooseDialog, setOpenChooseDialog] = useState(false);

    const handleChooseImage = () => {
        setOpenChooseDialog(true);
    };

    const handleUploadImage = () => {
        setOpenUploadDialog(true);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const files = Array.from(e.dataTransfer.files);
        setImageFiles((prevFiles) => [...prevFiles, ...files]);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setImageFiles((prevFiles) => [...prevFiles, ...files]);
    };

    const handleRemoveFile = (index: number) => {
        setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleCancel = () => {
        setImageFiles([]);
        setOpenUploadDialog(false);
    };

    const handleConfirm = () => {
        setImageGallery((prevGallery) => [...prevGallery, ...imageFiles]);
        setImageFiles([]);
        setOpenUploadDialog(false);
    };

    const handleCancelChoose = () => {
        setOpenChooseDialog(false);
    };

    const handleConfirmChoose = () => {
        console.log('confirm image choosing');
        setOpenChooseDialog(false);
    };

    return (
        <div>
            <Button variant="contained" onClick={handleChooseImage}>
                Choose Image
            </Button>
            <Button variant="contained" onClick={handleUploadImage} style={{ marginLeft: '16px' }}>
                Upload Image
            </Button>
            <Dialog open={openUploadDialog} onClose={handleCancel} maxWidth='sm' fullWidth>
                <DialogTitle>Upload Images</DialogTitle>
                <DialogContent
                    style={{ minHeight: '200px' }}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        multiple
                        style={{ display: 'none' }}
                        id="fileInput"
                        onChange={handleFileSelect}
                    />
                    <label
                        htmlFor="fileInput"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '200px',
                            border: '2px dashed #ccc',
                            borderRadius: '4px',
                            textAlign: 'center',
                        }}
                    >
                        <AddCircleOutlineIcon fontSize="large" style={{ marginBottom: 8 }} />
                        <span>Drag Image Here or Click to Upload</span>
                    </label>
                    {imageFiles.length > 0 && (
                        <List>
                            {imageFiles.map((file, index) => (
                                <ListItem key={index}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: 16 }}
                                        />
                                        <div>{file.name}</div>
                                    </div>
                                    <Button edge="end" aria-label="delete" onClick={() => handleRemoveFile(index)}>
                                        <CloseIcon />
                                    </Button>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleConfirm} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openChooseDialog} onClose={handleCancelChoose} maxWidth='sm' fullWidth>
                <DialogTitle>Choose image(s) for current Note</DialogTitle>
                <DialogContent style={{ minHeight: '10rem', maxHeight: '400px', overflowY: 'auto', display: 'flex', flexWrap: 'wrap' }}>
                    {imageGallery.length === 0 && <div style={{ width: '100%' }}>No images available.</div>}
                    {imageGallery.map((file, index) => (
                        <div key={index} style={{ width: '30%', margin: '1.66%', position: 'relative' }}>
                            <Checkbox
                                style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
                                inputProps={{ 'aria-label': 'select image' }}
                            />
                            <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                            />
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelChoose}>Cancel</Button>
                    <Button onClick={handleConfirmChoose} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ImageUploadComponent;