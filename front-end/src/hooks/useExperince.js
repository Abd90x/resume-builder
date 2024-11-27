import { editResume } from "@/store/resume/resumeSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useExperince = () => {
  const dispatch = useDispatch();
  const [experinceList, setExperinceList] = useState([]);

  const { resume } = useSelector((state) => state.resume);

  useEffect(() => {
    resume?.experience.length > 0 && setExperinceList(resume?.experience);
  }, [resume]);

  const handleChange = (event, index) => {
    const newEntries = JSON.parse(JSON.stringify(experinceList));
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperinceList(newEntries);
    dispatch(editResume({ ...resume, experience: newEntries }));
  };

  const addNewExperience = () => {
    setExperinceList([
      ...experinceList,
      {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummery: "",
      },
    ]);
  };

  const removeExperience = () => {
    const newEntries = experinceList.slice(0, -1);

    setExperinceList(newEntries);
    dispatch(editResume({ ...resume, experience: newEntries }));
  };

  const handleRichTextEditor = (e, index) => {
    const value = e.target.value;
    const newEntries = JSON.parse(JSON.stringify(experinceList));
    newEntries[index]["workSummery"] = value;
    setExperinceList(newEntries);

    dispatch(editResume({ ...resume, experience: newEntries }));
  };

  const handleCheckBoxChange = (e, index) => {
    const newEntries = JSON.parse(JSON.stringify(experinceList));

    newEntries[index] = {
      ...newEntries[index],
      currentlyWorking: e,
      endDate: e ? "" : newEntries[index].endDate,
    };
    setExperinceList(newEntries);
    dispatch(editResume({ ...resume, experience: newEntries }));
  };

  return {
    handleChange,
    addNewExperience,
    removeExperience,
    handleRichTextEditor,
    handleCheckBoxChange,
    experinceList,
  };
};

export default useExperince;
