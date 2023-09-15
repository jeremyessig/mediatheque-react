import { Avatar, Box, Button, Card, CardMedia, Dialog, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import FileUploader from "../components/inputs/FileUploader";
import axios from "axios";


const NewArticle = () => {

    const [form, setForm] = useState({title:'', content:''})
    const [files, setFiles] = useState([]);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleFile = (data) => {
        console.log(data)
        setFiles([...files, 
            ...data.map(d => {
                let newFile = {
                    id: d.data['@id'],
                    alt: d.data.alt,
                    url: d.data.contentUrl
                }
                return newFile
            }) 
        ])
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleForm = (e) => {
        e.preventDefault();
        
        let data = {
            title: form.title,
            content: form.content,
            medias: files.map(file => file.id)
        }

        axios.post('https://localhost:8001/api/articles', data)
        .then(res => console.log(res))
        .catch(err => console.log(err))

    }


    return (
        <>
            <Box display={'flex'} flexDirection={'column'} gap={6} component={'form'} onSubmit={handleForm}>
                <Box>
                    <Typography>Un nouvel article</Typography>
                </Box>
                <Box display={'flex'} gap={3} flexDirection={'column'}>
                    <TextField name="title" onChange={handleChange} label={'Titre'} variant="outlined" />
                    <TextField name="content" onChange={handleChange} label={'Contenu'} variant="outlined" multiline rows={5}/>

                </Box>
                <Box>
                    <Typography>Fichiers joints</Typography>
                    <Grid container columns={6} gap={2}>
                        {files.map((file, index) => (
                            <Grid item sx={1} key={index}>
                                <Card width={'220px'}>
                                    <CardMedia
                                    component="img"
                                    height="194"
                                        image={'https://localhost:8001/' + file.url}
                                    />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Button onClick={handleOpen} >Joindre des fichiers</Button>
                </Box>
                <Box>
                    <Button variant="contained" type="submit">Publier</Button>
                </Box>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={'720px'}
            >
                <DialogTitle id="alert-dialog-title">
                    Joindre des fichiers
                </DialogTitle>   
                <DialogContent sx={{width:'720px'}}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: 'fit-content',
                            }}
                    >
                        <FileUploader onSubmit={handleFile}/>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default NewArticle;