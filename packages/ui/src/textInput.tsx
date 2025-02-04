import "./css/text-input.css"
export const TextInput=({
    label,
    type,
    placeholder,
    onChange,
}:{
    label:string,
    type:string,
    placeholder:string,
    onChange:(value:string)=>void,
})=>{
    return (
        <div className="text-input-container">
            <label className="text-input-label">{label}</label>
            <input
                onChange={(e) => onChange(e.target.value)}
                type={type}
                className="text-input"
                placeholder={placeholder}
            />
        </div>
    )
}