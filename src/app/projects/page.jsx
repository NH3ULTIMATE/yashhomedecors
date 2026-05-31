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
    length: "",
    width: "",
    material: "",
    mattress: "",
    color: "",
  });

  const [loading, setLoading] = useState(false);

  /* ---------------- CALCULATION (OPTIMAL WAY) ---------------- */

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

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Yash Home Decors", 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${form.name}`, 20, 35);
    doc.text(`Phone: ${form.phone}`, 20, 45);
    doc.text(`Product: ${form.product}`, 20, 55);
    if (form.product === "bed") {
      doc.text(`Material: ${form.material}`, 20, 65);
      doc.text(`Mattress Type: ${form.mattress}`, 20, 75);
    } else {
      doc.text(`Material: ${form.material}`, 20, 65);
    }
    doc.text(`Subtotal: ${subtotal.toFixed(2)} Rs.`, 20, 105);
    doc.text(`GST (18%): ${gst.toFixed(2)} Rs.`, 20, 115);
    doc.text(`Total: ${total.toFixed(2)} Rs.`, 20, 125);

    doc.save("YashHomeDecors_Order.pdf");
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone) {
      alert("Please fill required details.");
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
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
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
      <div className="flex flex-col gap-[40px] px-13 py-10 ">
        {/* LEFT SIDE FORM */}
        <div className="flex-1">
          {/* PERSONAL INFORMATION */}
          <p className="text-xl font-bold">PERSONAL INFORMATION</p>
          <div className="border-3 rounded-xl px-5 py-2">
            <label name="name" className="font-bold">
              Name
            </label>
            <br />
            <input
              name="name"
              placeholder="Enter Your Name"
              className="border-2 rounded-lg px-2"
              onChange={handleChange}
            />
            <br />
            <br />
            <label name="phone" className="font-bold">
              Phone
            </label>
            <br />
            <input
              name="phone"
              placeholder="Enter WhatsApp Number"
              className="border-2 rounded-lg  px-2"
              onChange={handleChange}
            />
            <br />
            <br />
            <label name="address" className="font-bold">
              Address
            </label>
            <br />
            <input
              name="address"
              placeholder="Enter Your Address"
              className="border-2 rounded-lg  px-2"
              onChange={handleChange}
            />
            <br />
          </div>
          {/* STYLE YOUR PRODUCTS */}
          <br />
          <label name="product" className=" text-xl font-bold">
            CHOOSE YOUR PRODUCT TO STYLE:<span> </span>
          </label>
          <select
            name="product"
            className="border-2 rounded-lg px-2 mb-1"
            onChange={handleChange}
          >
            <option value="bed">Bed</option>
            <option value="sofa">Sofa</option>
            <option value="curtain">Curtain</option>
          </select>
          <div className=" border-3 rounded-xl px-5 py-2">
            <label name="length" className="font-bold">
              Length (ft)
            </label>
            <br />

            <select
              name="length"
              className="border-2 rounded-lg px-2"
              onChange={handleChange}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <br />
            <br />
            <label name="width" className="font-bold">
              Width (ft)
            </label>
            <br />
            <select
              name="width"
              className="border-2 rounded-lg px-2"
              onChange={handleChange}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <br />
            <br />
            <label name="material" className="font-bold">
              Select Your Material
            </label>
            <br />
            <select
              name="material"
              className="border-2 rounded-lg  px-2"
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
            <br />
            <br />

            {form.product === "bed" && (
              <>
                <label name="mattress" className="font-bold">
                  Select Your Mattress
                </label>
                <br />
                <select
                  name="mattress"
                  className="border-2 rounded-lg  px-2"
                  onChange={handleChange}
                >
                  <option value="">Select Mattress</option>
                  {Object.keys(mattressPrices).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <br />
                <br />
              </>
            )}

            {form.product === "bed" ? (
              <>
                <div className="grid-cols-5"></div>
              </>
            ) : (
              <></>
            )}
            <label name="Color" className="font-bold">
              Select Your Color
            </label>
            <br />
            <select
              name="color"
              placeholder="Color Preference"
              className="border-2 rounded-lg  px-2"
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
            <br />
          </div>
          <br />
        </div>

        {/* RIGHT SIDE ESTIMATE */}
        <div className="flex flex-col flex-1 bg-[#f4f4f4] p-5 rounded-2xl border-3 border-black ">
          <h2 className=" flex justify-center items-center font-extrabold text-2xl border-b-2 border-black  ">
            LIVE ESTIMATE
          </h2>
          <div className=" flex flex-col py-5 gap-2">
            <p>Name: {form.name}</p>
            <p>Phone: {form.phone}</p>
            <p>Address: {form.address}</p>
            <p>Length : {form.length} Feet</p>
            <p>Width : {form.width} Feet</p>
            <p>Subtotal: ₹ {subtotal.toFixed(2)}</p>
            <p>GST (18%): ₹ {gst.toFixed(2)}</p>
            <h3>Total: ₹ {total.toFixed(2)}</h3>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="cursor-pointer w-full bg-black px-5 py-2 rounded-3xl text-[#ededed]"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </>
  );
}
