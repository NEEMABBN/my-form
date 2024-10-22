import React, { useContext, useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ContactContext } from "../../Components/ContactContext";
import CryptoJS from "crypto-js";

export default function StoreRegistration() {
  const { setManagerPhone } = useContext(ContactContext);
  const [phoneInput, setPhoneInput] = useState("");
  const [storeName, setStoreName] = useState("");
  const [manager, setManager] = useState("");
  const [address, setAddress] = useState("");
  const [jobsData, setJobsData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [test, setTest] = useState("");
  const navigate = useNavigate();

  const isFormValid = () => {
    return phoneInput && storeName && manager && address && test;
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

  useEffect(() => {
    fetch("/JobsData/Gl4B_shop_type.json")
      .then((response) => response.json())
      .then((data) => setJobsData(data))
      .catch((error) => console.error("Error fetching data : ", error));
  }, []);

  const getOptionLabel = (option) => {
    return option.label ? option.label : "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      const newNonce = nonceCode();
      setManagerPhone(phoneInput);
      const data = {
        ManagerName: manager,
        ShopName: storeName,
        ManagerPhone: phoneInput,
        ShopType: test,
        ShopAddress: address,
        brgb_nonce_visitor_input: newNonce,
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
          navigate("/Step-Two");
        } else {
          console.error("Upload failed:", response.statusText);
          alert("ارسال داده‌ها با خطا مواجه شد.");
        }
      } catch (error) {
        console.error("Error uploading data:", error);
        alert("خطا در ارسال داده‌ها. لطفاً دوباره تلاش کنید.");
      }
    } else {
      alert("لطفاً همه فیلدهای اجباری را پر کنید.");
    }
  };

  return (
    <div className="w-[80%] bg-white mx-auto flex flex-col items-center gap-7 py-9 px-8 rounded-lg shadow-xl">
      <h1 className="md:text-3xl sm:text-2xl text-lg font-bold text-Primary">
        ثبت فروشگاه
      </h1>
      <p className="sm:text-base text-sm text-gray-600 text-center">
        فرصت فروش بیشتر در بین میلیون‌ها مشتری:)
      </p>
      <div className="w-full flex flex-col items-center md:gap-10 gap-5">
        <div className="w-full flex md:flex-row flex-col items-center md:justify-between justify-normal md:gap-10 gap-5">
          <TextField
            id="outlined-basic"
            label="نام فروشگاه"
            className="!w-full"
            variant="outlined"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            required
          />
          <TextField
            id="outlined-basic"
            label="نام مدیر"
            variant="outlined"
            className="w-full"
            value={manager}
            onChange={(e) => setManager(e.target.value)}
            required
          />
        </div>
        <div className="w-full flex md:flex-row flex-col items-center md:justify-between justify-normal md:gap-10 gap-5">
          <Autocomplete
            disablePortal
            options={jobsData}
            getOptionLabel={getOptionLabel}
            onChange={(event, newValue) => {
              setTest(
                typeof newValue === "string"
                  ? newValue
                  : getOptionLabel(newValue.value)
              );
              setTest(newValue.value);
            }}
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="حوزه کاری"
                variant="outlined"
                onChange={(e) => setInputValue(e.target.value)}
                required
              />
            )}
            freeSolo
          />
          <TextField
            id="outlined-basic"
            label="شماره همراه"
            variant="outlined"
            type="number"
            className="w-full"
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
            required
          />
        </div>
        <TextField
          id="outlined-basic"
          label="آدرس"
          variant="outlined"
          className="w-full"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <Button
        onClick={handleSubmit}
        disabled={!isFormValid()}
        className="!bg-Primary md:!w-[40%] md:!text-xl sm:!text-base !text-sm !font-bold !w-full !py-3"
        variant="contained"
      >
        تایید و ارسال
      </Button>
    </div>
  );
}
