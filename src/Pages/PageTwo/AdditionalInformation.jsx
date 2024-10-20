import React, { useContext, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { ContactContext } from "../../Components/ContactContext";
import CryptoJS from "crypto-js";

export default function AdditionalInformation() {
  const { managerPhone } = useContext(ContactContext);
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [adsPrice, setAdsPrice] = useState("");
  const [adsChannel, setAdsChannel] = useState("");
  const [shopHistory, setShopHistory] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [adsResult, setAdsResult] = useState(false);
  const navigate = useNavigate();

  const handleChangeCheckBox = (e) => {
    setAdsResult(e.target.checked);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNonce = nonceCode();
    const data = {
      SiteURL: website,
      PageUsername: instagram,
      AdsPrice: adsPrice,
      AdsResult: adsResult,
      AdsChannel: adsChannel,
      ShopHistory: shopHistory,
      PropertyType: propertyType,
      ManagerPhone: managerPhone,
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
        navigate("/Last-Step");
      } else {
        console.error("Upload failed:", response.statusText);
        alert("ارسال داده‌ها با خطا مواجه شد.");
      }
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("خطا در ارسال داده‌ها. لطفاً دوباره تلاش کنید.");
    }
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
              label="سابقه تبلیغات"
              variant="outlined"
              type="number"
              className="w-full"
              value={adsPrice}
              onChange={(e) => setAdsPrice(e.target.value)}
              helperText={
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={adsResult}
                      onChange={handleChangeCheckBox}
                    />
                  }
                  label="نتیجه‌ایی داشته؟"
                />
              }
            />
            <TextField
              id="outlined-basic"
              label="سابقه آگهی برای نیرو"
              variant="outlined"
              className="w-full"
              value={adsChannel}
              onChange={(e) => setAdsChannel(e.target.value)}
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
              value={shopHistory}
              onChange={(e) => setShopHistory(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">نوع ملک</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={propertyType}
                label="نوع ملک"
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <MenuItem value={1}>ملکی</MenuItem>
                <MenuItem value={2}>استیجاری</MenuItem>
              </Select>
            </FormControl>
          </MuiCustomThemeComponent>
        </div>
      </div>
      <Button
        onClick={handleSubmit}
        className="!bg-Primary md:!w-[40%] md:!text-xl sm:!text-base !text-sm !font-bold !w-full !py-3"
        variant="contained"
      >
        تایید و ارسال
      </Button>
    </div>
  );
}
