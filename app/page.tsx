
import { Appbar } from "@/components/Appbar";
import Navbar from "@/components/Navbar";
import TodoItem from "@/components/TodoItem";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex">
      <div className="mt-[200px] ml-5"> {/* Adjust mt value based on your navbar height */}
        <div className="flex flex-row gap-2 p-4">
          <div className="flex flex-col">
            <h1 className="text-5xl font-bold flex flex-col gap-1">
              Create the TASKS
              <span className="text-green-400">You'll Surely Complete..</span>
            </h1>
            <h6 className="mt-3">Gamify your tasks creation and tracking
            them fun,easy and automatic. </h6>
            <div className="mt-10 gap-0 flex flex-col">
            <button type="button" className="text-white w-[400px] bg-green-400 hover:green-blue-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">Gamify my tasks</button>
            <button type="button" className="py-2.5 px-5 me-2 w-[400px] ">Already have an account</button>
            </div>
          </div>
        </div>
      </div>
      <TodoItem/>
      </div>
    </>
  );
}
