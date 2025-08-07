'use client'

import { motion } from "motion/react";
import { Fragment } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail, SiWhatsapp } from "react-icons/si";

function gerarLinkWhatsApp(mensagem: string): string {
  const numero = "5547933837181";
  const mensagemCodificada = encodeURIComponent(mensagem.trim());
  return `https://wa.me/${numero}?text=${mensagemCodificada}`;
}
interface BtnWhatsappProps {
  className?: string;
}
export function BtnWhatsapp(props: BtnWhatsappProps) {
  return (
    <motion.a
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1, transition: {ease: 'easeOut', duration: 0.6, times:[0.4]},
          }} 
          viewport={{
            once: true
          }}
          transition={{
            ease: 'easeOut',
            duration: 0.4
          }}
      target="_blank"
      rel="noopener noreferrer"
      href={gerarLinkWhatsApp(
        "Olá! Vim pelo seu ERP, e gostaria de tirar uma duvida."
      )}
      className={`
            flex bottom-20 items-center gap-1 px-2 py-0.5 border-1 
            bg-green-400 hover:bg-green-500 rounded-2xl
            ${props.className}
            `}
    >
      <SiWhatsapp size={"20px"} className="cursor-pointer" />
      <span>Suporte</span>
    </motion.a>
  );
}

export default function Contato() {
  return (
    <Fragment>
      <motion.div
          initial={{
            opacity: 0,
            x: 150
          }}
          whileInView={{
            opacity: 1, transition: {ease: 'easeOut', duration: 0.6, times:[0.4]},
            x: 0
          }} 
          viewport={{
            once: true
          }}
          transition={{
            ease: 'easeOut',
            duration: 0.4
          }}
        id="contato"
        className="scroll-m-15 mt-10 lg:w-2/3 px-5 flex flex-col justify-center items-center gap-10 w-full"
      >
        <span className="flex flex-col gap-5 border-1 p-10 lg:p-20 rounded-3xl">
          <motion.span
          initial={{
            opacity: 0,
            y: 50
          }}
          whileInView={{
            opacity: 1, transition: {ease: 'easeOut', duration: 0.6, times:[0.4]},
            y: 0
          }} 
          viewport={{
            once: true
          }}
          transition={{
            ease: 'easeOut',
            duration: 0.4
          }}
          className="text-3xl md:text-5xl font-serif font-extrabold">
            Contato
          </motion.span>
          <span className="flex flex-wrap items-center gap-5 justify-center text-white">
            <span className="flex flex-col gap-5">
              <motion.a
          initial={{
            opacity: 0,
            y: -50
          }}
          whileInView={{
            opacity: 1, transition: {ease: 'easeOut', duration: 0.6, times:[0.4]},
            y: 0
          }} 
          viewport={{
            once: true
          }}
          transition={{
            ease: 'easeOut',
            duration: 0.4
          }}
                rel="noopener noreferrer"
                href=""
                className="flex items-center gap-1 bg-[#25D366] px-2 py-0.5 rounded-2xl 
          border-1 border-gray-500 hover:brightness-85"
                target="_blank"
              >
                <SiWhatsapp size={"20px"} className="" />
                Whatsapp
              </motion.a>
              <motion.a
          initial={{
            opacity: 0,
            y: -50
          }}
          whileInView={{
            opacity: 1, transition: {ease: 'easeOut', duration: 0.6, times:[0.4]},
            y: 0
          }} 
          viewport={{
            once: true
          }}
          transition={{
            ease: 'easeOut',
            duration: 0.6
          }}
                rel="noopener noreferrer"
                href=""
                className="flex items-center gap-1 bg-[#0A66C2] px-2 py-0.5 rounded-2xl 
          border-1 border-gray-500 hover:brightness-85"
                target="_blank"
              >
                <FaLinkedin size={"20px"} className="" />
                LinkedIn
              </motion.a>
            </span>
            <span className="flex flex-col gap-5">
              <motion.a
          initial={{
            opacity: 0,
            y: -50
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }} 
          viewport={{
            once: true
          }}
          transition={{
            times: [0.4],
            ease: 'easeOut',
            duration: 0.6
          }}
                rel="noopener noreferrer"
                href=""
                className="flex items-center gap-1 bg-[#181717] px-2 py-0.5 rounded-2xl 
          border-1 border-gray-500 hover:brightness-85"
                target="_blank"
              >
                <FaGithub size={"20px"} className="" />
                GitHub
              </motion.a>
              <motion.a
          initial={{
            opacity: 0,
            y: -50
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }} 
          viewport={{
            once: true
          }}
          transition={{
            times: [0.4],
            ease: 'easeOut',
            duration: 0.6
          }}
                rel="noopener noreferrer"
                href=""
                className="flex items-center gap-1 bg-[#D93025] px-2 py-0.5 rounded-2xl 
          border-1 border-gray-500 hover:brightness-85"
                target="_blank"
              >
                <SiGmail size={"20px"} className="" />
                Gmail
              </motion.a>
            </span>
          </span>
        </span>
      </motion.div>
      <motion.a
          initial={{
            opacity: 0,
            y: 100
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }} 
          viewport={{
            once: true
          }}
          transition={{
            times: [0.4],
            ease: 'easeOut',
            duration: 0.6
          }}
        target="_blank"
        rel="noopener noreferrer"
        href={gerarLinkWhatsApp(
          "Olá! Vim pelo seu ERP, e gostaria de tirar uma duvida."
        )}
        className="flex text-white md:hidden fixed bottom-20 right-5 bg-green-400 rounded-full z-2"
      >
        <SiWhatsapp size={"40px"} className="cursor-pointer" />
      </motion.a>
    </Fragment>
  );
}
