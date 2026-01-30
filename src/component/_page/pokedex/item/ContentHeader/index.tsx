interface Props {
    title: string;
}

export default function ContentHeader({ title }: Props) {
    return (
        <div className="relative">
            <div className="text-black ">
                <h1 className="font-bold">Report</h1>
                <h2 className="text-xs" style={{ marginBottom: 27 }}>{title}</h2>
            </div>
        </div>
    );
}
