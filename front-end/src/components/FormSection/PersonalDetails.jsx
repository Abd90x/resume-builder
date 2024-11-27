import { Input } from "../ui/input";
import { Label } from "../ui/label";

import Loading from "../Feedback/Loading";
import usePersonal from "@/hooks/usePersonal";

const PersonalDetails = () => {
  const { resume, loading, error, handleInputChange } = usePersonal();

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-primary">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Get Started with the basic information</p>

      <Loading loading={loading} error={error} type="form">
        <form>
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
          </div>
        </form>
      </Loading>
    </div>
  );
};

export default PersonalDetails;
