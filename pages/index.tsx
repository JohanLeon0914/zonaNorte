/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Timer from "@/components/Timer";
import Fight from "@/components/Fight";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <section className="relative mx-auto max-w-6xl px-4 pt-8 pb-4">
        <div className="mx-auto w-full rounded-3xl border border-white border-opacity-10 bg-gradient-to-b from-gray-900 to-gray-800 p-4 sm:p-6 shadow-2xl">
          <div className="text-center">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Tiempo de Pelea
            </h1>
            <Timer initialSeconds={180} />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="flex justify-center items-start">
          <Fight />
        </div>
      </section>
    </div>
  );
}
