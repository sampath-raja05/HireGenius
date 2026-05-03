'use client';;
/* eslint-disable react-hooks/static-components */
import * as React from 'react';
import { motion, isMotionComponent } from 'motion/react';
import { cn } from '@/lib/utils';

function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(node);
      } else {
        (ref).current = node;
      }
    });
  };
}

function mergeProps(childProps, slotProps) {
  const merged = { ...childProps, ...slotProps };

  if (childProps.className || slotProps.className) {
    merged.className = cn(childProps.className, slotProps.className);
  }

  if (childProps.style || slotProps.style) {
    merged.style = {
      ...(childProps.style),
      ...(slotProps.style),
    };
  }

  return merged;
}

function Slot(
  {
    children,
    ref,
    ...props
  }
) {
  const isValidChild = React.isValidElement(children);
  const childType = isValidChild ? children.type : null;

  const isAlreadyMotion =
    typeof childType === 'object' &&
    childType !== null &&
    isMotionComponent(childType);

  const Base = React.useMemo(() =>
    !childType
      ? null
      : isAlreadyMotion
        ? childType
        : motion.create(childType), [childType, isAlreadyMotion]);

  if (!isValidChild || !Base) return null;

  const { ref: childRef, ...childProps } = children.props;

  const mergedProps = mergeProps(childProps, props);

  return (<Base {...mergedProps} ref={mergeRefs(childRef, ref)} />);
}

export { Slot };
