import x from "../assets/x.png"
import o from "../assets/o.png"
import empty from "../assets/empty.png"


const Cell = (props: any) => {
    
    return (
        <div className="w-full h-full border-4 p-3" onClick={props.onClick}>
            {props.value === 0 ? <img src={empty} className="w-full" /> :
                props.value === 1 
                ? <img src={x} className="w-full animate-jump-in animate-once" /> 
                : <img src={o} className="w-full animate-jump-in animate-once"/>
            }
        </div>
    )
}

export default Cell