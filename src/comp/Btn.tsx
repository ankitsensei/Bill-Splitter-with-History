
type Props = {
    title: string;
}

const Btn = (props: Props) => {
    return (
        <div className="text-2xl bg-white px-10 py-2 text-black rounded hover:cursor-default">{props.title}</div>
    )
}

export default Btn