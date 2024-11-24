import { useEffect, useState } from "react";
import { Loader, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import globalApi from "@/services/globalApi";
import { AIChatSession } from "@/services/aiModel";

const Summary = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummaryList, setAiGenerateSummaryList] = useState();

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const resumeId = params.resumeId;
    const data = {
      data: {
        summary,
      },
    };
    globalApi
      .UpdateResumeDetail(data, resumeId)
      .then((res) => {
        enableNext(true);
        setLoading(false);
        toast.success("Summary Updated!");
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const generateSummaryFromAI = async () => {
    setLoading(true);
    const prompt = `Job Title: ${resumeInfo?.jobTitle} , Depends on job title give me list of  Summary for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With "summary" and "experience_level" Field in JSON Format`;
    const result = await AIChatSession.sendMessage(prompt);

    console.log("result", JSON.parse([result.response.text()]));

    setAiGenerateSummaryList(JSON.parse([result.response.text()]));
    setLoading(false);
  };

  useEffect(() => {
    summary && setResumeInfo({ ...resumeInfo, summary });
  }, [summary]);

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
            onClick={generateSummaryFromAI}
          >
            Generate from AI
            <Sparkles />
          </Button>
        </div>
        <Textarea
          required
          onChange={(e) => setSummary(e.target.value)}
          value={summary}
          defaultValue={resumeInfo?.summary}
          className="h-60"
        />
        <div className="ms-auto">
          <Button type="submit" disabled={loading}>
            {loading ? (
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
