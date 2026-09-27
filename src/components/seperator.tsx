export function HorizontalSeparator({ className }: { className?: string }) {
   return <div className={`w-full border-t-2 border-border my-6 ${className}`}></div>
}


export function VerticalSeparator({ className }: { className?: string }) {
    return <div className={`h-full border-l-2 border-border mx-6 ${className}`}></div>
}