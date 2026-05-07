import Image from "next/image";
import React from "react";
import { FaGithubAlt, FaPlus } from "react-icons/fa";

const Projects = () => {
  return (
    <div>
      <header className="flex items-center justify-between gap-4 ">
        <h1 className="text-2xl font-bold mb-4 custom-font">Projects</h1>
        <button className="flex items-center gap-2 font-bold custom-font py-2 px-4 border border-slate-300 dark:border-slate-700 dark:bg-[#0f172b] dark:text-white uppercase rounded-full">
          {" "}
          <FaPlus />
          Add
        </button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  ">
        <div className="bg-white dark:bg-[#0f172b] p-4 rounded-2xl">
          <Image
            height={400}
            width={400}
            src="/card.webp"
            alt=""
            className="h-56 object-cover rounded-2xl"
          />
          <div>
            <h1 className="text-xl font-bold mt-4">Project Title</h1>
            <p className="">
              This is a brief description of the project. It provides an
              overview of what the project entails and its key features.
            </p>
          </div>
          <div>
            <button className="p-2 custom-border mt-4 rounded-full">
              <FaGithubAlt />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
