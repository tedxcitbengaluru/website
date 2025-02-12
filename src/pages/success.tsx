"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  
  type SuccessSource = "join" | "ticket" | "default";
  const source = (searchParams.get("source") as SuccessSource) || "default";

  useEffect(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;

    const defaultConfetti = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    };

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      defaultConfetti();
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const pageContent: Record<SuccessSource, { title: string; message: string }> = {
    join: {
      title: "Thank You!",
      message: "Thank you for filling out the recruitment form. We appreciate your interest in joining our team!",
    },
    ticket: {
      title: "Success!",
      message: "Thank you for purchasing your ticket. An email will be sent shortly after the verification. We look forward to seeing you at the event!",
    },
    default: {
      title: "Thank You!",
      message: "Your submission was successful!",
    },
  };

  const { title, message } = pageContent[source];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-ted-black text-ted-light-gray p-4 mt-8">
      <motion.div
        className="bg-ted-dark-gray rounded-lg shadow-lg p-8 max-w-xl w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <h1 className="text-4xl font-bold text-center text-ted-off-white mb-4">
          {title}
        </h1>
        <p className="text-lg text-center mb-4 text-ted-off-white">
          {message}
        </p>
        <hr className="my-4 border-ted-light-gray" />
        <p className="text-center mb-4">
          If you have any further questions or need assistance, please reach out to:
        </p>
        <ul className="list-none text-center space-y-2 mb-4">
          <li><strong>Aaron Rohan</strong>: +91 86606 89239</li>
          <li><strong>Prajna</strong>: +91 84316 48642</li>
        </ul>
        <p className="text-center">
          Or feel free to send us an email at{" "}
          <a
            href="mailto:tedxcitbengaluru@cambridge.edu.in"
            className="text-ted-red underline"
          >
            tedxcitbengaluru@cambridge.edu.in
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
