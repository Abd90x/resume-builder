import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import actUpdateResume from "@/store/resume/act/actUpdateResume";

const PersonalDetails = ({ enableNext }) => {
  const { resume, loading, error } = useSelector((state) => state.resume);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState();
  const params = useParams();

  const handleInputChange = (e) => {
    enableNext(false);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSave = (e) => {
    e.preventDefault();

    const resumeId = params.resumeId;

    dispatch(actUpdateResume({ id: resumeId, data: { data: formData } }))
      .unwrap()
      .then(() => {
        toast.success("Personal Details Updated!");
        enableNext(true);
      });
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

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-primary">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Get Started with the basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              defaultValue={resume?.firstName}
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              defaultValue={resume?.lastName}
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-1.5 col-span-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              type="text"
              id="jobTitle"
              name="jobTitle"
              defaultValue={resume?.jobTitle}
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-1.5 col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input
              type="text"
              id="address"
              name="address"
              defaultValue={resume?.address}
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              defaultValue={resume?.email}
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-1.5 ">
            <Label htmlFor="phone">Phone</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              defaultValue={resume?.phone}
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-1.5 ">
            <Label htmlFor="linkedin">Linkedin (Username)</Label>
            <Input
              type="tel"
              id="linkedin"
              name="linkedin"
              defaultValue={resume?.linkedin}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-1.5 ">
            <Label htmlFor="github">Github (Username)</Label>
            <Input
              type="tel"
              id="github"
              name="github"
              defaultValue={resume?.github}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-2 ms-auto">
            <Button type="submit" disabled={loading === "pending"}>
              {loading === "pending" ? (
                <span className="flex items-center gap-2">
                  Saving
                  <Loader className="animate-spin" />
                </span>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;
