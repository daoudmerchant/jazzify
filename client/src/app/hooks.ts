import { prepareValueInterceptor } from '@testing-library/user-event/dist/types/document/value';
import { useState, useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useList = (max: number) => {
    const [list, setList] = useState<string[]>([]);
    return [
        list,
        (item: string) => setList((prev: string[]) =>
            prev.find(x => x === item)
                ? prev.filter(x => x !== item)
                : prev.length < max
                ? [item, ...prev]
                : prev),
        () => {
            setList([])
        }
    ]
}

interface Staggered {
    open: boolean
    first: boolean,
    second: boolean
}

export const useStaggered = (ms: number): [Staggered, React.Dispatch<React.SetStateAction<boolean>>] => {
    const [open, setOpen] = useState(false);
    const [firstOpen, setFirstOpen] = useState(false);
    const [secondOpen, setSecondOpen] = useState(false);
    useEffect(() => {
        if (open) {
            setFirstOpen(true);
            setTimeout(() => setSecondOpen(true), ms);
            return;
        }
        setSecondOpen(false);
        setTimeout(() => setFirstOpen(false), ms)
    })
    return [
        { open, first: firstOpen, second: secondOpen },
        setOpen
    ]
}