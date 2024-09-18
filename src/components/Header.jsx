import { Input, Button, Modal } from "./index";
import Swal from "sweetalert2";
import { labelsInfo } from "../data";
import { Select } from "./index";
import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

function Header({ setTasks, categoriesArray }) {
  const [labelsArray, setLabelsArray] = useState([]);
  const [labelStates, setLabelStates] = useState(
    new Array(labelsInfo.length).fill(false)
  ); // Ensure it's correctly initialized
  const addTaskInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const selectRef = useRef();
  let registerModalRef = useRef();

  function showRegisterModalRef() {
    registerModalRef.current.showModal();
  }

  const toggleLabel = (label, index) => {
    // Toggle the selected state for the label
    setLabelStates((prevLabelStates) => {
      // Create a new array with the updated state
      const newLabelStates = [...prevLabelStates];
      newLabelStates[index] = !prevLabelStates[index]; // Toggle the state
      return newLabelStates;
    });

    // Update the selected labels array
    setLabelsArray((prevSelectedLabels) => {
      if (prevSelectedLabels.includes(label)) {
        // Remove the label if it's already selected
        return prevSelectedLabels.filter((item) => item !== label);
      } else {
        // Add the label if it's not selected
        return [...prevSelectedLabels, label];
      }
    });
  };

  const addTask = () => {
    if (!addTaskInputRef.current.value || !selectRef.current.value) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Form",
        text: "Both Task Name and Category must be filled!",
      });
      return;
    } else {
      setTasks((prevTasks) => [
        {
          id: uuidv4(),
          task: addTaskInputRef.current.value,
          category: selectRef.current.value,
          labels: labelsArray,
        },
        ...prevTasks,
      ]);
      addTaskInputRef.current.value = "";
      selectRef.current.value = "To Do";
      setLabelsArray([]);
      setLabelStates(new Array(labelsInfo.length).fill(false));
      Swal.fire({
        position: "center",
        icon: `${categoriesArray.length > 0 ? "success" : "error"}`,
        title: `${
          categoriesArray.length > 0
            ? "Your task has been saved"
            : "No categories found"
        }`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <header className="border-b-stone-600 border-b-2 flex flex-col py-8">
      <Modal
        categoriesArray={categoriesArray}
        ref={registerModalRef}
        styles={
          "w-[80%] max-w-[400px] py-8 px-4 mx-auto top-[20%] bg-stone-800 rounded-md "
        }>
        <h2 className="text-center text-slate-50 font-semibold font-montserrat text-xl mb-5">
          Sign in to continue
        </h2>
        <Input
          ref={emailInputRef}
          styles={
            "mb-3 border-md w-full outline-none bg-slate-50 p-2 rounded-md font-planquin md:text-lg sm:text-sm text-slate-800 font-semibold"
          }
          placeHolder={"Enter your email here"}
        />
        <Input
          ref={passwordInputRef}
          styles={
            "border-md w-full outline-none bg-slate-50 p-2 rounded-md font-planquin md:text-lg sm:text-sm text-slate-800 font-semibold"
          }
          placeHolder={"your password"}
        />
        <span className="w-[80%] mx-auto my-6 flex border-b-2 border-stone-500 "></span>
        <Button styles="bg-blue-500 w-full hover:bg-blue-400 ease-in duration-100 text-slate-50 font-semibold font-montserrat text-center px-2 rounded-md h-[39px] w-[72px] mx-auto mb-3 p-2 font-palanquin">
          Continue with Google
        </Button>
        <div className="flex gap-3 items-center justify-center">
          <form method="dialog">
            <button
              className={
                "mt-5 bg-red-500 hover:bg-red-400 ease-in duration-75 text-slate-50 font-semibold font-montserrat text-center px-2 rounded-md h-[39px] w-[72px]"
              }>
              Cancel
            </button>
          </form>
        </div>
      </Modal>
      <div className="flex items-center justify-between w-full mb-8 px-5">
        <div className="flex items-center">
          <img width={80} height={80} src="logo.png" alt="Logo" />
          <h2 className="sm:text-4xl md:text-5xl text-3xl  ml-[-8px] font-montserrat text-slate-50 font-semibold">
            Focus.
          </h2>
        </div>

        <Button
          handleClick={() => showRegisterModalRef()}
          styles="border-2 border-slate-500 rounded-md py-2 px-4 font-montserrat text-slate-50 hover:text-slate-50 hover:bg-slate-600 duration-200 ease-in hover:border-transparent">
          SignIn | SignUp
        </Button>
      </div>

      <div className="w-[90%] max-w-[600px] flex gap-5 flex-col justify-between items-center mx-auto">
        <Input
          ref={addTaskInputRef}
          placeHolder={"What needs to be done?"}
          styles={
            "border-md w-full outline-none bg-slate-50 p-3 rounded-md font-planquin md:text-lg sm:text-sm text-slate-800 font-semibold"
          }
        />
        <div className="flex mt-3 items-center gap-3 flex-col md:flex-row md:justify-between">
          <div className="flex">
            {labelsInfo.map((obj, index) => (
              <Button
                state={labelStates[index] ? true : false} // Ensure the state is either true or false
                handleClick={() => toggleLabel(obj.name, index)}
                key={obj.name}
                color={obj.color}
                styles={`w-14 h-9 rounded-md font-montserrat text-sm border-2 border-slate-800 text-slate-50 duration-100 ease-in ${
                  index !== labelsInfo.length - 1 && "mr-3"
                }`}>
                {obj.name}
              </Button>
            ))}
          </div>

          <div className="flex gap-4">
            <form className="max-w-sm mx-auto">
              <Select
                ref={selectRef}
                styles="bg-gray-50 text-slate-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full w-24 h-9 cursor-pointer px-2 font-semibold"
                options={categoriesArray}
              />
            </form>
            <Button
              handleClick={addTask}
              styles="w-24 h-9 bg-blue-500 rounded-md text-slate-50 font-semibold font-palanquin hover:bg-blue-400 duration-100 ease-in">
              Add Task
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  setTasks: PropTypes.func,
  categoriesArray: PropTypes.array,
};
export default Header;
