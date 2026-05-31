"use client";
import { useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import jsPDF from "jspdf";

/* ---------------- PRICE DATA ---------------- */

const bedPrices = {
  "Solid Wood": 950,
  "Engineered Wood": 750,
  Metal: 650,
  Upholstered: 1100,
};

const mattressPrices = {
  Foam: 8000,
  "Memory Foam": 14000,
  Latex: 18000,
  Spring: 12000,
  Coir: 9000,
};

const sofaPrices = {
  Fabric: 8500,
  Leatherette: 12000,
  "Genuine Leather": 18000,
};

const curtainPrices = {
  Cotton: 120,
  Linen: 180,
  Polyester: 100,
  Velvet: 250,
  Blackout: 220,
  Sheer: 90,
};

/* ---------------- COMPONENT ---------------- */

export default function Estimator() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    product: "bed",
    length: "1",
    width: "1",
    material: "",
    mattress: "",
    color: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* ---------------- CALCULATION ---------------- */

  const subtotal = useMemo(() => {
    let amount = 0;
    const length = parseFloat(form.length) || 0;
    const width = parseFloat(form.width) || 0;

    if (form.product === "bed") {
      const area = length * width;
      const base = bedPrices[form.material] || 0;
      const mattress = mattressPrices[form.mattress] || 0;
      amount = area * base + mattress;
    }

    if (form.product === "sofa") {
      const perFt = sofaPrices[form.material] || 0;
      amount = length * perFt;
    }

    if (form.product === "curtain") {
      const area = length * width;
      const perSq = curtainPrices[form.material] || 0;
      amount = area * perSq;
    }

    return amount;
  }, [form]);

  const gstRate = 0.18;
  const gst = subtotal * gstRate;
  const total = subtotal + gst;

  /* ---------------- VALIDATION ---------------- */

  const validate = () => {
    const newErrors = {};

    // Name: at least 2 characters, letters and spaces only
    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    } else if (!/^[a-zA-Z\s]+$/.test(form.name.trim())) {
      newErrors.name = "Name should contain only letters and spaces.";
    }

    // Phone: exactly 10 digits
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(form.phone.trim())) {
      newErrors.phone = "Phone must be exactly 10 digits.";
    }

    // Address: required, at least 10 characters
    if (!form.address.trim()) {
      newErrors.address = "Address is required.";
    } else if (form.address.trim().length < 10) {
      newErrors.address =
        "Please enter a complete address (at least 10 characters).";
    }

    // Material: required
    if (!form.material) {
      newErrors.material = "Please select a material.";
    }

    // Mattress: required only for bed
    if (form.product === "bed" && !form.mattress) {
      newErrors.mattress = "Please select a mattress type.";
    }

    // Color: required
    if (!form.color) {
      newErrors.color = "Please select a color.";
    }

    return newErrors;
  };

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      // Reset dependent fields when product changes
      ...(name === "product" ? { material: "", mattress: "", color: "" } : {}),
    }));

    // Clear the error for this field as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // 🔹 Try adding logo (optional)
    try {
      doc.addImage("/YashLogo.jpeg", "JPEG", 150, 12, 40, 20);
    } catch (e) {
      console.log("Logo not added");
    }

    // 🔹 Border
    doc.rect(10, 10, 190, 270);

    // 🔹 Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Yash Home Decors", 20, 25);

    // 🔹 Line
    doc.setLineWidth(0.5);
    doc.line(20, 30, 190, 30);

    // 🔹 Content
    let y = 40;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    doc.text(`Name: ${form.name}`, 20, y);
    y += 10;
    doc.text(`Phone: ${form.phone}`, 20, y);
    y += 10;
    doc.text(`Address: ${form.address}`, 20, y);
    y += 10;
    doc.text(`Product: ${form.product}`, 20, y);
    y += 10;
    doc.text(`Material: ${form.material}`, 20, y);
    y += 10;

    if (form.product === "bed") {
      doc.text(`Mattress Type: ${form.mattress}`, 20, y);
      y += 10;
    }

    doc.text(`Color: ${form.color}`, 20, y);
    y += 15;

    // 🔹 Line before pricing
    doc.line(20, y, 190, y);
    y += 10;

    // 🔹 Pricing
    doc.setFont("helvetica", "bold");

    doc.text("Subtotal:", 120, y);
    doc.text(`${subtotal.toFixed(2)} Rs.`, 170, y, { align: "right" });
    y += 10;

    doc.text("GST (18%):", 120, y);
    doc.text(`${gst.toFixed(2)} Rs.`, 170, y, { align: "right" });
    y += 10;

    doc.setFontSize(14);
    doc.text("Total:", 120, y);
    doc.text(`${total.toFixed(2)} Rs.`, 170, y, { align: "right" });

    y += 15;

    // 🔹 Footer
    doc.setLineWidth(0.3);
    doc.line(20, y, 190, y);

    y += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("Thank you for choosing Yash Home Decors!", 20, y);

    // 🔹 Save PDF (THIS WILL DEFINITELY DOWNLOAD)
    doc.save("YashHomeDecors_Order.pdf");
  };

  const handleSubmit = async () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstErrorKey = Object.keys(validationErrors)[0];
      const el = document.getElementsByName(firstErrorKey)[0];
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.from("leads").insert([
        {
          name: form.name,
          phone: form.phone,
          address: form.address,
          product: form.product,
          configuration: form,
          subtotal,
          gst,
          total,
        },
      ]);

      if (error) throw error;

      generatePDF();
      alert("Order Placed Successfully!");

      // Reset form after successful submission
      setForm({
        name: "",
        phone: "",
        address: "",
        product: "bed",
        length: "1",
        width: "1",
        material: "",
        mattress: "",
        color: "",
      });
      setErrors({});
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <>
      <h2 className="flex justify-center text-[118px] font font-extrabold px-13">
        CUSTOMIZE YOUR ORDER.
      </h2>

      <div className="flex flex-col gap-[40px] px-13 py-10">
        {/* PERSONAL INFORMATION */}
        <div className="flex-1">
          <p className="text-xl font-bold mb-2">PERSONAL INFORMATION</p>
          <div className="border-3 rounded-xl px-5 py-4 flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label className="font-bold">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                placeholder="Enter Your Full Name"
                className={`border-2 rounded-lg px-3 py-2 w-full max-w-sm outline-none focus:border-black transition-colors ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1">
              <label className="font-bold">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                name="phone"
                value={form.phone}
                placeholder="Enter 10-digit WhatsApp Number"
                maxLength={10}
                className={`border-2 rounded-lg px-3 py-2 w-full max-w-sm outline-none focus:border-black transition-colors ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                onChange={(e) => {
                  // Allow only digits
                  const val = e.target.value.replace(/\D/g, "");
                  setForm((prev) => ({ ...prev, phone: val }));
                  if (errors.phone)
                    setErrors((prev) => ({ ...prev, phone: "" }));
                }}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>

            {/* Address */}
            <div className="flex flex-col gap-1">
              <label className="font-bold">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                value={form.address}
                placeholder="Enter your full address (House No, Street, City, Pincode)"
                rows={4}
                className={`border-2 rounded-lg px-3 py-2 w-full max-w-lg outline-none focus:border-black transition-colors resize-none ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
                onChange={handleChange}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* PRODUCT CONFIGURATION */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <label className="text-xl font-bold">
              CHOOSE YOUR PRODUCT TO STYLE:{" "}
              <span className="text-red-500">*</span>
            </label>
            <select
              name="product"
              value={form.product}
              className="border-2 rounded-lg px-2 py-1"
              onChange={handleChange}
            >
              <option value="bed">Bed</option>
              <option value="sofa">Sofa</option>
              <option value="curtain">Curtain</option>
            </select>
          </div>

          <div className="border-3 rounded-xl px-5 py-4 flex flex-col gap-4">
            {/* Length */}
            <div className="flex flex-col gap-1">
              <label className="font-bold">
                Length (ft) <span className="text-red-500">*</span>
              </label>
              <select
                name="length"
                value={form.length}
                className="border-2 rounded-lg px-2 py-1 w-fit"
                onChange={handleChange}
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* Width */}
            <div className="flex flex-col gap-1">
              <label className="font-bold">
                Width (ft) <span className="text-red-500">*</span>
              </label>
              <select
                name="width"
                value={form.width}
                className="border-2 rounded-lg px-2 py-1 w-fit"
                onChange={handleChange}
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* Material */}
            <div className="flex flex-col gap-1">
              <label className="font-bold">
                Select Your Material <span className="text-red-500">*</span>
              </label>
              <select
                name="material"
                value={form.material}
                className={`border-2 rounded-lg px-2 py-1 w-fit ${
                  errors.material ? "border-red-500" : "border-gray-300"
                }`}
                onChange={handleChange}
              >
                <option value="">Select Material</option>
                {form.product === "bed" &&
                  Object.keys(bedPrices).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                {form.product === "sofa" &&
                  Object.keys(sofaPrices).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                {form.product === "curtain" &&
                  Object.keys(curtainPrices).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
              {errors.material && (
                <p className="text-red-500 text-sm">{errors.material}</p>
              )}
            </div>

            {/* Mattress — only for bed */}
            {form.product === "bed" && (
              <div className="flex flex-col gap-1">
                <label className="font-bold">
                  Select Your Mattress <span className="text-red-500">*</span>
                </label>
                <select
                  name="mattress"
                  value={form.mattress}
                  className={`border-2 rounded-lg px-2 py-1 w-fit ${
                    errors.mattress ? "border-red-500" : "border-gray-300"
                  }`}
                  onChange={handleChange}
                >
                  <option value="">Select Mattress</option>
                  {Object.keys(mattressPrices).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {errors.mattress && (
                  <p className="text-red-500 text-sm">{errors.mattress}</p>
                )}
              </div>
            )}

            {/* Color */}
            <div className="flex flex-col gap-1">
              <label className="font-bold">
                Select Your Color <span className="text-red-500">*</span>
              </label>
              <select
                name="color"
                value={form.color}
                className={`border-2 rounded-lg px-2 py-1 w-fit ${
                  errors.color ? "border-red-500" : "border-gray-300"
                }`}
                onChange={handleChange}
              >
                <option value="">Select Color</option>
                <option value="white">White</option>
                <option value="beige">Beige</option>
                <option value="lightgrey">Light Grey</option>
                <option value="darkgrey">Dark Grey</option>
                <option value="brown">Brown</option>
                <option value="olivegreen">Olive Green</option>
                <option value="navyblue">Navy Blue</option>
                <option value="maroon">Maroon</option>
                <option value="mustard">Mustard</option>
              </select>
              {errors.color && (
                <p className="text-red-500 text-sm">{errors.color}</p>
              )}
            </div>
          </div>
        </div>

        {/* LIVE ESTIMATE */}
        <div className="flex flex-col flex-1 bg-[#f4f4f4] p-5 rounded-2xl border-3 border-black">
          <h2 className="flex justify-center items-center font-extrabold text-2xl border-b-2 border-black pb-2">
            LIVE ESTIMATE
          </h2>
          <div className="flex flex-col py-5 gap-2">
            <p>Name: {form.name}</p>
            <p>Phone: {form.phone}</p>
            <p>Address: {form.address}</p>
            <p>Product: {form.product}</p>
            <p>Length: {form.length} Feet</p>
            <p>Width: {form.width} Feet</p>
            <p>Material: {form.material || "—"}</p>
            {form.product === "bed" && <p>Mattress: {form.mattress || "—"}</p>}
            <p>Color: {form.color || "—"}</p>
            <hr className="border-gray-300 my-1" />
            <p>Subtotal: ₹ {subtotal.toFixed(2)}</p>
            <p>GST (18%): ₹ {gst.toFixed(2)}</p>
            <h3 className="font-bold text-lg">Total: ₹ {total.toFixed(2)}</h3>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="cursor-pointer w-full bg-black px-5 py-3 rounded-3xl text-[#ededed] text-lg font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-60"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </>
  );
}
