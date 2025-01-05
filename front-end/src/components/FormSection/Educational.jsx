import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { PlusCircle, Trash } from "lucide-react";
import { Textarea } from "../ui/textarea";

import { Checkbox } from "../ui/checkbox";
import useEducation from "@/hooks/useEducation";
import DatePicker from "../ui/date-picker";

const Educational = () => {
  const {
    handleChange,
    addNewEducation,
    removeEducation,
    handleCheckBoxChange,
    educationList,
  } = useEducation();

  const handleSelectDate = (e, idx, name) => {
    const value = e && e.toString().substr(0, 15);
    const event = { target: { name, value } };
    handleChange(event, idx);
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
                  <DatePicker
                    defaultDate={item?.startDate && new Date(item.startDate)}
                    handleSelectDate={(e) =>
                      handleSelectDate(e, idx, "startDate")
                    }
                  />
                </div>

                <div
                  className={`${
                    item.currentlyStudy ? "hidden" : "flex"
                  } flex-col gap-1.5`}
                >
                  <Label htmlFor="endDate">End Date</Label>
                  <DatePicker
                    defaultDate={item?.endDate && new Date(item.endDate)}
                    handleSelectDate={(e) =>
                      handleSelectDate(e, idx, "endDate")
                    }
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
      </div>
    </div>
  );
};

export default Educational;
