import React, { useRef, useState } from "react";
import MuiCustomThemeComponent from "../../Components/MuiCostumTheme";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  FaFacebook,
  FaGoogle,
  FaLinkedin,
  FaRegStopCircle,
} from "react-icons/fa";
import { VscDebugRestart } from "react-icons/vsc";
import { ImFolderPlus } from "react-icons/im";
import { MdKeyboardVoice } from "react-icons/md";
import CryptoJS from "crypto-js";

export default function FinalRegistration() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [phoneInput, setPhoneInput] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
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

  const uploadData = async () => {
    const formData = new FormData();
    if (audioUrl) {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      formData.append("audio", audioBlob, "recording.wav");
    }
    if (file) {
      formData.append("file", file);
    }
    try {
      formData.append("PhoneVerify", phoneVerify);
      formData.append("ManagerPhone", phoneInput);
      formData.append("brgb_nonce_visitor_input", nonceCode());
      const response = await fetch("https://brgb.ir/present.php", {
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
      console.error("Error uploading data:", error);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setPreviewUrl(null);
    }
  };

  const isFormValid = () => {
    return phoneInput;
  };

  const getPhone = (e) => {
    setPhoneInput(e.target.value);
  };
  const getCode = (e) => {
    setVerifyCode(e.target.value);
  };

  const nonceCode = () => {
    const secretKey = "@Brgb_form_Presentor_0";
    const timestamp = Date.now();
    const action = "";
    const md5SecretKey = CryptoJS.MD5(secretKey).toString();
    const data = `${timestamp}|${action}|${md5SecretKey}`;
    const nonce = btoa(data);
    return nonce;
  };

  const sendCode = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      const newNonce = nonceCode();
      const data = {
        ManagerPhone: phoneInput,
        brgb_nonce_visitor_input: newNonce,
        ActionType: "SendVerifyCode",
      };
      try {
        const response = await fetch("https://brgb.ir/present.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(data).toString(),
        });
        if (response.ok) {
          const result = await response.json();
          console.log("Upload successful:", result);
        } else {
          console.error("Upload failed:", response.statusText);
          alert("شماره صحیح نمی‌باشد");
        }
      } catch (error) {
        console.error("Error uploading data:", error);
        alert("خطا در ارسال شماره، لطفا مجدد تلاش کنید");
      }
    } else {
      alert("لطفا شماره تماس را وارد کنید");
    }
  };

  const phoneVerify = false;
  const CheckVerifyCodes = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      const newNonce = nonceCode();
      const data = {
        ManagerPhone: phoneInput,
        brgb_nonce_visitor_input: newNonce,
        ActionType: "CheckVerifyCode",
        ReceiveCode: verifyCode,
      };
      try {
        const response = await fetch("https://brgb.ir/present.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(data).toString(),
        });
        if (response.ok) {
          const result = await response.json();
          if (result.result === "Success") {
            phoneVerify(true);
          }
          console.log("Upload successful:", result);
        } else {
          console.error("Upload failed:", response.statusText);
          alert("کد نامعتبر می‌باشد");
        }
      } catch (error) {
        console.error("Error uploading data:", error);
        alert("خطا در ارسال کد، لطفا مجددا تلاش کنید");
      }
    } else {
      alert("لطفا کد ارسال شده را وارد کنید");
    }
  };

  return (
    <div className="xl:w-[45%] lg:w-[55%] md:w-[75%] sm:w-[70%] w-[80%] mx-auto bg-white rounded-lg shadow-xl flex flex-col items-center py-9 px-8 gap-8">
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
          type="number"
          onChange={getPhone}
          helperText={
            <Button
              onClick={sendCode}
              className="!bg-Primary !text-sm"
              variant="contained"
            >
              ارسال کد
            </Button>
          }
        />
        <TextField
          id="outlined-basic"
          label="کد را وارد کنید"
          variant="outlined"
          className="w-full"
          onChange={getCode}
          helperText={
            <Button
              onClick={CheckVerifyCodes}
              className="!bg-Primary !text-sm"
              variant="contained"
            >
              بررسی کد
            </Button>
          }
        />
      </MuiCustomThemeComponent>
      <div className="w-full flex flex-col items-center bg-gray-300 rounded-lg shadow-xl gap-2 p-5">
        <span className="text-gray-700 md:text-xl sm:text-base text-sm font-bold text-center">
          تصویری از فروشگاه خود آپلود کنید
        </span>
        <div className="w-full flex flex-col items-center gap-2">
          <label className="custom-file-upload cursor-pointer">
            <ImFolderPlus className="sm:text-4xl text-2xl text-Primary" />
            <input type="file" accept="*/*" onChange={handleFileChange} />
          </label>
          <img
            src={previewUrl}
            alt="Preview"
            className="w-[150px] h-[125px] rounded-2xl"
          />
        </div>
      </div>
      <div className="w-full flex flex-col items-center bg-gray-300 rounded-lg shadow-xl gap-2 p-5">
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
            <MdKeyboardVoice />
          </button>
          <button
            onClick={stopRecording}
            disabled={!isRecording}
            className="text-2xl text-Primary"
          >
            <FaRegStopCircle />
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
            onClick={uploadData}
            disabled={!audioUrl && !file}
            className="!bg-Primary md:!text-xl sm:!text-base !text-sm !font-bold !w-full !py-3"
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
