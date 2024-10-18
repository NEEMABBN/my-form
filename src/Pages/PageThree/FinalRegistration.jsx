import React, { useRef, useState } from "react";
import MuiCustomThemeComponent from "../../Components/MuiCostumTheme";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  FaFacebook,
  FaGoogle,
  FaLinkedin,
  FaPause,
  FaPlay,
} from "react-icons/fa";
import { VscDebugRestart } from "react-icons/vsc";
import { BsFillCloudCheckFill } from "react-icons/bs";
import { MdCloudUpload } from "react-icons/md";

export default function FinalRegistration() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [file, setFile] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      audioChunksRef.current = [];
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const restartRecording = () => {
    setAudioUrl(null);
    startRecording();
  };

  const uploadAudio = async () => {
    //'POST' : Send a Voice To Back-End
    if (!audioUrl) return;
    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.wav");
    try {
      const response = await fetch("YOUR_SERVER_ENDPOINT", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Upload successful:", result);
      } else {
        console.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("YOUR_SERVER_ENDPOINT", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const result = await response.json();
        console.log("File upload successful:", result);
      } else {
        console.error("File upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="xl:w-[45%] lg:w-[55%] md:w-[75%] sm:w-[70%] w-[80%] mx-auto bg-white rounded-2xl shadow-xl flex flex-col items-center p-10 gap-8">
      <h1 className="md:text-3xl sm:text-2xl text-lg font-bold text-Primary">
        اطلاعات تکمیلی
      </h1>
      <p className="sm:text-base text-sm text-gray-600 text-center">
        فرصت فروش بیشتر در بین میلیون‌ها مشتری:)
      </p>
      <MuiCustomThemeComponent>
        <TextField
          id="outlined-basic"
          label="شماره همراه"
          className="!w-full"
          variant="outlined"
          helperText={
            <Link to="/" className="text-Primary">
              اصلاح شماره تماس
            </Link>
          }
          InputProps={{ sx: { borderRadius: 4 } }}
          InputLabelProps={{ className: "sm:!text-base !text-sm" }}
        />
        <TextField
          id="outlined-basic"
          label="کد را وارد کنید"
          variant="outlined"
          className="w-full"
          InputProps={{ sx: { borderRadius: 4 } }}
          InputLabelProps={{ className: "sm:!text-base !text-sm" }}
        />
      </MuiCustomThemeComponent>

      <div className="w-full flex flex-col items-center bg-gray-300 rounded-2xl shadow-xl gap-2 p-5">
        <span className="text-gray-700 md:text-xl sm:text-base text-sm font-bold text-center">
          تصویری از فروشگاه خود آپلود کنید
        </span>
        <div className="w-full flex items-center justify-center gap-10">
          <label className="custom-file-upload cursor-pointer">
            <MdCloudUpload className="text-2xl text-Primary" />
            <input type="file" accept="*/*" onChange={handleFileChange} />
          </label>
          <button
            onClick={uploadFile}
            disabled={!file}
            className="text-2xl text-Primary"
          >
            <BsFillCloudCheckFill />
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col items-center bg-gray-300 rounded-2xl shadow-xl gap-2 p-5">
        <span className="text-gray-700 md:text-xl sm:text-base text-sm font-bold text-center">
          توصیف مختصری از فعالیت فروشگاه در قالب وویس آماده کنید
        </span>
        <div className="w-full flex items-center justify-center gap-10">
          <button
            onClick={restartRecording}
            disabled={isRecording}
            className="text-2xl text-Primary"
          >
            <VscDebugRestart />
          </button>
          <button
            onClick={startRecording}
            disabled={isRecording}
            className="text-2xl text-Primary"
          >
            <FaPlay />
          </button>
          <button
            onClick={stopRecording}
            disabled={!isRecording}
            className="text-2xl text-Primary"
          >
            <FaPause />
          </button>
          <button
            onClick={uploadAudio}
            disabled={!audioUrl}
            className="text-2xl text-Primary"
          >
            <BsFillCloudCheckFill />
          </button>
        </div>
        {audioUrl && (
          <audio controls>
            <source src={audioUrl} type="audio/wav" />
            مرورگر شما از پخش صوت پشتیبانی نمیکند
          </audio>
        )}
      </div>

      <div className="w-full flex flex-col items-center gap-1">
        <MuiCustomThemeComponent>
          <Button
            className="!bg-Primary !rounded-2xl md:!text-xl sm:!text-base !text-sm !font-bold !w-full !py-3"
            variant="contained"
          >
            ثبت نهایی
          </Button>
          <span className="text-center sm:text-base text-sm text-gray-600">
            ورود شما به معنای پذیرش{" "}
            <Link to="" className="text-Primary">
              شرایط برگ بنفش{" "}
            </Link>
            و{" "}
            <Link to="" className="text-Primary">
              قوانین حریم خصوصی{" "}
            </Link>
            است
          </span>
        </MuiCustomThemeComponent>
      </div>

      <div className="w-full flex items-center gap-2">
        <span className="w-full bg-gray-600 h-[2px] rounded-full"></span>
        <span className="text-gray-600 text-nowrap text-sm">
          راه‌های ارتباطی با ما
        </span>
        <span className="w-full bg-gray-600 h-[2px] rounded-full"></span>
      </div>

      <div className="w-full flex items-center justify-center gap-9">
        <Link to="https://bargebanafsh.com/" className="sm:text-3xl text-2xl">
          <FaGoogle />
        </Link>
        <Link to="https://bargebanafsh.com/" className="sm:text-3xl text-2xl">
          <FaFacebook />
        </Link>
        <Link to="https://bargebanafsh.com/" className="sm:text-3xl text-2xl">
          <FaLinkedin />
        </Link>
      </div>
    </div>
  );
}
