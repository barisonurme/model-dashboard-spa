import { Box, Typography } from "@mui/material"
import { GridViewRounded } from '@mui/icons-material';
import { Link } from "react-router";



const AppLogo = () => {
    return (
        <Link to='/'>
            <Box display='flex' alignItems='center' gap={1}>
                <Box className='flex justify-center items-center w-4 h-4 squircle' sx={{ backgroundColor: 'primary.main' }}>
                    <GridViewRounded sx={() => ({ color: 'primary.contrastText' })} className="scale-75" />
                </Box>
                <Typography variant="h6" fontWeight={700}>MD Dashboard</Typography>
            </Box>
        </Link>
    )
}

export default AppLogo