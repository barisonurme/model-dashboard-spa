import type { ReactNode } from "react"

import AppLogo from "@/components/molecules/app-logo"
import { Box } from "@mui/material"
import { layoutConfig } from "@/layout/layout-config"


const LayoutHeader = ({ action }: { action?: ReactNode }) => {
    return (
        <Box width='100%' sx={(theme) => ({ backgroundColor: theme.palette.background.paper, borderBottom: 1, borderColor: theme.palette.divider, height: layoutConfig.headerHeight, padding: layoutConfig.paddings })} className="flex items-center w-full">
            <AppLogo />
            {action}
        </Box>
    )
}

export default LayoutHeader