

import React, { useState } from "react";

const Enquiry = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://mern-portfolio-4-buph.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Server error");

      alert("We Will Connect With You Within 2–3 Business Days");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("⚠️ Error connecting to server!");
    }
  };

  return (
    <section className="bg-[#F7F7F7] py-16 px-4 sm:px-6 md:px-10 flex justify-center">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
        <h2 className="text-3xl sm:text-4xl font-a6 text-[#101010] mb-10 text-center leading-tight">
          Let’s start the conversation
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-a5">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name*"
            className="border-b-2 border-gray-300 bg-transparent py-3 text-[15px] sm:text-[16px]
            focus:outline-none focus:border-[#FFD03D] placeholder-gray-400"
            required
          />

          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone*"
            className="border-b-2 border-gray-300 bg-transparent py-3 text-[15px] sm:text-[16px]
            focus:outline-none focus:border-[#FFD03D] placeholder-gray-400"
            required
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email*"
            className="border-b-2 border-gray-300 bg-transparent py-3 text-[15px] sm:text-[16px]
            focus:outline-none focus:border-[#FFD03D] placeholder-gray-400"
            required
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            placeholder="How can I help you?"
            className="border-b-2 border-gray-300 bg-transparent py-3 text-[15px] sm:text-[16px]
            focus:outline-none focus:border-[#FFD03D] placeholder-gray-400 resize-none"
            required
          ></textarea>

          <button
            type="submit"
            className="bg-[#101010] text-white font-semibold py-4 rounded-xl 
            hover:bg-[#333333] transition text-[16px] sm:text-[17px]"
          >
            Discuss the Project
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-8">
          We'll get back to you within 1–2 business days.
        </p>
      </div>
    </section>
  );
};

export default Enquiry;
