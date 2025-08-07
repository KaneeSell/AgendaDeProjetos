"use client";
import Image from "next/image";
import logo from "@/app/favicon.ico";
import { motion } from "motion/react";
import { IoIosArrowUp } from "react-icons/io";

export default function Footer() {
  return (
    <motion.footer
      initial={{
        opacity: 0,
        y: 150,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        ease: "easeOut",
        duration: 0.4,
      }}
      className={`
        flex flex-wrap mt-5 w-full px-5 items-center
        md:max-w-2/3 justify-center text-gray-300 light:text-neutral-700 relative
        pt-10
        `}
    >
      <span className="w-full h-[0.06em] bg-neutral-400 light:bg-neutral-700" />
      <span className="absolute top-4 bg-black light:bg-neutral-200 border-1 border-b-0 rounded-3xl p-5" />
      <span className="absolute top-10 bg-black light:bg-neutral-200 p-5" />
      <a href="#inicio" className="absolute top-4 cursor-pointer">
        <IoIosArrowUp size={"35px"} />
      </a>
      <motion.span
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }} 
          viewport={{
            once: true
          }}
          transition={{
            times: [0.4],
            ease: 'easeOut',
            duration: 0.6
          }}
      className="flex flex-col mt-5 w-full md:flex-row justify-center items-center gap-3 md:gap-0 sm:justify-between sm:flex z-1">
        <span className="w-1/2 lg:w-1/3 lg:pe-10 justify-center flex flex-col lg:flex-row-reverse px-3 lg:px-0 gap-2 items-center md:items-start lg:items-center lg:justify-between">
        <figure>
          <Image
            alt="Logo Kanee Sell"
            src={logo}
            width={50}
            height={50}
            className="h-12 md:h-15 w-12 md:w-15 block lg:hidden"
          />
        </figure>
        <a
          className="text-sky-500 hover:underline text-sm text-nowrap md:text-base"
          href="https://github.com/KaneeSell/portifolio-2.0"
          target="_blank"
          rel="noopener noreferrer"
        >
          Repositório Potifólio
        </a>
        </span>
        <figure className="lg:w-1/3 items-center hidden lg:flex justify-center">
          <Image
            alt="Logo Kanee Sell"
            src={logo}
            width={50}
            height={50}
            className="h-12 md:h-15 w-12 md:w-15"
          />
        </figure>
        <div className="w-full lg:w-1/3  justify-center flex flex-col px-3 gap-2 items-center md:items-end lg:items-center">
          <span className="flex flex-col text-base sm:gap-1 sm:text-sm text-nowrap items-center w-1/2 justify-center leading-3">
            <p className="text-base sm:text-sm font-semibold">Feito com</p>
            <p>Next.Js • TailwindCSS • Vercel</p>
          </span>
          <span className="flex flex-col sm:flex gap-1 sm:text-sm text-nowrap items-center w-1/2 justify-center leading-3">
            <span className="flex gap-1 text-base sm:text-sm text-nowrap">
              <p>© 2025</p>
              <p className="font-semibold">Kane&apos;e Sell</p>
            </span>
            <p>Todos os direitos reservados.</p>
          </span>
        </div>
      </motion.span>
    </motion.footer>
  );
}
