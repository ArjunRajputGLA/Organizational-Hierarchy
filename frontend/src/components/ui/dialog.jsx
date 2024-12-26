import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import PropTypes from 'prop-types'

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))

DialogOverlay.propTypes = {
  className: PropTypes.string
}

DialogOverlay.defaultProps = {
  className: ''
}

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        "sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))

DialogContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

DialogContent.defaultProps = {
  className: ''
}

DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ className, children, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props}>
    {children}
  </div>
)

DialogHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

DialogHeader.defaultProps = {
  className: ''
}

DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({ className, children, ...props }) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props}>
    {children}
  </div>
)

DialogFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

DialogFooter.defaultProps = {
  className: ''
}

DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  >
    {children}
  </DialogPrimitive.Title>
))

DialogTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

DialogTitle.defaultProps = {
  className: ''
}

DialogTitle.displayName = DialogPrimitive.Title.displayName

// Add PropTypes for the primitive components
Dialog.propTypes = {
  children: PropTypes.node
}

DialogTrigger.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

DialogClose.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
}