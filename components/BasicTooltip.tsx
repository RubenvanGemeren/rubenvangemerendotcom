
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function BasicTooltip({ children, content }: { children: React.ReactNode, content: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="bg-background text-text border-border">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

