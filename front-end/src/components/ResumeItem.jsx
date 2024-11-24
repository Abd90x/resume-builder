import { useDispatch, useSelector } from "react-redux";
/* eslint-disable react/prop-types */
import {
  ArrowBigDownDash,
  Eye,
  Loader,
  Loader2,
  MoreVertical,
  Notebook,
  PencilRuler,
  Trash2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";

import { useState } from "react";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import actGetUserResumes from "@/store/resume/act/actGetUserResumes";
import actDeleteResume from "@/store/resume/act/actDeleteResume";

const ResumeItem = ({ resume }) => {
  const navigation = useNavigate();

  const [open, setOpen] = useState(false);

  const { user } = useUser();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.resume);

  const deleteResume = () => {
    dispatch(actDeleteResume(resume.documentId))
      .unwrap()
      .then(() => {
        toast.success("Resume deleted successfully");
        dispatch(actGetUserResumes(user?.primaryEmailAddress?.emailAddress));
        setOpen(false);
      });
  };

  return (
    <div className="flex flex-col gap-2">
      <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <div className="flex items-center justify-center p-14 py-24   bg-secondary rounded-lg h-72 hover:scale-105 hover:shadow-md transition-all  cursor-pointer">
          <div className="flex flex-col items-center justify-center gap-4">
            <Notebook />
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between">
        <label>{resume.title}</label>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigation(`/dashboard/resume/${resume.documentId}/edit`)
              }
            >
              <PencilRuler /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigation(`/dashboard/resume/${resume.documentId}`)
              }
            >
              <Eye /> View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigation(`/dashboard/resume/${resume.documentId}`)
              }
            >
              <ArrowBigDownDash /> Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Trash2 /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>

          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            resume and remove your data from our servers.
          </DialogDescription>
          <DialogFooter>
            <div className="flex items-center justify-end gap-4">
              <Button
                disabled={loading === "pending"}
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={deleteResume}
                disabled={loading === "pending"}
              >
                {loading === "pending" ? (
                  <>
                    Deleting <Loader className="animate-spin" />
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResumeItem;
