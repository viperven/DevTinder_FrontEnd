import React from "react";

function Test() {
  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const plan = "gold";
    let userId = "67614548987360f58828a3b1";

    const res = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const orderData = await fetch(
      "http://localhost:5000/payment/create-order",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 500, plan, userId }), // ₹500
      }
    ).then((res) => res.json());

    const options = {
      key: "rzp_test_78YORoOdnuaNHB",
      amount: orderData.amount,
      currency: orderData.currency,
      name: "My Test App",
      description: "Test Transaction",
      order_id: orderData.id,
      handler: function (response) {
        alert(
          "Payment successful! Payment ID: " + response.razorpay_payment_id
        );
      },
      prefill: {
        name: "Your Name",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    rzp.on("payment.failed", function (response) {
      alert("Payment failed: " + response.error.description);
      // Optional: send to backend to log failed attempts
      console.log("💥 Payment Failed", response.error);
    });
  };

  return (
    <div>
      <h2>Razorpay Test Checkout</h2>
      <button onClick={handlePayment}>Pay ₹500</button>
    </div>
  );
}

export default Test;
