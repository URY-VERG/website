export function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function openRazorpayCheckout({
  key,
  amountInPaise,
  name,
  description,
  prefill,
  onSuccess,
  onFailure,
}) {
  const ok = await loadRazorpayScript();
  if (!ok || !window.Razorpay) {
    onFailure?.(new Error("Razorpay could not be loaded"));
    return;
  }

  const rz = new window.Razorpay({
    key,
    amount: Math.max(1, Math.floor(amountInPaise)),
    currency: "INR",
    name,
    description,
    prefill,
    handler: function (response) {
      onSuccess?.(response);
    },
    modal: {
      ondismiss: function () {
        onFailure?.(new Error("Payment cancelled"));
      },
    },
  });

  rz.open();
}

