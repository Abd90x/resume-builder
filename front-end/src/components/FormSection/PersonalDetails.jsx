import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import globalApi from "@/services/globalApi";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const PersonalDetails = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const handleInputChange = (e) => {
    enableNext(false);
    const { name, value } = e.target;
    setResumeInfo({ ...resumeInfo, [name]: value });
    setFormData({ ...formData, [name]: value });
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const resumeId = params.resumeId;
    const data = { data: formData };
    globalApi
      .UpdateResumeDetail(data, resumeId)
      .then((res) => {
        enableNext(true);
        setLoading(false);
        toast.success("Personal Details Updated!");
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setFormData({
      firstName: resumeInfo?.firstName,
      lastName: resumeInfo?.lastName,
      jobTitle: resumeInfo?.jobTitle,
      address: resumeInfo?.address,
      email: resumeInfo?.email,
      phone: resumeInfo?.phone,
      linkedin: resumeInfo?.linkedin,
      github: resumeInfo?.github,
    });
  }, []);

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
              defaultValue={resumeInfo?.firstName}
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
              defaultValue={resumeInfo?.lastName}
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
              defaultValue={resumeInfo?.jobTitle}
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
              defaultValue={resumeInfo?.address}
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
              defaultValue={resumeInfo?.email}
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
              defaultValue={resumeInfo?.phone}
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
              defaultValue={resumeInfo?.linkedin}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col gap-1.5 ">
            <Label htmlFor="github">Github (Username)</Label>
            <Input
              type="tel"
              id="github"
              name="github"
              defaultValue={resumeInfo?.github}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-2 ms-auto">
            <Button type="submit" disabled={loading}>
              {loading ? (
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
