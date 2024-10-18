import axios from "axios";

const AxiosBaseURL = axios.create({
  baseURL: "https://brgb.ir/present.php",
});

export default AxiosBaseURL;
