import { Loader, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import useSummary from "@/hooks/useSummary";

const Summary = () => {
  const {
    aiGeneratedSummeryList,
    handleSummaryChange,
    generatesummaryFromAI,
    handleSelectAISummery,
    isGenerateAI,
    summary,
  } = useSummary();

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-primary">
      <h2 className="font-bold text-lg">summary </h2>
      <p>Add summary for your job title</p>

      <form className="flex flex-col gap-2.5">
        <div className="flex items-end justify-between mt-5">
          <Label>Add summary </Label>
          <Button
            variant="outline"
            size="sm"
            className="border-primary text-primary hover:bg-primary hover:text-white"
            type="button"
            disabled={isGenerateAI}
            onClick={generatesummaryFromAI}
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
          onChange={(e) => handleSummaryChange(e)}
          value={summary}
          className="h-60"
        />
      </form>
      {aiGeneratedSummeryList.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">AI Generated summary </h2>
          <div className="flex flex-col gap-3">
            {aiGeneratedSummeryList.map((item, index) => (
              <div
                key={index}
                className="p-3 border rounded-lg hover:bg-secondary cursor-pointer"
                onClick={() => {
                  handleSelectAISummery(item?.summary);
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
