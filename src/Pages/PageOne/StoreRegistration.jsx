import React from "react";
import MuiCustomThemeComponent from "../../Components/MuiCostumTheme";
import { Autocomplete, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function StoreRegistration() {
  return (
    <div className="w-[80%] bg-white mx-auto flex flex-col items-center gap-7 py-9 rounded-2xl shadow-xl">
      <h1 className="md:text-3xl sm:text-2xl text-lg font-bold text-Primary">
        ثبت فروشگاه
      </h1>
      <p className="sm:text-base text-sm text-gray-600 text-center">
        فرصت فروش بیشتر در بین میلیون‌ها مشتری:)
      </p>
      <div className="w-full flex flex-col items-center px-10 md:gap-10 gap-5">
        <div className="w-full flex md:flex-row flex-col items-center md:justify-between justify-normal md:gap-10 gap-5">
          <MuiCustomThemeComponent>
            <TextField
              id="outlined-basic"
              label="نام فروشگاه"
              className="!w-full"
              variant="outlined"
              InputProps={{ sx: { borderRadius: 4 } }}
              InputLabelProps={{ className: "sm:!text-base !text-sm" }}
            />
            <TextField
              id="outlined-basic"
              label="نام مدیر"
              variant="outlined"
              className="w-full"
              InputProps={{ sx: { borderRadius: 4 } }}
              InputLabelProps={{ className: "sm:!text-base !text-sm" }}
            />
          </MuiCustomThemeComponent>
        </div>
        <div className="w-full flex md:flex-row flex-col items-center md:justify-between justify-normal md:gap-10 gap-5">
          <MuiCustomThemeComponent>
            <TextField
              id="outlined-basic"
              label="حوزه کاری"
              variant="outlined"
              className="w-full"
              InputProps={{ sx: { borderRadius: 4 } }}
              InputLabelProps={{ className: "sm:!text-base !text-sm" }}
            />
            <TextField
              id="outlined-basic"
              label="شماره همراه"
              variant="outlined"
              className="w-full"
              InputProps={{ sx: { borderRadius: 4 } }}
              InputLabelProps={{ className: "sm:!text-base !text-sm" }}
            />
          </MuiCustomThemeComponent>
        </div>
        <MuiCustomThemeComponent>
          <TextField
            id="outlined-basic"
            label="آدرس"
            variant="outlined"
            className="w-full"
            InputProps={{ sx: { borderRadius: 4 } }}
            InputLabelProps={{ className: "sm:!text-base !text-sm" }}
          />
        </MuiCustomThemeComponent>
      </div>
      <Link
        to="/Step-Two"
        className="md:w-[40%] md:p-0 px-10 w-full flex items-center justify-center"
      >
        <Button
          className="!bg-Primary !rounded-2xl md:!text-xl sm:!text-base !text-sm !font-bold !w-full !py-3"
          variant="contained"
        >
          تایید و ارسال
        </Button>
      </Link>
    </div>
  );
}
