import TaskCard from '@/components/TaskCard';
import Layout from '@/layout/Layout'

const TaskDisplay = () => {
    const mockData = [
        {
            title: "FROG 1",
            date: "10-23-2023",
            summary: "This is a frog 1",
            image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Frog_on_palm_frond.jpg/1200px-Frog_on_palm_frond.jpg"
        },
        {
            title: "FROG 1",
            date: "10-23-2023",
            summary: "This is a frog 1",
            image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Frog_on_palm_frond.jpg/1200px-Frog_on_palm_frond.jpg"
        },
        {
            title: "FROG 1",
            date: "10-23-2023",
            summary: "This is a frog 1",
            image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Frog_on_palm_frond.jpg/1200px-Frog_on_palm_frond.jpg"
        },
        {
            title: "FROG 1",
            date: "10-23-2023",
            summary: "This is a frog 1",
            image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Frog_on_palm_frond.jpg/1200px-Frog_on_palm_frond.jpg"
        },
        {
            title: "FROG 1",
            date: "10-23-2023",
            summary: "This is a frog 1",
            image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Frog_on_palm_frond.jpg/1200px-Frog_on_palm_frond.jpg"
        },
        {
            title: "FROG 1",
            date: "10-23-2023",
            summary: "This is a frog 1",
            image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Frog_on_palm_frond.jpg/1200px-Frog_on_palm_frond.jpg"
        },
    ];

    return (
        <Layout>
            <div className="max-w-screen-lg mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {mockData.map((data, index) => (
                        <TaskCard
                            key={index}
                            title={data.title}
                            date={data.date}
                            summary={data.summary}
                            image_url={data.image_url}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
}


export default TaskDisplay;


