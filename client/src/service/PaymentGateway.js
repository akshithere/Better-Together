import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function displayRazorpay(money) {
  const data = await Axios.post(
    `${import.meta.env.VITE_API_URL}/payment/razorpay`,
    { amount: money },
  );

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    currency: data.currency,
    amount: data.data.amount,
    name: "BetterTogether",
    description: "A hub for NGOs",
    order_id: data.id,
    handler: function () {
      toast("ThankYou for the support.", {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        closeButton: false,
      });
    },
    prefill: {
      name: "Akshit",
      email: "narbhakshit@gmail.com",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
