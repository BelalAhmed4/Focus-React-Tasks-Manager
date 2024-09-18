import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { Button, Modal, Input } from "./index";
import { FaCirclePlus } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { LiaSaveSolid } from "react-icons/lia";
import { MdDeleteForever } from "react-icons/md";
import { useRef, useState } from "react";
import { labelsInfo } from "../data";

function TasksCategories({
  tasksArray,
  setTasks,
  categoriesArray,
  setCategories,
}) {
  let addCategoryModalRef = useRef();
  function showAddCategoryModal() {
    addCategoryModalRef.current.showModal();
  }

  const [editCategoryMode, setEditCategoryMode] = useState(
    new Array(categoriesArray.length).fill(false)
  );
  const [editTaskMode, setEditTaskMode] = useState({});
  let addCategorySaveBtnRef = useRef();
  let addCategoryInputRef = useRef();
  let editCategoryInputRef = useRef();
  const editTaskInputRefs = useRef({});

  function addCategory() {
    setCategories((prev) => [...prev, addCategoryInputRef.current.value]);
    addCategoryModalRef.current.close();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your category has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  function deleteCategory(categoryIndex) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCategories((prev) =>
          prev.filter((_, index) => index !== categoryIndex)
        );
        setEditCategoryMode(new Array(categoriesArray.length).fill(false));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  }

  function deleteTask(taskId) {
    setTasks((prev) => prev.filter((taskObj) => taskObj.id !== taskId));
  }

  function handleSetEditCategoryMode(index) {
    setEditCategoryMode((prev) => {
      const updatedEditMode = [...prev];
      updatedEditMode[index] = !prev[index];
      return updatedEditMode;
    });
  }

  function saveCategory(index) {
    setCategories((prevCategories) => {
      const updatedCategories = [...prevCategories];
      let oldCategory = updatedCategories[index];

      setTasks((prevTasks) => {
        return prevTasks.map((task) => {
          if (task.category === oldCategory) {
            return { ...task, category: editCategoryInputRef.current.value };
          }
          return task;
        });
      });

      updatedCategories[index] = editCategoryInputRef.current.value;
      return updatedCategories;
    });
    setEditCategoryMode((prev) => {
      const updatedEditMode = [...prev];
      updatedEditMode[index] = !prev[index];
      return updatedEditMode;
    });
  }

  function handleEditBlur(index, saveFunction) {
    saveFunction(index);
  }

  function toggleEditTaskMode(taskId) {
    setEditTaskMode((prev) => ({
      ...prev,
      [taskId]: !prev[taskId], // Toggle edit mode for this task by ID
    }));
  }

  function saveTask(taskId) {
    setEditTaskMode((prev) => ({
      ...prev,
      [taskId]: false, // Disable edit mode after saving
    }));
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, task: editTaskInputRefs.current[taskId].value };
        }
        return task;
      });
      return updatedTasks;
    });
  }

  return (
    <>
      <Modal
        categoriesArray={categoriesArray}
        ref={addCategoryModalRef}
        styles={
          "w-[80%] max-w-[400px] py-8 px-4 mx-auto top-[40%] bg-stone-800 rounded-md "
        }>
        <Input
          ref={addCategoryInputRef}
          styles={
            "border-md w-full outline-none bg-slate-50 p-2 rounded-md font-planquin md:text-lg sm:text-sm text-slate-800 font-semibold"
          }
          placeHolder={"Category Name?"}
        />
        <div className="flex gap-3 items-center justify-center">
          <Button
            handleClick={addCategory}
            ref={addCategorySaveBtnRef}
            styles={
              "mt-5 bg-blue-500 hover:bg-blue-400 ease-in duration-75s text-slate-50 font-semibold font-montserrat text-center px-2 rounded-md h-[39px] w-[72px]"
            }>
            Save
          </Button>
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

      <div className="flex flex-col gap-10 px-16 py-12">
        <div className="flex gap-5 justify-between flex-wrap">
          {categoriesArray.length === 0 ? (
            <h2 className="text-slate-50 text-lg font-palanquin font-semibold mx-auto">
              No categories found
            </h2>
          ) : null}
          {categoriesArray.map((category, categoryIndex) => (
            <div
              key={uuidv4()}
              className="flex flex-col gap-5 min-w-[270px] py-5 flex-grow-0 flex-shrink-0 basis-[calc(33%-1rem)]">
              <div className="flex items-center justify-between">
                {!editCategoryMode[categoryIndex] ? (
                  <h1 className="text-3xl mb-5 border-b-2 border-slate-50 rounded-sm py-3 font-palanquin text-slate-50 font-semibold">
                    {category}
                  </h1>
                ) : (
                  <Input
                    handleBlur={() =>
                      handleEditBlur(categoryIndex, saveCategory)
                    }
                    value={category}
                    ref={editCategoryInputRef}
                    styles={
                      "border-md border-slate-600 border-2 outline-none bg-slate-800 py-2 m-5 pl-3 rounded-md font-planquin md:text-lg sm:text-sm text-slate-50 font-semibold max-w-[200px]"
                    }
                  />
                )}

                <span className="flex gap-3">
                  {!editCategoryMode[categoryIndex] ? (
                    <Button
                      handleClick={() =>
                        handleSetEditCategoryMode(categoryIndex)
                      }>
                      <FaRegEdit size={20} color="white" />
                    </Button>
                  ) : (
                    <Button handleClick={() => saveCategory(categoryIndex)}>
                      <LiaSaveSolid size={20} color="white" />
                    </Button>
                  )}

                  <Button handleClick={() => deleteCategory(categoryIndex)}>
                    <MdDeleteForever size={20} color="white" />
                  </Button>
                </span>
              </div>

              <div className="flex flex-col gap-3 justify-start">
                <ul>
                  {tasksArray
                    .filter((taskObj) => taskObj.category === category)
                    .map((taskObj) => (
                      <li
                        key={taskObj.id}
                        className="text-slate-50 mb-5 bg-slate-800 rounded-md p-5 border-2 border-slate-600 font-montserrat">
                        <div className="flex flex-col">
                          <div className="flex justify-between items-center mb-5">
                            {!editTaskMode[taskObj.id] ? (
                              <h2 className="text-lg text-slate-50 font-semibold">
                                {taskObj.task}
                              </h2>
                            ) : (
                              <Input
                                handleBlur={() =>
                                  handleEditBlur(taskObj.id, saveTask)
                                }
                                value={taskObj.task}
                                ref={(el) =>
                                  (editTaskInputRefs.current[taskObj.id] = el)
                                }
                                styles={
                                  "w-[80%] border-md border-slate-600 border-2 outline-none bg-slate-800 py-1 m-3 pl-3 rounded-md font-planquin md:text-lg sm:text-sm text-slate-50 font-semibold max-w-[200px]"
                                }
                              />
                            )}

                            <span className="flex gap-3">
                              {!editTaskMode[taskObj.id] ? (
                                <Button
                                  handleClick={() =>
                                    toggleEditTaskMode(taskObj.id)
                                  }>
                                  <FaRegEdit size={16} color="white" />
                                </Button>
                              ) : (
                                <Button
                                  handleClick={() => saveTask(taskObj.id)}>
                                  <LiaSaveSolid size={16} color="white" />
                                </Button>
                              )}

                              <Button
                                handleClick={() => deleteTask(taskObj.id)}>
                                <MdDeleteForever size={16} color="white" />
                              </Button>
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex flex-wrap gap-3 justify-between items-center">
                              {taskObj.labels.map((label) => {
                                const labelColor = labelsInfo.find(
                                  (labelInfo) => labelInfo.name === label
                                ).color;

                                return (
                                  <span
                                    className={`${labelColor} text-white px-2 py-1 rounded text-sm`}
                                    key={label}>
                                    {label}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div
          onClick={() => showAddCategoryModal()}
          className="flex mb-5 py-3 items-center rounded-md bg-stone-700 hover:bg-stone-600 ease-in duration-75 cursor-pointer justify-center">
          <div className="rounded-full bg-stone-500 w-[64px] h-[64px] flex justify-center items-center">
            <Button handleClick={() => showAddCategoryModal()}>
              <FaCirclePlus color="white" size={35} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

TasksCategories.propTypes = {
  tasksArray: PropTypes.arrayOf(PropTypes.object),
  setTasks: PropTypes.func,
  categoriesArray: PropTypes.arrayOf(PropTypes.string),
  setCategories: PropTypes.func,
  showModal: PropTypes.func,
};

export default TasksCategories;
