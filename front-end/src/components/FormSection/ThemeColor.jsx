import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LayoutGrid, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useContext, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import globalApi from "@/services/globalApi";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

const ThemeColor = () => {
  const [color, setColor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const resumeId = useParams().resumeId;
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const handleSave = () => {
    setLoading(true);
    setResumeInfo({
      ...resumeInfo,
      themeColor: color,
    });
    setOpen(false);
    globalApi
      .UpdateResumeDetail(
        {
          data: {
            themeColor: color,
          },
        },
        resumeId
      )
      .then(
        () => {
          toast.success("Theme color updated !");
          setLoading(false);
        },
        () => {
          toast.error("Something went wrong !");
          setLoading(false);
        }
      );
  };

  useEffect(() => {
    if (resumeInfo?.themeColor) {
      setColor(resumeInfo?.themeColor);
    }
  }, []);

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      themeColor: color,
    });
  }, [color]);

  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#A133FF",
    "#FFD700",
    "#FF00FF",
    "#FF69B4",
    "#000000",
  ];
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger disabled={loading}>
        <Button disabled={loading} variant="outline">
          {loading ? (
            <>
              <Loader className="animate-spin" />
            </>
          ) : (
            <>
              Theme <LayoutGrid />
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-4">
          <Label>Choose a color</Label>
          <HexColorPicker
            color={color ?? "#000000"}
            onChange={setColor}
            className="w-full"
          />

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              {colors.map((color) => (
                <div
                  key={color}
                  className="w-6 h-6 rounded-full cursor-pointer hover:opacity-50"
                  style={{ backgroundColor: color }}
                  onClick={() => setColor(color)}
                ></div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeColor;
