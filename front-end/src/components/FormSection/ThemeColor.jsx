import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LayoutGrid, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actUpdateResume from "@/store/resume/act/actUpdateResume";

const ThemeColor = () => {
  const [color, setColor] = useState(null);
  const [open, setOpen] = useState(false);
  const resumeId = useParams().resumeId;

  const { resume, loading, error } = useSelector((state) => state.resume);

  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(
      actUpdateResume({
        id: resumeId,
        data: {
          data: {
            themeColor: color,
          },
        },
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Theme color updated !");
        setOpen(false);
      });
  };

  useEffect(() => {
    if (resume?.themeColor) {
      setColor(resume?.themeColor);
    }
  }, [dispatch]);

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
      <PopoverTrigger asChild disabled={loading === "pending"}>
        <Button disabled={loading === "pending"} variant="outline">
          {loading === "pending" ? (
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
            <Button disabled={loading === "pending"} onClick={handleSave}>
              {loading === "pending" ? (
                <>
                  <Loader className="animate-spin" />
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeColor;
