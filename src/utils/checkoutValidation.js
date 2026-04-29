export function validateCheckout(form) {
  const errors = {};

  const name = String(form?.name ?? "").trim();
  const mobile = String(form?.mobile ?? "").trim();
  const address = String(form?.address ?? "").trim();
  const city = String(form?.city ?? "").trim();
  const pincode = String(form?.pincode ?? "").trim();

  if (name.length < 2) errors.name = "Enter your full name.";

  // Accept 10-digit Indian mobile numbers; allow +91 prefix and spaces
  const normalizedMobile = mobile.replace(/\s+/g, "");
  const mobileDigits = normalizedMobile.replace(/^\+?91/, "");
  if (!/^\d{10}$/.test(mobileDigits)) errors.mobile = "Enter a valid 10-digit mobile number.";

  if (address.length < 10) errors.address = "Enter a complete address (house, road, landmark).";
  if (city.length < 2) errors.city = "Enter your city / village.";

  if (!/^\d{6}$/.test(pincode)) errors.pincode = "Enter a valid 6-digit pincode.";

  return { ok: Object.keys(errors).length === 0, errors };
}

