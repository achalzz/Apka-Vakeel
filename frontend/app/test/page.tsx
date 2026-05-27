"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function TestPage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/")
      .then((res) => {
        setMessage(res.data.project);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        {message}
      </h1>
    </div>
  );
}