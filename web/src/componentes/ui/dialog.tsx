import * as DialogPrimitive from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'

export function Dialog(props: DialogPrimitive.DialogProps) {
    return <DialogPrimitive.Dialog {...props} />
}

export function DialogTrigger(props: DialogPrimitive.DialogTriggerProps) {
    return <DialogPrimitive.DialogTrigger {...props} />
}

export function DialogClose(props: DialogPrimitive.DialogCloseProps) {
    return <DialogPrimitive.DialogClose {...props} />
}

export function DialogPortal(props: DialogPrimitive.DialogPortalProps) {
    return <DialogPrimitive.DialogPortal {...props} />
}

export function DialogOverlay(props: DialogPrimitive.DialogOverlayProps) {
    const [isVisible, setIsVisible] = useState(false)

    // Controlar visibilidade do diálogo via eventos do DialogPrimitive
    useEffect(() => {
        setIsVisible(true) // Define como visível quando o componente monta
        return () => setIsVisible(false) // Oculta ao desmontar
    }, [])

    return (
        <DialogPrimitive.DialogOverlay
            {...props}
            className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{
                backdropFilter: isVisible ? 'blur(5px)' : 'blur(0)',
                transition: 'backdrop-filter 0.6s ease',
            }}
        />
    )
}

export function DialogContent(props: DialogPrimitive.DialogContentProps) {
    return (
        <DialogPortal>
            <DialogOverlay />

            <DialogPrimitive.DialogContent
                {...props}
                className="fixed z-50 right-0 top-0 bottom-0 w-[400px] h-screen border-l border-zinc-900 bg-zinc-950 p-8"
            />
        </DialogPortal>
    )
}

export function DialogTitle(props: DialogPrimitive.DialogTitleProps) {
    return (
        <DialogPrimitive.DialogTitle
            {...props}
            className="text-lg font-semibold"
        />
    )
}

export function DialogDescription(
    props: DialogPrimitive.DialogDescriptionProps
) {
    return (
        <DialogPrimitive.DialogDescription
            {...props}
            className="text-zinc-400 text-sm leading-relaxed"
        />
    )
}
