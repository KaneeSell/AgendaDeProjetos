import { motion } from "motion/react";

interface ArticleProps {
  titulo: string;
  children: React.ReactNode;
  className?: string;
  id: string
}
export default function Article(props: ArticleProps) {
  return (
    <motion.article
    id={props.id}
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1, transition: {ease: 'easeOut', duration: 0.6, times:[0.4]},
      }}
      viewport={{
        once: true,
      }}
      transition={{
        ease: "easeOut",
        duration: 0.3,
      }}
      className="flex flex-col justify-center items-center gap-10 mt-15 scroll-mt-20"
    >
      <motion.h2
        initial={{
          x: 100,
        }}
        whileInView={{
          x: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          ease: "easeOut",
          duration: 0.3,
        }}
        className="text-3xl md:text-5xl font-serif font-extrabold"
      >
        {props.titulo}
      </motion.h2>
      <motion.section
        initial={{
          x: -100,
        }}
        whileInView={{
          x: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          ease: "easeOut",
          duration: 0.3,
        }}
        className={`
        px-5 md:max-w-2/3 flex flex-col justify-center 
        items-center text-justify text-gray-300 light:text-gray-700
      ${props.className}
      `}
      >
        {props.children}
      </motion.section>
    </motion.article>
  );
}
