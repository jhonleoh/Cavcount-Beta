<<<<<<< HEAD
<<<<<<< HEAD
import { Metadata } from "next";
import { TeamMember } from "@/components/team-member";
import { FaCode } from "react-icons/fa";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Cavcount's mission, features, and the team behind the text analysis tools",
};
=======
=======
>>>>>>> parent of 6980e83 (update)
import { Card } from "@/components/ui/card"
import { TeamMember } from "@/components/team-member"
import { generateAboutPageSchema } from "@/lib/schema-utils";
import Script from "next/script";

export const metadata = {
  title: "About Us - CavCount",
  description: "Learn about CavCount, a free OCR word and sentence counter, its origins as a student project, and its developer, Leo."
}
<<<<<<< HEAD
>>>>>>> parent of 6980e83 (update)
=======
>>>>>>> parent of 6980e83 (update)

export default function AboutPage() {
  const schema = generateAboutPageSchema();

  return (
<<<<<<< HEAD
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
  );
=======
    <>
      <Script id="about-schema" type="application/ld+json">
        {JSON.stringify(schema)}
      </Script>

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
              <TeamMember
                name="Leo"
                roleDescription="Developer & Maintainer"
                avatarIndex={1}
                primaryContributor={true}
              />
              <TeamMember
                name="Allen M."
                roleDescription="Developer"
                avatarIndex={2}
              />
              <TeamMember
                name="Mark Allen"
                roleDescription="Developer"
                avatarIndex={3}
              />
              <TeamMember
                name="Moises"
                roleDescription="Developer"
                avatarIndex={4}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
<<<<<<< HEAD
>>>>>>> parent of 6980e83 (update)
=======
>>>>>>> parent of 6980e83 (update)
}
