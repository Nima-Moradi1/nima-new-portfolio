"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { Dialog as SheetPrimitive } from "radix-ui";
import * as React from "react";
import { cn } from "@/lib/cn";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    data-slot="sheet-overlay"
    className={cn(
      "fixed inset-0 z-50 bg-background/80 opacity-0 backdrop-blur-sm transition-[opacity,visibility] duration-300 ease-out data-[state=closed]:invisible data-[state=closed]:pointer-events-none data-[state=open]:visible data-[state=open]:opacity-100 motion-reduce:transition-none",
      className,
    )}
    {...props}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "fixed z-50 flex flex-col gap-4 bg-background text-foreground opacity-0 shadow-lg outline-none transition-[transform,opacity,visibility] duration-300 ease-out data-[state=closed]:invisible data-[state=closed]:pointer-events-none data-[state=open]:visible data-[state=open]:translate-x-0 data-[state=open]:translate-y-0 data-[state=open]:opacity-100 motion-reduce:transition-none",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 max-h-dvh -translate-y-full border-b border-border",
        bottom:
          "inset-x-0 bottom-0 max-h-dvh translate-y-full border-t border-border",
        start:
          "inset-y-0 start-0 h-full w-3/4 -translate-x-full border-e border-border sm:max-w-sm rtl:translate-x-full",
        end: "inset-y-0 end-0 h-full w-3/4 translate-x-full border-s border-border sm:max-w-sm rtl:-translate-x-full",
      },
    },
    defaultVariants: {
      side: "end",
    },
  },
);

type SheetContentProps = React.ComponentPropsWithoutRef<
  typeof SheetPrimitive.Content
> &
  VariantProps<typeof sheetVariants> & {
    closeLabel?: string;
    overlayClassName?: string;
    showCloseButton?: boolean;
  };

const SheetContent = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(
  (
    {
      children,
      className,
      closeLabel = "Close",
      forceMount,
      overlayClassName,
      showCloseButton = true,
      side,
      ...props
    },
    ref,
  ) => (
    <SheetPortal forceMount={forceMount}>
      <SheetOverlay forceMount={forceMount} className={overlayClassName} />
      <SheetPrimitive.Content
        ref={ref}
        data-slot="sheet-content"
        forceMount={forceMount}
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {children}
        {showCloseButton ? (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            className="absolute top-4 end-4 rounded-sm p-1 opacity-70 outline-none transition-opacity hover:opacity-100 disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <X className="size-4" aria-hidden="true" />
            <span className="sr-only">{closeLabel}</span>
          </SheetPrimitive.Close>
        ) : null}
      </SheetPrimitive.Content>
    </SheetPortal>
  ),
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="sheet-header"
    className={cn("grid gap-1.5 p-4 text-center sm:text-start", className)}
    {...props}
  />
));
SheetHeader.displayName = "SheetHeader";

const SheetFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="sheet-footer"
    className={cn(
      "mt-auto flex flex-col-reverse gap-2 p-4 sm:flex-row sm:justify-end",
      className,
    )}
    {...props}
  />
));
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    data-slot="sheet-title"
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    data-slot="sheet-description"
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
  sheetVariants,
  type SheetContentProps,
};
