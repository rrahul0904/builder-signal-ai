"use client";
import { FormEvent, useState } from "react";
import { ArrowRight } from "./Icons";

export function SubscribeForm({ source = "site", compact = false }: { source?: string; compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    try {
      const response = await fetch("/api/subscribe", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, source }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not subscribe");
      setState("success"); setMessage("You’re on the list. Next signal lands soon."); setEmail("");
    } catch (error) { setState("error"); setMessage(error instanceof Error ? error.message : "Could not subscribe"); }
  }

  return <div className={compact ? "subscribeBox compact" : "subscribeBox"} id="subscribe">
    {!compact && <><span className="eyebrow">The builder briefing</span><h2>One email. The AI changes worth your attention.</h2><p>Agent infrastructure, coding systems, RAG, protocols and open models—curated for people who ship.</p></>}
    <form className="subscribeForm" onSubmit={onSubmit}>
      <label className="srOnly" htmlFor={`email-${source}`}>Work email</label>
      <input id={`email-${source}`} type="email" required placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button className="button" disabled={state === "loading"}>{state === "loading" ? "Joining…" : <><span>Join free</span><ArrowRight /></>}</button>
    </form>
    {message && <div className={state === "error" ? "formMessage error" : "formMessage success"}>{message}</div>}
    {!compact && <small>No noise. Unsubscribe anytime.</small>}
  </div>;
}
