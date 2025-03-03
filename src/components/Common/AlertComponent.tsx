"use client";

import { useSelector, useDispatch } from "react-redux";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { hideAlert } from "@/redux/slices/alertSlice";

const AlertComponent = () => {
  const { message, type, show } = useSelector((state: RootState) => state.alert);
  const dispatch = useDispatch();

  if (!show) return null;

  const colors = {
    success: "border-green-500 bg-green-50",
    error: "border-red-500 bg-red-50",
    info: "border-blue-500 bg-blue-50",
    warning: "border-yellow-500 bg-yellow-50",
  };

  return (
    <div className="fixed top-[10px] left-7/8 transform -translate-x-1/2 z-50">
      <Alert variant="destructive" className={`w-[350px] shadow-lg ${colors[type]}`}>
        <AlertTitle className="capitalize">{type}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
        <Button variant="destructive" onClick={() => dispatch(hideAlert())} className="text-black ">
          Close
        </Button>
      </Alert>
    </div>
  );
}

export default AlertComponent