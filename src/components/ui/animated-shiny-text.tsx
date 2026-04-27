import * as React from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  gradientColors?: string;
  gradientAnimationDuration?: number;
  hoverEffect?: boolean;
  className?: string;
  textClassName?: string;
}

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  ({ text, gradientColors, gradientAnimationDuration = 3, className, textClassName, ...props }, ref) => {
    const id = React.useId().replace(/:/g, "");
    const animName = `shine_${id}`;

    return (
      <div ref={ref} className={cn("flex justify-center items-center", className)} {...props}>
        <style>{`
          @keyframes ${animName} {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
        `}</style>
        <h1
          className={cn("leading-none", textClassName)}
          style={{
            background: gradientColors ?? "linear-gradient(90deg, #4338CA, #8B7FF5, #ffffff, #8B7FF5, #5B4FE9, #4338CA)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: `${animName} ${gradientAnimationDuration}s linear infinite`,
          }}
        >
          {text}
        </h1>
      </div>
    );
  }
);

AnimatedText.displayName = "AnimatedText";
export { AnimatedText };
