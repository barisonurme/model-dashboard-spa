import { Box } from "@mui/material";
import { layoutConfig } from "./layout-config"
import LayoutHeader from "./layout-header";
import SelectProject from "@/pages/projects/form/select-project";

// ----------------------------------------------------------------------

const MainLayout = ({ children }: { children?: React.ReactNode }) => {
  return <>
    <Box
      sx={(theme) => ({ backgroundColor: theme.palette.background.default, })}
      className="flex flex-col w-full h-dvh">


      <LayoutHeader action={<SelectProject />} />

      <Box className="flex-1 w-full overflow-auto" style={{ maxHeight: `calc(100dvh - ${layoutConfig.headerHeight})`, height: `calc(100dvh - ${layoutConfig.headerHeight})` }}>
        {children}
      </Box>
    </Box>
  </>
}

export default MainLayout