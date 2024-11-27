import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { editResume } from "@/store/resume/resumeSlice";

const usePersonal = () => {
  const { resume, loading, error } = useSelector((state) => state.resume);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    dispatch(editResume({ ...resume, [name]: value }));
  };

  useEffect(() => {
    setFormData({
      firstName: resume?.firstName,
      lastName: resume?.lastName,
      jobTitle: resume?.jobTitle,
      address: resume?.address,
      email: resume?.email,
      phone: resume?.phone,
      linkedin: resume?.linkedin,
      github: resume?.github,
    });
  }, [dispatch, resume]);

  return { resume, loading, error, handleInputChange };
};

export default usePersonal;
