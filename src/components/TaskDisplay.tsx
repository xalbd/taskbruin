import TaskCard from "@/components/TaskCard";

const TaskDisplay = () => {
  const mockData = [
    {
      title: "iPhone 1",
      date: "10-23-2023",
      summary: "This is an iPhone",
      image_url:
        "https://upload.wikimedia.org/wikipedia/en/7/79/IOS_17_Homescreen.png",
    },
    {
      title: "FROG 1",
      date: "10-23-2023",
      summary: "This is a frog 1",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Frog_on_palm_frond.jpg/1200px-Frog_on_palm_frond.jpg",
    },
    {
      title: "FROG 2",
      date: "10-23-2023",
      summary: "This is a frog 2",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Frog_on_palm_frond.jpg/1200px-Frog_on_palm_frond.jpg",
    },
    {
      title: "FROG 3",
      date: "10-23-2023",
      summary: "This is a frog 3",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/6/6c/Renault_Modus_Phase_I_1.6_16V.JPG",
    },
    {
      title: "FROG 4",
      date: "10-23-2023",
      summary: "This is a frog 4",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Frog_on_palm_frond.jpg/1200px-Frog_on_palm_frond.jpg",
    },
    {
      title: "FROG 5",
      date: "10-23-2023",
      summary: "This is a frog 5",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Frog_on_palm_frond.jpg/1200px-Frog_on_palm_frond.jpg",
    },
  ];

  return (
    <div className="p-5 sm:p-8">
      <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6">
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
  );
};
export default TaskDisplay;
