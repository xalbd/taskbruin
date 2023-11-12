import React from 'react';

interface TaskCardProps {
    title: string;
    date: string;
    summary: string;
    image_url: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, date, summary, image_url }) => {
    return (
        <div className="flex-shrink-0 shadow-md rounded-lg overflow-hidden flex p-4" style={{ width: '100%' }}>
            <div className="w-full p-4">
                <img 
                    src={image_url} 
                    alt={"FROG"} 
                    className="w-full mb-2" // Remove object-cover class
                    style={{ maxWidth: '100%' }} // Set maxWidth to maintain aspect ratio
                />
                <p className="mb-2"> {date} </p>
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p>{summary}</p>
            </div>
        </div>
    );
}

export default TaskCard;
