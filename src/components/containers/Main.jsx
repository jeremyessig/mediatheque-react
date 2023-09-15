import { Stack } from '@mui/material';

const Main = ({children}) => {
    return (
        <Stack component={'main'} p={5}>
            {children}
        </Stack>
    );
};

export default Main;