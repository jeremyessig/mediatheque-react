import { Box, Card, CardContent, CardHeader, CardMedia, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const IndexArticle = () => {

    const {data:articles, isFetching} = useQuery(['articles'], () => {
        return axios.get('https://localhost:8001/api/articles').then(res => res.data).catch(err => console.log(err))
    })

    if(isFetching){
        return (
            <Box>
                <Typography>Chargement...</Typography>
            </Box>
        )
    }

    //console.log(articles['hydra:member'])
    return (
        <Box>
            <Grid container columns={4} gap={4}>
                {
                    articles['hydra:member'].map((article) => (
                        <Grid item key={article.id}>
                            <Card>
                                <CardHeader title={article.title} />
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={'https://localhost:8001' + article.medias[0].contentUrl}
                                    alt="Paella dish"
                                />
                                <CardContent>
                                    <Typography>
                                        {article.content}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }

            </Grid>
        </Box>
    );
};

export default IndexArticle;