import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader, PlusCircle, Trash } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { useSelector, useDispatch } from "react-redux";
import actUpdateResume from "@/store/resume/act/actUpdateResume";
import { editResume } from "@/store/resume/resumeSlice";
import { Checkbox } from "../ui/checkbox";

const Educational = ({ enableNext }) => {
  const dispatch = useDispatch();
  const { resume, loading, error } = useSelector((state) => state.resume);

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

  useEffect(() => {
    resume?.education.length > 0 && setEducationList(resume?.education);
  }, [resume]);

  const handleChange = (event, index) => {
    enableNext(false);
    const newEntries = JSON.parse(JSON.stringify(educationList));
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationList(newEntries);

    dispatch(editResume({ ...resume, education: newEntries }));
  };

  const addNewEducation = () => {
    enableNext(false);
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
    const newEntries = JSON.parse(JSON.stringify(educationList));

    setEducationList(newEntries);

    dispatch(editResume({ ...resume, education: newEntries }));
  };

  const handleCheckBoxChange = (e, index) => {
    enableNext(false);
    const newEntries = JSON.parse(JSON.stringify(educationList));

    newEntries[index] = {
      ...newEntries[index],
      currentlyStudy: e,
      endDate: e ? "" : newEntries[index].endDate,
    };
    setEducationList(newEntries);
    dispatch(editResume({ ...resume, education: newEntries }));
  };

  const onSave = () => {
    const data = {
      data: {
        education: educationList.map(({ id, ...edu }) => edu),
      },
    };
    const resumeId = params.resumeId;
    dispatch(actUpdateResume({ id: resumeId, data: data }))
      .unwrap()
      .then(() => {
        toast.success("Education Details updated !");
        enableNext(true);
      });
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

                <div
                  className={`${
                    item.currentlyStudy ? "hidden" : "flex"
                  } flex-col gap-1.5`}
                >
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

                <div className="flex items-center gap-1.5 mt-5">
                  <Checkbox
                    id={`currentlyStudy-${idx}`}
                    name="currentlyStudy"
                    onCheckedChange={(e) => handleCheckBoxChange(e, idx)}
                    defaultValue={item?.currentlyStudy}
                    checked={item?.currentlyStudy}
                  />
                  <Label htmlFor={`currentlyStudy-${idx}`}>
                    Currently Studying
                  </Label>
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
        <Button disabled={loading === "pending"} onClick={() => onSave()}>
          {loading === "pending" ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Educational;
