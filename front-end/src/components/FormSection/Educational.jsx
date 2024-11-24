import { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader, PlusCircle, Trash } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import globalApi from "@/services/globalApi";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";

const Educational = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [educationList, setEducationList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    resumeInfo?.education.length > 0 && setEducationList(resumeInfo?.education);
  }, [resumeInfo]);

  const handleChange = (event, index) => {
    enableNext(false);
    const newEntries = educationList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationList(newEntries);
    setResumeInfo({ ...resumeInfo, education: educationList });
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
    setEducationList((educationList) => educationList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationList,
      },
    };

    const resumeId = params.resumeId;

    globalApi.UpdateResumeDetail(data, resumeId).then(
      () => {
        setLoading(false);
        toast.success("Education Details updated !");
        enableNext(true);
      },
      () => {
        setLoading(false);
      }
    );
  };
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-primary">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add your Educational Details</p>
      <div>
        {educationList.map((item, idx) => {
          return (
            <div className="border p-5 rounded-lg mt-5" key={idx}>
              <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="flex flex-col gap-1.5 col-span-2">
                  <Label htmlFor="universityName">University</Label>
                  <Input
                    type="text"
                    placeholder="University"
                    name="universityName"
                    id="universityName"
                    defaultValue={item?.universityName}
                    onChange={(e) => handleChange(e, idx)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="major">Major</Label>
                  <Input
                    type="text"
                    placeholder="Major"
                    name="major"
                    id="major"
                    defaultValue={item?.major}
                    onChange={(e) => handleChange(e, idx)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="degree">Degree</Label>
                  <Input
                    type="text"
                    placeholder="Degree"
                    name="degree"
                    id="degree"
                    defaultValue={item?.degree}
                    onChange={(e) => handleChange(e, idx)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    type="date"
                    placeholder="Start Date"
                    name="startDate"
                    id="startDate"
                    defaultValue={item?.startDate}
                    onChange={(e) => handleChange(e, idx)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    type="date"
                    placeholder="End Date"
                    name="endDate"
                    id="endDate"
                    defaultValue={item?.endDate}
                    onChange={(e) => handleChange(e, idx)}
                  />
                </div>

                <div className="flex flex-col gap-1.5 col-span-2">
                  <Label htmlFor="state">Description</Label>
                  <Textarea
                    placeholder="Description"
                    name="description"
                    id="description"
                    defaultValue={item?.description}
                    onChange={(e) => handleChange(e, idx)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between gap-3 mt-5">
        <div className="flex items-center gap-3">
          <Button
            variant="destructive"
            disabled={educationList.length === 0}
            onClick={removeEducation}
          >
            <Trash />
          </Button>
          <Button variant="outline" onClick={addNewEducation}>
            Add More Education
            <PlusCircle />
          </Button>
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Educational;
