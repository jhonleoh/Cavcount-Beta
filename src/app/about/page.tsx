import type { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about CavCount, a free OCR word and sentence counter, its origins as a student project, and its developer, Leo.",
  openGraph: {
    title: "About Us | CavCount",
    description: "Learn about CavCount, a free OCR word and sentence counter, its origins as a student project, and its developer, Leo.",
    url: "https://cavcount.app/about",
  },
  twitter: {
    title: "About Us | CavCount",
    description: "Learn about CavCount, a free OCR word and sentence counter, its origins as a student project, and its developer, Leo.",
  },
  alternates: {
    canonical: "https://cavcount.app/about",
  }
};

export default function AboutPage() {
  return (
    <div className="container py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">About Us</h1>
        </div>

        <Card className="mb-8 p-6">
          <p className="mb-4 text-lg">
            CavCount was originally a research project done in senior high school. It was developed from scratch and has been updated with new features each time. I am Leo, one of the creators of this app, and I decided to continue CavCount as a free online app because it will be helpful for other students, me, and other professionals.
          </p>
          <p className="mb-4 text-lg">
            CavCount has an OCR function that enables you to upload images of texts, and it will convert them to text. The app can instantly count words and sentences. The best thing about it is that it is free and has no advertisements.
          </p>
          <p className="mb-4 text-lg">
            The application, "CavCount," comes from the name of the province of Cavite, and this application is for all Caviteños. We also thank all users from other provinces and countries who use our app and find it helpful.
          </p>
        </Card>

        <div className="mb-8">
          <h2 className="mb-6 text-2xl font-semibold">Team Members</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="p-6 relative overflow-hidden transition-all duration-300 border-primary/50">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div
                    className="flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold text-white shadow-lg bg-gradient-to-br from-blue-500 to-indigo-700"
                    style={{
                      transform: "perspective(800px) rotateX(10deg)",
                      boxShadow: "rgba(0, 0, 0, 0.2) 0px 10px 20px",
                    }}
                  >
                    L
                  </div>
                  <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                    ★
                  </div>
                </div>
                <h3 className="mb-1 text-xl font-bold">Leo</h3>
                <div className="inline-flex rounded-full bg-secondary/50 px-3 py-1 text-sm">
                  Developer &amp; Maintainer
                </div>
              </div>
            </Card>
            <Card className="p-6 relative overflow-hidden transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div
                    className="flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold text-white shadow-lg bg-gradient-to-br from-emerald-500 to-green-700"
                    style={{
                      transform: "perspective(800px) rotateX(10deg)",
                      boxShadow: "rgba(0, 0, 0, 0.2) 0px 10px 20px",
                    }}
                  >
                    AM
                  </div>
                </div>
                <h3 className="mb-1 text-xl font-bold">Allen M.</h3>
                <div className="inline-flex rounded-full bg-secondary/50 px-3 py-1 text-sm">
                  Developer
                </div>
              </div>
            </Card>
            <Card className="p-6 relative overflow-hidden transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div
                    className="flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold text-white shadow-lg bg-gradient-to-br from-amber-500 to-orange-700"
                    style={{
                      transform: "perspective(800px) rotateX(10deg)",
                      boxShadow: "rgba(0, 0, 0, 0.2) 0px 10px 20px",
                    }}
                  >
                    MA
                  </div>
                </div>
                <h3 className="mb-1 text-xl font-bold">Mark Allen</h3>
                <div className="inline-flex rounded-full bg-secondary/50 px-3 py-1 text-sm">
                  Developer
                </div>
              </div>
            </Card>
            <Card className="p-6 relative overflow-hidden transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div
                    className="flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold text-white shadow-lg bg-gradient-to-br from-rose-500 to-red-700"
                    style={{
                      transform: "perspective(800px) rotateX(10deg)",
                      boxShadow: "rgba(0, 0, 0, 0.2) 0px 10px 20px",
                    }}
                  >
                    M
                  </div>
                </div>
                <h3 className="mb-1 text-xl font-bold">Moises</h3>
                <div className="inline-flex rounded-full bg-secondary/50 px-3 py-1 text-sm">
                  Developer
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
