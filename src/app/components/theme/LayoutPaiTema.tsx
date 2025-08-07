// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function LayoutPaiTema(props : {children: any}){
    return (
        <div className={`
        bg-gray-950 text-white
        light:bg-neutral-200 light:text-black
        flex flex-col items-center text-center min-h-svh
        `}>
            {props.children}
        </div>
    )
}