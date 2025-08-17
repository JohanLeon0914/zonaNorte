/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Timer from "@/components/Timer";
import Fight from "@/components/Fight";
import History from "@/components/History";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [activeView, setActiveView] = useState<'fight' | 'history'>('fight');

  return (
    <div>
      <Head>
        <title>Jiujitsu Score Counter</title>
        <meta name="description" content="Sistema de puntuación para combates de jiujitsu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navegación */}
      <div className="bg-gray-900 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center space-x-8 py-4">
            <button
              onClick={() => setActiveView('fight')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeView === 'fight'
                  ? 'bg-yellow-500 text-gray-900'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              Combate
            </button>
            <button
              onClick={() => setActiveView('history')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeView === 'history'
                  ? 'bg-yellow-500 text-gray-900'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              Historial
            </button>
          </div>
        </div>
      </div>

      {activeView === 'fight' ? (
        <>
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
        </>
      ) : (
        <History />
      )}
    </div>
  );
}
