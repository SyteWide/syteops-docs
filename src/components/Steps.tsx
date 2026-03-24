import React from 'react';

interface StepProps {
  title: string;
  stepNumber?: number;
  isLast?: boolean;
  children: React.ReactNode;
}

export function Step({title, stepNumber = 1, isLast = false, children}: StepProps) {
  return (
    <div className="flex gap-4 pb-8 last:pb-0">
      {/* Connector column */}
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-600 dark:bg-primary-500 text-white text-sm font-semibold shrink-0">
          {stepNumber}
        </div>
        {!isLast && (
          <div className="w-px flex-1 bg-surface-200 dark:bg-surface-300 mt-2" />
        )}
      </div>

      {/* Content */}
      <div className="pt-1 pb-2 min-w-0">
        <h4 className="font-heading font-semibold text-base text-text-primary m-0 mb-2">
          {title}
        </h4>
        <div className="text-sm text-text-secondary [&>p]:m-0 [&>p:not(:last-child)]:mb-2">
          {children}
        </div>
      </div>
    </div>
  );
}

interface StepsProps {
  children: React.ReactNode;
}

export function Steps({children}: StepsProps) {
  const items = React.Children.toArray(children);
  return (
    <div className="my-6">
      {items.map((child, index) => {
        if (React.isValidElement<StepProps>(child)) {
          return React.cloneElement(child, {
            stepNumber: index + 1,
            isLast: index === items.length - 1,
          });
        }
        return child;
      })}
    </div>
  );
}
