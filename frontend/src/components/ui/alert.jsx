import * as React from "react"
import { cn } from "@/lib/utils"
import PropTypes from 'prop-types';

// Alert Component with PropTypes
const Alert = React.forwardRef(({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(
        "relative w-full rounded-lg border p-4",
        {
          "bg-background text-foreground": variant === "default",
          "border-destructive/50 text-destructive dark:border-destructive": variant === "destructive",
        },
        className
      )}
      {...props}
    />
));

Alert.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'destructive']),
  children: PropTypes.node
};

Alert.defaultProps = {
  variant: 'default',
  className: ''
};

Alert.displayName = "Alert";

// AlertDescription with PropTypes
const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));

AlertDescription.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

AlertDescription.defaultProps = {
  className: ''
};

AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription }