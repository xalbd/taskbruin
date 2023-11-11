import Input from "@/components/Input";

const TaskForm = () => {

  return (
    <div className="max-w-md mx-auto mt-8 p-6">
      <h2 className="text-2xl font-semibold mb-4">Create Task</h2>

      <form>
        <Input title="Task Name" isRequired={true} />
        <Input title="Task Type/Category" isRequired={true} />
        <Input title="Task Description" rows={3} isRequired={true} />
        <Input title="Task Price" isRequired={true} />

        <div className="flex">
          <div className="mr-2">
            <Input title="Start Time" isRequired={false} />
          </div>
          <div>
            <Input title="End Time" isRequired={false} />
          </div>
        </div>

        <button
          className="mt-5 font-bold py-2 px-4 rounded border border-gray-400 text-base block w-full p-3"
          type="submit"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
