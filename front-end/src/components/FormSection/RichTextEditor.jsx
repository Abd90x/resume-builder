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
import { Loader, Sparkles } from "lucide-react";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { AIChatSession } from "@/services/aiModel";
import { useSelector } from "react-redux";

const RichTextEditor = ({ onRichTextEditorChange, index, defaultValue }) => {
  const [value, setValue] = useState();
  const [aiLoading, setAiLoading] = useState(false);

  const { resume } = useSelector((state) => state.resume);

  const generateSummaryFromAI = async () => {
    setAiLoading(true);
    const position = resume.experience[index].title;
    if (!position) {
      toast.error("Please enter a job title to generate the summary");
      setAiLoading(false);

      return;
    }
    const prompt = `In my role as ${position} give me 2 - 3 lines for my current job overview in resume`;

    const result = await AIChatSession.sendMessage(prompt);
    let res = result.response.text();
    res = res.replace(/[^a-zA-Z0-9]/g, " ");
    setValue(res);
    setAiLoading(false);

    onRichTextEditorChange({
      target: {
        value: res,
      },
    });
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
          className="border-primary text-primary hover:bg-primary hover:text-white"
          onClick={generateSummaryFromAI}
          disabled={aiLoading}
        >
          {aiLoading ? (
            <>
              Generating <Loader className="animate-spin" />
            </>
          ) : (
            <>
              Generate from AI <Sparkles />
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
