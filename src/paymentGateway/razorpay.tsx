import React, { useState, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import axios from "axios";
import toast from "react-hot-toast";
import { API_BASE_URL } from "@/main";
//import Razorpay from "razorpay";


interface Props {
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

interface payload {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  couponCode?: string;
  userMailId: string;
}

const PaymentPopup: React.FC<Props> = ({ showPopup, setShowPopup }) => {
  const [coupon, setCoupon] = useState<string>("");
  const [amount, setAmount] = useState<number>(89);
  const [isCouponValid, setCouponValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const checkOutHandler = async () => {
    try {
      setLoading(true);
      const orderRes = await axios.post(
        `${API_BASE_URL}/cv/checkout`,
        { amount: amount * 100 }, // Send amount in paise
        { headers: { 
          "Content-Type": "application/json",
        } }
      );

      if (orderRes.data.success) {
        const options = {
          key: import.meta.env.VITE_Rz_Key,
          amount: amount* 100,
          currency: "INR",
          name: "Edubuk (Eduprovince Technologies Private Limited)",
          description: "Order-123",
          order_id: orderRes.data.order.id,
          handler: async (response: {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
          }) => {
            try {
              const payload: payload = {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                userMailId: sessionStorage.getItem("userMailId")!,
              };

              // Add coupon code to payload if it exists
              if (coupon) {
                payload.couponCode = coupon;
              }

              const res = await axios.post(
                `${API_BASE_URL}/cv/payment_verification`,
                payload,
                { headers: { "Content-Type": "application/json" } }
              );

              if (res.data.success) {
                toast.success("Payment successful.");
                setShowPopup(false);
                setLoading(false);
                localStorage.setItem("paymentId", res.data.paymentId);
              } else {
                toast.error("Payment verification failed.");
                setLoading(false);
              }
            } catch (error) {
              console.error("Error during payment verification:", error);
              toast.error("Something went wrong.");
              setLoading(false);
            }
          },
          theme: { color: "#006666" },
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      } else {
        console.error("Order creation failed.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Error during checkout:", err);
      setLoading(false);
    }
  };

  const verifyCoupon = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/cv/coupon_verify/${coupon}`
      );
      if (res.data.success) {
        console.log("coupon log", res);
        setAmount(res.data.value);
        setCouponValid(true);
      } else {
        setAmount(res.data.value);
      }
    } catch (error) {
      console.log("error while coupon verification");
    }
  };

  useEffect(() => {
    // Dynamically add Razorpay script to the document
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    // Clean up script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 h-full w-full">
          <div className="relative w-11/12 max-w-3xl bg-white rounded-lg shadow-lg">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setShowPopup(false)}
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 p-4 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-200">
                <img
                  src="/animatedResume.jpg"
                  alt="Resume Animation"
                  className="w-80 h-80 object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 p-6">
                {isCouponValid ? (
                  <h2 className="text-xl font-semibold mb-4 animate-bounce">
                    Hurrey! You got an amazing discount 🎉
                  </h2>
                ) : (
                  <h2 className="text-xl font-semibold mb-4">
                    Enter coupon code and get an amazing discount
                  </h2>
                )}
                <div className="relative">
                  {isCouponValid && <ConfettiExplosion zIndex={60} />}
                  <div className="flex justify-between gap-2">
                    <input
                      type="text"
                      onChange={(e) => setCoupon(e.target.value)}
                      value={coupon}
                      placeholder="Enter Coupon Code"
                      className="w-full px-4 py-2 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      className="px-4 py-2 mb-6 bg-[#006666] text-[white] rounded active:translate-y-1 cursor-pointer"
                      onClick={verifyCoupon}
                    >
                      Apply
                    </button>
                  </div>
                  {coupon?.length > 0 && amount === 499 && (
                    <p className="absolute text-[red] bottom-[0.01rem]">
                      code is invalid
                    </p>
                  )}
                  {isCouponValid && (
                    <p className="absolute text-[#ff6a00] bottom-[0.01rem]">
                      valid till 28 Feb 2025
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <p className="text-xl">
                    <strong>₹</strong>
                    {isCouponValid ? (
                      <strong className="text-[#006666]">
                        <del>499</del> 89
                      </strong>
                    ) : (
                      <strong className="text-[#006666]">499</strong>
                    )}{" "}
                    Only
                  </p>
                  {!loading?<button
                    className="rounded-lg bg-[#007bff] py-2 px-4 text-white cursor-pointer active:translate-y-1"
                    onClick={checkOutHandler}
                  >
                    Pay Now To Submit CV
                  </button>:<p>payment processing...</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentPopup;
