import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import globalApi from "@/services/globalApi";
import { useUser } from "@clerk/clerk-react";

// Icons
import { Loader, PlusSquareIcon } from "lucide-react";
// UI
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useNavigate } from "react-router-dom";

const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const onCreate = () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };

    globalApi.CreateNewResume(data).then(
      (res) => {
        if (res) {
          setLoading(false);
          navigation(`/dashboard/resume/${res.data.data.documentId}/edit`);
        }
      },
      () => {
        setLoading(false);
      }
    );

    setOpenDialog(false);
  };

  return (
    <div>
      <div
        className="flex items-center justify-center p-14 py-24   bg-secondary rounded-lg h-72 hover:scale-105 hover:shadow-md transition-all border border-dashed cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquareIcon />
      </div>

      <Dialog onOpenChange={setOpenDialog} open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <div className="py-7">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="resume">Add a title for your resume</Label>
                  <Input
                    placeholder="e.g. Software Engineer"
                    id="resume"
                    onChange={(e) => setResumeTitle(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
            <div className="flex items-center justify-end gap-4">
              <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button onClick={onCreate} disabled={!resumeTitle || loading}>
                {loading ? (
                  <span>
                    <Loader className="animate-spin" /> Creating...
                  </span>
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
