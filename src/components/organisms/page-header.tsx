import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { Box, Button, Chip, Icon, Typography } from "@mui/material";
import { useNavigate } from "react-router"

type Props = {
    goBackLink?: string
    title?: string
    subTitle?: string
    titleChip?: { label: string, icon?: string };
    description?: string
    actions?: React.ReactNode
    tabSection?: React.ReactNode
}

const PageHeader = (props: Props) => {
    const { goBackLink, title, titleChip, subTitle, description, actions, tabSection } = props
    const navigate = useNavigate()
    return (
        <Box
            sx={{ backgroundColor: 'primary.main', borderTop: 1, borderBottom: 1, borderColor: 'divider', color: 'primary.contrastText', padding: 1, paddingTop: 8, ...(tabSection && { paddingBottom: 0 }) }}
            className="flex flex-col gap-2 items-center">
            <Box className="w-full flex items-center gap-1">
                {goBackLink && <Button className="w-8! h-12! min-w-8! min-h-12! rounded-full!" onClick={() => navigate(goBackLink)} variant="outlined"><ArrowBackIosNewRounded sx={{ color: 'text.primary' }} /></Button>}
                <Box className="flex justify-between w-full">
                    <Box paddingRight={4} className='flex w-full justify-between'>
                        <Box display='flex' flexDirection='column' flexGrow={1} justifyContent='center'>
                            {title && <Box className='flex gap-2 items-center'><Typography color='text.primary' variant="h3">{title}</Typography></Box>}
                            {subTitle && <Typography variant="subtitle1">{subTitle}</Typography>}
                            {description && <Typography variant="subtitle2" fontStyle='italic' sx={{ opacity: 0.5 }}>{description}</Typography>}
                        </Box>

                        {titleChip?.label && <Chip sx={{ color: 'primary.contrastText', paddingX: 2, "& .MuiIcon-root": { color: 'primary.contrastText' } }} variant="outlined" label={titleChip.label} icon={titleChip.icon ? <Icon>{titleChip.icon}</Icon> : undefined} />}
                    </Box>
                    {actions && <div>{actions}</div>}
                </Box>
            </Box>
            {tabSection && <Box sx={{ paddingLeft: 2 }} className="w-full mt-4 translate-y-px">{tabSection}</Box>}
        </Box>
    )
}

export default PageHeader