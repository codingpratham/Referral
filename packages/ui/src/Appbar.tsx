import { Button } from "./button"
import './css/Appbar-style.css'

interface AppbarProps{
    user?:{
        name?:string | null
    },
    onSignin:any,
    onSignout:any,
}

export const Appbar=({
    user,
    onSignin,
    onSignout
}:AppbarProps)=>{
    return (
        <div className="button-section">
          <Button onClick={user ? onSignout : onSignin}>
            {user ? "Logout" : "Login"}
          </Button>
        </div>
    )
}