import * as React from 'react';

export function useControlledState(props) {
  const { value, defaultValue, onChange } = props;

  const [internalState, setInternalState] = React.useState(defaultValue);
  const state = value !== undefined ? value : internalState;

  const setState = React.useCallback((next, ...args) => {
    const nextValue = typeof next === 'function' ? next(state) : next;

    if (value === undefined) {
      setInternalState(nextValue);
    }

    onChange?.(nextValue, ...args);
  }, [onChange, state, value]);

  return [state, setState];
}
