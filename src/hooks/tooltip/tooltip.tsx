
import React, { forwardRef, ReactNode } from 'react';
import { Popover, Whisper } from 'rsuite';
import type { TypeAttributes } from 'rsuite/esm/@types/common';

interface DefaultPopoverProps {
    content: ReactNode;
    className?: string;
}

// eslint-disable-next-line react/display-name
const DefaultPopover = forwardRef<HTMLDivElement, DefaultPopoverProps>(({ content, className, ...props }, ref) => {
    return (
        <Popover ref={ref} {...props} className={className} arrow={false}>
            <p>{content}</p>
        </Popover>
    );
});


interface AppTooltipProps {
    placement: TypeAttributes.Placement;
    data: ReactNode;
    className?: string;
    name?: string;
    tooltipClass?: string;
}

const AppTooltip = ({ placement, data, className, name, tooltipClass }: AppTooltipProps) => (
    <Whisper
        trigger="click"
        placement={placement}
        controlId={`control-id-${placement}`}
        speaker={<DefaultPopover content={data} className={tooltipClass} />}
    >
        <div className={className}>{name}</div>
    </Whisper>
);

export default AppTooltip;


