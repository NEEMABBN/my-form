import StoreRegistration from "./Pages/PageOne/StoreRegistration";
import FinalRegistration from "./Pages/PageThree/FinalRegistration";
import AdditionalInformation from "./Pages/PageTwo/AdditionalInformation";

const router = [
  {
    path: "/",
    element: <StoreRegistration />,
  },
  {
    path: "/Step-Two",
    element: <AdditionalInformation />,
  },
  {
    path: "/Last-Step",
    element: <FinalRegistration />,
  },
];

export default router;
