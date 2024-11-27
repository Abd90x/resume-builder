import { AIChatSession } from "@/services/aiModel";
import { useDispatch, useSelector } from "react-redux";
import { editResume } from "@/store/resume/resumeSlice";
import { useEffect, useState } from "react";

const useSummary = () => {
  const [summary, setSummary] = useState();

  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState([]);

  const { resume } = useSelector((state) => state.resume);

  const dispatch = useDispatch();
  const [isGenerateAI, setIsGenerateAI] = useState(false);

  useEffect(() => {
    if (resume) {
      setSummary(resume?.summary);
    }
  }, [resume]);

  const generatesummaryFromAI = async () => {
    setIsGenerateAI(true);
    const prompt = `Job Title: ${resume?.jobTitle} , Depends on job title give me list of  summary  for 3 experience level, Mid Level and Freasher level in 3 -4 lines in JSON format like this 
    summaries:[
    {summary :"", experience_level:""}
    ]
    }`;
    const result = await AIChatSession.sendMessage(prompt);
    const textResponse = await result.response.text();
    const resultData = JSON.parse(textResponse);

    setAiGenerateSummeryList(resultData.summaries || []);
    setIsGenerateAI(false);
  };

  const handleSummaryChange = (e) => {
    const newValue = e.target.value;
    setSummary(newValue);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (summary !== resume?.summary) {
        dispatch(editResume({ ...resume, summary }));
      }
    }, 300);
    return () => clearTimeout(delay); // Cleanup on component unmount or state change
  }, [summary, resume, dispatch]);

  const handleSelectAISummery = (value) => {
    setSummary(value);
    dispatch(editResume({ ...resume, summary: value }));
  };

  return {
    aiGeneratedSummeryList,
    handleSummaryChange,
    generatesummaryFromAI,
    handleSelectAISummery,
    isGenerateAI,
    resume,
    summary,
  };
};

export default useSummary;
