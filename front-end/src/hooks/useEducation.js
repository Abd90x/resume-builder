import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editResume } from "@/store/resume/resumeSlice";

const useEducation = () => {
  const dispatch = useDispatch();
  const { resume } = useSelector((state) => state.resume);

  const [educationList, setEducationList] = useState(resume?.education);

  useEffect(() => {
    resume?.education.length > 0 && setEducationList(resume?.education);
  }, [resume]);

  const handleChange = (event, index) => {
    const newEntries = JSON.parse(JSON.stringify(educationList));
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationList(newEntries);

    dispatch(editResume({ ...resume, education: newEntries }));
  };

  const addNewEducation = () => {
    setEducationList([
      ...educationList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeEducation = () => {
    if (educationList.length === 1) return;

    const newEntries = JSON.parse(JSON.stringify(educationList));
    newEntries.pop();

    setEducationList(newEntries);

    dispatch(editResume({ ...resume, education: newEntries }));
  };

  const handleCheckBoxChange = (e, index) => {
    const newEntries = JSON.parse(JSON.stringify(educationList));

    newEntries[index] = {
      ...newEntries[index],
      currentlyStudy: e,
      endDate: e ? "" : newEntries[index].endDate,
    };
    setEducationList(newEntries);
    dispatch(editResume({ ...resume, education: newEntries }));
  };

  const handleSelectDate = (e, idx, name) => {
    const value = e && e.toString().substr(0, 15);
    const event = { target: { name, value } };
    handleChange(event, idx);
  };

  return {
    handleChange,
    addNewEducation,
    removeEducation,
    handleCheckBoxChange,
    educationList,
    handleSelectDate,
  };
};

export default useEducation;
