import { TeamMember } from "@/components/team-member";
import { FaCode } from "react-icons/fa";
import { NextSeo } from "next-seo";

export default function AboutPage() {
  return (
    <>
      <NextSeo
        title="About"
        description="Learn about Cavcount's mission, features, and the team behind the text analysis tools"
        canonical="https://cavcount.app/about"
        openGraph={{
          url: "https://cavcount.app/about",
          title: "About Cavcount",
          description: "Learn about Cavcount's mission, features, and the team behind the text analysis tools",
        }}
      />

      <div className="container py-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">About Cavcount</h1>

        <div className="grid gap-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-6">
              Cavcount was created to provide writers, students, and professionals with a simple yet powerful
              tool for text analysis. We believe that good writing starts with understanding your text,
              which is why we built a comprehensive suite of tools for word counting, text extraction,
              and content analysis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Our Features</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Word Counter</h3>
                <p className="text-sm text-muted-foreground">
                  Count words, sentences, characters, and paragraphs with detailed statistics.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">OCR Technology</h3>
                <p className="text-sm text-muted-foreground">
                  Extract text from images with our advanced OCR (Optical Character Recognition) tool.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Reading Time</h3>
                <p className="text-sm text-muted-foreground">
                  Estimate how long it will take to read your text based on average reading speeds.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Meet the Team</h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              <TeamMember
                name="Jane Doe"
                role="Founder & Lead Developer"
                image="/placeholder.png"
                icon={<FaCode />}
              />
              <TeamMember
                name="John Smith"
                role="UX Designer"
                image="/placeholder.png"
                icon={<FaCode />}
              />
              <TeamMember
                name="Alex Johnson"
                role="OCR Specialist"
                image="/placeholder.png"
                icon={<FaCode />}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
