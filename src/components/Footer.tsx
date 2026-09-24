"use client";

import { SITE } from "@/constants";

/**
 * Exact footer from laschisabella/laschisa:
 * - Left: Copyright & Intentionality tagline in text-zinc-400 text-xs font-bold tracking-wide lg:tracking-widest
 * - Right: Action links in exact laschisa accent color #8A6D95 (linkedin, mail, github, source code)
 */
export default function Footer() {
  return (
    <footer className="w-full flex items-center px-3 lg:px-20 min-h-[8vh] mb-4 lg:mb-0 py-6">
      <div className="lg:max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between w-full gap-4 lg:gap-0">
        <div className="text-zinc-400 text-xs font-bold tracking-wide lg:tracking-widest select-none">
          &copy; {new Date().getFullYear()} {SITE.brandDomain} &bull; BUILD WITH
          INTENTIONALITY
        </div>

        <div className="flex items-center z-50 flex-wrap justify-center">
          <a
            href={`https://linkedin.com/in/${SITE.linkedinUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 uppercase tracking-wide text-[#8A6D95] hover:text-[#a88bb3] text-xs font-bold transition-colors duration-150"
          >
            linkedin
          </a>

          <a
            href={`mailto:${SITE.email}`}
            className="px-3.5 py-2 uppercase tracking-wide text-[#8A6D95] hover:text-[#a88bb3] text-xs font-bold transition-colors duration-150"
          >
            mail
          </a>

          <a
            href={`https://github.com/${SITE.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 uppercase tracking-wide text-[#8A6D95] hover:text-[#a88bb3] text-xs font-bold transition-colors duration-150"
          >
            github
          </a>

          <a
            href={SITE.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 uppercase tracking-wide text-[#8A6D95] hover:text-[#a88bb3] text-xs font-bold transition-colors duration-150"
          >
            source code
          </a>
        </div>
      </div>
    </footer>
  );
}
