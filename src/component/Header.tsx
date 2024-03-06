
import "./header.css"

export function Hearder (){
    const style : Record<string, string> = {
        color:"red",
        backgroundColor: "gray"

    }
    return <header style ={style}>
        <h1>hello word</h1>
    </header>
}