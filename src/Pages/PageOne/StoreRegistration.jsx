import React, { useEffect, useState } from "react";
import MuiCustomThemeComponent from "../../Components/MuiCostumTheme";
import { Autocomplete, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useContact } from "../../Components/ContactContext";

export default function StoreRegistration() {
  const { setPhone } = useContact();
  const [phoneInput, setPhoneInput] = useState("");
  const [storeName, setStoreName] = useState("");
  const [manager, setManager] = useState("");
  const [workArea, setWorkArea] = useState("");
  const [address, setAddress] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [names, setNames] = useState([]);
  const navigate = useNavigate();

  const isFormValid = () => {
    return phoneInput && storeName && manager && inputValue && address;
  };

  const apiUrl = "https://api.example.com/names"; //get API for WorkArea

  useEffect(() => {
    const fetchNames = async () => {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setNames(data);
    };
    fetchNames();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setPhone(phoneInput);
      const data = {
        managerName: manager,
        storeName: storeName,
        phone: phoneInput,
        work: inputValue,
        address: address,
      };
      try {
        const response = await fetch("YOUR_SERVER_ENDPOINT", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
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
          <MuiCustomThemeComponent>
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
          </MuiCustomThemeComponent>
        </div>
        <div className="w-full flex md:flex-row flex-col items-center md:justify-between justify-normal md:gap-10 gap-5">
          <MuiCustomThemeComponent>
            <Autocomplete
              disablePortal
              options={names}
              getOptionLabel={(option) => option}
              value={inputValue}
              onChange={(event, newValue) => {
                setInputValue(newValue);
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
          </MuiCustomThemeComponent>
        </div>
        <MuiCustomThemeComponent>
          <TextField
            id="outlined-basic"
            label="آدرس"
            variant="outlined"
            className="w-full"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </MuiCustomThemeComponent>
      </div>
      <Button
        onSubmit={handleSubmit}
        disabled={!isFormValid()}
        className="!bg-Primary md:!w-[40%] md:!text-xl sm:!text-base !text-sm !font-bold !w-full !py-3"
        variant="contained"
      >
        تایید و ارسال
      </Button>
    </div>
  );
}
