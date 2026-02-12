import { Tooltip, TooltipPopup, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import WorkspaceLayout from "@/layouts/workspace-layout";
import { Head } from "@inertiajs/react";

export default function WorkspaceIndexPage() {
    return (
        <>
            <Head title="Workspace" />

            <TooltipProvider delay={400}>
                <Tooltip>
                    <TooltipTrigger>
                        <h1>Workspace Index</h1>
                    </TooltipTrigger>
                    <TooltipPopup side='right' align='center'>Workspace</TooltipPopup>
                </Tooltip>
            </TooltipProvider>
        </>
    );
}

const WorkspaceIndexLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <WorkspaceLayout>
            {children}
        </WorkspaceLayout>
    );
}

WorkspaceIndexPage.layout = (page: React.ReactNode) => <WorkspaceIndexLayout>{page}</WorkspaceIndexLayout>;