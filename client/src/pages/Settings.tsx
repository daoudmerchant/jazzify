import { useAppDispatch } from "../app/hooks";
import { useNavigate } from 'react-router-dom';
import { signOut } from "../features/user/userSlice";

const Settings = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    return <button onClick={() => {
        // @ts-ignore
        dispatch(signOut())
        navigate('/')
    }}>Sign Out</button>
}

export default Settings;