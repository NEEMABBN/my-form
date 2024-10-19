import React, { useState } from "react";
import MuiCustomThemeComponent from "../../Components/MuiCostumTheme";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useContact } from "../../Components/ContactContext";

export default function AdditionalInformation() {
  const { phone } = useContact();
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      phone,
      website,
      instagram,
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
        navigate("/success");
      } else {
        console.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  const [owner, setOwner] = useState("");
  const handleOwnerCountry = (event) => {
    setOwner(event.target.value);
  };

  return (
    <div className="w-[80%] bg-white mx-auto flex flex-col items-center gap-7 py-9 px-8 rounded-lg shadow-xl">
      <h1 className="md:text-3xl sm:text-2xl text-lg font-bold text-Primary">
        اطلاعات تکمیلی
      </h1>
      <p className="sm:text-base text-sm text-gray-600 text-center">
        فرصت فروش بیشتر در بین میلیون‌ها مشتری:)
      </p>
      <div className="w-full flex flex-col items-center md:gap-10 gap-5">
        <div className="w-full flex md:flex-row flex-col items-center md:justify-between justify-normal md:gap-10 gap-5">
          <MuiCustomThemeComponent>
            <TextField
              id="outlined-basic"
              label="آدرس سایت"
              className="!w-full"
              variant="outlined"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="پیج اینستاگرام"
              variant="outlined"
              className="w-full"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </MuiCustomThemeComponent>
        </div>

        <div className="w-full flex md:flex-row flex-col items-center md:justify-between justify-normal md:gap-10 gap-5">
          <MuiCustomThemeComponent>
            <TextField
              id="outlined-basic"
              label="سابقه کاری"
              type="number"
              className="!w-full"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="سابقه آگهی برای نیرو"
              variant="outlined"
              className="w-full"
            />
          </MuiCustomThemeComponent>
        </div>

        <div className="w-full flex md:flex-row flex-col items-center md:justify-between justify-normal md:gap-10 gap-5">
          <MuiCustomThemeComponent>
            <TextField
              id="outlined-basic"
              label="سابقه تبلیغات"
              variant="outlined"
              className="w-full"
              helperText={
                <FormControlLabel
                  control={<Checkbox />}
                  label="نتیجه‌ایی داشته؟"
                />
              }
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">نوع ملک</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={owner}
                label="نوع ملک"
                onChange={handleOwnerCountry}
              >
                <MenuItem value={1}>ملکی</MenuItem>
                <MenuItem value={2}>استیجاری</MenuItem>
              </Select>
            </FormControl>
          </MuiCustomThemeComponent>
        </div>
      </div>
      <Link to="/Last-Step" className="w-full flex items-center justify-center">
        <Button
          onSubmit={handleSubmit}
          className="!bg-Primary md:!w-[40%] md:!text-xl sm:!text-base !text-sm !font-bold !w-full !py-3"
          variant="contained"
        >
          تایید و ارسال
        </Button>
      </Link>
    </div>
  );
}
