import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/clerk-react";

// Icons
import { Loader, PlusSquareIcon } from "lucide-react";
// UI
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actCreateResume from "@/store/resume/act/actCreateResume";

const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const { user } = useUser();

  const dispatch = useDispatch();

  const { resume, loading, error } = useSelector((state) => state.resume);

  const navigate = useNavigate();

  const onCreate = () => {
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };
    dispatch(actCreateResume(data))
      .unwrap()
      .then((res) => {
        setOpenDialog(false);
        navigate(`/dashboard/resume/${res.documentId}/edit`);
      });
  };

  return (
    <div role="button">
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
          </DialogHeader>

          <DialogDescription className="flex flex-col gap-3">
            <Label htmlFor="resume">Add a title for your resume</Label>
            <Input
              placeholder="e.g. Software Engineer"
              id="resume"
              onChange={(e) => setResumeTitle(e.target.value)}
            />
          </DialogDescription>
          <DialogFooter>
            <div className="flex items-center justify-end gap-4">
              <Button
                disabled={loading === "pending"}
                variant="ghost"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={onCreate}
                disabled={!resumeTitle || loading === "pending"}
              >
                {loading === "pending" ? (
                  <>
                    Creating <Loader className="animate-spin" />
                  </>
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
