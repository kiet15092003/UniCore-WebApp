"use client";

import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { showAlert } from "@/redux/slices/alertSlice";

const LoginComponent = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <Button
        onClick={() => dispatch(showAlert({ message: "Success! 🎉", type: "success" }))}
      >
        Show Success Alert
      </Button>
      <Button
        color="blue"
        onClick={() => dispatch(showAlert({ message: "Error occurred!", type: "error" }))}
      >
        Show Error Alert
      </Button>
    </div>
  );
}

export default LoginComponent