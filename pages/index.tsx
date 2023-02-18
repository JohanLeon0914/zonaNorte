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
      <div className="relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 timer-container">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Tiempo de Pelea
          </h1>
          <Timer initialSeconds={180} />
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="flex justify-center items-center h-screen">
        <Fight />
      </div>
    </div>
  );
}
