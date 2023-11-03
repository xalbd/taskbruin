
interface TaskCardProps {
    title: string;
    date: string;
    summary: string;
    image_url: string;
}
const TaskCard: React.FC<TaskCardProps> = ({ title, date, summary, image_url }) => {{
    return (
        <div className="flex-shrink-0 shadow-md rounded-lg overflow-hidden flex p-4">
            <div className="w-full p-4">
                <img src={image_url} 
                    alt={"FROG"} 
                    className="w-full h-48 object-cover mb-2" 
                />
                <p className="mb-2"> {date} </p>
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p>{summary}</p>
            </div>
        </div>
    );
}}

export default TaskCard