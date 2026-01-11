import { ImagedBackground } from "@/layout/imaged-background";
import { cn } from "@/lib/utils/cn";
import { ManageSearch } from "@mui/icons-material";
import { Button } from "@mui/material";

// ----------------------------------------------------------------------

const NoDataComp = ({ noDataMessage, fullScreen, onRefetch, isRefetchLoading }: { noDataMessage?: string, fullScreen?: boolean, onRefetch?: () => void, isRefetchLoading?: boolean }) => {
    return (
        <ImagedBackground
            sx={(theme) => ({ backgroundColor: theme.palette.background.default, })}
            className={cn("flex justify-center items-center flex-col w-full", fullScreen ? "h-dvh" : "h-full")}>
            <ManageSearch color='error' fontSize='large' className="scale-150" />
            <span className="mt-4 text-lg font-medium">{noDataMessage || "No Data"}</span>
            {onRefetch && <Button loading={isRefetchLoading} loadingPosition="start" color='error' onClick={onRefetch}>Try Again</Button>}
        </ImagedBackground>
    )
}

export default NoDataComp