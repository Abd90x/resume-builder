import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader, PlusCircle, Trash } from "lucide-react";
import RichTextEditor from "./RichTextEditor";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import actUpdateResume from "@/store/resume/act/actUpdateResume";

const Experience = ({ enableNext }) => {
  const dispatch = useDispatch();
  const [experinceList, setExperinceList] = useState([]);

  const params = useParams();

  const { resume, loading, error } = useSelector((state) => state.resume);

  useEffect(() => {
    resume?.experience.length > 0 && setExperinceList(resume?.experience);
  }, [resume]);

  const handleChange = (event, index) => {
    enableNext(false);
    const newEntries = experinceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperinceList(newEntries);
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
        workSummary: "",
      },
    ]);
  };

  const removeExperience = () => {
    setExperinceList((experinceList) => experinceList.slice(0, -1));
  };

  const handleRichTextEditor = (e, index) => {
    const newEntries = experinceList.slice();
    newEntries[index]["workSummary"] = e.target.value;
    setExperinceList(newEntries);
  };

  const onSave = () => {
    const data = {
      data: {
        experience: experinceList.map(({ id, ...exp }) => exp),
      },
    };
    const resumeId = params.resumeId;
    dispatch(actUpdateResume({ id: resumeId, data: data }))
      .unwrap()
      .then(() => {
        toast.success("Experience Details updated !");
        enableNext(true);
      });
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-primary">
      <h2 className="font-bold text-lg">Professional Experiences</h2>
      <p>Add your previous Job experinces</p>
      <div>
        {experinceList.map((item, idx) => {
          return (
            <div className="border p-5 rounded-lg mt-5" key={idx}>
              <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    type="text"
                    placeholder="Job Title"
                    name="title"
                    id="title"
                    defaultValue={item?.title}
                    onChange={(e) => handleChange(e, idx)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    type="text"
                    placeholder="Company Name"
                    name="companyName"
                    id="companyName"
                    defaultValue={item?.companyName}
                    onChange={(e) => handleChange(e, idx)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="city">City</Label>
                  <Input
                    type="text"
                    placeholder="City"
                    name="city"
                    id="city"
                    defaultValue={item?.city}
                    onChange={(e) => handleChange(e, idx)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="state">State</Label>
                  <Input
                    type="text"
                    placeholder="State"
                    name="state"
                    id="state"
                    defaultValue={item?.state}
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

                <div className="col-span-2">
                  <RichTextEditor
                    onRichTextEditorChange={(e) => handleRichTextEditor(e, idx)}
                    index={idx}
                    defaultValue={item?.workSummary}
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
            disabled={experinceList.length === 0}
            onClick={removeExperience}
          >
            <Trash />
          </Button>
          <Button variant="outline" onClick={addNewExperience}>
            Add More Experince
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

export default Experience;
