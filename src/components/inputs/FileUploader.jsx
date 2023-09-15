//import React from 'react';

import { Delete, Image } from "@mui/icons-material";
import { Avatar, Box, Button, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { MuiFileInput } from "mui-file-input";
import { useState } from "react";

const FileUploader = ({onSubmit}) => {

    const [files, setFiles] = useState([]);
    const [inputField, setInputField] = useState(null)
    
    const mutation = useMutation({
        mutationFn: (e) => {
            e.preventDefault()

            return axios.all(files.map((file) => {
                const form = new FormData();
                form.append('file', file[0]);
                form.append('alt', '');

                return axios.post('https://127.0.0.1:8001/api/media_objects', form)
            })).then(res => onSubmit(res))
            .catch(err => console.log(err))
            .finally(() => setFiles([]))
        }
    })

    const handleChange = (newFile) => {
        setInputField(newFile);
    }

    const addFile = () => {
        setFiles([...files, inputField])
        setInputField(null)
    }

    const removeFile = (deleteFile) => {
        setFiles(files.filter(file => file !== deleteFile))
    }

    if(mutation.isLoading){
        return (
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} width={'100%'}>
                <Typography>Fichiers en cours d'envoie...</Typography>
            </Box>
        )
    }

    return (
        <Box p={0} m={0}>
            <List>
                {files.map((file, index) => (
                    <ListItem   key={index} 
                                secondaryAction={
                                    <IconButton onClick={() => removeFile(file)} edge="end" aria-label="delete">
                                        <Delete />
                                    </IconButton>
                                }
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <Image/>
                            </Avatar>
                        </ListItemAvatar>
                            <ListItemText primary={file[0].name} />
                    </ListItem>
                ))}
            </List>
            <Box display={'flex'} gap={2}>
                <MuiFileInput fullWidth multiple value={inputField} onChange={handleChange} />
                <Button onClick={addFile} variant="outlined">Ajouter</Button>
            </Box>
            <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} p={2}>
                <Button onClick={(e) => mutation.mutate(e)} variant="contained" disabled={files.length > 0 ? false : true} >Téléverser</Button>
            </Box>
        </Box>
    );
};

export default FileUploader;