import { Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Contact Us</h1>
        <p className="text-muted-foreground">Get in touch with the Homily Builder team</p>
      </div>
      
      <div className="bg-card rounded-lg shadow-sm border p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-foreground">Contact Information</h2>
            <p className="mb-6 text-card-foreground">Have questions, feedback, or need assistance with Homily Builder? We're here to help!</p>
          </div>
          
          <div className="flex items-center py-3 border-b">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <Mail className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <a href="mailto:fr.josh@lolekproductions.org" className="font-medium hover:underline text-foreground">
                fr.josh@lolekproductions.org
              </a>
            </div>
          </div>
          
          <div className="pt-6">
            <h3 className="font-medium mb-2 text-foreground">About Homily Builder</h3>
            <p className="text-card-foreground/80">
              Homily Builder is a tool designed to help preachers create meaningful and impactful homilies.
              We're dedicated to supporting your ministry through technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}