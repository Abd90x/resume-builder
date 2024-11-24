import { useEffect, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { Button } from "../ui/button";
import { Loader, WandSparkles } from "lucide-react";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { AIChatSession } from "@/services/aiModel";
import { useSelector } from "react-redux";

const RichTextEditor = ({ onRichTextEditorChange, index, defaultValue }) => {
  const [value, setValue] = useState();

  const { resume, loading, error } = useSelector((state) => state.resume);

  const generateSummaryFromAI = async () => {
    const position = resume.experience[index].title;
    if (!position) {
      toast.error("Please enter a job title to generate the summary");
      return;
    }
    const prompt = `In my role as ${position} give me 2 - 3 lines for my current job overview in resume`;

    const result = await AIChatSession.sendMessage(prompt);
    let res = result.response.text();
    res = res.replace(/[^a-zA-Z0-9]/g, " ");
    setValue(res);

    // setResumeInfo({
    //   ...resume,
    //   experience: [
    //     ...resume.experience.slice(0, index),
    //     {
    //       ...resume.experience[index],
    //       workSummary: res,
    //     },
    //     ...resume.experience.slice(index + 1),
    //   ],
    // });
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-end justify-between">
        <Label htmlFor="workSummary">Job Summary</Label>
        <Button
          size="sm"
          variant="outline"
          onClick={generateSummaryFromAI}
          disabled={loading === "pending"}
        >
          {loading === "pending" ? (
            <>
              Generating <Loader className="animate-spin" />
            </>
          ) : (
            <>
              Generate from AI <WandSparkles />
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
