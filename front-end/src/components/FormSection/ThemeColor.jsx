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
import { useDispatch, useSelector } from "react-redux";
import { editResume } from "@/store/resume/resumeSlice";

const ThemeColor = () => {
  const [color, setColor] = useState(null);
  const [open, setOpen] = useState(false);

  const { resume, loading } = useSelector((state) => state.resume);

  const dispatch = useDispatch();

  const handleColorChange = (color) => {
    setColor(color);
    dispatch(editResume({ ...resume, themeColor: color }));
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
            onChange={handleColorChange}
            className="w-full"
          />

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              {colors.map((color) => (
                <div
                  key={color}
                  className="w-6 h-6 rounded-full cursor-pointer hover:opacity-50"
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                ></div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={() => setOpen(false)}>Save</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeColor;
