import { useState, useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

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
    control: boolean
    first: boolean
    second: boolean
}

export const useStaggered = (ms: number): [Staggered, React.Dispatch<React.SetStateAction<boolean>>] => {
    const [control, setControl] = useState(false);
    const [firstOpen, setFirstOpen] = useState(false);
    const [secondOpen, setSecondOpen] = useState(false);
    useEffect(() => {
        if (control) {
            setFirstOpen(true);
            setTimeout(() => setSecondOpen(true), ms);
            return;
        }
        setSecondOpen(false);
        setTimeout(() => setFirstOpen(false), ms)
    }, [control])
    return [
        { control, first: firstOpen, second: secondOpen },
        setControl
    ]
}