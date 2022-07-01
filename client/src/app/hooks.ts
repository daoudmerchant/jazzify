import { useState, useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useBoolean = (bool = null): [ boolean | null, (() => void)]  => {
    const [boolean, setBoolean] = useState<boolean | null>(bool);
    return [
        boolean,
        () => {
            setBoolean(prev => !prev)
        }
    ]
}

interface Staggered {
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
        { first: firstOpen, second: secondOpen },
        setOpen
    ]
}