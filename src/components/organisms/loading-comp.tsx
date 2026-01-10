import { ImagedBackground } from "@/layout/imaged-background"
import { cn } from "@/lib/utils/cn"
import { CircularProgress } from "@mui/material";


const LoadingComp = ({ loadingText, fullScreen }: { loadingText?: string, fullScreen?: boolean }) => {
    return (
        <ImagedBackground
            sx={(theme) => ({ backgroundColor: theme.palette.background.default, })}
            className={cn("flex justify-center items-center flex-col w-full", fullScreen ? "h-dvh" : "h-full")}>
            <CircularProgress />
            <span className="mt-4 text-lg font-medium">{loadingText || "Loading..."}</span>
        </ImagedBackground>
    )
}

export default LoadingComp