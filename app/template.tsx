import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        // These are the native shadcn/ui animation classes
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-in-out">
            {children}
        </div>
    );
}