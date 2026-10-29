import { redirect } from "next/navigation";

export default function PhotoRedirect() {
  redirect("/photos");
}