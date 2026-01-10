import { Box, type BoxProps, type CSSObject } from "@mui/material";

// ----------------------------------------------------------------------

export const ImagedBackground = ({ children, bgProps, ...props }: { bgProps?: BoxProps, children?: React.ReactNode } & BoxProps) => {
    return <Box className="relative flex w-full h-full justify-center items-center" {...props}>
        <Box sx={{ '&::before': backgroundStyles() }} {...bgProps} />
        {children}
    </Box>
}
const backgroundStyles = (): CSSObject => ({
    pointerEvents: 'none',
    opacity: 0.24,
    width: '100%',
    height: '100%',
    content: "''",
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundImage: 'url(/assets/overlay.jpg)',
});
