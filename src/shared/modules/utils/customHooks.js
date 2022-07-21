import React, { useEffect, useState, useRef, useCallback } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useClickAwayListener(callback, ref) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export const useBlur = (callback) => {
	const innerRef = useRef();
	const callbackRef = useRef();

	// set current callback in ref, before second useEffect uses it
	useEffect(() => {
		// useEffect wrapper to be safe for concurrent mode
		callbackRef.current = callback;
	});

	useEffect(() => {
		document.addEventListener('click', handleClick);
		return () => document.removeEventListener('click', handleClick);

		// read most recent callback and innerRef dom node from refs
		function handleClick(e) {
			if (innerRef.current && callbackRef.current && !innerRef.current.contains(e.target)) {
				callbackRef.current(e);
			}
		}
	}, []); // no need for callback + innerRef dep

	return innerRef; // return ref; client can omit `useRef`
};

export function useAsyncState(initialState) {
    const [state, setState] = useState(initialState);
    const resolveState = useRef();
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (resolveState.current) {
            resolveState.current(state);
        }
    }, [state]);

    const setAsyncState = useCallback(
        newState =>
            new Promise(resolve => {
                if (isMounted.current) {
                    resolveState.current = resolve;
                    setState(newState);
                }
            }),
        []
    );

    return [state, setAsyncState];
}
