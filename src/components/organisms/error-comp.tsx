import { ImagedBackground } from "@/layout/imaged-background";
import { cn } from "@/lib/utils/cn";
import { ErrorOutline } from "@mui/icons-material";
import { Button } from "@mui/material";


const ErrorComp = ({ errorMessage, fullScreen, onRefetch, isRefetchLoading }: { errorMessage?: string, fullScreen?: boolean, onRefetch?: () => void, isRefetchLoading?: boolean }) => {
    return (
        <ImagedBackground
            sx={(theme) => ({ backgroundColor: theme.palette.background.default, })}
            className={cn("flex justify-center items-center flex-col w-full", fullScreen ? "h-dvh" : "h-full")}>
            <ErrorOutline color='error' fontSize='large' className="scale-150" />
            <span className="mt-4 text-lg font-medium">{errorMessage || "Error occurred"}</span>
            {onRefetch && <Button loading={isRefetchLoading} loadingPosition="start" color='error' onClick={onRefetch}>Try Again</Button>}
        </ImagedBackground>
    )
}

export default ErrorComp