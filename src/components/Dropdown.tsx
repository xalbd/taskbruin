import React, { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface Task {
  id: number;
  name: string;
}

interface InputProps extends React.ComponentProps<"input"> {
  title: string;
  setValue: (value: string) => void;
}

const tasks: Task[] = [
  { id: 1, name: "Food Delivery" },
  { id: 2, name: "Do my homework" },
  { id: 3, name: "Laundry" },
  { id: 4, name: "Scooter Rentals" },
  { id: 5, name: "Apartment Listings" },
  { id: 6, name: "Other" },
];

const Dropdown: React.FC<InputProps> = ({ title, setValue }) => {
  const [selectedTask, setSelectedTask] = useState(tasks[0]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setValue(selectedTask.name);
  }, [selectedTask, setValue]);

  const filteredPeople: Task[] =
    query === ""
      ? tasks
      : tasks.filter((task) =>
          task.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

  return (
    <Combobox value={selectedTask} onChange={setSelectedTask}>
      <label className="mt-6 block text-base font-bold mb-2">{title}</label>
      <div className="relative mt-1 border border-gray-400 rounded-md ">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left">
          <Combobox.Input
            className="w-full border-none p-4 text-base leading-5 focus:ring-0"
            displayValue={(task: Task) => task.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 flex items-center pr-2 w-full h-full" />
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1">
            {filteredPeople.length === 0 && query !== "" ? (
              <div className="relative cursor-pointer select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredPeople.map((person) => (
                <Combobox.Option
                  key={person.id}
                  className={({ active }) =>
                    `relative cursor-pointer py-2 pl-10 pr-4 ${
                      active ? "bg-teal-600 text-white" : "text-gray-900"
                    }`
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default Dropdown;
