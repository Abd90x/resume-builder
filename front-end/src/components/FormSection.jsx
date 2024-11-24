import { ArrowLeft, ArrowRight, House } from "lucide-react";
import PersonalDetails from "./FormSection/PersonalDetails";
import { Button } from "./ui/button";
import { useState } from "react";
import Summary from "./FormSection/Summery";
import Experience from "./FormSection/Experience";
import Educational from "./FormSection/Educational";
import Skills from "./FormSection/Skills";
import Projects from "./FormSection/Projects";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./FormSection/ThemeColor";

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);

  const [enableNext, setEnableNext] = useState(true);

  const resumeId = useParams().resumeId;

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/dashboard">
            <Button size="icon">
              <House />
            </Button>
          </Link>

          <ThemeColor />
        </div>

        <div className="flex items-center gap-2">
          {activeFormIndex > 1 && (
            <Button onClick={() => setActiveFormIndex((prv) => prv - 1)}>
              <ArrowLeft />
            </Button>
          )}
          <Button
            disabled={!enableNext}
            onClick={() => setActiveFormIndex((prv) => prv + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Personal Details */}
      {activeFormIndex === 1 ? (
        <PersonalDetails enableNext={(val) => setEnableNext(val)} />
      ) : activeFormIndex === 2 ? (
        <Summary enableNext={(val) => setEnableNext(val)} />
      ) : activeFormIndex === 3 ? (
        <Experience enableNext={(val) => setEnableNext(val)} />
      ) : activeFormIndex === 4 ? (
        <Educational enableNext={(val) => setEnableNext(val)} />
      ) : activeFormIndex === 5 ? (
        <Skills enableNext={(val) => setEnableNext(val)} />
      ) : activeFormIndex === 6 ? (
        <Projects enableNext={(val) => setEnableNext(val)} />
      ) : activeFormIndex === 7 ? (
        <Navigate to={`/dashboard/resume/${resumeId}`} replace={true} />
      ) : null}
    </div>
  );
};

export default FormSection;
