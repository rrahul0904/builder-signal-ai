"use client";

import { FormEvent, useState } from "react";
import { ArrowRight } from "./Icons";

export function SponsorForm() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch("/api/sponsor-leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not submit request");
      setState("success");
      setMessage("Request received. We’ll follow up using the email you provided.");
      formElement.reset();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Could not submit request");
    }
  }

  return <form className="leadForm" onSubmit={onSubmit}>
    <div className="fieldRow">
      <label>Name<input name="name" required maxLength={120} /></label>
      <label>Work email<input name="email" type="email" required maxLength={254} /></label>
    </div>
    <label>Company<input name="company" required maxLength={160} /></label>
    <label>What are you hoping to promote?<textarea name="message" required maxLength={2000} rows={5} /></label>
    <button className="button" disabled={state === "loading"}>
      {state === "loading" ? "Sending…" : <><span>Request media kit</span><ArrowRight /></>}
    </button>
    {message && <div className={state === "error" ? "formMessage error" : "formMessage success"}>{message}</div>}
  </form>;
}
