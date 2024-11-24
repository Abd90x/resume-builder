/* eslint-disable react/prop-types */
import {
  ArrowBigDownDash,
  Eye,
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useState } from "react";
import globalApi from "@/services/globalApi";
import { toast } from "sonner";

const ResumeItem = ({ resume, refreshData }) => {
  const navigation = useNavigate();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onMenuItemClick = (url) => {
    navigation(url);
  };

  const deleteResume = () => {
    setLoading(true);
    globalApi.DeleteResume(resume.documentId).then(
      () => {
        setLoading(false);
        setOpen(false);
        toast.success("Resume deleted successfully");
        refreshData();
      },
      (error) => {
        setLoading(false);
        setOpen(false);
        toast.error("Something went wrong");
      }
    );
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
          <DropdownMenuTrigger>
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

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              resume and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteResume}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {loading ? (
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ResumeItem;
