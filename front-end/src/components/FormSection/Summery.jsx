import { useEffect, useState } from "react";
import { Loader, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { AIChatSession } from "@/services/aiModel";
import { useDispatch, useSelector } from "react-redux";
import actUpdateResume from "@/store/resume/act/actUpdateResume";

const Summary = ({ enableNext }) => {
  const [summary, setSummary] = useState();

  const params = useParams();
  const [aiGeneratedSummaryList, setAiGenerateSummaryList] = useState();

  const { resume, loading, error } = useSelector((state) => state.resume);

  const dispatch = useDispatch();
  const [isGenerateAI, setIsGenerateAI] = useState(false);

  const onSave = (e) => {
    e.preventDefault();
    const resumeId = params.resumeId;
    const data = {
      data: {
        summary,
      },
    };

    dispatch(actUpdateResume({ id: resumeId, data: data }))
      .unwrap()
      .then(() => {
        toast.success("Summary Updated!");
        enableNext(true);
      });
  };

  useEffect(() => {
    if (resume) {
      setSummary(resume?.summary);
    }
  }, [resume]);

  const generateSummaryFromAI = async () => {
    setIsGenerateAI(true);
    const prompt = `Job Title: ${resume?.jobTitle} , Depends on job title give me list of  Summary for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With "summary" and "experience_level" Field in JSON Format`;
    const result = await AIChatSession.sendMessage(prompt);
    setAiGenerateSummaryList(JSON.parse([result.response.text()]));
    setIsGenerateAI(false);
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-primary">
      <h2 className="font-bold text-lg">Summary</h2>
      <p>Add Summary for your job title</p>

      <form onSubmit={onSave} className="flex flex-col gap-2.5">
        <div className="flex items-end justify-between mt-5">
          <Label>Add Summary</Label>
          <Button
            variant="outline"
            size="sm"
            className="border-primary text-primary hover:bg-primary hover:text-white"
            type="button"
            disabled={isGenerateAI}
            onClick={generateSummaryFromAI}
          >
            {isGenerateAI ? (
              <>
                Generating
                <Loader className="animate-spin" />
              </>
            ) : (
              <>
                Generate from AI
                <Sparkles />
              </>
            )}
          </Button>
        </div>
        <Textarea
          required
          onChange={(e) => setSummary(e.target.value)}
          value={summary}
          defaultValue={resume?.summary}
          className="h-60"
        />
        <div className="ms-auto">
          <Button type="submit" disabled={loading === "pending"}>
            {loading === "pending" ? (
              <span className="flex items-center gap-2">
                Saving
                <Loader className="animate-spin" />
              </span>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
      {aiGeneratedSummaryList && (
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">AI Generated Summary</h2>
          <div className="flex flex-col gap-3">
            {aiGeneratedSummaryList?.map((item, index) => (
              <div
                key={index}
                className="p-3 border rounded-lg hover:bg-secondary cursor-pointer"
                onClick={() => {
                  setSummary(item?.summary), enableNext(false);
                }}
              >
                <h3 className="font-bold">Level: {item.experience_level}</h3>
                <p>{item?.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
