import { useState } from 'react';
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