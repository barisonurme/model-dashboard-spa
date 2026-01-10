import { Box } from "@mui/material";
import AppLogo from "../components/molecules/app-logo"
import { layoutConfig } from "./layout-config"


const MainLayout = ({ children }: { children?: React.ReactNode }) => {
  return <>
    <Box
      sx={(theme) => ({ backgroundColor: theme.palette.background.default, })}
      className="flex flex-col w-full h-dvh">

      {/* Header | Might have own component later */}
      <Box width='100%' sx={(theme) => ({ backgroundColor: theme.palette.background.paper, borderBottom: 1, borderColor: theme.palette.divider })} style={{ height: layoutConfig.headerHeight, padding: layoutConfig.paddings }} className="flex items-center w-full">
        <AppLogo />
      </Box>
      <Box className="flex-1 w-full overflow-auto" style={{ maxHeight: `calc(100dvh - ${layoutConfig.headerHeight})`, height: `calc(100dvh - ${layoutConfig.headerHeight})` }}>
        {children}
      </Box>
    </Box>
  </>
}

export default MainLayout