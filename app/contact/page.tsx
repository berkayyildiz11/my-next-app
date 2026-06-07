import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

type DeveloperContact = {
  name: string;
  role: string;
  email: string;
  githubUsername: string;
  linkedinUrl?: string;
};

const developers: DeveloperContact[] = [
  {
    name: "Berkay Yıldız",
    role: "Founder & Developer",
    email: "brkyyildiz7@gmail.com",
    githubUsername: "berkayyildiz11",
    linkedinUrl: "https://www.linkedin.com/in/berkay--yildiz/",
  },
  {
    name: "Hüseyin Yorğa",
    role: "Founder & Developer",
    email: "yorgahuseyin@example.com",
    githubUsername: "yorgahuseyin",
    linkedinUrl: "https://www.linkedin.com/in/huseyinyorga/",
  },
];

export const metadata = {
  title: "Contact | FinSense",
  description: "Get in touch with the FinSense team for any inquiries or support.",
};

export default function Contact() {
  return (
    <main className="page-wrapper">
      <div className="page-content">
        <section className="py-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              <Mail className="h-6 w-6" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
              Contact the FinSense Team
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-600">
              Reach out for project questions, feedback, collaboration ideas, or
              issue reports. We are happy to hear from people exploring
              real-time financial analysis and AI-assisted market tools.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {developers.map((developer) => {
              const githubUrl = `https://github.com/${developer.githubUsername}`;

              return (
                <article
                  key={developer.email}
                  className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-colors hover:border-indigo-200"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-semibold text-zinc-900">
                        {developer.name}
                      </h2>
                      <p className="mt-1 text-sm font-medium text-indigo-600">
                        {developer.role}
                      </p>
                    </div>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-700">
                      <Github className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <a
                      href={`mailto:${developer.email}`}
                      className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 px-4 py-3 text-sm text-zinc-700 transition-colors hover:border-indigo-200 hover:text-indigo-600"
                    >
                      <span className="flex items-center gap-3">
                        <Mail className="h-4 w-4" />
                        {developer.email}
                      </span>
                      <ExternalLink className="h-4 w-4" />
                    </a>

                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 px-4 py-3 text-sm text-zinc-700 transition-colors hover:border-indigo-200 hover:text-indigo-600"
                    >
                      <span className="flex items-center gap-3">
                        <Github className="h-4 w-4" />
                        @{developer.githubUsername}
                      </span>
                      <ExternalLink className="h-4 w-4" />
                    </a>

                    {developer.linkedinUrl ? (
                      <a
                        href={developer.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 px-4 py-3 text-sm text-zinc-700 transition-colors hover:border-indigo-200 hover:text-indigo-600"
                      >
                        <span className="flex items-center gap-3">
                          <Linkedin className="h-4 w-4" />
                          LinkedIn
                        </span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              variant="outline"
              className="rounded-full border-slate-200 hover:bg-slate-50 hover:text-indigo-600"
            >
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Return to Main Menu
              </Link>
            </Button>
            <Button
              asChild
              className="rounded-full bg-[#081e3d] px-6 text-white hover:bg-[#06152d]"
            >
              <Link href="/about">Learn more about FinSense</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
