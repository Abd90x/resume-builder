import { useContext, useEffect, useState } from "react";
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
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { toast } from "sonner";
import { AIChatSession } from "@/services/aiModel";

const RichTextEditor = ({ onRichTextEditorChange, index, defaultValue }) => {
  const [value, setValue] = useState();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const generateSummaryFromAI = async () => {
    setLoading(true);
    const position = resumeInfo.experience[index].title;
    if (!position) {
      toast.error("Please enter a job title to generate the summary");
      setLoading(false);
      return;
    }
    const prompt = `In my role as ${position} give me 2 - 3 lines for my current job overview in resume`;

    const result = await AIChatSession.sendMessage(prompt);
    let res = result.response.text();
    res = res.replace(/[^a-zA-Z0-9]/g, " ");
    setValue(res);

    setResumeInfo({
      ...resumeInfo,
      experience: [
        ...resumeInfo.experience.slice(0, index),
        {
          ...resumeInfo.experience[index],
          workSummary: res,
        },
        ...resumeInfo.experience.slice(index + 1),
      ],
    });
    setLoading(false);
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
          disabled={loading}
        >
          {loading ? (
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
