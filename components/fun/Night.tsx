"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { unlock } from "./achievements";
import { sfx } from "./sound";

function istHour() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })).getHours();
}
const forced = () => typeof window !== "undefined" && new URLSearchParams(window.location.search).has("night");

/** After sunset (India time) the paper warms up, like reading by a lamp. */
export function DayNight() {
  useEffect(() => {
    const apply = () => { const h = istHour(); document.documentElement.classList.toggle("dusk", forced() || h >= 19 || h < 6); };
    apply();
    const id = window.setInterval(apply, 60_000);
    return () => window.clearInterval(id);
  }, []);
  return null;
}

/** The secret night club: a neon OPEN sign that only exists from 10pm to 5am IST. */
export function NeonSign() {
  const [open, setOpen] = useState(false);
  const [club, setClub] = useState(false);
  useEffect(() => {
    const check = () => { const h = istHour(); setOpen(forced() || h >= 22 || h < 5); };
    const first = window.setTimeout(check, 0);
    const id = window.setInterval(check, 60_000);
    return () => { window.clearTimeout(first); window.clearInterval(id); };
  }, []);
  useEffect(() => { document.documentElement.classList.toggle("neon", club); }, [club]);
  useEffect(() => () => document.documentElement.classList.remove("neon"), []);
  return (
    <AnimatePresence>
      {open && (
        <motion.button type="button" className={`neon-sign ${club ? "is-in" : ""}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => { setClub(!club); sfx.switchOn(); if (!club) unlock("night"); }} data-cursor={club ? "LEAVE" : "ENTER"}
          aria-label={club ? "Leave the night club" : "Enter the secret night club"}>
          <span className="neon-text">{club ? "CLOSING TIME" : "OPEN"}</span>
          <small>{club ? "back to daylight ☀️" : "🌙 night club · only after 10pm"}</small>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
