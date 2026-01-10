import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router"

type Props = {
    goBackLink?: string
    title?: string
    description?: string
    actions?: React.ReactNode
    tabSection?: React.ReactNode
}

const PageHeader = (props: Props) => {
    const { goBackLink, title, description, actions, tabSection } = props
    const navigate = useNavigate()
    return (
        <Box
            sx={{ backgroundColor: 'primary.main', borderTop: 1, borderBottom: 1, borderColor: 'divider', color: 'primary.contrastText', padding: 1, paddingTop: 8, ...(tabSection && { paddingBottom: 0 }) }}
            className="flex flex-col gap-2 items-center">
            <Box className="w-full flex items-center gap-1">
                {goBackLink && <Button className="w-8! h-12! min-w-8! min-h-12! rounded-full!" onClick={() => navigate(goBackLink)} variant="outlined"><ArrowBackIosNewRounded sx={{ color: 'text.primary' }} /></Button>}
                <Box className="flex justify-between w-full">
                    <Box display='flex' flexDirection='column' flexGrow={1} >
                        {title && <Typography color='text.primary' variant="h3">{title}</Typography>}
                        {description && <Typography variant="subtitle1">{description}</Typography>}
                    </Box>
                    {actions && <div>{actions}</div>}
                </Box>
            </Box>
            {tabSection && <Box sx={{ paddingLeft: 2 }} className="w-full mt-4 translate-y-px">{tabSection}</Box>}
        </Box>
    )
}

export default PageHeader