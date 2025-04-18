import { Card } from "@/components/ui/card"
import { TeamMember } from "@/components/team-member"

export const metadata = {
  title: "About Us - CavCount",
  description: "Learn about CavCount, a free OCR word and sentence counter, its origins as a student project, and its developer, Leo."
}

export default function AboutPage() {
  return (
    <div className="container py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">About Us</h1>
        </div>

        <Card className="mb-8 p-6">
          <p className="mb-4 text-lg">
            CavCount was originally a research project done in senior high school. It was developed from scratch and has been updated with new features each time. <strong>Leo</strong>, one of the creators of this app, has personally maintained and continued to develop CavCount as a free online app because it will be helpful for other students, himself, and other professionals.
          </p>

          <p className="mb-4 text-lg">
            Leo&apos;s dedication to maintaining and improving CavCount over the years has helped it evolve from a simple school project into a valuable tool used by people around the world. His commitment to keeping the service free and ad-free has been central to the app&apos;s philosophy.
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
  )
}
